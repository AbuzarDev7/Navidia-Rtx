import React, { useState, useEffect } from "react";

const Loader = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(() => {
            if (onLoadComplete) onLoadComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  if (isComplete) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <div className="relative w-full max-w-2xl px-4">
        {/* Logo Container */}
        <div className="flex h-32 shadow-2xl overflow-hidden">
          {/* Left Side - White with Green Logo */}
          <div className="relative flex w-1/2 items-center justify-center bg-white">
            <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-r from-transparent to-white/50" />

            {/* NVIDIA Logo */}
            <div className="relative flex flex-col items-center justify-center">
              {/* Eye SVG */}
              <svg className="h-20 w-20" viewBox="0 0 100 100" fill="none">
                {/* Outer eye shape */}
                <path
                  d="M10 50 Q10 30, 30 20 Q50 10, 70 20 Q90 30, 90 50 Q90 70, 70 80 Q50 90, 30 80 Q10 70, 10 50"
                  fill="#76B900"
                  stroke="#76B900"
                  strokeWidth="2"
                />
                {/* Inner circle */}
                <circle cx="50" cy="50" r="20" fill="white" />
                {/* Pupil */}
                <circle cx="50" cy="50" r="12" fill="#76B900" />
                {/* Highlight */}
                <circle cx="45" cy="45" r="4" fill="white" opacity="0.8" />
                {/* Curved line detail */}
                <path
                  d="M30 50 Q40 45, 50 50 Q60 55, 70 50"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.5"
                />
              </svg>

              {/* NVIDIA Text */}
              <span className="mt-2 text-2xl font-bold tracking-wider text-[#76B900]">
                NVIDIA
              </span>
            </div>

            {/* Angled Cut */}
            <div className="absolute -right-6 top-0 h-full w-12 bg-white transform -skew-x-20" />
          </div>

          {/* Right Side - Black with White Text */}
          <div className="relative flex w-1/2 items-center justify-center bg-black pl-8">
            <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-l from-transparent to-black/50" />
            <div className="text-center">
              <div className="text-5xl font-black tracking-tight text-white">
                GEFORCE
              </div>
              <div className="mt-1 text-6xl font-black tracking-tight text-white">
                RTX
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 w-full">
          <div className="h-1 w-full overflow-hidden rounded-full bg-gray-800">
            <div
              className="h-full bg-gradient-to-r from-[#76B900] to-[#5a9600] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 text-center text-sm font-medium text-gray-400">
            Loading... {progress}%
          </div>
        </div>
      </div>
    </div> 
  );
};

export default Loader;
