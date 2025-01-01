// ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("");

  const toggleTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    document.documentElement.className = selectedTheme; // Apply theme to root
    localStorage.setItem("app-theme", selectedTheme || ""); // Save to localStorage
  };

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("app-theme") || "";
    setTheme(storedTheme);
    document.documentElement.className = storedTheme;
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeContext;
