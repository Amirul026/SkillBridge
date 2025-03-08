import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../services/authService';
import { User, BookOpen } from 'lucide-react';

const LearnerDashboard = ({ isDarkMode }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Add sample courses data
  const [recentCourses, setRecentCourses] = useState([
    {
      id: 1,
      title: "Advanced React Patterns",
      progress: 65,
      lastAccessed: "2025-03-01T14:30:00Z",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      title: "Full Stack Development with Node.js",
      progress: 42,
      lastAccessed: "2025-02-28T09:15:00Z",
      image: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      progress: 88,
      lastAccessed: "2025-02-27T16:45:00Z",
      image: "https://i.pravatar.cc/150?img=3",
    }
  ]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getProfile();
        setUser(userData);
      } catch (error) {
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  // Format date for last accessed
  const formatLastAccessed = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else {
      return `${diffDays} days ago`;
    }
  };

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Hello, {user?.name}!</h1>
        
        {/* Main dashboard sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Profile Section */}
          <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center space-x-4">
              <User className="w-8 h-8" />
              <h2 className="text-xl font-bold">My Profile</h2>
            </div>
            <p className="mt-4">View and edit your profile information.</p>
            <button
              onClick={() => navigate('/profile')}
              className="mt-4 px-4 py-2 bg-[#1e1a53] text-white rounded-md hover:bg-[#1e1a53]/90 transition-colors"
            >
              Go to Profile
            </button>
          </div>
          
          {/* Quiz Section */}
          <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center space-x-4">
              <BookOpen className="w-8 h-8" />
              <h2 className="text-xl font-bold">Quiz</h2>
            </div>
            <p className="mt-4">Test your knowledge with quizzes.</p>
            <button
              onClick={() => navigate('/quiz/1')} // Replace 1 with the actual course ID
              className="mt-4 px-4 py-2 bg-[#1e1a53] text-white rounded-md hover:bg-[#1e1a53]/90 transition-colors"
            >
              Take Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerDashboard;