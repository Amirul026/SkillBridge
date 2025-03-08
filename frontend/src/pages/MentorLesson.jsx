import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getLessonsByCourse,
  deleteLesson,
  updateLesson,
} from "../services/lessonService";
import {
  Trash,
  Edit,
  Play,
  Clock,
  Layers,
  Eye,
  EyeOff,
  Plus,
} from "lucide-react";

const MentorLesson = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingLesson, setEditingLesson] = useState(null);
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

  // Handle lesson deletion with confirmation
  const handleDeleteLesson = async (lessonId, lessonTitle) => {
    if (window.confirm(`Are you sure you want to delete "${lessonTitle}"?`)) {
      try {
        await deleteLesson(lessonId);
        toast.success("Lesson deleted successfully!");
        setLessons(lessons.filter((lesson) => lesson.lesson_id !== lessonId));
      } catch (error) {
        toast.error("Failed to delete lesson!");
        console.error("Error deleting lesson:", error);
      }
    }
  };

  // Handle lesson update
  const handleUpdateLesson = async (lessonId, updatedData) => {
    try {
      const updatedLesson = await updateLesson(lessonId, updatedData);
      toast.success("Lesson updated successfully!");
      setLessons(
        lessons.map((lesson) =>
          lesson.lesson_id === lessonId ? updatedLesson : lesson
        )
      );
      setEditingLesson(null);
    } catch (error) {
      toast.error("Failed to update lesson!");
      console.error("Error updating lesson:", error);
    }
  };

  // Handle lesson click (navigation to lesson details)
  const handleLessonClick = (lessonId) => {
    navigate(`/courses/${courseId}/lessons/${lessonId}`);
  };

  // Navigate to create new lesson
  const handleAddLesson = () => {
    navigate(`/create-lesson`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading lessons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Course Lessons</h1>
      </div>

      {lessons.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-12 bg-gray-50 p-4 font-medium text-gray-500 border-b">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-4">Lesson Details</div>
            <div className="col-span-3">Content Info</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>

          {lessons.map((lesson, index) => (
            <div
              key={lesson.lesson_id}
              className="grid grid-cols-12 p-4 border-b hover:bg-gray-50 transition-colors items-center"
            >
              {/* Order Number */}
              <div className="col-span-1 text-center">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-800 font-semibold">
                  {lesson.order || index + 1}
                </span>
              </div>

              {/* Lesson Details */}
              <div
                className="col-span-4"
                onClick={() => handleLessonClick(lesson.lesson_id)}
                role="button"
              >
                <h3 className="font-semibold text-gray-800 mb-1 hover:text-blue-600">
                  {lesson.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {lesson.description}
                </p>
              </div>

              {/* Content Info */}
              <div className="col-span-3">
                <div className="flex items-center gap-2 text-sm mb-1">
                  <Clock size={16} className="text-gray-400" />
                  <span>{lesson.duration || 0} minutes</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {lesson.video_url ? (
                    <div className="flex items-center gap-1 text-green-600">
                      <Play size={16} />
                      <span>Video available</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-gray-400">
                      <Play size={16} />
                      <span>No video</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="col-span-2 text-center">
                {lesson.is_published ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                    <Eye size={16} />
                    Published
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm font-medium">
                    <EyeOff size={16} />
                    Draft
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="col-span-2 flex justify-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingLesson(lesson);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit lesson"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteLesson(lesson.lesson_id, lesson.title);
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete lesson"
                >
                  <Trash size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Layers size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            No lessons available
          </h3>
          <p className="text-gray-500 mb-6">
            Start creating lessons for this course.
          </p>
          <button
            onClick={handleAddLesson}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg inline-flex items-center gap-2 transition-colors"
          >
            <Plus size={18} />
            <span>Add Your First Lesson</span>
          </button>
        </div>
      )}

      {/* Edit Lesson Modal */}
      {editingLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Edit Lesson</h2>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateLesson(editingLesson.lesson_id, {
                  title: editingLesson.title,
                  description: editingLesson.description,
                  content: editingLesson.content,
                  video_url: editingLesson.video_url,
                  duration: editingLesson.duration,
                  order: editingLesson.order,
                  is_published: editingLesson.is_published,
                });
              }}
            >
              <div className="p-6 space-y-6">
                {/* Title Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lesson Title
                  </label>
                  <input
                    type="text"
                    value={editingLesson.title}
                    onChange={(e) =>
                      setEditingLesson({
                        ...editingLesson,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  />
                </div>

                {/* Description Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editingLesson.description}
                    onChange={(e) =>
                      setEditingLesson({
                        ...editingLesson,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none h-24"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Video URL Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Video URL
                    </label>
                    <input
                      type="url"
                      value={editingLesson.video_url}
                      onChange={(e) =>
                        setEditingLesson({
                          ...editingLesson,
                          video_url: e.target.value,
                        })
                      }
                      placeholder="https://example.com/video"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Duration Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration (min)
                      </label>
                      <input
                        type="number"
                        value={editingLesson.duration}
                        onChange={(e) =>
                          setEditingLesson({
                            ...editingLesson,
                            duration: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        min="0"
                      />
                    </div>

                    {/* Order Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Order
                      </label>
                      <input
                        type="number"
                        value={editingLesson.order}
                        onChange={(e) =>
                          setEditingLesson({
                            ...editingLesson,
                            order: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Content Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lesson Content
                  </label>
                  <textarea
                    value={editingLesson.content}
                    onChange={(e) =>
                      setEditingLesson({
                        ...editingLesson,
                        content: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none h-40"
                  />
                </div>

                {/* Published Field */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_published"
                    checked={editingLesson.is_published}
                    onChange={(e) =>
                      setEditingLesson({
                        ...editingLesson,
                        is_published: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="is_published"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Publish this lesson (visible to students)
                  </label>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end gap-4 bg-gray-50 rounded-b-xl">
                <button
                  type="button"
                  onClick={() => setEditingLesson(null)}
                  className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorLesson;
