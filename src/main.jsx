// main.jsx or index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      {" "}
      {/* ✅ Only ONE Router here */}
      <App />
    </Router>
  </React.StrictMode>
);
