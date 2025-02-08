import { useState, useEffect } from 'react';
import { ShoppingCart, Star, Search } from 'lucide-react';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if user prefers dark mode
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeQuery.matches);

    // Listen for changes in system dark mode preference
    const handleDarkModeChange = (e) => setIsDarkMode(e.matches);
    darkModeQuery.addEventListener('change', handleDarkModeChange);

    return () => darkModeQuery.removeEventListener('change', handleDarkModeChange);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Web Developer",
      image: "/api/placeholder/48/48",
      text: "SkillBridge helped me transition into tech. The courses are practical and mentors are amazing.",
      rating: 5
    },
    {
      id: 2,
      name: "David Chen",
      role: "Data Scientist",
      image: "/api/placeholder/48/48",
      text: "The quality of instruction and support from mentors exceeded my expectations.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Williams",
      role: "UX Designer",
      image: "/api/placeholder/48/48",
      text: "Found my dream job thanks to the skills I learned through SkillBridge courses.",
      rating: 4
    }
  ];

  const mentors = [
    {
      id: 1,
      name: "Dr. Michael Brown",
      expertise: "Full Stack Development",
      image: "/api/placeholder/96/96",
      rating: 4.9
    },
    {
      id: 2,
      name: "Prof. Lisa Anderson",
      expertise: "Data Science",
      image: "/api/placeholder/96/96",
      rating: 4.8
    },
    {
      id: 3,
      name: "Alex Martinez",
      expertise: "UI/UX Design",
      image: "/api/placeholder/96/96",
      rating: 4.9
    },
    {
      id: 4,
      name: "Dr. Sarah Park",
      expertise: "Machine Learning",
      image: "/api/placeholder/96/96",
      rating: 4.7
    }
  ];

  return (
    <div className={`min-h-screen w-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Main Content */}
      <main className="w-full">
        {/* Hero Section */}
        <section className={`w-screen py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Unlock Your Potential with SkillBridge
              </h1>
              <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Access world-class education and mentorship to advance your career
              </p>
              
              <div className="flex items-center max-w-xl mx-auto">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    className={`w-full px-4 py-3 rounded-l border focus:outline-none focus:ring-2 focus:ring-blue-500 
                    ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  />
                  <Search className="absolute right-3 top-3 text-gray-400" />
                </div>
                <button className="px-6 py-3 bg-[#1e1a53] text-white rounded-r hover:bg-[#1e1a53]/90 transition duration-300">
                  Search
                </button>
              </div>
              
              <button className="px-8 py-3 bg-[#1e1a53] text-white rounded-full hover:bg-[#1e1a53]/90 transition duration-300 inline-block">
                Visit Courses
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className={`w-screen py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Learners Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map(testimonial => (
                <div key={testimonial.id} 
                  className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 
                  ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {testimonial.text}
                  </p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className={`w-screen py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Expert Instructors",
                  description: "Learn from industry professionals with years of experience.",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  )
                },
                {
                  title: "Self-Paced Learning",
                  description: "Study at your own pace with lifetime access to courses.",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  )
                },
                {
                  title: "Affordable Pricing",
                  description: "Quality education at competitive prices with flexible payment options.",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )
                }
              ].map((feature, index) => (
                <div key={index} className={`p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 
                  ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {feature.icon}
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-center">{feature.title}</h3>
                  <p className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Mentors Section */}
        <section className={`w-screen py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Top Mentors</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {mentors.map(mentor => (
                <div key={mentor.id} 
                  className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 text-center 
                  ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h4 className="font-semibold">{mentor.name}</h4>
                  <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {mentor.expertise}
                  </p>
                  <div className="flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1">{mentor.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;