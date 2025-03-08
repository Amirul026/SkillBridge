import api from "./api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const markLessonAsComplete = async (courseId, lessonId) => {
  try {
    const token = Cookies.get("access_token");

    if (!token) {
      toast.error("User is not authenticated!");
      throw new Error("Access token not found");
    }

    const response = await api.post(
      `/courses/${courseId}/lessons/${lessonId}/complete`,
      {
        course_id: courseId,
        lesson_id: lessonId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    //console.log("API Response (markLessonAsComplete):", response.data);
    // toast.success("Lesson marked as complete!");

    return response.data;
  } catch (error) {
    console.error("Mark Lesson as Complete Error:", error);
    toast.error(
      error.response?.data?.error || "Failed to mark lesson as complete!"
    );
    throw error;
  }
};

export const markLessonAsIncomplete = async (courseId, lessonId) => {
  try {
    const token = Cookies.get("access_token");

    if (!token) {
      toast.error("User is not authenticated!");
      throw new Error("Access token not found");
    }

    const response = await api.post(
      `/courses/${courseId}/lessons/${lessonId}/incomplete`,
      {
        course_id: courseId,
        lesson_id: lessonId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    //console.log("API Response (markLessonAsIncomplete):", response.data);
    // toast.success("Lesson marked as incomplete!");

    return true;
  } catch (error) {
    console.error("Mark Lesson as Incomplete Error:", error);
    toast.error(
      error.response?.data?.error || "Failed to mark lesson as incomplete!"
    );
    throw error;
  }
};

export const getUserProgressForCourse = async (courseId) => {
  try {
    const token = Cookies.get("access_token");

    if (!token) {
      toast.error("User is not authenticated!");
      throw new Error("Access token not found");
    }

    const response = await api.get(`/courses/${courseId}/progress`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("API Response (getUserProgressForCourse):", response.data);
    return response.data;
  } catch (error) {
    console.error("Get User Progress Error:", error);
    toast.error(error.response?.data?.error || "Failed to fetch progress!");
    throw error;
  }
};
