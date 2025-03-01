// pages/IndividualCoursePage.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, ArrowLeft } from 'lucide-react';

const IndividualCoursePage = ({ isDarkMode }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Sample course data
  const course = {
    id: courseId,
    title: "Advanced React Patterns",
    description: "Master advanced React patterns and best practices to build scalable and maintainable applications.",
    progress: 65,
    lessons: [
      { id: 1, title: "Introduction to React Patterns", duration: "15 mins" },
      { id: 2, title: "Higher-Order Components", duration: "20 mins" },
      { id: 3, title: "Render Props", duration: "18 mins" },
    ],
  };

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold flex items-center space-x-2">
            <BookOpen className="w-8 h-8" />
            <span>{course.title}</span>
          </h1>
        </div>

        <div className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <p className="mb-6 text-lg">{course.description}</p>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Lessons</h2>
            <div className="space-y-3">
              {course.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{lesson.title}</span>
                    <span className="text-sm text-gray-500">{lesson.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Progress</h2>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-500 mt-2">{course.progress}% completed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualCoursePage;