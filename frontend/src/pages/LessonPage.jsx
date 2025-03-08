import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getLessonsByCourse } from "../services/lessonService";
import {
  markLessonAsComplete,
  markLessonAsIncomplete,
  getUserProgressForCourse,
} from "../services/progressService";

const LessonPage = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch lessons and user progress for the course
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch lessons
        const lessonsResponse = await getLessonsByCourse(courseId);
        if (lessonsResponse && lessonsResponse.lessons) {
          setLessons(lessonsResponse.lessons);
        } else {
          setLessons([]);
        }

        // Fetch user progress
        const progressResponse = await getUserProgressForCourse(courseId);
        if (progressResponse && progressResponse.completed_lessons) {
          setCompletedLessons(progressResponse.completed_lessons);
        }
      } catch (error) {
        toast.error("Failed to fetch data!");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  // Handle marking a lesson as complete or incomplete
  const handleToggleLessonStatus = async (lessonId) => {
    try {
      const isCompleted = completedLessons.includes(lessonId);

      if (isCompleted) {
        // Mark as incomplete
        await markLessonAsIncomplete(courseId, lessonId);
        setCompletedLessons((prev) => prev.filter((id) => id !== lessonId));
        // toast.success("Lesson marked as incomplete!");
      } else {
        // Mark as complete
        await markLessonAsComplete(courseId, lessonId);
        setCompletedLessons((prev) => [...prev, lessonId]);
        // toast.success("Lesson marked as complete!");
      }
    } catch (error) {
      toast.error("Failed to update lesson status!");
      console.error("Error updating lesson status:", error);
    }
  };

  // Handle clicking on a lesson
  const handleLessonClick = (lessonId) => {
    navigate(`/courses/${courseId}/lessons/${lessonId}`);
  };

  // Calculate progress percentage
  const totalLessons = lessons.length;
  const completedCount = completedLessons.length;
  const progressPercentage =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-lg font-medium text-gray-600">
          Loading lessons...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Course Lessons</h1>
          <div className="mt-4 sm:mt-0 flex items-center">
            <span className="text-gray-700 font-medium mr-2">
              {completedCount} of {totalLessons} completed
            </span>
            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded-full">
              {progressPercentage}%
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Lessons Grid */}
      {lessons.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {lessons.map((lesson) => {
            const isCompleted = completedLessons.includes(lesson.lesson_id);

            return (
              <div
                key={lesson.lesson_id}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition hover:shadow-md"
              >
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => handleLessonClick(lesson.lesson_id)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {lesson.title}
                    </h2>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleLessonStatus(lesson.lesson_id);
                      }}
                      className={`ml-4 w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
                        isCompleted ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                          isCompleted ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </div>
                  </div>
                  <p className="text-gray-600">{lesson.description}</p>

                  <div className="flex items-center mt-4 text-sm">
                    <span
                      className={`inline-flex items-center ${
                        isCompleted ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={
                            isCompleted
                              ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              : "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          }
                        />
                      </svg>
                      {isCompleted ? "Completed" : "Not completed"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.663 17h4.673M12 3v1m0 16v1m-9-9h1m16 0h1m-15.4-6.4l.7.7m12.1-.7l-.7.7m-12.1 12.1l.7-.7m12.1.7l-.7-.7M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No lessons available
          </h3>
          <p className="mt-1 text-gray-500">
            This course doesn't have any lessons yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default LessonPage;
