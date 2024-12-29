import React from "react";
import { Link } from "react-router-dom";

// Sidebar component
const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1 className="sidebar-title">Avenue</h1>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <a href="/">Dashboard</a>
        </li>
        <li className="sidebar-item">
          <a href="/transactions">Transactions</a>
        </li>
        <li className="sidebar-item">
          <a href="/settings">Settings</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
