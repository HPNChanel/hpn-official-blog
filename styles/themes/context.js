// styles/themes/context.js
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from './themes';
import { motion, AnimatePresence } from 'framer-motion';

// LocalStorage key
const THEME_STORAGE_KEY = 'theme-preference';
const THEME_MODE_DARK = 'dark';
const THEME_MODE_LIGHT = 'light';
const THEME_MODE_SYSTEM = 'system';

// Create context
const ThemeContext = createContext({
  theme: darkTheme,
  isDark: true,
  isLight: false,
  themeMode: THEME_MODE_DARK, // 'dark', 'light', or 'system'
  toggleTheme: () => {},
  setTheme: () => {},
  setThemeMode: () => {}, // Function to set theme mode explicitly
});

// Hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Detection of system preference for dark mode
export const useSystemPrefersDark = () => {
  const [prefersDark, setPrefersDark] = useState(false);

  useEffect(() => {
    // Get initial system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setPrefersDark(mediaQuery.matches);

    // Listen for changes in system preference
    const handleChange = (e) => {
      setPrefersDark(e.matches);
    };

    // Add listener using standard or legacy method
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Legacy approach for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Legacy approach for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return prefersDark;
};

// Custom transition component for theme switching
const ThemeTransition = ({ children, mode }) => {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={mode}
        initial={{ opacity: 0.85 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.85 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        style={{ 
          height: '100%', 
          willChange: 'opacity',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Use state to store the current theme mode ('dark', 'light', 'system')
  const [themeMode, setThemeMode] = useState(THEME_MODE_DARK);
  
  // State to track if initial theme has been set
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Use our custom hook to detect system preference
  const systemPrefersDark = useSystemPrefersDark();
  
  // Determine effective theme based on themeMode and system preference
  const [effectiveTheme, setEffectiveTheme] = useState(THEME_MODE_DARK);
  
  // Function to get effective theme (dark or light) based on mode and system preference
  const getEffectiveTheme = useCallback((mode, prefersDark) => {
    if (mode === THEME_MODE_SYSTEM) {
      return prefersDark ? THEME_MODE_DARK : THEME_MODE_LIGHT;
    }
    return mode;
  }, []);
  
  // Initialize theme on mount and handle system preference changes
  useEffect(() => {
    const initializeTheme = () => {
      // First, try to get saved preference from localStorage
      const savedThemeMode = localStorage.getItem(THEME_STORAGE_KEY);
      
      // Set theme mode based on saved preference or default to 'system'
      const initialMode = savedThemeMode || THEME_MODE_SYSTEM;
      setThemeMode(initialMode);
      
      // Calculate and set the effective theme
      const effective = getEffectiveTheme(initialMode, systemPrefersDark);
      setEffectiveTheme(effective);
      
      // Prevent flash of wrong theme by immediately setting theme attribute
      document.documentElement.setAttribute('data-theme', effective);
      
      // Add a meta tag for theme-color (for mobile browsers)
      let metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        document.head.appendChild(metaThemeColor);
      }
      
      // Set appropriate color based on effective theme
      metaThemeColor.content = effective === THEME_MODE_DARK ? '#0f172a' : '#f9fafb';
      
      // Mark initialization as complete
      setIsInitialized(true);
    };

    initializeTheme();
  }, [systemPrefersDark, getEffectiveTheme]);
  
  // Update effective theme when themeMode or system preference changes
  useEffect(() => {
    if (!isInitialized) return;
    
    const newEffectiveTheme = getEffectiveTheme(themeMode, systemPrefersDark);
    setEffectiveTheme(newEffectiveTheme);
    
  }, [themeMode, systemPrefersDark, isInitialized, getEffectiveTheme]);
  
  // Update DOM and localStorage when effective theme changes
  useEffect(() => {
    if (!isInitialized) return;
    
    // Save theme mode preference
    localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.content = effectiveTheme === THEME_MODE_DARK ? '#0f172a' : '#f9fafb';
    }
    
    // Add/remove data-theme attribute for CSS
    document.documentElement.setAttribute('data-theme', effectiveTheme);
    
    // Add class temporarily for smooth transitions
    document.body.classList.add('theme-transition');
    
    // Remove transition class after transition completes
    const timer = setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 500);
    
    // Cleanup timer on unmount or theme change
    return () => clearTimeout(timer);
  }, [effectiveTheme, themeMode, isInitialized]);
  
  // Function to toggle between light and dark (ignores system)
  const toggleTheme = useCallback(() => {
    setThemeMode(prev => {
      // If system, default to dark then toggle
      if (prev === THEME_MODE_SYSTEM) {
        return THEME_MODE_LIGHT;
      }
      // Otherwise toggle between dark and light
      return prev === THEME_MODE_DARK ? THEME_MODE_LIGHT : THEME_MODE_DARK;
    });
  }, []);
  
  // Function to set specific theme
  const setTheme = useCallback((newMode) => {
    if ([THEME_MODE_LIGHT, THEME_MODE_DARK, THEME_MODE_SYSTEM].includes(newMode)) {
      setThemeMode(newMode);
    }
  }, []);
  
  // Get current theme object based on effective theme
  const theme = effectiveTheme === THEME_MODE_DARK ? darkTheme : lightTheme;
  
  // Boolean flags for convenience
  const isDark = effectiveTheme === THEME_MODE_DARK;
  const isLight = effectiveTheme === THEME_MODE_LIGHT;
  
  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    theme,
    isDark,
    isLight,
    themeMode,
    toggleTheme,
    setTheme,
    setThemeMode,
    isSystemPreference: themeMode === THEME_MODE_SYSTEM,
    systemPrefersDark,
  }), [theme, isDark, isLight, themeMode, toggleTheme, setTheme, systemPrefersDark]);
  
  // Don't render until theme is initialized to prevent flashing
  if (!isInitialized) {
    // Minimal theme provider to prevent layout shift during initialization
    return (
      <MUIThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div style={{ visibility: 'hidden' }}>{children}</div>
      </MUIThemeProvider>
    );
  }
  
  return (
    <ThemeContext.Provider value={contextValue}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <ThemeTransition mode={effectiveTheme}>
          {children}
        </ThemeTransition>
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;