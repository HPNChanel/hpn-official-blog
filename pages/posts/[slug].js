import React, { useEffect } from "react";
import Head from "next/head";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import dynamic from 'next/dynamic';
import { getPostData, getAllPostIds } from '../../lib/posts.server';
import { slugifyTag } from '../../lib/posts';

// Dynamic imports for better performance
const Giscus = dynamic(() => import('@giscus/react'), {
  ssr: false,
  loading: () => (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Typography>Loading comments...</Typography>
    </Box>
  )
});

// ReadingProgressBar Component
const ReadingProgressBar = ({ postId }) => {
  const [readingProgress, setReadingProgress] = React.useState(0);
  
  useEffect(() => {
    const calculateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      const progress = Math.min(Math.round(scrollPercent * 100), 100);
      
      setReadingProgress(progress);
    };
    
    window.addEventListener('scroll', calculateProgress);
    return () => window.removeEventListener('scroll', calculateProgress);
  }, []);
  
  return (
    <Box sx={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      zIndex: 1100,
      background: 'rgba(0, 0, 0, 0.1)',
    }}>
      <Box 
        sx={{
          height: '100%',
          width: `${readingProgress}%`,
          background: 'linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)',
          transition: 'width 0.1s ease-out',
        }}
      />
    </Box>
  );
};

// EstimatedReadingTime Component
const EstimatedReadingTime = ({ content, wordsPerMinute = 200 }) => {
  // Calculate reading time
  const calculateReadingTime = () => {
    // Strip HTML tags if content is HTML
    const text = content.replace(/<\/?[^>]+(>|$)/g, '');
    // Count words
    const words = text.trim().split(/\s+/).length;
    // Calculate reading time
    const minutes = Math.ceil(words / wordsPerMinute);
    
    return minutes;
  };
  
  const readingTime = calculateReadingTime();
  
  return (
    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
      <Box component="span" sx={{ width: '4px', height: '4px', borderRadius: '50%', bgcolor: 'text.secondary', mx: 1 }} />
      {readingTime} min read
    </Typography>
  );
};

// ShareButtons Component
const ShareButtons = ({ url, title }) => {
  const fullUrl = typeof window !== 'undefined' ? url || window.location.href : url;
  
  const shareData = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl);
    alert('Link copied to clipboard!');
  };
  
  return (
    <Box sx={{ display: 'flex', gap: 1, my: 2 }}>
      <Button
        startIcon={<Box component="span" sx={{ fontSize: '1.2rem' }}>𝕏</Box>}
        href={shareData.twitter}
        target="_blank"
        rel="noopener noreferrer"
        size="small"
        variant="outlined"
        sx={{ textTransform: 'none' }}
      >
        Share
      </Button>
      
      <Button
        startIcon={<Box component="span" sx={{ fontSize: '1.2rem' }}>in</Box>}
        href={shareData.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        size="small"
        variant="outlined"
        sx={{ textTransform: 'none' }}
      >
        Share
      </Button>
      
      <Button
        startIcon={<Box component="span" sx={{ fontSize: '1.2rem' }}>🔗</Box>}
        onClick={copyToClipboard}
        size="small"
        variant="outlined"
        sx={{ textTransform: 'none' }}
      >
        Copy Link
      </Button>
    </Box>
  );
};

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
      delayChildren: 0.1,
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function Post({ postData }) {
  const router = useRouter();

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

  return (
    <>
      <Head>
        <title>{postData.title} | HPN Blog</title>
        <meta name="description" content={postData.description || ""} />
        <meta property="og:title" content={postData.title} />
        <meta property="og:description" content={postData.description || ""} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={postData.date} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {/* Reading Progress Bar */}
      <ReadingProgressBar postId={postData.id} />

      <Container maxWidth="md">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Back Button */}
          <Box sx={{ mb: 4, mt: 2 }}>
            <motion.div variants={fadeInUp}>
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
                  Back to all posts
                </Button>
              </Link>
            </motion.div>
          </Box>

          {/* Tags */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              mb: 4,
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            {(postData.tags || []).map((tag) => (
              <motion.div key={tag} variants={fadeInUp}>
                <Link
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
              </motion.div>
            ))}
          </Box>

          {/* Post Header */}
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <motion.div variants={fadeInUp}>
              <Typography
                component="h1"
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  background: "linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 20px rgba(96, 165, 250, 0.3)",
                }}
              >
                {postData.title}
              </Typography>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mb: 2
                }}
              >
                <Avatar 
                  src="/images/avatar.jpg" 
                  alt="Author" 
                  sx={{ width: 36, height: 36, mr: 1.5 }}
                />
                <Typography sx={{ mr: 1 }}>
                  Phuc Nguyen
                </Typography>
                <Typography color="text.secondary">
                  •
                </Typography>
                <Typography sx={{ ml: 1, color: "text.secondary" }}>
                  {postData.date ? formatDate(postData.date) : ''}
                </Typography>
                {postData.contentHtml && (
                  <EstimatedReadingTime content={postData.contentHtml} />
                )}
              </Box>
            </motion.div>

            {/* Share Buttons */}
            <motion.div variants={fadeInUp}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <ShareButtons title={postData.title} />
              </Box>
            </motion.div>
          </Box>

          <Divider sx={{ width: "100%", mb: 6 }} />

          {/* Post Content */}
          <motion.div variants={fadeIn}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 4 },
                borderRadius: 3,
                backgroundColor: 'background.paper',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                mb: 6,
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
                  },
                  "& h2": {
                    fontSize: "2rem",
                    fontWeight: 600,
                    mt: 4,
                    mb: 2,
                    pb: 1,
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  },
                  "& h3": {
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    mt: 3,
                    mb: 1.5,
                  },
                  "& p": {
                    mb: 2,
                    lineHeight: 1.8,
                  },
                  "& a": {
                    color: "primary.main",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  },
                  "& img": {
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: 2,
                    my: 2,
                  },
                  "& blockquote": {
                    borderLeft: "4px solid",
                    borderColor: "primary.main",
                    pl: 2,
                    py: 1,
                    my: 2,
                    ml: 0,
                    backgroundColor: "rgba(167, 139, 250, 0.1)",
                  },
                  "& pre": {
                    p: 2,
                    borderRadius: 1,
                    overflowX: "auto",
                    backgroundColor: "rgba(15, 23, 42, 0.6)",
                    border: "1px solid rgba(167, 139, 250, 0.2)",
                  },
                  "& code": {
                    fontFamily: "monospace",
                    p: 0.5,
                    borderRadius: 0.5,
                    backgroundColor: "rgba(15, 23, 42, 0.6)",
                    fontSize: "0.9em",
                  },
                  "& ul, & ol": {
                    pl: 3,
                    mb: 2,
                  },
                  "& li": {
                    mb: 1,
                  },
                }}
                dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
              />
            </Paper>
          </motion.div>

          {/* Author Bio */}
          <motion.div variants={fadeInUp}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'center', sm: 'flex-start' },
                gap: 3,
                borderRadius: 3,
                backgroundColor: 'rgba(15, 23, 42, 0.4)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(167, 139, 250, 0.2)',
                mb: 6,
              }}
            >
              <Avatar 
                src="/images/avatar.jpg" 
                alt="Phuc Nguyen"
                sx={{ 
                  width: { xs: 80, sm: 100 }, 
                  height: { xs: 80, sm: 100 },
                  border: '3px solid',
                  borderColor: 'primary.main'
                }}
              />
              <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                <Typography variant="h6" gutterBottom>
                  Phuc Nguyen
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Web3 Developer & Blockchain Enthusiast. Building the decentralized future with innovative applications and smart contracts. I'm passionate about creating Web3 experiences that are both powerful and accessible.
                </Typography>
                <Button 
                  variant="outlined" 
                  size="small"
                  component={Link}
                  href="/about"
                  sx={{ textTransform: 'none' }}
                >
                  About Me
                </Button>
              </Box>
            </Paper>
          </motion.div>

          <Divider sx={{ width: "100%", my: 4 }} />

          {/* Comments Section */}
          <motion.div variants={fadeInUp}>
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
                Comments
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
          </motion.div>
        </motion.div>
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  try {
    const postData = await getPostData(params.slug);
    
    // Ensure date is a string in ISO format for consistent parsing
    if (postData.date instanceof Date) {
      postData.date = postData.date.toISOString();
    }
    
    return {
      props: {
        postData,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error(`Error fetching post data for ${params.slug}:`, error);
    return {
      notFound: true,
    };
  }
}