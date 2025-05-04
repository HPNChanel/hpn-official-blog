// styles/theme.js
// DEPRECATED: This file is kept for backward compatibility
// Please use the new theme system from styles/themes/ instead

import { createTheme } from '@mui/material/styles';

// Define spacing values for Vietnamese content
const spacingUnit = 8;

// Custom typography for Vietnamese content 
const typography = {
  fontFamily: '"Be Vietnam Pro", system-ui, -apple-system, sans-serif',
  h1: {
    fontWeight: 700,
    fontSize: '2.75rem',
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
  },
  h2: {
    fontWeight: 600,
    fontSize: '2.25rem',
    lineHeight: 1.3,
    letterSpacing: '-0.005em',
  },
  h3: {
    fontWeight: 600,
    fontSize: '1.75rem',
    lineHeight: 1.3,
  },
  h4: {
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: 1.4,
  },
  h5: {
    fontWeight: 500,
    fontSize: '1.25rem',
    lineHeight: 1.4,
  },
  h6: {
    fontWeight: 500,
    fontSize: '1.125rem',
    lineHeight: 1.5,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  body2: {
    fontSize: '0.9rem',
    lineHeight: 1.6,
  },
  button: {
    fontWeight: 600,
    letterSpacing: '0.03em',
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: 1.5,
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
};

// Base theme with dark mode
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8a85ff', // Purple
      light: '#a78bfa',
      dark: '#6366f1',
    },
    secondary: {
      main: '#00f5d4', // Neon Green
      light: '#5eead4',
      dark: '#0d9488',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
      card: '#252525',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  typography,
  spacing: (factor) => `${spacingUnit * factor}px`,
  shape: {
    borderRadius: 8,
  },
  // Consistent shadows for better depth perception
  shadows: [
    'none',
    '0 2px 4px rgba(0,0,0,0.1)',
    '0 3px 6px rgba(0,0,0,0.15)',
    '0 5px 10px rgba(0,0,0,0.2)',
    '0 8px 12px rgba(0,0,0,0.22)',
    '0 12px 18px rgba(0,0,0,0.25)',
    '0 15px 20px rgba(0,0,0,0.3)',
    '0 18px 24px rgba(0,0,0,0.33)',
    '0 20px 28px rgba(0,0,0,0.36)',
    '0 22px 30px rgba(0,0,0,0.4)',
    '0 24px 34px rgba(0,0,0,0.44)',
    '0 26px 38px rgba(0,0,0,0.48)',
    '0 28px 42px rgba(0,0,0,0.52)',
    '0 30px 46px rgba(0,0,0,0.56)',
    '0 32px 50px rgba(0,0,0,0.6)',
    '0 34px 55px rgba(0,0,0,0.65)',
    '0 36px 60px rgba(0,0,0,0.7)',
    '0 38px 65px rgba(0,0,0,0.75)',
    '0 40px 70px rgba(0,0,0,0.8)',
    '0 42px 75px rgba(0,0,0,0.85)',
    '0 44px 80px rgba(0,0,0,0.9)',
    '0 46px 85px rgba(0,0,0,0.95)',
    '0 48px 90px rgba(0,0,0,1)',
    '0 50px 95px rgba(0,0,0,1)',
    '0 52px 100px rgba(0,0,0,1)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: 'smooth',
          overflowX: 'hidden',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
        contained: {
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 12px rgba(138, 133, 255, 0.3)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(90deg, #8a85ff, #6366f1)',
          '&:hover': {
            background: 'linear-gradient(90deg, #a78bfa, #8a85ff)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 30px rgba(138, 133, 255, 0.3)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(18, 18, 18, 0.8)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: spacingUnit * 3,
          paddingBottom: spacingUnit * 3,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
      styleOverrides: {
        root: {
          color: '#a78bfa',
          transition: 'color 0.2s ease, text-decoration 0.2s ease',
          textUnderlineOffset: '0.2em',
          '&:hover': {
            color: '#8a85ff',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

// Warning logging in development
if (process.env.NODE_ENV === 'development') {
  console.warn(
    'Warning: You are using the deprecated theme.js file. ' +
    'Please import from styles/themes/ instead.'
  );
}

export default darkTheme;