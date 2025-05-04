import React from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { containsVietnamese } from '../lib/typography';

// Styled typography component optimized for Vietnamese text
const StyledTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isVietnamese'
})(({ isVietnamese, theme }) => ({
  ...(isVietnamese && {
    fontFamily: 'var(--font-vietnamese)',
    lineHeight: 'var(--line-height-vietnamese)',
    letterSpacing: 'var(--letter-spacing-vietnamese)',
  }),
  ...(isVietnamese && props.variant && props.variant.includes('h') && {
    lineHeight: 'var(--line-height-vietnamese-heading)',
    letterSpacing: 'var(--letter-spacing-vietnamese-heading)',
  }),
}));

/**
 * Typography component that optimizes rendering for Vietnamese text
 */
const VietnameseTypography = ({ children, lang, ...props }) => {
  // Check if content is Vietnamese if lang is not explicitly set
  const isVietnamese = lang === 'vi' || (!lang && typeof children === 'string' && containsVietnamese(children));
  
  return (
    <StyledTypography
      isVietnamese={isVietnamese}
      lang={isVietnamese ? 'vi' : lang}
      {...props}
    >
      {children}
    </StyledTypography>
  );
};

export default VietnameseTypography;
