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
          y: 4 * 10, // Offset to match previous cards logic
          rotation: 5,
          opacity: 0,
          scale: 0.9, // Slightly smaller initially to look "behind"
        },
        {
          x: 0,
          y: 4 * 5, // Stack it after the 4th card (index 3 * 5 = 15)
          rotation: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
        },
        "-=0.5" // Overlap slightly with the last card animation
      );

      // Expand final card to full screen
      tl.to(finalCard, {
        scale: 1, 
        width: '100vw',
        height: '100vh',
        x: '-50vw', // Move to the left to cover the left panel (since we are in the right panel)
        y: 0,
        position: 'absolute', // Use absolute to respect scroll flow but break out of flex
        top: 0,
        left: 0, // Relative to right panel start
        margin: 0,
        zIndex: 100,
        borderRadius: 0,
        duration: 2,
        ease: 'power4.inOut',
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
      <div ref={rightPanelRef} className="w-1/2 h-full relative z-10 flex items-center justify-center perspective-[2000px]">
        {/* GPU Cards */}
        {[
          { id: 1, name: "RTX 3080 Ti", img: "https://nvidianews.nvidia.com/_gallery/get_file/?file_id=60b5c5cded6ae549cd412207" },
          { id: 2, name: "RTX 4010", img: "https://cdn.mos.cms.futurecdn.net/KYzGJSuUStbsaqqBVQrYfe.png" },
          { id: 3, name: "RTX 4090", img: "https://i.pinimg.com/736x/cf/90/54/cf905474dfdef7dd5aa235a03fe80297.jpg" },
          { id: 4, name: "RTX 5090", img: "https://i.pinimg.com/736x/de/5e/7b/de5e7b604735fa080b33e7b8f81f16d6.jpg" }
        ].map((card, index) => (
          <div
            key={index}
            ref={addToRefs}
            className="absolute w-[350px] h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group"
            style={{ zIndex: index + 1 }} // Ensure correct stacking order
          >
            {/* Background Image */}
            {/* Background Image using img tag for better coverage */}
            <img 
              src={card.img} 
              alt={`RTX ${card.name}`}
              className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
            />
            
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500"></div>

            {/* Content Container */}
            <div className="absolute inset-0 p-8 flex flex-col items-center justify-center">
                
                {/* Main Text - Centered & Minimal */}
                <div className="transform transition-transform duration-500 group-hover:scale-110">
                  <h3 className="text-6xl font-black text-white tracking-tighter italic drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] text-center">
                    RTX <span className="block text-4xl mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#76b900] to-white">{card.name}</span>
                  </h3>
                  <div className="h-1 w-24 bg-[#76b900] mx-auto mt-4 rounded-full shadow-[0_0_10px_#76b900] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

              </div>
          </div>
        ))}

        {/* Final Card - Coming Soon (Premium) */}
        <div
          ref={finalCardRef}
          className="absolute w-[350px] h-[500px] rounded-[30px] bg-black flex flex-col items-center justify-center overflow-hidden"
          style={{ zIndex: 0 }} // Initially behind (visually, will be controlled by animation)
        >
          <img 
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop" 
            alt="RTX 6090 Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-10 blur-sm scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
           {/* Animated Grid Background */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(118,185,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(118,185,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"></div>
          
          <div className="relative z-10 text-center p-12 w-full">
            <h2 className="text-[#76b900] text-7xl font-black mb-6 tracking-tighter relative z-20 drop-shadow-[0_0_25px_rgba(118,185,0,0.8)]">
              RTX 6090
            </h2>
            
            <div className="flex items-center justify-center gap-4">
              <span className="h-[1px] w-12 bg-gray-500"></span>
              <p className="text-2xl font-light tracking-[0.6em] text-white uppercase">
                Coming Soon
              </p>
              <span className="h-[1px] w-12 bg-gray-500"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardShowcase;
