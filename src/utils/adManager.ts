
/**
 * Utility for managing ads in the application
 */

// Define window.adsbygoogle property
declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

// Check if user has opted out of personalized ads (GDPR compliance)
const hasOptedOut = (): boolean => {
  return localStorage.getItem('ad-opt-out') === 'true';
};

// Allow users to opt out of personalized ads
const optOut = (): void => {
  localStorage.setItem('ad-opt-out', 'true');
};

// Allow users to opt back in to personalized ads
const optIn = (): void => {
  localStorage.setItem('ad-opt-out', 'false');
};

// Request ad refresh (can be called when content changes significantly)
const refreshAds = (): void => {
  if (typeof window !== 'undefined' && window.adsbygoogle) {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('Failed to refresh ads:', error);
    }
  }
};

export const adManager = {
  hasOptedOut,
  optOut,
  optIn,
  refreshAds
};
