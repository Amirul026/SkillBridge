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
  Trash2,
  Edit2,
  ExternalLink,
  Book,
  DollarSign,
  Award,
  Tag,
  CheckCircle,
  XCircle,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

const MentorCoursesPage = ({ isDarkMode }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState(null);
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
    if (!window.confirm("Are you sure you want to delete this course?")) return;

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

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}/MentorLessons`);
  };

  const LoadingSkeleton = () => (
    <div
      className={`rounded-xl overflow-hidden shadow-lg border ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } transition-all hover:shadow-xl`}
    >
      <div className="w-full h-48 bg-gray-300 animate-pulse" />
      <div className="p-5">
        <div className="flex justify-between mb-3">
          <div className="w-24 h-6 bg-gray-300 rounded-md animate-pulse" />
          <div className="w-24 h-6 bg-gray-300 rounded-md animate-pulse" />
        </div>
        <div className="w-full h-7 bg-gray-300 rounded-md animate-pulse mb-3" />
        <div className="w-3/4 h-6 bg-gray-300 rounded-md animate-pulse mb-5" />
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
          <div className="w-32 h-5 bg-gray-300 rounded-md animate-pulse" />
        </div>
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
              <div className="w-full h-5 bg-gray-300 rounded-md animate-pulse" />
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="w-20 h-8 bg-gray-300 rounded-md animate-pulse" />
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-10 h-10 bg-gray-300 rounded-lg animate-pulse"
              />
            ))}
          </div>
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
      {/* Header Section */}
      <div className={`${isDarkMode ? "bg-[#1e1a53]" : "bg-white"} py-10 shadow-md`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">My Courses</h1>
              <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Manage and monitor all your created courses
              </p>
            </div>
            <Link
              to="/create-course"
              className={`hidden md:flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all ${
                isDarkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Create New Course
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Create Button */}
      <Link
        to="/create-course"
        className={`md:hidden flex items-center justify-center gap-2 w-full px-5 py-3 rounded-lg font-medium transition-all mb-5 ${
          isDarkMode
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Create New Course
      </Link>

      {/* Courses Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? Array(8)
                .fill(0)
                .map((_, index) => <LoadingSkeleton key={index} />)
            : courses.map((course) => (
                <div
                  key={course.course_id}
                  className={`rounded-xl overflow-hidden shadow-lg border ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  } transition-all hover:shadow-xl`}
                >
                  <div className="relative overflow-hidden">
                    {course.picture ? (
                      <img
                        src={course.picture}
                        alt={course.title}
                        className="w-full h-48 object-cover transition-transform hover:scale-105"
                      />
                    ) : (
                      <div
                        className={`w-full h-48 flex items-center justify-center ${
                          isDarkMode ? "bg-gray-700" : "bg-gray-200"
                        }`}
                      >
                        <BookOpen
                          size={48}
                          className={isDarkMode ? "text-gray-500" : "text-gray-400"}
                        />
                      </div>
                    )}
                    <div
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                        course.is_paywalled
                          ? "bg-amber-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {course.is_paywalled ? "Premium" : "Free"}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between mb-2">
                      <span
                        className={`text-sm px-3 py-1 rounded-full ${
                          isDarkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <Tag size={14} />
                          {course.type}
                        </div>
                      </span>
                      <span
                        className={`text-sm px-3 py-1 rounded-full ${
                          isDarkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <Award size={14} />
                          {course.level}
                        </div>
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 line-clamp-2 h-14">
                      {course.title}
                    </h3>

                    <p
                      className={`text-sm flex items-center gap-2 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      } mb-4`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      {course.mentor_name}
                    </p>

                    {/* Student Rating Segment */}
                    <div className="flex items-center gap-2 mb-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-2">
                      <Star size={18} className="text-amber-500" />
                      <span
                        className={`text-sm ${
                          isDarkMode ? "text-amber-100" : "text-amber-700"
                        }`}
                      >
                        <span className="font-semibold">{course.rating}</span> (
                        {course.students} students)
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-5">
                      <div className="flex items-center gap-1.5">
                        <Clock
                          size={16}
                          className={isDarkMode ? "text-blue-400" : "text-blue-600"}
                        />
                        <span
                          className={`text-sm ${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {course.length_in_weeks} weeks
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Book
                          size={16}
                          className={isDarkMode ? "text-green-400" : "text-green-600"}
                        />
                        <span
                          className={`text-sm ${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {course.lesson_number} lessons
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Globe
                          size={16}
                          className={isDarkMode ? "text-purple-400" : "text-purple-600"}
                        />
                        <span
                          className={`text-sm ${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {course.level}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                      <span
                        className={`text-xl font-bold flex items-center ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        <DollarSign
                          size={20}
                          className={isDarkMode ? "text-green-400" : "text-green-600"}
                        />
                        {course.price}
                      </span>

                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCourse(course.course_id);
                          }}
                          className={`p-2 rounded-lg ${
                            isDarkMode
                              ? "bg-red-600/20 text-red-400 hover:bg-red-600/30"
                              : "bg-red-50 text-red-600 hover:bg-red-100"
                          } transition-colors`}
                          title="Delete course"
                        >
                          <Trash2 size={18} />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingCourse(course);
                          }}
                          className={`p-2 rounded-lg ${
                            isDarkMode
                              ? "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30"
                              : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                          } transition-colors`}
                          title="Edit course"
                        >
                          <Edit2 size={18} />
                        </button>

                        <Link
                          to={`/course/${course.course_id}`}
                          className={`p-2 rounded-lg ${
                            isDarkMode
                              ? "bg-purple-600/20 text-purple-400 hover:bg-purple-600/30"
                              : "bg-purple-50 text-purple-600 hover:bg-purple-100"
                          } transition-colors`}
                          title="View live course"
                        >
                          <ExternalLink size={18} />
                        </Link>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCourseClick(course.course_id);
                          }}
                          className={`p-2 rounded-lg ${
                            isDarkMode
                              ? "bg-green-600/20 text-green-400 hover:bg-green-600/30"
                              : "bg-green-50 text-green-600 hover:bg-green-100"
                          } transition-colors`}
                          title="Manage lessons"
                        >
                          <BookOpen size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* No Courses Found */}
        {!loading && courses.length === 0 && (
          <div
            className={`text-center py-16 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <BookOpen size={64} className="mx-auto mb-4 opacity-30" />
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="mb-6">You haven't created any courses yet.</p>
            <Link
              to="/create-course"
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all ${
                isDarkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Create Your First Course
            </Link>
          </div>
        )}
      </div>

      {/* Edit Modal Dialog */}
      {editingCourse && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div
            className={`w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-xl transform transition-all ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 border-b pb-3 dark:border-gray-700 flex items-center">
                <Edit2 size={22} className="mr-2 text-blue-500" />
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
                    <label className="text-sm font-medium flex items-center gap-1.5">
                      <BookOpen size={16} />
                      Title
                    </label>
                    <input
                      type="text"
                      value={editingCourse.title}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>

                  {/* Price Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-1.5">
                      <DollarSign size={16} />
                      Price
                    </label>
                    <input
                      type="number"
                      value={editingCourse.price}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          price: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                      min="0"
                      required
                    />
                  </div>

                  {/* Picture Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                      Picture URL
                    </label>
                    <input
                      type="url"
                      value={editingCourse.picture}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          picture: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                    />
                  </div>

                  {/* Level Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-1.5">
                      <Award size={16} />
                      Level
                    </label>
                    <select
                      value={editingCourse.level}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          level: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="All Levels">All Levels</option>
                    </select>
                  </div>

                  {/* Type Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-1.5">
                      <Tag size={16} />
                      Type
                    </label>
                    <input
                      type="text"
                      value={editingCourse.type}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          type: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                    />
                  </div>

                  {/* Lesson Number Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-1.5">
                      <Book size={16} />
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
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                      min="1"
                    />
                  </div>

                  {/* Length in Weeks Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-1.5">
                      <Clock size={16} />
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
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                      min="1"
                    />
                  </div>

                  {/* Is Paywalled Field */}
                  <div className="flex items-center space-x-3">
                    <div className="space-y-2 flex-1">
                      <label className="text-sm font-medium flex items-center gap-1.5">
                        <DollarSign size={16} />
                        Is Paywalled
                      </label>
                      <div className="flex items-center">
                        <div className="relative inline-block w-12 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            id="toggle"
                            checked={editingCourse.is_paywalled}
                            onChange={(e) =>
                              setEditingCourse({
                                ...editingCourse,
                                is_paywalled: e.target.checked,
                              })
                            }
                            className="sr-only"
                          />
                          <label
                            htmlFor="toggle"
                            className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                              editingCourse.is_paywalled
                                ? "bg-blue-500"
                                : "bg-gray-300 dark:bg-gray-600"
                            }`}
                          >
                            <span
                              className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                                editingCourse.is_paywalled
                                  ? "translate-x-6"
                                  : "translate-x-0"
                              }`}
                            ></span>
                          </label>
                        </div>
                        <span className="text-sm">
                          {editingCourse.is_paywalled ? (
                            <span className="flex items-center text-amber-500 dark:text-amber-400 font-medium">
                              <CheckCircle size={16} className="mr-1" />
                              Premium content
                            </span>
                          ) : (
                            <span className="flex items-center text-green-500 dark:text-green-400 font-medium">
                              <XCircle size={16} className="mr-1" />
                              Free content
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description Field - Full width */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-1.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="21" y1="6" x2="3" y2="6"></line>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                      <line x1="21" y1="18" x2="7" y2="18"></line>
                    </svg>
                    Description
                  </label>
                  <textarea
                    value={editingCourse.description || ""}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-32 text-gray-900 dark:text-gray-100"
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
                    className="px-4 py-2 font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors flex items-center gap-2"
                  >
                    <CheckCircle size={18} />
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