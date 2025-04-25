import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  useScrollTrigger,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ThemeToggle from './ThemeToggle';
import MobileNavigation from './MobileNavigation';
import { motion } from 'framer-motion';

const Navbar = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Track scroll position for navbar appearance
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleOpenNavMenu = () => {
    setMobileMenuOpen(true);
  };

  const handleCloseNavMenu = () => {
    setMobileMenuOpen(false);
  };
  
  // Framer motion variants
  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };
  
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
    <AppBar 
      position="sticky"
      elevation={trigger ? 4 : 0}
      sx={{
        backgroundColor: trigger 
          ? 'rgba(15, 23, 42, 0.95)' 
          : 'rgba(15, 23, 42, 0.5)',
        backdropFilter: 'blur(8px)',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo for desktop */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={logoVariants}
          >
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                background: 'linear-gradient(45deg, #8a85ff, #00b3ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              HPN BLOG
            </Typography>
          </motion.div>

          {/* Mobile menu button */}
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo for mobile */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={logoVariants}
          >
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                background: 'linear-gradient(45deg, #8a85ff, #00b3ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              HPN BLOG
            </Typography>
          </motion.div>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {pages.map((page, index) => (
              <motion.div
                key={page.name}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
              >
                <Button
                  component={Link}
                  href={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    mx: 1,
                    color: router.pathname === page.path ? 'primary.main' : 'white',
                    display: 'block',
                    position: 'relative',
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'transparent',
                    },
                    '&::after': router.pathname === page.path ? {
                      content: '""',
                      position: 'absolute',
                      bottom: '10px',
                      left: '25%',
                      width: '50%',
                      height: '3px',
                      backgroundColor: 'primary.main',
                      borderRadius: '3px',
                    } : {},
                  }}
                >
                  {page.name}
                </Button>
              </motion.div>
            ))}
            
            {/* Theme toggle in desktop menu */}
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
              >
                <ThemeToggle />
              </motion.div>
            </Box>
          </Box>
        </Toolbar>
      </Container>
      
      {/* Mobile Navigation Drawer */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={handleCloseNavMenu}
      />
    </AppBar>
  );
};

export default Navbar;