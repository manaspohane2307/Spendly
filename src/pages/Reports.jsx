// src/pages/Reports.jsx
import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import "../styles/Reports.css";
import reportImage from "../assets/report-image.jpg";
import Footer from "../components/Footer";

const Reports = () => {
  const [formData, setFormData] = useState({
    description: "",
    category: "",
    paidBy: "",
    paidTo: "",
    amount: "",
    taxes: "",
    expenseDate: "",
    account: "",
    notes: "",
  });

  const [showReport, setShowReport] = useState(false);
  const reportRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateReport = (e) => {
    e.preventDefault();
    setShowReport(true);
  };

  const exportPDF = async () => {
    const canvas = await html2canvas(reportRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save("financial_report.pdf");
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet([formData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, "financial_report.xlsx");
  };

  return (
    <>
      <div className="reports-container">
        <h1 className="reports-heading">📄 Financial Report Generator</h1>
        <p className="reports-subtext">
          Fill in your expense details and generate a formatted financial report
          instantly.
        </p>

        <img
          className="reports-hero-image"
          src={reportImage}
          alt="Reports Hero"
        />

        <form className="reports-form" onSubmit={generateReport}>
          <label>
            Description:
            <input
              type="text"
              name="description"
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Category:
            <select
              name="category"
              onChange={handleChange}
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Rent">Rent</option>
              <option value="Utilities">Utilities</option>
              <option value="Shopping">Shopping</option>
              <option value="Others">Others</option>
            </select>
          </label>

          <label>
            Paid by:
            <input type="text" name="paidBy" onChange={handleChange} required />
          </label>

          <label>
            Paid to:
            <input type="text" name="paidTo" onChange={handleChange} required />
          </label>

          <label>
            Amount (₹):
            <input
              type="number"
              name="amount"
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Taxes (₹):
            <input type="number" name="taxes" onChange={handleChange} />
          </label>

          <label>
            Expense Date:
            <input
              type="date"
              name="expenseDate"
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Account:
            <input
              type="text"
              name="account"
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Notes:
            <textarea name="notes" rows="3" onChange={handleChange}></textarea>
          </label>

          <button type="submit" className="btn-generate">
            Generate Report
          </button>
        </form>

        {showReport && (
          <div className="report-output" ref={reportRef}>
            <h2>Expense Report</h2>
            <ul>
              <li>
                <strong>Description:</strong> {formData.description}
              </li>
              <li>
                <strong>Category:</strong> {formData.category}
              </li>
              <li>
                <strong>Paid by:</strong> {formData.paidBy}
              </li>
              <li>
                <strong>Paid to:</strong> {formData.paidTo}
              </li>
              <li>
                <strong>Amount:</strong> ₹{formData.amount}
              </li>
              <li>
                <strong>Taxes:</strong> ₹{formData.taxes}
              </li>
              <li>
                <strong>Expense Date:</strong> {formData.expenseDate}
              </li>
              <li>
                <strong>Account:</strong> {formData.account}
              </li>
              <li>
                <strong>Notes:</strong> {formData.notes}
              </li>
            </ul>
          </div>
        )}

        {showReport && (
          <div className="export-buttons">
            <button className="btn-export" onClick={exportPDF}>
              Export as PDF
            </button>
            <button className="btn-export" onClick={exportExcel}>
              Export as Excel
            </button>
          </div>
        )}
      </div>

      {/* Full-width Footer */}
      <Footer />
    </>
  );
};

export default Reports;
