// src/pages/Advances.jsx
import React, { useState } from "react";
import "../styles/Advances.css";

const Advances = () => {
  const [form, setForm] = useState({
    recipient: "",
    amount: "",
    purpose: "",
    date: "",
    status: "Pending",
  });

  const [entries, setEntries] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEntries([...entries, form]);
    setForm({
      recipient: "",
      amount: "",
      purpose: "",
      date: "",
      status: "Pending",
    });
  };

  return (
    <div className="advances-container">
      <h1 className="advances-heading">💸 Advance Tracker</h1>
      <p className="advances-subtext">
        Record all advances — paid or pending — to stay organized.
      </p>

      <form className="advances-form" onSubmit={handleSubmit}>
        <label>
          Recipient
          <input
            type="text"
            value={form.recipient}
            onChange={(e) => setForm({ ...form, recipient: e.target.value })}
            placeholder="John Doe / Vendor"
            required
          />
        </label>

        <label>
          Amount (₹)
          <input
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            placeholder="5000"
            required
          />
        </label>

        <label>
          Purpose
          <input
            type="text"
            value={form.purpose}
            onChange={(e) => setForm({ ...form, purpose: e.target.value })}
            placeholder="Office Supplies / Event Booking"
            required
          />
        </label>

        <label>
          Date
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
        </label>

        <label>
          Status
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>
        </label>

        <button type="submit" className="btn-generate">
          ➕ Add Advance
        </button>
      </form>

      {entries.length > 0 && (
        <div className="advance-list">
          <h2>📋 Recorded Advances</h2>
          <ul>
            {entries.map((entry, index) => (
              <li key={index}>
                <div className="entry-header">
                  <strong>{entry.recipient}</strong> — ₹{entry.amount}
                </div>
                <div className="entry-meta">
                  <span>Purpose: {entry.purpose}</span>
                  <span>Date: {entry.date}</span>
                  <span className={`status ${entry.status.toLowerCase()}`}>
                    {entry.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Advances;
