import { createTheme } from '@mui/material/styles';
import { 
  COLORS, 
  SHADOWS, 
  SPACING_UNIT, 
  BORDER_RADIUS, 
  TYPOGRAPHY, 
  TRANSITIONS 
} from './theme.constants';

// Create the dark theme
const darkTheme = createTheme({
  spacing: SPACING_UNIT,
  palette: {
    mode: 'dark',
    primary: {
      main: COLORS.primary.main,
      light: COLORS.primary.light,
      dark: COLORS.primary.dark,
      contrastText: '#ffffff',
    },
    secondary: {
      main: COLORS.accent.blue,
      light: COLORS.accent.green,
      dark: COLORS.primary.dark,
      contrastText: '#ffffff',
    },
    background: {
      default: COLORS.background.default,
      paper: COLORS.background.paper,
    },
    text: {
      primary: COLORS.text.primary,
      secondary: COLORS.text.secondary,
    },
    divider: COLORS.ui.divider,
  },
  typography: {
    fontFamily: TYPOGRAPHY.fontFamily,
    h1: {
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      fontSize: TYPOGRAPHY.fontSize['5xl'],
      lineHeight: TYPOGRAPHY.lineHeight.tight,
    },
    h2: {
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      fontSize: TYPOGRAPHY.fontSize['4xl'],
    },
    h3: {
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      fontSize: TYPOGRAPHY.fontSize['3xl'],
    },
    // ... other typography variants
  },
  shape: {
    borderRadius: parseInt(BORDER_RADIUS.md),
  },
  shadows: [
    'none',
    SHADOWS.sm,
    SHADOWS.sm,
    SHADOWS.md,
    SHADOWS.md,
    SHADOWS.md,
    SHADOWS.lg,
    SHADOWS.lg,
    SHADOWS.lg,
    SHADOWS.lg,
    SHADOWS.xl,
    SHADOWS.xl,
    SHADOWS.xl,
    SHADOWS.xl,
    SHADOWS.xl,
    SHADOWS.xl,
    SHADOWS.xl,
    SHADOWS.xl,
    SHADOWS.xl,
    SHADOWS.xl,
    SHADOWS.xl,
    SHADOWS.xl,
    SHADOWS.xl,
    SHADOWS.xl,
    SHADOWS.xl,
  ],
  components: {
    // Component customizations using the constants
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.background.elevated,
          backgroundImage: 'none',
          backdropFilter: 'blur(8px)',
          transition: TRANSITIONS.medium,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: TYPOGRAPHY.fontWeight.semibold,
          borderRadius: BORDER_RADIUS.md,
          transition: TRANSITIONS.medium,
        },
        contained: {
          boxShadow: SHADOWS.highlight,
          '&:hover': {
            boxShadow: SHADOWS.xl,
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADIUS.lg,
          backgroundColor: COLORS.background.paper,
          border: `1px solid ${COLORS.ui.outline}`,
          boxShadow: SHADOWS.card,
          transition: TRANSITIONS.medium,
        },
      },
    },
    // ... other component customizations
  },
});

export default darkTheme;