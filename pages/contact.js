import React, { useState } from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// Icons
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SendIcon from '@mui/icons-material/Send';

export default function Contact() {
  // Form state
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Form validation state
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  // Notification state
  const [showNotification, setShowNotification] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: false,
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {
      name: formValues.name.trim() === '',
      email: !/^\S+@\S+\.\S+$/.test(formValues.email),
      message: formValues.message.trim() === '',
    };
    
    setFormErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // In a real app, you would send the form data to a backend service
      console.log('Form submitted:', formValues);
      
      // Show success notification
      setShowNotification(true);
      
      // Reset form
      setFormValues({
        name: '',
        email: '',
        message: '',
      });
    }
  };

  // Handle notification close
  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <>
      <Head>
        <title>Contact Me | My Personal Blog</title>
        <meta name="description" content="Get in touch with me for collaboration, questions, or just to say hello." />
      </Head>

      <Container maxWidth="lg">
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          {/* Header Section */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                background: 'linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                textShadow: '0 0 30px rgba(96, 165, 250, 0.3)',
              }}
            >
              Let&apos;s Connect
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                maxWidth: 650,
                mx: 'auto',
                color: 'text.secondary',
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              Have a question, project idea, or just want to say hello? Feel free to reach out through the form below or connect with me on social media.
            </Typography>
          </Box>

          {/* Contact Grid */}
          <Grid container spacing={4}>
            {/* Contact Form */}
            <Grid item xs={12} md={7}>
              <Paper
                component="form"
                onSubmit={handleSubmit}
                elevation={3}
                sx={{
                  p: { xs: 3, sm: 4 },
                  borderRadius: 4,
                  background: 'rgba(15, 23, 42, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(167, 139, 250, 0.2)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ mb: 3, fontWeight: 600 }}
                >
                  Send a Message
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formValues.name}
                      onChange={handleInputChange}
                      error={formErrors.name}
                      helperText={formErrors.name ? "Name is required" : ""}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.main',
                            borderWidth: 2,
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.light',
                          },
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(167, 139, 250, 0.3)',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: 'primary.light',
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Email"
                      name="email"
                      type="email"
                      value={formValues.email}
                      onChange={handleInputChange}
                      error={formErrors.email}
                      helperText={formErrors.email ? "Please enter a valid email address" : ""}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.main',
                            borderWidth: 2,
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.light',
                          },
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(167, 139, 250, 0.3)',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: 'primary.light',
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      name="message"
                      multiline
                      rows={5}
                      value={formValues.message}
                      onChange={handleInputChange}
                      error={formErrors.message}
                      helperText={formErrors.message ? "Message is required" : ""}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.main',
                            borderWidth: 2,
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.light',
                          },
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(167, 139, 250, 0.3)',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: 'primary.light',
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      endIcon={<SendIcon />}
                      sx={{
                        borderRadius: '12px',
                        background: 'linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)',
                        fontSize: '1rem',
                        px: 4,
                        py: 1.2,
                        textTransform: 'none',
                        fontWeight: 600,
                        boxShadow: '0 0 15px rgba(96, 165, 250, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: '0 10px 25px rgba(96, 165, 250, 0.5)',
                        },
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Contact Info & Social Links */}
            <Grid item xs={12} md={5}>
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 3, sm: 4 },
                  borderRadius: 4,
                  background: 'rgba(15, 23, 42, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(167, 139, 250, 0.2)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ mb: 3, fontWeight: 600 }}
                >
                  Contact Information
                </Typography>

                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="body1"
                    sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.7 }}
                  >
                    Feel free to get in touch with me. I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                  </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ mb: 2, fontWeight: 600 }}
                  >
                    Email Me
                  </Typography>
                  
                  <Link 
                    href="mailto:phucnguyen20031976@gmail.com" 
                    underline="none"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: 'primary.light',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: 'primary.main',
                        textShadow: '0 0 8px rgba(167, 139, 250, 0.5)',
                      },
                    }}
                  >
                    <EmailIcon sx={{ mr: 1 }} />
                    <Typography variant="body1">phucnguyen20031976@gmail.com</Typography>
                  </Link>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ mb: 2, fontWeight: 600 }}
                  >
                    Follow Me
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="outlined"
                      startIcon={<GitHubIcon />}
                      href="https://github.com/yourusername"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        borderRadius: '10px',
                        borderColor: 'rgba(167, 139, 250, 0.5)',
                        color: 'primary.light',
                        px: 2,
                        py: 1,
                        textTransform: 'none',
                        '&:hover': {
                          borderColor: 'primary.main',
                          backgroundColor: 'rgba(167, 139, 250, 0.08)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      GitHub
                    </Button>
                    
                    <Button
                      variant="outlined"
                      startIcon={<LinkedInIcon />}
                      href="https://linkedin.com/in/yourusername"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        borderRadius: '10px',
                        borderColor: 'rgba(167, 139, 250, 0.5)',
                        color: 'primary.light',
                        px: 2,
                        py: 1,
                        textTransform: 'none',
                        '&:hover': {
                          borderColor: 'primary.main',
                          backgroundColor: 'rgba(167, 139, 250, 0.08)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      LinkedIn
                    </Button>
                  </Box>
                </Box>

                <Box sx={{ mt: 'auto' }}>
                  <Divider sx={{ mb: 3 }} />
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<FileDownloadIcon />}
                    href="/resume.pdf"
                    target="_blank"
                    sx={{
                      borderRadius: '12px',
                      background: 'rgba(167, 139, 250, 0.1)',
                      border: '2px solid rgba(167, 139, 250, 0.3)',
                      color: 'primary.light',
                      fontSize: '0.95rem',
                      py: 1.2,
                      textTransform: 'none',
                      fontWeight: 600,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'rgba(167, 139, 250, 0.2)',
                        borderColor: 'primary.main',
                        boxShadow: '0 0 15px rgba(167, 139, 250, 0.3)',
                      },
                    }}
                  >
                    Download My Resume
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Success Notification */}
      <Snackbar
        open={showNotification}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity="success" 
          variant="filled"
          sx={{ 
            width: '100%',
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          }}
        >
          Your message has been sent successfully!
        </Alert>
      </Snackbar>
    </>
  );
}