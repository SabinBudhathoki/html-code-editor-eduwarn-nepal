
import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { adManager } from '@/utils/adManager';

interface StickyAdProps {
  position?: 'bottom' | 'top';
  adSlot?: string;
}

const StickyAd: React.FC<StickyAdProps> = ({ 
  position = 'bottom',
  adSlot = "XXXXXXXXXX"
}) => {
  const [dismissed, setDismissed] = React.useState(false);
  const adRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (adManager.hasOptedOut() || dismissed) return;
    
    if (adRef.current && typeof window !== 'undefined') {
      try {
        // @ts-ignore - Adsense is added globally
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('Error loading sticky ad:', error);
      }
    }
  }, [dismissed]);
  
  if (dismissed || adManager.hasOptedOut()) return null;
  
  const positionStyles = position === 'bottom' 
    ? 'bottom-0 left-0' 
    : 'top-0 left-0';
  
  return (
    <div className={`fixed ${positionStyles} w-full bg-background z-50 shadow-lg border-t`}>
      <div className="container mx-auto px-4 py-2 relative">
        <button 
          onClick={() => setDismissed(true)}
          className="absolute right-2 top-2 p-1 rounded-full bg-white/80 shadow-sm z-10"
          aria-label="Close advertisement"
        >
          <X size={16} />
        </button>
        
        <div className="flex justify-center">
          <div
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block', width: '728px', height: '90px' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot={adSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </div>
  );
};

export default StickyAd;
