// styles/themes/dark.js
import { createTheme } from '@mui/material/styles';
import { 
  COLORS, 
  SHADOWS, 
  SPACING_UNIT, 
  BORDER_RADIUS, 
  TYPOGRAPHY, 
  TRANSITIONS 
} from './theme.constants';

// Create the dark theme with Vietnamese optimization
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
      main: COLORS.secondary.main,
      light: COLORS.secondary.light,
      dark: COLORS.secondary.dark,
      contrastText: '#ffffff',
    },
    background: {
      default: COLORS.background.default.dark,
      paper: COLORS.background.paper.dark,
      elevated: COLORS.background.elevated.dark,
      subtle: COLORS.background.subtle.dark,
    },
    text: {
      primary: COLORS.text.primary.dark,
      secondary: COLORS.text.secondary.dark,
      disabled: COLORS.text.disabled.dark,
      hint: COLORS.text.hint.dark,
    },
    error: {
      main: COLORS.states.error,
    },
    warning: {
      main: COLORS.states.warning,
    },
    info: {
      main: COLORS.states.info,
    },
    success: {
      main: COLORS.states.success,
    },
    divider: COLORS.ui.divider.dark,
    // Vietnamese specific colors for the theme
    vietnamese: {
      heading: COLORS.vietnamese.heading.dark,
      text: COLORS.vietnamese.text.dark,
      highlight: COLORS.vietnamese.highlight.dark,
    },
  },
  typography: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeightLight: TYPOGRAPHY.fontWeight.light,
    fontWeightRegular: TYPOGRAPHy.fontWeight.regular,
    fontWeightMedium: TYPOGRAPHY.fontWeight.medium,
    fontWeightBold: TYPOGRAPHY.fontWeight.bold,
    h1: {
      fontSize: TYPOGRAPHY.fontSize['5xl'],
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      lineHeight: TYPOGRAPHY.lineHeight.vietnamese.heading,
      letterSpacing: TYPOGRAPHY.letterSpacing.tight,
    },
    h2: {
      fontSize: TYPOGRAPHY.fontSize['4xl'],
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      lineHeight: TYPOGRAPHY.lineHeight.vietnamese.heading,
      letterSpacing: TYPOGRAPHY.letterSpacing.tight,
    },
    h3: {
      fontSize: TYPOGRAPHY.fontSize['3xl'],
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      lineHeight: TYPOGRAPHY.lineHeight.vietnamese.heading,
      letterSpacing: TYPOGRAPHY.letterSpacing.normal,
    },
    h4: {
      fontSize: TYPOGRAPHY.fontSize['2xl'],
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      lineHeight: TYPOGRAPHY.lineHeight.vietnamese.heading,
      letterSpacing: TYPOGRAPHY.letterSpacing.normal,
    },
    h5: {
      fontSize: TYPOGRAPHY.fontSize.xl,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      lineHeight: TYPOGRAPHY.lineHeight.vietnamese.heading,
    },
    h6: {
      fontSize: TYPOGRAPHY.fontSize.lg,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      lineHeight: TYPOGRAPHY.lineHeight.vietnamese.heading,
    },
    subtitle1: {
      fontSize: TYPOGRAPHY.fontSize.lg,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      lineHeight: TYPOGRAPHY.lineHeight.vietnamese.normal,
    },
    subtitle2: {
      fontSize: TYPOGRAPHY.fontSize.md,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      lineHeight: TYPOGRAPHY.lineHeight.vietnamese.normal,
    },
    body1: {
      fontSize: TYPOGRAPHY.fontSize.md,
      lineHeight: TYPOGRAPHY.lineHeight.vietnamese.normal,
      letterSpacing: TYPOGRAPHY.letterSpacing.vietnamese,
    },
    body2: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      lineHeight: TYPOGRAPHY.lineHeight.vietnamese.normal,
      letterSpacing: TYPOGRAPHY.letterSpacing.vietnamese,
    },
    button: {
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      textTransform: 'none',
    },
    caption: {
      fontSize: TYPOGRAPHY.fontSize.xs,
      lineHeight: TYPOGRAPHY.lineHeight.normal,
    },
    overline: {
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      fontSize: TYPOGRAPHY.fontSize.xs,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
    },
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
    MuiCssBaseline: {
      styleOverrides: {
        // Global CSS
        'html, body': {
          scrollBehavior: 'smooth',
          fontFamily: TYPOGRAPHY.fontFamily,
        },
        body: {
          transition: 'background-color 0.3s ease',
          backgroundImage: `
            radial-gradient(circle at 30% 30%, rgba(167, 139, 250, 0.1) 0%, transparent 45%), 
            radial-gradient(circle at 70% 80%, rgba(96, 165, 250, 0.05) 0%, transparent 40%)
          `,
          backgroundAttachment: 'fixed',
          scrollbarColor: 'rgba(255, 255, 255, 0.1) rgba(0, 0, 0, 0.1)',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          },
        },
        '.theme-transition': {
          transition: 'all 0.5s ease !important',
        },
        // Common utility classes
        '.text-gradient': {
          background: COLORS.gradients.primary.dark,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
        '.bg-blur': {
          backdropFilter: 'blur(10px)',
        },
        // Vietnamese text specific classes
        '.vietnamese': {
          lineHeight: TYPOGRAPHY.lineHeight.vietnamese.normal,
          letterSpacing: TYPOGRAPHY.letterSpacing.vietnamese,
        },
        '.vietnamese-heading': {
          lineHeight: TYPOGRAPHY.lineHeight.vietnamese.heading,
          letterSpacing: TYPOGRAPHY.letterSpacing.tight,
          color: COLORS.vietnamese.heading.dark,
        },
        '.vietnamese-highlight': {
          backgroundColor: COLORS.vietnamese.highlight.dark,
          padding: '0.25em 0.5em',
          borderRadius: BORDER_RADIUS.sm,
        },
        // Prevent FOUT (Flash of Unstyled Text) during theme switching
        '@font-face': {
          fontDisplay: 'swap',
        },
      }
    },
    // ... rest of the components stay the same
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.background.elevated.dark,
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
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          boxShadow: SHADOWS.button,
          '&:hover': {
            boxShadow: SHADOWS.highlight,
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
        containedPrimary: {
          background: COLORS.gradients.primary.dark,
          '&:hover': {
            background: COLORS.gradients.primary.dark,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADIUS.lg,
          backgroundColor: COLORS.background.paper.dark,
          border: `1px solid ${COLORS.ui.outline.dark}`,
          boxShadow: SHADOWS.card,
          transition: TRANSITIONS.medium,
          overflow: 'hidden',
        },
      },
    },
    // ... other component styles
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(4px)',
          border: `1px solid ${COLORS.ui.outline.dark}`,
          borderRadius: BORDER_RADIUS.sm,
          boxShadow: SHADOWS.md,
          fontSize: TYPOGRAPHY.fontSize.xs,
          padding: '8px 12px',
          // Higher line-height for Vietnamese text in tooltips
          lineHeight: TYPOGRAPHY.lineHeight.vietnamese.normal,
        },
      },
    },
    // ... more component styles maintained
  },
});

export default darkTheme;