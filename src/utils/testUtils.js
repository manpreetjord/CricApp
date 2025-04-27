/**
 * Test utilities for CricApp to help identify and log browser-specific issues
 */

// Browser/device detection
export const detectBrowser = () => {
  const userAgent = navigator.userAgent;
  let browserName;
  
  if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = "Chrome";
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = "Firefox";
  } else if (userAgent.match(/safari/i)) {
    browserName = "Safari";
  } else if (userAgent.match(/opr\//i)) {
    browserName = "Opera";
  } else if (userAgent.match(/edg/i)) {
    browserName = "Edge";
  } else {
    browserName = "Unknown";
  }
  
  // Detect if mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
  return {
    browser: browserName,
    isMobile,
    userAgent
  };
};

// Feature detection for compatibility issues
export const detectFeatureSupport = () => {
  return {
    flexbox: typeof document.createElement('div').style.flexGrow !== 'undefined',
    grid: typeof document.createElement('div').style.grid !== 'undefined',
    fetch: typeof window.fetch !== 'undefined',
    localStorage: (() => {
      try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
      } catch (e) {
        return false;
      }
    })(),
    intersectionObserver: 'IntersectionObserver' in window,
    webAnimation: 'Animation' in window
  };
};

// Logging utility for debugging
export const logIssue = (component, issue, details = {}) => {
  const browserInfo = detectBrowser();
  const timestamp = new Date().toISOString();
  
  const logData = {
    timestamp,
    component,
    issue,
    browserInfo,
    details
  };
  
  console.warn('CricApp Issue Detected:', logData);
  
  // In a real app, you could send this to a logging service
  // Example: sendToLoggingService(logData);
  
  // For development, store in localStorage for later review
  try {
    const existingLogs = JSON.parse(localStorage.getItem('cricapp_issue_logs') || '[]');
    existingLogs.push(logData);
    localStorage.setItem('cricapp_issue_logs', JSON.stringify(existingLogs.slice(-20))); // Keep last 20 issues
  } catch (e) {
    console.error('Failed to save issue log to localStorage', e);
  }
  
  return logData;
};

// Performance measurement utility
export const measurePerformance = (label, callback) => {
  const start = performance.now();
  const result = callback();
  const end = performance.now();
  const duration = end - start;
  
  console.log(`Performance [${label}]: ${duration.toFixed(2)}ms`);
  
  return {
    result,
    duration,
    label
  };
};

// Test accessibility issues (simple checks)
export const testAccessibility = (rootElement) => {
  const issues = [];
  
  // Check for images without alt text
  const imagesWithoutAlt = rootElement.querySelectorAll('img:not([alt])');
  if (imagesWithoutAlt.length > 0) {
    issues.push({
      type: 'a11y',
      issue: 'Images without alt text',
      count: imagesWithoutAlt.length,
      elements: Array.from(imagesWithoutAlt).map(el => el.outerHTML.substring(0, 100))
    });
  }
  
  // Check for interactive elements without keyboard access
  const clickableWithoutKeyboard = rootElement.querySelectorAll('[onClick]:not([tabindex])');
  if (clickableWithoutKeyboard.length > 0) {
    issues.push({
      type: 'a11y',
      issue: 'Clickable elements without keyboard access',
      count: clickableWithoutKeyboard.length,
      elements: Array.from(clickableWithoutKeyboard).map(el => el.outerHTML.substring(0, 100))
    });
  }
  
  // Check for proper heading structure
  const headings = rootElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const headingLevels = Array.from(headings).map(h => parseInt(h.tagName.substring(1)));
  
  // Check if headings skip levels (e.g., h1 to h3 without h2)
  let prevLevel = 0;
  for (const level of headingLevels) {
    if (level > prevLevel + 1 && prevLevel !== 0) {
      issues.push({
        type: 'a11y',
        issue: 'Heading structure skip',
        details: `Heading jumps from h${prevLevel} to h${level}`,
      });
    }
    prevLevel = level;
  }
  
  return issues;
};

// Run a full test suite and return results
export const runTestSuite = async (rootElement = document.body) => {
  const browserInfo = detectBrowser();
  const featureSupport = detectFeatureSupport();
  const accessibilityIssues = testAccessibility(rootElement);
  
  // Test rendering performance
  const renderPerf = measurePerformance('DOM updates', () => {
    // Trigger some DOM updates
    const testEl = document.createElement('div');
    testEl.id = 'perf-test-element';
    testEl.style.position = 'absolute';
    testEl.style.left = '-9999px';
    document.body.appendChild(testEl);
    
    for (let i = 0; i < 100; i++) {
      testEl.textContent = `Test ${i}`;
    }
    
    document.body.removeChild(testEl);
    return true;
  });
  
  return {
    timestamp: new Date().toISOString(),
    browserInfo,
    featureSupport,
    accessibilityIssues,
    performance: {
      domUpdates: renderPerf.duration
    }
  };
};

export default {
  detectBrowser,
  detectFeatureSupport,
  logIssue,
  measurePerformance,
  testAccessibility,
  runTestSuite
}; 