
import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  format?: 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ format = 'horizontal', className = '' }) => {
  const adRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Only execute in production to avoid errors during development
    if (process.env.NODE_ENV === 'production' && adRef.current) {
      try {
        // @ts-ignore - Adsense is added globally by the script in index.html
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        console.log('Ad requested');
      } catch (error) {
        console.error('Error loading ad:', error);
      }
    }
  }, []);
  
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
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width, height }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdBanner;
