import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

// Styled component for the image container
const ImageContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isLoaded' && prop !== 'aspectRatio',
})(({ isLoaded, aspectRatio, theme }) => ({
  position: 'relative',
  width: '100%',
  height: 0,
  paddingBottom: `${aspectRatio}%`,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.3)' : 'rgba(226, 232, 240, 0.3)',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  transition: 'transform 0.3s ease',
  willChange: 'transform',
  '&:hover': {
    transform: 'scale(1.02)',
  },
  '& span': {
    willChange: 'opacity',
  }
}));

const OptimizedImage = ({
  src,
  alt = '',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  quality = 80,
  fill = true,
  width,
  height,
  aspectRatio = 56.25, // Default 16:9 aspect ratio
  blurDataURL,
  style,
  className,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle image load event
  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Determine if we should use placeholder blur effect
  const usePlaceholder = typeof blurDataURL === 'string' && blurDataURL !== '';

  return (
    <ImageContainer
      isLoaded={isLoaded}
      aspectRatio={aspectRatio}
      className={className}
      style={style}
      {...props}
    >
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        quality={quality}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleImageLoad}
        placeholder={usePlaceholder ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          transition: 'opacity 0.5s ease',
          opacity: isLoaded ? 1 : 0,
        }}
      />
    </ImageContainer>
  );
};

export default React.memo(OptimizedImage);