// components/blog/SearchBar.js
import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  TextField, 
  InputAdornment, 
  IconButton, 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Chip,
  Divider,
  CircularProgress,
  Collapse,
  Fade
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { format } from 'date-fns';
import { useRouter } from 'next/router';

// Debounce helper function
const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  
  return debouncedValue;
};

const SearchBar = ({ 
  posts = [], 
  maxResults = 5,
  fullWidth = false,
  variant = 'standard', // 'standard', 'compact', 'expandable'
  placeholder = 'Search posts...',
  onSearch = null, // Callback when search is performed
}) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [expanded, setExpanded] = useState(false);
  
  const debouncedQuery = useDebounce(query, 300);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  
  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        resultsRef.current && 
        inputRef.current && 
        !resultsRef.current.contains(event.target) && 
        !inputRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Perform search when query changes
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }
    
    setIsSearching(true);
    
    // Simulate search delay
    const searchTimer = setTimeout(() => {
      const searchResults = searchPosts(debouncedQuery);
      setResults(searchResults);
      setIsSearching(false);
      
      // Call the onSearch callback if provided
      if (onSearch) {
        onSearch(searchResults);
      }
    }, 300);
    
    return () => clearTimeout(searchTimer);
  }, [debouncedQuery, posts, maxResults, onSearch]);
  
  // Search function to filter posts
  const searchPosts = (searchQuery) => {
    const normalizedQuery = searchQuery.toLowerCase().trim();
    
    return posts.filter(post => 
      post.title.toLowerCase().includes(normalizedQuery) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(normalizedQuery)) ||
      (post.description && post.description.toLowerCase().includes(normalizedQuery)) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(normalizedQuery)))
    ).slice(0, maxResults);
  };
  
  // Clear search input
  const clearSearch = () => {
    setQuery('');
    setResults([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Toggle expanded state for expandable variant
  const toggleExpanded = () => {
    setExpanded(!expanded);
    if (!expanded && inputRef.current) {
      // Focus the input after expansion
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  };
  
  // Handle item click to navigate
  const handleResultClick = (postId) => {
    router.push(`/posts/${postId}`);
    setIsFocused(false);
    setResults([]);
  };
  
  // Compact variant
  if (variant === 'compact') {
    return (
      <Box sx={{ position: 'relative', width: fullWidth ? '100%' : 'auto' }}>
        <TextField
          inputRef={inputRef}
          size="small"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          variant="outlined"
          sx={{
            width: fullWidth ? '100%' : 240,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: theme => theme.palette.mode === 'dark' 
                ? 'rgba(15, 23, 42, 0.6)' 
                : 'rgba(255, 255, 255, 0.8)',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.light',
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {isSearching ? (
                  <CircularProgress size={20} color="inherit" />
                ) : query ? (
                  <IconButton 
                    edge="end" 
                    onClick={clearSearch}
                    size="small"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                ) : null}
              </InputAdornment>
            ),
          }}
        />
        
        {/* Search Results Dropdown */}
        <AnimatePresence>
          {isFocused && results.length > 0 && (
            <motion.div
              ref={resultsRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                zIndex: 10,
                marginTop: '4px',
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  maxHeight: 400,
                  overflowY: 'auto',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <List dense disablePadding>
                  {results.map((post, index) => (
                    <React.Fragment key={post.id}>
                      {index > 0 && <Divider />}
                      <ListItem 
                        button
                        onClick={() => handleResultClick(post.id)}
                        sx={{ 
                          py: 1.5,
                          px: 2,
                          transition: 'all 0.2s',
                          '&:hover': {
                            backgroundColor: 'rgba(167, 139, 250, 0.08)',
                          }
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography 
                              variant="body2" 
                              sx={{ fontWeight: 600 }}
                            >
                              {post.title}
                            </Typography>
                          }
                          secondary={
                            <Box sx={{ mt: 0.5 }}>
                              <Typography 
                                variant="caption" 
                                color="text.secondary"
                                sx={{ display: 'block', mb: 0.5 }}
                              >
                                {format(new Date(post.date), 'MMM d, yyyy')}
                              </Typography>
                            </Box>
                          }
                        />
                        <ArrowForwardIcon 
                          fontSize="small" 
                          sx={{ color: 'text.secondary', ml: 1 }}
                        />
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    );
  }
  
  // Expandable variant
  if (variant === 'expandable') {
    return (
      <Box 
        sx={{ 
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <AnimatePresence>
          {expanded ? (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 240, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TextField
                inputRef={inputRef}
                size="small"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  if (!query) {
                    setExpanded(false);
                  }
                }}
                variant="outlined"
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: theme => theme.palette.mode === 'dark' 
                      ? 'rgba(15, 23, 42, 0.6)' 
                      : 'rgba(255, 255, 255, 0.8)',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {isSearching ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : query ? (
                        <IconButton 
                          edge="end" 
                          onClick={clearSearch}
                          size="small"
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      ) : (
                        <IconButton 
                          edge="end" 
                          onClick={toggleExpanded}
                          size="small"
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </motion.div>
          ) : (
            <IconButton
              color="inherit"
              onClick={toggleExpanded}
              size="medium"
              sx={{
                borderRadius: 2,
                p: 1,
                '&:hover': {
                  backgroundColor: 'rgba(167, 139, 250, 0.1)',
                }
              }}
            >
              <SearchIcon />
            </IconButton>
          )}
        </AnimatePresence>
        
        {/* Search Results Dropdown */}
        <AnimatePresence>
          {expanded && isFocused && results.length > 0 && (
            <motion.div
              ref={resultsRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                width: 280,
                zIndex: 10,
                marginTop: '4px',
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  maxHeight: 400,
                  overflowY: 'auto',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <List dense disablePadding>
                  {results.map((post, index) => (
                    <React.Fragment key={post.id}>
                      {index > 0 && <Divider />}
                      <ListItem 
                        button
                        onClick={() => handleResultClick(post.id)}
                        sx={{ 
                          py: 1.5,
                          px: 2,
                          transition: 'all 0.2s',
                          '&:hover': {
                            backgroundColor: 'rgba(167, 139, 250, 0.08)',
                          }
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography 
                              variant="body2" 
                              sx={{ fontWeight: 600 }}
                            >
                              {post.title}
                            </Typography>
                          }
                          secondary={
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                            >
                              {format(new Date(post.date), 'MMM d, yyyy')}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    );
  }
  
  // Standard variant (default)
  return (
    <Box sx={{ position: 'relative', width: fullWidth ? '100%' : 'auto' }}>
      <TextField
        inputRef={inputRef}
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        variant="outlined"
        fullWidth={fullWidth}
        sx={{
          width: fullWidth ? '100%' : 300,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: theme => theme.palette.mode === 'dark' 
              ? 'rgba(15, 23, 42, 0.6)' 
              : 'rgba(255, 255, 255, 0.8)',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.light',
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {isSearching ? (
                <CircularProgress size={24} color="inherit" />
              ) : query ? (
                <IconButton edge="end" onClick={clearSearch}>
                  <CloseIcon />
                </IconButton>
              ) : null}
            </InputAdornment>
          ),
        }}
      />
      
      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isFocused && results.length > 0 && (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 10,
              marginTop: '8px',
            }}
          >
            <Paper
              elevation={3}
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                maxHeight: 500,
                overflowY: 'auto',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <List disablePadding>
                {results.map((post, index) => (
                  <React.Fragment key={post.id}>
                    {index > 0 && <Divider />}
                    <ListItem 
                      button
                      onClick={() => handleResultClick(post.id)}
                      sx={{ 
                        py: 2,
                        px: 3,
                        transition: 'all 0.2s',
                        '&:hover': {
                          backgroundColor: 'rgba(167, 139, 250, 0.08)',
                        }
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography 
                            variant="subtitle1" 
                            sx={{ fontWeight: 600 }}
                          >
                            {post.title}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              sx={{ display: 'block', mb: 1 }}
                            >
                              {format(new Date(post.date), 'MMMM d, yyyy')}
                            </Typography>
                            
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                              sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                mb: 1,
                              }}
                            >
                              {post.excerpt || post.description}
                            </Typography>
                            
                            {post.tags && post.tags.length > 0 && (
                              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                {post.tags.map(tag => (
                                  <Chip
                                    key={tag}
                                    label={tag}
                                    size="small"
                                    sx={{
                                      height: 20,
                                      fontSize: '0.7rem',
                                      backgroundColor: 'rgba(167, 139, 250, 0.1)',
                                      color: 'primary.light',
                                    }}
                                  />
                                ))}
                              </Box>
                            )}
                          </Box>
                        }
                      />
                      <ArrowForwardIcon 
                        sx={{ color: 'text.secondary', ml: 1 }}
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default SearchBar;