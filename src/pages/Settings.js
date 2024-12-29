import React, { useState } from "react";

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  // Add more currencies as needed
];

const Settings = ({ settings, setSettings }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(settings.currency.code); // Default to the current currency
  const [categories, setCategories] = useState(settings.categories);
  const [subcategories, setSubcategories] = useState(settings.subcategories);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  const handleAddCategory = () => {
    if (category && !categories.includes(category)) {
      setCategories([...categories, category]);
      setCategory("");
    }
  };

  const handleAddSubcategory = () => {
    if (subcategory && !subcategories.includes(subcategory)) {
      setSubcategories([...subcategories, subcategory]);
      setSubcategory("");
    }
  };

  const handleSaveSettings = () => {
    const currency = currencies.find((cur) => cur.code === selectedCurrency);
    setSettings({
      currency: { code: currency.code, symbol: currency.symbol },
      categories,
      subcategories,
    });
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      {/* Currency Selection */}
      <div className="form-group">
        <label htmlFor="currency">Choose Currency:</label>
        <select
          id="currency"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
          className="dropdown">
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name} ({currency.symbol})
            </option>
          ))}
        </select>
      </div>

      {/* Categories */}
      <div className="form-group">
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category"
          className="input"
        />
        <button type="button" onClick={handleAddCategory} className="button">
          Add Category
        </button>
      </div>

      <div className="form-group">
        <label>Subcategory:</label>
        <input
          type="text"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          placeholder="Enter subcategory"
          className="input"
        />
        <button type="button" onClick={handleAddSubcategory} className="button">
          Add Subcategory
        </button>
      </div>

      {/* Display categories and subcategories */}
      <div>
        <h3>Categories:</h3>
        <ul>
          {categories.map((cat, index) => (
            <li key={index}>{cat}</li>
          ))}
        </ul>

        <h3>Subcategories:</h3>
        <ul>
          {subcategories.map((sub, index) => (
            <li key={index}>{sub}</li>
          ))}
        </ul>
      </div>

      {/* Save settings */}
      <button type="button" onClick={handleSaveSettings} className="button">
        Save Settings
      </button>
    </div>
  );
};

export default Settings;
