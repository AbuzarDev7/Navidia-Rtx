import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // THE REQUEST: "PORA DIV NACHA SA AJYE" (The whole div comes from below)
            // We animate the ENTIRE footer block at once.
            gsap.fromTo(footerRef.current,
                { 
                    y: 250, 
                    opacity: 0,
                    scale: 0.98
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top bottom", // Reveals as it enters the viewport
                        toggleActions: "play none none reverse",
                        // Using scrub can be better for "coming from below" feel? 
                        // But regular play is safer for a clean finish.
                    }
                }
            );
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="relative w-full bg-black pt-24 pb-12 overflow-hidden border-t border-[#76b900]/20">
            {/* Background Branding - Huge & High-End */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none overflow-hidden">
                <h1 className="text-[28vw] font-black tracking-tighter text-white whitespace-nowrap leading-none">NVIDIA RTX</h1>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    
                    {/* Brand Meta */}
                    <div className="col-span-1 md:col-span-1">
                        <h2 className="text-[#76b900] text-3xl font-black tracking-tighter mb-8 italic italic">RTX VISION</h2>
                        <p className="text-white/40 text-sm leading-relaxed mb-8 font-medium">
                            Experience the cutting edge of real-time ray tracing and AI-powered performance.
                        </p>
                        <div className="flex gap-5">
                            {['TW', 'IG', 'YT', 'DS'].map((social) => (
                                <a key={social} href="#" className="w-10 h-10 border border-white/5 flex items-center justify-center text-[10px] font-black text-white/30 hover:text-[#76b900] hover:border-[#76b900]/40 transition-all duration-500">
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* GPU Links */}
                    <div>
                        <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.4em] mb-8 opacity-40">Graphics Cards</h4>
                        <ul className="space-y-4">
                            {['RTX 5090 Series', 'RTX 5080 Series', 'RTX 40-Series', 'Laptop GPUs'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-white/40 text-sm font-bold uppercase hover:text-[#76b900] transition-colors duration-300">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.4em] mb-8 opacity-40">Resources</h4>
                        <ul className="space-y-4">
                            {['GeForce Experience', 'Game Ready Drivers', 'Creative Studio', 'G-SYNC Tech'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-white/40 text-sm font-bold uppercase hover:text-[#76b900] transition-colors duration-300">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Community join */}
                    <div>
                        <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.4em] mb-8 opacity-40">Stay Updated</h4>
                        <p className="text-white/30 text-xs mb-6 font-medium">Get exclusive news and performance alerts.</p>
                        <div className="flex items-center border-b border-white/10 pb-2 group mb-6">
                            <input 
                                type="email" 
                                placeholder="YOUR EMAIL" 
                                className="w-full bg-transparent text-white text-xs font-black tracking-widest outline-none placeholder:opacity-20 translate-y-1"
                            />
                            <button className="text-[#76b900] text-[10px] font-black hover:scale-105 transition-transform">
                                SEND
                            </button>
                        </div>
                    </div>

                </div>

                {/* Footer Legal */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex gap-10 text-[9px] font-black text-white/20 tracking-widest">
                        <a href="#" className="hover:text-[#76b900]">PRIVACY</a>
                        <a href="#" className="hover:text-[#76b900]">LEGAL</a>
                        <a href="#" className="hover:text-[#76b900]">LOCATIONS</a>
                    </div>
                    <p className="text-[9px] font-black text-white/10 tracking-[0.5em] uppercase">
                        © 2026 NVIDIA CORPORATION - BEYOND FAST
                    </p>
                </div>
            </div>

            {/* Aesthetic Borders */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#76b900]/40 to-transparent"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-[#76b900] shadow-[0_0_20px_#76b900] opacity-30"></div>
        </footer>
    );
};

export default Footer;
