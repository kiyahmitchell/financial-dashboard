import React, { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";

const Settings = ({ settings, setSettings }) => {
  const { theme, toggleTheme } = useTheme();

  const themes = {
    ":root": "Default",
    "theme-dark": "Dark",
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState(
    settings.currency.code
  ); // Default to the current currency
  const [customCategories, setCustomCategories] = useState(
    settings.customCategories || []
  );
  const [subcategories, setSubcategories] = useState(settings.subcategories);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleProfileSave = () => {
    // Save profile details
    console.log("Profile saved successfully!");
    setSuccess("Profile saved successfully!");
    setTimeout(() => setSuccess(""), 3000); // Clear success message after 3 seconds
  };

  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    // Add more currencies as needed
  ];

  const fixedCategories = ["Income", "Expenses", "Bills", "Debt", "Savings"];

  const handleAddCategory = () => {
    if (!category) {
      setError("Category name cannot be empty");
      return;
    }
    if (
      fixedCategories.includes(category) ||
      customCategories.includes(category)
    ) {
      setError("Category already exists");
      return;
    }
    setCustomCategories([...customCategories, category]);
    setCategory("");
    setError("");
  };

  const handleAddSubcategory = () => {
    if (!subcategory) {
      setError("Subcategory name cannot be empty");
      return;
    }
    if (subcategories.includes(subcategory)) {
      setError("Subcategory already exists");
      return;
    }
    setSubcategories([...subcategories, subcategory]);
    setSubcategory("");
    setError("");
  };

  const handleSaveSettings = () => {
    const currency = currencies.find((cur) => cur.code === selectedCurrency);
    setSettings({
      currency: { code: currency.code, symbol: currency.symbol },
      categories: [...fixedCategories, ...customCategories],
      subcategories,
    });
    setSuccess("Settings saved successfully!");
    setTimeout(() => setSuccess(""), 3000); // Clear success message after 3 seconds
  };

  const handleReportIssue = () => {
    // Logic to report an issue
    console.log("Report an issue");
  };

  const handleSubmitFeedback = () => {
    // Logic to submit feedback
    console.log("Submit feedback");
  };

  return (
    <div className="settings-container">
      <h2 className="page-title">Settings</h2>
      <div className="card">
        <h3>Account & Profile</h3>
        <label>
          Name:{" "}
          <input
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:{" "}
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            value={password}
            placeholder="Enter your new password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="button" className="button" onClick={handleProfileSave}>
          Save Profile
        </button>
      </div>
      <div className="card">
        <h3>Display & Theme</h3>
        <div>
          <h4>Theme Options</h4>
          <p>Current Theme: {themes[theme]}</p>
          <div>
            {Object.entries(themes).map(([themeKey, themeName]) => (
              <button key={themeKey} onClick={() => toggleTheme(themeKey)}>
                {themeName}
              </button>
            ))}
          </div>
          <div>
            <h4>Dashboard Widgets</h4>
          </div>
        </div>
      </div>
      <div className="card">
        <label>
          <h3>Currency</h3>
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}>
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.name} ({currency.symbol})
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="card">
        <h3>Categories</h3>
        <table className="categories-table">
          <thead>
            <tr>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {fixedCategories.map((cat, index) => (
              <tr key={index}>
                <td>
                  {cat}{" "}
                  <i
                    className="bx bx-lock-alt"
                    title="This category cannot be changed"></i>
                </td>
              </tr>
            ))}
            {customCategories.map((cat, index) => (
              <tr key={index}>
                <td>{cat}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Add a category"
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>
      <div className="card">
        <h3>Subcategories</h3>
        <input
          type="text"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          placeholder="Add a subcategory"
        />
        <button onClick={handleAddSubcategory}>Add Subcategory</button>
        <ul>
          {subcategories.map((sub, index) => (
            <li key={index}>{sub}</li>
          ))}
        </ul>
      </div>
      <div className="card">
        <h3>Help & Support</h3>
        <div>
          <h4>Contact Support</h4>
          <ul>
            <li>
              <a href="mailto:somewherequiet@icloud.com">Email Support</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Report Issues</h4>
          <button onClick={handleReportIssue}>Report a Bug</button>
          <button onClick={handleSubmitFeedback}>Submit Feedback</button>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <button type="button" onClick={handleSaveSettings} className="button">
        Save Settings
      </button>
    </div>
  );
};

export default Settings;
