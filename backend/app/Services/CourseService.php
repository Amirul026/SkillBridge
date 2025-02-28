<?php
namespace App\Services;

use Illuminate\Support\Facades\DB;

class CourseService
{
    /**
     * Create a new course using raw SQL.
     */
    public function createCourse(array $data)
    {
        try {
            $courseId = DB::table('courses')->insertGetId([
                'mentor_id' => $data['mentor_id'],
                'is_paywalled' => $data['is_paywalled'],
                'title' => $data['title'],
                'price' => $data['price'],
                'description' => $data['description'],
                'rating' => $data['rating'] ?? 0,
                'picture' => $data['picture'] ?? null,
                'level' => $data['level'],
                'type' => $data['type'],
                'lesson_number' => $data['lesson_number'],
                'length_in_weeks' => $data['length_in_weeks'],
            ]);

            $course = DB::table('courses')->where('course_id', $courseId)->first();

            return response()->json(['message' => 'Course created successfully', 'course' => $course], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error creating course: ' . $e->getMessage()], 500);
        }
    }
}
