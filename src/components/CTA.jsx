import React from "react";
import "../styles/CTA.css";
import { motion } from "framer-motion";

function CTA() {
  return (
    <section className="cta-section">
      <motion.div
        className="cta-content"
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2>Ready to take control of your finances?</h2>
        <p>
          Join thousands of users simplifying their expense tracking with
          Spendly. Track better. Spend smarter.
        </p>
        <a href="/signup" className="cta-button">
          Get Started for Free
        </a>
      </motion.div>
    </section>
  );
}

export default CTA;
