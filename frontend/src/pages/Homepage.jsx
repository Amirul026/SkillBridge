import React from "react";
import "./Homepage.css";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <div>
        <input
          type="text"
          placeholder="Search for courses"
          className="w-1/2 p-2 border rounded-lg outline-none"
        />
        <h2 className="mt-6 text-2xl font-semibold">
          Empowering You To Learn New Skills, Inspiring You To Share Your Knowledge
        </h2>
        <button className="mt-4 bg-blue-900 text-white px-6 py-2 rounded">
          Visit Courses
        </button>
      </div>
    </div>
  );
};

export default Homepage;
