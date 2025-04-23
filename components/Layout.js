import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Navbar from './Navbar';
import Footer from './Footer';

// Styled components improve performance over runtime sx props
const Main = styled('main')(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  // Use padding instead of multiple nested containers
  padding: theme.spacing(0, 2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0, 3),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0, 4),
  },
}));

// Use consistent container to prevent layout shift
const ContentContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 1200,
  margin: '0 auto',
  flex: '1 0 auto',
  paddingTop: theme.spacing(10), // Account for fixed navbar
  paddingBottom: theme.spacing(8),
}));

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Main>
        <ContentContainer>
          {children}
        </ContentContainer>
      </Main>
      <Footer />
    </>
  );
}