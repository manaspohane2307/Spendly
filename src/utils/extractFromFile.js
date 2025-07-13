import Tesseract from "tesseract.js";
import { parseInvoiceFromEmail } from "./parseInvoiceFromEmail";
import * as pdfjsLib from "pdfjs-dist";

// Use PDF.js worker local path
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

export async function extractFromFile(file) {
  const fileType = file.type;

  if (fileType === "application/pdf") {
    const pdfData = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale: 2.0 }); // Increase for better resolution
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context, viewport }).promise;
    const imageDataUrl = canvas.toDataURL();

    const result = await Tesseract.recognize(imageDataUrl, "eng", {
      logger: (m) => console.log(m),
    });

    const text = result.data.text;
    return parseInvoiceFromEmail(text);
  }

  // Else, handle image files
  const result = await Tesseract.recognize(file, "eng", {
    logger: (m) => console.log(m),
  });

  const text = result.data.text;
  return parseInvoiceFromEmail(text);
}
