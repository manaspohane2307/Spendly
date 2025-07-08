import React from "react";
import "../styles/Features.css";
import { motion } from "framer-motion";
import {
  FaChartBar,
  FaWallet,
  FaFileInvoice,
  FaMoneyCheckAlt,
  FaExchangeAlt,
  FaPiggyBank,
  FaSuitcase,
  FaRegChartBar,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaChartBar />,
      title: "Smart Analytics",
      desc: "Visualize your income, expenses, and trends with beautiful reports.",
    },
    {
      icon: <FaWallet />,
      title: "Expense Tracking",
      desc: "Record and categorize your spending in real-time across all sources.",
    },
    {
      icon: <FaMoneyCheckAlt />,
      title: "Income Manager",
      desc: "Keep tabs on salary, freelance, and other income streams.",
    },
    {
      icon: <FaFileInvoice />,
      title: "Invoice Management",
      desc: "Generate, send, and track professional invoices easily.",
    },
    {
      icon: <FaPiggyBank />,
      title: "Advance Settlements",
      desc: "Manage splits, loans, and advance payments transparently.",
    },
    {
      icon: <FaExchangeAlt />,
      title: "Currency Converter",
      desc: "Convert between currencies with real-time rates and insights.",
    },
    {
      icon: <FaSuitcase />,
      title: "Trips",
      desc: "Log and manage trip-related expenses with ease and transparency.",
    },
    {
      icon: <FaRegChartBar />,
      title: "Reports",
      desc: "Export detailed monthly/annual reports for complete oversight.",
    },
  ];

  return (
    <section className="features">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Why Choose Spendly?
      </motion.h2>

      <div className="features-grid">
        {features.map((feat, idx) => (
          <motion.div
            className="feature-card"
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="icon">{feat.icon}</div>
            <h3>{feat.title}</h3>
            <p>{feat.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Features;
