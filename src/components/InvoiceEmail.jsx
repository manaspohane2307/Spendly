// src/components/InvoiceEmail.jsx
import React, { useState } from "react";
import { parseInvoiceFromEmail } from "../utils/parseInvoiceFromEmail";

const InvoiceEmail = ({ setInvoiceData }) => {
  const [loading, setLoading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const text = await file.text();
      const data = parseInvoiceFromEmail(text);
      setInvoiceData(data);
      setLoading(false);
    }
  };

  return (
    <div className="invoice-email">
      <input type="file" accept=".eml,.txt" onChange={handleFile} />
      {loading && <p style={{ color: "#2e7d32" }}>📩 Parsing email...</p>}
    </div>
  );
};

export default InvoiceEmail;
