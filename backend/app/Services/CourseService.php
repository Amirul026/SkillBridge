<?php
namespace App\Services;

use Illuminate\Support\Facades\DB;
use Exception;

class CourseService
{
    /**
     * Create a new course using raw SQL.
     */
    public function createCourse(array $data)
    {
        $courseId = DB::table('courses')->insertGetId([
            'mentor_id' => $data['mentor_id'],
            'is_paywalled' => $data['is_paywalled'],
            'title' => $data['title'],
            'price' => $data['price'],
            'description' => $data['description'],
            'picture' => $data['picture'] ?? null,
            'level' => $data['level'],
            'type' => $data['type'],
            'lesson_number' => $data['lesson_number'],
            'length_in_weeks' => $data['length_in_weeks'],
        ]);

        return DB::table('courses')->where('course_id', $courseId)->first();
    }

    /**
     * Update an existing course using raw SQL.
     */
    public function updateCourse(int $courseId, array $data)
    {
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
            throw new Exception('Course not found or no changes made');
        }

        return DB::table('courses')->where('course_id', $courseId)->first();
    }

    /**
     * Delete a course using raw SQL.
     */
    public function deleteCourse(int $courseId)
    {
        $affected = DB::table('courses')->where('course_id', $courseId)->delete();

        if ($affected === 0) {
            throw new Exception('Course not found');
        }
        return true;
    }
}
