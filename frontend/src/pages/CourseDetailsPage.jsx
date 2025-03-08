import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Star, Clock, Users, BookOpen, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

// Import the existing getCourses function
import { getCourses } from "../services/courseService";

const CourseDetailsPage = ({ isDarkMode }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        console.log("Fetching course details for courseId:", courseId);
        
        // Get all courses
        const coursesData = await getCourses();
        
        console.log("Courses data received:", coursesData);
        
        // Check if coursesData is an array
        if (!Array.isArray(coursesData)) {
          console.error("coursesData is not an array:", coursesData);
          setError("Invalid course data format");
          return;
        }
        
        // Important fix: Convert string IDs to the same type for comparison
        // courseId from params is always a string, so convert the course_id to string for comparison
        const foundCourse = coursesData.find(c => {
          console.log("Comparing:", { 
            courseIdParam: courseId, 
            courseIdType: typeof courseId,
            currentCourseId: c.course_id,
            currentCourseIdType: typeof c.course_id
          });
          
          return String(c.course_id) === String(courseId) || 
                 String(c._id) === String(courseId) || 
                 String(c.id) === String(courseId);
        });
        
        console.log("Found course:", foundCourse);
        
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          setError("Course not found");
          toast.error("Course not found");
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
        setError(error.message || "Failed to load course details");
        toast.error(error.message || "Failed to load course details");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-lg mx-auto">
          <h2 className="text-red-600 text-xl font-semibold mb-2">Course Not Found</h2>
          <p className="text-gray-700">
            {error || "The course you're looking for doesn't exist or may have been removed."}
          </p>
          <p className="text-gray-600 text-sm mt-2">Course ID: {courseId}</p>
          <button
            onClick={() => navigate('/courses')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <button 
          onClick={() => navigate('/courses')}
          className={`flex items-center gap-2 mb-6 ${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
        >
          <ArrowLeft size={16} />
          Back to Courses
        </button>

        {/* Course details */}
        <div className={`rounded-lg overflow-hidden ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
          {/* Course header */}
          <div className="relative">
            <img 
              src={course.picture || course.image || "https://via.placeholder.com/1200x400"} 
              alt={course.title} 
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <span className={`text-sm font-medium text-white bg-blue-600 px-3 py-1 rounded-full mb-2 inline-block`}>
                {course.category || "Uncategorized"}
              </span>
              <h1 className="text-3xl font-bold text-white mt-2">{course.title}</h1>
              <p className="text-gray-200 mt-1">by {course.instructor || course.instructorName || "Unknown Instructor"}</p>
            </div>
          </div>

          {/* Course info */}
          <div className="p-6">
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Star size={18} className="text-yellow-400" />
                <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                  {course.rating || "N/A"} ({course.students || course.enrolledStudents || 0} students)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className={isDarkMode ? "text-gray-400" : "text-gray-600"} />
                <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                  {course.duration || "N/A"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={18} className={isDarkMode ? "text-gray-400" : "text-gray-600"} />
                <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                  {course.students || course.enrolledStudents || 0} enrolled
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={18} className={isDarkMode ? "text-gray-400" : "text-gray-600"} />
                <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                  {course.lessons || course.lessonCount || 0} lessons
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">About This Course</h2>
              <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-4`}>
                {course.description || "No description available for this course."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <span className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                ${course.price || "Free"}
              </span>
              <div className="flex flex-1 gap-4 justify-end">
                <Link
                  to={`/courses/${course.course_id || course._id || course.id}/lessons`}
                  className={`px-6 py-3 rounded-lg ${
                    isDarkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  } transition-colors flex-1 text-center sm:flex-none`}
                >
                  View Lessons
                </Link>
                <Link // Link only on the button
                key={course.id}
                to={`/course/${course.course_id}`}
                className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-white text-gray-900' : 'bg-[#1e1a53] text-white'} hover:opacity-90 transition-opacity no-underline`}
              >
                Join Meeting
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;