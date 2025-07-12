import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import "../styles/Dashboard.css";
import Footer from "../components/Footer.jsx";

const incomeData = [
  { name: "Salary", value: 80000 },
  { name: "Freelance", value: 15000 },
  { name: "Investments", value: 5000 },
];

const COLORS = ["#6FD18C", "#4D9375", "#A8E6CF"];

const expenseData = [
  { name: "Food", amount: 6000 },
  { name: "Rent", amount: 10000 },
  { name: "Transport", amount: 2000 },
];

const incomeTrendData = [
  { date: "May", income: 60000 },
  { date: "June", income: 75000 },
  { date: "July", income: 95000 },
];

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="dashboard-heading">Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card">
          💰 <p>Total Balance</p> <h2>₹72,000</h2>
        </div>
        <div className="card">
          📈 <p>Total Income</p> <h2>₹95,000</h2>
        </div>
        <div className="card">
          📉 <p>Total Expenses</p> <h2>₹23,000</h2>
        </div>
        <div className="card">
          📊 <p>Monthly Change</p> <h2>+12%</h2>
        </div>
      </div>

      {/* Income Overview Pie Chart */}
      <div className="section">
        <h2>Income Overview</h2>
        <p className="section-description">
          This pie chart summarizes your income sources and their contribution
          to total income.
        </p>
        <div className="section-row">
          <div className="chart-wide">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={incomeData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {incomeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="legend">
            {incomeData.map((entry, index) => (
              <div key={index} className="legend-item">
                <span
                  className="legend-color"
                  style={{ backgroundColor: COLORS[index] }}
                ></span>
                <span>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="section">
        <h2>Recent Transactions</h2>
        <p className="section-description">
          A quick glance at your latest income and expense transactions.
        </p>
        <ul className="transaction-list">
          <li>✔ Freelance Payment – ₹10,000</li>
          <li>✖ Grocery – ₹2,000</li>
          <li>✔ Salary – ₹80,000</li>
          <li>✖ Transport – ₹500</li>
        </ul>
      </div>

      {/* Expense Details */}
      <div className="section">
        <h2>Expense Analysis</h2>
        <p className="section-description">
          Breakdown of your recent expenses along with a bar chart for visual
          comparison.
        </p>
        <div className="section-row">
          <div className="half">
            <p className="chart-heading">Expense Table</p>
            <table className="details-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>% of Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Food</td>
                  <td>₹6,000</td>
                  <td>26%</td>
                </tr>
                <tr>
                  <td>Rent</td>
                  <td>₹10,000</td>
                  <td>43%</td>
                </tr>
                <tr>
                  <td>Transport</td>
                  <td>₹2,000</td>
                  <td>9%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="chart-card half">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={expenseData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#6FD18C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Income Details */}
      <div className="section">
        <h2>Income Breakdown</h2>
        <p className="section-description">
          Track income entries and view how your earnings have changed over the
          past 3 months.
        </p>
        <div className="section-row">
          <div className="half">
            <p className="chart-heading">Income Table</p>
            <table className="details-table">
              <thead>
                <tr>
                  <th>Source</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Salary</td>
                  <td>₹80,000</td>
                  <td>2025-07-01</td>
                </tr>
                <tr>
                  <td>Freelance</td>
                  <td>₹15,000</td>
                  <td>2025-07-05</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="chart-card half">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={incomeTrendData}>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#4D9375"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
