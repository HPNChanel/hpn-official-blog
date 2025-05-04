import { useCallback } from 'react';

/**
 * Hook to inject CSS in a non-blocking way
 * This helps improve performance by not blocking rendering
 */
export default function useNonBlockingStyles() {
  /**
   * Inject CSS styles without blocking rendering
   * @param {Object} options - The options for injecting styles
   * @param {string} options.id - The ID for the style tag
   * @param {string} options.css - The CSS content to inject
   */
  const injectStyles = useCallback(({ id, css }) => {
    // Check if we're in a browser environment
    if (typeof document === 'undefined') return;

    // Check if the style element already exists
    const existingStyle = document.getElementById(id);
    if (existingStyle) {
      // If it exists, update its content
      existingStyle.innerHTML = css;
      return;
    }

    // Create a new style element
    const style = document.createElement('style');
    style.id = id;
    style.innerHTML = css;
    style.setAttribute('data-injected', 'true');

    // Append to the document head
    document.head.appendChild(style);
  }, []);

  /**
   * Remove injected styles by ID
   * @param {string} id - The ID of the style tag to remove
   */
  const removeStyles = useCallback((id) => {
    // Check if we're in a browser environment
    if (typeof document === 'undefined') return;

    // Find and remove the style element
    const style = document.getElementById(id);
    if (style) {
      document.head.removeChild(style);
    }
  }, []);

  return { injectStyles, removeStyles };
}
