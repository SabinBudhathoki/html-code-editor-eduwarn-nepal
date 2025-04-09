
/**
 * Utility for managing ads in the application
 */

// Define window.adsbygoogle property
declare global {
  interface Window {
    adsbygoogle?: any[];
    googletag?: any;
  }
}

// Track which ad units have been initialized
const initializedAdUnits = new Set<string>();

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

// Generate a unique ID for each ad unit to prevent duplicate initialization
const generateAdUnitId = (adSlot: string, type: string): string => {
  return `${adSlot}-${type}-${Math.random().toString(36).substring(2, 9)}`;
};

// Request ad refresh (can be called when content changes significantly)
const refreshAds = (): void => {
  if (typeof window !== 'undefined' && window.googletag) {
    try {
      window.googletag.cmd.push(() => {
        window.googletag.pubads().refresh();
      });
    } catch (error) {
      console.error('Failed to refresh ads:', error);
    }
  }
};

// Initialize an AdSense ad unit
const initializeAdUnit = (adUnitId: string): boolean => {
  if (initializedAdUnits.has(adUnitId)) {
    console.log(`Ad unit ${adUnitId} already initialized.`);
    return false;
  }
  
  if (typeof window !== 'undefined' && window.adsbygoogle) {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      initializedAdUnits.add(adUnitId);
      return true;
    } catch (error) {
      console.error('Failed to initialize ad unit:', error);
      return false;
    }
  }
  
  return false;
};

export const adManager = {
  hasOptedOut,
  optOut,
  optIn,
  refreshAds,
  generateAdUnitId,
  initializeAdUnit
};
