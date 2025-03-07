<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
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
            ->withClaim('role', $user->role)
            ->withClaim('picture', $user->picture)
            ->withClaim('can_host', $user->can_host)
            ->getToken($algorithm, $signingKey)
            ->toString();
    }

    public function register($data)
    {
        try {
            DB::beginTransaction();

            DB::insert(
                'INSERT INTO users (name, email, password, phone, picture, role, can_host) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [
                    $data['name'],
                    $data['email'],
                    Hash::make($data['password']),
                    $data['phone'],
                    $data['picture'] ?? null,
                    $data['role'],
                    $data['can_host'] ?? false,
                ]
            );

            DB::commit();

            return response()->json(['message' => 'User registered successfully'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Registration failed: ' . $e->getMessage()], 500);
        }
    }

    public function login($data)
    {
        $user = DB::selectOne('SELECT * FROM users WHERE email = ?', [$data['email']]);

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
        try {
            $parser = new JwtParser(new JoseEncoder());
            $token = $parser->parse(str_replace('Bearer ', '', $tokenString));

            $signingKey = InMemory::plainText(config('app.jwt_secret'));
            $validator = new JWTValidator();

            if (!$validator->validate($token, new SignedWith(new Sha256(), $signingKey))) {
                return response()->json(['error' => 'Invalid token'], 403);
            }

            $user = DB::selectOne('SELECT * FROM users WHERE user_id = ?', [$token->claims()->get('uid')]);

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
        try {
            $parser = new JwtParser(new JoseEncoder());
            $token = $parser->parse(str_replace('Bearer ', '', $tokenString));

            // Check if the token is already expired
            $expiration = $token->claims()->get('exp');
            if ($expiration instanceof \DateTimeImmutable && $expiration <= new \DateTimeImmutable()) {
                return response()->json(['message' => 'Token already expired'], 401);
            }

            // Invalidate the token by adding it to the cache
            $tokenId = $token->claims()->get('jti');
            Cache::put('invalidated_token_' . $tokenId, true, now()->addMinutes(60));

            return response()->json(['message' => 'Logged out successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Logout error: ' . $e->getMessage()], 500);
        }
    }

    public function getProfile($user)
    {
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
    }

    public function updateProfile($user, array $data)
    {
        try {
            DB::beginTransaction();

            $updateFields = [];
            $params = [];

            if (isset($data['name'])) {
                $updateFields[] = 'name = ?';
                $params[] = $data['name'];
            }
            if (isset($data['email'])) {
                $updateFields[] = 'email = ?';
                $params[] = $data['email'];
            }
            if (isset($data['phone'])) {
                $updateFields[] = 'phone = ?';
                $params[] = $data['phone'];
            }
            if (isset($data['picture'])) {
                $updateFields[] = 'picture = ?';
                $params[] = $data['picture'];
            }
            if (isset($data['password'])) {
                $updateFields[] = 'password = ?';
                $params[] = Hash::make($data['password']);
            }
            if (isset($data['role'])) {
                $updateFields[] = 'role = ?';
                $params[] = $data['role'];
            }

            if (!empty($updateFields)) {
                $params[] = $user->user_id;
                $updateQuery = 'UPDATE users SET ' . implode(', ', $updateFields) . ' WHERE user_id = ?';
                DB::update($updateQuery, $params);
            }

            DB::commit();

            return response()->json(['message' => 'Profile updated successfully'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Error: ' . $e->getMessage()], 500);
        }
    }


    public function getEnrolledCourses(User $user)
    {
        $courses = $user->courses()->get(); // Assuming you have a many-to-many relationship
        return $courses;
    }
}