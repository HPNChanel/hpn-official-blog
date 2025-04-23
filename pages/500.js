import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import HomeIcon from '@mui/icons-material/Home';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function Custom500() {
  return (
    <>
      <Head>
        <title>500 - Server Error</title>
        <meta name="description" content="Something went wrong on our server." />
      </Head>

      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          minHeight: '100vh',
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(circle at 30% 30%, rgba(249, 115, 22, 0.1) 0%, transparent 45%), radial-gradient(circle at 70% 80%, rgba(239, 68, 68, 0.05) 0%, transparent 40%)",
            zIndex: -1,
          },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              minHeight: '70vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              py: 8,
            }}
          >
            {/* Decorative elements */}
            <Box 
              sx={{ 
                position: 'absolute', 
                top: { xs: '10%', md: '15%' }, 
                right: { xs: '10%', md: '15%' },
                width: '250px',
                height: '250px',
                background: 'radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: -1,
              }}
            />
            
            <Box 
              sx={{ 
                position: 'absolute', 
                bottom: { xs: '5%', md: '10%' }, 
                left: { xs: '5%', md: '15%' },
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(239, 68, 68, 0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: -1,
              }}
            />

            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '8rem', sm: '12rem', md: '16rem' },
                fontWeight: 800,
                lineHeight: 1,
                background: 'linear-gradient(90deg, #f59e0b 0%, #ef4444 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                textShadow: '0 0 40px rgba(239, 68, 68, 0.5)',
                letterSpacing: '-0.05em',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '80px',
                  height: '8px',
                  bottom: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(90deg, #f59e0b 0%, #ef4444 100%)',
                  borderRadius: '4px',
                }
              }}
            >
              500
            </Typography>

            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom
              sx={{
                mt: 4,
                mb: 3,
                fontWeight: 600,
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              }}
            >
              Oops! Our servers encountered an unexpected glitch.
            </Typography>

            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ 
                maxWidth: '600px', 
                mb: 5,
                fontSize: '1.1rem',
                lineHeight: 1.6,
                px: 2,
              }}
            >
              We&apos;re sorry for the inconvenience. Our team has been notified and is working
              to fix the issue. Please try again later or return to the homepage.
            </Typography>

            <Box 
              sx={{ 
                display: 'flex', 
                gap: 3, 
                flexWrap: 'wrap', 
                justifyContent: 'center',
                p: 2
              }}
            >
              <Button
                component={Link}
                href="/"
                variant="contained"
                startIcon={<HomeIcon />}
                sx={{
                  borderRadius: '12px',
                  background: 'linear-gradient(90deg, #f59e0b 0%, #ef4444 100%)',
                  fontSize: '1rem',
                  px: 3,
                  py: 1.2,
                  boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)',
                  transition: 'all 0.3s ease',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 10px 25px rgba(239, 68, 68, 0.5)',
                  },
                }}
              >
                Go to Homepage
              </Button>
              
              <Button
                onClick={() => window.location.reload()}
                variant="outlined"
                startIcon={<RefreshIcon />}
                sx={{
                  borderRadius: '12px',
                  borderColor: '#f59e0b',
                  borderWidth: '2px',
                  color: '#f59e0b',
                  fontSize: '1rem',
                  px: 3,
                  py: 1.1,
                  textTransform: 'none',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(249, 115, 22, 0.08)',
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                Try Again
              </Button>
            </Box>
            
            {/* Optional: Add an illustration here */}
            <Box
              sx={{
                mt: 8,
                position: 'relative',
                width: '100%',
                maxWidth: '400px',
                backgroundColor: 'rgba(15, 23, 42, 0.3)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                p: 4,
                border: '1px solid rgba(249, 115, 22, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontStyle: 'italic', mb: 2, textAlign: 'center' }}
              >
                &ldquo;The server is taking a short break to recharge. It will be back before you know it!&rdquo;
              </Typography>
              
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 600 }}
              >
                — The Dev Team
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}