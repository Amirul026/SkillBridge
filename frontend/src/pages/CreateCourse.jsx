import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  DollarSign,
  BookOpen,
  Star,
  BarChart,
  CalendarClock,
} from "lucide-react";
import { toast } from "react-toastify";
import { createCourse } from "../services/courseService";

const CreateCourse = ({ isDarkMode }) => {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [formData, setFormData] = useState({
    is_paywalled: false,
    title: "",
    price: 0,
    description: "",
    rating: 0,
    picture: "",
    level: "Beginner",
    type: "Development",
    lesson_number: 1,
    length_in_weeks: 1,
    picture_file: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        fileUploadFormData.append("picture_file", formData.picture_file);

        const uploadResponse = await fetch("http://127.0.0.1:8000/api/upload", {
          method: "POST",
          body: fileUploadFormData,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          console.error("Upload Error:", errorData);
          throw new Error(errorData.message || "Image upload failed!");
        }

        const uploadData = await uploadResponse.json();
        pictureUrl = uploadData.data.url;
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

      await createCourse(courseData);
      navigate("/mentor-courses");
    } catch (error) {
      console.error("Course Creation Error:", error);
      if (error.response && error.response.data) {
        console.error("Validation Errors:", error.response.data);
      }
      toast.error(error.message || "Failed to create course!");
    } finally {
      setLoading(false);
    }
  };

  // Common input class for consistency
  const inputClass = `w-full rounded-lg ${
    isDarkMode
      ? "bg-gray-700 border-gray-600 text-white focus:border-indigo-500"
      : "bg-white border-gray-300 focus:border-indigo-500"
  } border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200`;

  // Common label class for consistency
  const labelClass = `block mb-2 font-medium ${
    isDarkMode ? "text-gray-200" : "text-gray-700"
  }`;

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Hero Banner */}
      <div
        className={`${
          isDarkMode ? "bg-indigo-900" : "bg-indigo-700"
        } py-12 px-4`}
      >
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Create New Course
          </h1>
          <p className="text-indigo-200 text-lg max-w-2xl">
            Design and publish comprehensive courses to share your expertise
            with learners worldwide.
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div
          className={`${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } rounded-xl shadow-lg p-6 md:p-8`}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Course Image Upload */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div
                className={`w-40 h-40 rounded-xl overflow-hidden border-2 ${
                  isDarkMode ? "border-gray-600" : "border-gray-200"
                } relative`}
              >
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Course Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className={`w-full h-full flex items-center justify-center ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <Upload
                      className={`w-10 h-10 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <h3
                  className={`font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Course Thumbnail
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Upload an image that represents your course. A high-quality
                  image will help your course stand out.
                </p>
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                    id="course-photo-upload"
                  />
                  <label
                    htmlFor="course-photo-upload"
                    className={`inline-flex items-center px-4 py-2 rounded-lg cursor-pointer ${
                      isDarkMode
                        ? "bg-gray-700 text-indigo-300 hover:bg-gray-600"
                        : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                    }`}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </label>
                </div>
              </div>
            </div>

            {/* Form Grid */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* Title */}
              <div className="md:col-span-2">
                <label htmlFor="title" className={labelClass}>
                  <BookOpen className="inline mr-2 h-5 w-5" />
                  Course Title
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  placeholder="Enter an engaging title for your course"
                  className={inputClass}
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className={labelClass}>
                  <DollarSign className="inline mr-2 h-5 w-5" />
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  required
                  min="0"
                  placeholder="29.99"
                  className={inputClass}
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value),
                    })
                  }
                />
              </div>

              {/* Is Paywalled */}
              <div className="flex items-center">
                <div
                  className={`flex items-center h-full ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  } px-4 py-3 rounded-lg`}
                >
                  <input
                    type="checkbox"
                    id="is_paywalled"
                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={formData.is_paywalled}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        is_paywalled: e.target.checked,
                      })
                    }
                  />
                  <label
                    htmlFor="is_paywalled"
                    className={`ml-3 ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Require payment to access
                  </label>
                </div>
              </div>

              {/* Rating */}
              <div>
                <label htmlFor="rating" className={labelClass}>
                  <Star className="inline mr-2 h-5 w-5" />
                  Rating (0-5)
                </label>
                <input
                  type="number"
                  id="rating"
                  min="0"
                  max="5"
                  step="0.1"
                  placeholder="4.5"
                  className={inputClass}
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rating: parseFloat(e.target.value),
                    })
                  }
                />
              </div>

              {/* Level */}
              <div>
                <label htmlFor="level" className={labelClass}>
                  <BarChart className="inline mr-2 h-5 w-5" />
                  Level
                </label>
                <select
                  id="level"
                  required
                  className={inputClass}
                  value={formData.level}
                  onChange={(e) =>
                    setFormData({ ...formData, level: e.target.value })
                  }
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              {/* Type */}
              <div>
                <label htmlFor="type" className={labelClass}>
                  Course Type
                </label>
                <select
                  id="type"
                  required
                  className={inputClass}
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  <option value="Development">Development</option>
                  <option value="Text">Text</option>
                  <option value="Interactive">Interactive</option>
                </select>
              </div>

              {/* Lesson Number */}
              <div>
                <label htmlFor="lesson_number" className={labelClass}>
                  Number of Lessons
                </label>
                <input
                  type="number"
                  id="lesson_number"
                  required
                  min="1"
                  placeholder="12"
                  className={inputClass}
                  value={formData.lesson_number}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lesson_number: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              {/* Length in Weeks */}
              <div>
                <label htmlFor="length_in_weeks" className={labelClass}>
                  <CalendarClock className="inline mr-2 h-5 w-5" />
                  Length (weeks)
                </label>
                <input
                  type="number"
                  id="length_in_weeks"
                  required
                  min="1"
                  placeholder="4"
                  className={inputClass}
                  value={formData.length_in_weeks}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      length_in_weeks: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label htmlFor="description" className={labelClass}>
                  Course Description
                </label>
                <textarea
                  id="description"
                  required
                  placeholder="Provide a detailed description of what students will learn in this course"
                  className={`${inputClass} h-32`}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={() => navigate("/mentor-courses")}
                className={`py-3 px-6 rounded-lg text-sm font-medium ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition-colors duration-200`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`py-3 px-6 rounded-lg text-sm font-medium ${
                  loading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } text-white transition-colors duration-200 relative overflow-hidden`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Course...
                  </span>
                ) : (
                  "Create Course"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
