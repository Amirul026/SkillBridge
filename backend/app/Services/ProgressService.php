<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Models\Progress;
use App\Models\User;
use App\Models\Course;
use App\Models\Lesson;

class ProgressService
{

    public function markLessonAsComplete($userId, $courseId, $lessonId)
    {
        // Check if the progress record already exists
        $progress = DB::selectOne("
            SELECT * FROM progress
            WHERE user_id = ? AND course_id = ? AND lesson_id = ?
        ", [$userId, $courseId, $lessonId]);

        if ($progress) {
            // If the lesson is already marked as complete, do nothing
            return (array) $progress;
        }

        // Create a new progress record
        DB::insert("
            INSERT INTO progress (user_id, course_id, lesson_id, completed_lessons, created_at, updated_at)
            VALUES (?, ?, ?, 1, NOW(), NOW())
        ", [$userId, $courseId, $lessonId]);

        // Fetch the newly created progress record
        $newProgress = DB::selectOne("
            SELECT * FROM progress
            WHERE user_id = ? AND course_id = ? AND lesson_id = ?
        ", [$userId, $courseId, $lessonId]);

        return (array) $newProgress;
    }


    public function markLessonAsIncomplete($userId, $courseId, $lessonId)
    {
        // Delete the progress record if it exists
        $deleted = DB::delete("
            DELETE FROM progress
            WHERE user_id = ? AND course_id = ? AND lesson_id = ?
        ", [$userId, $courseId, $lessonId]);

        return $deleted > 0;
    }


    public function getUserProgressForCourse($userId, $courseId)
    {
        // Get all completed lessons for the user in the course
        $completedLessons = DB::select("
            SELECT lesson_id FROM progress
            WHERE user_id = ? AND course_id = ?
        ", [$userId, $courseId]);

        $completedLessonIds = array_map(function ($item) {
            return $item->lesson_id;
        }, $completedLessons);

        // Get all lessons in the course
        $lessons = DB::select("
            SELECT lesson_id, title, description FROM lessons
            WHERE course_id = ?
        ", [$courseId]);

        // Prepare the response
        $progress = [
            'completed_lessons' => $completedLessonIds,
            'total_lessons' => count($lessons),
            'lessons' => array_map(function ($lesson) use ($completedLessonIds) {
                return [
                    'lesson_id' => $lesson->lesson_id, // Use lesson_id instead of id
                    'title' => $lesson->title,
                    'description' => $lesson->description,
                    'is_completed' => in_array($lesson->lesson_id, $completedLessonIds), // Use lesson_id instead of id
                ];
            }, $lessons),
        ];

        return $progress;
    }
}