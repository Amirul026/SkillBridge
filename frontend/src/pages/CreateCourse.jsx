import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import { toast } from 'react-toastify';
import { createCourse } from '../services/courseService'; // Import the createCourse function

const CreateCourse = ({ isDarkMode }) => {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [formData, setFormData] = useState({
    is_paywalled: false, // Required, boolean
    title: '', // Required, string, max 255
    price: 0, // Required, numeric, min 0
    description: '', // Required, string
    rating: 0, // Optional, numeric, min 0, max 5
    picture: '', // Optional, URL
    level: 'Beginner', // Required, string
    type: 'Development', // Required, string
    lesson_number: 1, // Required, integer, min 1
    length_in_weeks: 1, // Required, integer, min 1
    picture_file: null, // For file upload
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({ ...formData, picture_file: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let pictureUrl = null;

      // Upload profile picture if provided
      if (formData.picture_file) {
        const fileUploadFormData = new FormData();
        fileUploadFormData.append('picture_file', formData.picture_file);

        const uploadResponse = await fetch('http://127.0.0.1:8000/api/upload', {
          method: 'POST',
          body: fileUploadFormData,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          console.error("Upload Error:", errorData);
          throw new Error(errorData.message || "Image upload failed!");
        }

        const uploadData = await uploadResponse.json();
        pictureUrl = uploadData.data.url;
        console.log("Picture URL:", pictureUrl); // Debugging
      }

      // Create the course
      const courseData = {
        is_paywalled: formData.is_paywalled,
        title: formData.title,
        price: formData.price,
        description: formData.description,
        rating: formData.rating,
        picture: pictureUrl,
        level: formData.level,
        type: formData.type,
        lesson_number: formData.lesson_number,
        length_in_weeks: formData.length_in_weeks,
      };

      // Use the createCourse function from courseService.js
      await createCourse(courseData);

      toast.success("Course created successfully!");

      // Redirect to MentorCoursesPage after successful creation
      navigate('/mentor-courses');
    } catch (error) {
      console.error("Course Creation Error:", error);

      // Log the validation errors from the backend
      if (error.response && error.response.data) {
        console.error("Validation Errors:", error.response.data);
      }

      toast.error(error.message || "Failed to create course!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} py-8`}>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Create a New Course</h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Design and publish a new course for learners.
          </p>
        </div>
      </div>

      {/* Course Creation Form */}
      <div className="container mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Upload */}
          <div className="flex items-center space-x-4">
            <div className={`w-32 h-32 rounded-lg overflow-hidden border-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} relative`}>
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <Upload className={`w-8 h-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
              )}
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
                id="course-photo-upload"
              />
              <label
                htmlFor="course-photo-upload"
                className={`cursor-pointer text-sm ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
              >
                Upload Course Image
              </label>
            </div>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Course Title
            </label>
            <input
              type="text"
              id="title"
              required
              className={`mt-1 block w-full rounded-md shadow-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' : 'bg-gray-200 border-gray-300 focus:border-blue-500'} px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Price
            </label>
            <input
              type="number"
              id="price"
              required
              min="0"
              className={`mt-1 block w-full rounded-md shadow-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' : 'bg-gray-200 border-gray-300 focus:border-blue-500'} px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Description
            </label>
            <textarea
              id="description"
              required
              className={`mt-1 block w-full rounded-md shadow-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' : 'bg-gray-200 border-gray-300 focus:border-blue-500'} px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Rating */}
          <div>
            <label htmlFor="rating" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Rating (0-5)
            </label>
            <input
              type="number"
              id="rating"
              min="0"
              max="5"
              className={`mt-1 block w-full rounded-md shadow-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' : 'bg-gray-200 border-gray-300 focus:border-blue-500'} px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
            />
          </div>

          {/* Level */}
          <div>
            <label htmlFor="level" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Level
            </label>
            <select
              id="level"
              required
              className={`mt-1 block w-full rounded-md shadow-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' : 'bg-gray-200 border-gray-300 focus:border-blue-500'} px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Type */}
          <div>
            <label htmlFor="type" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Type
            </label>
            <select
              id="type"
              required
              className={`mt-1 block w-full rounded-md shadow-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' : 'bg-gray-200 border-gray-300 focus:border-blue-500'} px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="Development">Development</option>
              <option value="Text">Text</option>
              <option value="Interactive">Interactive</option>
            </select>
          </div>

          {/* Lesson Number */}
          <div>
            <label htmlFor="lesson_number" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Number of Lessons
            </label>
            <input
              type="number"
              id="lesson_number"
              required
              min="1"
              className={`mt-1 block w-full rounded-md shadow-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' : 'bg-gray-200 border-gray-300 focus:border-blue-500'} px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              value={formData.lesson_number}
              onChange={(e) => setFormData({ ...formData, lesson_number: parseInt(e.target.value) })}
            />
          </div>

          {/* Length in Weeks */}
          <div>
            <label htmlFor="length_in_weeks" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Length in Weeks
            </label>
            <input
              type="number"
              id="length_in_weeks"
              required
              min="1"
              className={`mt-1 block w-full rounded-md shadow-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' : 'bg-gray-200 border-gray-300 focus:border-blue-500'} px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              value={formData.length_in_weeks}
              onChange={(e) => setFormData({ ...formData, length_in_weeks: parseInt(e.target.value) })}
            />
          </div>

          {/* Is Paywalled */}
          <div>
            <label htmlFor="is_paywalled" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Is Paywalled?
            </label>
            <input
              type="checkbox"
              id="is_paywalled"
              className="mt-1"
              checked={formData.is_paywalled}
              onChange={(e) => setFormData({ ...formData, is_paywalled: e.target.checked })}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1e1a53] hover:bg-[#1e1a53]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Creating Course..." : "Create Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;