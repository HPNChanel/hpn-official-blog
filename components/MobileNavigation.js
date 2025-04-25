import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
import ThemeToggle from './ThemeToggle';

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

const MobileNavigation = ({ isOpen, onClose }) => {
  const router = useRouter();
  
  // Page navigation items with icons
  const pages = [
    { name: 'Home', path: '/', icon: <HomeIcon /> },
    { name: 'Blog', path: '/blog', icon: <ArticleIcon /> },
    { name: 'About', path: '/about', icon: <PersonIcon /> },
    { name: 'Portfolio', path: '/portfolio', icon: <WorkIcon /> },
    { name: 'Contact', path: '/contact', icon: <EmailIcon /> },
  ];

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '80%',
          maxWidth: '300px',
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRight: '1px solid rgba(167, 139, 250, 0.2)',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
          padding: 0
        }
      }}
    >
      <AnimatePresence>
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          {/* Header with close button and profile */}
          <Box sx={{ 
            p: 2, 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar 
                src="/images/avatar.jpg" 
                alt="Phuc Nguyen"
                sx={{ 
                  width: 40, 
                  height: 40,
                  mr: 1.5,
                  border: '2px solid',
                  borderColor: 'primary.main' 
                }}
              />
              <Box>
                <Typography variant="subtitle1" fontWeight={600} lineHeight={1.2}>
                  Phuc Nguyen
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Web3 Developer
                </Typography>
              </Box>
            </Box>
            
            <IconButton onClick={onClose} color="primary">
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Divider sx={{ mb: 2 }} />
          
          {/* Navigation links */}
          <List sx={{ flexGrow: 1, px: 1 }}>
            {pages.map((page) => (
              <motion.div key={page.name} variants={itemVariants}>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    href={page.path}
                    onClick={onClose}
                    selected={router.pathname === page.path}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      mb: 0.5,
                      borderLeft: '4px solid',
                      borderColor: router.pathname === page.path 
                        ? 'primary.main' 
                        : 'transparent',
                      backgroundColor: router.pathname === page.path 
                        ? 'rgba(167, 139, 250, 0.1)'
                        : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(167, 139, 250, 0.05)',
                      }
                    }}
                  >
                    <ListItemIcon 
                      sx={{ 
                        minWidth: 40,
                        color: router.pathname === page.path 
                          ? 'primary.main' 
                          : 'text.secondary'
                      }}
                    >
                      {page.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={page.name} 
                      primaryTypographyProps={{
                        fontSize: '1rem',
                        fontWeight: router.pathname === page.path ? 600 : 400
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </motion.div>
            ))}
          </List>
          
          {/* Footer with theme toggle and social links */}
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Theme Mode
            </Typography>
            <ThemeToggle />
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="caption" color="text.secondary">
                © {new Date().getFullYear()} HPN Blog
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </AnimatePresence>
    </Drawer>
  );
};

export default MobileNavigation;