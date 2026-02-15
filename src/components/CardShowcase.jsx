import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CardShowcase = () => {
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const cardsRef = useRef([]);
  const finalCardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const leftPanel = leftPanelRef.current;
      const cards = cardsRef.current;
      const finalCard = finalCardRef.current;

      // Pin the container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=400%', // Adjust based on how long you want the scroll to be
          pin: true,
          scrub: 1, // Smooth scrubbing
          // markers: true, // Remove in production
        },
      });

      // Animate cards entering from right to center one by one
      cards.forEach((card, index) => {
        tl.fromTo(
          card,
          {
            x: '120vw', 
            y: index * 10, // Slight vertical offset for stacking effect
            rotation: 5,
            opacity: 0
          },
          {
            x: 0,
            y: index * 5, // Stack them slightly offset
            rotation: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
          },
          index * 0.5 // Stagger start times
        );
      });

      // After cards are stacked, animate the final card
      tl.fromTo(
        finalCard,
        {
          x: '120vw',
          y: 0,
          scale: 0.5,
          opacity: 0,
          rotation: 10
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1,
          ease: 'back.out(1.7)',
        }
      );

      // Expand final card to full screen
      tl.to(finalCard, {
        scale: 1, // Reset scale relative to container if needed, but we want full screen
        width: '100vw',
        height: '100vh',
        x: 0,
        y: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 50,
        borderRadius: 0,
        duration: 2,
        ease: 'power2.inOut',
      });
      
      // Optional: fade out other elements when final card expands
      tl.to([leftPanel, ...cards], {
        opacity: 0,
        duration: 0.5,
      }, "<"); // Run at start of previous animation

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black flex text-white">
      {/* Left Panel - Nvidia Style */}
      <div ref={leftPanelRef} className="w-1/2 h-full flex flex-col justify-center p-16 z-10 relative">
        <h2 className="text-[#76b900] text-xl font-bold tracking-widest mb-4 uppercase">
          Technology
        </h2>
        <h1 className="text-6xl font-black mb-6 leading-tight">
          GEFORCE RTX <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#dacfc0]">
            40 SERIES
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-md mb-8">
          Beyond fast. The NVIDIA® GeForce RTX™ 40 Series GPUs are beyond fast for gamers and creators. They're powered by the ultra-efficient NVIDIA Ada Lovelace architecture which delivers a quantum leap in both performance and AI-powered graphics.
        </p>
        <button className="w-fit px-8 py-3 bg-[#76b900] text-black font-bold uppercase tracking-wider hover:bg-white transition-colors duration-300">
          See All products
        </button>
      </div>

      {/* Right Panel area where cards enter */}
      <div ref={rightPanelRef} className="w-1/2 h-full relative z-10 flex items-center justify-center">
        {/* Placeholder Cards */}
        {[1, 2, 3, 4].map((item, index) => (
          <div
            key={index}
            ref={addToRefs}
            className="absolute w-[350px] h-[500px] bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-[#333] rounded-2xl p-6 shadow-2xl flex flex-col justify-between"
            style={{ zIndex: index }}
          >
           <div className="w-full h-40 bg-gray-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
             {/* Placeholder for GPU Image */}
             <div className="w-20 h-20 bg-[#76b900] rounded-full blur-2xl opacity-20"></div>
             <span className="text-gray-500 font-mono text-sm">GPU MODEL {item}</span>
           </div>
           <div>
             <h3 className="text-2xl font-bold text-white mb-2">RTX 40{item}0</h3>
             <p className="text-gray-400 text-sm">Extreme performance for gaming and creating.</p>
           </div>
           <div className="flex justify-between items-center mt-4">
             <span className="text-[#76b900] font-bold">$ {item}99</span>
             <button className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white hover:text-black transition-colors text-sm">
               Buy Now
             </button>
           </div>
          </div>
        ))}

        {/* Final Card - Coming Soon */}
        <div
          ref={finalCardRef}
          className="absolute w-[400px] h-[600px] bg-black border border-[#76b900] rounded-2xl flex flex-col items-center justify-center z-20 overflow-hidden shadow-[0_0_50px_rgba(118,185,0,0.3)]"
        >
          <div className="absolute inset-0 bg-[url('https://assets.nvidia.com/hidef/images/geforce-rtx-4090/geforce-rtx-4090-product-gallery-1.jpg')] bg-cover bg-center opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
          
          <div className="relative z-10 text-center p-10">
            <h2 className="text-[#76b900] text-7xl font-black mb-4 tracking-tighter shadow-black drop-shadow-lg">
              RTX 5090
            </h2>
            <p className="text-3xl font-light tracking-[0.5em] text-white uppercase mb-8">
              Coming Soon
            </p>
            <div className="w-24 h-1 bg-[#76b900] mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardShowcase;
