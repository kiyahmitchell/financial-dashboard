import React, { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const EditTransactionModal = ({
  isOpen,
  onRequestClose,
  transaction,
  onSave,
  settings,
  updateSettings,
}) => {
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    category: "",
    subcategory: "",
    notes: "",
  });

  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (transaction) {
      setFormData({
        date: transaction.date,
        amount: transaction.amount,
        category: transaction.category,
        subcategory: transaction.subcategory,
        notes: transaction.notes,
      });
    }
  }, [transaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category) {
      setError("Please select a category.");
      return;
    }
    onSave(formData);
    onRequestClose();
  };

  const handleAddCategory = () => {
    if (newCategory.trim() === "") {
      setError("Category name cannot be empty.");
      return;
    }

    if (settings.categories.includes(newCategory)) {
      setError("Category already exists.");
      return;
    }

    updateSettings((prevSettings) => ({
      ...prevSettings,
      categories: [...prevSettings.categories, newCategory],
    }));

    setFormData((prevData) => ({
      ...prevData,
      category: newCategory,
    }));
    setIsAddingCategory(false);
    setNewCategory("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="transaction-modal"
      overlayClassName="transaction-modal-overlay">
      <h2 className="modal-title">Edit Transaction</h2>
      <form onSubmit={handleSubmit} className="modal-form">
        {error && <p className="error-message">{error}</p>}
        <div className="modal-input-row">
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Amount ({settings.currency.symbol}):
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
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
                name="category"
                value={formData.category}
                onChange={(e) => {
                  if (e.target.value === "add-new-category") {
                    setIsAddingCategory(true);
                  } else {
                    handleChange(e);
                  }
                }}
                required>
                <option value="">Select Category</option>
                {settings.categories.map((cat, index) => (
                  <option key={index} value={cat}>
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
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}>
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
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save</button>
      </form>
      <button type="button" onClick={onRequestClose}>
        Cancel
      </button>
    </Modal>
  );
};

export default EditTransactionModal;
