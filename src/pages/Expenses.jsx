// src/pages/Expenses.jsx
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
} from "recharts";
import "../styles/Expenses.css";
import { FiPlus } from "react-icons/fi";
import { CSVLink } from "react-csv";
import Footer from "../components/Footer"; // Assuming footer component

const initialExpenseData = [
  { id: 1, category: "Rent", amount: 15000, date: "2025-07-02" },
  { id: 2, category: "Food", amount: 4000, date: "2025-07-06" },
  { id: 3, category: "Transport", amount: 2000, date: "2025-07-11" },
  { id: 4, category: "Shopping", amount: 3500, date: "2025-07-14" },
];

const COLORS = ["#6FD18C", "#4D9375", "#A8E6CF", "#B2D7B5"];

const Expenses = () => {
  const [expenses, setExpenses] = useState(initialExpenseData);
  const [showForm, setShowForm] = useState(false);
  const [formState, setFormState] = useState({
    category: "",
    amount: "",
    date: "",
  });
  const [editId, setEditId] = useState(null);
  const [sortKey, setSortKey] = useState("date");
  const [filterCategory, setFilterCategory] = useState("");

  const total = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
  const avg = expenses.length ? Math.round(total / expenses.length) : 0;
  const max = Math.max(...expenses.map((e) => parseFloat(e.amount)));

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleAddClick = () => {
    setShowForm(true);
    setFormState({ category: "", amount: "", date: "" });
    setEditId(null);
  };

  const handleEdit = (entry) => {
    setShowForm(true);
    setFormState(entry);
    setEditId(entry.id);
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setExpenses(
        expenses.map((e) =>
          e.id === editId ? { ...formState, id: editId } : e
        )
      );
    } else {
      setExpenses([...expenses, { ...formState, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const sorted = [...expenses].sort((a, b) => {
    if (sortKey === "amount") return b.amount - a.amount;
    if (sortKey === "category") return a.category.localeCompare(b.category);
    return new Date(b.date) - new Date(a.date);
  });

  const filtered = sorted.filter((e) =>
    e.category.toLowerCase().includes(filterCategory.toLowerCase())
  );

  const csvData = [
    ["Category", "Amount", "Date"],
    ...expenses.map((e) => [e.category, e.amount, e.date]),
  ];

  const pieData = Object.values(
    filtered.reduce((acc, curr) => {
      acc[curr.category] = acc[curr.category] || {
        name: curr.category,
        value: 0,
      };
      acc[curr.category].value += parseFloat(curr.amount);
      return acc;
    }, {})
  );

  const mostSpentCategory = pieData.reduce(
    (max, entry) => (entry.value > max.value ? entry : max),
    { name: "", value: 0 }
  );

  return (
    <div className="expenses-page">
      <div className="expenses-header">
        <h1 className="expenses-heading">Expense Overview</h1>
        <div className="expenses-controls">
          <button className="add-expense-btn" onClick={handleAddClick}>
            <FiPlus /> Add Expense
          </button>
          <CSVLink
            data={csvData}
            filename="expenses.csv"
            className="download-btn"
          >
            Download CSV
          </CSVLink>
        </div>
      </div>

      <div className="expenses-cards">
        <div className="expenses-card">
          <p>Total Expense</p>
          <h2>₹{total}</h2>
        </div>
        <div className="expenses-card">
          <p>Highest Expense</p>
          <h2>₹{max}</h2>
        </div>
        <div className="expenses-card">
          <p>Average Expense</p>
          <h2>₹{avg}</h2>
        </div>
        <div className="expenses-card">
          <p>Total Categories</p>
          <h2>{expenses.length}</h2>
        </div>
      </div>

      <div className="expenses-filters">
        <label>
          Sort by:
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
            <option value="category">Category</option>
          </select>
        </label>

        <label>
          Filter by Category:
          <input
            type="text"
            placeholder="Search category..."
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          />
        </label>
      </div>

      <div className="expenses-chart">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filtered}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#6FD18C" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="expenses-pie-chart">
        <h3>Category-wise Breakdown</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="expenses-section">
        <h2>Expense Entries</h2>
        <table className="expenses-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.category}</td>
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

      <div className="insights-faq-section">
        <h2>Useful Insights</h2>
        <div className="faq-item">
          <button className="faq-question">
            💡 Most Spent Category: {mostSpentCategory.name}
          </button>
          <div className="faq-answer">
            You spent the most on <b>{mostSpentCategory.name}</b>, totaling ₹
            {mostSpentCategory.value}. Consider evaluating this expense.
          </div>
        </div>
        <div className="faq-item">
          <button className="faq-question">
            📈 What is your average expense?
          </button>
          <div className="faq-answer">
            ₹{avg} per entry. Try reducing non-essential spending to lower your
            average.
          </div>
        </div>
        <div className="faq-item">
          <button className="faq-question">
            📅 Are expenses clustered on specific dates?
          </button>
          <div className="faq-answer">
            Use the bar chart above to visualize date patterns. Try spreading
            variable expenses evenly.
          </div>
        </div>
        <div className="faq-item">
          <button className="faq-question">📥 Can I export my data?</button>
          <div className="faq-answer">
            Yes! Click on the "Download CSV" button to get your expense records.
          </div>
        </div>
        <div className="faq-item">
          <button className="faq-question">
            🔄 What if I want to edit an entry?
          </button>
          <div className="faq-answer">
            Click the ✏️ icon next to an entry in the table to modify it.
          </div>
        </div>
        <div className="faq-item">
          <button className="faq-question">
            🧮 How many entries are logged?
          </button>
          <div className="faq-answer">
            You've logged {expenses.length} entries so far. Keep going!
          </div>
        </div>
        <div className="faq-item">
          <button className="faq-question">
            📊 How is spending distributed?
          </button>
          <div className="faq-answer">
            Refer to the pie chart above for category-wise distribution.
          </div>
        </div>
        <div className="faq-item">
          <button className="faq-question">
            🧾 Can I track fixed vs variable costs?
          </button>
          <div className="faq-answer">
            Create separate categories like "Rent" (fixed) and "Dining Out"
            (variable) to analyze them.
          </div>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>{editId ? "Edit Expense" : "Add Expense"}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formState.category}
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

      <Footer />
    </div>
  );
};

export default Expenses;
