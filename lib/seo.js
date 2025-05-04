/**
 * Generates structured data for blog post
 * @param {Object} post - Post data
 * @param {string} baseUrl - Base URL of the site
 * @returns {Object} Structured data object
 */
export function generatePostStructuredData(post, baseUrl = 'https://hpn-blog.vercel.app') {
  const postUrl = `${baseUrl}/posts/${post.id}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description || post.excerpt || '',
    image: post.coverImage ? `${baseUrl}${post.coverImage}` : `${baseUrl}/images/og-default.jpg`,
    datePublished: post.date,
    dateModified: post.lastModified || post.date,
    author: {
      '@type': 'Person',
      name: 'Phuc Nguyen',
      url: `${baseUrl}/about`
    },
    publisher: {
      '@type': 'Organization',
      name: 'HPN Blog',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl
    },
    keywords: post.tags ? post.tags.join(', ') : '',
    inLanguage: containsVietnamese(post.title) || containsVietnamese(post.contentHtml) ? 'vi-VN' : 'en-US',
  };
}

/**
 * Generates structured data for blog list page
 * @param {Array} posts - List of posts
 * @param {string} baseUrl - Base URL of the site
 * @returns {Object} Structured data object
 */
export function generateBlogListStructuredData(posts, baseUrl = 'https://hpn-blog.vercel.app') {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    headline: 'HPN Blog - Web3 Developer & Blockchain Enthusiast',
    description: 'Thoughts, tutorials, and insights on Web3, blockchain technology, and modern web development.',
    url: `${baseUrl}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'HPN Blog',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`
      }
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.slice(0, 10).map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${baseUrl}/posts/${post.id}`,
        name: post.title
      }))
    }
  };
}

/**
 * Get alternative language URL based on current URL
 * @param {string} currentUrl - Current page URL
 * @param {boolean} isVietnamese - Whether current page is Vietnamese
 * @returns {string} URL for the alternative language version
 */
export function getAlternateLanguageUrl(currentUrl, isVietnamese) {
  // This is a simplified example - in a real app you would use a more sophisticated mapping
  if (currentUrl.includes('/vi/')) {
    return currentUrl.replace('/vi/', '/');
  } else if (currentUrl.startsWith('/posts/')) {
    // For blog posts, you might have a different mapping strategy
    const slug = currentUrl.split('/').pop();
    return isVietnamese ? `/posts/${slug}-en` : `/vi/posts/${slug}`;
  }
  
  // Default fallback
  return isVietnamese ? currentUrl.replace('/vi', '') : `/vi${currentUrl}`;
}
