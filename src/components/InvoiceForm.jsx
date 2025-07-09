// src/components/InvoiceForm.jsx
import React, { useState } from "react";
import "../styles/Invoice.css";

const InvoiceForm = ({ setInvoiceData }) => {
  const [form, setForm] = useState({
    invoiceNo: "",
    date: "",
    company: "",
    gst: "",
    items: [{ name: "", quantity: "", price: "" }],
    taxes: "",
    total: "",
    notes: "",
  });

  const handleItemChange = (index, field, value) => {
    const newItems = [...form.items];
    newItems[index][field] = value;
    setForm({ ...form, items: newItems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInvoiceData(form);
  };

  return (
    <form onSubmit={handleSubmit} className="invoice-form">
      <label>Invoice Number</label>
      <input
        type="text"
        value={form.invoiceNo}
        onChange={(e) => setForm({ ...form, invoiceNo: e.target.value })}
        placeholder="INV-2025-001"
      />

      <label>Date</label>
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      <label>Company Name</label>
      <input
        type="text"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
        placeholder="Greenleaf Supplies Pvt. Ltd."
      />

      <label>GST Number</label>
      <input
        type="text"
        value={form.gst}
        onChange={(e) => setForm({ ...form, gst: e.target.value })}
        placeholder="27AAACG1234F1Z2"
      />

      <div className="section-title">Items</div>
      {form.items.map((item, index) => (
        <div key={index} className="item-row">
          <div style={{ flex: 2 }}>
            <label>Item Name</label>
            <input
              type="text"
              value={item.name}
              onChange={(e) => handleItemChange(index, "name", e.target.value)}
              placeholder="Garden Tool Set"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>Quantity</label>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", e.target.value)
              }
              placeholder="1"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>Price</label>
            <input
              type="number"
              value={item.price}
              onChange={(e) => handleItemChange(index, "price", e.target.value)}
              placeholder="1500"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          setForm({
            ...form,
            items: [...form.items, { name: "", quantity: "", price: "" }],
          })
        }
      >
        ➕ Add Another Item
      </button>

      <label>Taxes (₹)</label>
      <input
        type="number"
        value={form.taxes}
        onChange={(e) => setForm({ ...form, taxes: e.target.value })}
        placeholder="342"
      />

      <label>Total (₹)</label>
      <input
        type="number"
        value={form.total}
        onChange={(e) => setForm({ ...form, total: e.target.value })}
        placeholder="3982"
      />

      <label>Notes</label>
      <textarea
        rows="3"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        placeholder="Thank you for your business!"
      ></textarea>

      <button type="submit">✅ Generate Invoice</button>
    </form>
  );
};

export default InvoiceForm;
