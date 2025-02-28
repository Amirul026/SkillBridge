<?php

use App\Http\Controllers\TestController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\CourseController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Route::get('/test', [TestController::class, 'getTestHuman']);
Route::get('/test/{id}', [TestController::class, 'getTestHumanWithId']);
Route::get('/test', function () {
    return response()->json(['message' => 'Backend connected successfully!']);
});

Route::get('/users', function () {
    return response()->json(User::all());
});



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/refresh-token', [AuthController::class, 'refreshToken']);

Route::middleware(['auth.jwt'])->group(function () {
    Route::get('/profile', [AuthController::class, 'getProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/profile/update', [AuthController::class, 'updateProfile']);
    Route::post('/courses/create', [CourseController::class, 'createCourse']);
    Route::put('/courses/{courseId}', [CourseController::class, 'updateCourse']);
    Route::delete('/courses/{courseId}', [CourseController::class, 'deleteCourse']); 
    Route::get('/courses', [CourseController::class, 'getCourses']); 
    Route::get('/courses/{courseId}', [CourseController::class, 'getCourse']); 
});
Route::post('/upload', [UploadController::class, 'upload']);
