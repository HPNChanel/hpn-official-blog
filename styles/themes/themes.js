import { createTheme } from '@mui/material/styles';

// Common theme settings
const commonThemeSettings = {
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
};

// Dark theme
export const darkTheme = createTheme({
  ...commonThemeSettings,
  palette: {
    mode: 'dark',
    primary: {
      main: '#8a85ff', // Main purple
      light: '#a78bfa',
      dark: '#624cac',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#60a5fa', // Bright blue
      light: '#93c5fd',
      dark: '#2563eb',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0f172a', // Slate 900
      paper: '#1e293b',  // Slate 800
    },
    text: {
      primary: '#f9fafb',
      secondary: '#e5e7eb',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  components: {
    ...commonThemeSettings.components,
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          backgroundImage: 'none',
          backdropFilter: 'blur(8px)',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: 'all 0.3s ease',
          backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(167, 139, 250, 0.1) 0%, transparent 45%), radial-gradient(circle at 70% 80%, rgba(96, 165, 250, 0.05) 0%, transparent 40%)',
          backgroundAttachment: 'fixed',
          scrollbarColor: 'rgba(255, 255, 255, 0.1) rgba(0, 0, 0, 0.1)',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          },
        },
        // Set default font family throughout the app
        'html, body': {
          fontFamily: '"Be Vietnam Pro", system-ui, -apple-system, sans-serif',
        },
      },
    },
  },
});

// Light theme
export const lightTheme = createTheme({
  ...commonThemeSettings,
  palette: {
    mode: 'light',
    primary: {
      main: '#6366f1', // Indigo main
      light: '#818cf8',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0ea5e9', // Sky blue
      light: '#38bdf8',
      dark: '#0284c7',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f9fafb', // Gray 50
      paper: '#ffffff',   // White
    },
    text: {
      primary: '#111827', // Gray 900
      secondary: '#4b5563', // Gray 600
    },
    divider: 'rgba(0, 0, 0, 0.08)',
  },
  components: {
    ...commonThemeSettings.components,
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          color: '#111827',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: 'all 0.3s ease',
          backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.05) 0%, transparent 45%), radial-gradient(circle at 70% 80%, rgba(14, 165, 233, 0.03) 0%, transparent 40%)',
          backgroundAttachment: 'fixed',
        },
        // Set default font family throughout the app
        'html, body': {
          fontFamily: '"Be Vietnam Pro", system-ui, -apple-system, sans-serif',
        },
      },
    },
  },
});