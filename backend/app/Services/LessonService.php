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

    /**
     * Update an existing lesson using raw SQL.
     */
    public function updateLesson(int $lessonId, array $data)
    {
        try {
            $affected = DB::table('lessons')
                ->where('lesson_id', $lessonId)
                ->update([
                    'title' => $data['title'] ?? DB::raw('title'),
                    'description' => $data['description'] ?? DB::raw('description'),
                    'content' => $data['content'] ?? DB::raw('content'),
                    'video_url' => $data['video_url'] ?? DB::raw('video_url'),
                    'duration' => $data['duration'] ?? DB::raw('duration'),
                    'order' => $data['order'] ?? DB::raw('order'),
                    'is_published' => $data['is_published'] ?? DB::raw('is_published'),
                    'updated_at' => now(),
                ]);

            if ($affected === 0) {
                throw new Exception('Lesson not found or no changes made');
            }

            return DB::table('lessons')->where('lesson_id', $lessonId)->first();
        } catch (Exception $e) {
            throw new Exception('Error updating lesson: ' . $e->getMessage());
        }
    }

}