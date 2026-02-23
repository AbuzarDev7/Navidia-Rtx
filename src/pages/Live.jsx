import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import liveVideo from '../assets/videos/Live.mp4';

gsap.registerPlugin(ScrollTrigger);

function Live() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 🌌 Background Parallax
      gsap.to(".bg-glow-1", {
        y: -150,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
      gsap.to(".bg-glow-2", {
        y: 150,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      //  Header Stagger
      gsap.from(".live-stagger", {
        opacity: 0,
        y: 30,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
      });

      // 🎥 Main Stream Player Entrance
      gsap.from(".main-player", {
        opacity: 0,
        scale: 0.98,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".main-player",
          start: "top 80%"
        }
      });

      // ⭐ Archive Cards Entrance
      gsap.from(".archive-card", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".archive-grid",
          start: "top 85%"
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log("Video play failed:", err));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white selection:bg-[#76b900] selection:text-black">
      
      {/* Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="bg-glow-1 absolute top-0 right-[15%] w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-[#76b900]/10 blur-[120px] rounded-full"></div>
        <div className="bg-glow-2 absolute bottom-0 left-[10%] w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-[#76b900]/5 blur-[120px] rounded-full"></div>
        
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: 'linear-gradient(#76b900 1px, transparent 1px), linear-gradient(90deg, #76b900 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
        </div>
      </div>

      <div className="relative z-10 pt-40 pb-24 px-6 sm:px-12 max-w-7xl mx-auto">
        
        <header className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20 relative">
          <div className="live-stagger">
            <h3 className="text-[#76b900] font-black tracking-[0.8em] uppercase text-[10px] sm:text-xs mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#76b900]/40"></span>
              RTX 5090 GLOBAL PREMIERE
            </h3>
            <h1 className="text-[12vw] sm:text-[9vw] lg:text-[7.5vw] font-black leading-[0.8] uppercase tracking-tighter italic">
              UNLEASH THE <br />
              <span className="text-[#76b900] transition-all hover:text-white duration-1000">BEAST.</span>
            </h1>
          </div>
          
          <div className="live-stagger premium-card px-10 py-8 flex items-center space-x-8 rounded-[30px] shadow-2xl overflow-hidden group relative bg-white/[0.03] border border-white/10 backdrop-blur-2xl">
             <div className="absolute top-0 right-0 w-24 h-24 bg-[#76b900]/5 blur-3xl group-hover:bg-[#76b900]/10 transition-all duration-1000"></div>
             <div className="text-right flex flex-col items-end">
                <p className="text-[9px] text-white/30 font-black uppercase tracking-[0.3em] mb-2">Concurrent Viewers</p>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#76b900] rounded-full animate-pulse shadow-[0_0_10px_#76b900]"></span>
                  <p className="text-3xl font-black italic tracking-tight">2.4M</p>
                </div>
             </div>
             <div className="w-[1px] h-12 bg-white/10"></div>
             <div className="text-right">
                <p className="text-[9px] text-white/30 font-black uppercase tracking-[0.3em] mb-2">Stream Priority</p>
                <p className="text-3xl font-black italic tracking-tight">ULTRA_X</p>
             </div>
          </div>
        </header>

        <div 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="main-player relative group rounded-[50px] overflow-hidden border border-white/10 aspect-video shadow-2xl bg-black cursor-pointer"
        >
          <div className="absolute inset-0 z-0">
            <video 
               ref={videoRef}
               src={liveVideo}
               muted
               loop
               playsInline
               className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
          </div>

          <div className="absolute inset-0 z-10 p-8 sm:p-12 flex flex-col justify-between pointer-events-none">
            <div className="flex justify-between items-start">
               <div className="bg-red-600/90 text-white text-[10px] font-black px-4 py-1.5 uppercase tracking-[0.4em] flex items-center gap-3 shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                 <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                 EXCLUSIVE PREMIERE
               </div>
               <div className="bg-white/[0.03] backdrop-blur-xl px-6 py-2 border border-white/10 flex items-center space-x-3 shadow-xl">
                 <span className="w-1.5 h-1.5 bg-[#76b900] rounded-full animate-pulse"></span>
                 <span className="text-xs font-black font-mono tracking-widest italic opacity-80">RTX_5090_LIVE</span>
               </div>
            </div>
            
            <div className="flex justify-center">
               <div className="pointer-events-none w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center group-hover:bg-[#76b900] group-hover:border-[#76b900] transition-all duration-700 group-hover:shadow-[0_0_60px_rgba(118,185,0,0.4)] opacity-80 group-hover:opacity-0">
                  <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-white border-b-[15px] border-b-transparent ml-2 transition-all duration-500"></div>
               </div>
            </div> 
 
            <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-6">
               <div className="bg-white/[0.02] backdrop-blur-2xl p-6 border-l-4 border-[#76b900] w-full sm:w-auto shadow-2xl">
                 <p className="text-[#76b900] text-[9px] font-black tracking-[0.5em] uppercase mb-2">NEURAL_DECODER_READY</p>
                 <h3 className="text-xl sm:text-2xl font-black italic tracking-tighter uppercase whitespace-normal break-words max-w-lg">RTX_5090_REVELATION_ARCHIVE</h3>
               </div>
               <div className="flex items-center space-x-3 pointer-events-auto opacity-30 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="w-12 h-1.5 bg-[#76b900]/20 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-[#76b900] animate-[shimmer_2s_infinite_linear]"></div>
                  </div>
                  <div className="w-1.5 h-1.5 bg-[#76b900] rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-[#76b900] rounded-full opacity-50"></div>
                  <div className="w-1.5 h-1.5 bg-[#76b900] rounded-full opacity-20"></div>
               </div>
            </div>
          </div>
        </div>

        <section className="mt-32">
           <header className="archive-header flex items-center gap-6 mb-12">
              <h2 className="text-xs font-black uppercase tracking-[0.5em] text-white/30 truncate">RTX_50_SERIES_ARCHIVE</h2>
              <div className="flex-1 h-[1px] bg-white/5"></div>
           </header>
           
           <div className="archive-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                "RTX_5090_DLSS_4_PERFORMANCE_BREAKDOWN",
                "ULTRA_RAY_TRACING_IN_NEXT_GEN_TITLES",
                "NEURAL_GRAPHICS_V3_ARCHITECTURE_DEEP_DIVE"
              ].map((title, i) => (
                <div key={i} className="archive-card group cursor-pointer bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-[40px] overflow-hidden hover:translate-y-[-10px] shadow-2xl transition-all duration-500">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800&idx=${i}`} 
                      alt="Archive"
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 opacity-60 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-4 right-4 bg-white/5 backdrop-blur-md px-3 py-1 text-[10px] font-black font-mono text-[#76b900] border border-[#76b900]/30 shadow-[0_0_20px_rgba(118,185,0,0.2)]">12K_120FPS</div>
                  </div>
                  <div className="p-8 relative">
                    <div className="absolute top-0 right-10 w-20 h-20 bg-[#76b900]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <h4 className="font-black text-lg sm:text-xl leading-[1.1] tracking-tighter mb-4 uppercase italic group-hover:text-[#76b900] transition-colors duration-500 line-clamp-2 min-h-[2.2em]">
                      {title}
                    </h4>
                    <div className="flex justify-between items-center">
                      <p className="text-[9px] text-white/20 font-black uppercase tracking-[0.4em]">ARCHIVED 23.02.26</p>
                      <div className="w-8 h-[2px] bg-white/5 group-hover:w-16 group-hover:bg-[#76b900]/50 transition-all duration-700"></div>
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </section>

        <div className="absolute top-[20%] left-[-10%] text-[25vw] font-black text-white/[0.01] pointer-events-none select-none uppercase italic whitespace-nowrap z-0">
          REAL_TIME
        </div>
      </div>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

export default Live;
