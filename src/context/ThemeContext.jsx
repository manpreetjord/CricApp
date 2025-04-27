import { createContext, useState, useEffect, useContext } from 'react';

// Create a context for theme management
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Check if user has previously set a preference in localStorage
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Initialize theme state (dark if stored as 'dark' or if no preference and system is dark)
  const [isDarkMode, setIsDarkMode] = useState(
    storedTheme ? storedTheme === 'dark' : prefersDark
  );

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Update document class and localStorage when theme changes
  useEffect(() => {
    const rootElement = window.document.documentElement;
    
    if (isDarkMode) {
      rootElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      rootElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only change theme if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        setIsDarkMode(e.matches);
      }
    };

    // Add listener for system theme changes
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Provide theme state and toggle function to children
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext; 