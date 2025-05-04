// pages/posts/[slug].js
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import Box from "@mui/material/Box";
// Import VietnameseTypography instead of regular Typography
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import { getPostData, getAllPostIds } from '../../lib/posts.server';
import { slugifyTag } from '../../lib/posts';
import ShareButtons from '../../components/blog/ShareButtons';
import TableOfContents from '../../components/blog/TableOfContents';
import { containsVietnamese, verticalRhythm } from '../../lib/typography';
import VietnameseTypography from '../../components/VietnameseTypography';
import SEO from '../../components/SEO';
import { generatePostStructuredData } from '../../lib/seo';
import SkipLink from '../../components/accessibility/SkipLink';

// Dynamically import components
const Giscus = dynamic(() => import('@giscus/react'), {
  ssr: false,
  loading: () => (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Typography>Loading comments...</Typography>
    </Box>
  )
});

const RelatedPosts = dynamic(() => import('../../components/blog/RelatedPosts'), {
  ssr: false
});

const NewsletterSignup = dynamic(() => import('../../components/blog/NewsletterSignup'), {
  ssr: false
});

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// Extract headings from HTML content
const extractHeadings = (htmlContent) => {
  const headingRegex = /<h([2-3]).*?id="(.*?)".*?>(.*?)<\/h\1>/g;
  const headings = [];
  let match;
  
  while ((match = headingRegex.exec(htmlContent)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]*>/g, '') // Remove any HTML tags inside the heading
    });
  }
  
  return headings;
};

// Reading time calculator
const calculateReadingTime = (content) => {
  // Strip HTML tags
  const plainText = content.replace(/<[^>]*>/g, '');
  // Count words (approximately)
  const words = plainText.trim().split(/\s+/).length;
  // Average reading speed: 200-250 words per minute
  const readingTimeMinutes = Math.ceil(words / 200);
  return readingTimeMinutes;
};

// Sticky scroll-to-top button
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <Fab
          component={motion.button}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          color="primary"
          size="small"
          aria-label="scroll to top"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 100,
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}
    </AnimatePresence>
  );
};

// Progress bar component
const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const calculateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      const progress = Math.min(scrollPercent * 100, 100);
      
      setProgress(progress);
    };
    
    window.addEventListener('scroll', calculateProgress);
    return () => window.removeEventListener('scroll', calculateProgress);
  }, []);
  
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        zIndex: 1100,
        bgcolor: 'rgba(15, 23, 42, 0.1)',
      }}
    >
      <Box
        component={motion.div}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        sx={{
          height: '100%',
          background: 'linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)',
        }}
      />
    </Box>
  );
};

export default function Post({ postData, allPosts = [] }) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isSaved, setIsSaved] = useState(false);
  const [headings, setHeadings] = useState([]);
  const readingTime = postData?.contentHtml ? calculateReadingTime(postData.contentHtml) : 0;
  // Determine if post content contains Vietnamese
  const [hasVietnameseContent, setHasVietnameseContent] = useState(false);
  
  // Check if post is saved on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && postData?.id) {
      const savedPosts = JSON.parse(localStorage.getItem('blog-favorites') || '[]');
      setIsSaved(savedPosts.includes(postData.id));
    }
    
    // Check if content contains Vietnamese text
    if (postData?.contentHtml) {
      const hasVi = containsVietnamese(postData.contentHtml) || 
                  containsVietnamese(postData.title) || 
                  containsVietnamese(postData.description);
      setHasVietnameseContent(hasVi);
    }
  }, [postData?.id, postData?.contentHtml, postData?.title, postData?.description]);
  
  // Extract headings for table of contents
  useEffect(() => {
    if (postData?.contentHtml) {
      const extractedHeadings = extractHeadings(postData.contentHtml);
      setHeadings(extractedHeadings);
    }
  }, [postData?.contentHtml]);
  
  // Toggle save/bookmark status
  const toggleSave = () => {
    if (typeof window !== 'undefined' && postData?.id) {
      const savedPosts = JSON.parse(localStorage.getItem('blog-favorites') || '[]');
      
      if (savedPosts.includes(postData.id)) {
        // Remove from saved
        const newSavedPosts = savedPosts.filter(id => id !== postData.id);
        localStorage.setItem('blog-favorites', JSON.stringify(newSavedPosts));
        setIsSaved(false);
      } else {
        // Add to saved
        const newSavedPosts = [...savedPosts, postData.id];
        localStorage.setItem('blog-favorites', JSON.stringify(newSavedPosts));
        setIsSaved(true);
      }
    }
  };

  // Format date safely
  const formatDate = (dateString) => {
    try {
      const date = parseISO(dateString);
      return format(date, 'MMMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  if (router.isFallback) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!postData) {
    return <ErrorPage statusCode={404} />;
  }

  // Article structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": postData.title,
    "datePublished": postData.date,
    "dateModified": postData.lastModified || postData.date,
    "author": {
      "@type": "Person",
      "name": "Phuc Nguyen"
    },
    "description": postData.description || "",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://yourdomain.com/posts/${postData.id}`
    }
  };

  // Generate structured data for the post
  const structuredData = generatePostStructuredData(postData);
  
  // Format date for display
  const formattedDate = postData.date ? format(new Date(postData.date), 'MMMM d, yyyy') : '';

  return (
    <>
      <SEO
        title={`${postData.title} | HPN Blog`}
        description={postData.description || postData.excerpt || ''}
        ogImage={postData.coverImage || '/images/og-default.jpg'}
        ogType="article"
        hasVietnamese={hasVietnameseContent}
        structuredData={structuredData}
        keywords={postData.tags || []}
      />
      
      <SkipLink />
      
      {/* Reading Progress Bar */}
      <ReadingProgressBar />
      
      {/* Back to top button */}
      <ScrollToTopButton />

      <Container 
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          gap: { xs: 4, lg: 6 },
          my: 4,
        }}
      >
        {/* Main Content - Article */}
        <Box 
          component={motion.div}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          sx={{ 
            flexGrow: 1,
            width: { xs: '100%', lg: 'calc(100% - 280px)' },
            maxWidth: '100%',
          }}
        >
          {/* Back Button */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/blog" passHref legacyBehavior>
              <Button 
                component="a"
                startIcon={<ArrowBackIcon />}
                sx={{
                  backgroundColor: "rgba(167, 139, 250, 0.1)",
                  "&:hover": {
                    backgroundColor: "rgba(167, 139, 250, 0.2)",
                  },
                  borderRadius: 2,
                  textTransform: "none",
                }}
              >
                Back to blog
              </Button>
            </Link>
            
            <Tooltip title={isSaved ? "Remove from saved" : "Save article"}>
              <IconButton
                onClick={toggleSave}
                sx={{
                  color: isSaved ? 'primary.main' : 'text.secondary',
                  '&:hover': {
                    backgroundColor: 'rgba(167, 139, 250, 0.1)',
                  },
                }}
              >
                {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </IconButton>
            </Tooltip>
          </Box>

          {/* Article Header */}
          <Box 
            component={motion.div}
            variants={slideUp}
            initial="hidden"
            animate="visible"
            sx={{ mb: 6 }}
          >
            {/* Tags */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                mb: 3,
              }}
            >
              {(postData.tags || []).map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${slugifyTag(tag)}`}
                  passHref
                  legacyBehavior
                >
                  <Chip
                    component="a"
                    label={tag}
                    clickable
                    sx={{
                      backgroundColor: "rgba(167, 139, 250, 0.15)",
                      color: "#a78bfa",
                      borderRadius: 2,
                      fontSize: "0.8rem",
                      "&:hover": {
                        backgroundColor: "rgba(167, 139, 250, 0.25)",
                        boxShadow: "0 0 15px rgba(167, 139, 250, 0.2)",
                      },
                    }}
                  />
                </Link>
              ))}
            </Box>

            <Typography
              component="h1"
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                lineHeight: 1.2,
                background: "linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 20px rgba(96, 165, 250, 0.3)",
              }}
            >
              {postData.title}
            </Typography>

            {/* Author and Date */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                flexWrap: 'wrap',
                gap: 2,
                mb: 4,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar 
                  src="/images/avatar.jpg" 
                  alt="Phuc Nguyen" 
                  sx={{ 
                    width: 50, 
                    height: 50, 
                    mr: 2,
                    border: '2px solid',
                    borderColor: 'primary.main'
                  }}
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Phuc Nguyen
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Web3 Developer & Blogger
                  </Typography>
                </Box>
              </Box>
              
              <Divider orientation="vertical" flexItem sx={{ height: 40 }} />
              
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Published on {postData.date ? formatDate(postData.date) : ''}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {readingTime} min read
                </Typography>
              </Box>
            </Box>

            {/* Share Buttons */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Share this article
              </Typography>
              <ShareButtons 
                title={postData.title}
                variant="button"
              />
            </Box>
          </Box>

          <Divider sx={{ width: "100%", mb: 6 }} />

          {/* Post Content */}
          <motion.div variants={fadeIn}>
            <Paper
              elevation={2}
              sx={{
                p: { xs: 3, sm: 5 },
                borderRadius: 3,
                backgroundColor: 'background.paper',
                mb: 6,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '5px',
                  background: 'linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)',
                },
              }}
            >
              <Box
                component="article"
                className="blog-content"
                sx={{
                  width: "100%",
                  "& h1": {
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    mt: 4,
                    mb: 2,
                    color: 'text.primary',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: '-20px',
                      top: '15%',
                      height: '70%',
                      width: '4px',
                      backgroundColor: 'primary.main',
                      borderRadius: '4px',
                    },
                  },
                  "& h2": {
                    fontSize: "2rem",
                    fontWeight: 600,
                    mt: 4,
                    mb: 2,
                    pb: 1,
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    color: 'text.primary',
                    position: 'relative',
                    scrollMarginTop: '80px', // For smooth scrolling to anchors
                  },
                  "& h3": {
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    mt: 3,
                    mb: 1.5,
                    color: 'text.primary',
                    scrollMarginTop: '80px', // For smooth scrolling to anchors
                  },
                  "& p": {
                    mb: 2,
                    lineHeight: 1.8,
                    fontSize: '1.05rem',
                  },
                  "& a": {
                    color: "primary.main",
                    textDecoration: "none",
                    fontWeight: 500,
                    boxShadow: '0 1px 0 0 currentColor',
                    transition: 'all 0.2s ease',
                    "&:hover": {
                      boxShadow: '0 2px 0 0 currentColor',
                      color: 'primary.light',
                    },
                  },
                  "& img": {
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: 2,
                    my: 3,
                    display: 'block',
                    mx: 'auto',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                  },
                  "& blockquote": {
                    borderLeft: "4px solid",
                    borderColor: "primary.main",
                    pl: 3,
                    py: 1,
                    my: 3,
                    ml: 0,
                    backgroundColor: "rgba(167, 139, 250, 0.1)",
                    borderRadius: '0 8px 8px 0',
                    fontStyle: 'italic',
                    position: 'relative',
                    '&::before': {
                      content: '"\\201C"',
                      position: 'absolute',
                      top: '-10px',
                      left: '10px',
                      fontSize: '3rem',
                      color: 'rgba(167, 139, 250, 0.2)',
                      fontFamily: 'Georgia, serif',
                    },
                  },
                  "& pre": {
                    p: 3,
                    borderRadius: 2,
                    overflowX: "auto",
                    backgroundColor: "rgba(15, 23, 42, 0.6)",
                    border: "1px solid rgba(167, 139, 250, 0.2)",
                    my: 3,
                    fontSize: '0.9rem',
                  },
                  "& code": {
                    fontFamily: "monospace",
                    p: 0.5,
                    borderRadius: 1,
                    backgroundColor: "rgba(15, 23, 42, 0.6)",
                    fontSize: "0.9em",
                    color: 'primary.light',
                  },
                  "& ul, & ol": {
                    pl: 3,
                    mb: 3,
                  },
                  "& li": {
                    mb: 1,
                    lineHeight: 1.7,
                  },
                  "& hr": {
                    my: 4,
                    border: 'none',
                    height: '1px',
                    backgroundColor: 'divider',
                  },
                  "& table": {
                    width: '100%',
                    borderCollapse: 'collapse',
                    my: 3,
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
                  },
                  "& th, & td": {
                    border: '1px solid',
                    borderColor: 'divider',
                    p: 2,
                    textAlign: 'left',
                  },
                  "& th": {
                    backgroundColor: 'rgba(167, 139, 250, 0.1)',
                    fontWeight: 600,
                  },
                  "& tr:nth-of-type(even)": {
                    backgroundColor: 'background.default',
                  },
                  // Custom styles for post content with Vietnamese optimizations
                  '& h2': {
                    ...verticalRhythm.mb(2),
                    ...verticalRhythm.mt(4),
                    fontSize: { xs: '1.75rem', md: '2rem' },
                    fontWeight: 700,
                    lineHeight: hasVietnameseContent ? 1.4 : 1.3,
                    letterSpacing: hasVietnameseContent ? '-0.015em' : 'inherit',
                    fontFamily: hasVietnameseContent ? '"Be Vietnam Pro", system-ui, sans-serif' : 'inherit',
                    scrollMarginTop: '80px',
                    '&::before': {
                      content: '""',
                      display: 'block',
                      height: '80px',
                      marginTop: '-80px',
                      visibility: 'hidden',
                    }
                  },
                  '& h3': {
                    ...verticalRhythm.mb(2),
                    ...verticalRhythm.mt(3),
                    fontSize: { xs: '1.5rem', md: '1.75rem' },
                    fontWeight: 600,
                    lineHeight: hasVietnameseContent ? 1.4 : 1.3,
                    letterSpacing: hasVietnameseContent ? '-0.015em' : 'inherit',
                    fontFamily: hasVietnameseContent ? '"Be Vietnam Pro", system-ui, sans-serif' : 'inherit',
                    scrollMarginTop: '80px',
                  },
                  '& p': {
                    ...verticalRhythm.mb(2),
                    lineHeight: hasVietnameseContent ? 1.8 : 1.6,
                    fontSize: { xs: '1rem', md: '1.125rem' },
                    letterSpacing: hasVietnameseContent ? '-0.01em' : 'inherit',
                    fontFamily: hasVietnameseContent ? '"Be Vietnam Pro", system-ui, sans-serif' : 'inherit',
                    hyphens: hasVietnameseContent ? 'auto' : 'manual',
                    overflowWrap: 'break-word',
                    textAlign: 'justify',
                  },
                  '& ul, & ol': {
                    ...verticalRhythm.mb(2),
                    paddingLeft: '1.5rem',
                    lineHeight: hasVietnameseContent ? 1.8 : 1.6,
                  },
                  '& li': {
                    marginBottom: '0.5rem',
                    lineHeight: hasVietnameseContent ? 1.8 : 1.6,
                    fontSize: { xs: '1rem', md: '1.125rem' },
                  },
                  '& blockquote': {
                    borderLeft: '4px solid',
                    borderColor: 'primary.main',
                    paddingLeft: '1rem',
                    fontStyle: 'italic',
                    ...verticalRhythm.mb(3),
                    ...verticalRhythm.mt(3),
                    color: 'text.secondary',
                    '& p': {
                      marginBottom: 0,
                    }
                  },
                  '& code': {
                    fontFamily: '"Roboto Mono", monospace',
                    backgroundColor: 'rgba(167, 139, 250, 0.1)',
                    padding: '2px 4px',
                    borderRadius: '4px',
                    fontSize: '0.875em',
                  },
                  '& pre': {
                    ...verticalRhythm.mb(3),
                    ...verticalRhythm.mt(1),
                    padding: '1rem',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(167, 139, 250, 0.1)',
                    overflowX: 'auto',
                    '& code': {
                      backgroundColor: 'transparent',
                      padding: 0,
                      fontSize: '0.875rem',
                      lineHeight: 1.7,
                      fontFamily: '"Roboto Mono", monospace',
                    }
                  },
                  '& img': {
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    ...verticalRhythm.mb(3),
                    ...verticalRhythm.mt(3),
                  },
                  '& a': {
                    color: 'primary.main',
                    textDecoration: 'none',
                    borderBottom: '1px dashed',
                    borderColor: 'primary.main',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderBottom: '1px solid',
                      borderColor: 'primary.main',
                      color: 'primary.dark',
                    }
                  },
                  // Table styles
                  '& table': {
                    width: '100%',
                    borderCollapse: 'collapse',
                    ...verticalRhythm.mb(3),
                    ...verticalRhythm.mt(3),
                  },
                  '& th, & td': {
                    padding: '0.75rem',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    textAlign: 'left',
                  },
                  '& th': {
                    backgroundColor: 'rgba(15, 23, 42, 0.1)',
                    fontWeight: 600,
                  },
                  // Feature setting for Vietnamese
                  fontFeatureSettings: hasVietnameseContent ? 
                    '"calt", "liga", "dlig", "cv01"' : 'inherit',
                }}
                dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
              />
            </Paper>
          </motion.div>

          {/* Author Bio */}
          <motion.div variants={slideUp}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'center', sm: 'flex-start' },
                gap: 3,
                borderRadius: 3,
                backgroundColor: 'rgba(15, 23, 42, 0.4)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(167, 139, 250, 0.2)',
                mb: 6,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              <Avatar 
                src="/images/avatar.jpg" 
                alt="Phuc Nguyen"
                sx={{ 
                  width: { xs: 80, sm: 120 }, 
                  height: { xs: 80, sm: 120 },
                  border: '3px solid',
                  borderColor: 'primary.main',
                  boxShadow: '0 0 20px rgba(167, 139, 250, 0.3)',
                }}
              />
              <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                <Typography variant="h5" gutterBottom fontWeight={700}>
                  Written by Phuc Nguyen
                </Typography>
                <Typography variant="body1" paragraph color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  Web3 Developer & Blockchain Enthusiast. Building the decentralized future with innovative applications and smart contracts. I&apos;m passionate about creating Web3 experiences that are both powerful and accessible.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                  <Button 
                    variant="outlined" 
                    component={Link}
                    href="/about"
                    sx={{ 
                      textTransform: 'none',
                      borderRadius: 8,
                      '&:hover': {
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    About Me
                  </Button>
                  <Button 
                    variant="contained" 
                    component={Link}
                    href="/contact"
                    sx={{ 
                      textTransform: 'none',
                      borderRadius: 8,
                      backgroundColor: 'primary.main',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 5px 15px rgba(167, 139, 250, 0.4)'
                      }
                    }}
                  >
                    Follow Me
                  </Button>
                </Box>
              </Box>
            </Paper>
          </motion.div>

          {/* Related Posts */}
          <RelatedPosts 
            currentPostId={postData.id}
            allPosts={allPosts}
            currentTags={postData.tags || []}
          />

          {/* Newsletter Signup */}
          <Box sx={{ mb: 6 }}>
            <NewsletterSignup />
          </Box>

          {/* Post Navigation */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2,
              mb: 6
            }}
          >
            {/* Find previous and next posts based on date */}
            {allPosts.length > 1 && (() => {
              const currentIndex = allPosts.findIndex(post => post.id === postData.id);
              const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
              const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
              
              return (
                <>
                  {prevPost && (
                    <Button
                      component={Link}
                      href={`/posts/${prevPost.id}`}
                      startIcon={<ArrowBackIcon />}
                      sx={{
                        borderRadius: 2,
                        p: 2,
                        textTransform: 'none',
                        justifyContent: 'flex-start',
                        backgroundColor: 'rgba(167, 139, 250, 0.05)',
                        '&:hover': {
                          backgroundColor: 'rgba(167, 139, 250, 0.1)',
                        },
                        maxWidth: { xs: '100%', sm: '45%' },
                        flexGrow: { xs: 1, sm: 0 },
                      }}
                    >
                      <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Previous Article
                        </Typography>
                        <Typography variant="subtitle2" noWrap>
                          {prevPost.title}
                        </Typography>
                      </Box>
                    </Button>
                  )}
                  
                  {nextPost && (
                    <Button
                      component={Link}
                      href={`/posts/${nextPost.id}`}
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        borderRadius: 2,
                        p: 2,
                        textTransform: 'none',
                        justifyContent: 'flex-end',
                        backgroundColor: 'rgba(167, 139, 250, 0.05)',
                        '&:hover': {
                          backgroundColor: 'rgba(167, 139, 250, 0.1)',
                        },
                        maxWidth: { xs: '100%', sm: '45%' },
                        flexGrow: { xs: 1, sm: 0 },
                      }}
                    >
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Next Article
                        </Typography>
                        <Typography variant="subtitle2" noWrap>
                          {nextPost.title}
                        </Typography>
                      </Box>
                    </Button>
                  )}
                </>
              );
            })()}
          </Box>

          {/* Comments Section */}
          <Box
            sx={{
              width: "100%",
              mt: 4,
              mb: 6,
              p: 3,
              borderRadius: 2,
              background: "rgba(15, 23, 42, 0.4)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(167, 139, 250, 0.15)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                "&::before": {
                  content: '""',
                  display: "inline-block",
                  width: "4px",
                  height: "24px",
                  backgroundColor: "#a78bfa",
                  marginRight: "12px",
                  borderRadius: "2px",
                },
              }}
            >
              Discussion
            </Typography>

            <Giscus
              repo="HPNChanel/hpn-blog-comments"
              repoId="R_kgDOOdAA5Q"
              category="Announcements"
              categoryId="DIC_kwDOOdAA5c4CpTgf"
              mapping="pathname"
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="top"
              theme="dark"
              lang="en"
              loading="lazy"
            />
          </Box>
        </Box>

        {/* Sidebar */}
        {!isMobile && (
          <Box 
            component="aside"
            sx={{ 
              width: '280px',
              flexShrink: 0,
              position: 'sticky',
              top: 100,
              alignSelf: 'flex-start',
              display: { xs: 'none', lg: 'block' },
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Table of Contents */}
              {headings.length > 0 && (
                <TableOfContents headings={headings} />
              )}
              
              {/* Related posts mini list */}
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  background: 'rgba(15, 23, 42, 0.4)',
                  backdropFilter: 'blur(5px)',
                  border: '1px solid rgba(167, 139, 250, 0.1)',
                  mt: 3,
                }}
              >
                <Typography variant="h6" component="h3" fontWeight={600} gutterBottom>
                  You might also like
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {allPosts
                    .filter(post => post.id !== postData.id)
                    .slice(0, 3)
                    .map(post => (
                      <Box key={post.id}>
                        <Link href={`/posts/${post.id}`} passHref legacyBehavior>
                          <Typography
                            component="a"
                            variant="subtitle2"
                            sx={{
                              fontWeight: 500,
                              color: 'text.primary',
                              textDecoration: 'none',
                              '&:hover': {
                                color: 'primary.main',
                              },
                              display: 'block',
                              mb: 0.5,
                            }}
                          >
                            {post.title}
                          </Typography>
                        </Link>
                        <Typography variant="caption" color="text.secondary">
                          {format(new Date(post.date), 'MMM d, yyyy')}
                        </Typography>
                      </Box>
                    ))}
                </Box>
                
                <Button
                  component={Link}
                  href="/blog"
                  endIcon={<ArrowForwardIcon />}
                  fullWidth
                  sx={{
                    mt: 2,
                    textTransform: 'none',
                    borderRadius: 8,
                  }}
                >
                  View All Posts
                </Button>
              </Paper>
              
              {/* Tags Cloud */}
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  background: 'rgba(15, 23, 42, 0.4)',
                  backdropFilter: 'blur(5px)',
                  border: '1px solid rgba(167, 139, 250, 0.1)',
                  mt: 3,
                }}
              >
                <Typography variant="h6" component="h3" fontWeight={600} gutterBottom>
                  Popular Tags
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {Array.from(
                    new Set(
                      allPosts.flatMap(post => post.tags || [])
                    )
                  )
                  .slice(0, 10)
                  .map(tag => (
                    <Link
                      key={tag}
                      href={`/tags/${slugifyTag(tag)}`}
                      passHref
                      legacyBehavior
                    >
                      <Chip
                        component="a"
                        label={tag}
                        size="small"
                        clickable
                        sx={{
                          backgroundColor: "rgba(167, 139, 250, 0.15)",
                          color: "#a78bfa",
                          borderRadius: 1,
                          '&:hover': {
                            backgroundColor: "rgba(167, 139, 250, 0.25)",
                          },
                        }}
                      />
                    </Link>
                  ))}
                </Box>
                
                <Button
                  component={Link}
                  href="/tags"
                  endIcon={<ArrowForwardIcon />}
                  fullWidth
                  sx={{
                    mt: 2,
                    textTransform: 'none',
                    borderRadius: 8,
                  }}
                >
                  View All Tags
                </Button>
              </Paper>
            </motion.div>
          </Box>
        )}
      </Container>

      {/* Back to top button */}
      <ScrollToTopButton />
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  
  return {
    paths,
    fallback: 'blocking', // Wait for generation on demand for SEO
  };
}

export async function getStaticProps({ params }) {
  try {
    const postData = await getPostData(params.slug);
    const { getPostRevalidationTime } = await import('../../lib/revalidate');
    
    // Get all posts for related posts and navigation
    const { getSortedPostsData } = await import('../../lib/posts.server');
    const allPosts = getSortedPostsData();
    
    // Ensure date is a string in ISO format for consistent parsing
    if (postData.date instanceof Date) {
      postData.date = postData.date.toISOString();
    }
    
    // Determine revalidation time based on post date
    const revalidate = getPostRevalidationTime(postData.date);
    
    return {
      props: {
        postData,
        allPosts,
        error: null,
      },
      revalidate, // Dynamic revalidation time based on post age
    };
  } catch (error) {
    console.error(`Error fetching post data for ${params.slug}:`, error);
    
    // Check if this is a 404 error (post not found)
    if (error.code === 'ENOENT' || error.message?.includes('not found')) {
      return {
        notFound: true, // Return 404 page
        revalidate: 60 * 60, // Check again after an hour
      };
    }
    
    // For other errors, return error props for client-side handling
    return {
      props: {
        slug: params.slug,
        error: "Failed to load this post. Please try again later.",
        postData: null,
        allPosts: [],
      },
      revalidate: 60, // Try again more frequently on error
    };
  }
}