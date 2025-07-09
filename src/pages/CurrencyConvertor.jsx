// src/pages/CurrencyConverter.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Currency.css";

const CURRENCY_FLAGS = {
  USD: "🇺🇸",
  INR: "🇮🇳",
  EUR: "🇪🇺",
  GBP: "🇬🇧",
  JPY: "🇯🇵",
  AUD: "🇦🇺",
  CAD: "🇨🇦",
  CNY: "🇨🇳",
};

const CurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [converted, setConverted] = useState(null);

  // Fetch rates when component mounts
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await axios.get(
          "https://api.exchangerate.host/latest?base=INR"
        );

        setRates(res.data.rates);
        setCurrencies(Object.keys(res.data.rates));
      } catch (error) {
        alert("Failed to fetch exchange rates.");
      }
    };
    fetchRates();
  }, []);

  const convert = () => {
    if (!rates[fromCurrency] || !rates[toCurrency]) return;
    const inINR = amount / rates[fromCurrency]; // Convert to INR
    const result = inINR * rates[toCurrency]; // Convert to target
    setConverted(result.toFixed(2));
  };

  return (
    <div className="currency-container">
      <h1 className="currency-heading">💱 Currency Converter</h1>

      <div className="currency-form">
        <div className="field">
          <label>From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencies.map((cur) => (
              <option key={cur} value={cur}>
                {CURRENCY_FLAGS[cur] || "🌐"} {cur}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies.map((cur) => (
              <option key={cur} value={cur}>
                {CURRENCY_FLAGS[cur] || "🌐"} {cur}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        <button className="convert-btn" onClick={convert}>
          🔁 Convert
        </button>

        {converted && (
          <div className="result">
            {CURRENCY_FLAGS[fromCurrency]} {amount} {fromCurrency} = <br />
            <strong>
              {CURRENCY_FLAGS[toCurrency]} {converted} {toCurrency}
            </strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
