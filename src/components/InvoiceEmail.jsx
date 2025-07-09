// src/components/InvoiceEmail.jsx
import React from "react";
import { parseInvoiceFromEmail } from "../utils/parseInvoiceFromEmail";

const InvoiceEmail = ({ setInvoiceData }) => {
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const text = await file.text();
      const data = parseInvoiceFromEmail(text);
      setInvoiceData(data);
    }
  };

  return (
    <div className="invoice-email">
      <input type="file" accept=".eml,.txt" onChange={handleFile} />
    </div>
  );
};

export default InvoiceEmail;
