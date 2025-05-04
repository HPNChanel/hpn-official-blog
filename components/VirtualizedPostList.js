import React, { useState, useEffect, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import { useInView } from 'react-intersection-observer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { getEstimatedSizeForItem } from '../lib/vietnameseOptimizer';
import EnhancedPostCard from './blog/EnhancedPostCard';

// Default row height (will be overridden for Vietnamese content)
const DEFAULT_ROW_HEIGHT = 520;
// Height for xs/sm screens
const MOBILE_ROW_HEIGHT = 450;

const VirtualizedPostList = ({ posts, containerWidth, containerHeight }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'));
  
  // Calculate how many items per row based on screen size
  const itemsPerRow = isLarge ? 3 : (isTablet ? 2 : 1);
  
  // Calculate how many rows we need
  const rowCount = Math.ceil(posts.length / itemsPerRow);
  
  // Calculate row height based on content
  const rowHeight = isMobile ? MOBILE_ROW_HEIGHT : DEFAULT_ROW_HEIGHT;
  
  // Ref for measurement
  const [listHeight, setListHeight] = useState(
    containerHeight || rowCount * rowHeight
  );
  
  // Handle resize events
  useEffect(() => {
    const height = containerHeight || rowCount * rowHeight;
    setListHeight(Math.min(height, window.innerHeight * 0.8));
  }, [containerHeight, rowCount, rowHeight]);

  // Render row with multiple items side by side
  const RowRenderer = useCallback(({ index, style }) => {
    const fromIndex = index * itemsPerRow;
    const toIndex = Math.min(fromIndex + itemsPerRow, posts.length);
    
    // Get posts for this row
    const rowPosts = posts.slice(fromIndex, toIndex);
    
    return (
      <div style={style}>
        <Grid container spacing={3}>
          {rowPosts.map((post, i) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <EnhancedPostCard post={post} index={fromIndex + i} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }, [posts, itemsPerRow]);

  // Calculate optimal fixed size list height
  const calculatedHeight = Math.min(
    rowCount * rowHeight,
    containerHeight || window.innerHeight * 0.8
  );

  // Handle empty state
  if (!posts || posts.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 5 }}>
        <Typography>No posts found</Typography>
      </Box>
    );
  }

  return (
    <List
      height={calculatedHeight}
      itemCount={rowCount}
      itemSize={rowHeight}
      width="100%"
      overscanCount={2} // Render 2 items outside viewport
    >
      {RowRenderer}
    </List>
  );
};

/**
 * Version of the list that lazy loads when scrolled into view
 */
export const LazyVirtualizedPostList = ({ posts, ...props }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      {!inView ? (
        <Box sx={{ py: 5, textAlign: 'center' }}>
          <CircularProgress size={36} />
        </Box>
      ) : (
        <VirtualizedPostList posts={posts} {...props} />
      )}
    </div>
  );
};

export default VirtualizedPostList;
