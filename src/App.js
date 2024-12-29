import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";
import "./variables.css";

const App = () => {
  // State to hold the settings (currency, categories, subcategories)
  const [settings, setSettings] = useState({
    currency: { code: "USD", symbol: "$" }, // default currency
    categories: [],
    subcategories: [],
  });

  return (
    <Router>
      <div className="container">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/transactions"
              element={<Transactions settings={settings} updateSettings={setSettings} />}
            />
            <Route
              path="/settings"
              element={<Settings settings={settings} setSettings={setSettings} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
