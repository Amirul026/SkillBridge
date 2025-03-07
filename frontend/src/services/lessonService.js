import api from "./api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// Create a new lesson
export const createLesson = async (lessonData) => {
  try {
    const token = Cookies.get("access_token");

    if (!token) {
      toast.error("User is not authenticated!");
      throw new Error("Access token not found");
    }

    const response = await api.post("/lessons/create", lessonData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("API Response (createLesson):", response.data);
    toast.success("Lesson created successfully!");

    return response.data;
  } catch (error) {
    console.error("Create Lesson Error:", error);
    toast.error(error.response?.data?.error || "Failed to create lesson!");
    throw error;
  }
};
// Update an existing lesson
export const updateLesson = async (lessonId, lessonData) => {
  try {
    const response = await api.put(`/lessons/${lessonId}`, lessonData, {
      headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
    });

    toast.success("Lesson updated successfully!");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.error || "Failed to update lesson!");
    throw error;
  }
};

// Delete a lesson
export const deleteLesson = async (lessonId) => {
  try {
    await api.delete(`/lessons/${lessonId}`, {
      headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
    });

    toast.success("Lesson deleted successfully!");
  } catch (error) {
    toast.error(error.response?.data?.error || "Failed to delete lesson!");
    throw error;
  }
};

// Get lessons by course ID
export const getLessonsByCourse = async (courseId) => {
  try {
    const response = await api.get(`/lessons/course/${courseId}`, {
      headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
    });

    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.error || "Failed to fetch lessons!");
    throw error;
  }
};

// Get a lesson by lesson ID
export const getLessonById = async (lessonId) => {
  try {
    const response = await api.get(`/lessons/${lessonId}`, {
      headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
    });

    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.error || "Failed to fetch lesson!");
    throw error;
  }
};
