import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Lenis from 'lenis';

import Curser from './components/Curser';
import Hero from './components/Hero';
import VideoIntro from './components/VideoIntro';
import CardShowcase from './components/CardShowcase';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isIntroActive, setIsIntroActive] = useState(true);

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

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const handleIntroComplete = () => {
    setIsIntroActive(false); 
    // setShowIntro(false); // Keep video mounted
  };

  return (
    <>
      <VideoIntro onComplete={handleIntroComplete} />
      {!isIntroActive && <Curser />}
      
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <CardShowcase />
      </div>
    </>
  );
}

export default App;