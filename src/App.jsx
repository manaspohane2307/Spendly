import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Navbar from "./components/Navbar";
import Expenses from "./pages/Expenses";
import Reports from "./pages/Reports";
import InvoiceGenerator from "./pages/InvoiceGenerator"; 
import CurrencyConverter from "./pages/CurrencyConvertor";
import Trips from "./pages/Trips";
import Advances from "./pages/Advances";

const AppContent = () => {
  const location = useLocation();

  // Define paths where Navbar should be hidden
  const hideNavbarPaths = ["/login", "/signup"];
  const hideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar isLoggedIn={true} username="Manas" />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/invoice" element={<InvoiceGenerator />} />{" "}
        <Route path="/currency" element={<CurrencyConverter />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/advances" element={<Advances />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
      <AppContent />
  );
};

export default App;
