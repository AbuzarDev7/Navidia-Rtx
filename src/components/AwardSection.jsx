
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import introVideo from '../assets/videos/bg.mp4'; 

gsap.registerPlugin(ScrollTrigger);

const AwardSection = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef([]);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasInitialized, setCanvasInitialized] = useState(false);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const container = containerRef.current;

    // Only initialize canvas once or on major resize
    const initCanvas = () => {
      if (canvasInitialized && canvas.width === container.offsetWidth && canvas.height === container.offsetHeight) return;

      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      
      // Fill with dark overlay color
      ctx.fillStyle = '#000000'; // Matched Hero Section background
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setCanvasInitialized(true);
    };

    if (!canvasInitialized) {
        initCanvas();
    }

    const handleResize = () => {
        // Debounce or check if size actually changed significantly?
        // For now, let's just re-init if dimensions change, but maybe keep content?
        // Keeping content on resize is hard without a second canvas.
        // Let's just re-fill for now, but maybe the user's issue was simpler.
        // User said "wo na jye" -> "it shouldn't go". 
        // If the browser bar toggles on mobile, resize fires -> clears canvas.
        // That's annoyingly common.
        // Let's try to preserve image data if possible, or just ignore small resizes.
        if (Math.abs(canvas.width - container.offsetWidth) > 50 || Math.abs(canvas.height - container.offsetHeight) > 50) {
             const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
             canvas.width = container.offsetWidth;
             canvas.height = container.offsetHeight;
             ctx.putImageData(imageData, 0, 0); // This might stretch/crop but keeps scratch
             // Actually putImageData puts it at 0,0. Better than clearing.
             // If completely new size, we might need to fill the rest.
             ctx.fillStyle = '#000000';
             ctx.globalCompositeOperation = 'destination-over'; // Draw behind existing content
             ctx.fillRect(0, 0, canvas.width, canvas.height);
             ctx.globalCompositeOperation = 'source-over'; // Reset
        }
    };
    
    // Better resize handling: actually, just don't resize if it's small.
    // Or just let it be. The user probably just wants it to work.
    
    // Re-fill logic: if we don't resize, the canvas might look pixelated.
    // But maintaining the scratch is priority.
    
    // Scratch logic
    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const draw = (e) => {
      if (!isDrawing) return;
      // e.preventDefault(); // Prevent scrolling while scratching? User might want to scroll.
      // But if they scroll, they can't scratch easily.
      // Let's prevent default only if drawing?
      
      const { x, y } = getPos(e);
      
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 60, 0, Math.PI * 2); 
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    };

    const startDrawing = (e) => {
        setIsDrawing(true);
        draw(e); // Allow click to scratch a dot
    };
    
    const stopDrawing = () => setIsDrawing(false);

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      // window.removeEventListener('resize', handleResize); // Disabled resize listener for now to fix "wo na jye"
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [isDrawing, canvasInitialized]); 

  // GSAP Animation setup
  useEffect(() => {
    const ctx = gsap.context(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=200%",
                pin: true,
                scrub: 1,
            }
        });

        tl.to(cardsRef.current, {
            x: (index) => (index - 1.5) * 350, // Increased from 250 to 350 (more spread)
            y: (index) => index % 2 === 0 ? -120 : 120, // Increased vertical spread to show video
            rotation: (index) => (index - 1.5) * 20, // Increased rotation for better style
            duration: 1,
            ease: "power2.out"
        }, 0)
        .to(textRef.current, {
            scale: 1.2,
            y: -50,
            duration: 1
        }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const cards = [
    { title: "Call of Duty: MW II", img: "https://upload.wikimedia.org/wikipedia/en/4/4a/Call_of_Duty_Modern_Warfare_II_Key_Art.jpg" },
    { title: "Assassin's Creed Shadows", img: "https://gaming-cdn.com/images/products/16829/orig/assassin-s-creed-shadows-xbox-series-x-s-microsoft-store-cover.jpg?v=1760450567" },
    { title: "Forza Horizon 5", img: "https://upload.wikimedia.org/wikipedia/en/8/86/Forza_Horizon_5_cover_art.jpg" },
    { title: "Red Dead Redemption 2", img: "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg" }
  ];

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
        {/* Background Video */}
        <div ref={videoRef} className="absolute inset-0 z-0">
            <video 
                src={introVideo} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
            />
        </div>

        {/* Scratch Overlay Canvas */}
        <canvas 
            ref={canvasRef}
            className="absolute inset-0 z-10 cursor-crosshair touch-none"
        />

        {/* Center Text */}
        <div ref={textRef} className="relative z-20 text-center pointer-events-none">
            <h2 className="text-[#76b900] text-8xl font-black tracking-tighter uppercase drop-shadow-[0_0_25px_rgba(118,185,0,0.5)]">
                ULTIMATE<br/>GAMING
            </h2>
            <p className="text-white text-xl mt-4 tracking-[0.5em] font-light">Performance Redefined</p>
        </div>

        {/* Floating Cards */}
        {cards.map((card, index) => (
            <div 
                key={index} 
                ref={addToRefs}
                className="absolute z-20 w-64 h-80 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-2xl pointer-events-none"
                style={{
                    transform: `rotate(${ (index - 1.5) * -10 }deg) translate(${ (index - 1.5) * 50 }px, 0)`,
                    left: '50%',
                    top: '50%',
                    marginLeft: '-8rem', 
                    marginTop: '-10rem' // Adjusted for h-80 (20rem height -> half is 10rem)
                }}
            >
                <img src={card.img} alt={card.title} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                    <h3 className="text-white font-bold text-2xl text-center uppercase p-2">
                        {card.title}
                    </h3>
                </div>
            </div>
        ))}
    </div>
  );
};

export default AwardSection;
