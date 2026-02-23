import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Lenis from 'lenis';

import Curser from './components/Curser';
import Hero from './components/Hero';
import CardShowcase from './components/CardShowcase';
import AwardSection from './components/AwardSection';
import MobileAwardSection from './components/MobileAwardSection';
import FounderSection from './components/FounderSection';
import WorldSection from './components/WorldSection';
import VideoWebGLSection from './components/VideoWebGLSection';
import Footer from './components/Footer';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isIntroActive, setIsIntroActive] = useState(true);

  const lenisRef = React.useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    // Immediately stop if intro is active
    if (isIntroActive) {
      lenis.stop();
      // Also force body/html lock just in case
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []); // Run once on mount

  // Watch for intro completion to unlock
  useEffect(() => {
    if (!isIntroActive && lenisRef.current) {
      lenisRef.current.start();
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [isIntroActive]);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const handleIntroComplete = () => {
    setIsIntroActive(false); 
    // setShowIntro(false); // Keep video mounted
  };

  return (
    <>
      {!isIntroActive && <Curser />}
      
      <div className="relative z-10">
        <Navbar />
        <Hero onIntroComplete={handleIntroComplete} />
        <CardShowcase />
        <div className="hidden md:block">
          <AwardSection />
        </div>
        <div className="block md:hidden">
          <MobileAwardSection />
        </div>
        <FounderSection />
        <VideoWebGLSection />
        <WorldSection />
        <Footer />
      </div>
    </>
  );
}

export default App;