// src/pages/Trips.jsx
import React, { useState } from "react";
import "../styles/Trips.css";

const tripTypes = [
  "Corporate Trip",
  "Holiday Vacation",
  "Solo Travel",
  "Family Tour",
  "Adventure Trip",
  "Romantic Getaway",
];

const Trips = () => {
  const [tripType, setTripType] = useState("");
  const [form, setForm] = useState({
    destination: "",
    days: "",
    people: "",
    accommodation: "",
    transport: "",
    food: "",
    extras: "",
  });

  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const total =
      Number(form.accommodation) +
      Number(form.transport) +
      Number(form.food) +
      Number(form.extras);

    setResult({
      ...form,
      tripType,
      total,
    });
  };

  return (
    <div className="trips-container">
      <h1 className="trips-heading">🌿 Trip Budget Estimator</h1>
      <p className="trips-subtext">
        Select a trip type and enter details to get a quick budget.
      </p>

      <div className="trip-type-selector">
        {tripTypes.map((type) => (
          <button
            key={type}
            className={tripType === type ? "trip-tab active" : "trip-tab"}
            onClick={() => setTripType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {tripType && (
        <form className="trip-form" onSubmit={handleSubmit}>
          <label>Destination</label>
          <input
            type="text"
            value={form.destination}
            onChange={(e) => setForm({ ...form, destination: e.target.value })}
            placeholder="Goa"
          />

          <label>Duration (in days)</label>
          <input
            type="number"
            value={form.days}
            onChange={(e) => setForm({ ...form, days: e.target.value })}
            placeholder="5"
          />

          <label>Number of People</label>
          <input
            type="number"
            value={form.people}
            onChange={(e) => setForm({ ...form, people: e.target.value })}
            placeholder="2"
          />

          <label>Accommodation (₹)</label>
          <input
            type="number"
            value={form.accommodation}
            onChange={(e) =>
              setForm({ ...form, accommodation: e.target.value })
            }
            placeholder="8000"
          />

          <label>Transport (₹)</label>
          <input
            type="number"
            value={form.transport}
            onChange={(e) => setForm({ ...form, transport: e.target.value })}
            placeholder="4000"
          />

          <label>Food & Dining (₹)</label>
          <input
            type="number"
            value={form.food}
            onChange={(e) => setForm({ ...form, food: e.target.value })}
            placeholder="3000"
          />

          <label>Extra Activities (₹)</label>
          <input
            type="number"
            value={form.extras}
            onChange={(e) => setForm({ ...form, extras: e.target.value })}
            placeholder="2000"
          />

          <button type="submit" className="btn-generate">
            🧮 Estimate Budget
          </button>
        </form>
      )}

      {result && (
        <div className="trip-output">
          <h2>📋 Trip Summary</h2>
          <ul>
            <li>
              <strong>Trip Type:</strong> {result.tripType}
            </li>
            <li>
              <strong>Destination:</strong> {result.destination}
            </li>
            <li>
              <strong>Days:</strong> {result.days}
            </li>
            <li>
              <strong>People:</strong> {result.people}
            </li>
            <li>
              <strong>Accommodation:</strong> ₹{result.accommodation}
            </li>
            <li>
              <strong>Transport:</strong> ₹{result.transport}
            </li>
            <li>
              <strong>Food:</strong> ₹{result.food}
            </li>
            <li>
              <strong>Extras:</strong> ₹{result.extras}
            </li>
            <li className="trip-total">
              <strong>Total Budget:</strong> ₹{result.total.toLocaleString()}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Trips;
