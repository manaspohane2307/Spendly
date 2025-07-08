// src/pages/SignUp.jsx
import React, { useState } from "react";
import "../styles/signup.css";
import authImage from "../assets/auth-image.jpg";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send data to your backend for JWT registration
    console.log("SignUp Data:", formData);
  };

  return (
    <div className="auth-container">
      <div className="form-section">
        <h1>Create Your Account</h1>
        <p>Welcome! Sign up to start managing your expenses effortlessly.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
      <div className="image-section">
        <img src={authImage} alt="Auth Visual" />
      </div>
    </div>
  );
}

export default SignUp;
