import api from "./api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
//import axios from 'axios';

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

// Get all courses, or get courses for a mentor
export const getCourses = async (mentor = false) => {
  try {
    let endpoint = "/courses";
    if (mentor) {
      endpoint = "/mentor/courses";
    }

    const response = await api.get(endpoint, {
      headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
    });

    // console.log("API Response (getCourses):", response.data); // Add this line
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.error || "Failed to fetch courses!");
    throw error;
  }
};

