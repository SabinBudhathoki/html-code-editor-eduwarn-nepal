
import React, { useEffect, useRef, useState } from 'react';
import { adManager } from '@/utils/adManager';

interface AdBannerProps {
  format?: 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ format = 'horizontal', className = '' }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [adUnitId] = useState(() => adManager.generateAdUnitId('7965843261', 'banner'));
  
  useEffect(() => {
    if (adManager.hasOptedOut() || !adRef.current) return;
    
    const timeoutId = setTimeout(() => {
      adManager.initializeAdUnit(adUnitId);
    }, 200);
    
    return () => clearTimeout(timeoutId);
  }, [adUnitId]);
  
  // Determine ad size based on format
  const getAdSize = () => {
    switch (format) {
      case 'vertical':
        return { width: '160px', height: '600px' };
      case 'rectangle':
        return { width: '300px', height: '250px' };
      case 'horizontal':
      default:
        return { width: '728px', height: '90px' };
    }
  };
  
  const { width, height } = getAdSize();
  
  return (
    <div className={`ad-container my-4 mx-auto ${className}`}>
      <div
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width, height }}
        data-ad-client="ca-pub-6362499040977235"
        data-ad-slot="7965843261"
        data-ad-format="auto"
        data-full-width-responsive="true"
        id={adUnitId}
      />
    </div>
  );
};

export default AdBanner;
