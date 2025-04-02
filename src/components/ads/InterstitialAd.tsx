
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { adManager } from '@/utils/adManager';

interface InterstitialAdProps {
  triggerOnAction?: boolean;
  adSlot?: string;
  countdownSeconds?: number;
}

const InterstitialAd: React.FC<InterstitialAdProps> = ({ 
  triggerOnAction = false,
  adSlot = "XXXXXXXXXX",
  countdownSeconds = 5
}) => {
  const [open, setOpen] = useState(false);
  const [countdown, setCountdown] = useState(countdownSeconds);
  const adRef = React.useRef<HTMLDivElement>(null);

  // Function to show the interstitial ad
  const showAd = () => {
    if (adManager.hasOptedOut()) return;
    
    setOpen(true);
    setCountdown(countdownSeconds);
    
    // Load ad after dialog opens
    setTimeout(() => {
      if (adRef.current && typeof window !== 'undefined') {
        try {
          // @ts-ignore - Adsense is added globally
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
          console.error('Error loading interstitial ad:', error);
        }
      }
    }, 300);
  };

  // Countdown timer when ad is shown
  useEffect(() => {
    if (!open || countdown <= 0) return;
    
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [open, countdown]);

  // Auto-close when countdown reaches zero
  useEffect(() => {
    if (countdown <= 0 && open) {
      setOpen(false);
    }
  }, [countdown, open]);

  // Initial display if not action-triggered
  useEffect(() => {
    if (!triggerOnAction) {
      const timer = setTimeout(showAd, 2000);
      return () => clearTimeout(timer);
    }
  }, [triggerOnAction]);

  return (
    <>
      {triggerOnAction && (
        <Button onClick={showAd} variant="outline" className="my-2">
          Continue (Shows Ad)
        </Button>
      )}
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] sm:max-h-[80vh]">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-500">
              Ad closes in {countdown} seconds
            </div>
            {countdown <= 0 && (
              <Button size="sm" onClick={() => setOpen(false)}>
                Close
              </Button>
            )}
          </div>
          
          <div className="my-4 flex justify-center">
            <div
              ref={adRef}
              className="adsbygoogle"
              style={{ display: 'block', width: '336px', height: '280px' }}
              data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
              data-ad-slot={adSlot}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InterstitialAd;
