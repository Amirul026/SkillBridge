import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, ArrowLeft, Send, Paperclip, Smile } from 'lucide-react';

const ChatPage = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  
  // Color scheme using #1e1a53 as primary color
  const primaryColor = '#1e1a53';
  const primaryLightColor = isDarkMode ? '#2c2866' : '#2a2670';
  const bgColor = isDarkMode ? '#121212' : '#f8f9fa';
  const cardBgColor = isDarkMode ? '#1e1e1e' : '#ffffff';
  const textColor = isDarkMode ? '#f0f0f0' : '#212529';
  const secondaryTextColor = isDarkMode ? '#a0a0a0' : '#6c757d';
  
  const handleSend = () => {
    if (message.trim()) {
      // Handle message sending logic here
      setMessage('');
    }
  };

  return (
    <div className={`min-h-screen py-6 px-4 sm:px-6 lg:px-8`} style={{ backgroundColor: bgColor, color: textColor }}>
      <div className="max-w-5xl mx-auto">
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
            <span>Messaging</span>
          </h1>
          <div className="w-16"></div> {/* Spacer for symmetry */}
        </div>

        {/* Chat Container */}
        <div className="rounded-xl shadow-lg overflow-hidden flex flex-col" style={{ backgroundColor: cardBgColor, height: 'calc(100vh - 150px)' }}>
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center space-x-3" style={{ borderColor: isDarkMode ? '#2d2d2d' : '#e9ecef', backgroundColor: primaryColor }}>
            <img
              src="https://i.pravatar.cc/40?img=2"
              alt="Contact"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div>
              <h2 className="font-semibold text-white">Sarah Johnson</h2>
              <p className="text-xs text-gray-300">Online • Last active 2m ago</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex items-start space-x-3">
              <img
                src="https://i.pravatar.cc/40?img=2"
                alt="Contact"
                className="w-8 h-8 rounded-full mt-1"
              />
              <div className="max-w-xs md:max-w-md rounded-lg rounded-tl-none p-3" style={{ backgroundColor: isDarkMode ? '#2d2d2d' : '#f0f2f5' }}>
                <p className="text-sm">Hi there! I just reviewed the project proposal you sent over.</p>
                <span className="text-xs block mt-1" style={{ color: secondaryTextColor }}>10:15 AM</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 justify-end">
              <div className="max-w-xs md:max-w-md rounded-lg rounded-tr-none p-3 text-white" style={{ backgroundColor: primaryColor }}>
                <p className="text-sm">Great! What are your thoughts on the timeline? Do you think we can deliver within the proposed deadlines?</p>
                <span className="text-xs block mt-1 text-gray-300">10:17 AM</span>
              </div>
              <img
                src="https://i.pravatar.cc/40?img=1"
                alt="You"
                className="w-8 h-8 rounded-full mt-1"
              />
            </div>

            <div className="flex items-start space-x-3">
              <img
                src="https://i.pravatar.cc/40?img=2"
                alt="Contact"
                className="w-8 h-8 rounded-full mt-1"
              />
              <div className="max-w-xs md:max-w-md rounded-lg rounded-tl-none p-3" style={{ backgroundColor: isDarkMode ? '#2d2d2d' : '#f0f2f5' }}>
                <p className="text-sm">I think the timeline is realistic but we should build in some buffer for the testing phase. Otherwise, it looks good to me!</p>
                <span className="text-xs block mt-1" style={{ color: secondaryTextColor }}>10:20 AM</span>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t" style={{ borderColor: isDarkMode ? '#2d2d2d' : '#e9ecef' }}>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full" style={{ color: primaryColor }}>
                <Paperclip className="w-5 h-5" />
              </button>
              
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
                style={{ 
                  backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
                  borderColor: isDarkMode ? '#3d3d3d' : '#e9ecef',
                  color: textColor,
                  focusRing: primaryLightColor
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              
              <button className="p-2 rounded-full" style={{ color: primaryColor }}>
                <Smile className="w-5 h-5" />
              </button>
              
              <button 
                onClick={handleSend}
                className="p-3 rounded-full text-white" 
                style={{ backgroundColor: primaryColor }}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;