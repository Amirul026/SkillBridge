<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\Encoding\JoseEncoder;
use Lcobucci\JWT\Validation\Validator as JWTValidator;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Signer\Key\InMemory;
use App\Models\User;
use DateTimeImmutable;

class AuthMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $tokenString = $request->header('Authorization');

        if (!$tokenString) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        try {
            // Parse the token
            $parser = new Parser(new JoseEncoder());
            $token = $parser->parse(str_replace('Bearer ', '', $tokenString));

            // Validate the token
            $signingKey = InMemory::plainText(config('app.jwt_secret'));
            $validator = new JWTValidator();

            if (!$validator->validate($token, new Sha256(), $signingKey)) {
                return response()->json(['error' => 'Invalid token'], 403);
            }

            // Manually check if the token is expired
            $now = new DateTimeImmutable();
            $exp = $token->claims()->get('exp');
            if ($exp && $now->getTimestamp() > $exp) {
                return response()->json(['error' => 'Token has expired'], 401);
            }

            // Find user by 'uid' claim
            $userId = $token->claims()->get('uid');
            $user = User::find($userId);

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            // Attach user to the request
            $request->attributes->add(['user' => $user]);

            return $next($request);

        } catch (\Exception $e) {
            // Log the error for debugging purposes
            \Log::error('Token error: ' . $e->getMessage());

            return response()->json(['error' => 'Token error'], 401);
        }
    }
}
