import React, { useState } from "react";
import TransactionModal from "../components/TransactionModal";

const Transactions = ({ settings, updateSettings }) => {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
    closeModal();
  };

  return (
    <div className="transactions-container">
      <h2 className="transactions-heading">Transactions</h2>
      <button className="add-button" onClick={openModal}>
        Add Transaction
      </button>

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
        <h3 className="log-heading">Transaction Log</h3>
        {transactions.length > 0 ? (
          <table className="transaction-table">
            <thead>
              <tr className="table-header-row">
                <th className="table-header">Date</th>
                <th className="table-header">Amount</th>
                <th className="table-header">Category</th>
                <th className="table-header">Subcategory</th>
                <th className="table-header">Notes</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}>
                  <td className="table-cell">{transaction.date}</td>
                  <td className="table-cell">
                    {transaction.amount} {settings.currency.symbol}
                  </td>
                  <td className="table-cell">{transaction.category}</td>
                  <td className="table-cell">{transaction.subcategory}</td>
                  <td className="table-cell">{transaction.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-transactions">No transactions recorded.</p>
        )}
      </div>
    </div>
  );
};

export default Transactions;
