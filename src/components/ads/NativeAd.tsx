
import React, { useEffect, useRef } from 'react';
import { adManager } from '@/utils/adManager';

interface NativeAdProps {
  className?: string;
  adSlot?: string;
}

const NativeAd: React.FC<NativeAdProps> = ({ 
  className = '',
  adSlot = "XXXXXXXXXX"
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (adManager.hasOptedOut()) return;
    
    if (adRef.current && typeof window !== 'undefined') {
      try {
        // @ts-ignore - Adsense is added globally
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('Error loading native ad:', error);
      }
    }
  }, []);
  
  if (adManager.hasOptedOut()) return null;
  
  return (
    <div className={`native-ad-container my-4 p-4 border rounded-lg bg-background/50 ${className}`}>
      <p className="text-xs text-muted-foreground mb-2">Sponsored Content</p>
      <div
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '150px' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={adSlot}
        data-ad-format="fluid"
        data-ad-layout-key="-fb+5w+4e-db+86"
      />
    </div>
  );
};

export default NativeAd;
