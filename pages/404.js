// pages/404.js
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  },
};

// Numbers for the 404 animation
const numberVariants = {
  hidden: { 
    opacity: 0,
    y: -100,
    rotateZ: -20,
  },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    rotateZ: 0,
    transition: { 
      type: 'spring', 
      stiffness: 300, 
      damping: 20,
      delay: custom * 0.15
    }
  }),
  hover: {
    y: [0, -20, 0],
    color: ['#a78bfa', '#60a5fa', '#a78bfa'],
    transition: { 
      y: { type: 'spring', stiffness: 200, damping: 10, repeat: Infinity, repeatType: 'loop', duration: 2 },
      color: { duration: 2, repeat: Infinity, repeatType: 'reverse' }
    }
  }
};

// Glowing particle animation
const ParticleEffect = () => {
  // Generate random particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 15 + 5,
    duration: Math.random() * 10 + 5,
    delay: Math.random() * 5,
  }));

  return (
    <Box
      sx={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      {particles.map((particle) => (
        <Box
          component={motion.div}
          key={particle.id}
          initial={{ 
            x: `${particle.x}%`, 
            y: `${particle.y}%`, 
            opacity: 0,
            scale: 0
          }}
          animate={{
            x: [`${particle.x}%`, `${(particle.x + 10) % 100}%`],
            y: [`${particle.y}%`, `${(particle.y + 10) % 100}%`],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut'
          }}
          sx={{
            position: 'absolute',
            width: particle.size,
            height: particle.size,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(167, 139, 250, 0.7) 0%, rgba(96, 165, 250, 0) 70%)',
            filter: 'blur(4px)',
          }}
        />
      ))}
    </Box>
  );
};

export default function Custom404({ recentPosts = [] }) {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Head>

      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(circle at 30% 30%, rgba(167, 139, 250, 0.1) 0%, transparent 45%), radial-gradient(circle at 70% 80%, rgba(96, 165, 250, 0.05) 0%, transparent 40%)",
            zIndex: -1,
          },
        }}
      >
        {/* Animated particle effect */}
        <ParticleEffect />
        
        <Container maxWidth="lg">
          <Box
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            sx={{
              textAlign: 'center',
              py: 8,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Animated 404 text */}
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                mb: 4,
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {['4', '0', '4'].map((digit, index) => (
                <Typography
                  component={motion.h1}
                  key={index}
                  variants={numberVariants}
                  custom={index}
                  initial="hidden"
                  whileHover="hover"
                  animate={isHovering ? 'hover' : 'visible'}
                  sx={{
                    fontSize: { xs: '8rem', sm: '12rem', md: '16rem' },
                    fontWeight: 800,
                    lineHeight: 1,
                    background: 'linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 40px rgba(96, 165, 250, 0.5)',
                    mx: { xs: -1, sm: -2 },
                  }}
                >
                  {digit}
                </Typography>
              ))}
            </Box>

            <motion.div variants={itemVariants}>
              <Typography 
                variant="h4" 
                component="h2" 
                gutterBottom
                sx={{
                  mt: 2,
                  mb: 3,
                  fontWeight: 600,
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                }}
              >
                Oops! This page has vanished into the digital ether.
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ 
                  maxWidth: '600px', 
                  mb: 5,
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                  px: 2,
                  mx: 'auto'
                }}
              >
                The page you&apos;re looking for may have been moved, deleted, or perhaps never existed in this universe.
                Let&apos;s get you back to familiar territory.
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  justifyContent: 'center',
                  mb: 8,
                }}
              >
                <Button
                  component={Link}
                  href="/"
                  variant="contained"
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    borderRadius: '12px',
                    background: 'linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)',
                    fontSize: '1.1rem',
                    px: 4,
                    py: 1.5,
                    boxShadow: '0 0 20px rgba(96, 165, 250, 0.3)',
                    transition: 'all 0.3s ease',
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 10px 25px rgba(96, 165, 250, 0.5)',
                    },
                  }}
                >
                  Back to Home
                </Button>

                <Button
                  component={Link}
                  href="/blog"
                  variant="outlined"
                  startIcon={<SearchIcon />}
                  sx={{
                    borderRadius: '12px',
                    borderColor: '#a78bfa',
                    borderWidth: '2px',
                    color: '#a78bfa',
                    fontSize: '1.1rem',
                    px: 4,
                    py: 1.3,
                    textTransform: 'none',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#60a5fa',
                      backgroundColor: 'rgba(167, 139, 250, 0.08)',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 20px rgba(167, 139, 250, 0.2)',
                    },
                  }}
                >
                  Browse Articles
                </Button>
              </Box>
            </motion.div>

            {/* Path animation */}
            <Box 
              component={motion.div}
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              sx={{ my: 6, opacity: 0.6 }}
            >
              <svg width="200" height="50" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M10 25C10 25 40 5 100 25C160 45 190 25 190 25"
                  stroke="url(#paint0_linear)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="paint0_linear" x1="10" y1="25" x2="190" y2="25" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#a78bfa" />
                    <stop offset="1" stopColor="#60a5fa" />
                  </linearGradient>
                </defs>
              </svg>
            </Box>

            {/* Suggested posts section */}
            {recentPosts.length > 0 && (
              <motion.div variants={itemVariants}>
                <Box 
                  sx={{ 
                    mt: 4, 
                    width: '100%',
                    background: 'rgba(15, 23, 42, 0.3)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '24px',
                    p: { xs: 3, md: 5 },
                    border: '1px solid rgba(167, 139, 250, 0.1)',
                  }}
                >
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ 
                      mb: 4, 
                      fontWeight: 600,
                      color: '#fff',
                      textAlign: 'center',
                      position: 'relative',
                      display: 'inline-block',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '60px',
                        height: '3px',
                        bottom: '-10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)',
                        borderRadius: '2px',
                      }
                    }}
                  >
                    Explore these posts instead
                  </Typography>

                  <Grid container spacing={3} justifyContent="center">
                    {recentPosts.map((post, index) => (
                      <Grid item xs={12} sm={6} md={4} key={post.id}>
                        <motion.div
                          variants={itemVariants}
                          custom={index + 3} // Start after main content animations
                        >
                          <Link href={`/posts/${post.id}`} passHref legacyBehavior>
                            <CardActionArea 
                              component="a" 
                              sx={{ 
                                height: '100%',
                                borderRadius: '16px',
                                overflow: 'hidden',
                              }}
                            >
                              <Card
                                elevation={2}
                                sx={{
                                  height: '100%',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  borderRadius: '16px',
                                  transition: 'all 0.3s ease',
                                  background: 'rgba(15, 23, 42, 0.5)',
                                  backdropFilter: 'blur(10px)',
                                  border: '1px solid rgba(167, 139, 250, 0.1)',
                                  overflow: 'hidden',
                                  '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2), 0 0 15px rgba(167, 139, 250, 0.2)',
                                  },
                                  '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '4px',
                                    background: 'linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)',
                                  },
                                }}
                              >
                                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                                  <Typography
                                    variant="h6"
                                    component="h4"
                                    gutterBottom
                                    sx={{
                                      fontWeight: 700,
                                      mb: 1,
                                      display: '-webkit-box',
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: 'vertical',
                                      overflow: 'hidden',
                                      height: '3rem',
                                    }}
                                  >
                                    {post.title}
                                  </Typography>
                                  
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ mb: 2, display: 'block' }}
                                  >
                                    {format(new Date(post.date), 'MMMM d, yyyy')}
                                  </Typography>
                                  
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                      display: '-webkit-box',
                                      WebkitLineClamp: 3,
                                      WebkitBoxOrient: 'vertical',
                                      overflow: 'hidden',
                                      mb: 2,
                                      height: '4.5rem',
                                    }}
                                  >
                                    {post.description || post.excerpt}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </CardActionArea>
                          </Link>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </motion.div>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export async function getStaticProps() {
  try {
    // Dynamically import the server-only function
    const { getSortedPostsData } = await import('../lib/posts.server');
    
    // Get 3 most recent posts
    const recentPosts = getSortedPostsData().slice(0, 3);
    
    return {
      props: {
        recentPosts,
      },
    };
  } catch (error) {
    // Fallback in case posts.server.js cannot be imported
    return {
      props: {
        recentPosts: [],
      },
    };
  }
}