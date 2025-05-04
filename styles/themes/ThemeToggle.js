import React, { memo, useMemo } from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import { motion } from 'framer-motion';
import { useTheme } from './context';

// Constants
const THEME_MODE_DARK = 'dark';
const THEME_MODE_LIGHT = 'light';
const THEME_MODE_SYSTEM = 'system';

// Styled motion component
const MotionIconButton = styled(motion.button)(({ theme }) => ({
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '50%',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 8,
  color: theme.palette.mode === 'dark' ? '#fff' : '#111827',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.05)',
  },
  '&:focus': {
    outline: 'none',
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
}));

const ThemeToggle = ({ variant = 'icon' }) => {
  const { themeMode, isDark, setThemeMode } = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  // Animation variants
  const iconVariants = useMemo(() => ({
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1, rotate: 0 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95, rotate: 15 },
  }), []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (mode) => {
    setThemeMode(mode);
    handleClose();
  };

  const currentIcon = useMemo(() => {
    if (themeMode === THEME_MODE_SYSTEM) {
      return <SettingsBrightnessIcon fontSize="small" />;
    }
    return isDark ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />;
  }, [themeMode, isDark]);

  const getTooltipTitle = () => {
    if (themeMode === THEME_MODE_SYSTEM) return 'Using system theme preference';
    return isDark ? 'Switch to light mode' : 'Switch to dark mode';
  };

  if (variant === 'icon') {
    return (
      <>
        <Tooltip title={getTooltipTitle()}>
          <MotionIconButton
            aria-label="Theme toggle"
            onClick={handleClick}
            aria-controls={open ? 'theme-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            variants={iconVariants}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {currentIcon}
          </MotionIconButton>
        </Tooltip>
        <Menu
          id="theme-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'theme-button',
            dense: true,
          }}
        >
          <MenuItem 
            selected={themeMode === THEME_MODE_LIGHT}
            onClick={() => handleThemeChange(THEME_MODE_LIGHT)}
          >
            <ListItemIcon>
              <LightModeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Light</ListItemText>
          </MenuItem>
          <MenuItem 
            selected={themeMode === THEME_MODE_DARK}
            onClick={() => handleThemeChange(THEME_MODE_DARK)}
          >
            <ListItemIcon>
              <DarkModeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Dark</ListItemText>
          </MenuItem>
          <MenuItem 
            selected={themeMode === THEME_MODE_SYSTEM}
            onClick={() => handleThemeChange(THEME_MODE_SYSTEM)}
          >
            <ListItemIcon>
              <SettingsBrightnessIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>System</ListItemText>
          </MenuItem>
        </Menu>
      </>
    );
  }

  // For other variants if implemented in the future
  return null;
};

// Use memo to prevent unnecessary re-renders
export default memo(ThemeToggle);
