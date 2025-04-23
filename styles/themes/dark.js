import { createTheme } from '@mui/material/styles';

// Create the dark theme based on your existing design
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8a85ff', // From your gradient
      light: '#00b3ff', // From your gradient
      dark: '#624cac',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#a78bfa', // Lighter Violet for dark mode
      light: '#c4b5fd',
      dark: '#8b5cf6',
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
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(15, 23, 42, 0.8)', // Slate 900 with opacity
          backgroundImage: 'none',
          backdropFilter: 'blur(8px)',
        },
      },
    },
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
          backgroundColor: '#1e293b', // Slate 800
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
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
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: 'all 0.3s ease',
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
      },
    },
  },
});

export default darkTheme;