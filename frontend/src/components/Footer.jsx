import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <div>
            <a href="#">About Us</a>
            <a href="#">Contact Us</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
          </div>
          <div>
            <a href="#">Teach On SkillBridge</a>
            <a href="#">Get The App</a>
          </div>
          <div>
            <a href="#">Help And Support</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
        <div className="footer-social">
          <span>Follow Us:</span>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaYoutube /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;