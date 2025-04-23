import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { themes, THEME_NAMES, DEFAULT_THEME } from './index';

// LocalStorage key
const THEME_STORAGE_KEY = 'theme';

// Create the theme context
export const ThemeContext = createContext({
  themeName: DEFAULT_THEME,
  theme: themes[DEFAULT_THEME],
  isLight: false,
  isDark: true,
  setTheme: () => {},
  toggleTheme: () => {},
});

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Use state to store the current theme name
  const [themeName, setThemeName] = useState(DEFAULT_THEME);
  
  // Handle system preference detection and localStorage on component mount
  useEffect(() => {
    // Function to detect and set initial theme
    const setInitialTheme = () => {
      // Check if theme is stored in localStorage
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      
      if (storedTheme && Object.values(THEME_NAMES).includes(storedTheme)) {
        // If valid theme is stored, use it
        setThemeName(storedTheme);
      } else {
        // Otherwise, check system preference
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setThemeName(prefersDarkMode ? THEME_NAMES.DARK : THEME_NAMES.LIGHT);
      }
    };
    
    // Set initial theme
    setInitialTheme();
    
    // Add listener for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (event) => {
      // Only update if user hasn't set a preference
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        setThemeName(event.matches ? THEME_NAMES.DARK : THEME_NAMES.LIGHT);
      }
    };
    
    // Add event listener with browser compatibility check
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else {
      // Older browsers support
      mediaQuery.addListener(handleSystemThemeChange);
    }
    
    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      } else {
        // Older browsers support
        mediaQuery.removeListener(handleSystemThemeChange);
      }
    };
  }, []);
  
  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, themeName);
    
    // Optional: Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.content = 
        themeName === THEME_NAMES.DARK ? themes.dark.palette.background.default : themes.light.palette.background.default;
    }
  }, [themeName]);
  
  // Function to set theme by name
  const setTheme = (name) => {
    if (themes[name]) {
      setThemeName(name);
    }
  };
  
  // Function to toggle between light and dark
  const toggleTheme = () => {
    setThemeName(prevTheme => 
      prevTheme === THEME_NAMES.LIGHT ? THEME_NAMES.DARK : THEME_NAMES.LIGHT
    );
  };
  
  // Get current theme object
  const theme = themes[themeName];
  
  // Derive boolean flags for convenience
  const isLight = themeName === THEME_NAMES.LIGHT;
  const isDark = themeName === THEME_NAMES.DARK;
  
  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    themeName,
    theme,
    isLight,
    isDark,
    setTheme,
    toggleTheme,
  }), [themeName, theme, isLight, isDark]);
  
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