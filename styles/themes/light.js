import { createTheme } from '@mui/material/styles';
import { 
  COLORS, 
  SHADOWS, 
  SPACING_UNIT, 
  BORDER_RADIUS, 
  TYPOGRAPHY, 
  TRANSITIONS,
  BREAKPOINTS,      // Import new breakpoints
  CONTAINER_WIDTHS  // Import new container widths
} from './theme.constants';

// Create the light theme with Vietnamese optimization
const lightTheme = createTheme({
  // Override breakpoints for better Vietnamese content display
  breakpoints: {
    values: BREAKPOINTS,
  },
  
  spacing: SPACING_UNIT,
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
      default: COLORS.background.default.light,
      paper: COLORS.background.paper.light,
      elevated: COLORS.background.elevated.light,
      subtle: COLORS.background.subtle.light,
    },
    text: {
      primary: COLORS.text.primary.light,
      secondary: COLORS.text.secondary.light,
      disabled: COLORS.text.disabled.light,
      hint: COLORS.text.hint.light,
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
    divider: COLORS.ui.divider.light,
    // Vietnamese specific colors for the theme
    vietnamese: {
      heading: COLORS.vietnamese.heading.light,
      text: COLORS.vietnamese.text.light,
      highlight: COLORS.vietnamese.highlight.light,
    },
  },
  typography: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeightLight: TYPOGRAPHY.fontWeight.light,
    fontWeightRegular: TYPOGRAPHY.fontWeight.regular,
    fontWeightMedium: TYPOGRAPHY.fontWeight.medium,
    fontWeightBold: TYPOGRAPHY.fontWeight.bold,
    h1: {
      fontSize: TYPOGRAPHY.fontSize['5xl'],
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      lineHeight: TYPOGRAPHY.lineHeight.vietnamese.heading,
      letterSpacing: '-0.015em',  // Slightly tighter for Vietnamese headings
      color: COLORS.vietnamese.heading.light,
    },
    h2: {
      fontSize: TYPOGRAPHY.fontSize['4xl'],
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      lineHeight: TYPOGRAPHY.lineHeight.vietnamese.heading,
      letterSpacing: '-0.01em',
      color: COLORS.vietnamese.heading.light,
    },
    h3: {
      fontSize: TYPOGRAPHY.fontSize['3xl'],
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      lineHeight: TYPOGRAPHY.lineHeight.vietnamese.heading,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: TYPOGRAPHY.fontSize['2xl'],
      fontWeight: TYPOGRAPHy.fontWeight.semibold,
      lineHeight: TYPOGRAPHY.lineHeight.vietnamese.heading,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontSize: TYPOGRAPHY.fontSize.xl,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      lineHeight: TYPOGRAPHY.lineHeight.vietnamese.heading,
      letterSpacing: '-0.005em',
    },
    h6: {
      fontSize: TYPOGRAPHY.fontSize.lg,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      lineHeight: TYPOGRAPHY.lineHeight.vietnamese.heading,
      letterSpacing: '-0.005em',
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
      color: COLORS.vietnamese.text.light,
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
      letterSpacing: '0.05em', // Slightly reduced for Vietnamese
    },
  },
  shape: {
    borderRadius: parseInt(BORDER_RADIUS.md),
  },
  shadows: [
    'none',
    SHADOWS.light.sm,
    SHADOWS.light.sm,
    SHADOWS.light.md,
    SHADOWS.light.md,
    SHADOWS.light.md,
    SHADOWS.light.lg,
    SHADOWS.light.lg,
    SHADOWS.light.lg,
    SHADOWS.light.lg,
    SHADOWS.light.xl,
    SHADOWS.light.xl,
    SHADOWS.light.xl,
    SHADOWS.light.xl,
    SHADOWS.light.xl,
    SHADOWS.light.xl,
    SHADOWS.light.xl,
    SHADOWS.light.xl,
    SHADOWS.light.xl,
    SHADOWS.light.xl,
    SHADOWS.light.xl,
    SHADOWS.light.xl,
    SHADOWS.light.xl,
    SHADOWS.light.xl,
    SHADOWS.light.xl,
    SHADOWS.light.xl,
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
            radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.05) 0%, transparent 45%), 
            radial-gradient(circle at 70% 80%, rgba(14, 165, 233, 0.03) 0%, transparent 40%)
          `,
          backgroundAttachment: 'fixed',
          // Light mode scrollbar
          scrollbarColor: 'rgba(203, 213, 225, 0.8) rgba(241, 245, 249, 0.5)',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(203, 213, 225, 0.8)',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: 'rgba(148, 163, 184, 0.8)',
            },
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(241, 245, 249, 0.5)',
          },
        },
        '.theme-transition': {
          transition: 'all 0.5s ease !important',
        },
        // Common utility classes
        '.text-gradient': {
          background: COLORS.gradients.primary.light,
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
          color: COLORS.vietnamese.text.light,
        },
        '.vietnamese-heading': {
          lineHeight: TYPOGRAPHY.lineHeight.vietnamese.heading,
          letterSpacing: TYPOGRAPHY.letterSpacing.tight,
          color: COLORS.vietnamese.heading.light,
        },
        '.vietnamese-highlight': {
          backgroundColor: COLORS.vietnamese.highlight.light,
          padding: '0.25em 0.5em',
          borderRadius: BORDER_RADIUS.sm,
        },
        // Prevent FOUT (Flash of Unstyled Text) during theme switching
        '@font-face': {
          fontDisplay: 'swap',
        },
        // Responsive typography for Vietnamese content
        '@media (max-width: 480px)': {
          html: {
            fontSize: '14px', // Slightly smaller base for very small screens
          }
        },
        
        // Optimize touch targets for mobile
        '@media (max-width: 768px)': {
          'button, a, [role="button"]': {
            minHeight: '44px',
            minWidth: '44px',
          }
        },
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.background.elevated.light,
          backgroundImage: 'none',
          backdropFilter: 'blur(8px)',
          color: COLORS.text.primary.light,
          boxShadow: SHADOWS.light.sm,
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
          boxShadow: SHADOWS.light.button,
          '&:hover': {
            boxShadow: SHADOWS.light.highlight,
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
          background: COLORS.gradients.primary.light,
          '&:hover': {
            background: COLORS.gradients.primary.light,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADIUS.lg,
          backgroundColor: COLORS.background.paper.light,
          border: `1px solid ${COLORS.ui.outline.light}`,
          boxShadow: SHADOWS.light.card,
          transition: TRANSITIONS.medium,
          overflow: 'hidden',
        },
      },
    },
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          transition: TRANSITIONS.medium,
          '&:hover': {
            '& .MuiCardActionArea-focusHighlight': {
              opacity: 0.05,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADIUS.sm,
          transition: TRANSITIONS.quick,
        },
        filled: {
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          [theme.breakpoints.up('xs')]: {
            maxWidth: CONTAINER_WIDTHS.xs,
          },
          [theme.breakpoints.up('sm')]: {
            maxWidth: CONTAINER_WIDTHS.sm,
          },
          [theme.breakpoints.up('md')]: {
            maxWidth: CONTAINER_WIDTHS.md,
          },
          [theme.breakpoints.up('lg')]: {
            maxWidth: CONTAINER_WIDTHS.lg,
          },
          [theme.breakpoints.up('xl')]: {
            maxWidth: CONTAINER_WIDTHS.xl,
          },
        }),
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: COLORS.ui.divider.light,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#4f46e5', // Slightly darker for better contrast in light mode
          textDecoration: 'none',
          transition: TRANSITIONS.quick,
          '&:hover': {
            color: '#4338ca',
            textDecoration: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundImage: 'none',
          boxShadow: 'none',
          borderRadius: BORDER_RADIUS.md,
          // Better padding on mobile
          [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
          },
          [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(3),
          },
          [theme.breakpoints.up('md')]: {
            padding: theme.spacing(4),
          },
        }),
        elevation1: {
          boxShadow: SHADOWS.light.sm,
        },
        elevation2: {
          boxShadow: SHADOWS.light.md,
        },
        elevation3: {
          boxShadow: SHADOWS.light.lg,
        },
        elevation4: {
          boxShadow: SHADOWS.light.xl,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: BORDER_RADIUS.md,
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: 2,
              borderColor: '#6366f1',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#818cf8',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: COLORS.ui.outline.light,
            },
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(4px)',
          border: `1px solid ${COLORS.ui.outline.light}`,
          borderRadius: BORDER_RADIUS.sm,
          boxShadow: SHADOWS.light.md,
          fontSize: TYPOGRAPHY.fontSize.xs,
          padding: '8px 12px',
          color: COLORS.text.primary.light,
          lineHeight: TYPOGRAPHY.lineHeight.vietnamese.normal,
        },
      },
    },
    // Additional components for light mode
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: SHADOWS.light.md,
          '&:hover': {
            boxShadow: SHADOWS.light.lg,
          },
        },
        primary: {
          background: COLORS.gradients.primary.light,
          '&:hover': {
            background: COLORS.gradients.primary.light,
          },
        },
      },
    },
  },
});

export default lightTheme;