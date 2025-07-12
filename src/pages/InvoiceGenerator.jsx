// src/pages/InvoiceGenerator.jsx
import React, { useState } from "react";
import InvoiceForm from "../components/InvoiceForm";
import InvoiceUploader from "../components/InvoiceUploader";
import InvoiceEmail from "../components/InvoiceEmail";
import InvoicePreview from "../components/InvoicePreview";
import Footer from "../components/Footer";
import "../styles/Invoice.css";

const InvoiceGenerator = () => {
  const [method, setMethod] = useState("manual");
  const [invoiceData, setInvoiceData] = useState(null);

  return (
    <>
      <div className="invoice-container">
        <h1 className="invoice-heading">🧾 Invoice Generator</h1>
        <p className="invoice-subtext">
          Choose your preferred input method to generate an invoice.
        </p>

        <div className="tab-selector">
          {["manual", "scan", "email"].map((tab) => (
            <button
              key={tab}
              className={method === tab ? "tab active" : "tab"}
              onClick={() => setMethod(tab)}
            >
              {tab === "manual" && "📝 Type"}
              {tab === "scan" && "📷 Scan"}
              {tab === "email" && "📩 Email"}
            </button>
          ))}
        </div>

        {method === "manual" && <InvoiceForm setInvoiceData={setInvoiceData} />}
        {method === "scan" && (
          <InvoiceUploader setInvoiceData={setInvoiceData} />
        )}
        {method === "email" && <InvoiceEmail setInvoiceData={setInvoiceData} />}

        {invoiceData && <InvoicePreview invoice={invoiceData} />}
      </div>

      <Footer />
    </>
  );
};

export default InvoiceGenerator;
