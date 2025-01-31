import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Header.css"; // Import the CSS file

const Header = () => {
  return (
    <header>
      <h1>
        <NavLink to="/">SkillBridge</NavLink>
      </h1>
      <nav>
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>
        <NavLink to="/seminar" className={({ isActive }) => (isActive ? "active" : "")}>
          Seminar
        </NavLink>
        <NavLink to="/courses" className={({ isActive }) => (isActive ? "active" : "")}>
          Courses
        </NavLink>
        <NavLink to="/mentors" className={({ isActive }) => (isActive ? "active" : "")}>
          Mentors
        </NavLink>
      </nav>
      <div className="right-section">
        <div className="cart-container">
          <FaShoppingCart />
          <span className="cart-badge">1</span>
        </div>
        <div className="buttons-container">
          <NavLink to="/login" className="login-btn">
            Login
          </NavLink>
          <NavLink to="/signup" className="register-btn">
            Register
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;