import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Brightness4Icon from '@mui/icons-material/Brightness4';  // Moon icon
import Brightness7Icon from '@mui/icons-material/Brightness7';  // Sun icon
import { motion } from 'framer-motion';
import { useTheme } from '../styles/themes/context';

// Wrap IconButton with motion
const MotionIconButton = motion(IconButton);

const ThemeToggle = () => {
  const { isLight, toggleTheme } = useTheme();
  
  // Animation variants for the icon
  const iconVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, rotate: 0 },
    rotate: { rotate: 180 },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 }
  };

  return (
    <Tooltip title={isLight ? "Switch to dark mode" : "Switch to light mode"}>
      <MotionIconButton
        onClick={toggleTheme}
        color="inherit"
        aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        variants={iconVariants}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        sx={{
          background: isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
          '&:hover': {
            background: isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
          }
        }}
      >
        {isLight ? (
          <Brightness4Icon sx={{ color: '#6366f1' }} />
        ) : (
          <Brightness7Icon sx={{ color: '#ffff00' }} />
        )}
      </MotionIconButton>
    </Tooltip>
  );
};

export default ThemeToggle;