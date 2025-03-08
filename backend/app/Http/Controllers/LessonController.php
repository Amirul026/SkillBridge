<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\LessonService;
use App\Models\Course;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Exception;

class LessonController extends Controller
{
    protected $lessonService;

    public function __construct(LessonService $lessonService)
    {
        $this->lessonService = $lessonService;
    }

    /**
     * Create a new lesson.
     */
    public function createLesson(Request $request)
    {
        if (!$this->isMentor($request)) {
            return response()->json(['error' => 'Unauthorized: Only mentors can create lessons'], 403);
        }

        // Validate the request data, including course_id
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|integer|exists:courses,course_id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'video_url' => 'nullable|url',
            'duration' => 'nullable|integer|min:0',
            'order' => 'nullable|integer|min:0',
            'is_published' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $courseId = $request->input('course_id');
        $course = Course::findOrFail($courseId);

        if ($course->mentor_id !== $this->getUserIdFromToken($request->header('Authorization'))) {
            return response()->json([
                'error' => 'Unauthorized: Only the course creator can add lessons',
            ], 403);
        }

        try {
            $lessonData = array_merge($request->all(), ['course_id' => $courseId]);
            $lesson = $this->lessonService->createLesson($lessonData);
            return response()->json(['message' => 'Lesson created successfully', 'lesson' => $lesson], 201);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error creating lesson: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Update an existing lesson.
     */
    public function updateLesson(Request $request, $lessonId)
    {
        if (!$this->isMentor($request)) {
            return response()->json(['error' => 'Unauthorized: Only mentors can update lessons'], 403);
        }

        try {
            // Fetch the lesson with course data
            $lesson = $this->lessonService->getLessonById($lessonId);

            // Check if the logged-in user is the course creator
            if ($lesson->mentor_id !== $this->getUserIdFromToken($request->header('Authorization'))) {
                return response()->json(['error' => 'Unauthorized: Only the course creator can update lessons'], 403);
            }

            // Validate the request data
            $validator = Validator::make($request->all(), [
                'title' => 'sometimes|required|string|max:255',
                'description' => 'nullable|string',
                'content' => 'nullable|string',
                'video_url' => 'nullable|url',
                'duration' => 'nullable|integer|min:0',
                'order' => 'nullable|integer|min:0',
                'is_published' => 'nullable|boolean',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            // Update the lesson
            $updatedLesson = $this->lessonService->updateLesson($lessonId, $request->all());
            return response()->json(['message' => 'Lesson updated successfully', 'lesson' => $updatedLesson], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error updating lesson: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Get all lessons under a specific course.
     */
    public function getLessonsByCourse(Request $request, $courseId)
    {
        if (!$this->isMentor($request)) {
            return response()->json(['error' => 'Unauthorized: Only mentors can view lessons'], 403);
        }

        try {
            $lessons = $this->lessonService->getLessonsByCourse($courseId);
            return response()->json(['lessons' => $lessons], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error fetching lessons: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Get a single lesson by ID.
     */
    public function getLessonById(Request $request, $lessonId)
    {
        if (!$this->isMentor($request)) {
            return response()->json(['error' => 'Unauthorized: Only mentors can view this lesson'], 403);
        }

        try {
            $lesson = $this->lessonService->getLessonById($lessonId);
            return response()->json(['lesson' => $lesson], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error fetching lesson: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Delete a lesson.
     */
    public function deleteLesson(Request $request, $lessonId)
    {
        if (!$this->isMentor($request)) {
            return response()->json(['error' => 'Unauthorized: Only mentors can delete lessons'], 403);
        }

        try {
            // Fetch the lesson with course data
            $lesson = $this->lessonService->getLessonById($lessonId);

            // Check if the logged-in user is the course creator
            if ($lesson->mentor_id !== $this->getUserIdFromToken($request->header('Authorization'))) {
                return response()->json(['error' => 'Unauthorized: Only the course creator can delete lessons'], 403);
            }

            // Delete the lesson
            $this->lessonService->deleteLesson($lessonId);
            return response()->json(['message' => 'Lesson deleted successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error deleting lesson: ' . $e->getMessage()], 500);
        }
    }

    private function isMentor(Request $request)
    {
        $role = $this->getUserRoleFromToken($request->header('Authorization'));
        return $role === 'Mentor';
    }

    private function getUserRoleFromToken($tokenString)
    {
        try {
            $parser = new \Lcobucci\JWT\Token\Parser(new \Lcobucci\JWT\Encoding\JoseEncoder());
            $token = $parser->parse(str_replace('Bearer ', '', $tokenString));
            return $token->claims()->get('role');
        } catch (Exception $e) {
            return null;
        }
    }

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
