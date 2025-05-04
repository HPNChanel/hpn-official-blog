/**
 * Typography utilities for optimal Vietnamese text rendering
 */

/**
 * Detects if a string contains Vietnamese characters
 * @param {string} text - The text to check
 * @return {boolean} True if Vietnamese characters are present
 */
export const containsVietnamese = (text) => {
  if (!text) return false;
  
  // Vietnamese specific characters regex pattern
  const vietnameseRegex = /[àáâãèéêìíòóôõùúýăđĩũơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/i;
  
  return vietnameseRegex.test(text);
};

/**
 * Returns optimized typography styles for Vietnamese text
 * @param {object} options - Configuration options
 * @return {object} Typography styles object
 */
export const getVietnameseTypography = ({
  isHeading = false,
  fontSize = 16,
  fontWeight = 400,
  component = 'p',
} = {}) => {
  // Base styles
  const styles = {
    fontFamily: '"Be Vietnam Pro", system-ui, -apple-system, sans-serif',
    fontFeatureSettings: '"calt", "liga", "dlig", "cv01"',
  };
  
  // Different settings for headings vs body text
  if (isHeading) {
    return {
      ...styles,
      lineHeight: 1.4,
      letterSpacing: '-0.015em', // Slightly tighter for headings with diacritics
      fontWeight: fontWeight || (component === 'h1' ? 700 : component === 'h2' ? 700 : 600),
      hyphens: 'auto',
      overflowWrap: 'break-word',
    };
  } else {
    return {
      ...styles,
      lineHeight: 1.8, // More generous for body text with diacritics
      letterSpacing: '-0.01em', // Slightly tighter to accommodate diacritical marks
      hyphens: 'auto',
      wordBreak: 'normal',
      overflowWrap: 'break-word',
    };
  }
};

/**
 * Enhanced Vietnamese text responsive scale factors
 * Optimized for diacritical marks at various breakpoints
 */
export const VIETNAMESE_SCALE = {
  xs: {
    // Mobile scale (0-480px)
    h1: '1.875rem',  // 30px - smaller for mobile
    h2: '1.625rem',  // 26px
    h3: '1.375rem',  // 22px
    h4: '1.25rem',   // 20px
    h5: '1.125rem',  // 18px
    h6: '1rem',      // 16px
    body1: '0.9375rem', // 15px
    body2: '0.875rem',  // 14px
  },
  sm: {
    // Small tablets (480-768px)
    h1: '2.25rem',   // 36px
    h2: '1.875rem',  // 30px
    h3: '1.625rem',  // 26px
    h4: '1.375rem',  // 22px
    h5: '1.25rem',   // 20px
    h6: '1.125rem',  // 18px
    body1: '1rem',      // 16px
    body2: '0.9375rem', // 15px
  },
  md: {
    // Tablets & small laptops (768-1024px)
    h1: '2.5rem',    // 40px
    h2: '2.125rem',  // 34px
    h3: '1.75rem',   // 28px
    h4: '1.5rem',    // 24px
    h5: '1.25rem',   // 20px
    h6: '1.125rem',  // 18px
    body1: '1rem',      // 16px
    body2: '0.9375rem', // 15px
  },
  lg: {
    // Laptops & desktops (1024-1440px)
    h1: '2.75rem',   // 44px
    h2: '2.25rem',   // 36px
    h3: '1.875rem',  // 30px
    h4: '1.625rem',  // 26px
    h5: '1.375rem',  // 22px
    h6: '1.25rem',   // 20px
    body1: '1.0625rem', // 17px
    body2: '1rem',      // 16px
  },
  xl: {
    // Large desktops (1440px+)
    h1: '3rem',      // 48px
    h2: '2.5rem',    // 40px
    h3: '2rem',      // 32px
    h4: '1.75rem',   // 28px
    h5: '1.5rem',    // 24px
    h6: '1.25rem',   // 20px
    body1: '1.125rem',  // 18px
    body2: '1rem',      // 16px
  }
};

/**
 * Enhanced line heights for Vietnamese text at different breakpoints
 * Vietnamese requires more line height for diacritical marks
 */
export const LINE_HEIGHTS = {
  xs: {
    heading: 1.3,   // Tighter for mobile
    body: 1.6       // More space for body text
  },
  sm: {
    heading: 1.35,
    body: 1.65
  },
  md: {
    heading: 1.4,
    body: 1.7
  },
  lg: {
    heading: 1.4,
    body: 1.8
  },
  xl: {
    heading: 1.4,
    body: 1.8
  }
};

/**
 * Enhanced responsive typography for Vietnamese content
 * @param {string} variant - Typography variant (h1, body1, etc)
 * @param {object} theme - Material UI theme
 * @return {object} Responsive typography styles
 */
export const getResponsiveTypography = (variant, theme) => {
  return {
    // Mobile first approach - start with smallest size
    fontSize: VIETNAMESE_SCALE.xs[variant] || '1rem',
    lineHeight: variant.startsWith('h') ? LINE_HEIGHTS.xs.heading : LINE_HEIGHTS.xs.body,
    
    // Add responsive sizes for larger breakpoints
    [theme.breakpoints.up('sm')]: {
      fontSize: VIETNAMESE_SCALE.sm[variant] || VIETNAMESE_SCALE.xs[variant],
      lineHeight: variant.startsWith('h') ? LINE_HEIGHTS.sm.heading : LINE_HEIGHTS.sm.body,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: VIETNAMESE_SCALE.md[variant] || VIETNAMESE_SCALE.sm[variant],
      lineHeight: variant.startsWith('h') ? LINE_HEIGHTS.md.heading : LINE_HEIGHTS.md.body,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: VIETNAMESE_SCALE.lg[variant] || VIETNAMESE_SCALE.md[variant],
      lineHeight: variant.startsWith('h') ? LINE_HEIGHTS.lg.heading : LINE_HEIGHTS.lg.body,
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: VIETNAMESE_SCALE.xl[variant] || VIETNAMESE_SCALE.lg[variant],
      lineHeight: variant.startsWith('h') ? LINE_HEIGHTS.xl.heading : LINE_HEIGHTS.xl.body,
    },
    
    // Extra optimization for Vietnamese diacritical marks
    letterSpacing: variant.startsWith('h') ? '-0.01em' : '0',
    wordBreak: 'normal',
    overflowWrap: 'break-word',
  };
};

// Replace getResponsiveSize with the enhanced getResponsiveTypography
export const getResponsiveSize = getResponsiveTypography;

/**
 * Vertical rhythm helper functions
 */
export const verticalRhythm = {
  // Base unit in pixels (using 1rem = 16px)
  baseUnit: 8,
  
  // Convert rhythm units to rem
  units: (units) => `${(units * 8) / 16}rem`,
  
  // Get spacing for Vietnamese text that harmonizes with lineheight
  spacing: (units) => `${(units * 8) / 16}rem`,
  
  // Get margin bottom that creates proper vertical rhythm
  mb: (units) => ({
    marginBottom: `${(units * 8) / 16}rem`,
  }),
  
  // Get margin top that creates proper vertical rhythm
  mt: (units) => ({
    marginTop: `${(units * 8) / 16}rem`,
  }),
  
  // Get padding that creates proper vertical rhythm
  padding: (top, right, bottom, left) => ({
    padding: `${(top * 8) / 16}rem ${(right * 8) / 16}rem ${(bottom * 8) / 16}rem ${(left * 8) / 16}rem`,
  }),
};
