import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import introVideo from '../assets/videos/intro.mp4'; 

// Define handlers outside to ensure stable references for add/removeEventListener
const preventDefault = (e) => {
  e.preventDefault();
};

const preventDefaultForScrollKeys = (e) => {
  const keys = ['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown', 'Home', 'End'];
  if (keys.includes(e.code)) {
    e.preventDefault();
  }
};

const VideoIntro = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hideOverlay, setHideOverlay] = useState(false);
  const videoContainerRef = useRef(null);

  // Define unlockScroll in scope so it can be used anywhere
  const unlockScroll = () => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    
    window.removeEventListener('wheel', preventDefault);
    window.removeEventListener('touchmove', preventDefault);
    window.removeEventListener('keydown', preventDefaultForScrollKeys);
  };

  useEffect(() => {
    // Lock scroll on mount
    const lockScroll = () => {
      window.scrollTo(0, 0); // Ensure we start at top
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden'; // Lock html too
      
      // Prevent wheel scroll
      window.addEventListener('wheel', preventDefault, { passive: false });
      // Prevent touch scroll
      window.addEventListener('touchmove', preventDefault, { passive: false });
      // Prevent keyboard scroll
      window.addEventListener('keydown', preventDefaultForScrollKeys, { passive: false });
    };

    lockScroll();

    const timer = setTimeout(() => {
      setHideOverlay(true);
      setTimeout(() => animateToCard(), 100);
    }, 10000); 

    return () => {
      clearTimeout(timer);
      unlockScroll();
    };
  }, []);

  const animateToCard = () => {
    
    const container = videoContainerRef.current;
    if (!container) return;

    const finalWidth = 224;
    const finalHeight = 144;
    const finalTop = 96;
    const finalRight = 40;
    
    // Calculation for Right Side Placement
    const targetLeft = window.innerWidth - finalWidth - finalRight;

    const targetClipPath = 'polygon(10% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%, 0% 10%)';
    const initialClipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 0%)';

    // Set initial clip-path
    gsap.set(container, { clipPath: initialClipPath });

    const tl = gsap.timeline({
      onComplete: () => {
        if (container) {
          // Switch to absolute positioning relative to parent (Hero) after animation
          // This allows it to scroll with the page
          container.style.position = 'absolute';
          // Lower z-index so it scrolls UNDER the navbar (which is z-[1000])
          container.style.zIndex = '10';
        }
        
        // Unlock scroll using the scoped function
        unlockScroll();
        
        if (onComplete) onComplete();
      }
    });

    tl.to(container, {
      width: finalWidth,
      height: finalHeight,
      top: finalTop,
      left: targetLeft,
      clipPath: targetClipPath,
      borderRadius: '0px',
      borderWidth: '1px',
      borderColor: 'rgba(118,185,0,0.3)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', 
      backgroundColor: '#0a0a0a', // Keep opaque
      backdropFilter: 'blur(0px)', // No blur needed if opaque
      duration: 1.2,
      ease: 'power3.inOut',
    });
  };

  if (!isVisible) return null;

  return (
    <div
      ref={videoContainerRef}
      onContextMenu={(e) => e.preventDefault()}
      className="fixed z-[5000] bg-black top-0 left-0 overflow-hidden select-none"
      style={{ width: '100%', height: '100vh' }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        src={introVideo}
      />

      {!hideOverlay && (
        <>
          

          <button
            onClick={() => {
              setHideOverlay(true);
              setTimeout(() => animateToCard(), 100);
            }}
            className="absolute top-8 right-8 z-20 px-6 py-2 border border-[#76b900] text-[#76b900] font-bold text-xs tracking-widest hover:bg-[#76b900] hover:text-black transition-all"
          >
            SKIP INTRO
          </button>
        </>
      )}
    </div>
  );
};

export default VideoIntro;