import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const TransactionModal = ({
  isOpen,
  closeModal,
  addTransaction,
  settings,
  updateSettings, // Function to persist new categories in settings
}) => {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const hardcodedCategories = [
    "Income",
    "Expenses",
    "Debt",
    "Savings",
    "Bills",
  ];
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category) {
      setError("Please select a category.");
      return;
    }

    const transaction = {
      date: date || new Date().toLocaleDateString(),
      amount: parseFloat(amount),
      category,
      subcategory,
      notes,
    };

    addTransaction(transaction);
    closeModal();
    clearForm();
  };

  const clearForm = () => {
    setDate("");
    setAmount("");
    setCategory("");
    setSubcategory("");
    setNotes("");
    setError("");
    setIsAddingCategory(false);
    setNewCategory("");
  };

  const handleAddCategory = () => {
    if (newCategory.trim() === "") {
      setError("Category name cannot be empty.");
      return;
    }

    if (
      hardcodedCategories.includes(newCategory) ||
      settings.categories.includes(newCategory)
    ) {
      setError("Category already exists.");
      return;
    }

    updateSettings((prevSettings) => ({
      ...prevSettings,
      categories: [...prevSettings.categories, newCategory],
    }));

    setCategory(newCategory);
    setIsAddingCategory(false);
    setNewCategory("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="transaction-modal"
      overlayClassName="transaction-modal-overlay">
      <h2 className="modal-title">Add New Transaction</h2>
      <form onSubmit={handleSubmit} className="modal-form">
        {error && <p className="error-message">{error}</p>}
        <div className="modal-input-row">
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>

          <label>
            Amount: ({settings.currency.symbol}):
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="0"
              step="0.01"
            />
          </label>
        </div>
        <div className="modal-input-row">
          <label>
            Category:
            {isAddingCategory ? (
              <div>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter new category"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="add-category-button">
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingCategory(false)}
                  className="cancel-add-category-button">
                  Cancel
                </button>
              </div>
            ) : (
              <select
                value={category}
                onChange={(e) => {
                  if (e.target.value === "add-new-category") {
                    setIsAddingCategory(true);
                  } else {
                    setCategory(e.target.value);
                  }
                }}
                required>
                <option value="">Select Category</option>
                {hardcodedCategories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
                {settings.categories.map((cat, index) => (
                  <option key={index + hardcodedCategories.length} value={cat}>
                    {cat}
                  </option>
                ))}
                <option value="add-new-category">+ Add New Category</option>
              </select>
            )}
          </label>

          <label>
            Subcategory:
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}>
              <option value="">Select Subcategory</option>
              {settings.subcategories.map((sub, index) => (
                <option key={index} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label>
          Notes:
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>

        <button type="submit">Add Transaction</button>
      </form>
      <button onClick={closeModal}>Close</button>
    </Modal>
  );
};

export default TransactionModal;
