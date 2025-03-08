import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getLessonById, getLessonsByCourse } from "../services/lessonService";
import {
  markLessonAsComplete,
  markLessonAsIncomplete,
  getUserProgressForCourse,
} from "../services/progressService";

const LearnerLessonView = () => {
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [lessons, setLessons] = useState([]); // Store all lessons in the course
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false); // Track if the lesson is completed
  const navigate = useNavigate();

  // Fetch lesson details and list of lessons
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the current lesson
        const lessonResponse = await getLessonById(lessonId);
        if (lessonResponse && lessonResponse.lesson) {
          setLesson(lessonResponse.lesson);
        } else {
          setLesson(null);
        }

        // Fetch all lessons in the course
        const lessonsResponse = await getLessonsByCourse(courseId);
        if (lessonsResponse && lessonsResponse.lessons) {
          setLessons(lessonsResponse.lessons);
        } else {
          setLessons([]);
        }

        // Check if the lesson is already marked as complete
        const progressResponse = await getUserProgressForCourse(courseId);
        if (progressResponse && progressResponse.completed_lessons) {
          setIsCompleted(progressResponse.completed_lessons.includes(lessonId));
        }
      } catch (error) {
        toast.error("Failed to fetch lesson details!");
        console.error("Error fetching lesson:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, lessonId]);

  // Handle marking a lesson as complete or incomplete
  const handleToggleLessonStatus = async () => {
    try {
      if (isCompleted) {
        // Mark as incomplete
        await markLessonAsIncomplete(courseId, lessonId);
        setIsCompleted(false);
        toast.success("Lesson marked as incomplete!");
      } else {
        // Mark as complete
        await markLessonAsComplete(courseId, lessonId);
        setIsCompleted(true);
        toast.success("Lesson marked as complete!");
      }
    } catch (error) {
      toast.error("Failed to update lesson status!");
      console.error("Error updating lesson status:", error);
    }
  };

  // Handle navigation to the next or previous lesson
  const navigateToLesson = (direction) => {
    const currentIndex = lessons.findIndex(
      (lesson) => lesson.lesson_id === parseInt(lessonId)
    );

    if (direction === "next" && currentIndex < lessons.length - 1) {
      const nextLessonId = lessons[currentIndex + 1].lesson_id;
      navigate(`/courses/${courseId}/lessons/${nextLessonId}`);
    } else if (direction === "previous" && currentIndex > 0) {
      const previousLessonId = lessons[currentIndex - 1].lesson_id;
      navigate(`/courses/${courseId}/lessons/${previousLessonId}`);
    } else {
      toast.info(
        direction === "next"
          ? "This is the last lesson."
          : "This is the first lesson."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading lesson details...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-lg">
          <h2 className="text-red-600 text-xl font-semibold mb-2">
            Lesson Not Found
          </h2>
          <p className="text-gray-700">
            The lesson you're looking for doesn't exist or may have been
            removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white rounded-lg shadow-sm">
      {/* Lesson Header */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{lesson.title}</h1>
        <p className="mt-2 text-gray-600 text-lg">{lesson.description}</p>
        <div className="flex items-center mt-4">
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {lesson.duration} minutes
          </span>
        </div>
      </div>

      {/* Video Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Video Lecture
        </h2>
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
          <iframe
            src={lesson.video_url}
            title={lesson.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Content Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Lesson Content
        </h2>
        <div className="prose max-w-none bg-gray-50 p-6 rounded-lg">
          <p className="whitespace-pre-line">{lesson.content}</p>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <button
          onClick={() => navigateToLesson("previous")}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition"
        >
          Previous Lesson
        </button>
        <button
          onClick={handleToggleLessonStatus}
          className={`px-4 py-2 text-sm font-medium text-white ${
            isCompleted
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700"
          } rounded-md transition`}
        >
          {isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
        </button>
        <button
          onClick={() => navigateToLesson("next")}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition"
        >
          Next Lesson
        </button>
      </div>
    </div>
  );
};

export default LearnerLessonView;
