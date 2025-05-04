const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const withBundleAnalyzer = process.env.ANALYZE === 'true' 
  ? require('@next/bundle-analyzer')({ enabled: true })
  : (config) => config;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable source maps in production for smaller bundle
  productionBrowserSourceMaps: false,
  // Enable compression
  compress: true,
  
  // Advanced image optimization configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // // Font optimization for Vietnamese content
  // fontOptimization: {
  //   preload: true,
  //   inlineImageLimit: 8192,
  //   subsetFonts: true, // Enable font subsetting
  // },
  
  // Enable ISR with proper settings
  staticPageGenerationTimeout: 120,
  
  // Configure headers for proper caching
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        // Static assets caching
        source: '/:path*(\.js|\.css|\.svg|\.jpg|\.jpeg|\.png|\.gif|\.ico|\.webp|\.avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Font files caching
        source: '/:path*(\.woff|\.woff2|\.ttf|\.eot|\.otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // API routes using stale-while-revalidate
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=300',
          },
        ],
      },
    ];
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Add module federation plugin
    if (!isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'hpn_blog',
          filename: 'static/chunks/remoteEntry.js',
          remotes: {
            // Add any remote modules here
            // Example: shared_components: 'shared_components@https://shared-components.example.com/remoteEntry.js',
          },
          exposes: {
            // Components to expose for module federation
            './PostCard': './components/PostCard.js',
            './Section': './components/layout/Section.js',
            './GridContainer': './components/layout/GridContainer.js',
          },
          shared: {
            // Shared dependencies
            react: {
              singleton: true,
              requiredVersion: false,
            },
            'react-dom': {
              singleton: true,
              requiredVersion: false,
            },
            '@mui/material': {
              singleton: true,
              requiredVersion: false,
            },
            '@emotion/react': {
              singleton: true,
              requiredVersion: false,
            },
            '@emotion/styled': {
              singleton: true,
              requiredVersion: false,
            },
          },
        })
      );
    }
    
    // Production optimizations
    if (!dev && !isServer) {
      // Improved tree shaking
      config.optimization.usedExports = true;
      config.optimization.providedExports = true;
      
      // Enhanced split chunks strategy for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 240000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          mui: {
            test: /[\\/]node_modules[\\/](@mui)[\\/]/,
            name: 'mui',
            priority: 10,
          },
          framerMotion: {
            test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
            name: 'framer-motion',
            priority: 9,
          },
          emotions: {
            test: /[\\/]node_modules[\\/](@emotion)[\\/]/,
            name: 'emotions',
            priority: 8,
          },
          date: {
            test: /[\\/]node_modules[\\/](date-fns)[\\/]/,
            name: 'dates',
            priority: 7,
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            priority: 6,
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 5,
          },
        },
      };
      
      // Remove unused MUI components via null loader pattern
      // Only include if you know exactly which MUI components you don't use
      const unusedMuiComponentsRegex = /(?<![\\/]node_modules[\\/]@mui[\\/]material[\\/](Button|Typography|Box|Container|Card|Grid|Paper|AppBar|Toolbar|IconButton|Menu|MenuItem|Drawer|List|ListItem|Divider|TextField|Chip|Avatar|CircularProgress|LinearProgress))[\\/]node_modules[\\/]@mui[\\/]material[\\/](SpeedDial|Stepper|StepLabel|Step|StepConnector|StepContent|Pagination|TablePagination|Backdrop|Skeleton|Slider|Switch|FormControlLabel|RadioGroup|Radio|NativeSelect|InputLabel|FormHelperText|FormGroup|FormLabel|FormControl|Select|FilledInput|OutlinedInput|Input)[\\/]/;
      
      /* Uncomment this if you're certain you don't use these components
      config.module.rules.push({
        test: unusedMuiComponentsRegex,
        use: 'null-loader',
      });
      */
    }
    
    // SVG optimization
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    
    return config;
  },
  
  // Experimental features for better performance
  experimental: {
    // Enable scroll restoration
    scrollRestoration: true,
    // Optimize server components
    // serverComponents: true,
    // // Concurrent features
    // concurrentFeatures: true,
    // Enable more aggressive tree-shaking
    optimizeCss: true,
    // Next.js 13+ app directory
    // appDir: false, // Set to true if using app directory
    // // Support for Vietnamese fonts
    // fontLoaders: [
    //   { loader: '@next/font/google', options: { subsets: ['vietnamese', 'latin'] } },
    // ],
    // Optimize images with new format
    // images: { allowFutureImage: true },
    // // Improve page loading strategy
    // optimizeServerReact: true,
    // // Use faster React build
    // reactRoot: true,
    // // Perform JSX transform at compile time
    // disableOptimizedLoading: false,
  },
  
  // Enable on-demand incremental static regeneration API routes
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  
  // Environment variables accessible to the browser
  env: {
    // Add any environment variables you want accessible in the client
    SITE_URL: process.env.SITE_URL || 'https://hpn-blog.vercel.app',
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
  },
};

module.exports = withBundleAnalyzer(nextConfig);