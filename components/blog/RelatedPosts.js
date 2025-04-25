// components/blog/RelatedPosts.js
import React from 'react';
import Link from 'next/link';
import { 
  Box, 
  Typography, 
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Chip,
  Divider
} from '@mui/material';
import { format } from 'date-fns';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';
import { slugifyTag } from '../../lib/posts';

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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  },
  hover: {
    y: -10,
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2), 0 0 15px rgba(167, 139, 250, 0.2)",
    transition: { duration: 0.3 }
  }
};

const MotionCard = motion(Card);

const RelatedPosts = ({ 
  currentPostId, 
  allPosts, 
  currentTags = [],
  maxPosts = 3,
  title = "Related Posts"
}) => {
  // Find related posts based on tag similarity
  const getRelatedPosts = () => {
    // Filter out the current post
    const otherPosts = allPosts.filter(post => post.id !== currentPostId);
    
    if (currentTags.length === 0 || otherPosts.length === 0) {
      // If no tags or no other posts, return the most recent posts
      return otherPosts.slice(0, maxPosts);
    }
    
    // Calculate relevance score based on matching tags
    const postsWithScore = otherPosts.map(post => {
      const postTags = post.tags || [];
      let score = 0;
      
      // Count matching tags
      currentTags.forEach(tag => {
        if (postTags.includes(tag)) {
          score += 1;
        }
      });
      
      return { ...post, relevanceScore: score };
    });
    
    // Sort by relevance score (descending) and then by date if scores are equal
    const sortedPosts = postsWithScore.sort((a, b) => {
      if (b.relevanceScore !== a.relevanceScore) {
        return b.relevanceScore - a.relevanceScore;
      }
      
      // If relevance is the same, sort by date (newest first)
      return new Date(b.date) - new Date(a.date);
    });
    
    // Return the top related posts
    return sortedPosts.slice(0, maxPosts);
  };
  
  const relatedPosts = getRelatedPosts();
  
  if (relatedPosts.length === 0) {
    return null;
  }
  
  return (
    <Box 
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{ mt: 6, mb: 4 }}
    >
      <Typography 
        variant="h5" 
        component="h3" 
        sx={{ 
          mb: 3, 
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            width: 5,
            height: 24,
            backgroundColor: 'primary.main',
            marginRight: 2,
            borderRadius: 1,
          }
        }}
      >
        {title}
      </Typography>
      
      <Grid container spacing={3}>
        {relatedPosts.map((post, index) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Link href={`/posts/${post.id}`} passHref legacyBehavior>
              <CardActionArea component="a">
                <MotionCard
                  variants={cardVariants}
                  whileHover="hover"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid rgba(167, 139, 250, 0.1)',
                    background: 'rgba(15, 23, 42, 0.4)',
                    backdropFilter: 'blur(5px)',
                  }}
                >
                  <CardContent sx={{ p: 3, flexGrow: 1 }}>
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          gap: 1, 
                          mb: 2, 
                          flexWrap: 'wrap',
                        }}
                      >
                        {post.tags.slice(0, 2).map(tag => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(167, 139, 250, 0.15)',
                              color: '#a78bfa',
                              borderRadius: '6px',
                              fontSize: '0.7rem',
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              window.location.href = `/tags/${slugifyTag(tag)}`;
                            }}
                          />
                        ))}
                      </Box>
                    )}
                    
                    <Typography 
                      variant="h6" 
                      component="h4"
                      sx={{
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        height: '2.8rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        mb: 1,
                      }}
                    >
                      {post.title}
                    </Typography>
                    
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ display: 'block', mb: 1.5 }}
                    >
                      {format(new Date(post.date), 'MMMM d, yyyy')}
                    </Typography>
                    
                    <Divider sx={{ my: 1.5 }} />
                    
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 'auto',
                      }}
                    >
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: 'primary.main', 
                          display: 'flex', 
                          alignItems: 'center',
                        }}
                      >
                        Read more 
                        <ArrowForwardIcon sx={{ fontSize: '0.9rem', ml: 0.5 }} />
                      </Typography>
                    </Box>
                  </CardContent>
                </MotionCard>
              </CardActionArea>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RelatedPosts;