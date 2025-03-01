// pages/ChatPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, ArrowLeft } from 'lucide-react';

const ChatPage = ({ isDarkMode }) => {
  const navigate = useNavigate();

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
            <MessageCircle className="w-8 h-8" />
            <span>Chat</span>
          </h1>
        </div>

        <div className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="h-96 overflow-y-auto mb-4">
            {/* Chat Messages */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <img
                  src="https://i.pravatar.cc/40?img=1"
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <p className="text-sm">Hey, how's it going?</p>
                  <span className="text-xs text-gray-500">10:15 AM</span>
                </div>
              </div>
              <div className="flex items-start space-x-4 justify-end">
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500 text-white'}`}>
                  <p className="text-sm">I'm good, thanks! How about you?</p>
                  <span className="text-xs">10:16 AM</span>
                </div>
                <img
                  src="https://i.pravatar.cc/40?img=2"
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Type a message..."
              className={`flex-1 p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
            <button
              className={`px-6 py-3 rounded-lg ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;