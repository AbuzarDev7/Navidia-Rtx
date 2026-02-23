import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#" },
    { name: "Live", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  return (
    <div className="fixed top-0 inset-x-0 z-[1000] 
    flex justify-between items-start 
    px-5 sm:px-8 
    pt-4 sm:pt-6 
    pointer-events-none">

      {/* LEFT SECTION - Desktop Links */}
      <nav className="pointer-events-auto hidden md:flex items-center space-x-6 lg:space-x-8">
        {navLinks.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-gray-400 hover:text-[#76b900] 
            font-medium text-xs sm:text-sm 
            uppercase tracking-widest 
            transition-colors duration-300"
          >
            {item.name}
          </a>
        ))}
      </nav>

      {/* CENTER BRANDING */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-auto">
        <div className="bg-[#0a0a0a] border-b border-white/10 
        px-6 sm:px-10 md:px-12 
        py-3 sm:py-4 
        clip-trapezoid 
        flex flex-col items-center justify-center relative override-clip">

          {/* Top Green Line */}
          <div className="absolute top-0 w-full h-[2px] bg-[#76b900] shadow-[0_0_10px_#76b900]"></div>

          <div className="flex items-center gap-2 mt-2">
            <span className="font-black 
            text-lg sm:text-xl md:text-2xl 
            tracking-tighter text-white">
              NVIDIA <span className="text-[#76b900]">RTX</span>
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION - Menu */}
      <div className="pointer-events-auto flex items-center gap-3 sm:gap-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
        >
          <span className="uppercase text-xs sm:text-sm font-medium tracking-widest hidden md:block">
            Menu
          </span>

          <div className="space-y-1.5">
            <span className="block w-5 sm:w-6 h-0.5 bg-current transform group-hover:translate-x-1 transition-transform"></span>
            <span className="block w-3 sm:w-4 h-0.5 bg-current ml-auto transform group-hover:translate-x-0 transition-transform"></span>
            <span className="block w-5 sm:w-6 h-0.5 bg-current transform group-hover:translate-x-1 transition-transform"></span>
          </div>
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center pointer-events-auto">

          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 text-white hover:text-[#76b900]"
          >
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="flex flex-col space-y-6 sm:space-y-8 text-center">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-xl sm:text-2xl font-bold text-gray-300 hover:text-[#76b900] uppercase tracking-widest transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .override-clip {
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5));
        }

        .clip-trapezoid {
          clip-path: polygon(10% 0, 90% 0, 100% 100%, 0% 100%);
        }
      `}</style>
    </div>
  );
};

export default Navbar;