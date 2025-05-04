/**
 * Web Vitals reporting with focus on Vietnamese content rendering metrics
 */
import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

const VIETNAMESE_TEXT_PERCENTAGE_THRESHOLD = 0.15; // If 15% or more of the content is Vietnamese

/**
 * Detects if a string contains Vietnamese characters
 * @param {string} text - The text to check
 * @return {boolean} - True if Vietnamese characters are present
 */
const containsVietnamese = (text) => {
  if (!text || typeof text !== 'string') return false;
  // Vietnamese specific characters regex pattern
  const vietnameseRegex = /[àáâãèéêìíòóôõùúýăđĩũơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/i;
  return vietnameseRegex.test(text);
};

/**
 * Calculate percentage of Vietnamese text in the current page
 * @return {number} - Percentage of Vietnamese text nodes (0-1)
 */
const getVietnameseTextPercentage = () => {
  if (typeof document === 'undefined') return 0;
  
  // Get all text nodes in the page
  const textNodes = [];
  const textIterator = document.createNodeIterator(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        // Ignore empty or whitespace-only text nodes
        return node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    }
  );
  
  let node;
  while (node = textIterator.nextNode()) {
    if (node.textContent.trim()) {
      textNodes.push(node.textContent);
    }
  }
  
  // Calculate Vietnamese text percentage
  if (textNodes.length === 0) return 0;
  
  const vietnameseTextNodes = textNodes.filter(text => containsVietnamese(text));
  return vietnameseTextNodes.length / textNodes.length;
};

/**
 * Send metrics to analytics endpoint
 * @param {Object} metric - Web vitals metric object
 */
const sendToAnalytics = (metric) => {
  // Check if the page contains Vietnamese content
  const hasVietnameseContent = getVietnameseTextPercentage() > VIETNAMESE_TEXT_PERCENTAGE_THRESHOLD;
  
  // Add Vietnamese flag to metric
  const metricWithLang = {
    ...metric,
    // Add any custom properties
    hasVietnameseContent,
    language: hasVietnameseContent ? 'vi' : 'en',
    pageUrl: window.location.href,
    deviceType: getDeviceType(),
    connectionType: getConnectionInfo(),
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString(),
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  };

  // You can use console.log during development
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Web Vitals]', metricWithLang);
  }

  // Send to your analytics service
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics 4
    if (window.gtag) {
      window.gtag('event', 'web_vitals', {
        event_category: 'Web Vitals',
        event_label: metric.name,
        value: Math.round(metric.value * 10) / 10,
        metric_id: metric.id,
        metric_value: metric.value,
        metric_rating: metric.rating,
        has_vietnamese: hasVietnameseContent,
      });
    }

    // Example: Send to your custom API
    fetch('/api/vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metricWithLang),
      // Keep the beacon alive without blocking navigation
      keepalive: true,
    }).catch(err => {
      console.error('[Vitals API Error]', err);
    });
  }
};

/**
 * Get device type based on screen size and user agent
 * @return {string} - Device type classification
 */
const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
};

/**
 * Get connection information if available
 * @return {Object} - Connection information
 */
const getConnectionInfo = () => {
  if (navigator.connection) {
    const { effectiveType, downlink, rtt, saveData } = navigator.connection;
    return { effectiveType, downlink, rtt, saveData };
  }
  return null;
};

/**
 * Initialize performance monitoring
 */
export function initWebVitals() {
  // Core Web Vitals
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getLCP(sendToAnalytics);
  
  // Additional metrics
  getFCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
}

/**
 * Vietnamese text rendering specific metrics
 */
export function measureVietnameseRendering() {
  // Track font loading for Vietnamese fonts
  if ('performance' in window) {
    // Get all font loading events
    const fontEntries = performance.getEntriesByType('resource').filter(entry => 
      entry.name.includes('Be-Vietnam-Pro') || 
      entry.name.includes('vietnamese')
    );
    
    // Calculate metrics
    const metrics = {
      vietnameseFontCount: fontEntries.length,
      vietnameseFontLoadTime: fontEntries.reduce((sum, entry) => sum + entry.duration, 0),
      fontLoadStart: Math.min(...fontEntries.map(entry => entry.startTime), Infinity),
      fontLoadEnd: Math.max(...fontEntries.map(entry => entry.startTime + entry.duration), 0),
    };
    
    // Send font metrics
    sendToAnalytics({
      name: 'vietnamese-font-metrics',
      value: metrics.vietnameseFontLoadTime,
      ...metrics
    });
  }
  
  // Track layout shifts that might be caused by Vietnamese text
  let cumulativeShiftScore = 0;
  
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      // Only count layout shifts for elements with Vietnamese text
      if (!entry.sources) continue;
      
      const shiftSource = entry.sources.find(source => {
        const element = document.querySelector(`[data-element-id="${source.node}"]`);
        return element && containsVietnamese(element.textContent);
      });
      
      if (shiftSource) {
        cumulativeShiftScore += entry.value;
      }
    }
  });
  
  try {
    observer.observe({ type: 'layout-shift', buffered: true });
    
    // Report after a delay
    setTimeout(() => {
      observer.disconnect();
      if (cumulativeShiftScore > 0) {
        sendToAnalytics({
          name: 'vietnamese-layout-shift',
          value: cumulativeShiftScore,
        });
      }
    }, 10000); // Report after 10 seconds
  } catch (e) {
    console.error('Layout Shift API not supported', e);
  }
  
  // Track specific Vietnamese content rendering
  setTimeout(() => {
    const vietnameseElements = document.querySelectorAll('[lang="vi"], .vietnamese-content');
    
    if (vietnameseElements.length > 0) {
      // Calculate Vietnamese content paint times
      const paintTimes = performance.getEntriesByType('paint');
      const fcp = paintTimes.find(entry => entry.name === 'first-contentful-paint');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const visibleTime = performance.now();
            
            sendToAnalytics({
              name: 'vietnamese-element-visibility',
              value: fcp ? visibleTime - fcp.startTime : visibleTime,
              element: entry.target.tagName,
              position: {
                top: entry.boundingClientRect.top,
                left: entry.boundingClientRect.left,
              }
            });
            
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      vietnameseElements.forEach(el => {
        observer.observe(el);
      });
    }
  }, 2000); // Wait for page to settle
}

/**
 * Measure Vietnamese text specific render times
 */
export function trackVietnameseRenderPerformance() {
  if (typeof window === 'undefined') return;
  
  // Create a performance mark for Vietnamese content
  performance.mark('vietnam-content-start');
  
  // After content loads, mark the end
  window.addEventListener('load', () => {
    // Check if the page has Vietnamese content
    if (getVietnameseTextPercentage() > VIETNAMESE_TEXT_PERCENTAGE_THRESHOLD) {
      performance.mark('vietnam-content-end');
      
      // Create a measure between the marks
      performance.measure(
        'vietnam-content-render',
        'vietnam-content-start',
        'vietnam-content-end'
      );
      
      // Get the measure and report it
      const measurements = performance.getEntriesByName('vietnam-content-render');
      
      if (measurements.length > 0) {
        sendToAnalytics({
          name: 'vietnamese-content-render',
          value: measurements[0].duration,
        });
      }
    }
  });
}
