// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../lib/createEmotionCache';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Preconnect to critical origins */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          
          {/* DNS prefetch for third party services */}
          <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          
          {/* Preload critical fonts */}
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap&subset=vietnamese"
            as="style"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap&subset=vietnamese"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500&display=swap"
            rel="stylesheet"
          />
          
          {/* Theme color for browser UIs */}
          <meta name="theme-color" content="#a78bfa" />
          
          {/* PWA manifest */}
          <link rel="manifest" href="/manifest.json" />
          
          <style jsx global>{`
            :root {
              --font-vietnamese: "Be Vietnam Pro", system-ui, -apple-system, sans-serif;
              --line-height-vietnamese: 1.8;
              --line-height-vietnamese-heading: 1.4;
              --letter-spacing-vietnamese: -0.01em;
              --letter-spacing-vietnamese-heading: -0.015em;
            }
            
            /* Optimize font rendering for Vietnamese */
            @font-face {
              font-family: 'Be Vietnam Pro';
              font-style: normal;
              font-weight: 400;
              font-display: swap;
              src: url(https://fonts.gstatic.com/s/bevietnampro/v10/QdVPSTAyLFyeg_IDWvOJmVES_HRUBX8YYQ.woff2) format('woff2');
              unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
            }
            
            /* Skip to content focus styles */
            .skip-to-content {
              position: absolute;
              top: -50px;
              left: 0;
              padding: 8px 16px;
              background-color: #a78bfa;
              color: white;
              font-weight: 600;
              z-index: 9999;
              transition: top 0.3s;
            }
            
            .skip-to-content:focus {
              top: 0;
              outline: 2px solid #60a5fa;
              outline-offset: 2px;
            }
            
            /* Enhanced focus styles for accessibility */
            :focus-visible {
              outline: 2px solid #a78bfa;
              outline-offset: 3px;
              border-radius: 2px;
            }
          `}</style>
          
          {/* PWA settings */}
          <meta name="application-name" content="HPN Blog" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="HPN Blog" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          
          {/* Favicons */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
          <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
          
          {/* Emotion cache insertion point */}
          {this.props.emotionStyleTags}
        </Head>
        <body>
          {/* Skip to content link for accessibility */}
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`)
MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  
  // Create Emotion cache for server-side rendering
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);
  
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => <App emotionCache={cache} {...props} />,
    });
  
  const initialProps = await Document.getInitialProps(ctx);
  
  // This is important. It prevents Emotion from rendering invalid HTML.
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