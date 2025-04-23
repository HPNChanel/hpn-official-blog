import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as CustomThemeProvider } from '../styles/themes/context';
import createEmotionCache from '../lib/createEmotionCache';
import Layout from '../components/Layout';

// Client-side cache, shared for the whole session
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Remove server-side injected CSS on mount
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        {/* theme-color is now dynamically set in the ThemeProvider */}
      </Head>
      
      {/* Use our custom ThemeProvider which includes MUI's ThemeProvider internally */}
      <CustomThemeProvider>
        {/* CssBaseline is now included in our CustomThemeProvider */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CustomThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};