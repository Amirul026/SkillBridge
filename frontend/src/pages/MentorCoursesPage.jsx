import React, { useState, useEffect } from 'react';
import { getCourses, deleteCourse, updateCourse } from '../services/courseService';
import { toast } from 'react-toastify';
import { BookOpen, Star, Clock, Users, Loader2, Trash, Edit } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link

const MentorCoursesPage = ({ isDarkMode }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses(true);
        setCourses(data);
      } catch (error) {
        toast.error("Failed to fetch courses!");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDeleteCourse = async (courseId) => {
    try {
      await deleteCourse(courseId);
      setCourses(courses.filter(course => course.course_id !== courseId));
      toast.success("Course deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete course!");
    }
  };

  const handleUpdateCourse = async (courseId, updatedData) => {
    try {
      const updatedCourse = await updateCourse(courseId, updatedData);
      setCourses(courses.map(course => course.course_id === courseId ? updatedCourse : course));
      setEditingCourse(null);
      toast.success("Course updated successfully!");
    } catch (error) {
      toast.error("Failed to update course!");
    }
  };

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
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} py-8`}>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">My Courses</h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            View all the courses you have created.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {loading
            ? Array(4).fill(0).map((_, index) => <LoadingSkeleton key={index} />)
            : courses.map(course => (
              <Link 
                  key={course.course_id} 
                  to={`/course/${course.course_id}`} 
                  className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md hover:shadow-lg transition-shadow no-underline`} // Add Link and no-underline class
                > 
                <div
                  key={course.course_id}
                  className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md hover:shadow-lg transition-shadow`}
                >
                  {course.picture && (
                    <img
                      src={course.picture}
                      alt={course.title}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <div className="flex justify-between mb-2">
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {course.type}
                      </span>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {course.level}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                      by {course.mentor_name}
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
                          {course.length_in_weeks} weeks
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {course.lesson_number} lessons
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
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDeleteCourse(course.course_id)}
                          className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-red-600 text-white' : 'bg-red-500 text-white'} hover:opacity-90 transition-opacity`}
                        >
                          <Trash size={16} />
                        </button>
                        <button
                          onClick={() => setEditingCourse(course)}
                          className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'} hover:opacity-90 transition-opacity`}
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                </Link>
              ))}
        </div>
      </div>

      {editingCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className={`bg-white p-6 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <h2 className="text-xl font-bold mb-4">Edit Course</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateCourse(editingCourse.course_id, editingCourse);
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={editingCourse.title}
                  onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={editingCourse.description}
                  onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Price</label>
                <input
                  type="number"
                  value={editingCourse.price}
                  onChange={(e) => setEditingCourse({ ...editingCourse, price: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="px-4 py-2 mr-2 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorCoursesPage;