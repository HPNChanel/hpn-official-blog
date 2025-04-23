// Client-safe utility functions only

// Helper to convert tag to URL-safe format
export function slugifyTag(tag) {
  return tag.toLowerCase().replace(/\s+/g, '-');
}

// Client-side stub for getPostsByTag (server function will be called during SSR/SSG)
export function getPostsByTag(tag) {
  // This will be replaced by the server version during build time
  return [];
}

// Client-side stub for getAllTagPaths (server function will be called during SSR/SSG)
export function getAllTagPaths() {
  // This will be replaced by the server version during build
  return [];
}

// Any other client-side safe utilities can go here