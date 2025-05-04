import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * Enhances keyboard navigation throughout the site
 * - Implements shortcuts for navigation
 * - Announces page changes for screen readers
 */
const KeyboardNavigation = () => {
  const router = useRouter();

  useEffect(() => {
    // Create a visually hidden announcement element for screen readers
    const createAnnouncementElement = () => {
      const el = document.createElement('div');
      el.setAttribute('aria-live', 'assertive');
      el.setAttribute('aria-atomic', 'true');
      el.setAttribute('id', 'a11y-announcer');
      el.setAttribute('class', 'sr-only');
      el.style.position = 'absolute';
      el.style.width = '1px';
      el.style.height = '1px';
      el.style.padding = '0';
      el.style.margin = '-1px';
      el.style.overflow = 'hidden';
      el.style.clip = 'rect(0, 0, 0, 0)';
      el.style.whiteSpace = 'nowrap';
      el.style.border = '0';
      document.body.appendChild(el);
      return el;
    };

    // Get or create the announcement element
    let announcer = document.getElementById('a11y-announcer');
    if (!announcer) {
      announcer = createAnnouncementElement();
    }

    // Announce page changes
    const announcePageChange = () => {
      const pageTitle = document.title;
      announcer.textContent = `Navigated to ${pageTitle}`;
    };

    // Handle keyboard shortcuts
    const handleKeyDown = (e) => {
      // Only respond to keyboard shortcuts when Alt key is pressed
      if (e.altKey) {
        switch (e.key) {
          case 'h':
            router.push('/');
            e.preventDefault();
            break;
          case 'b':
            router.push('/blog');
            e.preventDefault();
            break;
          case 'a':
            router.push('/about');
            e.preventDefault();
            break;
          case 'p':
            router.push('/portfolio');
            e.preventDefault();
            break;
          case 'c':
            router.push('/contact');
            e.preventDefault();
            break;
          case 't':
            router.push('/tags');
            e.preventDefault();
            break;
        }
      }
    };

    // Set up event listeners
    document.addEventListener('keydown', handleKeyDown);
    router.events.on('routeChangeComplete', announcePageChange);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      router.events.off('routeChangeComplete', announcePageChange);
    };
  }, [router]);

  return null; // This component doesn't render anything
};

export default KeyboardNavigation;
