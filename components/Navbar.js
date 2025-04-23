// components/Navbar.js
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../styles/themes/context';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { isDark } = useTheme();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar 
      position="sticky"
      sx={{
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(25, 118, 210, 0.8)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo for desktop */}
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

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography
                    component={Link}
                    href={page.path}
                    textAlign="center"
                    sx={{
                      color: router.pathname === page.path ? 'primary.main' : 'text.primary',
                      textDecoration: 'none',
                    }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
              <Divider sx={{ my: 1 }} />
              {/* Theme toggle in mobile menu */}
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
                <ThemeToggle />
              </Box>
            </Menu>
          </Box>

          {/* Logo for mobile */}
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
            DEV BLOG
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                href={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  mx: 1,
                  color: router.pathname === page.path ? 'primary.main' : 'white',
                  display: 'block',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
            {/* Theme toggle in desktop menu */}
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
              <ThemeToggle />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;