import React, { memo } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { format } from 'date-fns';

// Pre-styled components reduce runtime CSS-in-JS calculations
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(2),
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const CardDate = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// Using memo for pure component to prevent unnecessary re-renders
const PostCard = memo(function PostCard({ id, title, date, excerpt }) {
  return (
    <Link href={`/posts/${id}`} passHref legacyBehavior>
      <CardActionArea component="a" sx={{ height: '100%' }}>
        <StyledCard elevation={4}>
          <CardContent>
            {/* Set explicit height to prevent layout shift */}
            <Box sx={{ height: '3.5rem', mb: 1 }}>
              <Typography 
                variant="h6" 
                component="h2" 
                gutterBottom
                sx={{
                  fontWeight: 700,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  lineHeight: 1.2,
                }}
              >
                {title}
              </Typography>
            </Box>
            
            <CardDate>
              {format(new Date(date), 'MMMM d, yyyy')}
            </CardDate>
            
            {/* Fixed height excerpt to prevent layout shift */}
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
              {excerpt}
            </Typography>
          </CardContent>
        </StyledCard>
      </CardActionArea>
    </Link>
  );
});

export default PostCard;