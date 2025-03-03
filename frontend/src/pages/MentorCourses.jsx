import { useEffect, useState } from 'react';
import { getCourses } from '../services/courseService';

const MentorCourses = ({ isDarkMode }) => {
  const [courses, setCourses] = useState();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getCourses(true); // Fetch mentor courses
        setCourses(coursesData);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className={`min-h-screen py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          My Courses
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              {course.picture && (
                <img
                  src={course.picture}
                  alt={course.title}
                  className="w-full h-40 object-cover mb-4"
                />
              )}
              <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {course.title}
              </h2>
              <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {course.description}
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Level: {course.level} | Type: {course.type}
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {course.lesson_number} lessons over {course.length_in_weeks} weeks
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorCourses;