import React, { useState } from "react";
import { extractFromFile } from "../utils/extractFromFile";

const InvoiceUploader = ({ setInvoiceData }) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      try {
        const data = await extractFromFile(file);
        setInvoiceData(data);
      } catch (err) {
        console.error("Error reading file:", err);
        alert(
          "Failed to extract data. Please upload a clear invoice image or PDF."
        );
      }
      setLoading(false);
    }
  };

  return (
    <div className="invoice-upload">
      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={handleUpload}
      />
      {loading && <p style={{ color: "#2e7d32" }}>🕐 Extracting invoice...</p>}
      <p style={{ fontSize: "0.9rem", color: "#666" }}>
        Upload an image (JPG, PNG) or PDF file
      </p>
    </div>
  );
};

export default InvoiceUploader;
