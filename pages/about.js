import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
// Icons for skills
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import CloudIcon from '@mui/icons-material/Cloud';
import LayersIcon from '@mui/icons-material/Layers';
import TokenIcon from '@mui/icons-material/Token';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import GitHubIcon from '@mui/icons-material/GitHub';

// Create styled QuoteBox component
const QuoteBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 3,
  backgroundColor: 'rgba(167, 139, 250, 0.05)',
  border: '1px solid rgba(167, 139, 250, 0.1)',
  marginBottom: theme.spacing(4),
  position: 'relative',
  '&::before': {
    content: '"\\201C"', // Opening quotation mark with proper escaping
    display: 'block',
    position: 'absolute',
    fontFamily: 'Georgia, serif',
    fontSize: '6rem',
    color: theme.palette.primary.main,
    opacity: 0.2,
    top: '-2rem',
    left: '-1rem',
  },
  '&::after': {
    content: '"\\201D"', // Closing quotation mark with proper escaping
    display: 'block',
    position: 'absolute',
    fontFamily: 'Georgia, serif',
    fontSize: '6rem',
    color: theme.palette.primary.main,
    opacity: 0.2,
    bottom: '-5rem',
    right: '-1rem',
  },
}));

export default function About() {
  // Skills data with icons
  const skills = [
    { name: 'Frontend', description: 'React, Next.js, Material UI', icon: <CodeIcon fontSize="large" /> },
    { name: 'Backend', description: 'Node.js, Express, Django', icon: <StorageIcon fontSize="large" /> },
    { name: 'UI/UX', description: 'Figma, Adobe XD, Responsive Design', icon: <DesignServicesIcon fontSize="large" /> },
    { name: 'DevOps', description: 'CI/CD, Docker, AWS', icon: <IntegrationInstructionsIcon fontSize="large" /> },
    { name: 'Cloud', description: 'AWS, Google Cloud, Azure', icon: <CloudIcon fontSize="large" /> },
    { name: 'Architecture', description: 'Microservices, Serverless', icon: <LayersIcon fontSize="large" /> },
    { name: 'Blockchain', description: 'Ethereum, Solidity, Web3.js', icon: <TokenIcon fontSize="large" /> },
    { name: 'AI & ML', description: 'TensorFlow, PyTorch, NLP', icon: <AutoFixHighIcon fontSize="large" /> },
    { name: 'Version Control', description: 'Git, GitHub, GitLab', icon: <GitHubIcon fontSize="large" /> },
  ];

  // Personal values data
  const values = [
    {
      title: 'Continuous Learning',
      description: 'I believe in lifelong learning and constantly expanding my knowledge and skills in this ever-evolving tech landscape.',
    },
    {
      title: 'Problem Solving',
      description: 'I enjoy tackling complex problems and finding elegant, efficient solutions through creative thinking and collaboration.',
    },
    {
      title: 'Craftsmanship',
      description: 'I\'m committed to writing clean, maintainable code and building robust, scalable systems that stand the test of time.',
    },
    {
      title: 'Open Source',
      description: 'I value the open source community and strive to contribute back whenever possible to help advance technology for everyone.',
    },
  ];

  return (
    <>
      <Head>
        <title>About Me | Personal Blog</title>
        <meta name="description" content="Learn more about me, my journey, skills, and values as a developer and technologist." />
      </Head>

      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 4, md: 8 },
            mb: 8,
            mt: 4,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: { xs: 200, md: 280 },
              height: { xs: 200, md: 280 },
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: '0 0 25px rgba(167, 139, 250, 0.4)',
              border: '4px solid rgba(167, 139, 250, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Use Next Image component or fallback to Avatar */}
            <Avatar
              sx={{
                width: '100%',
                height: '100%',
                bgcolor: 'primary.dark',
              }}
              alt="Profile"
              src="/avatar.jpg"
            >
              JD {/* Fallback initials if image fails to load */}
            </Avatar>
          </Box>

          <Box>
            <Typography 
              variant="h2" 
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 20px rgba(96, 165, 250, 0.3)',
              }}
            >
              HPN Chanel
            </Typography>
            <Typography 
              variant="h5" 
              color="primary.light"
              gutterBottom
            >
              AI Engineer, Web3 Developer & Blockchain Enthusiast
            </Typography>
            <Typography 
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 500, mt: 2 }}
            >
              Welcome to my corner of the web. I&apos;m passionate about building cutting-edge applications 
              that bridge the gap between blockchain technology and user-friendly experiences.
            </Typography>
          </Box>
        </Box>

        {/* About Me Section */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h4" 
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 600,
              position: 'relative',
              display: 'inline-block',
              mb: 4,
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '60%',
                height: '4px',
                bottom: '-8px',
                left: '20%',
                backgroundColor: 'primary.main',
                borderRadius: '2px',
              }
            }}
          >
            My Story
          </Typography>

          <Paper 
            elevation={3} 
            sx={{
              p: 4, 
              borderRadius: 3,
              backgroundColor: 'background.paper',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
              mb: 4,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography 
              variant="body1" 
              gutterBottom
              sx={{ mb: 2, lineHeight: 1.8 }}
            >
              My journey into the world of web development began over a decade ago when I built 
              my first website using HTML and CSS. As technology evolved, so did my passion for 
              creating digital experiences that not only look amazing but also solve real-world problems. 
              I&apos;ve since specialized in modern JavaScript frameworks like React and Next.js, while 
              simultaneously diving deep into the blockchain ecosystem.
            </Typography>
            <Typography 
              variant="body1"
              sx={{ lineHeight: 1.8 }}
            >
              After working with several startups and established companies, I&apos;ve developed a 
              unique approach to building applications that combine technical excellence with 
              user-centered design. Today, I focus on creating Web3 applications that make 
              blockchain technology accessible to everyone while pushing the boundaries of what&apos;s 
              possible in this rapidly evolving space.
            </Typography>
          </Paper>
        </Box>

        {/* Skills Section */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h4" 
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 600,
              position: 'relative',
              display: 'inline-block',
              mb: 4,
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '60%',
                height: '4px',
                bottom: '-8px',
                left: '20%',
                backgroundColor: 'primary.main',
                borderRadius: '2px',
              }
            }}
          >
            Technical Skills
          </Typography>

          <Grid container spacing={3}>
            {skills.map((skill, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  elevation={2}
                  sx={{
                    height: '100%',
                    borderRadius: 2,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 20px rgba(167, 139, 250, 0.3)',
                    },
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardContent sx={{ p: 3, flexGrow: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        color: 'primary.main',
                      }}
                    >
                      {skill.icon}
                      <Typography 
                        variant="h6" 
                        component="h3"
                        sx={{ ml: 1, fontWeight: 600 }}
                      >
                        {skill.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {skill.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Values Section */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h4" 
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 600,
              position: 'relative',
              display: 'inline-block',
              mb: 4,
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '60%',
                height: '4px',
                bottom: '-8px',
                left: '20%',
                backgroundColor: 'primary.main',
                borderRadius: '2px',
              }
            }}
          >
            My Values & Vision
          </Typography>
          
          {/* Quote Box */}
          <QuoteBox>
            <Typography 
              variant="h6" 
              align="center" 
              gutterBottom
              sx={{ mb: 3, fontStyle: 'italic' }}
            >
              Technology is most powerful when it empowers everyone. I strive to create solutions that are accessible, secure, and make a positive impact.
            </Typography>
          </QuoteBox>
          
          <Grid container spacing={3}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card
                  elevation={2}
                  sx={{
                    height: '100%',
                    borderRadius: 2,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 0 15px rgba(167, 139, 250, 0.4)',
                      borderLeft: '4px solid',
                      borderColor: 'primary.main',
                    },
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardContent sx={{ p: 3, flexGrow: 1 }}>
                    <Typography 
                      variant="h6" 
                      component="h3"
                      gutterBottom
                      sx={{ fontWeight: 600, color: 'primary.light' }}
                    >
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Future Goals Section */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h4" 
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 600,
              position: 'relative',
              display: 'inline-block',
              mb: 4,
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '60%',
                height: '4px',
                bottom: '-8px',
                left: '20%',
                backgroundColor: 'primary.main',
                borderRadius: '2px',
              }
            }}
          >
            Future Goals
          </Typography>

          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 3,
              background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.1) 0%, rgba(96, 165, 250, 0.1) 100%)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(167, 139, 250, 0.2)',
            }}
          >
            <Typography 
              variant="body1" 
              sx={{ mb: 2, lineHeight: 1.8 }}
            >
              Looking ahead, I&apos;m excited to continue exploring the intersection of blockchain 
              technology and user experience design. I aim to contribute to making Web3 technologies 
              more accessible and user-friendly for everyone, not just tech enthusiasts.
            </Typography>
            
            <Typography 
              variant="body1"
              sx={{ lineHeight: 1.8 }}
            >
              I&apos;m particularly interested in developing solutions for:
            </Typography>
            
            <Box component="ul" sx={{ pl: 4 }}>
              <Typography component="li" sx={{ mb: 1 }}>Decentralized identity systems that prioritize privacy and security</Typography>
              <Typography component="li" sx={{ mb: 1 }}>Community-owned platforms that distribute value fairly to all participants</Typography>
              <Typography component="li" sx={{ mb: 1 }}>Educational resources that demystify blockchain and make it approachable</Typography>
              <Typography component="li" sx={{ mb: 1 }}>Sustainable blockchain solutions with minimal environmental impact</Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
}