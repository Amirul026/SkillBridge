// pages/LeaderboardPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, ArrowLeft } from 'lucide-react';

const LeaderboardPage = ({ isDarkMode }) => {
  const navigate = useNavigate();

  // Sample leaderboard data
  const leaderboardData = [
    { id: 1, name: 'John Doe', score: 1200, avatar: 'https://i.pravatar.cc/40?img=3' },
    { id: 2, name: 'Jane Smith', score: 1150, avatar: 'https://i.pravatar.cc/40?img=4' },
    { id: 3, name: 'Alice Johnson', score: 1100, avatar: 'https://i.pravatar.cc/40?img=5' },
  ];

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold flex items-center space-x-2">
            <Award className="w-8 h-8" />
            <span>Leaderboard</span>
          </h1>
        </div>

        <div className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="space-y-4">
            {leaderboardData.map((user, index) => (
              <div key={user.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center space-x-4">
                  <span className={`text-lg font-bold ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-yellow-600' : 'text-gray-500'}`}>
                    #{index + 1}
                  </span>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-lg">{user.name}</span>
                </div>
                <span className="text-lg font-bold">{user.score} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;