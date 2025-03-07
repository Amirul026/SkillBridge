import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getLessonsByCourse } from "../services/lessonService";

const LessonPage = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch lessons for the course
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await getLessonsByCourse(courseId);

        if (response && response.lessons) {
          setLessons(response.lessons);
        } else {
          setLessons([]);
        }
      } catch (error) {
        toast.error("Failed to fetch lessons!");
        console.error("Error fetching lessons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [courseId]);

  const handleLessonClick = (lessonId) => {
    navigate(`/courses/${courseId}/lessons/${lessonId}`);
  };

  if (loading) {
    return <div>Loading lessons...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Lessons</h1>
      <div className="space-y-4">
        {lessons.length > 0 ? (
          lessons.map((lesson) => (
            <div
              key={lesson.lesson_id}
              onClick={() => handleLessonClick(lesson.lesson_id)}
              className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <h2 className="text-xl font-semibold">{lesson.title}</h2>
              <p className="text-gray-600">{lesson.description}</p>
            </div>
          ))
        ) : (
          <p>No lessons available for this course.</p>
        )}
      </div>
    </div>
  );
};

export default LessonPage;
