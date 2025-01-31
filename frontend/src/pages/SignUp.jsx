import React from "react";
import "./SignUp.css"; // Import the CSS file

const SignUp = () => {
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Register Your Account</h2>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Enter Your Full Name" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Ex: Abc123@Gmail.Com" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Minimum 6 Length" />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Rewrite The Password Again" />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p className="login-link">
          Already Have An Account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;