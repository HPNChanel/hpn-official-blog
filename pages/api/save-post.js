import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// API route to save a post to the filesystem
export default async function handler(req, res) {
  // Only allow in development mode
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'This API is only available in development mode' });
  }

  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { title, description, tags, content, slug } = req.body;
    
    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    // Generate the post's frontmatter
    const frontmatter = {
      title,
      description: description || '',
      date: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
      tags: Array.isArray(tags) ? tags : [],
      slug: slug || createSlug(title),
    };

    // Create the file content with frontmatter
    const fileContent = matter.stringify(content, frontmatter);
    
    // Ensure the slug is valid for a filename
    const safeSlug = createSafeFilename(frontmatter.slug);
    const filename = `${safeSlug}.md`;
    
    // Get the posts directory
    const postsDirectory = path.join(process.cwd(), 'posts');
    
    // Ensure the posts directory exists
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }
    
    // Create the full file path
    const filePath = path.join(postsDirectory, filename);
    
    // Check if the file already exists
    if (fs.existsSync(filePath)) {
      return res.status(409).json({ error: 'A post with this slug already exists' });
    }
    
    // Write the file
    fs.writeFileSync(filePath, fileContent, 'utf8');
    
    // Return success
    return res.status(200).json({ 
      success: true,
      filename,
      path: `/posts/${filename}`
    });
    
  } catch (error) {
    console.error('Error saving post:', error);
    return res.status(500).json({ error: 'Failed to save post' });
  }
}

// Helper function to create a slug from a title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Helper function to ensure filename safety
function createSafeFilename(slug) {
  return slug
    .replace(/[^\w\-]/g, '') // Remove any non-alphanumeric, non-hyphen chars
    .replace(/^\-+|\-+$/g, ''); // Remove leading/trailing hyphens
}