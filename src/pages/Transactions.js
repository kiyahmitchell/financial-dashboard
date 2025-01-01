import React, { useState, useRef, useEffect } from "react";
import TransactionModal from "../components/TransactionModal";
import Papa from "papaparse";

const Transactions = ({
  settings,
  updateSettings,
  transactions,
  setTransactions,
}) => {
  const [localTransactions, setLocalTransactions] = useState(transactions);
  const fileInputRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "ascending",
  });

  useEffect(() => {
    setLocalTransactions(transactions);
  }, [transactions]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addTransaction = (transaction) => {
    const updatedTransactions = [...localTransactions, transaction];
    setLocalTransactions(updatedTransactions);
    setTransactions(updatedTransactions); // Update transactions in App.js
  };

  const formatDate = (dateString) => {
    const options = { year: "2-digit", month: "short", day: "2-digit" };
    return new Date(dateString)
      .toLocaleDateString("en-GB", options)
      .replace(/ /g, "-");
  };

  const handleFileLoad = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true, // Set header to true to handle CSV files with headers
      complete: (result) => {
        const parsedTransactions = result.data.map((row) => {
          // Ensure the amount is positive for income transactions
          if (row.category === "Income" && row.amount < 0) {
            row.amount = Math.abs(row.amount);
          }
          return row;
        });
        const updatedTransactions = [
          ...localTransactions,
          ...parsedTransactions,
        ];
        setLocalTransactions(updatedTransactions);
        setTransactions(updatedTransactions); // Update transactions in App.js
      },
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedTransactions = [...localTransactions].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="transactions-container">
      <h2 className="page-title">Transactions</h2>
      <button className="add-button" onClick={openModal}>
        Add Transaction
      </button>

      {/* CSV Upload */}
      <button className="add-button" onClick={handleUploadClick}>
        Upload CSV
      </button>
      <input
        id="csv-upload"
        type="file"
        accept=".csv"
        onChange={handleFileLoad}
        className="csv-upload-input"
        ref={fileInputRef}
      />

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        addTransaction={addTransaction}
        settings={settings}
        updateSettings={updateSettings}
      />

      {/* Transaction Log */}
      <div className="transaction-log">
        {sortedTransactions.length > 0 ? (
          <table className="transaction-table">
            <thead>
              <tr className="table-header-row">
                <th
                  className="table-header date-column"
                  onClick={() => handleSort("date")}>
                  Date
                </th>
                <th
                  className="table-header"
                  onClick={() => handleSort("amount")}>
                  Amount
                </th>
                <th
                  className="table-header"
                  onClick={() => handleSort("category")}>
                  Category
                </th>
                <th
                  className="table-header"
                  onClick={() => handleSort("subcategory")}>
                  Subcategory
                </th>
                <th
                  className="table-header"
                  onClick={() => handleSort("notes")}>
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="table-cell">{formatDate(transaction.date)}</td>
                  <td className="table-cell">
                    {settings.currency.symbol}
                    {transaction.amount}
                  </td>
                  <td className="table-cell">{transaction.category}</td>
                  <td className="table-cell">{transaction.subcategory}</td>
                  <td className="table-cell">{transaction.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
};

export default Transactions;
