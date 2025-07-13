// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ isLoggedIn = false, username = "Guest" }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="brand">
          Spendly
        </Link>
      </div>

      <div className="navbar-center">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/income">Income</Link>
        <Link to="/expenses">Expenses</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/invoice">Invoice</Link>
        <Link to="/trips">Trips</Link>
        <Link to="/advances">Advances</Link>
        <Link to="/currency">Currency</Link>
      </div>

      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <span className="username">{username}</span>
            <div className="profile-icon">
              {username.charAt(0).toUpperCase()}
            </div>
          </>
        ) : (
          <>
            <Link to="/signup" className="auth-link">
              Sign Up
            </Link>
            <span className="separator">|</span>
            <Link to="/login" className="auth-link">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
