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
  const [completedLessons, setCompletedLessons] = useState([]); // Track completed lesson IDs
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
        toast.success("Lesson marked as incomplete!");
      } else {
        // Mark as complete
        await markLessonAsComplete(courseId, lessonId);
        setCompletedLessons((prev) => [...prev, lessonId]);
        toast.success("Lesson marked as complete!");
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
    return <div>Loading lessons...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Lessons</h1>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700">Course Progress</span>
          <span className="text-gray-700">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-500 h-2.5 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="space-y-4">
        {lessons.length > 0 ? (
          lessons.map((lesson) => {
            const isCompleted = completedLessons.includes(lesson.lesson_id);

            return (
              <div
                key={lesson.lesson_id}
                className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-100 transition-colors"
              >
                <div
                  onClick={() => handleLessonClick(lesson.lesson_id)}
                  className="cursor-pointer flex-1"
                >
                  <h2 className="text-xl font-semibold">{lesson.title}</h2>
                  <p className="text-gray-600">{lesson.description}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the lesson click event
                    handleToggleLessonStatus(lesson.lesson_id);
                  }}
                  className={`px-4 py-2 rounded ${
                    isCompleted
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white`}
                >
                  {isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
                </button>
              </div>
            );
          })
        ) : (
          <p>No lessons available for this course.</p>
        )}
      </div>
    </div>
  );
};

export default LessonPage;
