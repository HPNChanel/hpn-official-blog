import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LabelIcon from '@mui/icons-material/Label';
import { getAllTags, slugifyTag } from '../../lib/posts';

export default function TagsIndex({ tags }) {
  // Convert tags object to array for easier rendering
  const tagsList = Object.entries(tags).map(([slug, data]) => ({
    slug,
    name: data.name,
    count: data.count
  }));
  
  // Sort tags by post count (descending)
  tagsList.sort((a, b) => b.count - a.count);

  return (
    <>
      <Head>
        <title>Browse by Tags | My Blog</title>
        <meta name="description" content="Browse all blog posts by topic tags" />
      </Head>

      <Box sx={{ mb: 6 }}>
        <Box sx={{ mb: 4, mt: 2 }}>
          <Link href="/blog" passHref legacyBehavior>
            <Button 
              component="a"
              startIcon={<ArrowBackIcon />}
              sx={{
                mb: 2,
                backgroundColor: 'rgba(167, 139, 250, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(167, 139, 250, 0.2)',
                },
                borderRadius: 2,
                textTransform: 'none',
              }}
            >
              Back to Blog
            </Button>
          </Link>

          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            Browse by Tags
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Select a tag to view all related posts
          </Typography>
        </Box>
        
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(167, 139, 250, 0.2)',
          }}
        >
          <Grid container spacing={2}>
            {tagsList.map((tag) => (
              <Grid item key={tag.slug}>
                <Link href={`/tags/${tag.slug}`} passHref legacyBehavior>
                  <Chip
                    component="a"
                    icon={<LabelIcon />}
                    label={`${tag.name} (${tag.count})`}
                    clickable
                    sx={{
                      backgroundColor: 'rgba(167, 139, 250, 0.15)',
                      color: 'white',
                      borderRadius: 2,
                      padding: 0.5,
                      fontSize: '0.9rem',
                      '&:hover': {
                        backgroundColor: 'rgba(167, 139, 250, 0.3)',
                        boxShadow: '0 0 10px rgba(167, 139, 250, 0.3)',
                      },
                    }}
                  />
                </Link>
              </Grid>
            ))}
            
            {tagsList.length === 0 && (
              <Box sx={{ p: 4, textAlign: 'center', width: '100%' }}>
                <Typography variant="body1" color="text.secondary">
                  No tags found. Add tags to your blog posts to see them here.
                </Typography>
              </Box>
            )}
          </Grid>
        </Paper>
      </Box>
    </>
  );
}

export async function getStaticProps() {
  // Dynamically import server-side code
  const { getAllTags } = await import('../../lib/posts.server');
  const tags = getAllTags();

  return {
    props: {
      tags,
    },
  };
}