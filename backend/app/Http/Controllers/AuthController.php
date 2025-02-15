<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(Request $request)
    {
        return $this->authService->register($request->all());
    }

    public function login(Request $request)
    {
        return $this->authService->login($request->all());
    }

    public function refreshToken(Request $request)
    {
        return $this->authService->refreshToken($request->header('Authorization'));
    }

    public function logout(Request $request)
    {
        return $this->authService->logout($request->header('Authorization'));
    }

    public function getProfile(Request $request)
    {
        return $this->authService->getProfile($request->header('Authorization'));
    }

    public function updateProfile(Request $request)
    {
        return $this->authService->updateProfile($request->header('Authorization'), $request->all());
    }
}
