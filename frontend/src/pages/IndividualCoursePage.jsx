import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, ArrowLeft, Clock, CheckCircle, Video, FileText, LockClosed, PlayCircle, Award, ChevronRight } from 'lucide-react';

const IndividualCoursePage = ({ isDarkMode }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState(1);

  // Color scheme using #1e1a53 as primary color
  const primaryColor = '#1e1a53';
  const bgColor = isDarkMode ? '#121212' : '#f8f9fa';
  const cardBgColor = isDarkMode ? '#1e1e1e' : '#ffffff';
  const textColor = isDarkMode ? '#f0f0f0' : '#212529';
  const secondaryTextColor = isDarkMode ? '#a0a0a0' : '#6c757d';
  const borderColor = isDarkMode ? '#2d2d2d' : '#e9ecef';
  const lessonBgColor = isDarkMode ? '#262626' : '#f5f6f8';
  const lessonHoverBgColor = isDarkMode ? '#2c2866' : '#ecedf8';
  
  // Sample course data (expanded)
  const course = {
    id: courseId,
    title: "Advanced React Patterns",
    instructor: "Sarah Johnson",
    instructorRole: "Senior Frontend Developer",
    avatar: "https://i.pravatar.cc/40?img=5",
    rating: 4.8,
    reviews: 246,
    enrollments: 1752,
    lastUpdated: "November 2024",
    description: "Master advanced React patterns and best practices to build scalable and maintainable applications. This course covers everything from basic patterns to complex state management approaches used in enterprise applications.",
    progress: 65,
    sections: [
      {
        id: 1,
        title: "Getting Started with React Patterns",
        completedLessons: 3,
        totalLessons: 3,
        lessons: [
          { id: 1, title: "Introduction to React Patterns", duration: "15 mins", type: "video", completed: true },
          { id: 2, title: "Setting Up Your Development Environment", duration: "12 mins", type: "video", completed: true },
          { id: 3, title: "Understanding React Component Lifecycle", duration: "18 mins", type: "video", completed: true }
        ]
      },
      {
        id: 2,
        title: "Component Composition Patterns",
        completedLessons: 2,
        totalLessons: 4,
        lessons: [
          { id: 4, title: "Higher-Order Components", duration: "20 mins", type: "video", completed: true },
          { id: 5, title: "Render Props Pattern", duration: "18 mins", type: "video", completed: true },
          { id: 6, title: "Component Composition vs Inheritance", duration: "22 mins", type: "video", completed: false },
          { id: 7, title: "Practical Exercises", duration: "25 mins", type: "exercise", completed: false }
        ]
      },
      {
        id: 3,
        title: "State Management Patterns",
        completedLessons: 0,
        totalLessons: 3,
        lessons: [
          { id: 8, title: "Context API for State Management", duration: "24 mins", type: "video", completed: false },
          { id: 9, title: "Reducer Pattern with useReducer", duration: "22 mins", type: "video", completed: false },
          { id: 10, title: "State Management Libraries", duration: "28 mins", type: "video", completed: false }
        ]
      }
    ],
    prerequisites: ["Basic React knowledge", "JavaScript ES6+ proficiency", "HTML & CSS fundamentals"],
    achievements: [
      { id: 1, title: "Quick Starter", description: "Completed the first section within 24 hours", unlocked: true },
      { id: 2, title: "Halfway There", description: "Completed 50% of the course", unlocked: true },
      { id: 3, title: "Pattern Master", description: "Completed all exercises with perfect score", unlocked: false },
    ]
  };

  // Calculate overall progress
  const totalLessons = course.sections.reduce((acc, section) => acc + section.totalLessons, 0);
  const completedLessons = course.sections.reduce((acc, section) => acc + section.completedLessons, 0);
  
  const handleContinueLearning = () => {
    // Find the next incomplete lesson
    for (const section of course.sections) {
      for (const lesson of section.lessons) {
        if (!lesson.completed) {
          console.log(`Continue with lesson: ${lesson.title}`);
          // Navigate to lesson or open modal
          return;
        }
      }
    }
  };

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const getLessonIcon = (type, completed) => {
    if (completed) return <CheckCircle className="w-5 h-5" style={{ color: '#4BB543' }} />;
    
    switch (type) {
      case 'video':
        return <Video className="w-5 h-5" style={{ color: primaryColor }} />;
      case 'exercise':
        return <FileText className="w-5 h-5" style={{ color: primaryColor }} />;
      default:
        return <FileText className="w-5 h-5" style={{ color: primaryColor }} />;
    }
  };

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: bgColor, color: textColor }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 transition-colors"
            style={{ color: primaryColor }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Courses</span>
          </button>
          <div className="w-8"></div> {/* Spacer for symmetry */}
        </div>

        {/* Course Header Card */}
        <div className="rounded-xl shadow-lg overflow-hidden mb-6" style={{ backgroundColor: cardBgColor }}>
          <div className="p-6 border-b" style={{ borderColor, backgroundColor: primaryColor }}>
            <h1 className="text-2xl font-bold text-white mb-1">{course.title}</h1>
            <div className="flex items-center text-gray-200 text-sm">
              <span className="flex items-center">
                ★★★★★ <span className="ml-1">{course.rating}</span>
              </span>
              <span className="mx-2">•</span>
              <span>{course.reviews} reviews</span>
              <span className="mx-2">•</span>
              <span>{course.enrollments.toLocaleString()} students</span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center mb-4">
              <img src={course.avatar} alt={course.instructor} className="w-12 h-12 rounded-full mr-3" />
              <div>
                <h3 className="font-medium">{course.instructor}</h3>
                <p className="text-sm" style={{ color: secondaryTextColor }}>{course.instructorRole}</p>
              </div>
            </div>
            
            <p className="mb-6">{course.description}</p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" style={{ color: secondaryTextColor }} />
                <span className="text-sm" style={{ color: secondaryTextColor }}>Last updated: {course.lastUpdated}</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" style={{ color: secondaryTextColor }} />
                <span className="text-sm" style={{ color: secondaryTextColor }}>{totalLessons} lessons</span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Your progress</span>
                <span className="text-sm font-medium">{completedLessons}/{totalLessons} lessons</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2" style={{ backgroundColor: isDarkMode ? '#333' : '#e9ecef' }}>
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${course.progress}%`, backgroundColor: primaryColor }}
                ></div>
              </div>
            </div>
            
            <button 
              onClick={handleContinueLearning}
              className="w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center"
              style={{ backgroundColor: primaryColor }}
            >
              <PlayCircle className="w-5 h-5 mr-2" />
              Continue Learning
            </button>
          </div>
        </div>

        {/* Course Content */}
        <div className="rounded-xl shadow-lg overflow-hidden mb-6" style={{ backgroundColor: cardBgColor }}>
          <div className="p-4 border-b flex justify-between items-center" style={{ borderColor }}>
            <h2 className="text-xl font-bold">Course Content</h2>
            <div className="text-sm" style={{ color: secondaryTextColor }}>
              {completedLessons} of {totalLessons} completed
            </div>
          </div>
          
          <div className="divide-y" style={{ borderColor }}>
            {course.sections.map((section) => (
              <div key={section.id}>
                <button 
                  className="w-full p-4 flex justify-between items-center transition-colors hover:bg-gray-50"
                  onClick={() => toggleSection(section.id)}
                  style={{ 
                    backgroundColor: expandedSection === section.id ? (isDarkMode ? 'rgba(30, 26, 83, 0.1)' : 'rgba(30, 26, 83, 0.05)') : 'transparent',
                    borderLeftWidth: expandedSection === section.id ? '4px' : '0px',
                    borderLeftColor: expandedSection === section.id ? primaryColor : 'transparent'
                  }}
                >
                  <div className="flex items-center">
                    <div className="font-medium">{section.title}</div>
                    <div className="ml-3 text-sm" style={{ color: secondaryTextColor }}>
                      {section.completedLessons}/{section.totalLessons} completed
                    </div>
                  </div>
                  <ChevronRight 
                    className="w-5 h-5 transition-transform" 
                    style={{ 
                      color: primaryColor,
                      transform: expandedSection === section.id ? 'rotate(90deg)' : 'rotate(0deg)'
                    }} 
                  />
                </button>
                
                {expandedSection === section.id && (
                  <div className="divide-y" style={{ borderColor }}>
                    {section.lessons.map((lesson) => (
                      <div 
                        key={lesson.id} 
                        className="p-4 pl-8 flex justify-between items-center cursor-pointer transition-colors"
                        style={{ 
                          backgroundColor: lessonBgColor
                        }}
                        onClick={() => console.log(`Open lesson: ${lesson.title}`)}
                      >
                        <div className="flex items-center space-x-3">
                          {getLessonIcon(lesson.type, lesson.completed)}
                          <span className="text-sm">{lesson.title}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-xs" style={{ color: secondaryTextColor }}>
                            {lesson.duration}
                          </span>
                          {lesson.completed ? (
                            <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: isDarkMode ? 'rgba(75, 181, 67, 0.2)' : '#e6f5e6', color: isDarkMode ? '#86ef9c' : '#28a745' }}>
                              Completed
                            </span>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Prerequisites and Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Prerequisites */}
          <div className="rounded-xl shadow-lg overflow-hidden" style={{ backgroundColor: cardBgColor }}>
            <div className="p-4 border-b" style={{ borderColor }}>
              <h2 className="font-bold">Prerequisites</h2>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {course.prerequisites.map((prerequisite, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: primaryColor }} />
                    <span className="text-sm">{prerequisite}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Achievements */}
          <div className="rounded-xl shadow-lg overflow-hidden" style={{ backgroundColor: cardBgColor }}>
            <div className="p-4 border-b" style={{ borderColor }}>
              <h2 className="font-bold">Achievements</h2>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {course.achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ 
                      backgroundColor: achievement.unlocked ? (isDarkMode ? 'rgba(30, 26, 83, 0.2)' : 'rgba(30, 26, 83, 0.1)') : (isDarkMode ? '#333' : '#e9ecef'),
                    }}>
                      {achievement.unlocked ? (
                        <Award className="w-4 h-4" style={{ color: primaryColor }} />
                      ) : (
                        <LockClosed className="w-4 h-4" style={{ color: secondaryTextColor }} />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium" style={{ color: achievement.unlocked ? textColor : secondaryTextColor }}>
                        {achievement.title}
                      </div>
                      <div className="text-xs" style={{ color: secondaryTextColor }}>
                        {achievement.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualCoursePage;