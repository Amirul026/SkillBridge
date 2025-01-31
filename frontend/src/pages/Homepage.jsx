import React from "react";
import "./Homepage.css";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <div className="header-section">
        <input
          type="text"
          placeholder="Search for courses"
          className="search-bar"
        />
        <h2 className="header-text">
          Empowering You To Learn New Skills, Inspiring You To Share Your Knowledge
        </h2>
        <button className="visit-courses-btn">
          Visit Courses
        </button>
      </div>
      <div className="courses-section">
        <h3 className="section-title">Popular Courses</h3>
        <div className="course-categories">
          <div className="category">Professional Courses</div>
          <div className="category">Free Courses</div>
          <div className="category">Paid Courses</div>
        </div>
        <div className="course-list">
          {/* Add more course items to ensure scrolling */}
          {[...Array(20)].map((_, index) => (
            <div className="course-item" key={index}>
              <img src="https://via.placeholder.com/200" alt="Course" className="course-image" />
              <h4>Course {index + 1}</h4>
              <p>Duration: 4 Hours</p>
              <button className="view-info-btn">View More Info</button>
            </div>
          ))}
        </div>
        <button className="view-more-btn">View More Courses</button>
      </div>
    </div>
  );
};

export default Homepage;