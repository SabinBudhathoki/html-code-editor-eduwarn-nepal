
import React, { useEffect, useRef, useState } from 'react';
import { adManager } from '@/utils/adManager';

interface NativeAdProps {
  className?: string;
  adSlot?: string;
}

const NativeAd: React.FC<NativeAdProps> = ({ 
  className = '',
  adSlot = "6875697584"
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [adUnitId] = useState(() => adManager.generateAdUnitId(adSlot, 'native'));
  
  useEffect(() => {
    if (adManager.hasOptedOut() || !adRef.current) return;
    
    const timeoutId = setTimeout(() => {
      adManager.initializeAdUnit(adUnitId);
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [adUnitId]);
  
  if (adManager.hasOptedOut()) return null;
  
  return (
    <div className={`native-ad-container my-4 p-4 border rounded-lg bg-background/50 ${className}`}>
      <p className="text-xs text-muted-foreground mb-2">Sponsored Content</p>
      <div
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '150px' }}
        data-ad-client="ca-pub-6362499040977235"
        data-ad-slot={adSlot}
        data-ad-format="fluid"
        data-ad-layout-key="-fb+5w+4e-db+86"
        id={adUnitId}
      />
    </div>
  );
};

export default NativeAd;
