import { useState, useEffect } from 'react';
import { ShoppingCart, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize dark mode from localStorage or system preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return JSON.parse(savedMode);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Update localStorage whenever dark mode changes
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    
    // Apply dark mode class to document for global styling
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogin = () => {
    navigate('/login');
    setIsMenuOpen(false);
  };

  const handleRegister = () => {
    navigate('/register');
    setIsMenuOpen(false);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm fixed w-full top-0 z-50`}>
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#1e1a53]'}`}>
              SkillBridge
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className={`hover:opacity-80 transition-opacity ${isDarkMode ? 'text-white' : 'text-[#1e1a53]'}`}>
                Home
              </a>
              <a href="/seminar" className={`hover:opacity-80 transition-opacity ${isDarkMode ? 'text-white' : 'text-[#1e1a53]'}`}>
                Seminar
              </a>
              <a href="/courses" className={`hover:opacity-80 transition-opacity ${isDarkMode ? 'text-white' : 'text-[#1e1a53]'}`}>
                Courses
              </a>
              <a href="/mentor" className={`hover:opacity-80 transition-opacity ${isDarkMode ? 'text-white' : 'text-[#1e1a53]'}`}>
                Mentor
              </a>
              <ShoppingCart className={`cursor-pointer hover:opacity-80 transition-opacity ${isDarkMode ? 'text-white' : 'text-[#1e1a53]'}`} />
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button 
                onClick={handleLogin}
                className={`px-4 py-2 rounded transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-100'
                } border`}
              >
                Login
              </button>
              <button 
                onClick={handleRegister}
                className={`px-4 py-2 rounded transition-colors ${
                  isDarkMode 
                    ? 'bg-white text-gray-900 hover:bg-gray-100' 
                    : 'bg-[#1e1a53] text-white hover:bg-[#1e1a53]/90'
                }`}
              >
                Register
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pt-4`}>
            <div className={`flex flex-col space-y-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <a href="/" className="hover:opacity-80 transition-opacity">Home</a>
              <a href="/seminar" className="hover:opacity-80 transition-opacity">Seminar</a>
              <a href="/courses" className="hover:opacity-80 transition-opacity">Courses</a>
              <a href="/mentor" className="hover:opacity-80 transition-opacity">Mentor</a>
              <div className="flex items-center space-x-4">
                <ShoppingCart className="cursor-pointer hover:opacity-80 transition-opacity" />
                <button 
                  onClick={toggleTheme} 
                  className="p-2"
                  aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button 
                  onClick={handleLogin}
                  className={`px-4 py-2 rounded border ${
                    isDarkMode ? 'border-gray-700 text-white' : 'border-gray-200'
                  }`}
                >
                  Login
                </button>
                <button 
                  onClick={handleRegister}
                  className="px-4 py-2 rounded bg-[#1e1a53] text-white"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        {typeof children === 'function' ? children({ isDarkMode }) : children}
      </main>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-black' : 'bg-gray-900'} text-white`}>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SkillBridge</h3>
              <p className="text-gray-400">Empowering minds through quality online education.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-white transition duration-300">Home</a></li>
                <li><a href="/courses" className="hover:text-white transition duration-300">Courses</a></li>
                <li><a href="/mentor" className="hover:text-white transition duration-300">Mentors</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/help" className="hover:text-white transition duration-300">Help Center</a></li>
                <li><a href="/terms" className="hover:text-white transition duration-300">Terms of Service</a></li>
                <li><a href="/privacy" className="hover:text-white transition duration-300">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <p className="text-gray-400">Email: info@skillbridge.com</p>
              <p className="text-gray-400">Phone: (123) 456-7890</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} SkillBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;