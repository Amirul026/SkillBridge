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
                //'rating' => $data['rating'] ?? 0,
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
    /**
     * Update an existing course using raw SQL.
     */
    public function updateCourse(int $courseId, array $data)
    {
        try {
            $affected = DB::table('courses')
                ->where('course_id', $courseId)
                ->update([
                    'is_paywalled' => $data['is_paywalled'] ?? DB::raw('is_paywalled'),
                    'title' => $data['title'] ?? DB::raw('title'),
                    'price' => $data['price'] ?? DB::raw('price'),
                    'description' => $data['description'] ?? DB::raw('description'),
                    'picture' => $data['picture'] ?? DB::raw('picture'),
                    'level' => $data['level'] ?? DB::raw('level'),
                    'type' => $data['type'] ?? DB::raw('type'),
                    'lesson_number' => $data['lesson_number'] ?? DB::raw('lesson_number'),
                    'length_in_weeks' => $data['length_in_weeks'] ?? DB::raw('length_in_weeks'),
                    'updated_at' => now(),
                ]);

            if ($affected === 0) {
                return response()->json(['error' => 'Course not found or no changes made'], 404);
            }

            $course = DB::table('courses')->where('course_id', $courseId)->first();

            return response()->json(['message' => 'Course updated successfully', 'course' => $course], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error updating course: ' . $e->getMessage()], 500);
        }
    }
}
