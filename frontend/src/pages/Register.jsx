import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Rocket, BookOpen, Users, Award } from 'lucide-react';

const Register = ({ isDarkMode }) => {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'Learner'
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className={`min-h-screen py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <div className={`max-w-6xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
          <div className="flex flex-col md:flex-row">
            {/* Left side - Form */}
            <div className="w-full md:w-1/2 p-6 md:p-8">
              <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Join SkillBridge
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Photo Upload */}
                <div className="flex items-center space-x-4">
                  <div className={`w-20 h-20 rounded-full overflow-hidden border-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} relative`}>
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <Upload className={`w-6 h-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className={`cursor-pointer text-sm ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
                    >
                      Upload Profile Photo
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className={`mt-1 block w-full rounded-md shadow-sm ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-gray-200 border-gray-300 focus:border-blue-500'
                      } px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className={`mt-1 block w-full rounded-md shadow-sm ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-gray-200 border-gray-300 focus:border-blue-500'
                      } px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Password */}
                  <div>
                    <label htmlFor="password" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      required
                      className={`mt-1 block w-full rounded-md shadow-sm ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                          : ' bg-gray-200 border-gray-300 focus:border-blue-500'
                      } px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label htmlFor="confirmPassword" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      required
                      className={`mt-1 block w-full rounded-md shadow-sm ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-gray-200 border-gray-300 focus:border-blue-500'
                      } px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                        : 'bg-gray-200 border-gray-300 focus:border-blue-500'
                    } px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                {/* Role Selection */}
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    I want to
                  </label>
                  <div className="mt-2 space-x-4">
                    {['Learner', 'Mentor'].map((role) => (
                      <label key={role} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="role"
                          value={role}
                          checked={formData.role === role}
                          onChange={(e) => setFormData({...formData, role: e.target.value})}
                          className="form-radio text-blue-600"
                        />
                        <span className={`ml-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                          {role}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1e1a53] hover:bg-[#1e1a53]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Create Account
                </button>
              </form>

              {/* Login Link */}
              <p className={`mt-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Already have an account?{' '}
                <Link to="/login" className={`font-medium ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}>
                  Login 
                </Link>
              </p>
            </div>

            {/* Right side - Visual Content */}
            <div className="hidden md:flex md:w-1/2 bg-[#1e1a53] p-8 flex-col justify-center items-center text-white">
              <Rocket size={64} className="mb-6 animate-bounce" />
              <h3 className="text-2xl font-bold mb-4">Start Your Learning Journey</h3>
              <p className="text-center mb-8">Join thousands of learners and mentors in our community</p>
              
              <div className="space-y-6 w-full max-w-md">
                <div className="flex items-center space-x-4">
                  <BookOpen className="flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Access Quality Courses</h4>
                    <p className="text-sm text-blue-100">Learn from industry experts and professionals</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Users className="flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Join Community</h4>
                    <p className="text-sm text-blue-100">Connect with peers and mentors worldwide</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Award className="flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Earn Certificates</h4>
                    <p className="text-sm text-blue-100">Get recognized for your achievements</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;