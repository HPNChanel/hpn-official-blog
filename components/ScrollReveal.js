import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

// Use styled component for better performance
const RevealContainer = styled(motion.div)({
  willChange: 'transform, opacity',
});

const ScrollReveal = ({ 
  children, 
  threshold = 0.1,
  delay = 0,
  duration = 0.6,
  distance = 50,
  direction = 'up', // 'up', 'down', 'left', 'right'
  once = true,
  rootMargin = '0px 0px -10% 0px',
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  // Calculate initial transform based on direction
  const getInitialTransform = useCallback(() => {
    switch (direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: distance };
      case 'right': return { x: -distance };
      default: return { y: distance };
    }
  }, [distance, direction]);

  // Animation variants
  const variants = {
    hidden: { 
      opacity: 0, 
      ...getInitialTransform(),
      transition: { duration: 0 }
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0, 
      transition: { 
        duration, 
        delay, 
        ease: 'easeOut',
      }
    }
  };

  // Create and connect intersection observer
  useEffect(() => {
    const observerCallback = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (once && ref.current) {
          observer.unobserve(ref.current);
        }
      } else if (!once) {
        setIsVisible(false);
      }
    };

    const observerOptions = {
      root: null,
      rootMargin,
      threshold,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once, rootMargin]);

  return (
    <RevealContainer
      ref={ref}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants}
      {...props}
    >
      {children}
    </RevealContainer>
  );
};

export default React.memo(ScrollReveal);