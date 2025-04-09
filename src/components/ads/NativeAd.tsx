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
  return;
};
export default NativeAd;