import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/authService";
import { User, MessageCircle, Award, PlusCircle, BookOpen } from "lucide-react";

const MentorDashboard = ({ isDarkMode }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getProfile();
        setUser(userData);
      } catch (error) {
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Hello, {user?.name}!</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* My Profile Section */}
          <div
            className={`p-6 rounded-lg shadow-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center space-x-4">
              <User className="w-8 h-8" />
              <h2 className="text-xl font-bold">My Profile</h2>
            </div>
            <p className="mt-4">View and edit your profile information.</p>
            <button
              onClick={() => navigate("/profile")}
              className="mt-4 px-4 py-2 bg-[#1e1a53] text-white rounded-md hover:bg-[#1e1a53]/90 transition-colors"
            >
              Go to Profile
            </button>
          </div>

          {/* Chat Section */}
          <div
            className={`p-6 rounded-lg shadow-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center space-x-4">
              <MessageCircle className="w-8 h-8" />
              <h2 className="text-xl font-bold">Chat</h2>
            </div>
            <p className="mt-4">Connect with learners and other mentors.</p>
          </div>

          {/* Leaderboard Section */}
          <div
            className={`p-6 rounded-lg shadow-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center space-x-4">
              <Award className="w-8 h-8" />
              <h2 className="text-xl font-bold">Leaderboard</h2>
            </div>
            <p className="mt-4">Track your progress and achievements.</p>
          </div>

          {/* Create Course Section */}
          <div
            className={`p-6 rounded-lg shadow-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center space-x-4">
              <PlusCircle className="w-8 h-8" />
              <h2 className="text-xl font-bold">Create Course</h2>
            </div>
            <p className="mt-4">
              Design and publish a new course for learners.
            </p>
            <button
              onClick={() => navigate("/create-course")}
              className="mt-4 px-4 py-2 bg-[#1e1a53] text-white rounded-md hover:bg-[#1e1a53]/90 transition-colors"
            >
              Create Course
            </button>
          </div>

          {/* View My Courses Section */}
          <div
            className={`p-6 rounded-lg shadow-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center space-x-4">
              <BookOpen className="w-8 h-8" />
              <h2 className="text-xl font-bold">My Courses</h2>
            </div>
            <p className="mt-4">View all the courses you have created.</p>
            <button
              onClick={() => navigate("/mentor-courses")}
              className="mt-4 px-4 py-2 bg-[#1e1a53] text-white rounded-md hover:bg-[#1e1a53]/90 transition-colors"
            >
              View My Courses
            </button>
          </div>
          {/* Create Course Section */}
          <div
            className={`p-6 rounded-lg shadow-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center space-x-4">
              <PlusCircle className="w-8 h-8" />
              <h2 className="text-xl font-bold">Create Lesson</h2>
            </div>
            <p className="mt-4">
              Design and publish a new Lesson for learners.
            </p>
            <button
              onClick={() => navigate("/create-lesson")}
              className="mt-4 px-4 py-2 bg-[#1e1a53] text-white rounded-md hover:bg-[#1e1a53]/90 transition-colors"
            >
              Create Lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
