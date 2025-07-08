import React from "react";
import "../styles/Hero.css";
import { motion } from "framer-motion";
import heroImage from "../assets/hero.jpg"; // Replace with your image

function Hero() {
  return (
    <section className="hero">
      <motion.div
        className="hero-left"
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1>Take Control of Your Finances</h1>
        <p>
          Spendly helps you track your income, expenses, advances, invoices, and
          more — all in one place.
        </p>
        <p>
          Make smarter financial decisions with powerful analytics and reports
          tailored just for you.
        </p>
        <motion.a
          href="/signup"
          className="hero-cta"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.a>
      </motion.div>

      <motion.div
        className="hero-right"
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <img src={heroImage} alt="Finance management" />
      </motion.div>
    </section>
  );
}

export default Hero;
