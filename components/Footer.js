// components/Footer.js
import React from 'react';
import { Box, Container, Typography, IconButton, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box component="footer" sx={{ mt: 'auto', py: 6, backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Divider sx={{ mb: 4 }} />
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: { xs: 2, md: 0 } }}>
            © {new Date().getFullYear()} My Personal Blog. All rights reserved.
          </Typography>
          <Box>
            <IconButton color="primary" aria-label="github" component="a" href="https://github.com" target="_blank" rel="noopener">
              <GitHubIcon />
            </IconButton>
            <IconButton color="primary" aria-label="twitter" component="a" href="https://twitter.com" target="_blank" rel="noopener">
              <TwitterIcon />
            </IconButton>
            <IconButton color="primary" aria-label="linkedin" component="a" href="https://linkedin.com" target="_blank" rel="noopener">
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;