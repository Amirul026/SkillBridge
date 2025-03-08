import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { isAuthenticated, getProfile } from "../services/authService";
import VideoCallRoom from "./VideoCallRoom";
import { toast } from "react-toastify";

const CoursePage = ({ isDarkMode }) => {
  const { courseId } = useParams();
  const [userId, setUserId] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isLive, setIsLive] = useState(false); // Add isLive state

  useEffect(() => {
    if (!isAuthenticated()) {
      toast.error("Please log in to access the course.");
      navigate("/login");
      return;
    }

    getProfile()
      .then((profile) => {
        setUserRole(profile.role);
        setUserId(profile.id);
        setRoomName(`course-${courseId}`);
        setLoading(false);
        console.log("User Role:", profile.role);
      })
      .catch((error) => {
        setError("Failed to fetch user profile.");
        setLoading(false);
        toast.error("Failed to fetch user profile.");
      });
  }, [courseId, navigate]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <p>{error}</p>
      </div>
    );
  }

  const handleGoLive = () => {
    setIsLive(true); // Set isLive to true when "Go Live" is clicked
  };

  return (
    <div className={`min-h-screen py-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Course Video Call</h1>
        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Join the video call for this course
        </p>

        {userRole === "Mentor" && (
          <div className={`p-4 rounded-lg mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <p className="font-semibold">You are hosting this course as a mentor.</p>
            {!isLive && ( // Conditionally render "Go Live" button
              <button
                onClick={handleGoLive}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Go Live
              </button>
            )}
          </div>
        )}

        {userRole === "Learner" && (
          <div className={`p-4 rounded-lg mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <p className="font-semibold">You are attending this course as a learner.</p>
          </div>
        )}

        {/* Video call component, conditionally rendered based on isLive */}
        {(userRole === "Mentor" && isLive) && roomName && <VideoCallRoom roomName={roomName} />}
        {(userRole === "Learner") && roomName && <VideoCallRoom roomName={roomName} />}
      </div>
    </div>
  );
};

export default CoursePage;