import React from 'react';
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
import { format } from 'date-fns';
import { slugifyTag } from '../lib/posts';

export default function Custom404({ recentPosts = [] }) {
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
                top: { xs: '5%', md: '15%' }, 
                left: { xs: '5%', md: '15%' },
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(167, 139, 250, 0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: -1,
              }}
            />
            
            <Box 
              sx={{ 
                position: 'absolute', 
                bottom: { xs: '5%', md: '10%' }, 
                right: { xs: '5%', md: '15%' },
                width: '250px',
                height: '250px',
                background: 'radial-gradient(circle, rgba(96, 165, 250, 0.08) 0%, transparent 70%)',
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
                background: 'linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                textShadow: '0 0 40px rgba(96, 165, 250, 0.5)',
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
                  background: 'linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)',
                  borderRadius: '4px',
                }
              }}
            >
              404
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
              Oops! This page has vanished into the digital ether.
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
              The page you&apos;re looking for may have been moved, deleted, or perhaps never existed in this universe.
              Let&apos;s get you back to familiar territory.
            </Typography>

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

            {/* Suggested posts section */}
            {recentPosts.length > 0 && (
              <Box 
                sx={{ 
                  mt: 10, 
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
                  {recentPosts.map((post) => (
                    <Grid item xs={12} sm={6} md={4} key={post.id}>
                      <Link href={`/posts/${post.id}`} passHref legacyBehavior>
                        <CardActionArea component="a" sx={{ height: '100%' }}>
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
                                }}
                              >
                                {post.description || post.excerpt}
                              </Typography>
                            </CardContent>
                          </Card>
                        </CardActionArea>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}

// Get recent posts to suggest on the 404 page
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