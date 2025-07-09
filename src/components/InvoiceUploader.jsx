// src/components/InvoiceUploader.jsx
import React from "react";
import { extractFromImage } from "../utils/extractFromImage";

const InvoiceUploader = ({ setInvoiceData }) => {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const data = await extractFromImage(file);
      setInvoiceData(data); // simulated data extraction
    }
  };

  return (
    <div className="invoice-upload">
      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={handleUpload}
      />
    </div>
  );
};

export default InvoiceUploader;
