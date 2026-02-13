import React, { useEffect, useState } from 'react';
import curser from '../assets/images/curser.png';

const Curser = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <img
      src={curser}
      alt="Custom Cursor"
      style={{
        position: 'fixed',
        left: 0,
        top: 40,
        width: '100px', // Adjust size as needed
        height: 'auto',
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        pointerEvents: 'none', // Critical: allows clicks to pass through
        zIndex: 9999, // Ensure it's on top of everything
        transition: 'transform 0.1s ease-out', // Smooth follow effect
      }}
    />
  );
};

export default Curser;
