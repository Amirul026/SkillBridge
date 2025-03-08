<?php

use App\Http\Controllers\TestController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\MeetingController;

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

// Public routes
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

// Protected routes (require JWT authentication)
Route::middleware(['auth.jwt'])->group(function () {
    // User profile routes
    Route::get('/profile', [AuthController::class, 'getProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/profile/update', [AuthController::class, 'updateProfile']);

    // Course routes
    Route::post('/courses/create', [CourseController::class, 'createCourse']);
    Route::put('/courses/{courseId}', [CourseController::class, 'updateCourse']);
    Route::delete('/courses/{courseId}', [CourseController::class, 'deleteCourse']);
    // Route::get('/courses', [CourseController::class, 'getCourses']);
    // Route::get('/courses/{courseId}', [CourseController::class, 'getCourse']);

    Route::get('/courses', [CourseController::class, 'index']); // All courses
    Route::get('/mentor/courses', [CourseController::class, 'getCoursesByMentor']); // Courses by mentor

    // Lesson routes
    Route::post('/lessons', [LessonController::class, 'createLesson']);
    Route::put('/lessons/{lessonId}', [LessonController::class, 'updateLesson']);
    Route::delete('/lessons/{lessonId}', [LessonController::class, 'deleteLesson']);
    Route::get('/lessons/course/{courseId}', [LessonController::class, 'getLessonsByCourse']);
    Route::get('/lessons/{lessonId}', [LessonController::class, 'getLessonById']);





    // Fetch quiz questions
    Route::get('/quiz/questions', [QuizController::class, 'getQuizQuestions']);

    // Submit quiz answers
    Route::post('/quiz/submit', [QuizController::class, 'submitQuizAnswers']);


});

// Upload route
Route::post('/upload', [UploadController::class, 'upload']);

//meeting management
Route::post('/meetings', [MeetingController::class, 'store']);
Route::get('/meetings/{meeting}', [MeetingController::class, 'show']);


//enroll user
Route::get('/users/enrolled-courses', [AuthController::class, 'getEnrolledCourses']);
