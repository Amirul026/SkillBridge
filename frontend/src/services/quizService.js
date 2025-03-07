import api from './api';

// Fetch quiz questions (no courseId needed)
export const getQuizQuestions = async () => {
  try {
    const response = await api.get('/quiz/questions');
    console.log("Quiz Questions Response:", response.data); // Debugging
    return response.data.questions; // Ensure this matches the API response structure
  } catch (error) {
    console.error("Failed to fetch quiz questions:", error); // Debugging
    throw new Error('Failed to fetch quiz questions');
  }
};

// Submit quiz answers (no courseId needed)
export const submitQuizAnswers = async (answers) => {
  try {
    const response = await api.post('/quiz/submit', { answers });
    return response.data.result;
  } catch (error) {
    throw new Error('Failed to submit quiz');
  }
};
