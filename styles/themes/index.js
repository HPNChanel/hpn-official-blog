import lightTheme from './light';
import darkTheme from './dark';
import { COLORS, TYPOGRAPHY, TRANSITIONS, SHADOWS, BORDER_RADIUS } from './theme.constants';

// Export all themes for easy access
export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

// Export each theme individually
export { lightTheme, darkTheme };

// Export theme constants for direct usage
export { COLORS, TYPOGRAPHY, TRANSITIONS, SHADOWS, BORDER_RADIUS };

// Export theme names for use in selectors, localStorage, etc.
export const THEME_NAMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

// Default theme to use if no preference is stored and system preference can't be detected
export const DEFAULT_THEME = THEME_NAMES.SYSTEM;

// Helper to determine if the text contains Vietnamese characters
export const containsVietnamese = (text) => {
  if (!text) return false;
  // Vietnamese specific characters regex
  const vietnameseRegex = /[àáâãèéêìíòóôõùúýăđĩũơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/i;
  return vietnameseRegex.test(text);
};

// Export Vietnamese text utility
export const vietnameseTextHelper = {
  isVietnamese: containsVietnamese,
  getLineHeight: (isHeading = false) => (
    isHeading 
      ? TYPOGRAPHY.lineHeight.vietnamese.heading 
      : TYPOGRAPHY.lineHeight.vietnamese.normal
  ),
  getLetterSpacing: () => TYPOGRAPHY.letterSpacing.vietnamese,
};

export default { lightTheme, darkTheme, THEME_NAMES, DEFAULT_THEME, vietnameseTextHelper };