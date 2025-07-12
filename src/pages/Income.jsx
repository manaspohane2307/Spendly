import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import "../styles/Income.css";
import Footer from "../components/Footer";
import { FiPlus } from "react-icons/fi";
import { CSVLink } from "react-csv";

const initialIncomeData = [
  { id: 1, source: "Salary", amount: 80000, date: "2025-07-01" },
  { id: 2, source: "Freelance", amount: 15000, date: "2025-07-05" },
  { id: 3, source: "Investment", amount: 12000, date: "2025-07-10" },
  { id: 4, source: "Bonus", amount: 7000, date: "2025-07-15" },
  { id: 5, source: "Dividends", amount: 5000, date: "2025-07-20" },
];

const COLORS = ["#6FD18C", "#4D9375", "#A8E6CF", "#B2D8B2", "#88C999"];

const Income = () => {
  const [incomeData, setIncomeData] = useState(initialIncomeData);
  const [showForm, setShowForm] = useState(false);
  const [formState, setFormState] = useState({
    source: "",
    amount: "",
    date: "",
  });
  const [editId, setEditId] = useState(null);
  const [sortKey, setSortKey] = useState("date");
  const [filterSource, setFilterSource] = useState("");

  const totalIncome = incomeData.reduce(
    (sum, entry) => sum + parseInt(entry.amount),
    0
  );
  const averageIncome = incomeData.length
    ? Math.round(totalIncome / incomeData.length)
    : 0;
  const highestIncome = Math.max(
    ...incomeData.map((entry) => parseInt(entry.amount))
  );

  const handleAddClick = () => {
    setShowForm(true);
    setFormState({ source: "", amount: "", date: "" });
    setEditId(null);
  };

  const handleEdit = (entry) => {
    setShowForm(true);
    setFormState(entry);
    setEditId(entry.id);
  };

  const handleDelete = (id) => {
    setIncomeData(incomeData.filter((item) => item.id !== id));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setIncomeData(
        incomeData.map((item) =>
          item.id === editId ? { ...formState, id: editId } : item
        )
      );
    } else {
      setIncomeData([...incomeData, { ...formState, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const sortedData = [...incomeData].sort((a, b) => {
    if (sortKey === "amount") return b.amount - a.amount;
    if (sortKey === "source") return a.source.localeCompare(b.source);
    return new Date(b.date) - new Date(a.date);
  });

  const filteredData = sortedData.filter((entry) =>
    entry.source.toLowerCase().includes(filterSource.toLowerCase())
  );

  const csvData = [
    ["Source", "Amount", "Date"],
    ...incomeData.map((item) => [item.source, item.amount, item.date]),
  ];

  return (
    <div className="income-page">
      <div className="income-header">
        <h1 className="income-heading">Income Overview</h1>
        <div className="income-controls">
          <button className="add-income-btn" onClick={handleAddClick}>
            <FiPlus /> Add Income
          </button>
          <CSVLink
            data={csvData}
            filename="income_data.csv"
            className="download-btn"
          >
            Download CSV
          </CSVLink>
        </div>
      </div>

      <div className="income-cards">
        <div className="income-card">
          <p>Total Income</p>
          <h2>₹{totalIncome}</h2>
        </div>
        <div className="income-card">
          <p>Highest Income</p>
          <h2>₹{highestIncome}</h2>
        </div>
        <div className="income-card">
          <p>Average Income</p>
          <h2>₹{averageIncome}</h2>
        </div>
        <div className="income-card">
          <p>Total Sources</p>
          <h2>{incomeData.length}</h2>
        </div>
      </div>

      <div className="income-filters">
        <label>
          Sort by:
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
            <option value="source">Source</option>
          </select>
        </label>
        <label>
          Filter by Source:
          <input
            type="text"
            placeholder="Search source..."
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
          />
        </label>
      </div>

      <div className="income-section">
        <h2>Income Trend (Date vs Amount)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#6FD18C" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="income-section">
        <h2>Source-wise Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={filteredData}
              dataKey="amount"
              nameKey="source"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {filteredData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="income-section">
        <h2>Income Entries</h2>
        <table className="income-table">
          <thead>
            <tr>
              <th>Source</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.source}</td>
                <td>₹{entry.amount}</td>
                <td>{entry.date}</td>
                <td>
                  <button onClick={() => handleEdit(entry)}>✏️</button>
                  <button onClick={() => handleDelete(entry.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>{editId ? "Edit Income" : "Add Income"}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="source"
                placeholder="Source"
                value={formState.source}
                onChange={handleFormChange}
                required
              />
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formState.amount}
                onChange={handleFormChange}
                required
              />
              <input
                type="date"
                name="date"
                value={formState.date}
                onChange={handleFormChange}
                required
              />
              <div className="modal-actions">
                <button type="submit" className="modal-btn save">
                  {editId ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  className="modal-btn cancel"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default Income;
