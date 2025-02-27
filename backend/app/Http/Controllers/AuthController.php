<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'          => 'required|string|max:255',
            'email'         => 'required|string|email|max:255|unique:users',
            'password'      => 'required|string|min:6',
            'phone'         => 'required|string|unique:users',
            //'picture_file'  => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'role'          => 'required|string|in:Admin,Mentor,Learner',
            'can_host'      => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        return $this->authService->register($request->all());
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

        return $this->authService->login($request->all());
    }

    public function refreshToken(Request $request)
    {
        if (!$request->header('Authorization') || !str_starts_with($request->header('Authorization'), 'Bearer ')) {
            return response()->json(['error' => 'Token required'], 401);
        }

        return $this->authService->refreshToken($request->header('Authorization'));
    }

    public function logout(Request $request)
    {
        if (!$request->header('Authorization') || !str_starts_with($request->header('Authorization'), 'Bearer ')) {
            return response()->json(['error' => 'Token required'], 401);
        }

        return $this->authService->logout($request->header('Authorization'));
    }

    public function getProfile(Request $request)
    {
        if (!$request->header('Authorization') || !str_starts_with($request->header('Authorization'), 'Bearer ')) {
            return response()->json(['error' => 'Token required'], 401);
        }

        return $this->authService->getProfile($request->header('Authorization'));
    }

    public function updateProfile(Request $request)
    {
        if (!$request->header('Authorization') || !str_starts_with($request->header('Authorization'), 'Bearer ')) {
            return response()->json(['error' => 'Token required'], 401);
        }

        $userId = $this->getUserIdFromToken($request->header('Authorization'));
        if (!$userId) {
            return response()->json(['error' => 'Invalid token'], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $userId . ',user_id',
            'phone' => 'sometimes|required|string|unique:users,phone,' . $userId . ',user_id',
            'picture' => 'nullable|url',
            'password' => 'nullable|string|min:6',
            'role' => 'sometimes|required|string|in:Admin,Mentor,Learner',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        return $this->authService->updateProfile($request->header('Authorization'), $request->all());
    }

    /**
     * Extract user ID from the token
     * 
     * @param string $tokenString
     * @return mixed
     */
    private function getUserIdFromToken($tokenString)
    {
        try {
            $parser = new \Lcobucci\JWT\Token\Parser(new \Lcobucci\JWT\Encoding\JoseEncoder());
            $token = $parser->parse(str_replace('Bearer ', '', $tokenString));
            return $token->claims()->get('uid');
        } catch (\Exception $e) {
            return null;
        }
    }
}