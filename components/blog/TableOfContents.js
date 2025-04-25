// components/blog/TableOfContents.js
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Link, 
  Paper, 
  Collapse,
  IconButton,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ListIcon from '@mui/icons-material/List';
import { motion, AnimatePresence } from 'framer-motion';

const TableOfContents = ({ headings }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeId, setActiveId] = useState('');
  const [expanded, setExpanded] = useState(!isMobile);
  
  // Track scroll position to highlight current section
  useEffect(() => {
    if (!headings || headings.length === 0) return;
    
    const handleScroll = () => {
      // Get all section elements
      const headingElements = headings.map(({ id }) => 
        document.getElementById(id)
      ).filter(Boolean);
      
      // Find the current visible heading
      let currentHeading = null;
      const scrollY = window.scrollY;
      
      // Find the last heading that has been scrolled past
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        // Get position relative to the viewport
        const rect = element.getBoundingClientRect();
        // Check if the element is above the middle of the viewport
        if (rect.top <= 150) {
          currentHeading = element;
          break;
        }
      }
      
      // Update active heading
      if (currentHeading) {
        setActiveId(currentHeading.id);
      } else if (headingElements.length > 0 && scrollY < 200) {
        // If near the top, highlight the first heading
        setActiveId(headingElements[0].id);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to set initial active heading
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  if (!headings || headings.length === 0) {
    return null;
  }
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  const listVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <Paper
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      elevation={1}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        background: 'rgba(15, 23, 42, 0.4)',
        backdropFilter: 'blur(5px)',
      }}
    >
      {/* Header with toggle */}
      <Box 
        sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: expanded ? '1px solid' : 'none',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ListIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h6" component="h3" sx={{ fontSize: '1rem', fontWeight: 600 }}>
            Table of Contents
          </Typography>
        </Box>
        
        <IconButton 
          onClick={toggleExpanded}
          size="small"
          sx={{ color: 'primary.main' }}
        >
          {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </Box>
      
      {/* Collapsible content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <List sx={{ py: 1, px: 2 }} dense>
              {headings.map((heading) => (
                <ListItem 
                  key={heading.id}
                  component="a"
                  href={`#${heading.id}`}
                  disablePadding
                  sx={{ 
                    mb: 0.5,
                    pl: (heading.level - 2) * 2, // Indent based on heading level
                    borderLeft: '2px solid',
                    borderColor: activeId === heading.id ? 'primary.main' : 'transparent',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(167, 139, 250, 0.08)',
                    }
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(heading.id);
                    if (element) {
                      // Smooth scroll to element
                      element.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                      // Update active ID
                      setActiveId(heading.id);
                      // Close TOC on mobile after clicking
                      if (isMobile) {
                        setExpanded(false);
                      }
                    }
                  }}
                >
                  <ListItemText 
                    primary={heading.text} 
                    primaryTypographyProps={{
                      color: activeId === heading.id ? 'primary.main' : 'text.primary',
                      fontWeight: activeId === heading.id ? 600 : 400,
                      variant: "body2",
                      sx: { 
                        transition: 'all 0.2s ease',
                        fontSize: heading.level === 2 ? '0.9rem' : '0.85rem',
                      }
                    }}
                    sx={{ py: 0.5 }}
                  />
                </ListItem>
              ))}
            </List>
          </motion.div>
        )}
      </AnimatePresence>
    </Paper>
  );
};

export default TableOfContents;