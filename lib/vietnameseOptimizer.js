/**
 * Utilities for optimizing Vietnamese text rendering
 */

/**
 * Calculate the appropriate row height for Vietnamese text
 * Vietnamese text needs more height due to diacritics
 * 
 * @param {string} text - Text to measure
 * @param {number} fontSize - Font size in pixels
 * @param {number} fallbackHeight - Fallback height if measurement fails
 * @returns {number} - Calculated row height
 */
export const calculateVietnameseRowHeight = (text, fontSize = 16, fallbackHeight = 40) => {
  // If no text or not in browser, return fallback
  if (!text || typeof window === 'undefined') return fallbackHeight;

  // Use more space if text contains Vietnamese characters
  const containsVietnamese = /[àáâãèéêìíòóôõùúýăđĩũơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/i.test(text);
  
  if (!containsVietnamese) {
    // For non-Vietnamese text, use standard sizing
    return Math.ceil(fontSize * 1.5); // 1.5 line height
  }
  
  // For Vietnamese text, use increased spacing for diacritics
  return Math.ceil(fontSize * 1.8); // 1.8 line height for Vietnamese
};

/**
 * Helper for Vietnamese text in virtualized lists
 * Estimates the element height based on text content
 * 
 * @param {Object} item - List item with text content
 * @param {number} width - Container width
 * @param {number} fontSize - Base font size
 * @returns {number} - Estimated height
 */
export const getEstimatedSizeForItem = (item, width = 300, fontSize = 16) => {
  if (!item) return 100;
  
  // Get relevant text from the item (adapt based on your data structure)
  const text = typeof item === 'string' ? item : (
    item.title || item.content || item.excerpt || JSON.stringify(item)
  );
  
  // Calculate baseline chars per row (account for container width)
  const avgCharWidth = fontSize * 0.6; // Approximate average character width
  const charsPerRow = Math.floor(width / avgCharWidth);
  
  // Calculate number of rows needed (add 1 for safety)
  const textLength = text.length;
  const estimatedRows = Math.ceil(textLength / charsPerRow) + 1;
  
  // Calculate height with Vietnamese optimizations
  const rowHeight = calculateVietnameseRowHeight(text, fontSize);
  
  // Add padding
  const padding = 16;
  
  return Math.max(estimatedRows * rowHeight + padding * 2, 100);
};

/**
 * Determines if the current browser's Vietnamese font rendering is optimal
 * @returns {boolean} - Whether the browser has good Vietnamese font support
 */
export const hasOptimalVietnameseFontSupport = () => {
  if (typeof window === 'undefined') return true;
  
  // Check for certain browsers/platforms known to have issues with Vietnamese
  const userAgent = window.navigator.userAgent.toLowerCase();
  
  // Old Android browsers have poor Vietnamese font support
  const isOldAndroid = /android\s([0-8])\./.test(userAgent);
  
  // Some older iOS versions have issues with Vietnamese diacritics
  const isOldIOS = /iphone os\s([0-9])_/.test(userAgent) && 
                  parseInt(userAgent.match(/iphone os\s([0-9])_/)[1]) < 10;
  
  // IE and old Edge have issues with Vietnamese
  const isIE = /trident|msie/.test(userAgent);
  const isOldEdge = /edge\/\d+/.test(userAgent) && !(/edg\/\d+/.test(userAgent));
  
  return !(isOldAndroid || isOldIOS || isIE || isOldEdge);
};

/**
 * Applies optimal CSS settings for Vietnamese text
 * @param {HTMLElement} element - Element containing Vietnamese text
 */
export const applyVietnameseOptimizations = (element) => {
  if (!element) return;
  
  // Apply optimized styles for Vietnamese text
  element.style.fontFamily = '"Be Vietnam Pro", system-ui, -apple-system, sans-serif';
  element.style.lineHeight = '1.8';
  element.style.letterSpacing = '-0.01em';
  element.style.fontFeatureSettings = '"calt", "liga", "dlig", "cv01"';
  element.style.textRendering = 'optimizeLegibility';
  
  // Apply font-smoothing for better diacritics
  element.style.WebkitFontSmoothing = 'antialiased';
  element.style.MozOsxFontSmoothing = 'grayscale';
  
  // Disable hyphenation for Vietnamese, as it often breaks incorrectly
  element.style.hyphens = 'manual';
  element.style.overflowWrap = 'break-word';
  
  // Set lang attribute
  element.setAttribute('lang', 'vi');
};
