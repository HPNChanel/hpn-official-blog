// components/OptimizedImage.js
import React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

// Styled component for the image container
const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  // Optional: add hover effect
  '&:hover .image-zoom': {
    transform: 'scale(1.05)',
  }
}));

// Create a reusable component for optimized images
const OptimizedImage = ({
  src,
  alt,
  width = 1200,
  height = 630,
  priority = false,
  placeholder = 'blur',
  blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEhgJAni+x0QAAAABJRU5ErkJggg==', // Tiny 1x1 transparent placeholder
  className = '',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  fill = false,
  style = {},
  effect = 'none', // 'none', 'zoom', 'fade'
  ...props
}) => {
  // Generate dynamic styles based on effect
  const getImageStyles = () => {
    let styles = {
      objectFit: 'cover',
      transition: 'all 0.5s ease',
    };
    
    if (effect === 'zoom') {
      styles.className = 'image-zoom';
    } else if (effect === 'fade') {
      styles.opacity = 0.9;
      styles['&:hover'] = {
        opacity: 1
      };
    }
    
    return styles;
  };

  return (
    <ImageContainer 
      className={className} 
      sx={{ 
        width: fill ? '100%' : width, 
        height: fill ? '100%' : height, 
        ...style 
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        priority={priority} // Set to true for above-the-fold images
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        sizes={sizes} // Responsive sizing
        fill={fill} // Use true if the parent has position: relative
        quality={85} // Adjust quality for better balance of quality/size
        style={getImageStyles()}
        {...props}
      />
    </ImageContainer>
  );
};

export default OptimizedImage;