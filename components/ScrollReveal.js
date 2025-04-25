import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ScrollReveal = ({ 
  children, 
  threshold = 0.1, 
  animation = "fade-up", // Options: fade-up, fade-in, slide-left, slide-right, zoom
  delay = 0,
  duration = 0.5,
  once = true,
  ...props 
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ 
    threshold,
    triggerOnce: once,
  });

  // Animation variants
  const variants = {
    hidden: {
      opacity: 0,
      y: animation === 'fade-up' ? 40 : 0,
      x: animation === 'slide-left' ? 40 : animation === 'slide-right' ? -40 : 0,
      scale: animation === 'zoom' ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: "easeOut"
      }
    }
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, inView, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;