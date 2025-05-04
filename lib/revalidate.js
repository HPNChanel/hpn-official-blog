/**
 * Revalidation configuration for different content types
 * Values are in seconds
 */
export const REVALIDATION_INTERVALS = {
  POSTS: {
    RECENT: 60 * 30, // 30 minutes for recent posts
    STATIC: 60 * 60 * 24, // 24 hours for older posts
    BY_SLUG: 60 * 60, // 1 hour for individual posts
  },
  HOME_PAGE: 60 * 60, // 1 hour for home page
  TAG_PAGES: 60 * 60 * 3, // 3 hours for tag pages
  ARCHIVE_PAGES: 60 * 60 * 24, // 24 hours for archive pages
};

/**
 * Determines revalidation time for a post based on its publication date
 * @param {Date|string} postDate - The post's publication date
 * @returns {number} - Revalidation time in seconds
 */
export function getPostRevalidationTime(postDate) {
  // Convert string date to Date object if needed
  const date = typeof postDate === 'string' ? new Date(postDate) : postDate;
  const now = new Date();
  
  // Calculate the difference in days
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // More frequent revalidation for recent content
  if (diffDays < 7) {
    return REVALIDATION_INTERVALS.POSTS.RECENT;
  } else {
    return REVALIDATION_INTERVALS.POSTS.STATIC;
  }
}

/**
 * Determines fallback strategy based on content type
 * @param {string} contentType - The type of content
 * @returns {boolean|string} - Fallback strategy ('blocking', true, or false)
 */
export function getFallbackStrategy(contentType) {
  switch(contentType) {
    case 'post':
      return 'blocking'; // SEO important content - wait for generation
    case 'tag':
      return true; // Show loading state, then contents
    case 'archive':
      return true; // Show loading state, then contents
    default:
      return false; // Return 404 for unknown paths
  }
}
