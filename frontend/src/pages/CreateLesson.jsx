import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Clock, VideoIcon, List } from "lucide-react";
import { toast } from "react-toastify";
import { getCourses } from "../services/courseService";
import { createLesson } from "../services/lessonService";

const CreateLesson = ({ isDarkMode }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [lessonData, setLessonData] = useState({
    course_id: "",
    title: "",
    description: "",
    content: "",
    video_url: "",
    duration: "",
    order: "",
    is_published: false,
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getCourses(true);
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to fetch courses!");
      }
    };
    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLessonData({
      ...lessonData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setLessonData((prevData) => ({ ...prevData, course_id: courseId }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!lessonData.course_id) {
      toast.error("Please select a course.");
      setLoading(false);
      return;
    }

    try {
      await createLesson(lessonData);

      // Reset form
      setLessonData({
        course_id: "",
        title: "",
        description: "",
        content: "",
        video_url: "",
        duration: "",
        order: "",
        is_published: false,
      });

      navigate("/mentor-courses");
    } catch (error) {
      console.error("Error creating lesson:", error);
      toast.error(error.message || "Failed to create lesson!");
    } finally {
      setLoading(false);
    }
  };

  // Common input class for consistency
  const inputClass = `w-full rounded-lg ${
    isDarkMode
      ? "bg-gray-700 border-gray-600 text-white focus:border-indigo-500"
      : "bg-white border-gray-300 focus:border-indigo-500"
  } border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200`;

  // Common label class for consistency
  const labelClass = `block mb-2 font-medium ${
    isDarkMode ? "text-gray-200" : "text-gray-700"
  }`;

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Hero Banner */}
      <div
        className={`${
          isDarkMode ? "bg-indigo-900" : "bg-indigo-700"
        } py-12 px-4`}
      >
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Create New Lesson
          </h1>
          <p className="text-indigo-200 text-lg max-w-2xl">
            Add engaging content to your courses with structured lessons that
            keep students motivated.
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div
          className={`${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } rounded-xl shadow-lg p-6 md:p-8`}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Form Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Course Selection */}
              <div className="md:col-span-2">
                <label htmlFor="course_id" className={labelClass}>
                  <BookOpen className="inline mr-2 h-5 w-5" />
                  Select Course
                </label>
                <select
                  id="course_id"
                  value={lessonData.course_id}
                  onChange={handleCourseChange}
                  required
                  className={inputClass}
                >
                  <option value="">Choose a course</option>
                  {courses.map((course) => (
                    <option key={course.course_id} value={course.course_id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div className="md:col-span-2">
                <label htmlFor="title" className={labelClass}>
                  Lesson Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={lessonData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter an engaging title for your lesson"
                  className={inputClass}
                />
              </div>

              {/* Video URL */}
              <div>
                <label htmlFor="video_url" className={labelClass}>
                  <VideoIcon className="inline mr-2 h-5 w-5" />
                  Video URL
                </label>
                <input
                  type="url"
                  id="video_url"
                  name="video_url"
                  value={lessonData.video_url}
                  onChange={handleInputChange}
                  placeholder="https://www.youtube.com/..."
                  className={inputClass}
                />
              </div>

              {/* Duration */}
              <div>
                <label htmlFor="duration" className={labelClass}>
                  <Clock className="inline mr-2 h-5 w-5" />
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={lessonData.duration}
                  onChange={handleInputChange}
                  min="1"
                  placeholder="30"
                  className={inputClass}
                />
              </div>

              {/* Order */}
              <div>
                <label htmlFor="order" className={labelClass}>
                  <List className="inline mr-2 h-5 w-5" />
                  Lesson Order
                </label>
                <input
                  type="number"
                  id="order"
                  name="order"
                  value={lessonData.order}
                  onChange={handleInputChange}
                  min="1"
                  placeholder="1"
                  className={inputClass}
                />
              </div>

              {/* Is Published */}
              <div className="flex items-center">
                <div
                  className={`flex items-center h-full ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  } px-4 py-3 rounded-lg`}
                >
                  <input
                    type="checkbox"
                    id="is_published"
                    name="is_published"
                    checked={lessonData.is_published}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="is_published"
                    className={`ml-3 ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Publish immediately
                  </label>
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label htmlFor="description" className={labelClass}>
                  Short Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={lessonData.description}
                  onChange={handleInputChange}
                  placeholder="Brief overview of what students will learn in this lesson"
                  className={`${inputClass} h-24`}
                />
              </div>

              {/* Content */}
              <div className="md:col-span-2">
                <label htmlFor="content" className={labelClass}>
                  Full Lesson Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={lessonData.content}
                  onChange={handleInputChange}
                  placeholder="Detailed lesson content with explanations, examples, and instructions"
                  className={`${inputClass} h-48`}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={() => navigate("/mentor-courses")}
                className={`py-3 px-6 rounded-lg text-sm font-medium ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition-colors duration-200`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`py-3 px-6 rounded-lg text-sm font-medium ${
                  loading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } text-white transition-colors duration-200 relative overflow-hidden`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating...
                  </span>
                ) : (
                  "Create Lesson"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateLesson;
