<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Exception;

class ProgressService
{
    /**
     * Get the current progress for a user and course.
     *
     * @param int $courseId
     * @param int $userId
     * @return array
     * @throws Exception
     */
    public function getProgress(int $courseId, int $userId)
    {
        try {
            // Fetch the current progress for the user and course
            $progress = DB::table('progress')
                ->where('user_id', $userId)
                ->where('course_id', $courseId)
                ->first();

            // Fetch the total number of lessons for the course
            $totalLessons = DB::table('lessons')
                ->where('course_id', $courseId)
                ->count();

            // If no progress record exists, assume 0 completed lessons
            if (!$progress) {
                return [
                    'completed_lessons' => 0,
                    'total_lessons' => $totalLessons,
                ];
            }

            return [
                'completed_lessons' => $progress->completed_lessons,
                'total_lessons' => $totalLessons,
            ];
        } catch (Exception $e) {
            throw new Exception('Error fetching progress: ' . $e->getMessage());
        }
    }

    /**
     * Update the progress when a lesson is completed.
     *
     * @param int $courseId
     * @param int $userId
     * @return array
     * @throws Exception
     */
    public function updateProgress(int $courseId, int $userId)
    {
        try {
            // Check if a progress record already exists
            $progress = DB::table('progress')
                ->where('user_id', $userId)
                ->where('course_id', $courseId)
                ->first();

            if ($progress) {
                // Update the existing progress record
                DB::table('progress')
                    ->where('user_id', $userId)
                    ->where('course_id', $courseId)
                    ->increment('completed_lessons');
            } else {
                // Create a new progress record
                DB::table('progress')->insert([
                    'user_id' => $userId,
                    'course_id' => $courseId,
                    'completed_lessons' => 1,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            // Fetch the updated progress
            return $this->getProgress($courseId, $userId);
        } catch (Exception $e) {
            throw new Exception('Error updating progress: ' . $e->getMessage());
        }
    }

    /**
     * Decrement the progress when a lesson is marked as incomplete.
     *
     * @param int $courseId
     * @param int $userId
     * @return array
     * @throws Exception
     */
    public function decrementProgress(int $courseId, int $userId)
    {
        try {
            // Check if a progress record exists and has completed lessons
            $progress = DB::table('progress')
                ->where('user_id', $userId)
                ->where('course_id', $courseId)
                ->first();

            if ($progress && $progress->completed_lessons > 0) {
                // Decrement the completed lessons count
                DB::table('progress')
                    ->where('user_id', $userId)
                    ->where('course_id', $courseId)
                    ->decrement('completed_lessons');
            } else {
                throw new Exception('No progress to decrement');
            }

            // Fetch the updated progress
            return $this->getProgress($courseId, $userId);
        } catch (Exception $e) {
            throw new Exception('Error decrementing progress: ' . $e->getMessage());
        }
    }
}