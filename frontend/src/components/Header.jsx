import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import "./Header.css";


const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 shadow-md">
      <h1 className="text-2xl font-bold">SkillBridge</h1>
      <nav className="space-x-6">
        <a href="#" className="border-b-2 border-black">Home</a>
        <a href="#">Seminar</a>
        <a href="#">Courses</a>
        <a href="#">Mentors</a>
        <div className="relative">
        <FaShoppingCart size={20} />
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">1</span>
        </div>
      </nav>
      <div className="flex items-center space-x-4">

        <div className="buttons-container">
        <button className="login-btn">Login</button>
  <     button className="register-btn">Register</button>
      </div>

      </div>
    </header>
  );
};

export default Header;
