import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, KeyRound, ArrowLeft, ShieldCheck } from 'lucide-react';

const ForgotPassword = ({ isDarkMode }) => {
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log('Reset password for:', email);
    setIsEmailSent(true);
  };

  return (
    <div className={`min-h-screen py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <div className={`max-w-6xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
          <div className="flex flex-col md:flex-row">
            {/* Left side - Visual Content */}
            <div className="hidden md:flex md:w-1/2 bg-[#1e1a53] p-8 flex-col justify-center items-center text-white">
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <KeyRound size={80} className="mb-8 animate-bounce" />
                <h3 className="text-3xl font-bold mb-4 text-center">Password Recovery</h3>
                <p className="text-center text-lg mb-12 text-blue-100">
                  Don't worry, we'll help you get back into your account
                </p>

                <div className="space-y-8 w-full max-w-md">
                  <div className="flex items-center space-x-4 bg-blue-500/20 p-4 rounded-lg">
                    <Mail className="flex-shrink-0 h-8 w-8" />
                    <div>
                      <h4 className="font-semibold">Check Your Email</h4>
                      <p className="text-sm text-blue-100">We'll send you a reset link</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 bg-blue-500/20 p-4 rounded-lg">
                    <ShieldCheck className="flex-shrink-0 h-8 w-8" />
                    <div>
                      <h4 className="font-semibold">Secure Reset</h4>
                      <p className="text-sm text-blue-100">Your data remains protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <div className="max-w-md mx-auto">
                <Link 
                  to="/login" 
                  className={`inline-flex items-center mb-6 ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Login
                </Link>

                {!isEmailSent ? (
                  <>
                    <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Forgot Password?
                    </h2>
                    <p className={`mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Enter your email address and we'll send you instructions to reset your password.
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
                                : 'bg-gray-200 border-gray-300 focus:border-blue-500'
                            } px-3 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#1e1a53] hover:bg-[#1e1a53]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        Send Reset Instructions
                      </button>
                    </form>
                  </>
                ) : (
                  // Success Message
                  <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                      <Mail className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Check Your Email
                    </h2>
                    <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      We've sent password reset instructions to:
                    </p>
                    <p className={`font-medium mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                      {email}
                    </p>
                    <button
                      onClick={() => setIsEmailSent(false)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      Try another email address
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;