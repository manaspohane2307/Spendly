// src/utils/parseInvoiceFromEmail.js
export const parseInvoiceFromEmail = (text) => {
  return {
    invoiceNo: "EMAIL567",
    date: "2025-07-03",
    company: "Email Corp",
    gst: "GSTEML789",
    items: [{ name: "Email Service", quantity: 1, price: 2000 }],
    taxes: "360",
    total: "2360",
    notes: "Parsed from email content",
  };
};
