// components/blog/NewsletterSignup.js
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { motion } from 'framer-motion';

const NewsletterSignup = ({ 
  title = "Subscribe to my newsletter", 
  description = "Get the latest posts and updates delivered to your inbox.",
  compact = false
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // You would implement your actual signup logic here
      // This is a placeholder implementation
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Log for demonstration
      console.log(`Newsletter signup with email: ${email}`);
      
      // Show success message
      setSuccess(true);
      setEmail('');
    } catch (err) {
      setError('Failed to subscribe. Please try again later.');
      console.error('Newsletter signup error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3
      }
    }
  };
  
  if (compact) {
    return (
      <Box
        component={motion.form}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          gap: 1,
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error}
          helperText={error}
          disabled={loading || success}
          fullWidth
          sx={{ flexGrow: 1 }}
          inputProps={{ 
            'aria-label': 'Email address',
            style: { fontSize: '0.9rem' }
          }}
        />
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading || success}
          sx={{
            textTransform: 'none',
            minWidth: '120px',
            fontWeight: 600,
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : success ? (
            'Subscribed ✓'
          ) : (
            'Subscribe'
          )}
        </Button>
        
        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            severity="success" 
            onClose={() => setSuccess(false)}
          >
            Successfully subscribed to the newsletter!
          </Alert>
        </Snackbar>
      </Box>
    );
  }
  
  // Full version
  return (
    <Paper
      component={motion.form}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit}
      elevation={2}
      sx={{
        p: 4,
        borderRadius: 3,
        backgroundImage: 'linear-gradient(135deg, rgba(167, 139, 250, 0.1) 0%, rgba(96, 165, 250, 0.1) 100%)',
        border: '1px solid rgba(167, 139, 250, 0.2)',
      }}
    >
      <Box 
        component={motion.div}
        variants={itemVariants}
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1.5,
          mb: 2
        }}
      >
        <MailOutlineIcon 
          sx={{ 
            fontSize: 28, 
            color: 'primary.main',
            filter: 'drop-shadow(0 0 2px rgba(167, 139, 250, 0.5))'
          }} 
        />
        <Typography variant="h5" component="h3" fontWeight={600}>
          {title}
        </Typography>
      </Box>
      
      <Typography
        component={motion.p}
        variants={itemVariants}
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        {description}
      </Typography>
      
      <Box 
        component={motion.div}
        variants={itemVariants}
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2 
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Enter your email address"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error}
          helperText={error}
          disabled={loading || success}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                borderWidth: 2,
              },
            },
          }}
        />
        
        <Button
          type="submit"
          variant="contained"
          disabled={loading || success}
          sx={{
            px: 3,
            py: 1.5,
            borderRadius: 2,
            background: 'linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)',
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: '0 4px 10px rgba(96, 165, 250, 0.4)',
            minWidth: { xs: '100%', sm: '150px' },
            '&:hover': {
              boxShadow: '0 6px 15px rgba(96, 165, 250, 0.5)',
            },
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : success ? (
            'Subscribed ✓'
          ) : (
            'Subscribe'
          )}
        </Button>
      </Box>
      
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          onClose={() => setSuccess(false)}
        >
          Successfully subscribed to the newsletter!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default NewsletterSignup;