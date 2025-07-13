// src/utils/parseInvoiceFromEmail.js

export function parseInvoiceFromEmail(text) {
  const invoice = {
    invoiceNo: "",
    date: "",
    company: "",
    gst: "",
    items: [],
    taxes: "",
    total: "",
    notes: "",
  };

  const lines = text.split("\n");

  for (let line of lines) {
    line = line.trim();

    if (/invoice\s*(no)?[:\-]/i.test(line)) {
      invoice.invoiceNo = line.split(/[:\-]/)[1]?.trim();
    } else if (/date[:\-]/i.test(line)) {
      invoice.date = line.split(/[:\-]/)[1]?.trim();
    } else if (/company[:\-]/i.test(line)) {
      invoice.company = line.split(/[:\-]/)[1]?.trim();
    } else if (/gst\s*(number)?[:\-]/i.test(line)) {
      invoice.gst = line.split(/[:\-]/)[1]?.trim();
    } else if (/tax(es)?[:\-]/i.test(line)) {
      invoice.taxes = line.split(/[:\-]/)[1]?.trim();
    } else if (/total[:\-]/i.test(line)) {
      invoice.total = line.split(/[:\-]/)[1]?.trim();
    } else if (/note[:\-]/i.test(line)) {
      invoice.notes = line.split(/[:\-]/)[1]?.trim();
    } else {
      // Match lines like: "Item Name    2    1500"
      const match = line.match(/^(.+?)\s+(\d+)\s+(\d+(\.\d+)?)/);
      if (match) {
        invoice.items.push({
          name: match[1].trim(),
          quantity: match[2].trim(),
          price: match[3].trim(),
        });
      }
    }
  }

  return invoice;
}
