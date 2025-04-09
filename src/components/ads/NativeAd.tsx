
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
    <div 
      ref={adRef}
      id={adUnitId}
      className={`bg-gray-100 p-2 border-t border-gray-200 h-[90px] ${className}`}
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    >
      <div className="text-xs text-center text-gray-400">Advertisement</div>
    </div>
  );
};

export default NativeAd;
