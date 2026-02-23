import React from 'react';
import introVideo from '../assets/videos/bg.mp4';

const MobileAwardSection = () => {
    const cards = [
        { 
            title: "MWII",
            img: "https://upload.wikimedia.org/wikipedia/en/4/4a/Call_of_Duty_Modern_Warfare_II_Key_Art.jpg" 
        },
        { 
            title: "AC SHADOWS",
            img: "https://gaming-cdn.com/images/products/16829/orig/assassin-s-creed-shadows-xbox-series-x-s-microsoft-store-cover.jpg?v=1760450567" 
        },
        { 
            title: "FORZA 5",
            img: "https://upload.wikimedia.org/wikipedia/en/8/86/Forza_Horizon_5_cover_art.jpg" 
        },
        { 
            title: "RDR 2",
            img: "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg" 
        }
    ];

    return (
        <div className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center py-20 px-6 overflow-hidden">
            {/* Background Video (Lower Opacity for Mobile) */}
            <div className="absolute inset-0 z-0 opacity-40">
                <video 
                    src={introVideo} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black"></div>
            </div>

            {/* Header Text */}
            <div className="relative z-20 text-center mb-12">
                <h2 className="text-[#76b900] text-5xl font-black tracking-tighter uppercase drop-shadow-[0_0_15px_rgba(118,185,0,0.5)] leading-none">
                    ULTIMATE<br/>GAMING
                </h2>
                <div className="w-20 h-1 bg-[#76b900] mx-auto mt-4 rounded-full"></div>
                <p className="text-white/60 text-sm mt-4 tracking-[0.3em] font-light uppercase">Performance Redefined</p>
            </div>

            {/* Grid for Cards */}
            <div className="relative z-20 grid grid-cols-2 gap-4 w-full max-w-md">
                {cards.map((card, index) => (
                    <div 
                        key={index} 
                        className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl transition-all duration-300 active:scale-95"
                    >
                        <img 
                            src={card.img} 
                            alt={card.title} 
                            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                            <h3 className="text-white font-bold text-xs tracking-wider uppercase drop-shadow-md">
                                {card.title}
                            </h3>
                        </div>
                        {/* Glow effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,_rgba(118,185,0,0.15)_0%,_transparent_70%)]"></div>
                    </div>
                ))}
            </div>

            {/* Bottom Accent */}
            <div className="relative z-20 mt-12 flex items-center gap-4">
                <div className="text-[#76b900] text-3xl font-black italic">RTX</div>
                <div className="h-[1px] w-12 bg-white/20"></div>
                <div className="text-white/40 text-[10px] tracking-widest uppercase">On</div>
            </div>
        </div>
    );
};

export default MobileAwardSection;
