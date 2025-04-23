import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { slugifyTag } from './posts'; // Import the client-safe function

const postsDirectory = path.join(process.cwd(), 'posts');

// Get all blog posts with their data, including tags
export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // Process tags if they exist
    const tags = matterResult.data.tags || [];
    
    // Extract excerpt from content
    const excerpt = matterResult.content
      .trim()
      .replace(/\s+/g, ' ')
      .slice(0, 160) + '...';

    return {
      id,
      excerpt,
      tags,
      ...matterResult.data,
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Get all unique tags from all posts
export function getAllTags() {
  const allPosts = getSortedPostsData();
  const tagCounts = {};
  
  allPosts.forEach(post => {
    const tags = post.tags || [];
    tags.forEach(tag => {
      const tagSlug = slugifyTag(tag);
      if (tagCounts[tagSlug]) {
        tagCounts[tagSlug].count++;
      } else {
        tagCounts[tagSlug] = {
          name: tag, // Original tag name with proper casing
          count: 1
        };
      }
    });
  });

  return tagCounts;
}

// Get posts filtered by tag
export function getPostsByTag(tag) {
  const allPosts = getSortedPostsData();
  const tagSlug = slugifyTag(tag);
  
  // Debug: Log the tag being searched for and all available posts with their tags
  console.log(`Looking for posts with tag slug: ${tagSlug}`);
  console.log('Available posts and their tags:');
  allPosts.forEach(post => {
    const tagSlugs = (post.tags || []).map(t => slugifyTag(t));
    console.log(`Post: ${post.id}, Tags: ${post.tags?.join(', ')}, Slugified: ${tagSlugs.join(', ')}`);
  });
  
  // Filter posts by tag, using slugs for comparison
  const matchedPosts = allPosts.filter(post => {
    const postTags = post.tags || [];
    return postTags.some(t => slugifyTag(t) === tagSlug);
  });
  
  console.log(`Found ${matchedPosts.length} posts with tag slug: ${tagSlug}`);
  
  return matchedPosts;
}

// Get all tag paths for static generation
export function getAllTagPaths() {
  const tags = getAllTags();
  
  return Object.keys(tags).map(tag => ({
    params: {
      tag: tag
    }
  }));
}

// Get all post IDs for static paths
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  
  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, '') // Change 'id' to 'slug' to match the page parameter
      }
    };
  });
}

// Get post data by ID
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  
  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  };
}