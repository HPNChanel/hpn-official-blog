const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { slugifyTag } = require('../lib/posts');

const SITE_URL = 'https://yourdomain.com'; // Replace with your actual domain
const postsDirectory = path.join(process.cwd(), 'posts');

/**
 * Generate sitemap.xml for better SEO
 */
async function generateSitemap() {
  console.log('📢 Generating sitemap...');

  // Array to store all site URLs
  const pages = [];

  // Add static pages
  const staticPages = [
    '',                   // Home
    '/blog',              // Blog listing
    '/about',             // About page
    '/portfolio',         // Portfolio page
    '/contact',           // Contact page
  ];

  staticPages.forEach(page => {
    pages.push({
      url: `${SITE_URL}${page}`,
      lastModified: new Date().toISOString()
    });
  });

  // Get list of all markdown files for dynamic pages
  const fileNames = fs.readdirSync(postsDirectory);
  
  // Collect all tags for tag pages
  const allTags = new Set();
  
  // Process each blog post
  fileNames.forEach(fileName => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Parse frontmatter
    const matterResult = matter(fileContents);
    
    // Get tags from frontmatter
    const { tags = [], date, slug = id } = matterResult.data;
    
    // Add blog post URL to sitemap
    pages.push({
      url: `${SITE_URL}/posts/${slug}`,
      lastModified: new Date(date).toISOString()
    });
    
    // Collect all tags
    if (tags && Array.isArray(tags)) {
      tags.forEach(tag => allTags.add(tag));
    }
  });
  
  // Add tag pages to sitemap
  if (allTags.size > 0) {
    // Add main tags index page
    pages.push({
      url: `${SITE_URL}/tags`,
      lastModified: new Date().toISOString()
    });
    
    // Add individual tag pages
    Array.from(allTags).forEach(tag => {
      const tagSlug = slugifyTag(tag);
      pages.push({
        url: `${SITE_URL}/tags/${tagSlug}`,
        lastModified: new Date().toISOString()
      });
    });
  }

  // Generate sitemap XML content
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.url === SITE_URL ? '1.0' : '0.7'}</priority>
  </url>
  `).join('')}
</urlset>
`;

  // Write the XML to public/sitemap.xml
  const publicDir = path.join(process.cwd(), 'public');
  
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully at /public/sitemap.xml');
}

// Run the generator
generateSitemap()
  .catch(err => {
    console.error('Error generating sitemap:', err);
    process.exit(1);
  });