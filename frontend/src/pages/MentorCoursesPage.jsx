
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCourses,
  deleteCourse,
  updateCourse,
} from "../services/courseService";
import { toast } from "react-toastify";
import {
  BookOpen,
  Star,
  Clock,
  Users,
  Loader2,
  Trash,
  Edit,
} from "lucide-react";
import { Link } from 'react-router-dom'; // Import Link


const MentorCoursesPage = ({ isDarkMode }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState(null); // State for editing course
  const navigate = useNavigate();

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
      setCourses(courses.filter((course) => course.course_id !== courseId));
      toast.success("Course deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete course!");
    }
  };

  const handleUpdateCourse = async (courseId, updatedData) => {
    try {
      const updatedCourse = await updateCourse(courseId, updatedData);
      setCourses(
        courses.map((course) =>
          course.course_id === courseId ? updatedCourse : course
        )
      );
      setEditingCourse(null);
      toast.success("Course updated successfully!");
    } catch (error) {
      toast.error("Failed to update course!");
    }
  };

  // Function to handle course click
  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}/MentorLessons`);
  };

  const LoadingSkeleton = () => (
    <div
      className={`rounded-lg overflow-hidden ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } shadow-md`}
    >
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
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-full h-4 bg-gray-300 rounded animate-pulse"
            />
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
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} py-8`}>
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


                <div
                  
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
                      <span
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {course.type}
                      </span>
                      <span
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {course.level}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {course.title}
                    </h3>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      } mb-4`}
                    >
                      by {course.mentor_name}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <Star size={16} className="text-yellow-400" />
                      <span
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {course.rating} ({course.students} students)
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <Clock
                          size={16}
                          className={
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }
                        />
                        <span
                          className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {course.length_in_weeks} weeks
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users
                          size={16}
                          className={
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }
                        />
                        <span
                          className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {course.lesson_number} lessons
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen
                          size={16}
                          className={
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }
                        />
                        <span
                          className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {course.level}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t">
                      <span
                        className={`text-lg font-bold ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        ${course.price}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event bubbling to the parent div
                            handleDeleteCourse(course.course_id);
                          }}
                          className={`px-4 py-2 rounded-lg ${
                            isDarkMode
                              ? "bg-red-600 text-white"
                              : "bg-red-500 text-white"
                          } hover:opacity-90 transition-opacity`}
                        >
                          <Trash size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event bubbling to the parent div
                            setEditingCourse(course);
                          }}
                          className={`px-4 py-2 rounded-lg ${
                            isDarkMode
                              ? "bg-blue-600 text-white"
                              : "bg-blue-500 text-white"
                          } hover:opacity-90 transition-opacity`}
                        >
                          <Edit size={16} />
                        </button>
                        <Link // Link only on the button
                            key={course.id}
                            to={`/course/${course.course_id}`}
                            className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-white text-gray-900' : 'bg-[#1e1a53] text-white'} hover:opacity-90 transition-opacity no-underline`}
                             >
                                        GO LIVE
                          </Link>

                          <button
                             onClick={(e) => {
                             e.stopPropagation();
                              handleCourseClick(course.course_id);
                             }}
                             className={`px-4 py-2 rounded-lg ${
                            isDarkMode ? "bg-white text-gray-900" : "bg-[#1e1a53] text-white"
                             } hover:opacity-90 transition-opacity`}
                        >
                                    Lessons
                         </button>
                      </div>
                    </div>
                  </div>
                </div>
             
              ))}
        </div>
      </div>

      {editingCourse && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div
            className={`w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-xl transform transition-all ${
              isDarkMode ? "dark:text-white" : "text-gray-900"
            }`}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 border-b pb-2 dark:border-gray-700">
                Edit Course
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateCourse(editingCourse.course_id, editingCourse);
                }}
                className="space-y-6"
              >
                {/* Two-column layout for shorter fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <input
                      type="text"
                      value={editingCourse.title}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Price Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Price</label>
                    <input
                      type="number"
                      value={editingCourse.price}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          price: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      required
                    />
                  </div>

                  {/* Picture Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Picture URL</label>
                    <input
                      type="url"
                      value={editingCourse.picture}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          picture: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Level Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Level</label>
                    <input
                      type="text"
                      value={editingCourse.level}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          level: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Type Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <input
                      type="text"
                      value={editingCourse.type}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          type: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Lesson Number Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Number of Lessons
                    </label>
                    <input
                      type="number"
                      value={editingCourse.lesson_number}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          lesson_number: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="1"
                    />
                  </div>

                  {/* Length in Weeks Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Length in Weeks
                    </label>
                    <input
                      type="number"
                      value={editingCourse.length_in_weeks}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          length_in_weeks: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="1"
                    />
                  </div>

                  {/* Is Paywalled Field */}
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium">Is Paywalled</label>
                    <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                      <input
                        type="checkbox"
                        checked={editingCourse.is_paywalled}
                        onChange={(e) =>
                          setEditingCourse({
                            ...editingCourse,
                            is_paywalled: e.target.checked,
                          })
                        }
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      />
                      <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-600 cursor-pointer"></label>
                    </div>
                  </div>
                </div>

                {/* Description Field - Full width */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    value={editingCourse.description}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-32"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4 border-t dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => setEditingCourse(null)}
                    className="px-4 py-2 font-medium rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorCoursesPage;
