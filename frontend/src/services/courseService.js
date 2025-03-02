import api from "./api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// Create a new course
export const createCourse = async (courseData) => {
  try {
    const response = await api.post("/courses/create", courseData, {
      headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
    });

    toast.success("Course created successfully!");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.error || "Failed to create course!");
    throw error;
  }
};

// Update an existing course
export const updateCourse = async (courseId, courseData) => {
  try {
    const response = await api.put(`/courses/${courseId}`, courseData, {
      headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
    });

    toast.success("Course updated successfully!");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.error || "Failed to update course!");
    throw error;
  }
};

// Delete a course
export const deleteCourse = async (courseId) => {
  try {
    const response = await api.delete(`/courses/${courseId}`, {
      headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
    });

    toast.success("Course deleted successfully!");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.error || "Failed to delete course!");
    throw error;
  }
};

// Get all courses
export const getCourses = async () => {
  try {
    const response = await api.get("/courses", {
      headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
    });
    return response.data.courses;
  } catch (error) {
    toast.error(error.response?.data?.error || "Failed to fetch courses!");
    throw error;
  }
};

// Get a single course by ID
export const getCourseById = async (courseId) => {
  try {
    const response = await api.get(`/courses/${courseId}`, {
      headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
    });

    return response.data.course;
  } catch (error) {
    toast.error(error.response?.data?.error || "Failed to fetch course!");
    throw error;
  }
};