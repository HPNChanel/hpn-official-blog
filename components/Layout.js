import React, { lazy, Suspense, useEffect, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import useNonBlockingStyles from '../hooks/useNonBlockingStyles';

// Lazy load non-critical components
const Navbar = lazy(() => import('./Navbar'));
const Footer = lazy(() => import('./Footer'));

// Fallback loading component
const LoadingBar = React.memo(() => (
  <LinearProgress
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      height: 3,
    }}
  />
));

// Styled components improve performance over runtime sx props
const Main = styled('main')(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  // Use padding instead of multiple nested containers
  padding: theme.spacing(0, 3),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0, 4),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0, 5),
  },
  // Prevent content jump when scrollbar appears/disappears
  width: '100%',
  boxSizing: 'border-box',
  willChange: 'transform',
}));

// Use consistent container to prevent layout shift
const ContentContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 1200,
  margin: '0 auto',
  flex: '1 0 auto',
  paddingTop: theme.spacing(10), // Account for fixed navbar
  paddingBottom: theme.spacing(8),
  // Improve performance with hardware acceleration
  transform: 'translateZ(0)',
}));

// PropTypes for TypeScript-like interface
Layout.propTypes = {
  children: React.PropTypes?.node,
};

function Layout({ children }) {
  // Load non-critical CSS using custom hook
  const { injectStyles } = useNonBlockingStyles();

  // Memoize animation styles to prevent unnecessary re-renders
  const animationStyles = useMemo(() => `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .fade-in {
      animation: fadeIn 0.5s ease-out;
    }
    
    .slide-up {
      animation: slideUp 0.5s ease-out;
    }
  `, []);

  // Inject non-critical CSS after page loads
  useEffect(() => {
    // Use requestIdleCallback for non-critical operation
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        injectStyles({
          id: 'layout-animations',
          css: animationStyles,
        });
      }, { timeout: 2000 });
    } else {
      // Fallback for browsers not supporting requestIdleCallback
      setTimeout(() => {
        injectStyles({
          id: 'layout-animations',
          css: animationStyles,
        });
      }, 2000);
    }
  }, [injectStyles, animationStyles]);

  return (
    <>
      <Suspense fallback={<LoadingBar />}>
        <Navbar />
      </Suspense>
      <Main role="main" id="main-content">
        <ContentContainer>
          {children}
        </ContentContainer>
      </Main>
      <Suspense fallback={<Box sx={{ height: '100px' }} />}>
        <Footer />
      </Suspense>
    </>
  );
}

export default React.memo(Layout);