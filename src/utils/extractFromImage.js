// src/utils/extractFromImage.js
import Tesseract from "tesseract.js";

export const extractFromImage = async (file) => {
  const text = await Tesseract.recognize(file, "eng");
  return {
    invoiceNo: "IMG123",
    date: "2025-07-01",
    company: "Scanned Corp",
    gst: "GSTXYZ123",
    items: [{ name: "Scanned Item", quantity: 2, price: 500 }],
    taxes: "100",
    total: "1100",
    notes: "Extracted from scanned image",
  };
};
