<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Lcobucci\JWT\Token\Builder as JwtBuilder;
use Lcobucci\JWT\Encoding\JoseEncoder;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Signer\Key\InMemory;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\Validation\Validator as JWTValidator;
use DateTimeImmutable;

class AuthController extends Controller
{
    protected function generateJwtToken($user, $expiresIn)
    {
        $signingKey = InMemory::plainText(config('app.jwt_secret'));
        $now = new DateTimeImmutable();
    
        return (new JwtBuilder(new JoseEncoder())) // Pass only the JoseEncoder here
            ->issuedAt($now)
            ->expiresAt($now->modify("+{$expiresIn} seconds"))
            ->withClaim('uid', $user->user_id)
            ->withClaim('phone', $user->phone)
            ->withClaim('picture', $user->picture)
            ->withClaim('can_host', $user->can_host)
            ->getToken(new Sha256(), $signingKey)  // Use the correct signer here
            ->toString();
    }

    // User Registration
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'phone' => 'required|string|unique:users',
            'picture' => 'nullable|url',
            'can_host' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'picture' => $request->picture,
            'can_host' => $request->can_host ?? false,  
        ]);

        return response()->json(['message' => 'User registered successfully'], 201);
    }

    // User Login
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        $accessToken = $this->generateJwtToken($user, config('app.jwt_ttl'));
        $refreshToken = $this->generateJwtToken($user, config('app.jwt_refresh_ttl'));

        return response()->json([
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken
        ]);
    }

    // Refresh Token
    public function refreshToken(Request $request)
    {
        $tokenString = $request->header('Authorization');

        if (!$tokenString) {
            return response()->json(['error' => 'Token required'], 401);
        }

        try {
            $parser = new Parser(new JoseEncoder());
            $token = $parser->parse(str_replace('Bearer ', '', $tokenString));

            $signingKey = InMemory::plainText(config('app.jwt_secret'));
            $validator = new JWTValidator();

            if (!$validator->validate($token, new Sha256(), $signingKey)) {
                return response()->json(['error' => 'Invalid token'], 403);
            }

            $user = User::find($token->claims()->get('uid'));

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            $newAccessToken = $this->generateJwtToken($user, config('app.jwt_ttl'));

            return response()->json(['access_token' => $newAccessToken]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Token parsing error'], 401);
        }
    }

    // Logout
    public function logout()
    {
        return response()->json(['message' => 'Logged out successfully']);
    }
}
