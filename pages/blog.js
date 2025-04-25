import React, { useState, useEffect } from 'react';
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
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { motion } from 'framer-motion';
import { slugifyTag } from '../lib/posts';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  hover: {
    y: -10,
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2), 0 0 15px rgba(167, 139, 250, 0.2)",
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

// Enhanced Blog Card Component
const EnhancedPostCard = React.memo(({ post, index }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Load favorites from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const favorites = JSON.parse(localStorage.getItem('blog-favorites') || '[]');
      setIsFavorite(favorites.includes(post.id));
    }
  }, [post.id]);
  
  // Toggle favorite status
  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (typeof window !== 'undefined') {
      const favorites = JSON.parse(localStorage.getItem('blog-favorites') || '[]');
      let newFavorites;
      
      if (favorites.includes(post.id)) {
        // Remove from favorites
        newFavorites = favorites.filter(id => id !== post.id);
      } else {
        // Add to favorites
        newFavorites = [...favorites, post.id];
      }
      
      localStorage.setItem('blog-favorites', JSON.stringify(newFavorites));
      setIsFavorite(!isFavorite);
    }
  };
  
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      custom={index}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/posts/${post.id}`} passHref legacyBehavior>
        <CardActionArea component="a" sx={{ height: "100%" }}>
          <Card
            elevation={3}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: "16px",
              background: "rgba(15, 23, 42, 0.6)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(167, 139, 250, 0.1)",
              overflow: "hidden",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "5px",
                background: "linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)",
              },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "radial-gradient(circle at top right, rgba(167, 139, 250, 0.15), transparent 70%)",
                opacity: 0.3,
                zIndex: 0,
              }}
            />

            <CardContent
              sx={{
                p: 3,
                position: "relative",
                zIndex: 1,
                flexGrow: 1,
              }}
            >
              {/* Favorite button */}
              <Box
                onClick={toggleFavorite}
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  zIndex: 2,
                  color: isFavorite ? 'primary.main' : 'text.secondary',
                  '&:hover': {
                    color: 'primary.main',
                  }
                }}
              >
                {isFavorite ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </Box>
              
              {/* Tags */}
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  mb: 2,
                  flexWrap: "wrap",
                }}
              >
                {(post.tags || []).slice(0, 2).map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.location.href = `/tags/${slugifyTag(tag)}`;
                    }}
                    sx={{
                      backgroundColor: "rgba(167, 139, 250, 0.15)",
                      color: "#a78bfa",
                      borderRadius: "6px",
                      fontSize: "0.7rem",
                      cursor: 'pointer',
                    }}
                  />
                ))}
                {(post.tags || []).length > 2 && (
                  <Chip
                    label={`+${post.tags.length - 2}`}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(167, 139, 250, 0.05)",
                      color: "#a78bfa",
                      borderRadius: "6px",
                      fontSize: "0.7rem",
                    }}
                  />
                )}
              </Box>

              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  height: "3rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {post.title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 2,
                  fontSize: "0.9rem",
                  height: "4rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {post.excerpt}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ 
                    fontSize: "0.8rem",
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <AccessTimeIcon sx={{ fontSize: '1rem', mr: 0.5 }} />
                  {format(new Date(post.date), "MMMM d, yyyy")}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#60a5fa",
                    fontSize: "0.8rem",
                  }}
                >
                  Read More →
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </CardActionArea>
      </Link>
    </motion.div>
  );
  
  EnhancedPostCard.displayName = 'EnhancedPostCard';
});

// Main Blog Page Component
export default function Blog({ allPosts }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'favorites'
  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  
  // Load favorites from localStorage
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFavorites = JSON.parse(localStorage.getItem('blog-favorites') || '[]');
      setFavorites(storedFavorites);
    }
  }, []);
  
  // Filter posts based on search query and active filter
  useEffect(() => {
    let filtered = [...allPosts];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) || 
        (post.excerpt && post.excerpt.toLowerCase().includes(query)) ||
        (post.description && post.description.toLowerCase().includes(query)) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    // Apply favorites filter
    if (activeFilter === 'favorites') {
      filtered = filtered.filter(post => favorites.includes(post.id));
    }
    
    setFilteredPosts(filtered);
  }, [searchQuery, activeFilter, allPosts, favorites]);
  
  return (
    <>
      <Head>
        <title>Blog | HPN Personal Website</title>
        <meta
          name="description"
          content="Read my latest thoughts and articles on web development, blockchain, and more."
        />
        <meta property="og:title" content="Blog | HPN Personal Website" />
        <meta property="og:description" content="Read my latest thoughts and articles on web development, blockchain, and more." />
        <meta property="og:type" content="website" />
      </Head>

      <Container maxWidth="lg">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                textAlign: "center",
                background: "linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2
              }}
            >
              All Posts
            </Typography>

            <Typography
              variant="h6"
              component="p"
              color="text.secondary"
              align="center"
              sx={{ maxWidth: 700, mx: "auto", mb: 5 }}
            >
              Thoughts, tutorials, and insights on Web3, blockchain technology, and modern web development.
            </Typography>

            {/* Search and Filter Controls */}
            <Box 
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'stretch', sm: 'center' },
                gap: 2,
                mb: 4,
              }}
            >
              <TextField
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  flex: 1,
                  maxWidth: { xs: '100%', sm: '350px' },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: '12px'
                  }
                }}
              />
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant={activeFilter === 'all' ? 'contained' : 'outlined'}
                  onClick={() => setActiveFilter('all')}
                  size="small"
                  sx={{ 
                    textTransform: 'none',
                    borderRadius: '10px',
                  }}
                >
                  All Posts
                </Button>
                <Button
                  variant={activeFilter === 'favorites' ? 'contained' : 'outlined'}
                  onClick={() => setActiveFilter('favorites')}
                  size="small"
                  startIcon={<BookmarkIcon />}
                  sx={{ 
                    textTransform: 'none',
                    borderRadius: '10px'
                  }}
                >
                  Favorites
                </Button>
              </Box>
            </Box>

            <Divider sx={{ mb: 6 }} />
            
            {/* Results count */}
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ mb: 3 }}
            >
              {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
              {searchQuery && ` for "${searchQuery}"`}
              {activeFilter === 'favorites' && ' in favorites'}
            </Typography>
          </Box>
        </motion.div>

        {/* Blog post grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{ overflow: 'hidden' }}
        >
          <Grid container spacing={4}>
            {filteredPosts.map((post, index) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <EnhancedPostCard post={post} index={index} />
              </Grid>
            ))}
          </Grid>
          
          {/* Empty state */}
          {filteredPosts.length === 0 && (
            <Box 
              sx={{ 
                textAlign: 'center', 
                py: 8,
                px: 3,
                backgroundColor: 'rgba(15, 23, 42, 0.3)',
                borderRadius: 3,
                border: '1px dashed rgba(167, 139, 250, 0.3)',
              }}
            >
              <BookmarkBorderIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                {activeFilter === 'favorites' 
                  ? "You haven't saved any favorites yet"
                  : "No posts found matching your search"}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ mb: 3, maxWidth: '500px', mx: 'auto' }}
              >
                {activeFilter === 'favorites' 
                  ? "Click the bookmark icon on any post to add it to your favorites for easy access later."
                  : "Try adjusting your search terms or browse all posts."}
              </Typography>
              
              {searchQuery && (
                <Button 
                  variant="outlined" 
                  onClick={() => setSearchQuery('')}
                  sx={{ textTransform: 'none' }}
                >
                  Clear Search
                </Button>
              )}
              
              {activeFilter === 'favorites' && (
                <Button 
                  variant="outlined" 
                  onClick={() => setActiveFilter('all')}
                  sx={{ textTransform: 'none' }}
                >
                  View All Posts
                </Button>
              )}
            </Box>
          )}
        </motion.div>
        
        {/* View more tags link */}
        <Box sx={{ textAlign: "center", mt: 7, mb: 5 }}>
          <Link href="/tags" passHref legacyBehavior>
            <Button
              component="a"
              variant="outlined"
              sx={{
                borderRadius: '12px',
                borderColor: '#a78bfa',
                borderWidth: '2px',
                color: '#a78bfa',
                fontSize: '1rem',
                px: 4,
                py: 1.2,
                textTransform: 'none',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#60a5fa',
                  backgroundColor: 'rgba(167, 139, 250, 0.08)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 4px 15px rgba(167, 139, 250, 0.2)',
                },
              }}
            >
              Browse by Tags
            </Button>
          </Link>
        </Box>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  // Dynamic import for server-only code
  const { getSortedPostsData } = await import("../lib/posts.server");
  const allPosts = getSortedPostsData();

  return {
    props: {
      allPosts,
    },
    revalidate: 3600,
  };
}