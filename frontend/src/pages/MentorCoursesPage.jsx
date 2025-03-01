import React, { useState, useEffect } from 'react';
import { getCourses } from '../services/courseService';
import { toast } from 'react-toastify';
import { BookOpen, Star, Clock, Users, Loader2 } from 'lucide-react';

const MentorCoursesPage = ({ isDarkMode }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        toast.error("Failed to fetch courses!");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      <div className="w-full h-40 bg-gray-300 animate-pulse" />
      <div className="p-4">
        <div className="flex justify-between mb-2">
          <div className="w-20 h-6 bg-gray-300 rounded-full animate-pulse" />
          <div className="w-20 h-6 bg-gray-300 rounded-full animate-pulse" />
        </div>
        <div className="w-full h-6 bg-gray-300 rounded animate-pulse mb-2" />
        <div className="w-3/4 h-6 bg-gray-300 rounded animate-pulse mb-4" />
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
          <div className="w-32 h-4 bg-gray-300 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-full h-4 bg-gray-300 rounded animate-pulse" />
          ))}
        </div>
        <div className="flex justify-between items-center pt-3 border-t">
          <div className="w-16 h-6 bg-gray-300 rounded animate-pulse" />
          <div className="w-24 h-8 bg-gray-300 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} py-8`}>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">My Courses</h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            View all the courses you have created.
          </p>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {loading
            ? Array(4).fill(0).map((_, index) => <LoadingSkeleton key={index} />)
            : courses.map(course => (
                <div
                  key={course.id}
                  className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md hover:shadow-lg transition-shadow`}
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between mb-2">
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {course.category}
                      </span>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {course.level}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                      by {course.instructor}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <Star size={16} className="text-yellow-400" />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {course.rating} ({course.students} students)
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {course.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {course.lessons} lessons
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {course.level}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t">
                      <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        ${course.price}
                      </span>
                      <button
                        className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-white text-gray-900' : 'bg-[#1e1a53] text-white'} hover:opacity-90 transition-opacity`}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default MentorCoursesPage;