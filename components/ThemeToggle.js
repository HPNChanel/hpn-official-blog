import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Brightness4Icon from '@mui/icons-material/Brightness4';  // Moon icon
import Brightness7Icon from '@mui/icons-material/Brightness7';  // Sun icon
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '../styles/themes/context';
import { styled } from '@mui/material/styles';

// Styled component for the toggle with animation effects
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '50%',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.08)' 
      : 'rgba(0, 0, 0, 0.04)',
    transform: 'scale(1.05)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    top: 0,
    left: 0,
    background: theme.palette.mode === 'dark'
      ? 'radial-gradient(circle, rgba(138, 133, 255, 0.1) 0%, transparent 70%)'
      : 'radial-gradient(circle, rgba(0, 179, 255, 0.1) 0%, transparent 70%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover::after': {
    opacity: 1,
  },
}));

const ThemeToggle = () => {
  const { isLight, toggleTheme } = useTheme();
  const theme = useMuiTheme();

  return (
    <Tooltip title={isLight ? "Switch to dark mode" : "Switch to light mode"}>
      <StyledIconButton
        onClick={toggleTheme}
        color="inherit"
        aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
        sx={{
          color: isLight 
            ? theme.palette.primary.main 
            : '#ffffff',
          '&:hover': {
            color: theme.palette.primary.light,
          }
        }}
      >
        {isLight ? <Brightness4Icon /> : <Brightness7Icon />}
      </StyledIconButton>
    </Tooltip>
  );
};

export default ThemeToggle;