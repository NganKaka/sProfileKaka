/**
 * Analytics utility for tracking events with Plausible Analytics
 *
 * Usage:
 * 1. Add Plausible script to index.html
 * 2. Call trackEvent() to track custom events
 * 3. Call trackPageView() for manual page view tracking (optional)
 */

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string | number> }) => void;
  }
}

/**
 * Track a custom event
 * @param eventName - Name of the event (e.g., "Project Click", "Contact Form Submit")
 * @param props - Optional properties to attach to the event
 */
export const trackEvent = (eventName: string, props?: Record<string, string | number>) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, { props });
  }
};

/**
 * Track a page view (usually automatic with Plausible)
 * @param url - URL to track
 */
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('pageview', { props: { url } });
  }
};

/**
 * Track project link clicks
 */
export const trackProjectClick = (projectTitle: string, linkType: 'live' | 'code' | 'case') => {
  trackEvent('Project Link Click', {
    project: projectTitle,
    type: linkType,
  });
};

/**
 * Track contact form submission
 */
export const trackContactFormSubmit = (success: boolean) => {
  trackEvent('Contact Form Submit', {
    status: success ? 'success' : 'error',
  });
};

/**
 * Track navigation clicks
 */
export const trackNavigation = (section: string) => {
  trackEvent('Navigation Click', {
    section,
  });
};

/**
 * Track social link clicks
 */
export const trackSocialClick = (platform: string) => {
  trackEvent('Social Link Click', {
    platform,
  });
};

/**
 * Track resume download
 */
export const trackResumeDownload = () => {
  trackEvent('Resume Download');
};
