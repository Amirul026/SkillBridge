<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Facades\Log;

class CourseService
{
    /**
     * Create a new course using raw SQL with a transaction.
     */
    public function createCourse(array $data)
    {
        $sql = "INSERT INTO courses (mentor_id, is_paywalled, title, price, description, picture, level, type, lesson_number, length_in_weeks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        DB::insert($sql, [
            $data['mentor_id'],
            $data['is_paywalled'],
            $data['title'],
            $data['price'],
            $data['description'],
            $data['picture'] ?? null,
            $data['level'],
            $data['type'],
            $data['lesson_number'],
            $data['length_in_weeks'],
        ]);

        $courseId = DB::getPdo()->lastInsertId();

        $selectSql = "SELECT * FROM courses WHERE course_id = ?";

        $course = DB::selectOne($selectSql, [$courseId]);

        return $course;
    }

    /**
     * Update an existing course using raw SQL with a transaction.
     */
    public function updateCourse(int $courseId, array $data)
    {
        try {
            DB::beginTransaction();

            // Prepare the SQL query
            $sql = 'UPDATE courses SET 
                is_paywalled = ?,
                title = ?,
                price = ?,
                description = ?,
                picture = ?,
                level = ?,
                type = ?,
                lesson_number = ?,
                length_in_weeks = ?,
                updated_at = ?
                WHERE course_id = ?';

            // Prepare the bindings
            $bindings = [
                $data['is_paywalled'] ?? DB::raw('is_paywalled'),
                $data['title'] ?? DB::raw('title'),
                $data['price'] ?? DB::raw('price'),
                $data['description'] ?? DB::raw('description'),
                $data['picture'] ?? DB::raw('picture'),
                $data['level'] ?? DB::raw('level'),
                $data['type'] ?? DB::raw('type'),
                $data['lesson_number'] ?? DB::raw('lesson_number'),
                $data['length_in_weeks'] ?? DB::raw('length_in_weeks'),
                now(),
                $courseId,
            ];

            // Execute the update query
            $affected = DB::update($sql, $bindings);

            if ($affected === 0) {
                throw new Exception('Course not found or no changes made');
            }

            DB::commit();

            // Fetch the updated course
            $updatedCourse = DB::select('SELECT * FROM courses WHERE course_id = ?', [$courseId]);

            return $updatedCourse[0] ?? null;

        } catch (Exception $e) {
            DB::rollBack();
            throw $e; // Re-throw the exception to be handled by the caller
        }
    }


    /**
     * Delete a course using raw SQL with a transaction.
     */
    public function deleteCourse(int $courseId)
    {
        try {
            DB::beginTransaction();

            $sql = "DELETE FROM courses WHERE course_id = :course_id";
            $affected = DB::delete($sql, ['course_id' => $courseId]);

            if ($affected === 0) {
                throw new Exception('Course not found');
            }

            DB::commit();

            return true;
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception('Error deleting course: ' . $e->getMessage());
        }
    }

    /**
     * Get all courses using raw SQL.
     */
    public function getCourses()
    {
        try {
            $sql = "SELECT courses.*, users.name as mentor_name
                    FROM courses
                    JOIN users ON courses.mentor_id = users.user_id";

            $courses = DB::select($sql);
            return $courses;
        } catch (Exception $e) {
            Log::error('Error fetching courses: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Get a single course by ID using raw SQL.
     */
    public function getCourseById(int $courseId)
    {
        try {
            $sql = "SELECT courses.*, users.name as mentor_name
                    FROM courses
                    JOIN users ON courses.mentor_id = users.user_id
                    WHERE courses.course_id = :course_id";

            $courses = DB::select($sql, ['course_id' => $courseId]);
            return $courses ? $courses[0] : null;
        } catch (Exception $e) {
            Log::error('Error fetching course: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Get courses by mentor ID using raw SQL.
     */
    public function getCoursesByMentorId(int $mentorId)
    {
        try {
            $sql = "SELECT courses.*, users.name as mentor_name
                    FROM courses
                    JOIN users ON courses.mentor_id = users.user_id
                    WHERE courses.mentor_id = :mentor_id";

            $courses = DB::select($sql, ['mentor_id' => $mentorId]);
            return $courses;
        } catch (Exception $e) {
            Log::error('Error fetching courses: ' . $e->getMessage());
            throw $e;
        }
    }
}
