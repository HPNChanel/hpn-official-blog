import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Box } from '@mui/material';
import { useInView } from 'react-intersection-observer';

/**
 * VirtualizedPostContent renders long content with virtualization
 * to improve performance for lengthy blog posts
 */
const VirtualizedPostContent = ({ content, chunkSize = 1000 }) => {
  // Split content into manageable chunks
  const [contentChunks, setContentChunks] = useState([]);
  const [visibleChunks, setVisibleChunks] = useState({});
  const containerRef = useRef(null);
  
  // Create content chunks on mount
  useEffect(() => {
    if (!content || typeof content !== 'string') return;
    
    // Break down content into DOM chunks while preserving HTML structure
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const elements = Array.from(doc.body.children);
    
    // Group elements into chunks
    const chunks = [];
    let currentChunk = [];
    let currentSize = 0;
    
    elements.forEach((element) => {
      const elementSize = element.outerHTML.length;
      
      // If adding this element exceeds chunk size, create a new chunk
      if (currentSize > 0 && currentSize + elementSize > chunkSize) {
        chunks.push(currentChunk.join(''));
        currentChunk = [element.outerHTML];
        currentSize = elementSize;
      } else {
        currentChunk.push(element.outerHTML);
        currentSize += elementSize;
      }
    });
    
    // Add the last chunk
    if (currentChunk.length > 0) {
      chunks.push(currentChunk.join(''));
    }
    
    setContentChunks(chunks);
    
    // Initialize first chunk as visible
    if (chunks.length > 0) {
      setVisibleChunks({ 0: true });
    }
  }, [content, chunkSize]);
  
  // Setup intersection observers for each chunk
  const createObserver = useCallback((index) => {
    const { ref, inView } = useInView({
      threshold: 0,
      triggerOnce: false,
      rootMargin: '200px 0px',
    });
    
    // Update visibility state when chunk comes into view
    useEffect(() => {
      if (inView) {
        setVisibleChunks(prev => ({ ...prev, [index]: true }));
      }
    }, [inView]);
    
    return ref;
  }, []);
  
  if (contentChunks.length === 0) {
    return <div dangerouslySetInnerHTML={{ __html: content || '' }} />;
  }
  
  return (
    <Box ref={containerRef}>
      {contentChunks.map((chunk, index) => {
        // Create ref for this chunk
        const chunkRef = createObserver(index);
        
        // Only render if visible or adjacent to visible chunk
        const shouldRender = visibleChunks[index] || 
                            visibleChunks[index - 1] || 
                            visibleChunks[index + 1];
        
        return (
          <Box 
            key={`chunk-${index}`}
            ref={chunkRef}
            component="div"
            data-chunk-index={index}
            sx={{
              minHeight: shouldRender ? 'auto' : '100px',
            }}
          >
            {shouldRender ? (
              <div dangerouslySetInnerHTML={{ __html: chunk }} />
            ) : (
              <Box sx={{ height: '100px' }} /> // Placeholder
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default React.memo(VirtualizedPostContent);
