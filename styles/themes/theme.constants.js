// styles/themes/theme.constants.js
// Theme constants for consistent design across the app

export const COLORS = {
  // Primary palette
  primary: {
    main: '#8a85ff', // Main purple
    light: '#a78bfa',
    dark: '#6c5ce7',
  },
  
  // Secondary palette
  secondary: {
    main: '#60a5fa', // Blue
    light: '#93c5fd',
    dark: '#2563eb',
  },
  
  // Accent colors
  accent: {
    purple: '#9333ea',
    blue: '#3b82f6',
    green: '#10b981',
    teal: '#14b8a6',
    yellow: '#f59e0b',
    red: '#ef4444',
  },
  
  // Background colors
  background: {
    default: {
      dark: '#0f172a', // Slate 900
      light: '#f9fafb', // Gray 50
    },
    paper: {
      dark: '#1e293b',   // Slate 800
      light: '#ffffff',   // White
    },
    elevated: {
      dark: 'rgba(30, 41, 59, 0.8)', // For cards, modals in dark mode
      light: 'rgba(255, 255, 255, 0.8)', // For cards, modals in light mode
    },
    subtle: {
      dark: 'rgba(15, 23, 42, 0.3)', // For slight emphasis in dark mode
      light: 'rgba(241, 245, 249, 0.5)', // For slight emphasis in light mode
    },
  },
  
  // Text colors - adjusted for Vietnamese diacritical marks visibility
  text: {
    primary: {
      dark: '#f8fafc', // Slate 50 - Brighter for dark mode
      light: '#111827', // Gray 900 - Darker for light mode
    },
    secondary: {
      dark: '#e2e8f0', // Slate 200 - Bright enough for diacritics
      light: '#4b5563', // Gray 600 - Dark enough for diacritics
    },
    disabled: {
      dark: '#94a3b8', // Slate 400
      light: '#9ca3af', // Gray 400
    },
    hint: {
      dark: '#cbd5e1', // Slate 300
      light: '#6b7280', // Gray 500
    },
  },
  
  // UI element colors
  ui: {
    divider: {
      dark: 'rgba(255, 255, 255, 0.08)',
      light: 'rgba(0, 0, 0, 0.08)',
    },
    outline: {
      dark: 'rgba(255, 255, 255, 0.12)',
      light: 'rgba(0, 0, 0, 0.12)',
    },
    focus: {
      dark: 'rgba(167, 139, 250, 0.5)',
      light: 'rgba(99, 102, 241, 0.5)',
    },
    hover: {
      dark: 'rgba(167, 139, 250, 0.1)',
      light: 'rgba(99, 102, 241, 0.1)',
    },
  },
  
  // Gradient definitions
  gradients: {
    primary: {
      dark: 'linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)',
      light: 'linear-gradient(90deg, #6366f1 0%, #0ea5e9 100%)',
    },
    purple: {
      dark: 'linear-gradient(135deg, #8a85ff 0%, #a855f7 100%)',
      light: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    },
    blue: {
      dark: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
      light: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
    },
    green: {
      dark: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
      light: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    },
  },
  
  // States
  states: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  // Vietnamese-specific - for elements that need special attention with diacritical marks
  vietnamese: {
    heading: {
      dark: '#f8fafc', // Extra bright for headings with diacritics in dark mode
      light: '#111827', // Extra dark for headings with diacritics in light mode
    },
    text: {
      dark: '#f8fafc', // For paragraphs with Vietnamese text in dark mode
      light: '#1f2937', // For paragraphs with Vietnamese text in light mode
    },
    highlight: {
      dark: 'rgba(167, 139, 250, 0.2)',
      light: 'rgba(99, 102, 241, 0.1)',
    }
  }
};

// Enhanced breakpoints for Vietnamese content
export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
  // Additional granular breakpoints
  mobile: 480,    // Small mobile
  tablet: 768,    // Medium tablets
  laptop: 1024,   // Small laptops
  desktop: 1440,  // Larger desktops
};

// Container widths optimized for Vietnamese content readability
export const CONTAINER_WIDTHS = {
  xs: '100%',
  sm: '540px',    // Adjusted for Vietnamese text
  md: '720px',    // Better width for Vietnamese content
  lg: '960px',    // Optimal width for Vietnamese reading
  xl: '1200px',   // Maximum width for larger screens
};

// Shadow styles
export const SHADOWS = {
  sm: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.2)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -4px rgba(0, 0, 0, 0.2)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
  highlight: '0 0 15px rgba(167, 139, 250, 0.3)',
  card: '0 4px 20px rgba(0, 0, 0, 0.25)',
  button: '0 4px 10px rgba(167, 139, 250, 0.3)',
  // Light mode specific shadows
  light: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.12)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    highlight: '0 0 15px rgba(99, 102, 241, 0.2)',
    card: '0 4px 20px rgba(0, 0, 0, 0.1)',
    button: '0 4px 10px rgba(99, 102, 241, 0.2)',
  }
};

// Border radius values
export const BORDER_RADIUS = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  rounded: '9999px',
};

// Spacing unit for the theme
export const SPACING_UNIT = 8;

// Typography settings - optimized for Vietnamese diacritical marks
export const TYPOGRAPHY = {
  fontFamily: '"Be Vietnam Pro", system-ui, -apple-system, sans-serif',
  
  // Font weights
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Font sizes
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    md: '1rem',       // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '4rem',    // 64px
  },
  
  // Line heights - adjusted for Vietnamese diacritical marks
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,  // Good for Vietnamese text
    loose: 2,
    // Vietnamese-specific line heights for better diacritical mark display
    vietnamese: {
      normal: 1.8,    // Better for Vietnamese paragraphs
      heading: 1.4,   // Better for Vietnamese headings
    }
  },
  
  // Letter spacing - adjusted for Vietnamese
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
    // Vietnamese should use less letter spacing for better diacritic positioning
    vietnamese: '-0.01em',
    vietnameseHeading: '-0.015em',
  },
  
  // Font feature settings
  fontFeatureSettings: {
    normal: '"calt", "liga", "kern"',
    vietnamese: '"calt", "liga", "dlig", "cv01"',
  },
};

// Transition definitions
export const TRANSITIONS = {
  quick: 'all 0.1s ease',
  medium: 'all 0.3s ease',
  slow: 'all 0.5s ease',
  bounce: 'all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
};