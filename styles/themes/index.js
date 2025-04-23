import lightTheme from './light';
import darkTheme from './dark';

// Export all themes for easy access
export const themes = {
  light: lightTheme,
  dark: darkTheme,
  // Add more themes here in the future (e.g., solarized, sepia)
  // solarized: solarizedTheme,
  // sepia: sepiaTheme,
};

// Export each theme individually
export { lightTheme, darkTheme };

// Export theme names for use in selectors, localStorage, etc.
export const THEME_NAMES = {
  LIGHT: 'light',
  DARK: 'dark',
  // Add more theme names here in the future
  // SOLARIZED: 'solarized',
  // SEPIA: 'sepia',
  // SYSTEM: 'system', // For future system preference implementation
};

// Default theme to use if no preference is stored and system preference can't be detected
export const DEFAULT_THEME = THEME_NAMES.DARK;