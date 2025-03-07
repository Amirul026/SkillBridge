import api from "./api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

/**
 * Fetch the progress for a specific course.
 * @param {string} courseId - The ID of the course.
 * @returns {Promise} - A promise that resolves to the progress data.
 */
export const getProgress = async (courseId) => {
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

    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.error || "Failed to fetch progress!");
    throw error;
  }
};

/**
 * Update the progress for a specific course.
 * @param {string} courseId - The ID of the course.
 * @returns {Promise} - A promise that resolves to the updated progress data.
 */
export const updateProgress = async (courseId) => {
  try {
    const token = Cookies.get("access_token");

    if (!token) {
      toast.error("User is not authenticated!");
      throw new Error("Access token not found");
    }

    const response = await api.post(
      `/courses/${courseId}/progress`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Progress updated successfully!");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.error || "Failed to update progress!");
    throw error;
  }
};

/**
 * Decrement the progress for a specific course.
 * @param {string} courseId - The ID of the course.
 * @returns {Promise} - A promise that resolves to the decremented progress data.
 */
export const decrementProgress = async (courseId) => {
  try {
    const token = Cookies.get("access_token");

    if (!token) {
      toast.error("User is not authenticated!");
      throw new Error("Access token not found");
    }

    const response = await api.post(
      `/courses/${courseId}/progress/decrement`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Progress decremented successfully!");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.error || "Failed to decrement progress!");
    throw error;
  }
};
