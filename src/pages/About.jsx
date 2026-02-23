import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "react-countup";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
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

      // 🚀 Hero Entrance
      const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
      heroTl.from(".hero-sub", { y: 20, opacity: 0, duration: 1, delay: 0.2 })
            .from(".hero-title", { y: 100, opacity: 0, duration: 1.2, skewY: 7 }, "-=0.8")
            .from(".hero-desc", { y: 30, opacity: 0, duration: 1 }, "-=0.6");

      // 📊 Metrics Entrance
      gsap.from(".stat-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 80%"
        }
      });

      // 💎 Features Entrance
      gsap.from(".feature-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".features-section",
          start: "top 80%"
        }
      });

      // 🧠 Founder Vision Entrance
      gsap.from(".vision-content", {
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".vision-section",
          start: "top 70%"
        }
      });

      // ⭐ Testimonials Entrance
      gsap.from(".testimonial-card", {
        x: (i) => i % 2 === 0 ? -100 : 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "top 80%"
        }
      });

      // 🚀 CTA Entrance
      gsap.from(".cta-content", {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 85%"
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const ThunderIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#76b900]">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );

  const ShieldIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#76b900]">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );

  const NetworkIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#76b900]">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
    </svg>
  );

  const features = [
    {
      title: "EXTREME PERFORMANCE",
      desc: "Architected for absolute dominance. Every cycle is optimized for zero-latency execution.",
      icon: <ThunderIcon />
    },
    {
      title: "QUANTUM SECURITY",
      desc: "Encryption protocols that redefine safety. Your assets are guarded by the vanguard of cyber-defense.",
      icon: <ShieldIcon />
    },
    {
      title: "INFINITE SCALABILITY",
      desc: "A living ecosystem that grows with your ambition. Built to power the next generation of digital giants.",
      icon: <NetworkIcon />
    },
  ];

  const stats = [
    { end: 120, suffix: "K+", label: "ACTIVE USERS" },
    { end: 99.9, suffix: "%", label: "UPTIME CORE" },
    { end: 50, suffix: "+", label: "GLOBAL NODES" },
    { end: 24, suffix: "/7", label: "ELITE SUPPORT" },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white selection:bg-[#76b900] selection:text-black">
      
      {/* Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="bg-glow-1 absolute top-0 right-[15%] w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-[#76b900]/10 blur-[120px] rounded-full"></div>
        <div className="bg-glow-2 absolute bottom-0 left-[10%] w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-[#76b900]/5 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" 
             style={{ backgroundImage: 'radial-gradient(#76b900 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }}>
        </div>
      </div>

      <div className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="pt-40 pb-20 px-6 sm:px-12 max-w-7xl mx-auto text-center">
          <h3 className="hero-sub text-[#76b900] font-black tracking-[0.8em] uppercase text-[10px] sm:text-xs mb-8 block">
            — Crafted For Dominance —
          </h3>
          
          <h1 className="hero-title text-[13vw] sm:text-[11vw] md:text-[9vw] font-black leading-[0.75] uppercase tracking-tighter italic">
            BEYOND <span className="text-[#76b900] transition-all hover:text-white duration-1000">FAST.</span>
            <br />
            <span className="text-white/10 outline-text">NVIDIA</span> <span className="text-white">RTX.</span>
          </h1>

          <p className="hero-desc mt-14 text-white/50 max-w-2xl mx-auto text-lg sm:text-xl font-light leading-relaxed tracking-tight">
            We don't just assemble components. We forge digital legends. 
            Each iteration is a masterpiece of thermal engineering and neural processing, 
            designed for those who demand absolute perfection.
          </p>
        </section>

        {/* CORE METRICS */}
        <section className="stats-section py-20 px-6 sm:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card group relative p-10 bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-[40px] hover:bg-white/[0.05] hover:border-[#76b900]/30 transition-all duration-700 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#76b900]/5 blur-3xl group-hover:bg-[#76b900]/10 transition-all duration-1000"></div>
                <h3 className="text-4xl sm:text-5xl md:text-6xl font-black text-white group-hover:text-[#76b900] tracking-tighter italic transition-colors duration-500">
                  <CountUp end={stat.end} duration={4} decimals={stat.end % 1 !== 0 ? 1 : 0} redraw={true} enableScrollSpy={true} />{stat.suffix}
                </h3>
                <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mt-4">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PREMIUM FEATURES */}
        <section className="features-section py-20 px-6 sm:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((item, index) => (
              <div key={index} className="feature-card group relative bg-[#0a0a0a]/80 border border-white/5 p-10 rounded-[40px] hover:bg-white/5 hover:border-[#76b900]/30 transition-all duration-700 backdrop-blur-md">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:border-[#76b900]/50 group-hover:bg-[#76b900]/5 transition-all duration-500 shadow-xl backdrop-blur-md">
                   {item.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 group-hover:text-[#76b900] transition-colors uppercase italic">{item.title}</h3>
                <p className="text-white/50 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FOUNDER'S VISION */}
        <section className="vision-section py-40 px-6 sm:px-12 bg-white/[0.015] border-y border-white/5 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none" 
               style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}></div>
          
          <div className="vision-content max-w-4xl mx-auto relative z-10">
              <div className="flex justify-center mb-12">
                <div className="w-16 h-16 border-2 border-[#76b900]/20 rounded-full flex items-center justify-center rotate-12 group hover:rotate-0 transition-transform duration-700">
                  <span className="text-[#76b900] text-3xl">“</span>
                </div>
              </div>
              <blockquote className="text-4xl sm:text-6xl font-thin italic leading-[1.1] tracking-tighter text-white/90">
                “Everything we build is a <span className="text-[#76b900] font-black not-italic px-4">Legacy</span> in the making. 
                Navdia isn't hardware — it's the heartbeat of the next <span className="opacity-40">digital era</span>.”
              </blockquote>
              <div className="mt-16 flex flex-col items-center">
                <span className="text-5xl sm:text-7xl font-signature text-[#76b900]/80 mb-4 select-none hover:text-[#76b900] transition-colors duration-700 cursor-default">
                  A. Morgan
                </span>
                <p className="text-white/30 font-black uppercase tracking-[0.5em] text-[10px]">Founder & Chief Architect</p>
              </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.01] pointer-events-none select-none uppercase italic whitespace-nowrap">
            PRESTIGE
          </div>
        </section>

        {/* ELITE TESTIMONIALS */}
        <section className="testimonials-section py-32 px-6 sm:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { text: "The transition to Navdia's RTX infrastructure was the single best decision for our studio's efficiency.", author: "S. Carter, Design Director" },
              { text: "Speed is no longer a bottleneck. It's our primary weapon. Incredible reliability.", author: "J. Wick, Lead Architect" }
            ].map((t, idx) => (
              <div key={idx} className="testimonial-card p-12 bg-gradient-to-br from-white/5 to-transparent border-l-2 border-[#76b900]/40">
                <p className="text-xl sm:text-2xl font-medium text-white/70 italic mb-8 mb-6">“{t.text}”</p>
                <h4 className="text-[#76b900] font-black uppercase text-sm tracking-widest">— {t.author}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="cta-section py-40 px-6 sm:px-12 text-center">
          <div className="cta-content max-w-3xl mx-auto">
            <h2 className="text-5xl sm:text-7xl font-black mb-10 tracking-tighter uppercase italic leading-none">
              READY TO <br />
              <span className="text-[#76b900]">ASCEND?</span>
            </h2>
            <button className="relative px-12 py-5 bg-[#76b900] text-black font-black uppercase tracking-[0.3em] text-sm overflow-hidden group transition-all hover:shadow-[0_0_60px_#76b90088] rounded-2xl">
              <span className="relative z-10">Join The Elite</span>
              <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
