<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Lcobucci\JWT\Token\Builder;
use Lcobucci\JWT\Encoding\JoseEncoder;
use Lcobucci\JWT\Encoding\ChainedFormatter;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Signer\Key\InMemory;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\Token\Parser as JwtParser;
use Lcobucci\JWT\Validation\Validator as JWTValidator;
use Lcobucci\JWT\Validation\Constraint\SignedWith;
use DateTimeImmutable;

class AuthController extends Controller
{
    protected function generateJwtToken($user, $expiresIn)
{
    $expiresIn = (int) $expiresIn;  // Ensure it's an integer
    if ($expiresIn <= 0) {
       $expiresIn = 3600;  // Fallback to 1 hour if invalid
    }

    $signingKey = InMemory::plainText(config('app.jwt_secret'));
    $now = new DateTimeImmutable();
    $algorithm = new Sha256();

    return (new Builder(new JoseEncoder(), ChainedFormatter::default()))
        ->issuedAt($now)
        ->expiresAt($now->modify("+{$expiresIn} seconds"))
        ->withClaim('uid', $user->user_id)
        ->withClaim('phone', $user->phone)
        ->withClaim('picture', $user->picture)
        ->withClaim('can_host', $user->can_host)
        ->getToken($algorithm, $signingKey)
        ->toString();
}


    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'phone' => 'required|string|unique:users',
            'picture' => 'nullable|url',
            'role' => 'required|string|in:Admin,Mentor,Learner',
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
            'role' => $request->role, 
            'can_host' => $request->can_host ?? false,
        ]);

        return response()->json(['message' => 'User registered successfully'], 201);
    }

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

    public function refreshToken(Request $request)
{
    $tokenString = $request->header('Authorization');

    if (!$tokenString || !str_starts_with($tokenString, 'Bearer ')) {
        return response()->json(['error' => 'Token required'], 401);
    }

    try {
        $parser = new JwtParser(new JoseEncoder()); // FIXED
        $token = $parser->parse(str_replace('Bearer ', '', $tokenString));

        $signingKey = InMemory::plainText(config('app.jwt_secret'));
        $validator = new JWTValidator();

        if (!$validator->validate($token, new SignedWith(new Sha256(), $signingKey))) {
            return response()->json(['error' => 'Invalid token'], 403);
        }

        $user = User::find($token->claims()->get('uid'));

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $newAccessToken = $this->generateJwtToken($user, config('app.jwt_ttl'));

        return response()->json(['access_token' => $newAccessToken]);

    } catch (\Exception $e) {
        return response()->json(['error' => 'Token parsing error: ' . $e->getMessage()], 401);
    }
}

public function logout(Request $request)
{
    $tokenString = $request->header('Authorization');

    if (!$tokenString || !str_starts_with($tokenString, 'Bearer ')) {
        return response()->json(['error' => 'Token required'], 401);
    }

    try {
        // Parse the token
        $parser = new JwtParser(new JoseEncoder());
        $token = $parser->parse(str_replace('Bearer ', '', $tokenString));

        // Get the expiration time as a DateTimeImmutable object
        $expiration = $token->claims()->get('exp');
        if (!$expiration || $expiration->getTimestamp() < time()) {
            return response()->json(['error' => 'Token already expired'], 401);
        }

        // Invalidate the token by storing its ID in the cache
        $tokenId = $token->claims()->get('jti');
        \Cache::put('invalidated_token_' . $tokenId, true, now()->addMinutes(60));

        return response()->json(['message' => 'Logged out successfully']);

    } catch (\Exception $e) {
        return response()->json(['error' => 'Token parsing error: ' . $e->getMessage()], 401);
    }
}
public function getProfile(Request $request)
{
    $tokenString = $request->header('Authorization');

    if (!$tokenString || !str_starts_with($tokenString, 'Bearer ')) {
        return response()->json(['error' => 'Token required'], 401);
    }

    try {
        // Parse the token
        $parser = new JwtParser(new JoseEncoder());
        $token = $parser->parse(str_replace('Bearer ', '', $tokenString));

        // Validate the token signature
        $signingKey = InMemory::plainText(config('app.jwt_secret'));
        $validator = new JWTValidator();

        if (!$validator->validate($token, new SignedWith(new Sha256(), $signingKey))) {
            return response()->json(['error' => 'Invalid token'], 403);
        }

        // Get user details from the token
        $userId = $token->claims()->get('uid');
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Return user profile data directly
        return response()->json([
            'success' => true,
            'profile' => [
                'user_id' => $user->user_id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'picture' => $user->picture,
                'role' => $user->role,
                'can_host' => $user->can_host,
            ]
        ]);

    } catch (\Exception $e) {
        return response()->json(['error' => 'Token parsing error: ' . $e->getMessage()], 401);
    }
}
public function updateProfile(Request $request)
{
    $tokenString = $request->header('Authorization');

    if (!$tokenString || !str_starts_with($tokenString, 'Bearer ')) {
        return response()->json(['error' => 'Token required'], 401);
    }

    try {
        // Parse and validate the token
        $parser = new JwtParser(new JoseEncoder());
        $token = $parser->parse(str_replace('Bearer ', '', $tokenString));

        $signingKey = InMemory::plainText(config('app.jwt_secret'));
        $validator = new JWTValidator();

        if (!$validator->validate($token, new SignedWith(new Sha256(), $signingKey))) {
            return response()->json(['error' => 'Invalid token'], 403);
        }

        // Get user from token
        $userId = $token->claims()->get('uid');
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Validate the input
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $user->user_id . ',user_id',
            'phone' => 'sometimes|required|string|unique:users,phone,' . $user->user_id . ',user_id',
            'picture' => 'nullable|url',
            'password' => 'nullable|string|min:6',
            'role' => 'sometimes|required|string|in:Admin,Mentor,Learner',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Update user fields
        if ($request->has('name')) {
            $user->name = $request->name;
        }

        if ($request->has('email')) {
            $user->email = $request->email;
        }

        if ($request->has('phone')) {
            $user->phone = $request->phone;
        }

        if ($request->has('picture')) {
            $user->picture = $request->picture;
        }

        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
        }

        if ($request->has('role')) {
            $user->role = $request->role;
        }

        $user->save();

        return response()->json(['message' => 'Profile updated successfully'], 200);

    } catch (\Exception $e) {
        return response()->json(['error' => 'Error: ' . $e->getMessage()], 500);
    }
}


}