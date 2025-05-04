import React from 'react';
import { Grid, Box } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * GridContainer - A responsive grid container with consistent spacing
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Grid items
 * @param {number} props.spacing - Grid spacing (multiplied by theme spacing)
 * @param {Object} props.sx - Additional styles
 * @param {'flex-start'|'center'|'flex-end'|'space-between'|'space-around'|'space-evenly'} props.justifyContent - Horizontal alignment
 * @param {'flex-start'|'center'|'flex-end'|'stretch'|'baseline'} props.alignItems - Vertical alignment
 * @param {number|string} props.maxWidth - Maximum width of container
 */
const GridContainer = ({
  children,
  spacing = 3,
  sx = {},
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  maxWidth = 'lg',
  ...rest
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: maxWidth === 'lg' ? '1200px' : maxWidth,
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 4 },
        ...sx,
      }}
      {...rest}
    >
      <Grid 
        container 
        spacing={spacing}
        justifyContent={justifyContent}
        alignItems={alignItems}
      >
        {children}
      </Grid>
    </Box>
  );
};

GridContainer.propTypes = {
  children: PropTypes.node.isRequired,
  spacing: PropTypes.number,
  sx: PropTypes.object,
  justifyContent: PropTypes.oneOf([
    'flex-start',
    'center',
    'flex-end',
    'space-between',
    'space-around',
    'space-evenly',
  ]),
  alignItems: PropTypes.oneOf([
    'flex-start',
    'center',
    'flex-end',
    'stretch',
    'baseline',
  ]),
  maxWidth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default React.memo(GridContainer);
