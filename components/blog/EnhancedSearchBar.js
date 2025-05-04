// components/blog/EnhancedSearchBar.js
import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  Fade,
  Tabs,
  Tab,
  Badge,
  Button,
  Popover
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { slugifyTag } from '../../lib/posts';

// Animation variants
const searchContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

const resultsVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

// Custom hook for debouncing values
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

const EnhancedSearchBar = ({ 
  posts = [], 
  maxResults = 5,
  fullWidth = false,
  variant = 'standard', // 'standard', 'compact', 'expandable'
  placeholder = 'Search posts...',
  onSearch = null, // Callback when search is performed
  savedPosts = [],
  onSave = null, // Callback to save/unsave a post
  searchHistory = [], // Array of recent searches
  onClearHistory = null, // Callback to clear history
}) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [searchTab, setSearchTab] = useState(0); // 0: Results, 1: Saved, 2: History
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  
  // Filter states
  const [selectedTags, setSelectedTags] = useState([]);
  const [dateFilter, setDateFilter] = useState('all'); // 'all', 'thisMonth', 'thisYear'
  
  const debouncedQuery = useDebounce(query, 300);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  
  // Extract unique tags for filters
  const allTags = useMemo(() => {
    const tagsSet = new Set();
    posts.forEach(post => {
      (post.tags || []).forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  }, [posts]);
  
  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        resultsRef.current && 
        inputRef.current && 
        !resultsRef.current.contains(event.target) && 
        !inputRef.current.contains(event.target) &&
        !filterAnchorEl // Don't close if filter popover is open
      ) {
        setIsFocused(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [filterAnchorEl]);
  
  // Filter posts based on criteria
  const filterPosts = (posts, query, tags, dateFilter) => {
    return posts.filter(post => {
      // Text search
      const matchesQuery = !query ? true : (
        post.title?.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(query.toLowerCase()) ||
        post.description?.toLowerCase().includes(query.toLowerCase()) ||
        (post.tags || []).some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      
      // Tag filter
      const matchesTags = tags.length === 0 ? true : (
        tags.every(tag => (post.tags || []).includes(tag))
      );
      
      // Date filter
      let matchesDate = true;
      if (dateFilter !== 'all') {
        const postDate = new Date(post.date);
        const now = new Date();
        
        if (dateFilter === 'thisMonth') {
          matchesDate = (
            postDate.getMonth() === now.getMonth() && 
            postDate.getFullYear() === now.getFullYear()
          );
        } else if (dateFilter === 'thisYear') {
          matchesDate = postDate.getFullYear() === now.getFullYear();
        }
      }
      
      return matchesQuery && matchesTags && matchesDate;
    });
  };
  
  // Perform search when query or filters change
  useEffect(() => {
      if (!debouncedQuery.trim() && selectedTags.length === 0 && dateFilter === 'all') {
        setResults([]);
        return;
      }
      
      setIsSearching(true);
      
      // Simulate search delay for UX
      const searchTimer = setTimeout(() => {
        const filteredResults = filterPosts(posts, debouncedQuery, selectedTags, dateFilter);
        setResults(filteredResults.slice(0, maxResults));
        setIsSearching(false);
        
        // Call the onSearch callback if provided
        if (onSearch) {
          onSearch(filteredResults);
        }
      }, 300);
      
      return () => clearTimeout(searchTimer);
    }, [debouncedQuery, posts, maxResults, onSearch, selectedTags, dateFilter]);
    
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
      
      // Add to search history if not already present
      if (onSearch && !searchHistory.includes(query) && query.trim()) {
        onSearch({ type: 'addHistory', value: query.trim() });
      }
    };
    
    // Handle search tab change
    const handleTabChange = (event, newValue) => {
      setSearchTab(newValue);
    };
    
    // Toggle tag selection
    const handleTagToggle = (tag) => {
      setSelectedTags(prev => 
        prev.includes(tag) 
          ? prev.filter(t => t !== tag) 
          : [...prev, tag]
      );
    };
    
    // Open filter popover
    const handleOpenFilters = (event) => {
      setFilterAnchorEl(event.currentTarget);
    };
    
    // Close filter popover
    const handleCloseFilters = () => {
      setFilterAnchorEl(null);
    };
    
    // Reset filters
    const handleResetFilters = () => {
      setSelectedTags([]);
      setDateFilter('all');
    };
    
    // The filter popover component
    const filterPopover = (
      <Popover
        open={Boolean(filterAnchorEl)}
        anchorEl={filterAnchorEl}
        onClose={handleCloseFilters}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            p: 3,
            width: 320,
            maxHeight: 400,
            borderRadius: 2,
            backgroundColor: 'background.paper',
            boxShadow: 4,
          }
        }}
      >
        <Typography variant="h6" gutterBottom>
          Filter Results
        </Typography>
        
        <Divider sx={{ mb: 2 }} />
        
        <Typography variant="subtitle2" gutterBottom>
          By Tags
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          {allTags.slice(0, 10).map(tag => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              color={selectedTags.includes(tag) ? "primary" : "default"}
              onClick={() => handleTagToggle(tag)}
              sx={{
                borderRadius: 1,
                '&.MuiChip-colorDefault': {
                  backgroundColor: 'rgba(167, 139, 250, 0.1)',
                }
              }}
            />
          ))}
        </Box>
        
        <Typography variant="subtitle2" gutterBottom>
          By Date
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          <Chip
            label="All Time"
            size="small"
            color={dateFilter === 'all' ? "primary" : "default"}
            onClick={() => setDateFilter('all')}
            sx={{ borderRadius: 1 }}
          />
          <Chip
            label="This Month"
            size="small"
            color={dateFilter === 'thisMonth' ? "primary" : "default"}
            onClick={() => setDateFilter('thisMonth')}
            sx={{ borderRadius: 1 }}
          />
          <Chip
            label="This Year"
            size="small"
            color={dateFilter === 'thisYear' ? "primary" : "default"}
            onClick={() => setDateFilter('thisYear')}
            sx={{ borderRadius: 1 }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button 
            size="small" 
            variant="text" 
            onClick={handleResetFilters}
          >
            Reset
          </Button>
          <Button 
            size="small" 
            variant="contained" 
            onClick={handleCloseFilters}
          >
            Apply
          </Button>
        </Box>
      </Popover>
    );
    
    // Calculate counts for tabs
    const savedCount = savedPosts.length;
    const historyCount = searchHistory.length;
    
    // Get content for current tab
    const getTabContent = () => {
      switch (searchTab) {
        case 0: // Results
          return (
            <>
              {isSearching ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress size={30} />
                </Box>
              ) : results.length > 0 ? (
                <List dense disablePadding>
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
                            <Box sx={{ mt: 0.5 }}>
                              <Typography 
                                variant="caption" 
                                color="text.secondary"
                                sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  gap: 0.5,
                                  mb: 0.5 
                                }}
                              >
                                <AccessTimeIcon sx={{ fontSize: '0.9rem' }} />
                                {format(new Date(post.date), 'MMMM d, yyyy')}
                              </Typography>
                              
                              {post.tags && post.tags.length > 0 && (
                                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                                  {post.tags.slice(0, 2).map(tag => (
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
                        <IconButton 
                          size="small" 
                          sx={{ ml: 1 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onSave) onSave(post.id);
                          }}
                        >
                          <BookmarkIcon 
                            color={savedPosts.includes(post.id) ? "primary" : "disabled"} 
                            fontSize="small" 
                          />
                        </IconButton>
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography color="text.secondary">
                    {debouncedQuery ? 'No results found' : 'Start typing to search'}
                  </Typography>
                </Box>
              )}
            </>
          );
        
        case 1: // Saved
          return (
            <>
              {savedPosts.length > 0 ? (
                <List dense disablePadding>
                  {posts.filter(post => savedPosts.includes(post.id)).map((post, index) => (
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
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                            >
                              {format(new Date(post.date), 'MMMM d, yyyy')}
                            </Typography>
                          }
                        />
                        <IconButton 
                          size="small" 
                          color="primary" 
                          sx={{ ml: 1 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onSave) onSave(post.id);
                          }}
                        >
                          <BookmarkIcon fontSize="small" />
                        </IconButton>
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography color="text.secondary">
                    No saved posts yet
                  </Typography>
                </Box>
              )}
            </>
          );
        
        case 2: // History
          return (
            <>
              {searchHistory.length > 0 ? (
                <>
                  <List dense disablePadding>
                    {searchHistory.map((term, index) => (
                      <React.Fragment key={index}>
                        {index > 0 && <Divider />}
                        <ListItem 
                          button
                          onClick={() => {
                            setQuery(term);
                            setSearchTab(0); // Switch to results tab
                          }}
                          sx={{ 
                            py: 1.5,
                            px: 3,
                          }}
                        >
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <SearchIcon sx={{ mr: 1, fontSize: '0.9rem', color: 'text.secondary' }} />
                                <Typography variant="body2">{term}</Typography>
                              </Box>
                            }
                          />
                          <IconButton 
                            size="small" 
                            sx={{ ml: 1 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSearch) onSearch({ type: 'removeHistory', value: term });
                            }}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </ListItem>
                      </React.Fragment>
                    ))}
                  </List>
                  
                  {onClearHistory && (
                    <Box sx={{ p: 2, textAlign: 'center' }}>
                      <Button 
                        size="small" 
                        variant="text" 
                        onClick={onClearHistory}
                      >
                        Clear History
                      </Button>
                    </Box>
                  )}
                </>
              ) : (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography color="text.secondary">
                    No search history
                  </Typography>
                </Box>
              )}
            </>
          );
        
        default:
          return null;
      }
    };
  
    // Expandable variant
    if (variant === 'expandable') {
      return (
        <Box 
          component={motion.div}
          variants={searchContainerVariants}
          initial="hidden"
          animate="visible"
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
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ position: 'relative' }}
              >
                <TextField
                  inputRef={inputRef}
                  size="small"
                  placeholder={placeholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  variant="outlined"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 8,
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
                            onClick={handleOpenFilters}
                            size="small"
                          >
                            <Badge 
                              color="primary" 
                              variant="dot" 
                              invisible={selectedTags.length === 0 && dateFilter === 'all'}
                            >
                              <TuneIcon fontSize="small" />
                            </Badge>
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
                
                <IconButton
                  size="small"
                  onClick={toggleExpanded}
                  sx={{
                    position: 'absolute',
                    right: -40,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'background.paper',
                    boxShadow: 1,
                    '&:hover': { backgroundColor: 'action.hover' }
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
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
          
          {/* Filter popover */}
          {filterPopover}
          
          {/* Search Results Dropdown */}
          <AnimatePresence>
            {expanded && isFocused && (results.length > 0 || savedPosts.length > 0 || searchHistory.length > 0) && (
              <Box
                component={motion.div}
                ref={resultsRef}
                variants={resultsVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                sx={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  width: 350,
                  zIndex: 10,
                  marginTop: '8px',
                }}
              >
                <Paper
                  elevation={5}
                  sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    maxHeight: 450,
                    backgroundColor: 'background.paper',
                  }}
                >
                  {/* Tabs */}
                  <Tabs
                    value={searchTab}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    sx={{ borderBottom: 1, borderColor: 'divider' }}
                  >
                    <Tab 
                      label={
                        <Badge 
                          badgeContent={results.length} 
                          color="primary"
                          invisible={results.length === 0}
                        >
                          Results
                        </Badge>
                      } 
                    />
                    <Tab 
                      label={
                        <Badge 
                          badgeContent={savedCount} 
                          color="primary"
                          invisible={savedCount === 0}
                        >
                          Saved
                        </Badge>
                      } 
                    />
                    <Tab 
                      label={
                        <Badge 
                          badgeContent={historyCount} 
                          color="primary"
                          invisible={historyCount === 0}
                        >
                          History
                        </Badge>
                      } 
                    />
                  </Tabs>
                  
                  {/* Tab content */}
                  <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                    {getTabContent()}
                  </Box>
                </Paper>
              </Box>
            )}
          </AnimatePresence>
        </Box>
      );
    }
  
    // Standard variant (default)
    return (
      <Box 
        sx={{ 
          position: 'relative', 
          width: fullWidth ? '100%' : 'auto',
        }}
      >
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
                ) : (
                  <IconButton edge="end" onClick={handleOpenFilters}>
                    <Badge 
                      color="primary" 
                      variant="dot" 
                      invisible={selectedTags.length === 0 && dateFilter === 'all'}
                    >
                      <TuneIcon />
                    </Badge>
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
        
        {/* Filter popover */}
        {filterPopover}
        
        {/* Search Results Dropdown */}
        <AnimatePresence>
          {isFocused && (results.length > 0 || savedPosts.length > 0 || searchHistory.length > 0) && (
            <Box
              component={motion.div}
              ref={resultsRef}
              variants={resultsVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              sx={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                zIndex: 10,
                marginTop: '8px',
              }}
            >
              <Paper
                elevation={5}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  maxHeight: 600,
                  backgroundColor: 'background.paper',
                }}
              >
                {/* Tabs */}
                <Tabs
                  value={searchTab}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  sx={{ borderBottom: 1, borderColor: 'divider' }}
                >
                  <Tab 
                    label={
                      <Badge 
                        badgeContent={results.length} 
                        color="primary"
                        invisible={results.length === 0}
                      >
                        Results
                      </Badge>
                    } 
                  />
                  <Tab 
                    label={
                      <Badge 
                        badgeContent={savedCount} 
                        color="primary"
                        invisible={savedCount === 0}
                      >
                        Saved
                      </Badge>
                    } 
                  />
                  <Tab 
                    label={
                      <Badge 
                        badgeContent={historyCount} 
                        color="primary"
                        invisible={historyCount === 0}
                      >
                        History
                      </Badge>
                    } 
                  />
                </Tabs>
                
                {/* Tab content */}
                <Box sx={{ maxHeight: 500, overflow: 'auto' }}>
                  {getTabContent()}
                </Box>
              </Paper>
            </Box>
          )}
        </AnimatePresence>
      </Box>
    );
  };
  
  export default EnhancedSearchBar;