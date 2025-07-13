// src/pages/CurrencyConvertor.jsx
import React, { useState } from "react";
import CurrencyChart from "../components/CurrencyChart";
import "../styles/CurrencyConvertor.css";

const currencyOptions = [
  { code: "usd", name: "United States Dollar", flag: "🇺🇸" },
  { code: "inr", name: "Indian Rupee", flag: "🇮🇳" },
  { code: "eur", name: "Euro", flag: "🇪🇺" },
  { code: "gbp", name: "British Pound", flag: "🇬🇧" },
  { code: "jpy", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "cad", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "aud", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "cny", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "chf", name: "Swiss Franc", flag: "🇨🇭" },
  { code: "sek", name: "Swedish Krona", flag: "🇸🇪" },
  { code: "nzd", name: "New Zealand Dollar", flag: "🇳🇿" },
  { code: "sgd", name: "Singapore Dollar", flag: "🇸🇬" },
  { code: "hkd", name: "Hong Kong Dollar", flag: "🇭🇰" },
  { code: "zar", name: "South African Rand", flag: "🇿🇦" },
  { code: "brl", name: "Brazilian Real", flag: "🇧🇷" },
  { code: "rub", name: "Russian Ruble", flag: "🇷🇺" },
  { code: "mxn", name: "Mexican Peso", flag: "🇲🇽" },
  { code: "krw", name: "South Korean Won", flag: "🇰🇷" },
  { code: "try", name: "Turkish Lira", flag: "🇹🇷" },
  { code: "dkk", name: "Danish Krone", flag: "🇩🇰" },
  { code: "nok", name: "Norwegian Krone", flag: "🇳🇴" },
  { code: "thb", name: "Thai Baht", flag: "🇹🇭" },
  { code: "pln", name: "Polish Zloty", flag: "🇵🇱" },
  { code: "idr", name: "Indonesian Rupiah", flag: "🇮🇩" },
  { code: "php", name: "Philippine Peso", flag: "🇵🇭" },
  { code: "myr", name: "Malaysian Ringgit", flag: "🇲🇾" },
  { code: "aed", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "egp", name: "Egyptian Pound", flag: "🇪🇬" },
  { code: "bdt", name: "Bangladeshi Taka", flag: "🇧🇩" },
  { code: "lkr", name: "Sri Lankan Rupee", flag: "🇱🇰" },
];

const CurrencyConvertor = () => {
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("inr");
  const [amount, setAmount] = useState(1);
  const [converted, setConverted] = useState(null);
  const [loading, setLoading] = useState(false);

  const convertCurrency = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`
      );
      const data = await res.json();
      const rate = data[fromCurrency][toCurrency];
      setConverted((amount * rate).toFixed(2));
    } catch (err) {
      console.error("Error fetching exchange rate:", err);
      setConverted("Conversion failed");
    }
    setLoading(false);
  };

  return (
    <div className="converter-container">
      <h1 className="converter-heading">💱 Currency Convertor</h1>
      <p className="converter-subtext">
        Convert between 30 major currencies with live exchange rates.
      </p>

      <div className="converter-form">
        <label>
          Amount
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>

        <label>
          From Currency
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencyOptions.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.flag} {currency.name} ({currency.code.toUpperCase()})
              </option>
            ))}
          </select>
        </label>

        <label>
          To Currency
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencyOptions.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.flag} {currency.name} ({currency.code.toUpperCase()})
              </option>
            ))}
          </select>
        </label>

        <button className="btn-generate" onClick={convertCurrency}>
          Convert
        </button>
      </div>

      {converted && (
        <>
          <div className="converted-output">
            {loading ? (
              <p className="loading-text">Converting...</p>
            ) : (
              <p>
                {amount} {fromCurrency.toUpperCase()} ={" "}
                <strong>
                  {converted} {toCurrency.toUpperCase()}
                </strong>
              </p>
            )}
          </div>

          <CurrencyChart base={fromCurrency} target={toCurrency} />
        </>
      )}
    </div>
  );
};

export default CurrencyConvertor;
