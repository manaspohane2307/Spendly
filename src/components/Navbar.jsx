import React from "react";
import "../styles/Navbar.css";

function Navbar({ isLoggedIn = false, username = "Guest" }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="brand">Spendly</span>
      </div>

      <div className="navbar-center">
        <a href="#dashboard">Dashboard</a>
        <a href="#income">Income</a>
        <a href="#expenses">Expenses</a>
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
            <a href="/signup" className="auth-link">
              Sign Up
            </a>
            <span>|</span>
            <a href="/login" className="auth-link">
              Login
            </a>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
