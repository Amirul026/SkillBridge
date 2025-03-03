<?php
namespace App\Services;

use Illuminate\Support\Facades\DB;
use Exception;

class LessonService
{
    /**
     * Create a new lesson using raw SQL.
     */
    public function createLesson(array $data)
    {
        try {
            $lessonId = DB::table('lessons')->insertGetId([
                'course_id' => $data['course_id'],
                'title' => $data['title'],
                'description' => $data['description'],
                'content' => $data['content'],
                'video_url' => $data['video_url'],
                'duration' => $data['duration'],
                'order' => $data['order'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return DB::table('lessons')->where('lesson_id', $lessonId)->first();
        } catch (Exception $e) {
            throw new Exception('Error creating lesson: ' . $e->getMessage());
        }
    }


}