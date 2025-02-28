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

        // Check if the token is present
        if (!$tokenString || !str_starts_with($tokenString, 'Bearer ')) {
            return response()->json(['error' => 'Unauthorized: Token missing'], 401);
        }

        try {
            // Parse the token
            $token = $this->parser->parse(str_replace('Bearer ', '', $tokenString));

            // Validate the token signature
            if (!$this->validator->validate($token, new SignedWith(new Sha256(), $this->signingKey))) {
                return response()->json(['error' => 'Unauthorized: Invalid token signature'], 403);
            }

            // Check if the token is expired
            $expiration = $token->claims()->get('exp');
            if ($expiration instanceof \DateTimeImmutable && $expiration <= new \DateTimeImmutable()) {
                return response()->json(['error' => 'Unauthorized: Token has expired'], 401);
            }

            // Check if the token is blacklisted (optional)
            $tokenId = $token->claims()->get('jti');
            if ($tokenId && Cache::has('invalidated_token_' . $tokenId)) {
                return response()->json(['error' => 'Unauthorized: Token is invalidated'], 401);
            }

            // Find user by 'uid' claim
            $userId = $token->claims()->get('uid');
            $user = User::find($userId);

            if (!$user) {
                return response()->json(['error' => 'Unauthorized: User not found'], 404);
            }

            // Attach user to the request
            $request->attributes->set('user', $user);

            return $next($request);
        } catch (\Exception $e) {
            // Log the error for debugging purposes
            Log::error('Token error: ' . $e->getMessage());

            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}
