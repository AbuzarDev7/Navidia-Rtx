import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import Curser from './components/Curser';
import Home from './pages/Home';
import About from './pages/About';
import Live from './pages/Live';
import Contact from './pages/Contact';
import Footer from './components/Footer';

function App() {
  const [isIntroActive, setIsIntroActive] = useState(true);
  const lenisRef = React.useRef(null);
  const location = useLocation();

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

    if (isIntroActive) {
      lenis.stop();
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
  }, []);

  // Watch for intro completion or route change to unlock
  useEffect(() => {
    // If we land on a page other than Home, disable intro
    if (location.pathname !== '/') {
      setIsIntroActive(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!isIntroActive && lenisRef.current) {
      lenisRef.current.start();
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [isIntroActive]);

  // Scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
    // Refresh ScrollTrigger after route change and scroll to top
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [location.pathname]);

  const handleIntroComplete = () => {
    setIsIntroActive(false); 
  };

  return (
    <>
      {!isIntroActive && <Curser />}
      
      <div className="relative z-10">
        {!isIntroActive && <Navbar />}
        
        <Routes>
          <Route path="/" element={<Home onIntroComplete={handleIntroComplete} introFinished={!isIntroActive} />} />
          <Route path="/about" element={<About />} />
          <Route path="/live" element={<Live />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;