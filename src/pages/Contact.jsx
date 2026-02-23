import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 🌌 Background Parallax
      gsap.to(".bg-glow-1", {
        y: -100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
      gsap.to(".bg-glow-2", {
        y: 100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // 🚀 Content Entrance
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".contact-sub", { x: -30, opacity: 0, duration: 1, delay: 0.2 })
        .from(".contact-title", { x: -50, opacity: 0, duration: 1.2, skewX: -5 }, "-=0.8")
        .from(".contact-desc", { x: -30, opacity: 0, duration: 1 }, "-=0.6")
        .from(".contact-info-item", { x: -30, opacity: 0, duration: 0.8, stagger: 0.2 }, "-=0.4");

      // 💳 Premium Form Entrance
      gsap.from(".premium-card", {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".premium-card",
          start: "top 85%"
        }
      });

      // 📜 Form Fields Stagger
      gsap.from(".form-field", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 80%"
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white selection:bg-[#76b900] selection:text-black">
      
      {/* Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="bg-glow-1 absolute top-0 right-[15%] w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-[#76b900]/10 blur-[120px] rounded-full"></div>
        <div className="bg-glow-2 absolute bottom-0 left-[10%] w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-[#76b900]/5 blur-[120px] rounded-full"></div>
        
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" 
             style={{ backgroundImage: 'linear-gradient(#76b900 1px, transparent 1px), linear-gradient(90deg, #76b900 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
        </div>
      </div>

      <div className="relative z-10 pt-48 pb-20 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          <div className="space-y-16">
            <div>
              <h3 className="contact-sub text-[#76b900] font-black tracking-[0.8em] uppercase text-[10px] sm:text-xs mb-8 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[#76b900]/40"></span>
                ESTABLISH PROTOCOL
              </h3>
              
              <h1 className="contact-title text-[11vw] sm:text-[9vw] lg:text-[7vw] font-black leading-[0.8] uppercase tracking-tighter italic mb-10">
                LET'S <br />
                <span className="text-white/10 outline-text">CO-</span><span className="text-[#76b900]">CREATE.</span>
              </h1>

              <p className="contact-desc text-white/50 text-xl font-light leading-relaxed max-w-md mb-12">
                Whether you're architecting the next digital frontier or seeking absolute 
                computational dominance, our collective intelligence is ready.
              </p>

              <div className="space-y-10">
                {[
                  { label: 'DIRECT CHANNEL', value: 'hello@navdia.pro', sub: 'Always responding.' },
                  { label: 'GLOBAL LOCUS', value: 'San Francisco, CA', sub: 'The heart of Silicon.' }
                ].map((item) => (
                  <div key={item.label} className="contact-info-item group cursor-pointer w-fit">
                    <p className="text-[#76b900] font-black text-[9px] tracking-[0.4em] mb-2">{item.label}</p>
                    <p className="text-3xl font-black italic tracking-tight group-hover:translate-x-2 transition-all duration-700">{item.value}</p>
                    <p className="text-white/20 text-[10px] mt-2 font-medium group-hover:text-[#76b900]/40 transition-colors uppercase tracking-widest">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="premium-card p-10 sm:p-16 rounded-[50px] relative overflow-hidden group shadow-2xl bg-[#0a0a0a]/80 border border-white/5 backdrop-blur-md transition-all duration-700">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#76b900]/5 blur-3xl transition-all duration-[3s] group-hover:bg-[#76b900]/15"></div>
            
            <form className="contact-form relative z-10 space-y-12">
              {[
                { label: 'IDENTIFIER', type: 'text', placeholder: 'YOUR FULL NAME...' },
                { label: 'COMM CHANNEL', type: 'email', placeholder: 'YOUR@EMAIL.COM...' }
              ].map((field) => (
                <div key={field.label} className="form-field space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20">{field.label}</label>
                  <input 
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full bg-white/[0.02] border-b border-white/5 py-5 px-1 text-white placeholder:text-white/5 focus:outline-none focus:border-[#76b900]/50 transition-all font-medium italic text-lg"
                  />
                </div>
              ))}
              
              <div className="form-field space-y-3">
                <label className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20">THE MISSION</label>
                <textarea 
                  rows="4"
                  placeholder="DESCRIBE YOUR VISION..."
                  className="w-full bg-white/[0.02] border-b border-white/5 py-5 px-1 text-white placeholder:text-white/5 focus:outline-none focus:border-[#76b900]/50 transition-all font-medium italic text-lg resize-none"
                ></textarea>
              </div>

              <div className="form-field pt-6">
                <button className="relative w-full py-7 overflow-hidden group/btn bg-[#76b900] text-black font-black uppercase tracking-[0.5em] text-[10px] rounded-[24px] transition-all hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(118,185,0,0.3)]">
                  <span className="relative z-10">INITIATE SYNCS</span>
                  <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]"></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-10 text-[12vw] font-black text-white/[0.01] pointer-events-none select-none uppercase italic leading-none z-0">
        NVIDIA_RTX
      </div>
    </div>
  );
};

export default Contact;
