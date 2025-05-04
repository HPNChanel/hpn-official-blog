import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useScrollTrigger } from '@mui/material';

/**
 * Custom hook to manage navigation state and logic
 * @param {Object} options - Configuration options
 * @param {number} options.scrollThreshold - Scroll position to trigger header style change
 * @returns {Object} Navigation state and handlers
 */
const useNavigation = ({ scrollThreshold = 100 } = {}) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Track scroll position for navbar appearance
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: scrollThreshold,
  });

  // Pages data - centralized navigation configuration
  const pages = [
    { name: 'Home', path: '/', ariaLabel: 'Navigate to homepage' },
    { name: 'Blog', path: '/blog', ariaLabel: 'View all blog posts' },
    { name: 'About', path: '/about', ariaLabel: 'Learn about me' },
    { name: 'Portfolio', path: '/portfolio', ariaLabel: 'View my project portfolio' },
    { name: 'Contact', path: '/contact', ariaLabel: 'Contact me' },
  ];

  // Set isMounted to true after the component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Event handlers - memoized with useCallback
  const handleOpenNavMenu = useCallback(() => {
    setMobileMenuOpen(true);
  }, []);

  const handleCloseNavMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Check if a path is active (supports nested routes)
  const isPathActive = useCallback((path) => {
    if (path === '/') {
      return router.pathname === path;
    }
    return router.pathname.startsWith(path);
  }, [router.pathname]);

  return {
    router,
    mobileMenuOpen,
    isMounted,
    trigger,
    pages,
    isPathActive,
    handleOpenNavMenu,
    handleCloseNavMenu,
  };
};

export default useNavigation;
