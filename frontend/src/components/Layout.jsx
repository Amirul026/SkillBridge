import { useState, useEffect } from 'react';
import { ShoppingCart, Sun, Moon, ChevronDown, LogOut, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { getProfile, logout, isAuthenticated } from '../services/authService';
import { toast } from 'react-toastify';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const navigate = useNavigate();

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // Fetch user profile if authenticated
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isAuthenticated()) {
        try {
          const userData = await getProfile();
          setUser(userData);
        } catch (error) {
          setUser(null);
        }
      }
    };

    fetchUserProfile();
  }, []);

  // Toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle login navigation
  const handleLogin = () => {
    navigate('/login');
    setIsMenuOpen(false);
  };

  // Handle register navigation
  const handleRegister = () => {
    navigate('/register');
    setIsMenuOpen(false);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate('/login');
      
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  // Profile dropdown component
  const ProfileDropdown = () => (
    <div className="relative">
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="flex items-center space-x-3 focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200">
          <img
            src={user?.picture || "/api/placeholder/32/32"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {user?.name}
        </span>
        <ChevronDown className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
      </button>

      {isProfileOpen && (
        <div
          className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } ring-1 ring-black ring-opacity-5`}
        >
          <button
            onClick={() => {
              navigate('/dashboard');
              setIsProfileOpen(false);
            }}
            className={`flex items-center w-full px-4 py-2 text-sm ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <User className="w-4 h-4 mr-3" />
            My Dashboard
          </button>
          <button
            onClick={() => {
              handleLogout();
              setIsProfileOpen(false);
            }}
            className={`flex items-center w-full px-4 py-2 text-sm ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'text-gray-700 hover:text-gray-700'
            }`}
          >
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm fixed w-full top-0 z-50`}>
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#1e1a53]'}`}>
              SkillBridge
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`hover:opacity-80 transition-opacity ${isDarkMode ? 'text-white' : 'text-[#1e1a53]'}`}>
                Home
              </Link>
              <Link to="/seminar" className={`hover:opacity-80 transition-opacity ${isDarkMode ? 'text-white' : 'text-[#1e1a53]'}`}>
                Seminar
              </Link>
              <Link to="/courses" className={`hover:opacity-80 transition-opacity ${isDarkMode ? 'text-white' : 'text-[#1e1a53]'}`}>
                Courses
              </Link>
              <Link to="/mentor" className={`hover:opacity-80 transition-opacity ${isDarkMode ? 'text-white' : 'text-[#1e1a53]'}`}>
                Mentor
              </Link>
              <ShoppingCart className={`cursor-pointer hover:opacity-80 transition-opacity ${isDarkMode ? 'text-white' : 'text-[#1e1a53]'}`} />
            </div>

            {/* Theme Toggle and Auth Buttons */}
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

              {isAuthenticated() ? (
                <ProfileDropdown />
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pt-4`}>
            <div className={`flex flex-col space-y-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <Link to="/" className="hover:opacity-80 transition-opacity">Home</Link>
              <Link to="/seminar" className="hover:opacity-80 transition-opacity">Seminar</Link>
              <Link to="/courses" className="hover:opacity-80 transition-opacity">Courses</Link>
              <Link to="/mentor" className="hover:opacity-80 transition-opacity">Mentor</Link>
              <div className="flex items-center space-x-4">
                <ShoppingCart className="cursor-pointer hover:opacity-80 transition-opacity" />
                <button 
                  onClick={toggleTheme} 
                  className="p-2"
                  aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                {isAuthenticated() ? (
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <img
                        src={user?.picture || "/api/placeholder/32/32"}
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{user?.name}</span>
                    </div>
                    <button
                      onClick={() => {
                        navigate("/dashboard");
                        setIsMenuOpen(false);
                      }}
                      className="text-left hover:opacity-80"
                    >
                      My Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="text-left hover:opacity-80"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
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
                  </>
                )}
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
                <li><Link to="/" className="hover:text-white transition duration-300">Home</Link></li>
                <li><Link to="/courses" className="hover:text-white transition duration-300">Courses</Link></li>
                <li><Link to="/mentor" className="hover:text-white transition duration-300">Mentors</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-white transition duration-300">Help Center</Link></li>
                <li><Link to="/terms" className="hover:text-white transition duration-300">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition duration-300">Privacy Policy</Link></li>
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