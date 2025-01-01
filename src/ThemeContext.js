// ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(":root");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || ":root";
    setTheme(savedTheme);
  }, []);

  const toggleTheme = (themeKey) => {
    setTheme(themeKey);
    localStorage.setItem("theme", themeKey);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
