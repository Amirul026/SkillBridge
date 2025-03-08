<?php
 namespace App\Services;
 
 use App\Models\QuizQuestion;
 use App\Models\QuizAnswer;
 use App\Models\QuizResult;
 use Illuminate\Support\Facades\DB;
 
 class QuizService
 {
     /**
      * Get quiz questions for a course.
      */
     public function getQuizQuestions($courseId)
     {
         return DB::select("
             SELECT id, course_id, question, options, correct_answer 
             FROM quiz_questions 
             WHERE course_id = ?
         ", [$courseId]);
     }
 
     /**
      * Submit quiz answers and calculate results.
      */
     public function submitQuizAnswers($userId, $courseId, $answers)
     {
         $totalQuestions = count($answers);
         $correctAnswers = 0;
 
         DB::beginTransaction();
         try {
             foreach ($answers as $answer) {
                 $question = DB::selectOne("
                     SELECT correct_answer 
                     FROM quiz_questions 
                     WHERE id = ? AND course_id = ?
                 ", [$answer['question_id'], $courseId]);
 
                 if (!$question) {
                     throw new \Exception("Invalid question ID: " . $answer['question_id']);
                 }
 
                 $isCorrect = ($answer['selected_option'] === $question->correct_answer);
                 if ($isCorrect) {
                     $correctAnswers++;
                 }
 
                 DB::insert("
                     INSERT INTO quiz_answers (user_id, course_id, question_id, selected_option, is_correct) 
                     VALUES (?, ?, ?, ?, ?)
                 ", [$userId, $courseId, $answer['question_id'], $answer['selected_option'], $isCorrect]);
             }
 
             $score = ($correctAnswers / $totalQuestions) * 100;
 
             DB::insert("
                 INSERT INTO quiz_results (user_id, course_id, total_questions, correct_answers, score) 
                 VALUES (?, ?, ?, ?, ?)
             ", [$userId, $courseId, $totalQuestions, $correctAnswers, $score]);
 
             DB::commit();
 
             return [
                 'total_questions' => $totalQuestions,
                 'correct_answers' => $correctAnswers,
                 'score' => $score,
             ];
         } catch (\Exception $e) {
             DB::rollBack();
             throw $e;
         }
     }
 
     /**
      * Get quiz results for a learner.
      */
     public function getQuizResults($userId, $courseId)
     {
         return DB::select("
             SELECT total_questions, correct_answers, score 
             FROM quiz_results 
             WHERE user_id = ? AND course_id = ?
         ", [$userId, $courseId]);
     }
 }