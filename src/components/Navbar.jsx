import React, { useState } from 'react';
import logo from '../assets/images/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-6 inset-x-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-5xl bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-full py-3 px-6 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-between transition-all duration-300">
        
        {/* Logo Section */}
        <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#76b900] to-blue-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
            <img style={{
              width : "70px",
              height:"70px"
            }}
              className="relative h-6 w-auto" 
              src={logo} 
              alt="Logo" 
            />
          </div>
          <span className="font-bold text-lg tracking-tight text-gray-200 group-hover:text-white transition-colors">
            RTX <span className="text-[#76b900]">5090</span>
          </span>
        </div>

        {/* Desktop Menu - Centered Links */}
        <div className="hidden md:flex items-center space-x-8">
          {['Ecosystem', 'Governance', 'Documentation', 'Contact', 'Socials'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200"
            >
              {item}
            </a>
          ))}
          <div className="relative group cursor-pointer text-sm font-medium text-gray-400 hover:text-white transition-colors">
            <span>I am a enthusiast</span>
            <svg className="w-4 h-4 inline-block ml-1 transform group-hover:rotate-180 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Right Section - CTA Button */}
        <div className="hidden md:flex items-center">
            <button className="relative group overflow-hidden rounded-full p-[1px]">
              <span className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full"></span>
              <div className="relative bg-black rounded-full px-5 py-2 transition-all duration-200 group-hover:bg-gray-900">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-300 group-hover:text-white">
                  Discover GPU
                </span>
              </div>
            </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-white focus:outline-none"
          >
            {!isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-20 left-4 right-4 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:hidden shadow-2xl z-40 transform transition-all duration-300 origin-top">
           <div className="space-y-1">
            {['Ecosystem', 'Governance', 'Documentation', 'Contact', 'Socials'].map((item) => (
              <a
                key={item}
                href="#"
                className="block px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {item}
              </a>
            ))}
            <button className="w-full mt-4 bg-[#76b900]/20 border border-[#76b900]/50 text-[#76b900] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-[#76b900] hover:text-black transition-all">
                Discover GPU
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar