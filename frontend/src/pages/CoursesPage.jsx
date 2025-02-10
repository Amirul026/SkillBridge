import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, Clock, Users, BookOpen, GraduationCap, ChevronDown, Loader2 } from 'lucide-react';

// Expanded course data with network images
const coursesData = [
    {
      id: 1,
      title: "Introduction to Programming",
      category: "Development",
      instructor: "John Doe",
      rating: 4.5,
      students: 1200,
      duration: "6 weeks",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1550439062-609e1531270e", // Network image
      level: "Beginner",
      lessons: 24
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      category: "Data Science",
      instructor: "Jane Smith",
      rating: 4.7,
      students: 950,
      duration: "8 weeks",
      price: 129.99,
      image: "https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg", // Network image
      level: "Intermediate",
      lessons: 30
    },
    {
      id: 3,
      title: "Digital Marketing Mastery",
      category: "Marketing",
      instructor: "Emily Johnson",
      rating: 4.6,
      students: 800,
      duration: "5 weeks",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931", // Network image
      level: "Beginner",
      lessons: 20
    },
    {
      id: 4,
      title: "UI/UX Design Principles",
      category: "Design",
      instructor: "Michael Brown",
      rating: 4.8,
      students: 1100,
      duration: "7 weeks",
      price: 109.99,
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg", // Network image
      level: "Intermediate",
      lessons: 28
    },
    {
      id: 5,
      title: "Business Strategy Essentials",
      category: "Business",
      instructor: "Sarah Lee",
      rating: 4.4,
      students: 700,
      duration: "4 weeks",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40", // Network image
      level: "Beginner",
      lessons: 16
    },
    {
      id: 6,
      title: "Advanced JavaScript",
      category: "Development",
      instructor: "David Wilson",
      rating: 4.9,
      students: 1500,
      duration: "10 weeks",
      price: 149.99,
      image: "https://images.pexels.com/photos/5483071/pexels-photo-5483071.jpeg", // Network image
      level: "Advanced",
      lessons: 40
    },
    {
      id: 7,
      title: "Machine Learning Basics",
      category: "Data Science",
      instructor: "Laura Green",
      rating: 4.7,
      students: 1300,
      duration: "9 weeks",
      price: 139.99,
      image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd", // Network image
      level: "Intermediate",
      lessons: 35
    },
    {
      id: 8,
      title: "Social Media Marketing",
      category: "Marketing",
      instructor: "Chris Evans",
      rating: 4.5,
      students: 900,
      duration: "6 weeks",
      price: 99.99,
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg", // Network image
      level: "Beginner",
      lessons: 22
    },
    {
      id: 9,
      title: "Advanced Cloud Computing",
      category: "Development",
      instructor: "Mark Thompson",
      rating: 4.8,
      students: 1543,
      duration: "10 weeks",
      price: 139.99,
      image: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1", // Network image
      level: "Advanced",
      lessons: 38
    },
    {
      id: 10,
      title: "Python for Data Analysis",
      category: "Data Science",
      instructor: "Anna White",
      rating: 4.6,
      students: 1200,
      duration: "7 weeks",
      price: 119.99,
      image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg", // Network image
      level: "Intermediate",
      lessons: 30
    },
    {
      id: 11,
      title: "Graphic Design Fundamentals",
      category: "Design",
      instructor: "Robert Harris",
      rating: 4.5,
      students: 850,
      duration: "6 weeks",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c", // Network image
      level: "Beginner",
      lessons: 24
    },
    {
      id: 12,
      title: "Financial Planning Basics",
      category: "Business",
      instructor: "Linda Martinez",
      rating: 4.4,
      students: 600,
      duration: "5 weeks",
      price: 89.99,
      image: "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg", // Network image
      level: "Beginner",
      lessons: 20
    },
    {
      id: 13,
      title: "Full-Stack Web Development",
      category: "Development",
      instructor: "James Clark",
      rating: 4.9,
      students: 1800,
      duration: "12 weeks",
      price: 169.99,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", // Network image
      level: "Advanced",
      lessons: 45
    },
    {
      id: 14,
      title: "Deep Learning with TensorFlow",
      category: "Data Science",
      instructor: "Sophia Adams",
      rating: 4.8,
      students: 1400,
      duration: "10 weeks",
      price: 149.99,
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg", // Network image
      level: "Advanced",
      lessons: 40
    },
    {
      id: 15,
      title: "Content Marketing Strategies",
      category: "Marketing",
      instructor: "Daniel Lewis",
      rating: 4.5,
      students: 950,
      duration: "6 weeks",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978", // Network image
      level: "Intermediate",
      lessons: 25
    },
    {
      id: 16,
      title: "Advanced UI/UX Design",
      category: "Design",
      instructor: "Olivia Walker",
      rating: 4.7,
      students: 1100,
      duration: "8 weeks",
      price: 129.99,
      image: "https://images.pexels.com/photos/11035386/pexels-photo-11035386.jpeg", // Network image
      level: "Advanced",
      lessons: 35
    },
    {
      id: 17,
      title: "Entrepreneurship 101",
      category: "Business",
      instructor: "William Hall",
      rating: 4.6,
      students: 750,
      duration: "5 weeks",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902", // Network image
      level: "Beginner",
      lessons: 20
    },
    {
      id: 18,
      title: "React Native Mobile Development",
      category: "Development",
      instructor: "Ethan Young",
      rating: 4.8,
      students: 1600,
      duration: "10 weeks",
      price: 149.99,
      image: "https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg", // Network image
      level: "Advanced",
      lessons: 40
    },
    {
      id: 19,
      title: "Data Visualization with D3.js",
      category: "Data Science",
      instructor: "Ava King",
      rating: 4.7,
      students: 1300,
      duration: "8 weeks",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3", // Network image
      level: "Intermediate",
      lessons: 30
    },
    {
      id: 20,
      title: "E-commerce Marketing",
      category: "Marketing",
      instructor: "Noah Scott",
      rating: 4.5,
      students: 900,
      duration: "6 weeks",
      price: 99.99,
      image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg", // Network image
      level: "Intermediate",
      lessons: 25
    }
  ];
const categories = ["All", "Development", "Data Science", "Marketing", "Design", "Business"];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const sortOptions = [
  { label: "Most Popular", value: "popular" },
  { label: "Highest Rated", value: "rating" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" }
];

const ITEMS_PER_PAGE = 8;

const CoursesPage = ({ isDarkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter courses based on all criteria
  const filteredCourses = coursesData.filter(course => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "All Levels" || course.level === selectedLevel;
    const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1];
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLevel && matchesPrice && matchesSearch;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "newest":
        return b.id - a.id;
      default: // popular
        return b.students - a.students;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedCourses.length / ITEMS_PER_PAGE);
  const paginatedCourses = sortedCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Loading card skeleton
  const LoadingSkeleton = () => (
    <div className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      <div className="w-full h-40 bg-gray-300 animate-pulse" />
      <div className="p-4">
        <div className="flex justify-between mb-2">
          <div className="w-20 h-6 bg-gray-300 rounded-full animate-pulse" />
          <div className="w-20 h-6 bg-gray-300 rounded-full animate-pulse" />
        </div>
        <div className="w-full h-6 bg-gray-300 rounded animate-pulse mb-2" />
        <div className="w-3/4 h-6 bg-gray-300 rounded animate-pulse mb-4" />
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
          <div className="w-32 h-4 bg-gray-300 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-full h-4 bg-gray-300 rounded animate-pulse" />
          ))}
        </div>
        <div className="flex justify-between items-center pt-3 border-t">
          <div className="w-16 h-6 bg-gray-300 rounded animate-pulse" />
          <div className="w-24 h-8 bg-gray-300 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );

  // Custom Slider Component
  const CustomSlider = ({ min, max, value, onChange }) => {
    const handleChange = (e) => {
      const newValue = parseInt(e.target.value, 10);
      onChange([newValue]);
    };

    return (
      <div className="relative w-full">
        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <div className="absolute text-xs mt-2">
          <span>${value[0]}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} py-8`}>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Explore Our Courses</h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Advance your career with industry-leading courses from expert instructors.
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`lg:hidden px-4 py-2 rounded-lg flex items-center gap-2 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <Filter size={20} />
            Filters
          </button>

          <div className={`lg:flex gap-4 ${showFilters ? 'block' : 'hidden'}`}>
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-2 rounded-lg ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border`}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Level Filter */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className={`px-4 py-2 rounded-lg ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border`}
            >
              {levels.map(level => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>

            {/* Price Range with Custom Slider */}
            <div className={`px-4 py-2 rounded-lg ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border flex items-center gap-4`}>
              <span>Price:</span>
              <div className="w-48">
                <CustomSlider
                  min={0}
                  max={200}
                  value={priceRange}
                  onChange={setPriceRange}
                />
              </div>
              <span>${priceRange[0]} - ${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4">
  {categories.map(category => (
    <button
      key={category}
      onClick={() => setSelectedCategory(category)}
      className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
        selectedCategory === category
          ? (isDarkMode ? 'bg-white text-gray-900' : 'bg-[#1e1a53] text-white')
          : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900')
      }`}
    >
      {category}
    </button>
  ))}
    </div>

        {/* Results Count */}
        <p className="mb-4 text-gray-500">
          Showing {paginatedCourses.length} of {filteredCourses.length} courses
        </p>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {isLoading
            ? Array(8).fill(0).map((_, index) => <LoadingSkeleton key={index} />)
            : paginatedCourses.map(course => (
                <div
                  key={course.id}
                  className={`rounded-lg overflow-hidden ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  } shadow-md hover:shadow-lg transition-shadow`}
                >
                  <img
                    src={course.image} // Network image URL
                    alt={course.title}
                    className="w-full h-40 object-cover" // Ensure the image scales properly
                  />
                  <div className="p-4">
                    <div className="flex justify-between mb-2">
                      <span className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {course.category}
                      </span>
                      <span className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {course.level}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    } mb-4`}>
                      by {course.instructor}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <Star size={16} className="text-yellow-400" />
                      <span className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {course.rating} ({course.students} students)
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                        <span className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {course.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                        <span className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {course.lessons} lessons
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                        <span className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {course.level}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t">
                      <span className={`text-lg font-bold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        ${course.price}
                      </span>
                      <button
                        className={`px-4 py-2 rounded-lg ${
                          isDarkMode ? 'bg-white text-gray-900' : 'bg-[#1e1a53] text-white'
                        } hover:opacity-90 transition-opacity`}
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
          }
        </div>

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === i + 1
                    ? (isDarkMode ? 'bg-white text-gray-900' : 'bg-[#1e1a53] text-white')
                    : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900')
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;