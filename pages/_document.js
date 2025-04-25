// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../lib/createEmotionCache';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Preconnect to font domains */}
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          
          {/* Self-hosted fonts with preload */}
          <link
            rel="preload"
            href="/fonts/poppins-v20-latin-500.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/poppins-v20-latin-700.woff2" 
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          
          {/* Modern font-display strategy */}
          <style dangerouslySetInnerHTML={{
            __html: `
              /* Latin */
              @font-face {
                font-family: 'Poppins';
                font-style: normal;
                font-weight: 500;
                font-display: swap; /* Show text while loading */
                src: url('/fonts/poppins-v20-latin-500.woff2') format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
              }
              @font-face {
                font-family: 'Poppins';
                font-style: normal;
                font-weight: 700;
                font-display: swap;
                src: url('/fonts/poppins-v20-latin-700.woff2') format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
              }
              
              /* Font fallback strategy to prevent layout shift */
              html {
                font-family: Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
              }
            `
          }} />
          
          {/* Add fallback fonts for better CLS scores */}
          <style dangerouslySetInnerHTML={{
            __html: `
              /* Calculate fallback fonts with similar x-height and width */
              .font-fallback {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              }
              /* Size adjustments to match your custom font */
              .font-poppins {
                font-family: 'Poppins', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                /* Adjust these values based on your font comparison */
                font-size-adjust: 0.5;
                letter-spacing: -0.0125em;
              }
            `
          }} />
          
          {this.props.emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// Implementation of getInitialProps for proper emotion cache handling
MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => <App emotionCache={cache} {...props} />,
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};

export default MyDocument;