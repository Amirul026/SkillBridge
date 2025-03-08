<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(Request $request)
    {
        $validatedData = $this->validateRequest($request, [
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'phone'    => 'required|string|unique:users',
            'role'     => 'required|string|in:Admin,Mentor,Learner',
            'can_host' => 'nullable|boolean',
        ]);

        return $validatedData instanceof \Illuminate\Http\JsonResponse
            ? $validatedData
            : $this->authService->register($validatedData);
    }

    public function login(Request $request)
    {
        $validatedData = $this->validateRequest($request, [
            'email'    => 'required|string|email',
            'password' => 'required|string',
        ]);

        return $validatedData instanceof \Illuminate\Http\JsonResponse
            ? $validatedData
            : $this->authService->login($validatedData);
    }

    public function refreshToken(Request $request)
    {
        $token = $this->extractToken($request);
        return $token instanceof \Illuminate\Http\JsonResponse
            ? $token
            : $this->authService->refreshToken($token);
    }

    public function logout(Request $request)
    {
        $user = $this->getAuthenticatedUser($request);
        return $user instanceof \Illuminate\Http\JsonResponse
            ? $user
            : $this->authService->logout($request->header('Authorization'));
    }

    public function getProfile(Request $request)
    {
        $user = $this->getAuthenticatedUser($request);
        return $user instanceof \Illuminate\Http\JsonResponse
            ? $user
            : $this->authService->getProfile($user);
    }

    public function updateProfile(Request $request)
    {
        $user = $this->getAuthenticatedUser($request);
        if ($user instanceof \Illuminate\Http\JsonResponse) return $user;

        $validatedData = $this->validateRequest($request, [
            'name'     => 'sometimes|required|string|max:255',
            'email'    => 'sometimes|required|string|email|max:255|unique:users,email,' . $user->user_id . ',user_id',
            'phone'    => 'sometimes|required|string|unique:users,phone,' . $user->user_id . ',user_id',
            'picture'  => 'nullable|url',
            'password' => 'nullable|string|min:6',
            'role'     => 'sometimes|required|string|in:Admin,Mentor,Learner',
        ]);

        return $validatedData instanceof \Illuminate\Http\JsonResponse
            ? $validatedData
            : $this->authService->updateProfile($user, $validatedData);
    }

    public function getEnrolledCourses(Request $request)
    {
        $user = $this->getAuthenticatedUser($request);
        return $user instanceof \Illuminate\Http\JsonResponse
            ? $user
            : response()->json($this->authService->getEnrolledCourses($user));
    }

    /**
     * Validate request data and return errors if validation fails.
     */
    private function validateRequest(Request $request, array $rules)
    {
        $validator = Validator::make($request->all(), $rules);
        return $validator->fails() ? response()->json($validator->errors(), 422) : $validator->validated();
    }

    /**
     * Extract token from request and validate format.
     */
    private function extractToken(Request $request)
    {
        $token = $request->header('Authorization');
        return (!$token || !str_starts_with($token, 'Bearer '))
            ? response()->json(['error' => 'Token required'], 401)
            : str_replace('Bearer ', '', $token);
    }

    /**
     * Retrieve the authenticated user from request attributes.
     */
    private function getAuthenticatedUser(Request $request)
    {
        $user = $request->attributes->get('user');
        return $user ?: response()->json(['error' => 'User not found'], 404);
    }
}
