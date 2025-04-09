
import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { adManager } from '@/utils/adManager';

interface PopupAdProps {
  delayInSeconds?: number;
  adSlot?: string;
}

const PopupAd: React.FC<PopupAdProps> = ({ 
  delayInSeconds = 10,
  adSlot = "3214569871" 
}) => {
  const [open, setOpen] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);
  const [adUnitId] = useState(() => adManager.generateAdUnitId(adSlot, 'popup'));
  const adInitialized = useRef(false);

  useEffect(() => {
    // Only show popup if user hasn't opted out of ads
    if (adManager.hasOptedOut()) {
      return;
    }

    // Delay popup appearance
    const timer = setTimeout(() => {
      setOpen(true);
      
      // Load ad after dialog opens
      setTimeout(() => {
        if (adRef.current && !adInitialized.current) {
          adInitialized.current = adManager.initializeAdUnit(adUnitId);
        }
      }, 500);
    }, delayInSeconds * 1000);

    return () => clearTimeout(timer);
  }, [delayInSeconds, adUnitId]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Special Offer</DialogTitle>
          <DialogDescription>
            Check out this special offer selected just for you!
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-4 flex justify-center">
          <div
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block', width: '300px', height: '250px' }}
            data-ad-client="ca-pub-6362499040977235"
            data-ad-slot={adSlot}
            id={adUnitId}
          />
        </div>
        
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PopupAd;
