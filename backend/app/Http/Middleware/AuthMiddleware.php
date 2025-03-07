<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Lcobucci\JWT\Token\Parser as JwtParser;
use Lcobucci\JWT\Encoding\JoseEncoder;
use Lcobucci\JWT\Validation\Validator;
use Lcobucci\JWT\Validation\Constraint\SignedWith;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Signer\Key\InMemory;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB; // Import DB facade

class AuthMiddleware
{
    protected $parser;
    protected $validator;
    protected $signingKey;

    public function __construct()
    {
        $this->parser = new JwtParser(new JoseEncoder());
        $this->validator = new Validator();
        $this->signingKey = InMemory::plainText(env('JWT_SECRET'));
    }

    public function handle(Request $request, Closure $next)
    {
        $tokenString = $request->header('Authorization');

        Log::info('AuthMiddleware: Token received: ' . $tokenString);

        if (!$tokenString || !str_starts_with($tokenString, 'Bearer ')) {
            Log::info('AuthMiddleware: Token missing or invalid format.');
            return response()->json(['error' => 'Unauthorized: Token missing'], 401);
        }

        try {
            $token = $this->parser->parse(str_replace('Bearer ', '', $tokenString));

            if (!$this->validator->validate($token, new SignedWith(new Sha256(), $this->signingKey))) {
                Log::info('AuthMiddleware: Invalid token signature.');
                return response()->json(['error' => 'Unauthorized: Invalid token signature'], 403);
            }

            $expiration = $token->claims()->get('exp');
            if ($expiration instanceof \DateTimeImmutable && $expiration <= new \DateTimeImmutable()) {
                Log::info('AuthMiddleware: Token has expired.');
                return response()->json(['error' => 'Unauthorized: Token has expired'], 401);
            }

            $tokenId = $token->claims()->get('jti');
            if ($tokenId && Cache::has('invalidated_token_' . $tokenId)) {
                Log::info('AuthMiddleware: Token is invalidated.');
                return response()->json(['error' => 'Unauthorized: Token is invalidated'], 401);
            }

            $userId = (int) $token->claims()->get('uid'); // Cast to integer
            Log::info('AuthMiddleware: UID claim: ' . $userId);

            DB::enableQueryLog(); // Enable query logging
            $user = User::find($userId);
            Log::info('AuthMiddleware: Database queries: ' . json_encode(DB::getQueryLog())); // Log queries
            DB::disableQueryLog(); // Disable query logging

            if (!$user) {
                Log::info('AuthMiddleware: User not found for UID: ' . $userId);
                return response()->json(['error' => 'Unauthorized: User not found'], 404);
            }

            $request->attributes->set('user', $user);
            Log::info('AuthMiddleware: User authenticated: ' . $user->id);

            return $next($request);
        } catch (\Exception $e) {
            Log::error('AuthMiddleware: Token error: ' . $e->getMessage());
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}