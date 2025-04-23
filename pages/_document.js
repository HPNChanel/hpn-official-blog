import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../lib/createEmotionCache';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Preload critical fonts with proper attributes */}
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
          {/* Add font-display: swap in your CSS */}
          <style dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'Poppins';
                font-style: normal;
                font-weight: 500;
                font-display: swap;
                src: url('/fonts/poppins-v20-latin-500.woff2') format('woff2');
              }
              @font-face {
                font-family: 'Poppins';
                font-style: normal;
                font-weight: 700;
                font-display: swap;
                src: url('/fonts/poppins-v20-latin-700.woff2') format('woff2');
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