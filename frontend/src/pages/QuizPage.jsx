import React, { useEffect, useState } from 'react';
import { getQuizQuestions, submitQuizAnswers } from '../services/quizService';

const QuizPage = ({ isDarkMode }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await getQuizQuestions();
        setQuestions(fetchedQuestions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
        setError("Failed to load quiz questions. Please try again.");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers(prevAnswers => {
      const updatedAnswers = prevAnswers.filter(answer => answer.question_id !== questionId);
      updatedAnswers.push({ question_id: questionId, selected_option: selectedOption });
      return updatedAnswers;
    });
  };

  const handleSubmit = async () => {
    if (answers.length !== questions.length) {
      setError("Please answer all questions before submitting.");
      return;
    }

    try {
      const result = await submitQuizAnswers(answers);
      setScore(result.score);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting quiz answers:", error);
      setError("Failed to submit quiz. Please try again.");
    }
  };

  const resetQuiz = () => {
    setAnswers([]);
    setScore(null);
    setIsSubmitted(false);
    setError(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-t-blue-600 border-blue-300 dark:border-t-blue-400 dark:border-blue-700 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className={`border rounded-lg px-4 py-3 mb-4 ${isDarkMode ? 'bg-red-900/20 border-red-800 text-red-300' : 'bg-red-50 border-red-200 text-red-700'}`}>
          <p className="font-semibold">{error}</p>
        </div>
        {error === "Failed to load quiz questions. Please try again." && (
          <button 
            onClick={() => window.location.reload()} 
            className={`mt-4 w-full py-3 rounded-lg text-white ${isDarkMode ? 'bg-[#1e1a53]' : 'bg-[#1e1a53]'} hover:opacity-90 transition-colors`}
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className={`max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border transition-colors duration-300`}>
        <div className="p-6 sm:p-10">
          <h1 className={`text-2xl sm:text-3xl font-bold text-center mb-8 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
            Knowledge Quiz Challenge
          </h1>

          {!isSubmitted ? (
            <>
              {questions.map((question, questionIndex) => (
                <div 
                  key={question.id} 
                  className={`rounded-lg p-4 sm:p-6 mb-6 border ${isDarkMode ? 'bg-gray-700/30 border-gray-600' : 'bg-gray-100 border-gray-200'}`}
                >
                  <h3 className={`text-lg sm:text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    {questionIndex + 1}. {question.question}
                  </h3>
                  <div className="space-y-3">
                    {question.options.map((option, index) => (
                      <label 
                        key={index} 
                        className={`block p-3 rounded-lg cursor-pointer transition-all border
                          ${answers.find(a => a.question_id === question.id && a.selected_option === option) 
                            ? `${isDarkMode ? 'bg-[#1e1a53] text-white' : 'bg-[#1e1a53] text-white'} border-transparent` 
                            : `${isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' 
                              : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50'}`}`}
                      >
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option}
                          className="mr-3 hidden"
                          onChange={() => handleAnswerChange(question.id, option)}
                          checked={answers.find(a => a.question_id === question.id && a.selected_option === option) !== undefined}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <div className="text-center mt-8">
                <button 
                  onClick={handleSubmit}
                  disabled={answers.length !== questions.length}
                  className={`w-full sm:w-auto px-6 py-3 rounded-lg text-white font-bold transition-colors 
                    ${answers.length === questions.length 
                      ? `${isDarkMode ? 'bg-[#1e1a53]' : 'bg-[#1e1a53]'} hover:opacity-90` 
                      : 'bg-gray-400 cursor-not-allowed'}`}
                >
                  Submit Quiz
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Quiz Results
              </h2>
              <div 
                className={`text-5xl sm:text-6xl font-bold mb-6 
                  ${score >= questions.length * 0.7 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'}`}
              >
                {score}/{questions.length}
              </div>
              <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {score >= questions.length * 0.7 
                  ? "Congratulations! Excellent performance!" 
                  : "Don't worry. Keep learning and you'll improve!"}
              </p>
              <button 
                onClick={resetQuiz}
                className={`px-6 py-3 rounded-lg text-white ${isDarkMode ? 'bg-[#1e1a53]' : 'bg-[#1e1a53]'} hover:opacity-90 transition-colors`}
              >
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;