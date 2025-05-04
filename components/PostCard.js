import React, { memo } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { blurDataURLForImage } from '../utils/imageUtils';

// Pre-styled components reduce runtime CSS-in-JS calculations
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(2),
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  backgroundColor: theme.palette.background.paper,
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const CardDate = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  paddingTop: '56.25%', // 16:9 aspect ratio
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
  overflow: 'hidden',
}));

const TagsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.5),
  marginBottom: theme.spacing(1.5),
}));

// Using memo for pure component to prevent unnecessary re-renders
const PostCard = memo(function PostCard({
  id,
  title,
  date,
  excerpt,
  coverImage,
  tags = [],
  readingTime,
  priority = false,
}) {
  const formattedDate = format(new Date(date), 'MMMM d, yyyy');
  const postUrl = `/posts/${id}`;
  const blurDataUrl = blurDataURLForImage(coverImage);

  return (
    <Link href={postUrl} passHref legacyBehavior>
      <CardActionArea 
        component="a" 
        sx={{ height: '100%' }}
        aria-labelledby={`post-title-${id}`}
      >
        <StyledCard elevation={2}>
          {/* Image with next/image for optimal loading */}
          {coverImage && (
            <ImageWrapper>
              <Image
                src={coverImage}
                alt={`Cover image for ${title}`}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                priority={priority}
                placeholder={blurDataUrl ? "blur" : "empty"}
                blurDataURL={blurDataUrl}
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </ImageWrapper>
          )}
          
          <CardContent sx={{ p: 3, flexGrow: 1 }}>
            {/* Tags */}
            {tags.length > 0 && (
              <TagsContainer>
                {tags.slice(0, 3).map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(167, 139, 250, 0.15)',
                      color: '#a78bfa',
                      height: 24,
                      fontSize: '0.7rem',
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.location.href = `/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`;
                    }}
                  />
                ))}
                {tags.length > 3 && (
                  <Chip
                    label={`+${tags.length - 3}`}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: 'text.secondary',
                      height: 24,
                      fontSize: '0.7rem',
                    }}
                  />
                )}
              </TagsContainer>
            )}
            
            {/* Set explicit height to prevent layout shift */}
            <Box sx={{ height: '3.5rem', mb: 1 }}>
              <Typography 
                id={`post-title-${id}`}
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
              {formattedDate}
              {readingTime && (
                <>
                  <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 12 }} />
                  <Typography variant="caption" color="text.secondary">
                    {readingTime} min read
                  </Typography>
                </>
              )}
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