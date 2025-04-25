import React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
// Icons
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import dynamic from 'next/dynamic';

const ProjectChart = dynamic(
  () => import('../components/ProjectChart'),
  {
    loading: () => (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    ),
    ssr: false, // Disable server-side rendering if it's a client-only component
  }
);
export default function Portfolio() {
  // Project data
  const projects = [
    // Project 1: FinVerse
    {
      name: 'FinVerse',
      description: 'A comprehensive DeFi dashboard allowing users to track, analyze, and manage their cryptocurrency assets across various blockchain networks.',
      technologies: ['React', 'Blockchain', 'Web3.js', 'Material UI'],
      github: 'https://github.com/yourusername/finverse',
      demo: 'https://finverse-demo.example.com',
    },
    // Project 2: HPN Medicare
    {
      name: 'HPN Medicare',
      description: 'AI-powered health companion that analyzes medical records and offers personalized health insights using advanced machine learning algorithms.',
      technologies: ['Python', 'FastAPI', 'PyTorch', 'React'],
      github: 'https://github.com/yourusername/hpn-medicare',
      demo: 'https://hpn-medicare-demo.example.com',
    },
    // Project 3: EduTech
    {
      name: 'EduTech',
      description: 'Personalized AI learning system that adapts to students learning styles and pace, providing customized educational content and assessments.',
      technologies: ['Next.js', 'Node.js', 'TensorFlow.js', 'MongoDB'],
      github: 'https://github.com/yourusername/edutech',
      demo: 'https://edutech-demo.example.com',
    },
    // Project 4: AI Mentor
    {
      name: 'AI Mentor',
      description: 'Chat-based mentorship assistant using natural language processing to provide guidance, answer questions, and offer resources to learners.',
      technologies: ['Python', 'LangChain', 'OpenAI', 'Flask', 'React'],
      github: 'https://github.com/yourusername/ai-mentor',
      demo: 'https://ai-mentor-demo.example.com',
    },
  ];

  return (
    <>
      <Head>
        <title>Portfolio | My Personal Blog</title>
        <meta name="description" content="Explore my portfolio of projects in AI, blockchain, and full-stack development." />
      </Head>

      <Container maxWidth="lg">
        {/* Intro Section */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(96, 165, 250, 0.3)',
              mb: 2
            }}
          >
            Projects I&apos;ve Built
          </Typography>
          
          <Typography 
            variant="h6" 
            component="p" 
            color="text.secondary" 
            sx={{ maxWidth: 700, mx: 'auto' }}
          >
            I enjoy building innovative solutions at the intersection of artificial intelligence, 
            blockchain technology, and user-centered design. Here are some of my recent projects.
          </Typography>
        </Box>

        <Divider sx={{ mb: 6 }} />

        {/* Portfolio Grid */}
        <Grid container spacing={3}>
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                elevation={3}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 0 20px rgba(167, 139, 250, 0.4)',
                  },
                  overflow: 'hidden',
                  position: 'relative',
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
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
                    {project.name}
                  </Typography>
                  
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      minHeight: '4.5em', // Ensure consistent height for descriptions
                      lineHeight: 1.5,
                    }}
                  >
                    {project.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {project.technologies.map((tech, techIndex) => (
                      <Chip
                        key={techIndex}
                        label={tech}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(167, 139, 250, 0.1)',
                          color: '#a78bfa',
                          borderRadius: 1,
                          '&:hover': {
                            backgroundColor: 'rgba(167, 139, 250, 0.2)',
                          },
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
                
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    size="small"
                    startIcon={<GitHubIcon />}
                    sx={{
                      mr: 1,
                      borderRadius: 6,
                      px: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      textTransform: 'none',
                    }}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Code
                  </Button>
                  
                  <Button
                    size="small"
                    startIcon={<LaunchIcon />}
                    sx={{
                      borderRadius: 6,
                      px: 2,
                      background: 'linear-gradient(90deg, rgba(167, 139, 250, 0.1) 0%, rgba(96, 165, 250, 0.1) 100%)',
                      '&:hover': {
                        background: 'linear-gradient(90deg, rgba(167, 139, 250, 0.2) 0%, rgba(96, 165, 250, 0.2) 100%)',
                        boxShadow: '0 0 10px rgba(96, 165, 250, 0.3)',
                      },
                      textTransform: 'none',
                    }}
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Add Project Analytics Section */}
        <Box sx={{ mt: 8, mb: 6 }}>
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
            Project Analytics
          </Typography>
          
          <Grid container spacing={4}>
            {projects.slice(0, 2).map((project, index) => (
              <Grid item xs={12} md={6} key={`chart-${index}`}>
                <ProjectChart project={project} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* If you want to add a section for other/smaller projects */}
        <Box sx={{ mt: 8, mb: 4 }}>
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
            Other Projects
          </Typography>
          
          <Typography variant="body1" paragraph>
            I&apos;m always working on new ideas and exploring different technologies. 
            Check out my <a href="https://github.com/yourusername" 
            style={{ 
              color: '#a78bfa', 
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }} 
            target="_blank" 
            rel="noopener noreferrer">GitHub profile</a> to see more of my work, 
            including smaller projects and contributions to open source.
          </Typography>
        </Box>
      </Container>
    </>
  );
}