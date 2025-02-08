import { useState } from 'react';
import { ShoppingCart, Star, Search } from 'lucide-react';
import S1 from "../assets/images/s1.png";
import S2 from "../assets/images/S2.png";
import S3 from "../assets/images/S3.png";
import T1 from "../assets/images/t1.png";
import T2 from "../assets/images/t2.png";
import T3 from "../assets/images/t3.png";
import T4 from "../assets/images/t4.png";
const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Web Developer",
      image: S1,
      text: "SkillBridge helped me transition into tech. The courses are practical and mentors are amazing.",
      rating: 5
    },
    {
      id: 2,
      name: "David Chen",
      role: "Data Scientist",
      image: S2,
      text: "The quality of instruction and support from mentors exceeded my expectations.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Williams",
      role: "UX Designer",
      image: S3,
      text: "Found my dream job thanks to the skills I learned through SkillBridge courses.",
      rating: 4
    }
  ];

  const mentors = [
    {
      id: 1,
      name: "Dr. Michael Brown",
      expertise: "Full Stack Development",
      image: T1,
      rating: 4.9
    },
    {
      id: 2,
      name: "Prof. Lisa Anderson",
      expertise: "Data Science",
      image: T2,
      rating: 4.8
    },
    {
      id: 3,
      name: "Alex Martinez",
      expertise: "UI/UX Design",
      image: T3,
      rating: 4.9
    },
    {
      id: 4,
      name: "Dr. Sarah Park",
      expertise: "Machine Learning",
      image: T4,
      rating: 4.7
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">


      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white pt-20 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Unlock Your Potential with SkillBridge
              </h1>
              <p className="text-xl text-gray-600">
                Access world-class education and mentorship to advance your career
              </p>
              
              <div className="flex items-center max-w-xl mx-auto">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    className="w-full px-4 py-3 rounded-l border focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Learners Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
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
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">Expert Instructors</h3>
                <p className="text-gray-600 text-center">Learn from industry professionals with years of experience.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">Self-Paced Learning</h3>
                <p className="text-gray-600 text-center">Study at your own pace with lifetime access to courses.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">Affordable Pricing</h3>
                <p className="text-gray-600 text-center">Quality education at competitive prices with flexible payment options.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Mentors Section */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Top Mentors</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {mentors.map(mentor => (
              <div key={mentor.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 text-center">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h4 className="font-semibold">{mentor.name}</h4>
                <p className="text-gray-600 text-sm mb-2">{mentor.expertise}</p>
                <div className="flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1">{mentor.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

    </div>
  );
};

export default HomePage;