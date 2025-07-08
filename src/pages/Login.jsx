// src/pages/Login.jsx
import React, { useState } from "react";
import "../styles/login.css";
import authImage from "../assets/auth-image.jpg";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send data to backend for login and store JWT
    console.log("Login Data:", formData);
  };

  return (
    <div className="auth-container">
      <div className="form-section">
        <h1>Welcome Back</h1>
        <p>Login to track and manage your expenses with ease.</p>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <a href="/signup">Sign up here</a>
        </p>
      </div>
      <div className="image-section">
        <img src={authImage} alt="Auth Visual" />
      </div>
    </div>
  );
}

export default Login;
