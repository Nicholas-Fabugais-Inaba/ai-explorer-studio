import { useEffect } from 'react';

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, unknown>) => void;
    };
  }
}

export const AnalyticsScript = () => {
  useEffect(() => {
    // Check if script already exists
    if (document.querySelector('script[data-website-id]')) {
      return;
    }

    // Umami Analytics - privacy-focused, open source analytics
    // You can self-host or use Umami Cloud
    const script = document.createElement('script');
    script.defer = true;
    script.src = 'https://cloud.umami.is/script.js';
    // Replace with your actual Umami website ID after setup
    script.setAttribute('data-website-id', 'YOUR_UMAMI_WEBSITE_ID');
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      const existingScript = document.querySelector('script[data-website-id]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
};

// Helper hook for tracking custom events
export const useAnalytics = () => {
  const trackEvent = (eventName: string, eventData?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.umami) {
      window.umami.track(eventName, eventData);
    }
  };

  const trackModuleView = (moduleId: string) => {
    trackEvent('module_view', { moduleId });
  };

  const trackPlaygroundRun = (moduleId: string) => {
    trackEvent('playground_run', { moduleId });
  };

  const trackResourceClick = (resourceTitle: string) => {
    trackEvent('resource_click', { resourceTitle });
  };

  return {
    trackEvent,
    trackModuleView,
    trackPlaygroundRun,
    trackResourceClick,
  };
};
