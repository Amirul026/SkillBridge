import React from "react";
import "./Homepage.css";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <div className="search-section">
        <input
          type="text"
          placeholder="Search for courses"
          className="w-3/4 p-4 border rounded-lg outline-none text-lg"
        />
      </div>
      <div className="text">
        <h2 className="mt-6 text-2xl font-semibold">
          Empowering You To Learn New Skills, Inspiring You To Share Your Knowledge
        </h2>
      </div>
      <div className="button-section"> 
        <button className="mt-4 bg-blue-900 text-white px-2 py-1 text-xs rounded-sm w-auto">
          Visit Courses
        </button>
      </div>
      
      <div className="testimonials-section">
        <div className="text2">
          <h3 className="text-xl font-bold text-center my-6">What Our Learners Say</h3>
        </div>
        
        <div className="testimonials-container">
          <div className="testimonial-card">
            <img src="/assets/s1.png" alt="Learner" className="testimonial-img" />
            <p className="testimonial-text">
              "This platform has transformed the way I learn. The courses are engaging and insightful!"
            </p>
            <span className="testimonial-name">- John Doe</span>
            <div className="star-rating">★★★★★</div>
          </div>
          <div className="testimonial-card">
            <img src="/assets/s2.png" alt="Learner" className="testimonial-img" />
            <p className="testimonial-text">
              "The instructors are amazing, and the content is top-notch!"
            </p>
            <span className="testimonial-name">- Jane Smith</span>
            <div className="star-rating">★★★★☆</div>
          </div>
          <div className="testimonial-card">
            <img src="/assets/s3.png" alt="Learner" className="testimonial-img" />
            <p className="testimonial-text">
              "I highly recommend these courses to anyone looking to upskill."
            </p>
            <span className="testimonial-name">- Alex Brown</span>
            <div className="star-rating">★★★★★</div>
          </div>
        </div>
      </div>
      
      <div className="mentors-section">
        <h3 className="text-xl font-bold text-center my-6">Our Top Mentors</h3>
        <div className="mentors-container">
          <div className="mentor-card">
            <img src="/assets/mentor1.png" alt="Mentor" className="mentor-img" />
            <p className="mentor-name">Dr. Emily Carter</p>
            <p className="mentor-role">Senior Data Scientist</p>
          </div>
          <div className="mentor-card">
            <img src="/assets/mentor2.png" alt="Mentor" className="mentor-img" />
            <p className="mentor-name">Prof. Michael Lee</p>
            <p className="mentor-role">AI & Machine Learning Expert</p>
          </div>
          <div className="mentor-card">
            <img src="/assets/mentor3.png" alt="Mentor" className="mentor-img" />
            <p className="mentor-name">Dr. Sophia Martinez</p>
            <p className="mentor-role">Cybersecurity Specialist</p>
          </div>
          <div className="mentor-card">
            <img src="/assets/mentor4.png" alt="Mentor" className="mentor-img" />
            <p className="mentor-name">John Doe</p>
            <p className="mentor-role">Full Stack Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
