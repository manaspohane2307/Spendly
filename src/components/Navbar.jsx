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
        <a href="/expenses">Expenses</a>
        <a href="#reports">Reports</a>
        <a href="#trips">Trips</a>
        <a href="#advances">Advances</a>
        <a href="#analytics">Analytics</a>
        <a href="#invoice">Invoice</a>
        <a href="#currency">Currency</a>
      </div>

      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <span className="username">{username}</span>
            <div className="profile-icon">{username.charAt(0)}</div>
          </>
        ) : (
          <>
            <Link to="/signup" className="auth-link">
              Sign Up
            </Link>
            <span>|</span>
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
