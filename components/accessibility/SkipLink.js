import React from 'react';
import { styled } from '@mui/material/styles';

const StyledSkipLink = styled('a')(({ theme }) => ({
  position: 'absolute',
  top: '-50px',
  left: 0,
  padding: '8px 16px',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  fontWeight: 600,
  zIndex: 9999,
  transition: 'top 0.3s',
  '&:focus': {
    top: 0,
    outline: `2px solid ${theme.palette.secondary.main}`,
    outlineOffset: 2,
  },
}));

/**
 * Skip navigation link for keyboard accessibility
 */
const SkipLink = ({ targetId = 'main-content', text = 'Skip to content' }) => {
  return (
    <StyledSkipLink href={`#${targetId}`}>
      {text}
    </StyledSkipLink>
  );
};

export default SkipLink;
