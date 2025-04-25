import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme, lightTheme } from './themes';

// LocalStorage key
const THEME_STORAGE_KEY = 'theme-preference';

// Create context
const ThemeContext = createContext({
  theme: darkTheme,
  isDark: true,
  isLight: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

// Hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Use state to store the current theme mode
  const [mode, setMode] = useState('dark');
  
  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    
    if (savedTheme) {
      // Use saved preference if available
      setMode(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
    }
  }, []);
  
  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.content = mode === 'dark' ? '#0f172a' : '#f9fafb';
    }
    
    // Add/remove data-theme attribute on document for any CSS that needs it
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);
  
  // Function to toggle between light and dark
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  
  // Function to set specific theme
  const setTheme = (newMode) => {
    if (newMode === 'light' || newMode === 'dark') {
      setMode(newMode);
    }
  };
  
  // Get current theme object
  const theme = mode === 'dark' ? darkTheme : lightTheme;
  
  // Boolean flags for convenience
  const isDark = mode === 'dark';
  const isLight = mode === 'light';
  
  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    theme,
    isDark,
    isLight,
    toggleTheme,
    setTheme,
  }), [theme, isDark, isLight]);
  
  return (
    <ThemeContext.Provider value={contextValue}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;