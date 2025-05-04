import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Section - A consistent section component with proper spacing and structure
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Section content
 * @param {string} props.title - Section title
 * @param {string} props.subtitle - Section subtitle
 * @param {boolean} props.centered - Center align content
 * @param {'small'|'medium'|'large'} props.spacing - Vertical spacing size
 * @param {Object} props.sx - Additional styles
 * @param {string} props.id - Section ID for navigation
 * @param {function} props.titleComponent - Custom title component
 */
const Section = ({
  children,
  title,
  subtitle,
  centered = false,
  spacing = 'medium',
  sx = {},
  id,
  titleComponent,
  ...rest
}) => {
  // Calculate spacing values
  const spacingMap = {
    small: { py: { xs: 4, md: 6 } },
    medium: { py: { xs: 6, md: 10 } },
    large: { py: { xs: 8, md: 12 } },
  };
  
  const sectionSpacing = spacingMap[spacing] || spacingMap.medium;
  
  return (
    <Box
      component="section"
      id={id}
      sx={{
        width: '100%',
        position: 'relative',
        ...sectionSpacing,
        ...sx,
      }}
      {...rest}
    >
      <Container maxWidth="lg">
        {/* Section header */}
        {(title || subtitle || titleComponent) && (
          <Box
            sx={{
              mb: { xs: 4, md: 6 },
              textAlign: centered ? 'center' : 'left',
              mx: centered ? 'auto' : 0,
            }}
          >
            {titleComponent || (
              <>
                {title && (
                  <Typography
                    variant="h2"
                    component="h2"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      position: 'relative',
                      display: 'inline-block',
                      mb: subtitle ? 2 : 'inherit',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: centered ? '60%' : '40%',
                        height: '4px',
                        bottom: '-8px',
                        left: centered ? '20%' : 0,
                        background: 'linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)',
                        borderRadius: '2px',
                      },
                    }}
                  >
                    {title}
                  </Typography>
                )}
                {subtitle && (
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{
                      maxWidth: centered ? '700px' : '100%',
                      mx: centered ? 'auto' : 0,
                    }}
                  >
                    {subtitle}
                  </Typography>
                )}
              </>
            )}
          </Box>
        )}
        
        {/* Section content */}
        <Box
          sx={{
            textAlign: centered ? 'center' : 'left',
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  centered: PropTypes.bool,
  spacing: PropTypes.oneOf(['small', 'medium', 'large']),
  sx: PropTypes.object,
  id: PropTypes.string,
  titleComponent: PropTypes.node,
};

export default React.memo(Section);
