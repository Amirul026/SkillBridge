import axios from "axios";
import { refreshToken, logout } from "./authService"; 
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add a request interceptor to add the Authorization header
api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken(); // Refresh the token
        return api(originalRequest); // Retry the original request
      } catch (refreshError) {
        // Handle refresh token failure (e.g., redirect to login)
        logout(); // Log out the user
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;