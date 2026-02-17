import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop", // Gaming Setup
  "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600&auto=format&fit=crop", // Neon City
  "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop", // Cyberpunk
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop", // Retro PC
  "https://images.unsplash.com/photo-1593305841991-05c29736ce07?q=80&w=600&auto=format&fit=crop", // Joystick
  "https://images.unsplash.com/photo-1616588589676-60b30c3c1681?q=80&w=600&auto=format&fit=crop", // FPS
  "https://images.unsplash.com/photo-1612287232817-bc70e5f6084f?q=80&w=600&auto=format&fit=crop", // Console
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop", // VR
];

const InfiniteScrollSection = () => {
  const containerRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  
  // Refs for animation state
  const xPercent1 = useRef(0);
  const xPercent2 = useRef(0);
  const direction = useRef(1); // 1 = scroll down, -1 = scroll up

  useEffect(() => {
    // Entrance Animation
    gsap.fromTo(containerRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1, scrollTrigger: { trigger: containerRef.current, start: "top bottom" } }
    );

    // Scroll Direction & Velocity Tracker
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const vel = self.getVelocity();
        // Determine direction based on scroll velocity polarity
        if (vel !== 0) {
           direction.current = vel > 0 ? 1 : -1;
        }
      }
    });

    // Custom Animation Loop
    let animationFrameId;
    
    const animate = () => {
      // Base speed + minimal fallback movement
      const speed = 0.05 * direction.current;
      
      // Update positions
      // Row 1: Moves opposite to scroll direction (Parallax feel) or standard?
      // User said: "uper sa scroo kro dirctcion uper wala ka right rha" (Scroll Down -> Top Row Right)
      // So if direction is 1 (Down), xPercent should INCREASE (Right).
      xPercent1.current += speed;
      
      // Row 2: "nacha wala ka left" (Scroll Down -> Bottom Row Left)
      // So if direction is 1 (Down), xPercent should DECREASE (Left).
      xPercent2.current -= speed;

      // Wrap logic (Infinite Loop)
      if (xPercent1.current >= 0) xPercent1.current = -50;
      if (xPercent1.current <= -50) xPercent1.current = 0;
      
      if (xPercent2.current >= 0) xPercent2.current = -50;
      if (xPercent2.current <= -50) xPercent2.current = 0;

      // Apply transforms
      if (row1Ref.current) {
        gsap.set(row1Ref.current, { xPercent: xPercent1.current });
      }
      if (row2Ref.current) {
        gsap.set(row2Ref.current, { xPercent: xPercent2.current });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-black overflow-hidden border-t border-[#76b900]/20">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#111] via-black to-black z-0"></div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-10 perspective-1000 py-32">
        
        {/* ROW 1 - Standard Marquee (Right) */}
        <div className="w-full border-y border-[#76b900]/10 bg-black/40 py-8 backdrop-blur-sm z-10">
            <div className="flex w-[200%]" ref={row1Ref}>
              {[...images, ...images].map((src, i) => (
                <div key={i} className="flex-shrink-0 w-[450px] h-[280px] px-6">
                   <div className="w-full h-full relative group overflow-hidden rounded-xl bg-[#111] transition-transform duration-500 hover:scale-105 shadow-2xl">
                      <img src={src} alt="Game" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 ease-out" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className="text-white/50 text-[10px] uppercase tracking-[0.2em] block mb-1">Project</span>
                        <span className="text-[#76b900] text-lg font-black uppercase tracking-wider">RTX VISION</span>
                      </div>
                   </div>
                </div>
              ))}
            </div>
        </div>

        {/* ROW 2 - Standard Marquee (Left) */}
        <div className="w-full border-y border-[#76b900]/10 bg-black/40 py-8 backdrop-blur-sm z-10">
            <div className="flex w-[200%]" ref={row2Ref}>
              {[...images, ...images].map((src, i) => (
                 <div key={i} className="flex-shrink-0 w-[450px] h-[280px] px-6">
                    <div className="w-full h-full relative group overflow-hidden rounded-xl bg-[#111] transition-transform duration-500 hover:scale-105 shadow-2xl">
                       <img src={src} alt="Game" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 ease-out" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60"></div>
                       <div className="absolute bottom-4 right-4 text-right">
                         <span className="text-white/50 text-[10px] uppercase tracking-[0.2em] block mb-1">Gallery</span>
                         <span className="text-white text-lg font-black uppercase tracking-wider">GAME READY</span>
                       </div>
                    </div>
                 </div>
              ))}
            </div>
        </div>

      </div>
    </section>
  );
};

export default InfiniteScrollSection;
