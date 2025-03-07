<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class QuizController extends Controller
{
    // Static pool of quiz questions
    private static $quizQuestionsPool = [
        [
            'id' => 1,
            'question' => 'What is the capital of France?',
            'options' => ['Paris', 'London', 'Berlin', 'Madrid'],
            'correct_answer' => 'Paris',
        ],
        [
            'id' => 2,
            'question' => 'Which language is used for web development?',
            'options' => ['Java', 'Python', 'JavaScript', 'C++'],
            'correct_answer' => 'JavaScript',
        ],
        [
            'id' => 3,
            'question' => 'What is the largest planet in the solar system?',
            'options' => ['Earth', 'Jupiter', 'Saturn', 'Mars'],
            'correct_answer' => 'Jupiter',
        ],
        [
            'id' => 4,
            'question' => 'Who wrote "Romeo and Juliet"?',
            'options' => ['William Shakespeare', 'Charles Dickens', 'Mark Twain', 'Jane Austen'],
            'correct_answer' => 'William Shakespeare',
        ],
        [
            'id' => 5,
            'question' => 'What is the chemical symbol for water?',
            'options' => ['H2O', 'CO2', 'NaCl', 'O2'],
            'correct_answer' => 'H2O',
        ],
    ];

    // Fetch all quiz questions
    public function getQuizQuestions()
    {
        // Return all quiz questions from the pool
        return response()->json(['questions' => self::$quizQuestionsPool]);
    }

    // Submit quiz answers and calculate score
    public function submitQuizAnswers(Request $request)
    {
        $answers = $request->input('answers');

        // Calculate the score
        $correctAnswers = 0;
        foreach ($answers as $answer) {
            $question = collect(self::$quizQuestionsPool)->firstWhere('id', $answer['question_id']);

            if ($question && $answer['selected_option'] === $question['correct_answer']) {
                $correctAnswers++;
            }
        }

        $score = ($correctAnswers / count(self::$quizQuestionsPool)) * 100;

        return response()->json(['result' => ['score' => $score]]);
    }
}
