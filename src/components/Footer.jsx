import React from "react";
import "../styles/Footer.css";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-col">
          <h2 className="footer-brand">Spendly</h2>
          <p className="footer-desc">
            Simplify your finances. Track smart. Spend better.
          </p>
        </div>

        {/* Navigation */}
        <div className="footer-col">
          <h3>Navigation</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="/signup">Sign Up</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="footer-col">
          <h3>Resources</h3>
          <ul>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">FAQs</a>
            </li>
            <li>
              <a href="#">Terms</a>
            </li>
            <li>
              <a href="#">Privacy</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h3>Connect</h3>
          <div className="footer-socials">
            <a href="#">
              <FaGithub />
            </a>
            <a href="#">
              <FaLinkedin />
            </a>
            <a href="#">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Spendly. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
