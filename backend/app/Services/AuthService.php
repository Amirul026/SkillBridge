<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Lcobucci\JWT\Token\Builder;
use Lcobucci\JWT\Encoding\JoseEncoder;
use Lcobucci\JWT\Encoding\ChainedFormatter;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Signer\Key\InMemory;
use Lcobucci\JWT\Token\Parser as JwtParser;
use Lcobucci\JWT\Validation\Validator as JWTValidator;
use Lcobucci\JWT\Validation\Constraint\SignedWith;
use DateTimeImmutable;
use Illuminate\Support\Facades\Cache;



class AuthService
{
    public function generateJwtToken($user, $expiresIn)
    {
        $expiresIn = (int) $expiresIn;
        if ($expiresIn <= 0) {
            $expiresIn = 3600;
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

    public function register($data)
    {
        $validator = Validator::make($data, [
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
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'phone' => $data['phone'],
            'picture' => $data['picture'],
            'role' => $data['role'],
            'can_host' => $data['can_host'] ?? false,
        ]);

        return response()->json(['message' => 'User registered successfully'], 201);
    }

    public function login($data)
    {
        $validator = Validator::make($data, [
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        $accessToken = $this->generateJwtToken($user, config('app.jwt_ttl'));
        $refreshToken = $this->generateJwtToken($user, config('app.jwt_refresh_ttl'));

        return response()->json([
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken
        ]);
    }

    public function refreshToken($tokenString)
    {
        if (!$tokenString || !str_starts_with($tokenString, 'Bearer ')) {
            return response()->json(['error' => 'Token required'], 401);
        }

        try {
            $parser = new JwtParser(new JoseEncoder());
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

    public function logout($tokenString)
    {
        if (!$tokenString || !str_starts_with($tokenString, 'Bearer ')) {
            return response()->json(['error' => 'Token required'], 401);
        }

        try {
            $parser = new JwtParser(new JoseEncoder());
            $token = $parser->parse(str_replace('Bearer ', '', $tokenString));

            $expiration = $token->claims()->get('exp');
            if (!$expiration || $expiration->getTimestamp() < time()) {
                return response()->json(['error' => 'Token already expired'], 401);
            }

            $tokenId = $token->claims()->get('jti');
            Cache::put('invalidated_token_' . $tokenId, true, now()->addMinutes(60));

            return response()->json(['message' => 'Logged out successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Token parsing error: ' . $e->getMessage()], 401);
        }
    }

    public function getProfile($tokenString)
    {
        if (!$tokenString || !str_starts_with($tokenString, 'Bearer ')) {
            return response()->json(['error' => 'Token required'], 401);
        }

        try {
            $parser = new JwtParser(new JoseEncoder());
            $token = $parser->parse(str_replace('Bearer ', '', $tokenString));

            $signingKey = InMemory::plainText(config('app.jwt_secret'));
            $validator = new JWTValidator();

            if (!$validator->validate($token, new SignedWith(new Sha256(), $signingKey))) {
                return response()->json(['error' => 'Invalid token'], 403);
            }

            $userId = $token->claims()->get('uid');
            $user = User::find($userId);

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

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

    public function updateProfile($tokenString, $data)
    {
        if (!$tokenString || !str_starts_with($tokenString, 'Bearer ')) {
            return response()->json(['error' => 'Token required'], 401);
        }

        try {
            $parser = new JwtParser(new JoseEncoder());
            $token = $parser->parse(str_replace('Bearer ', '', $tokenString));

            $signingKey = InMemory::plainText(config('app.jwt_secret'));
            $validator = new JWTValidator();

            if (!$validator->validate($token, new SignedWith(new Sha256(), $signingKey))) {
                return response()->json(['error' => 'Invalid token'], 403);
            }

            $userId = $token->claims()->get('uid');
            $user = User::find($userId);

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            $validator = Validator::make($data, [
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

            if (isset($data['name']))
                $user->name = $data['name'];
            if (isset($data['email']))
                $user->email = $data['email'];
            if (isset($data['phone']))
                $user->phone = $data['phone'];
            if (isset($data['picture']))
                $user->picture = $data['picture'];
            if (isset($data['password']))
                $user->password = Hash::make($data['password']);
            if (isset($data['role']))
                $user->role = $data['role'];

            $user->save();

            return response()->json(['message' => 'Profile updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error: ' . $e->getMessage()], 500);
        }
    }
}
