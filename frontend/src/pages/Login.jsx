import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, Lock, Mail, BookOpen, Users, Trophy } from 'lucide-react';

const Login = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className={`min-h-screen py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <div className={`max-w-6xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
          <div className="flex flex-col md:flex-row">
            {/* Left side - Visual Content */}
            <div className="hidden md:flex md:w-1/2 bg-[#1e1a53] p-8 flex-col justify-center items-center text-white">
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <LogIn size={80} className="mb-8 animate-pulse" />
                <h3 className="text-3xl font-bold mb-4 text-center">Welcome Back to SkillBridge!</h3>
                <p className="text-center text-lg mb-12 text-blue-100">
                  Continue your learning journey with us
                </p>

                <div className="space-y-8 w-full max-w-md">
                  <div className="flex items-center space-x-4 bg-blue-500/20 p-4 rounded-lg">
                    <BookOpen className="flex-shrink-0 h-8 w-8" />
                    <div>
                      <h4 className="font-semibold">Resume Learning</h4>
                      <p className="text-sm text-blue-100">Pick up right where you left off</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 bg-blue-500/20 p-4 rounded-lg">
                    <Users className="flex-shrink-0 h-8 w-8" />
                    <div>
                      <h4 className="font-semibold">Connect with Peers</h4>
                      <p className="text-sm text-blue-100">Join study groups and discussions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 bg-blue-500/20 p-4 rounded-lg">
                    <Trophy className="flex-shrink-0 h-8 w-8" />
                    <div>
                      <h4 className="font-semibold">Track Progress</h4>
                      <p className="text-sm text-blue-100">Monitor your achievements</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Login Form */}
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <div className="max-w-md mx-auto">
                <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Login to Your Account
                </h2>
                <p className={`mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Please enter your credentials to continue
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Email Address
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      </div>
                      <input
                        type="email"
                        id="email"
                        required
                        className={`block w-full pl-10 rounded-lg shadow-sm ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                            : 'border-gray-300 focus:border-blue-500'
                        } px-3 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Password
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      </div>
                      <input
                        type="password"
                        id="password"
                        required
                        className={`block w-full pl-10 rounded-lg shadow-sm ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                            : 'border-gray-300 focus:border-blue-500'
                        } px-3 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  {/* Forgot Password & Remember Me */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className={`ml-2 block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <Link to="/forgot-password" className={`font-medium ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}>
                        Forgot password?
                      </Link>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#1e1a53] hover:bg-[#1e1a53]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Sign in to your account
                  </button>
                </form>

                {/* Register Link */}
                <p className={`mt-8 text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Don't have an account?{' '}
                  <Link to="/register" className={`font-medium ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}>
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;