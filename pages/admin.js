import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import ReactMarkdown from 'react-markdown';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';

// This editor is only available in development mode
export default function AdminEditor() {
  const router = useRouter();
  const [isProduction, setIsProduction] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    tags: '',
    content: '',
    slug: ''
  });

  // Check if we're in production when component mounts
  useEffect(() => {
    // This will always be 'development' on the client side in development
    // but will be 'production' in production builds
    const isProd = process.env.NODE_ENV === 'production';
    setIsProduction(isProd);
    
    // Redirect if in production
    if (isProd) {
      router.push('/');
    }
  }, [router]);

  // Generate slug from title
  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    setPostData({
      ...postData,
      title,
      slug
    });
  };

  // Update any field in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value
    });
  };

  // Save the post as a markdown file
  const handleSave = async () => {
    if (!postData.title || !postData.content) {
      setNotification({
        open: true,
        message: 'Title and content are required!',
        severity: 'error'
      });
      return;
    }

    setSaving(true);
    
    try {
      const response = await fetch('/api/save-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...postData,
          // Format tags as an array from comma-separated string
          tags: postData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setNotification({
          open: true,
          message: `Post saved as ${data.filename}`,
          severity: 'success'
        });
        
        // Optional: Reset form after successful save
        setPostData({
          title: '',
          description: '',
          tags: '',
          content: '',
          slug: ''
        });
      } else {
        throw new Error(data.error || 'Failed to save post');
      }
    } catch (error) {
      setNotification({
        open: true,
        message: error.message,
        severity: 'error'
      });
    } finally {
      setSaving(false);
    }
  };

  // Handle notification close
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };
  
  // If in production, show nothing (we'll redirect)
  if (isProduction) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Admin Post Editor</title>
      </Head>
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(167, 139, 250, 0.2)',
            borderRadius: 2,
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Admin Post Editor
          </Typography>
          
          <Alert severity="warning" sx={{ mb: 3 }}>
            This editor is for local development only. Files will be saved directly to your /posts directory.
          </Alert>
          
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Post Title"
              name="title"
              value={postData.title}
              onChange={handleTitleChange}
              margin="normal"
              variant="outlined"
              required
            />
            
            <TextField
              fullWidth
              label="Slug"
              name="slug"
              value={postData.slug}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              helperText="Auto-generated from title, but you can edit it"
            />
            
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={postData.description}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              multiline
              rows={2}
            />
            
            <TextField
              fullWidth
              label="Tags (comma-separated)"
              name="tags"
              value={postData.tags}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              helperText="Example: Next.js, React, Web Development"
            />
            
            {/* Show tags preview */}
            {postData.tags && (
              <Box sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Tags Preview:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {postData.tags.split(',').map((tag, index) => (
                    tag.trim() && (
                      <Chip 
                        key={index} 
                        label={tag.trim()} 
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(167, 139, 250, 0.1)',
                          color: '#a78bfa',
                          mb: 1,
                        }}
                      />
                    )
                  ))}
                </Stack>
              </Box>
            )}
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={showPreview} 
                    onChange={() => setShowPreview(!showPreview)}
                    color="primary"
                  />
                }
                label="Show Preview"
              />
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            {showPreview ? (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Content Preview
                </Typography>
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 3, 
                    minHeight: '300px',
                    background: 'rgba(255, 255, 255, 0.03)',
                  }}
                >
                  <ReactMarkdown>{postData.content}</ReactMarkdown>
                </Paper>
                <Button 
                  variant="text" 
                  onClick={() => setShowPreview(false)}
                  sx={{ mt: 2 }}
                >
                  Back to Editor
                </Button>
              </Box>
            ) : (
              <TextField
                fullWidth
                label="Content (Markdown)"
                name="content"
                value={postData.content}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                multiline
                rows={12}
                required
                placeholder="# Your Markdown Content Here\n\nWrite your blog post using Markdown syntax..."
              />
            )}
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={saving || !postData.title || !postData.content}
                sx={{
                  borderRadius: '12px',
                  background: 'linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)',
                  fontSize: '1rem',
                  px: 3,
                  py: 1.2,
                  boxShadow: '0 0 20px rgba(96, 165, 250, 0.3)',
                  transition: 'all 0.3s ease',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 10px 25px rgba(96, 165, 250, 0.5)',
                  },
                }}
              >
                {saving ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Generate & Save Post'
                )}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
      
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
}