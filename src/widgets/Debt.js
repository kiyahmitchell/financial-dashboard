import React, { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  startOfWeek,
  startOfYear,
  endOfDay,
} from "date-fns";

const Debt = ({ transactions }) => {
  const [dateRange, setDateRange] = useState("month-to-date");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const now = new Date();
    let startDate;

    switch (dateRange) {
      case "year-to-date":
        startDate = startOfYear(now);
        break;
      case "week-to-date":
        startDate = startOfWeek(now);
        break;
      case "custom":
        // Handle custom date range logic here
        break;
      case "month-to-date":
      default:
        startDate = startOfMonth(now);
        break;
    }

    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transaction.category === "Debt" &&
        transactionDate >= startDate &&
        transactionDate <= endOfDay(now)
      );
    });

    setFilteredTransactions(filtered);
  }, [dateRange, transactions]);

  const totalDebt = filteredTransactions.reduce(
    (sum, transaction) => sum + parseFloat(transaction.amount),
    0
  );

  return (
    <div className="widget">
      <div className="widget-header">
        <h3>Debt</h3>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}>
          <option value="month-to-date">Month to Date</option>
          <option value="week-to-date">Week to Date</option>
          <option value="year-to-date">Year to Date</option>
        </select>
      </div>
      <p>${totalDebt.toFixed(2)}</p>
    </div>
  );
};

export default Debt;
