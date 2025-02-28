<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CourseService;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

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
        if (!$request->header('Authorization') || !str_starts_with($request->header('Authorization'), 'Bearer ')) {
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
            //'rating' => 'nullable|numeric|min:0|max:5',
            'picture' => 'nullable|url',
            'level' => 'required|string',
            'type' => 'required|string',
            'lesson_number' => 'required|integer|min:1',
            'length_in_weeks' => 'required|integer|min:1',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        // Merge mentor_id into the request data
        $courseData = array_merge($request->all(), ['mentor_id' => $mentorId]);
    
        // Pass the merged data to the service
        return $this->courseService->createCourse($courseData);
    }
    /**
     * Update an existing course.
     */
    public function updateCourse(Request $request, $courseId)
    {
        if (!$request->header('Authorization') || !str_starts_with($request->header('Authorization'), 'Bearer ')) {
            return response()->json(['error' => 'Token required'], 401);
        }
    
        $role = $this->getUserRoleFromToken($request->header('Authorization'));
        if ($role !== 'Mentor') {
            return response()->json(['error' => 'Unauthorized: Only mentors can create courses'], 403);
        }

        $course = DB::table('courses')->where('course_id', $courseId)->first();
        if (!$course) {
            return response()->json(['error' => 'Course not found'], 404);
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

        return $this->courseService->updateCourse($courseId, $request->all());
    }


    private function getUserRoleFromToken($tokenString)
    {
        try {
            $parser = new \Lcobucci\JWT\Token\Parser(new \Lcobucci\JWT\Encoding\JoseEncoder());
            $token = $parser->parse(str_replace('Bearer ', '', $tokenString));
            return $token->claims()->get('role');
        } catch (\Exception $e) {
            return null;
        }
    }
}
