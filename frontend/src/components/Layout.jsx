import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center">
          <div className="text-2xl font-bold text-[#1e1a53] pl-8">SkillBridge</div>


            <button 
              className="md:hidden ml-auto"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="hidden md:flex items-center justify-center space-x-8 flex-1">
              <a href="/" className="text-[#1e1a53]">Home</a>
              <a href="/seminar" className="text-[#1e1a53]">Seminar</a>
              <a href="/courses" className="text-[#1e1a53]">Courses</a>
              <a href="/mentor" className="text-[#1e1a53]">Mentor</a>
              <ShoppingCart className="text-[#1e1a53] cursor-pointer" />

            </div>

            <div className="hidden md:flex items-center space-x-4 pl-8">
            <button className="px-4 py-2 text-[#1e1a53] border border-[#1e1a53] rounded hover:bg-[#1e1a53]/10">
             Login
            </button>
            <button className="px-4 py-2 bg-[#1e1a53] text-white rounded hover:bg-[#1e1a53]/90">
            Register
           </button>

            </div>
          </div>

          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pt-4`}>
            <div className="flex flex-col space-y-4">
              <a href="/" className="text-blue-600">Home</a>
              <a href="/seminar" className="hover:text-blue-600">Seminar</a>
              <a href="/courses" className="hover:text-blue-600">Courses</a>
              <a href="/mentor" className="hover:text-blue-600">Mentor</a>
              <div className="flex items-center space-x-4">
                <ShoppingCart className="hover:text-blue-600 cursor-pointer" />
                <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
                  Login
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Register
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-16 flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
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