// components/EnhancedPostCard.js
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Link from 'next/link';
import { format } from 'date-fns';

// Using Framer Motion with MUI
const MotionCard = motion(Card);

const EnhancedPostCard = memo(function EnhancedPostCard({ id, title, date, excerpt, tags = [] }) {
  return (
    <Link href={`/posts/${id}`} passHref legacyBehavior>
      <CardActionArea component="a" sx={{ height: '100%' }}>
        <MotionCard
          elevation={4}
          whileHover={{ 
            y: -10,
            boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2), 0 0 15px rgba(167, 139, 250, 0.2)"
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20 
          }}
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
          <CardContent sx={{ p: 3, flexGrow: 1 }}>
            {/* Tags */}
            <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  component={motion.div}
                  whileHover={{ scale: 1.05 }}
                  sx={{
                    backgroundColor: 'rgba(167, 139, 250, 0.15)',
                    color: '#a78bfa',
                    borderRadius: '6px',
                    fontSize: '0.7rem',
                  }}
                />
              ))}
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

            {/* Date */}
            <Box 
              component={motion.div}
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 'auto',
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {format(new Date(date), 'MMMM d, yyyy')}
              </Typography>
              
              <motion.div
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
              </motion.div>
            </Box>
          </CardContent>
        </MotionCard>
      </CardActionArea>
    </Link>
  );
});

export default EnhancedPostCard;