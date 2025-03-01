import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, ArrowLeft, Crown, ChevronDown, TrendingUp, Users, Filter } from 'lucide-react';

const LeaderboardPage = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('This Week');
  
  // Color scheme using #1e1a53 as primary color
  const primaryColor = '#1e1a53';
  const bgColor = isDarkMode ? '#121212' : '#f8f9fa';
  const cardBgColor = isDarkMode ? '#1e1e1e' : '#ffffff';
  const textColor = isDarkMode ? '#f0f0f0' : '#212529';
  const secondaryTextColor = isDarkMode ? '#a0a0a0' : '#6c757d';
  const hoverBgColor = isDarkMode ? '#2d2d2d' : '#f0f2f5';
  const borderColor = isDarkMode ? '#2d2d2d' : '#e9ecef';
  
  // Sample leaderboard data (expanded)
  const leaderboardData = [
    { id: 1, name: 'John Doe', score: 1287, change: '+12', avatar: 'https://i.pravatar.cc/40?img=8', rank: 1 },
    { id: 2, name: 'Emily Chen', score: 1154, change: '+3', avatar: 'https://i.pravatar.cc/40?img=5', rank: 2 },
    { id: 3, name: 'Alex Rodriguez', score: 1089, change: '+5', avatar: 'https://i.pravatar.cc/40?img=7', rank: 3 },
    { id: 4, name: 'Sarah Johnson', score: 986, change: '-1', avatar: 'https://i.pravatar.cc/40?img=4', rank: 4 },
    { id: 5, name: 'Michael Taylor', score: 942, change: '+2', avatar: 'https://i.pravatar.cc/40?img=11', rank: 5 },
    { id: 6, name: 'Jessica Williams', score: 897, change: '0', avatar: 'https://i.pravatar.cc/40?img=9', rank: 6 },
    { id: 7, name: 'David Kim', score: 823, change: '+4', avatar: 'https://i.pravatar.cc/40?img=12', rank: 7 },
    { id: 8, name: 'Rachel Garcia', score: 788, change: '-2', avatar: 'https://i.pravatar.cc/40?img=3', rank: 8 },
  ];

  // Get the top 3 for the podium display
  const topThree = leaderboardData.slice(0, 3);
  
  // Get the rest for the table display
  const restOfLeaderboard = leaderboardData.slice(3);
  
  // Current user (highlighted in the list)
  const currentUser = { id: 4, name: 'Sarah Johnson', rank: 4 };

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: bgColor, color: textColor }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 transition-colors"
            style={{ color: primaryColor }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <Award className="w-6 h-6" style={{ color: primaryColor }} />
            <span>Leaderboard</span>
          </h1>
          <div className="w-16"></div> {/* Spacer for symmetry */}
        </div>

        {/* Main container */}
        <div className="rounded-xl shadow-lg overflow-hidden" style={{ backgroundColor: cardBgColor }}>
          {/* Filters and stats */}
          <div className="p-4 border-b flex flex-wrap items-center justify-between" style={{ borderColor }}>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm font-medium rounded-lg p-2" style={{ backgroundColor: isDarkMode ? '#2a2a2a' : '#f0f2f5' }}>
                <Filter className="w-4 h-4" style={{ color: primaryColor }} />
                <span>Show:</span>
                <div className="relative">
                  <select 
                    className="appearance-none bg-transparent pr-8 font-medium focus:outline-none" 
                    value={timeFilter} 
                    onChange={(e) => setTimeFilter(e.target.value)}
                    style={{ color: primaryColor }}
                  >
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>All Time</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-0 top-1" style={{ color: primaryColor }} />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" style={{ color: secondaryTextColor }} />
                <span style={{ color: secondaryTextColor }}>72 Participants</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" style={{ color: secondaryTextColor }} />
                <span style={{ color: secondaryTextColor }}>Last Updated: Today, 2:45 PM</span>
              </div>
            </div>
          </div>

          {/* Podium for top 3 */}
          <div className="p-6 flex justify-center items-end space-x-4 sm:space-x-8 border-b" style={{ borderColor }}>
            {/* 2nd place */}
            <div className="flex flex-col items-center">
              <img
                src={topThree[1].avatar}
                alt={topThree[1].name}
                className="w-16 h-16 rounded-full mb-2 border-4"
                style={{ borderColor: '#C0C0C0' }}
              />
              <div className="text-center">
                <div className="font-bold">{topThree[1].name}</div>
                <div className="font-bold" style={{ color: '#C0C0C0' }}>{topThree[1].score}</div>
                <div className="w-16 h-20 rounded-t-lg mt-2 flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#C0C0C0' }}>
                  2
                </div>
              </div>
            </div>
            
            {/* 1st place */}
            <div className="flex flex-col items-center">
              <Crown className="w-8 h-8 mb-1" style={{ color: '#FFD700' }} />
              <img
                src={topThree[0].avatar}
                alt={topThree[0].name}
                className="w-20 h-20 rounded-full mb-2 border-4"
                style={{ borderColor: '#FFD700' }}
              />
              <div className="text-center">
                <div className="font-bold">{topThree[0].name}</div>
                <div className="font-bold" style={{ color: '#FFD700' }}>{topThree[0].score}</div>
                <div className="w-20 h-28 rounded-t-lg mt-2 flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#FFD700' }}>
                  1
                </div>
              </div>
            </div>
            
            {/* 3rd place */}
            <div className="flex flex-col items-center">
              <img
                src={topThree[2].avatar}
                alt={topThree[2].name}
                className="w-14 h-14 rounded-full mb-2 border-4"
                style={{ borderColor: '#CD7F32' }}
              />
              <div className="text-center">
                <div className="font-bold">{topThree[2].name}</div>
                <div className="font-bold" style={{ color: '#CD7F32' }}>{topThree[2].score}</div>
                <div className="w-14 h-16 rounded-t-lg mt-2 flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#CD7F32' }}>
                  3
                </div>
              </div>
            </div>
          </div>

          {/* Rest of leaderboard */}
          <div className="divide-y" style={{ borderColor }}>
            {restOfLeaderboard.map((user) => (
              <div 
                key={user.id} 
                className={`flex items-center justify-between p-4 transition-colors ${user.id === currentUser.id ? 'font-medium' : ''}`}
                style={{ 
                  backgroundColor: user.id === currentUser.id ? (isDarkMode ? '#2c2866' : '#ecedf8') : 'transparent',
                  borderLeftWidth: user.id === currentUser.id ? '4px' : '0px', 
                  borderLeftColor: user.id === currentUser.id ? primaryColor : 'transparent'
                }}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-base font-bold w-8 text-center" style={{ color: secondaryTextColor }}>
                    {user.rank}
                  </span>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-base">{user.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`text-xs px-2 py-1 rounded ${user.change.startsWith('+') ? 'bg-green-100 text-green-800' : user.change.startsWith('-') ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`} style={{ 
                    backgroundColor: isDarkMode ? (user.change.startsWith('+') ? 'rgba(34, 197, 94, 0.2)' : user.change.startsWith('-') ? 'rgba(239, 68, 68, 0.2)' : 'rgba(107, 114, 128, 0.2)') : '', 
                    color: isDarkMode ? (user.change.startsWith('+') ? 'rgb(134, 239, 172)' : user.change.startsWith('-') ? 'rgb(252, 165, 165)' : 'rgb(209, 213, 219)') : '' 
                  }}>
                    {user.change}
                  </span>
                  <span className="text-base font-bold" style={{ color: primaryColor }}>
                    {user.score} pts
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Footer with pagination/info */}
          <div className="p-4 flex justify-between items-center border-t text-sm" style={{ borderColor, color: secondaryTextColor }}>
            <span>Showing 8 of 72 participants</span>
            <span>Your rank: <span className="font-bold" style={{ color: primaryColor }}>#{currentUser.rank}</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;