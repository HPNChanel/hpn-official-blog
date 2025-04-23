import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { slugifyTag } from '../../lib/posts';
import { getPostsByTag, getAllTagPaths } from '../../lib/posts.server';

export default function TagPage({ posts, tag }) {
  return (
    <>
      <Head>
        <title>Posts tagged with #{tag} | My Blog</title>
        <meta name="description" content={`All blog posts related to ${tag}`} />
      </Head>

      <Box sx={{ mb: 6 }}>
        <Box sx={{ mb: 4, mt: 2 }}>
          <Link href="/tags" passHref legacyBehavior>
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
              All Tags
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
            Posts tagged with <Box component="span" sx={{ fontStyle: 'italic' }}>#{tag}</Box>
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Found {posts.length} post{posts.length !== 1 ? 's' : ''}
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Link href={`/posts/${post.id}`} passHref legacyBehavior>
                <CardActionArea component="a" sx={{ height: '100%' }}>
                  <Card 
                    elevation={2}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 2,
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: (theme) => `0 6px 20px ${theme.palette.primary.dark}40`,
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography 
                        variant="h6" 
                        component="h2" 
                        gutterBottom
                        sx={{
                          fontWeight: 700,
                          height: '3.5rem',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {post.title}
                      </Typography>
                      
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {format(new Date(post.date), 'MMMM d, yyyy')}
                      </Typography>
                      
                      {/* Tags */}
                      <Box 
                        onClick={(e) => e.stopPropagation()}
                        sx={{ 
                          display: 'flex', 
                          flexWrap: 'wrap', 
                          gap: 1, 
                          mb: 2
                        }}
                      >
                        {(post.tags || []).map((postTag) => (
                          <Chip
                            key={postTag}
                            label={postTag}
                            size="small"
                            sx={{
                              backgroundColor: slugifyTag(postTag) === slugifyTag(tag) 
                                ? 'rgba(167, 139, 250, 0.3)' 
                                : 'rgba(167, 139, 250, 0.1)',
                              color: '#a78bfa',
                              borderRadius: 1,
                              fontSize: '0.7rem',
                            }}
                          />
                        ))}
                      </Box>
                      
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{
                          height: '4.5rem',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {post.excerpt}
                      </Typography>
                    </CardContent>
                  </Card>
                </CardActionArea>
              </Link>
            </Grid>
          ))}
        </Grid>
        
        {posts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No posts found with this tag.
            </Typography>
            <Link href="/blog" passHref legacyBehavior>
              <Button
                component="a"
                variant="outlined"
                sx={{ mt: 2 }}
              >
                View all posts
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllTagPaths();
  
  return {
    paths,
    fallback: 'blocking', // Generate new tags on-demand
  };
}

export async function getStaticProps({ params }) {
  const { tag } = params;
  const posts = getPostsByTag(tag);
  
  // Find the original case version of the tag from the first post that has it
  const originalTag = posts.length > 0 
    ? posts[0].tags.find(t => slugifyTag(t) === tag) 
    : tag;
  
  return {
    props: {
      posts,
      tag: originalTag || tag,
    },
    revalidate: 3600,
  };
}