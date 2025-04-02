
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { adManager } from '@/utils/adManager';

interface PopupAdProps {
  delayInSeconds?: number;
  adSlot?: string;
}

const PopupAd: React.FC<PopupAdProps> = ({ 
  delayInSeconds = 10,
  adSlot = "XXXXXXXXXX" 
}) => {
  const [open, setOpen] = useState(false);
  const adRef = React.useRef<HTMLDivElement>(null);

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
        if (adRef.current && typeof window !== 'undefined') {
          try {
            // @ts-ignore - Adsense is added globally
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (error) {
            console.error('Error loading popup ad:', error);
          }
        }
      }, 500);
    }, delayInSeconds * 1000);

    return () => clearTimeout(timer);
  }, [delayInSeconds]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Special Offer</DialogTitle>
        </DialogHeader>
        
        <div className="my-4 flex justify-center">
          <div
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block', width: '300px', height: '250px' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot={adSlot}
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
