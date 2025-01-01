import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";
import "./variables.css";
import "boxicons/css/boxicons.min.css";
import { ThemeProvider } from "./ThemeContext";

const App = () => {
  const [settings, setSettings] = useState({
    currency: { code: "USD", symbol: "$" },
    categories: [],
    subcategories: [],
  });

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <ThemeProvider>
      <Router>
        <div className="app-container">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route
                path="/"
                element={<Dashboard transactions={transactions} />}
              />
              <Route
                path="/transactions"
                element={
                  <Transactions
                    settings={settings}
                    updateSettings={setSettings}
                    transactions={transactions} // Pass transactions to Transactions component
                    setTransactions={setTransactions} // Pass setTransactions to update transactions
                  />
                }
              />
              <Route
                path="/settings"
                element={
                  <Settings settings={settings} setSettings={setSettings} />
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
