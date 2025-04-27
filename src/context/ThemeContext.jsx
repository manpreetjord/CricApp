import { createContext, useState, useEffect, useContext } from 'react';

// Create a context for theme management
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Set initial state based on localStorage or system preference
  const getInitialTheme = () => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    
    // If no saved preference, use system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };
  
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme());

  // Apply theme change to DOM and localStorage
  const applyTheme = (dark) => {
    const root = document.documentElement;
    
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      applyTheme(newMode);
      console.log("Theme toggled to:", newMode ? "dark" : "light");
      return newMode;
    });
  };

  // Apply theme on initial render
  useEffect(() => {
    applyTheme(isDarkMode);
    console.log("Initial theme applied:", isDarkMode ? "dark" : "light");
  }, []);

  // Apply theme changes when isDarkMode changes
  useEffect(() => {
    applyTheme(isDarkMode);
    console.log("Theme changed to:", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext; 