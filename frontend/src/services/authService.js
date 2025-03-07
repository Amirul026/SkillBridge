import api from "./api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// Register User
export const register = async (userData) => {
  try {
    const response = await api.post("/register", userData);

    // Store user role in localStorage
    localStorage.setItem('userRole', userData.role); // Ensure this is set correctly
    console.log("User Role after Registration:", userData.role); // Debugging

    toast.success("Registration successful! Redirecting to login...");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.error || "Registration failed!");
    throw error;
  }
};

// Login User
export const login = async (credentials) => {
  try {
    const response = await api.post("/login", credentials);

    // Save tokens in cookies
    Cookies.set("access_token", response.data.access_token, {
      expires: 1,
      secure: true,
    });
    Cookies.set("refresh_token", response.data.refresh_token, {
      expires: 7,
      secure: true,
    });

    // Fetch user profile to get the role
    const profileResponse = await getProfile();
    const userRole = profileResponse.role;

    // Store user role in localStorage
    localStorage.setItem('userRole', userRole); // Ensure this is set correctly
    console.log("User Role after Login:", userRole); // Debugging

    toast.success("Login successful");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.error || "Login failed!");
    throw error;
  }
};

// Refresh Token
export const refreshToken = async () => {
  try {
    const response = await api.post(
      "/refresh-token",
      {},
      {
        headers: { Authorization: `Bearer ${Cookies.get("refresh_token")}` },
      }
    );

    Cookies.set("access_token", response.data.access_token, {
      expires: 1,
      secure: true,
    });

    return response.data;
  } catch (error) {
    toast.error("Session expired. Please log in again.");
    throw error;
  }
};

// Logout User
export const logout = async () => {
  try {
    await api.post(
      "/logout",
      {},
      {
        headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
      }
    );

    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    localStorage.removeItem('userRole'); // Clear user role on logout

    toast.success("Logged out successfully!");
  } catch (error) {
    toast.error("Logout failed!");
    throw error;
  }
};

// Get User Profile
export const getProfile = async () => {
  try {
    const response = await api.get("/profile", {
      headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
    });

    return response.data.profile;
  } catch (error) {
    toast.error("Failed to fetch profile!");
    throw error;
  }
};

// Update User Profile
export const updateProfile = async (updatedData) => {
  try {
    const response = await api.put("/profile/update", updatedData, {
      headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
    });

    toast.success("Profile updated successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to update profile!");
    throw error;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!Cookies.get("access_token");
};