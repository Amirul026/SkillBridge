<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ProgressService;
use Illuminate\Support\Facades\Validator;
use Exception;

class ProgressController extends Controller
{
    protected $progressService;

    public function __construct(ProgressService $progressService)
    {
        $this->progressService = $progressService;
    }

    /**
     * Mark a lesson as complete for the authenticated user.
     */
    public function markLessonAsComplete(Request $request, $courseId, $lessonId)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|integer|exists:courses,course_id',
            'lesson_id' => 'required|integer|exists:lessons,lesson_id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Get the authenticated user's ID
        $userId = $this->getUserIdFromToken($request->header('Authorization'));

        try {
            // Mark the lesson as complete
            $progress = $this->progressService->markLessonAsComplete($userId, $courseId, $lessonId);
            return response()->json(['message' => 'Lesson marked as complete.', 'progress' => $progress], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error marking lesson as complete: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Mark a lesson as incomplete for the authenticated user.
     */
    public function markLessonAsIncomplete(Request $request, $courseId, $lessonId)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|integer|exists:courses,course_id',
            'lesson_id' => 'required|integer|exists:lessons,lesson_id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Get the authenticated user's ID
        $userId = $this->getUserIdFromToken($request->header('Authorization'));

        try {
            // Mark the lesson as incomplete
            $success = $this->progressService->markLessonAsIncomplete($userId, $courseId, $lessonId);

            if ($success) {
                return response()->json(['message' => 'Lesson marked as incomplete.'], 200);
            }

            return response()->json(['error' => 'Lesson was not marked as complete.'], 400);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error marking lesson as incomplete: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Get the progress of the authenticated user for a specific course.
     */
    public function getUserProgressForCourse(Request $request, $courseId)
    {
        // Validate the request data
        $validator = Validator::make(['course_id' => $courseId], [
            'course_id' => 'required|integer|exists:courses,course_id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Get the authenticated user's ID
        $userId = $this->getUserIdFromToken($request->header('Authorization'));

        try {
            // Fetch the user's progress for the course
            $progress = $this->progressService->getUserProgressForCourse($userId, $courseId);
            return response()->json($progress, 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error fetching progress: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Get the authenticated user's ID from the JWT token.
     */
    private function getUserIdFromToken($tokenString)
    {
        try {
            $parser = new \Lcobucci\JWT\Token\Parser(new \Lcobucci\JWT\Encoding\JoseEncoder());
            $token = $parser->parse(str_replace('Bearer ', '', $tokenString));
            return $token->claims()->get('uid');
        } catch (Exception $e) {
            return null;
        }
    }
}