/**
 * Creates a blur data URL for images or returns undefined
 * @param {string} src - The image source URL
 * @returns {string|undefined} The blur data URL or undefined
 */
export const blurDataURLForImage = (src) => {
  // Return undefined if no source provided
  if (!src) return undefined;
  
  // Return placeholder blur data URL for local images
  if (src.startsWith('/')) {
    // Very small, blurred placeholder
    return 'data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjcwMCIgaGVpZ2h0PSI0NzUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImciPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMjAyMDIwIiBvZmZzZXQ9IjIwJSIgLz4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzI4MjgyOCIgb2Zmc2V0PSI1MCUiIC8+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMyMDIwMjAiIG9mZnNldD0iNzAlIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjcwMCIgaGVpZ2h0PSI0NzUiIGZpbGw9InVybCgjZykiIC8+Cjwvc3ZnPg==';
  }
  
  // Otherwise return undefined to let Next.js handle it
  return undefined;
};

/**
 * Gets image dimensions from src attribute if available
 * @param {string} src - Image source URL 
 * @returns {Object} Width and height if available
 */
export const getImageDimensions = (src) => {
  if (!src) return { width: undefined, height: undefined };
  
  // Try to extract dimensions from filename (e.g., image-800x600.jpg)
  const match = src.match(/(\d+)x(\d+)/);
  if (match && match.length === 3) {
    return {
      width: parseInt(match[1], 10),
      height: parseInt(match[2], 10),
    };
  }
  
  return { width: undefined, height: undefined };
};

/**
 * Generates responsive image sizes attribute
 * @param {string} layout - Layout type (fill, responsive, etc.)
 * @returns {string} Sizes attribute value
 */
export const getResponsiveImageSizes = (layout) => {
  switch (layout) {
    case 'fill':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
    case 'responsive':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px';
    default:
      return '100vw';
  }
};
