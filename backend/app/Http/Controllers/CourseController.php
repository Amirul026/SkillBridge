<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CourseService;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Lcobucci\JWT\Token\Parser;
use Lcobucci\JWT\Encoding\JoseEncoder;

class CourseController extends Controller
{
    protected $courseService;

    public function __construct(CourseService $courseService)
    {
        $this->courseService = $courseService;
    }

    /**
     * Create a new course.
     */
    public function createCourse(Request $request)
    {
        if (!$this->isValidToken($request)) {
            return response()->json(['error' => 'Token required'], 401);
        }

        $role = $this->getUserRoleFromToken($request->header('Authorization'));
        if ($role !== 'Mentor') {
            return response()->json(['error' => 'Unauthorized: Only mentors can create courses'], 403);
        }

        $user = $request->attributes->get('user');
        $mentorId = $user->user_id;

        $validator = Validator::make($request->all(), [
            'is_paywalled' => 'required|boolean',
            'title' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'required|string',
            'rating' => 'nullable|numeric|min:0|max:5',
            'picture' => 'nullable|url',
            'level' => 'required|string',
            'type' => 'required|string',
            'lesson_number' => 'required|integer|min:1',
            'length_in_weeks' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $courseData = array_merge($request->all(), ['mentor_id' => $mentorId]);

        try {
            $course = $this->courseService->createCourse($courseData);
            return response()->json(['message' => 'Course created successfully', 'course' => $course], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error creating course: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Update an existing course.
     */
    public function updateCourse(Request $request, $courseId)
    {
        if (!$this->isValidToken($request)) {
            return response()->json(['error' => 'Token required'], 401);
        }

        $role = $this->getUserRoleFromToken($request->header('Authorization'));
        if ($role !== 'Mentor') {
            return response()->json(['error' => 'Unauthorized: Only mentors can update courses'], 403);
        }

        $mentorId = $this->getUserIdFromToken($request->header('Authorization'));
        $course = DB::table('courses')->where('course_id', $courseId)->first();
        if (!$course || $course->mentor_id !== $mentorId) {
            return response()->json(['error' => 'Unauthorized: Only the creator can delete this course'], 403);
        }

        $validator = Validator::make($request->all(), [
            'is_paywalled' => 'boolean',
            'title' => 'string|max:255',
            'price' => 'numeric|min:0',
            'description' => 'string',
            'picture' => 'url',
            'level' => 'string',
            'type' => 'string',
            'lesson_number' => 'integer|min:1',
            'length_in_weeks' => 'integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            $course = $this->courseService->updateCourse($courseId, $request->all());
            return response()->json(['message' => 'Course updated successfully', 'course' => $course], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error updating course: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Delete a course.
     */
    public function deleteCourse(Request $request, $courseId)
    {
        if (!$this->isValidToken($request)) {
            return response()->json(['error' => 'Token required'], 401);
        }

        $role = $this->getUserRoleFromToken($request->header('Authorization'));
        if ($role !== 'Mentor') {
            return response()->json(['error' => 'Unauthorized: Only mentors can delete courses'], 403);
        }

        $mentorId = $this->getUserIdFromToken($request->header('Authorization'));
        $course = DB::table('courses')->where('course_id', $courseId)->first();
        if (!$course || $course->mentor_id !== $mentorId) {
            return response()->json(['error' => 'Unauthorized: Only the creator can delete this course'], 403);
        }

        try {
            $this->courseService->deleteCourse($courseId);
            return response()->json(['message' => 'Course deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error deleting course: ' . $e->getMessage()], 500);
        }
    }

    private function isValidToken(Request $request)
    {
        return $request->header('Authorization') && str_starts_with($request->header('Authorization'), 'Bearer ');
    }

    private function getUserRoleFromToken($tokenString)
    {
        try {
            $parser = new Parser(new JoseEncoder());
            $token = $parser->parse(str_replace('Bearer ', '', $tokenString));
            return $token->claims()->get('role');
        } catch (\Exception $e) {
            return null;
        }
    }

    private function getUserIdFromToken($tokenString)
    {
        try {
            $parser = new Parser(new JoseEncoder());
            $token = $parser->parse(str_replace('Bearer ', '', $tokenString));
            return $token->claims()->get('uid');
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Get all courses
     */
    public function index()
    {
        $courses = $this->courseService->getCourses();
        return response()->json($courses);
    }

    public function getCoursesByMentor(Request $request)
    {
        $user = $request->attributes->get('user');

        Log::info('CourseController: User object: ' . json_encode($user));

        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        $mentorId = $user->user_id;
        $courses = $this->courseService->getCoursesByMentorId($mentorId);
        return response()->json($courses);
    }
}
