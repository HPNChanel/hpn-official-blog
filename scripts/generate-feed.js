const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const RSS = require('rss');
const { remark } = require('remark');
const html = require('remark-html');

const SITE_URL = 'https://yourdomain.com'; // Replace with your actual domain
const SITE_TITLE = 'Your Blog Title'; // Replace with your blog title
const SITE_DESCRIPTION = 'Your blog description'; // Replace with your blog description
const postsDirectory = path.join(process.cwd(), 'posts');

/**
 * Generate RSS feed from markdown posts
 */
async function generateRssFeed() {
  console.log('📢 Generating RSS feed...');

  // Create new RSS feed
  const feed = new RSS({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/feed.xml`,
    copyright: `${new Date().getFullYear()} ${SITE_TITLE}`,
    language: 'en',
    pubDate: new Date(),
  });

  // Get list of all markdown files
  const fileNames = fs.readdirSync(postsDirectory);
  
  // Process each file
  for (const fileName of fileNames) {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Parse frontmatter
    const matterResult = matter(fileContents);
    
    // Convert markdown content to HTML
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();
    
    // Extract data
    const { title, date, description, tags = [], slug = id } = matterResult.data;
    
    // Add post to feed
    feed.item({
      title,
      description: description || '',
      url: `${SITE_URL}/posts/${slug}`,
      categories: tags,
      date: new Date(date),
      guid: slug,
      custom_elements: [
        { 'content:encoded': contentHtml }
      ]
    });
  }

  // Write the XML to public/feed.xml
  const publicDir = path.join(process.cwd(), 'public');
  
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  
  fs.writeFileSync(path.join(publicDir, 'feed.xml'), feed.xml({ indent: true }));
  console.log('✅ RSS feed generated successfully at /public/feed.xml');
}

// Run the generator
generateRssFeed()
  .catch(err => {
    console.error('Error generating RSS feed:', err);
    process.exit(1);
  });