import React, { lazy, Suspense, memo } from 'react';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { motion } from 'framer-motion';
import useNavigation from '../hooks/useNavigation';

// Lazy load non-critical components
const ThemeToggle = lazy(() => import('./ThemeToggle'));
const MobileNavigation = lazy(() => import('./MobileNavigation'));

// Styled components for better performance
const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'triggered'
})(({ triggered, theme }) => ({
  backgroundColor: triggered ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.5)',
  backdropFilter: 'blur(8px)',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  willChange: 'background-color, box-shadow',
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: 'inherit',
  textDecoration: 'none',
  background: 'linear-gradient(45deg, #8a85ff, #00b3ff)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  willChange: 'transform',
}));

const NavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isActive'
})(({ isActive, theme }) => ({
  margin: theme.spacing(2, 1),
  color: isActive ? theme.palette.primary.main : 'white',
  display: 'block',
  position: 'relative',
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
  },
  '&::after': isActive ? {
    content: '""',
    position: 'absolute',
    bottom: '10px',
    left: '25%',
    width: '50%',
    height: '3px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '3px',
    willChange: 'transform',
  } : {},
}));

// Separate components for better rendering optimization
const Logo = memo(({ isMobile }) => {
  // Animation variants
  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={logoVariants}
      style={{ willChange: 'transform, opacity' }}
    >
      <LogoText
        variant="h6"
        noWrap
        component={Link}
        href="/"
        aria-label="HPN Blog homepage"
        sx={{
          mr: 2,
          display: { xs: isMobile ? 'flex' : 'none', md: isMobile ? 'none' : 'flex' },
          flexGrow: isMobile ? 1 : 0,
        }}
      >
        HPN BLOG
      </LogoText>
    </motion.div>
  );
});

Logo.displayName = 'Logo';

const NavigationItems = memo(({ pages, isPathActive, onNavClick }) => {
  // Animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: 0.2 + (custom * 0.1),
        duration: 0.3
      }
    })
  };

  return (
    <>
      {pages.map((page, index) => {
        const isActive = isPathActive(page.path);
        
        return (
          <motion.div
            key={page.name}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={navItemVariants}
            style={{ willChange: 'transform, opacity' }}
          >
            <NavButton
              component={Link}
              href={page.path}
              onClick={onNavClick}
              isActive={isActive}
              aria-label={page.ariaLabel}
              aria-current={isActive ? 'page' : undefined}
            >
              {page.name}
            </NavButton>
          </motion.div>
        );
      })}
    </>
  );
});

NavigationItems.displayName = 'NavigationItems';

const ThemeToggleWrapper = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.7 }}
      style={{ willChange: 'transform, opacity' }}
    >
      <Suspense fallback={<Box sx={{ width: 40, height: 40 }} />}>
        <ThemeToggle />
      </Suspense>
    </motion.div>
  );
});

ThemeToggleWrapper.displayName = 'ThemeToggleWrapper';

const Navbar = () => {
  const {
    mobileMenuOpen,
    isMounted,
    trigger,
    pages,
    isPathActive,
    handleOpenNavMenu,
    handleCloseNavMenu,
  } = useNavigation();

  return (
    <StyledAppBar 
      position="sticky"
      elevation={trigger ? 4 : 0}
      triggered={trigger}
      component="nav"
      aria-label="Main navigation"
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo for desktop */}
          <Logo isMobile={false} />

          {/* Mobile menu button */}
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="Open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              aria-expanded={mobileMenuOpen ? 'true' : 'false'}
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo for mobile */}
          <Logo isMobile={true} />

          {/* Desktop menu */}
          <Box 
            component="div"
            role="navigation"
            aria-label="Main menu"
            sx={{ 
              flexGrow: 1, 
              display: { xs: 'none', md: 'flex' }, 
              justifyContent: 'flex-end' 
            }}
          >
            <NavigationItems 
              pages={pages} 
              isPathActive={isPathActive}
              onNavClick={handleCloseNavMenu} 
            />
            
            {/* Theme toggle in desktop menu */}
            {isMounted && (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                <ThemeToggleWrapper />
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
      
      {/* Mobile Navigation Drawer */}
      {isMounted && (
        <Suspense fallback={null}>
          <MobileNavigation
            isOpen={mobileMenuOpen}
            onClose={handleCloseNavMenu}
            pages={pages}
            currentPath={isPathActive}
          />
        </Suspense>
      )}
    </StyledAppBar>
  );
};

export default memo(Navbar);