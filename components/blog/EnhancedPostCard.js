import React, { useState, useEffect, memo, useRef } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { motion } from 'framer-motion';
import { slugifyTag } from '../../lib/posts';
import { containsVietnamese } from '../../lib/typography';
import { applyVietnameseOptimizations } from '../../lib/vietnameseOptimizer';

// Animation variants
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
const EnhancedPostCard = ({ post, index }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [hasVietnameseContent, setHasVietnameseContent] = useState(false);
  const cardRef = useRef(null);
  
  // Check if content contains Vietnamese text
  useEffect(() => {
    const isVietnamese = post && (
      containsVietnamese(post.title) || 
      containsVietnamese(post.excerpt) ||
      containsVietnamese(post.description) ||
      (post.tags && post.tags.some(tag => containsVietnamese(tag)))
    );
    
    setHasVietnameseContent(isVietnamese);
    
    // Apply special optimizations if Vietnamese content detected
    if (isVietnamese && cardRef.current) {
      const textElements = cardRef.current.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span');
      textElements.forEach(el => {
        if (containsVietnamese(el.textContent)) {
          applyVietnameseOptimizations(el);
        }
      });
    }
  }, [post]);
  
  // Load favorites from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && post?.id) {
      const favorites = JSON.parse(localStorage.getItem('blog-favorites') || '[]');
      setIsFavorite(favorites.includes(post.id));
    }
  }, [post?.id]);
  
  // Toggle favorite status
  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (typeof window !== 'undefined' && post?.id) {
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
  
  if (!post) return null;
  
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
            ref={cardRef}
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
                className={hasVietnameseContent ? "vietnamese-heading" : ""}
                lang={hasVietnameseContent ? "vi" : undefined}
                sx={{
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  height: "3rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  ...(hasVietnameseContent && {
                    lineHeight: 1.4,
                    letterSpacing: '-0.015em',
                  })
                }}
              >
                {post.title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                className={hasVietnameseContent ? "vietnamese" : ""}
                lang={hasVietnameseContent ? "vi" : undefined}
                sx={{
                  mb: 2,
                  fontSize: "0.9rem",
                  height: "4rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  ...(hasVietnameseContent && {
                    lineHeight: 1.8,
                    letterSpacing: '-0.01em',
                  })
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
};

export default memo(EnhancedPostCard);
