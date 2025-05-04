// components/EnhancedPostCard.js
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Link from 'next/link';
import { format } from 'date-fns';
import { slugifyTag } from '../lib/posts';
import { Button, IconButton, Tooltip } from '@mui/material';

// Using Framer Motion with MUI
const MotionCard = motion(Card);
const MotionBox = motion(Box);
const MotionChip = motion(Chip);

const EnhancedPostCard = memo(function EnhancedPostCard({ 
  id, 
  title, 
  date, 
  excerpt, 
  tags = [],
  onSavePost, 
  isSaved = false,
  category
}) {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    },
    hover: {
      y: -10,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };
  
  const chipVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };
  
  return (
    <Link href={`/posts/${id}`} passHref legacyBehavior>
      <CardActionArea component="a" sx={{ height: '100%' }}>
        <MotionCard
          elevation={4}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '16px',
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(167, 139, 250, 0.1)',
            overflow: 'hidden',
            position: 'relative',
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
          {/* Background gradient animation */}
          <MotionBox
            initial={{ opacity: 0.3 }}
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.3 }}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at top right, rgba(167, 139, 250, 0.15), transparent 70%)',
              zIndex: 0,
            }}
          />

          <CardContent
            sx={{
              p: 3,
              position: 'relative',
              zIndex: 1,
              flexGrow: 1,
            }}
          >
            {/* Save/Bookmark button */}
            <Tooltip title={isSaved ? "Remove from saved" : "Save for later"}>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onSavePost) onSavePost(id);
                }}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  color: isSaved ? 'primary.main' : 'text.secondary',
                  '&:hover': {
                    color: isSaved ? 'primary.light' : 'primary.main',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </IconButton>
            </Tooltip>
            
            {/* Category badge */}
            {category && (
              <Box
                component={motion.div}
                whileHover={{ y: -2 }}
                sx={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  bgcolor: 'rgba(167, 139, 250, 0.15)',
                  color: 'primary.main',
                  fontSize: '0.7rem',
                  py: 0.5,
                  px: 1.5,
                  borderRadius: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                }}
              >
                {category}
              </Box>
            )}

            {/* Tags */}
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                mb: 2,
                flexWrap: 'wrap',
                mt: category ? 5 : 2,
              }}
            >
              {tags.slice(0, 3).map((tag) => (
                <MotionChip
                  key={tag}
                  label={tag}
                  size="small"
                  variants={chipVariants}
                  whileHover="hover"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = `/tags/${slugifyTag(tag)}`;
                  }}
                  sx={{
                    backgroundColor: 'rgba(167, 139, 250, 0.15)',
                    color: '#a78bfa',
                    borderRadius: '6px',
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                  }}
                />
              ))}
              {tags.length > 3 && (
                <Chip
                  label={`+${tags.length - 3}`}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(167, 139, 250, 0.05)',
                    color: '#a78bfa',
                    borderRadius: '6px',
                    fontSize: '0.7rem',
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
                fontSize: '1.25rem',
                height: '3rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                fontSize: '0.9rem',
                height: '4rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {excerpt}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: '0.8rem' }}
              >
                {format(new Date(date), 'MMMM d, yyyy')}
              </Typography>

              <MotionBox
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#60a5fa',
                    fontSize: '0.8rem',
                  }}
                >
                  Read More →
                </Typography>
              </MotionBox>
            </Box>
          </CardContent>
        </MotionCard>
      </CardActionArea>
    </Link>
  );
});

export default EnhancedPostCard;