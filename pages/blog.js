import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { motion } from 'framer-motion';
import loadable from '@loadable/component';
import CircularProgress from '@mui/material/CircularProgress';
import SEO from '../components/SEO';
import { generateBlogListStructuredData } from '../lib/seo';
import SkipLink from '../components/accessibility/SkipLink';

// Dynamically import components
const VirtualizedPostList = loadable(() => import('../components/VirtualizedPostList'), {
  fallback: (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
      <CircularProgress />
    </Box>
  )
});

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

// Main Blog Page Component
export default function Blog({ allPosts }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'favorites'
  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  const [containerHeight, setContainerHeight] = useState(null);
  
  // Load favorites from localStorage
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFavorites = JSON.parse(localStorage.getItem('blog-favorites') || '[]');
      setFavorites(storedFavorites);
      
      // Set container height for virtualized list
      setContainerHeight(window.innerHeight * 0.7);
      
      // Listen for resize events
      const handleResize = () => {
        setContainerHeight(window.innerHeight * 0.7);
      };
      
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
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
  
  // Generate structured data for blog listing
  const structuredData = generateBlogListStructuredData(allPosts);

  return (
    <>
      <SEO
        title="Blog | HPN Personal Website"
        description="Thoughts, tutorials, and insights on Web3, blockchain technology, and modern web development."
        ogType="website"
        structuredData={structuredData}
      />
      
      <SkipLink />
      
      <Container maxWidth="lg">
        <main id="main-content">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h1"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  textAlign: "center",
                  fontSize: { xs: '2rem', md: '3rem' }, // More responsive sizes
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
                role="search"
                aria-label="Search and filter blog posts"
              >
                <TextField
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  variant="outlined"
                  size="small"
                  aria-label="Search blog posts"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon aria-hidden="true" />
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
                    aria-pressed={activeFilter === 'all'}
                    aria-label="Show all posts"
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
                    startIcon={<BookmarkIcon aria-hidden="true" />}
                    aria-pressed={activeFilter === 'favorites'}
                    aria-label="Show favorite posts"
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
                aria-live="polite"
              >
                {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
                {searchQuery && ` for "${searchQuery}"`}
                {activeFilter === 'favorites' && ' in favorites'}
              </Typography>
            </Box>
          </motion.div>

          {/* Blog post grid with virtualized list */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            style={{ overflow: 'hidden' }}
          >
            {filteredPosts.length > 0 ? (
              <VirtualizedPostList 
                posts={filteredPosts} 
                containerHeight={containerHeight} 
              />
            ) : (
              <Box 
                sx={{ 
                  textAlign: 'center', 
                  py: 8,
                  px: 3,
                  backgroundColor: 'rgba(15, 23, 42, 0.3)',
                  borderRadius: 3,
                  border: '1px dashed rgba(167, 139, 250, 0.3)',
                }}
                role="status"
                aria-live="polite"
              >
                <BookmarkBorderIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} aria-hidden="true" />
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
                    aria-label="Clear search"
                  >
                    Clear Search
                  </Button>
                )}
                
                {activeFilter === 'favorites' && (
                  <Button 
                    variant="outlined" 
                    onClick={() => setActiveFilter('all')}
                    sx={{ textTransform: 'none' }}
                    aria-label="View all posts"
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
                aria-label="Browse all post categories by tag"
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
        </main>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  // Dynamic import for server-only code
  const { getSortedPostsData } = await import("../lib/posts.server");
  const { REVALIDATION_INTERVALS } = await import("../lib/revalidate");
  
  try {
    const allPosts = getSortedPostsData();

    return {
      props: {
        allPosts,
        error: null,
      },
      revalidate: REVALIDATION_INTERVALS.HOME_PAGE, // Revalidate every hour
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    
    // Return empty posts with error flag for client-side handling
    return {
      props: {
        allPosts: [],
        error: "Failed to load blog posts. Please try again later.",
      },
      revalidate: 60, // Try again more frequently on error
    };
  }
}