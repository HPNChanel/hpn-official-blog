import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

/**
 * Responsive style utility for Vietnamese-optimized layouts
 */

// Helper for responsive padding with Vietnamese optimization
export const getResponsivePadding = (theme) => ({
  px: {
    xs: 2,
    sm: 3,
    md: 4,
  },
  py: {
    xs: 3,
    sm: 4,
    md: 5, 
  },
});

// Helper for responsive margins with Vietnamese optimization
export const getResponsiveMargins = (theme) => ({
  mx: {
    xs: 2,
    sm: 'auto',
  },
  my: {
    xs: 3,
    sm: 4,
    md: 5,
  },
});

// Custom hooks for responsive design
export const useResponsiveValue = (xsValue, smValue, mdValue, lgValue, xlValue) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.only('lg'));
  
  if (isXs) return xsValue;
  if (isSm) return smValue;
  if (isMd) return mdValue;
  if (isLg) return lgValue;
  return xlValue;
};

// Optimize heading line height for Vietnamese (with diacritical marks)
export const getOptimizedHeadingLineHeight = (breakpoint = 'md') => {
  const lineHeights = {
    xs: 1.3,  // Tighter on mobile for Vietnamese
    sm: 1.35,
    md: 1.4,
    lg: 1.4,
    xl: 1.4,
  };
  
  return lineHeights[breakpoint] || 1.4;
};

// Optimize body text line height for Vietnamese (with diacritical marks)
export const getOptimizedBodyLineHeight = (breakpoint = 'md') => {
  const lineHeights = {
    xs: 1.6,  // More space on mobile for Vietnamese diacritics
    sm: 1.7,
    md: 1.8,
    lg: 1.8,
    xl: 1.8,
  };
  
  return lineHeights[breakpoint] || 1.8;
};

// Get optimal reading width based on screen size (Vietnamese-optimized)
export const getOptimalReadingWidth = (theme) => ({
  width: '100%',
  maxWidth: {
    xs: '100%',
    sm: '540px',
    md: '720px',
    lg: '960px',
  },
  mx: 'auto',
});
