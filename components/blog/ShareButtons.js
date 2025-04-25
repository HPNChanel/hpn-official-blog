// components/blog/ShareButtons.js
import React, { useState } from 'react';
import { 
  Box, 
  IconButton, 
  Tooltip, 
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkIcon from '@mui/icons-material/Link';
import { motion } from 'framer-motion';

const MotionIconButton = motion(IconButton);
const MotionButton = motion(Button);

const ShareButtons = ({ 
  url, 
  title, 
  summary = '',
  variant = 'icon', // 'icon' or 'button'
}) => {
  const [copySuccess, setCopySuccess] = useState(false);
  
  const fullUrl = typeof window !== 'undefined' 
    ? url || window.location.href
    : url;
  
  const shareData = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl)
      .then(() => {
        setCopySuccess(true);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  if (variant === 'button') {
    return (
      <Box 
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          gap: 1,
          my: 2
        }}
      >
        <MotionButton
          variants={itemVariants}
          whileHover="hover"
          whileTap="tap"
          startIcon={<Box component="span" sx={{ fontSize: '1.2rem' }}>𝕏</Box>}
          href={shareData.twitter}
          target="_blank"
          rel="noopener noreferrer"
          size="small"
          sx={{
            color: '#1DA1F2',
            borderColor: '#1DA1F2',
            '&:hover': { borderColor: '#1DA1F2', backgroundColor: 'rgba(29, 161, 242, 0.1)' },
            textTransform: 'none',
            borderRadius: 2
          }}
          variant="outlined"
        >
          Share
        </MotionButton>
        
        <MotionButton
          variants={itemVariants}
          whileHover="hover"
          whileTap="tap"
          startIcon={<LinkedInIcon />}
          href={shareData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          size="small"
          sx={{
            color: '#0077B5',
            borderColor: '#0077B5',
            '&:hover': { borderColor: '#0077B5', backgroundColor: 'rgba(0, 119, 181, 0.1)' },
            textTransform: 'none',
            borderRadius: 2
          }}
          variant="outlined"
        >
          Share
        </MotionButton>
        
        <MotionButton
          variants={itemVariants}
          whileHover="hover"
          whileTap="tap"
          startIcon={<FacebookIcon />}
          href={shareData.facebook}
          target="_blank"
          rel="noopener noreferrer"
          size="small"
          sx={{
            color: '#4267B2',
            borderColor: '#4267B2',
            '&:hover': { borderColor: '#4267B2', backgroundColor: 'rgba(66, 103, 178, 0.1)' },
            textTransform: 'none',
            borderRadius: 2
          }}
          variant="outlined"
        >
          Share
        </MotionButton>
        
        <MotionButton
          variants={itemVariants}
          whileHover="hover"
          whileTap="tap"
          startIcon={<LinkIcon />}
          onClick={copyToClipboard}
          size="small"
          sx={{
            color: 'primary.main',
            borderColor: 'primary.main',
            '&:hover': { borderColor: 'primary.light', backgroundColor: 'rgba(167, 139, 250, 0.1)' },
            textTransform: 'none',
            borderRadius: 2
          }}
          variant="outlined"
        >
          Copy Link
        </MotionButton>
        
        <Snackbar 
          open={copySuccess} 
          autoHideDuration={3000} 
          onClose={() => setCopySuccess(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            severity="success" 
            onClose={() => setCopySuccess(false)}
            variant="filled"
            sx={{ width: '100%' }}
          >
            Link copied to clipboard!
          </Alert>
        </Snackbar>
      </Box>
    );
  }
  
  // Icon variant (default)
  return (
    <Box 
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{ 
        display: 'flex', 
        gap: 1 
      }}
    >
      <Tooltip title="Share on Twitter">
        <MotionIconButton
          variants={itemVariants}
          whileHover="hover"
          whileTap="tap"
          href={shareData.twitter}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Twitter"
          sx={{ 
            color: '#1DA1F2',
            '&:hover': { backgroundColor: 'rgba(29, 161, 242, 0.1)' }
          }}
        >
          <Box component="span" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>𝕏</Box>
        </MotionIconButton>
      </Tooltip>
      
      <Tooltip title="Share on LinkedIn">
        <MotionIconButton
          variants={itemVariants}
          whileHover="hover"
          whileTap="tap"
          href={shareData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          sx={{ 
            color: '#0077B5',
            '&:hover': { backgroundColor: 'rgba(0, 119, 181, 0.1)' } 
          }}
        >
          <LinkedInIcon />
        </MotionIconButton>
      </Tooltip>
      
      <Tooltip title="Share on Facebook">
        <MotionIconButton
          variants={itemVariants}
          whileHover="hover"
          whileTap="tap"
          href={shareData.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
          sx={{ 
            color: '#4267B2',
            '&:hover': { backgroundColor: 'rgba(66, 103, 178, 0.1)' } 
          }}
        >
          <FacebookIcon />
        </MotionIconButton>
      </Tooltip>
      
      <Tooltip title="Copy link">
        <MotionIconButton
          variants={itemVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={copyToClipboard}
          aria-label="Copy link"
          sx={{ 
            color: 'primary.main',
            '&:hover': { backgroundColor: 'rgba(167, 139, 250, 0.1)' } 
          }}
        >
          <LinkIcon />
        </MotionIconButton>
      </Tooltip>
      
      <Snackbar 
        open={copySuccess} 
        autoHideDuration={3000} 
        onClose={() => setCopySuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          onClose={() => setCopySuccess(false)}
          variant="filled"
          sx={{ width: '100%' }}
        >
          Link copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ShareButtons;