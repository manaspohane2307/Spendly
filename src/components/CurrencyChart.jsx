// src/components/CurrencyChart.jsx
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/CurrencyChart.css";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const CurrencyChart = ({ base = "usd", target = "inr" }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const today = new Date();
        const dates = [];

        for (let i = 6; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(d.getDate() - i);
          dates.push(d.toISOString().split("T")[0]); // yyyy-mm-dd
        }

        const rates = [];

        for (let date of dates) {
          const res = await fetch(
            `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${base}.json`
          );
          const data = await res.json();
          rates.push(data[base][target]);
        }

        setChartData({
          labels: dates,
          datasets: [
            {
              label: `Exchange Rate (${base.toUpperCase()} → ${target.toUpperCase()})`,
              data: rates,
              borderColor: "#2e7d32",
              backgroundColor: "rgba(46,125,50,0.1)",
              fill: true,
              tension: 0.4,
              pointRadius: 4,
              borderWidth: 2,
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching chart data:", err);
      }
    };

    fetchHistoricalData();
  }, [base, target]);

  if (!chartData)
    return <p style={{ textAlign: "center" }}>📈 Loading chart...</p>;

  return (
    <div className="chart-container">
      <h2 className="chart-heading">Exchange Rates Trend</h2>
      <Line data={chartData} />
    </div>
  );
};

export default CurrencyChart;
