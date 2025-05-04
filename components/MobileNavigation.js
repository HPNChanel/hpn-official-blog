import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import EmailIcon from '@mui/icons-material/Email';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Badge, Switch, Tooltip } from '@mui/material';
import { useTheme } from '../styles/themes/context';
import { useSwipeable } from 'react-swipeable'; // Would need to install this package

// Styled components for better performance
const BackdropOverlay = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(4px)',
  zIndex: 1199, // Just below drawer
  willChange: 'opacity',
}));

const StyledDrawerPaper = styled(Box)(({ theme }) => ({
  width: '80%',
  maxWidth: '320px',
  background: 'rgba(15, 23, 42, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRight: '1px solid rgba(167, 139, 250, 0.2)',
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
  padding: 0,
  borderTopRightRadius: '24px',
  borderBottomRightRadius: '24px',
  overflowX: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: 'radial-gradient(circle at top right, rgba(167, 139, 250, 0.2), transparent 70%)',
}));

const NavListItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})(({ isSelected, theme }) => ({
  padding: theme.spacing(2), // Increased padding for larger touch target
  borderRadius: theme.shape.borderRadius * 2,
  marginBottom: 8, // Slightly increased spacing
  borderLeft: '4px solid',
  borderColor: isSelected ? theme.palette.primary.main : 'transparent',
  backgroundColor: isSelected ? 'rgba(167, 139, 250, 0.1)' : 'transparent',
  '&:hover': {
    backgroundColor: 'rgba(167, 139, 250, 0.05)',
  },
  willChange: isSelected ? 'transform, background-color' : 'initial',
  transition: 'background-color 0.2s ease, border-color 0.2s ease',
  // Ensure at least 48px height for touch targets
  minHeight: '48px',
  // Better touch feedback
  '&:active': {
    backgroundColor: 'rgba(167, 139, 250, 0.15)',
    transform: 'scale(0.98)',
  },
}));

const StyledListItemIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})(({ isSelected, theme }) => ({
  minWidth: 40,
  color: isSelected ? theme.palette.primary.main : theme.palette.text.secondary,
}));

// Animation variants
const menuVariants = {
  closed: {
    opacity: 0,
    x: "-100%",
    transition: {
      duration: 0.3,
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: "afterChildren",
    }
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
      staggerDirection: 1,
      when: "beforeChildren",
    }
  }
};

const itemVariants = {
  closed: { x: -20, opacity: 0 },
  open: { x: 0, opacity: 1 }
};

const backdropVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 }
};

const MobileNavigation = ({ isOpen, onClose, totalSavedPosts = 0 }) => {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();
  
  // Page navigation items with icons
  const pages = [
    { name: 'Home', path: '/', icon: <HomeIcon /> },
    { name: 'Blog', path: '/blog', icon: <ArticleIcon /> },
    { name: 'Tags', path: '/tags', icon: <LocalOfferIcon /> },
    { name: 'About', path: '/about', icon: <PersonIcon /> },
    { name: 'Portfolio', path: '/portfolio', icon: <WorkIcon /> },
    { name: 'Contact', path: '/contact', icon: <EmailIcon /> },
  ];

  // Close drawer when route changes
  useEffect(() => {
    router.events.on('routeChangeComplete', onClose);
    return () => {
      router.events.off('routeChangeComplete', onClose);
    };
  }, [router, onClose]);

  // Handle theme toggle with useCallback
  const handleThemeToggle = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  // Add swipe gesture support
  const swipeHandlers = useSwipeable({
    onSwipedLeft: onClose,
    preventDefaultTouchmoveEvent: true,
    trackMouse: false,
    delta: 10,
  });

  return (
    <>
      {/* Backdrop with animation */}
      <AnimatePresence>
        {isOpen && (
          <BackdropOverlay
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>
    
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={onClose}
        PaperProps={{ component: 'div' }}
        transitionDuration={400}
        ModalProps={{
          keepMounted: true, // Better performance on mobile
        }}
      >
        <StyledDrawerPaper {...swipeHandlers}>
          <AnimatePresence>
            <motion.div
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              exit="closed"
              variants={menuVariants}
              style={{ height: '100%', display: 'flex', flexDirection: 'column', willChange: 'transform, opacity' }}
            >
              {/* Header with close button and profile */}
              <HeaderBox>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    src="/images/avatar.jpg" 
                    alt="Phuc Nguyen"
                    sx={{ 
                      width: 50, 
                      height: 50,
                      mr: 1.5,
                      border: '2px solid',
                      borderColor: 'primary.main',
                      boxShadow: '0 0 10px rgba(167, 139, 250, 0.5)',
                    }}
                    loading="lazy"
                  />
                  <Box>
                    <Typography 
                      variant="subtitle1" 
                      fontWeight={700} 
                      lineHeight={1.2} 
                      sx={{ 
                        mb: 0.5,
                        // Vietnamese optimization
                        letterSpacing: '-0.01em', 
                      }}
                    >
                      Phuc Nguyen
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color="primary.light" 
                      sx={{ 
                        fontWeight: 500,
                        // Vietnamese optimization
                        letterSpacing: '-0.01em', 
                      }}
                    >
                      Web3 Developer
                    </Typography>
                  </Box>
                </Box>
                
                <IconButton 
                  onClick={onClose} 
                  color="primary"
                  aria-label="Close menu"
                  sx={{
                    backgroundColor: 'rgba(167, 139, 250, 0.1)',
                    width: '48px', // Larger touch target
                    height: '48px', // Larger touch target
                    '&:hover': {
                      backgroundColor: 'rgba(167, 139, 250, 0.2)',
                    },
                    '&:active': {
                      transform: 'scale(0.95)',
                    }
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </HeaderBox>
              
              <Divider sx={{ mb: 2 }} />
              
              {/* Navigation links */}
              <List 
                sx={{ 
                  flexGrow: 1, 
                  px: 2, 
                  overflowY: 'auto',
                  // iOS momentum scrolling for a native feel
                  WebkitOverflowScrolling: 'touch', 
                }}
                role="menu"
                aria-label="Main navigation"
              >
                {pages.map((page) => {
                  const isSelected = router.pathname === page.path;
                  
                  return (
                    <motion.div key={page.name} variants={itemVariants} style={{ willChange: 'transform, opacity' }}>
                      <ListItem disablePadding>
                        <NavListItem
                          component={Link}
                          href={page.path}
                          onClick={onClose}
                          isSelected={isSelected}
                          aria-current={isSelected ? 'page' : undefined}
                          role="menuitem"
                        >
                          <StyledListItemIcon isSelected={isSelected}>
                            {page.name === 'Blog' ? (
                              <Badge badgeContent={totalSavedPosts} color="primary">
                                {page.icon}
                              </Badge>
                            ) : (
                              page.icon
                            )}
                          </StyledListItemIcon>
                          <ListItemText 
                            primary={page.name} 
                            primaryTypographyProps={{
                              fontSize: '1rem',
                              fontWeight: isSelected ? 600 : 400,
                              // Vietnamese optimization
                              letterSpacing: '-0.01em',
                            }}
                          />
                        </NavListItem>
                      </ListItem>
                    </motion.div>
                  );
                })}
              </List>
              
              {/* Footer with theme toggle and social links */}
              <Box 
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                }}
              >
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Tooltip title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
                    <IconButton
                      onClick={handleThemeToggle}
                      color="primary"
                      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                      sx={{
                        backgroundColor: 'rgba(167, 139, 250, 0.1)',
                        mr: 1,
                        width: '48px', // Larger touch target
                        height: '48px', // Larger touch target
                        '&:hover': {
                          backgroundColor: 'rgba(167, 139, 250, 0.2)',
                        },
                        '&:active': {
                          transform: 'scale(0.95)',
                        }
                      }}
                    >
                      {isDark ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                  </Tooltip>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      // Vietnamese optimization
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                  </Typography>
                  
                  <Switch
                    checked={isDark}
                    onChange={handleThemeToggle}
                    color="primary"
                    size="medium" // Slightly larger for better touch target
                    edge="end"
                  />
                </Box>
                
                <Box sx={{ mt: 3 }}>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{
                      // Vietnamese optimization
                      letterSpacing: '-0.01em',
                    }}
                  >
                    © {new Date().getFullYear()} HPN Blog
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </AnimatePresence>
        </StyledDrawerPaper>
      </Drawer>
    </>
  );
};

export default React.memo(MobileNavigation);