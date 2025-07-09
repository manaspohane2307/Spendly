// src/components/InvoicePreview.jsx
import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import "../styles/Invoice.css";

const InvoicePreview = ({ invoice }) => {
  const ref = useRef();

  const downloadPDF = async () => {
    const canvas = await html2canvas(ref.current);
    const pdf = new jsPDF();
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 10, 10);
    pdf.save(`${invoice.invoiceNo || "invoice"}.pdf`);
  };

  const downloadExcel = () => {
    const sheet = XLSX.utils.json_to_sheet(invoice.items);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "Invoice");
    XLSX.writeFile(wb, `${invoice.invoiceNo || "invoice"}.xlsx`);
  };

  return (
    <div className="invoice-preview" ref={ref}>
      <h2 className="section-title">Invoice Preview</h2>

      <p>
        <strong>Invoice No:</strong> {invoice.invoiceNo}
      </p>
      <p>
        <strong>Date:</strong> {invoice.date}
      </p>
      <p>
        <strong>Company:</strong> {invoice.company}
      </p>
      <p>
        <strong>GST No:</strong> {invoice.gst}
      </p>

      <div style={{ marginTop: "1rem" }}>
        <h4 style={{ color: "#2e7d32", marginBottom: "0.5rem" }}>Items</h4>
        <div
          style={{
            display: "flex",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          <div style={{ flex: 2 }}>Item Name</div>
          <div style={{ flex: 1 }}>Quantity</div>
          <div style={{ flex: 1 }}>Price</div>
        </div>
        {invoice.items.map((item, idx) => (
          <div key={idx} style={{ display: "flex", marginBottom: "0.25rem" }}>
            <div style={{ flex: 2 }}>{item.name}</div>
            <div style={{ flex: 1 }}>{item.quantity}</div>
            <div style={{ flex: 1 }}>₹{item.price}</div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: "1rem" }}>
        <strong>Taxes:</strong> ₹{invoice.taxes}
      </p>
      <p>
        <strong>Total:</strong> ₹{invoice.total}
      </p>
      <p>
        <strong>Notes:</strong> {invoice.notes}
      </p>

      <div className="export-buttons">
        <button onClick={downloadPDF}>📄 Export PDF</button>
        <button onClick={downloadExcel}>📊 Export Excel</button>
      </div>
    </div>
  );
};

export default InvoicePreview;
