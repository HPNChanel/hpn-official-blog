module.exports = {
  reactStrictMode: true,
  // Disable source maps in production for smaller bundle
  productionBrowserSourceMaps: false,
  // Enable compression
  compress: true,
  // Image optimization 
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      // Split chunks for better caching
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
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 5,
          },
        },
      };
    }
    return config;
  },
  // Experimental features for better performance
  experimental: {
    // Enable scroll restoration
    scrollRestoration: true,
  },
};