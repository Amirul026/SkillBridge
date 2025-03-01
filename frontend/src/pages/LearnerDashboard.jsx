import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../services/authService';
import { User, MessageCircle, Award, BookOpen } from 'lucide-react';

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
          
          <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center space-x-4">
              <MessageCircle className="w-8 h-8" />
              <h2 className="text-xl font-bold">Chat</h2>
            </div>
            <p className="mt-4">Connect with mentors and other learners.</p>
            <button
              onClick={() => navigate('/chat')}
              className="mt-4 px-4 py-2 bg-[#1e1a53] text-white rounded-md hover:bg-[#1e1a53]/90 transition-colors"
            >
              Open Chat
            </button>
          </div>
          
          <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center space-x-4">
              <Award className="w-8 h-8" />
              <h2 className="text-xl font-bold">Leaderboard</h2>
            </div>
            <p className="mt-4">Track your progress and achievements.</p>
            <button
              onClick={() => navigate('/leaderboard')}
              className="mt-4 px-4 py-2 bg-[#1e1a53] text-white rounded-md hover:bg-[#1e1a53]/90 transition-colors"
            >
              View Leaderboard
            </button>
          </div>
        </div>
        
        {/* My Learning Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">My Learning</h2>
            <button
              onClick={() => navigate('/learning')}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              View All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentCourses.map(course => (
              <div 
                key={course.id} 
                className={`rounded-lg shadow-md overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className="h-40 bg-gray-300 relative">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-semibold">{course.title}</h3>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm">{course.progress}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <button
                      onClick={() => navigate(`/learning/${course.id}`)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Continue
                    </button>
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Last accessed: {formatLastAccessed(course.lastAccessed)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Learning Stats */}
        <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-bold mb-4">Learning Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p className="text-sm text-gray-500 dark:text-gray-400">Current Streak</p>
              <p className="text-2xl font-bold mt-1">12 Days</p>
            </div>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p className="text-sm text-gray-500 dark:text-gray-400">Courses Completed</p>
              <p className="text-2xl font-bold mt-1">8</p>
            </div>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p className="text-sm text-gray-500 dark:text-gray-400">Hours Spent</p>
              <p className="text-2xl font-bold mt-1">143</p>
            </div>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p className="text-sm text-gray-500 dark:text-gray-400">Certificates Earned</p>
              <p className="text-2xl font-bold mt-1">5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerDashboard;