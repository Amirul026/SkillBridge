import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getLessonById } from "../services/lessonService";
import "./LearnerLessonView.css"; // Import the CSS file

const LearnerLessonView = () => {
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch lesson details
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await getLessonById(lessonId);

        if (response && response.lesson) {
          setLesson(response.lesson);
        } else {
          setLesson(null);
        }
      } catch (error) {
        toast.error("Failed to fetch lesson details!");
        console.error("Error fetching lesson:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  if (loading) {
    return <div className="loading-message">Loading lesson details...</div>;
  }

  if (!lesson) {
    return <div className="error-message">Lesson not found.</div>;
  }

  return (
    <div className="lesson-container">
      <h1 className="lesson-title">{lesson.title}</h1>
      <div className="space-y-4">
        <p className="lesson-description">{lesson.description}</p>
        <div>
          <h2 className="section-heading">Content</h2>
          <p className="lesson-content">{lesson.content}</p>
        </div>
        <div>
          <h2 className="section-heading">Video</h2>
          <div className="video-container">
            <iframe
              src={lesson.video_url}
              title={lesson.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div>
          <h2 className="section-heading">Duration</h2>
          <p className="lesson-duration">{lesson.duration} minutes</p>
        </div>
      </div>
    </div>
  );
};

export default LearnerLessonView;
