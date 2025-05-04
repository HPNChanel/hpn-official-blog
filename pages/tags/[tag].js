import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Container from '@mui/material/Container';
import { slugifyTag } from '../../lib/posts';
import { getPostsByTag, getAllTagPaths } from '../../lib/posts.server';
import loadable from '@loadable/component';
import CircularProgress from '@mui/material/CircularProgress';
import { useInView } from 'react-intersection-observer';
import { containsVietnamese } from '../../lib/typography';
import SEO from '../../components/SEO';
import SkipLink from '../../components/accessibility/SkipLink';

// Dynamically import components
const VirtualizedPostList = loadable(() => import('../../components/VirtualizedPostList'), {
  fallback: (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
      <CircularProgress />
    </Box>
  )
});

export default function TagPage({ posts, tag, error }) {
  const [hasVietnameseContent, setHasVietnameseContent] = useState(false);
  const [containerHeight, setContainerHeight] = useState(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  useEffect(() => {
    // Check if tag or posts contain Vietnamese text
    const isVietnameseTag = containsVietnamese(tag);
    const hasVietnamesePosts = posts.some(post => 
      containsVietnamese(post.title) || 
      containsVietnamese(post.excerpt) ||
      containsVietnamese(post.description) ||
      (post.tags && post.tags.some(t => containsVietnamese(t)))
    );
    
    setHasVietnameseContent(isVietnameseTag || hasVietnamesePosts);
    
    // Set container height for virtualized list
    if (typeof window !== 'undefined') {
      setContainerHeight(window.innerHeight * 0.7);
    }
  }, [tag, posts]);

  if (error) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" color="error" gutterBottom>
            {error}
          </Typography>
          <Link href="/blog" passHref legacyBehavior>
            <Button variant="contained" component="a">
              Return to Blog
            </Button>
          </Link>
        </Box>
      </Container>
    );
  }

  // Create structured data for tag page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    headline: `Posts tagged with #${tag} | HPN Blog`,
    description: `Browse all blog posts related to ${tag}`,
    url: `https://hpn-blog.vercel.app/tags/${tag}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://hpn-blog.vercel.app/posts/${post.id}`,
        name: post.title
      }))
    }
  };

  return (
    <>
      <SEO
        title={`Posts tagged with #${tag} | HPN Blog`}
        description={`Browse all blog posts related to ${tag}`}
        hasVietnamese={hasVietnameseContent}
        structuredData={structuredData}
        canonical={`https://hpn-blog.vercel.app/tags/${tag}`}
        keywords={[tag, 'blog', 'posts', 'articles']}
      />
      
      <SkipLink />
      
      <Container maxWidth="lg">
        <main id="main-content">
          <Box sx={{ mb: 6 }}>
            <Box sx={{ mb: 4, mt: 2 }}>
              <Link href="/tags" passHref legacyBehavior>
                <Button 
                  component="a"
                  startIcon={<ArrowBackIcon />}
                  aria-label="Return to all tags"
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
                lang={hasVietnameseContent ? "vi" : undefined}
              >
                Posts tagged with <Box component="span" sx={{ fontStyle: 'italic' }}>#{tag}</Box>
              </Typography>
              
              <Typography 
                variant="subtitle1" 
                color="text.secondary"
                sx={{ mb: 4 }}
                aria-live="polite"
              >
                Found {posts.length} post{posts.length !== 1 ? 's' : ''}
              </Typography>
            </Box>
            
            {/* Post list using virtualization */}
            <div ref={ref}>
              {inView ? (
                posts.length > 0 ? (
                  <VirtualizedPostList 
                    posts={posts} 
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
                    <Typography variant="h6" color="text.secondary">
                      No posts found with this tag.
                    </Typography>
                    <Link href="/blog" passHref legacyBehavior>
                      <Button
                        component="a"
                        variant="outlined"
                        sx={{ mt: 2 }}
                        aria-label="View all blog posts"
                      >
                        View all posts
                      </Button>
                    </Link>
                  </Box>
                )
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress aria-label="Loading posts" />
                </Box>
              )}
            </div>
          </Box>
        </main>
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  // Get all tags but don't pre-render pages for all of them
  const { getAllTags } = await import('../../lib/posts.server');
  const tags = getAllTags();
  
  // Only pre-render the most popular tags
  const popularTags = Object.entries(tags)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10) // Only pre-render top 10 tags
    .map(([tag]) => ({ params: { tag } }));
  
  return {
    paths: popularTags,
    fallback: true, // Generate remaining pages on demand with loading state
  };
}

export async function getStaticProps({ params }) {
  try {
    const { getPostsByTag } = await import('../../lib/posts.server');
    const { REVALIDATION_INTERVALS } = await import('../../lib/revalidate');
    
    const tag = params.tag;
    const posts = await getPostsByTag(tag);
    
    // If no posts found for this tag, return 404
    if (!posts || posts.length === 0) {
      return {
        notFound: true,
        revalidate: REVALIDATION_INTERVALS.TAG_PAGES,
      };
    }
    
    return {
      props: {
        tag,
        posts,
        error: null,
      },
      revalidate: REVALIDATION_INTERVALS.TAG_PAGES, // Revalidate every 3 hours
    };
  } catch (error) {
    console.error(`Error fetching posts for tag ${params.tag}:`, error);
    
    return {
      props: {
        tag: params.tag,
        posts: [],
        error: "Failed to load posts for this tag. Please try again later."
      },
      revalidate: 60, // Try again more frequently on error
    };
  }
}