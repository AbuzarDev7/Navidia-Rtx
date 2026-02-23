import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image } from '@react-three/drei';
import * as THREE from 'three';

// Leadership data
const managers = [
  { name: "Jensen Huang", role: "President & CEO", image: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Jensen_Huang_%28cropped%29.jpg" },
  { name: "Colette Kress", role: "EVP & CFO", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" },
  { name: "Jeff Fisher", role: "SVP, GeForce", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop" },
  { name: "Tim Teter", role: "EVP & General Counsel", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop" },
  { name: "Debora Shoquist", role: "EVP, Operations", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop" },
  { name: "Ajay Puri", role: "EVP, Worldwide Field Ops", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop" }
];

// Cylinder Item
const CylinderItem = ({ image, index, count, radius, scaleX, scaleY }) => {
  const ref = useRef();
  const angle = (index / count) * Math.PI * 2;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  const rotY = angle + Math.PI;

  return (
    <group position={[x, 0, z]} rotation={[0, rotY, 0]}>
      <Image 
        ref={ref}
        url={image}
        transparent
        side={THREE.DoubleSide}
        scale={[scaleX, scaleY, 1]}
        opacity={1} 
      />
    </group>
  );
};

// Carousel
const Carousel = ({ radius, setActiveIndex, scaleX, scaleY }) => {
  const groupRef = useRef();
  const count = managers.length;

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;

      const rotation = groupRef.current.rotation.y;
      const segment = (Math.PI * 2) / count;
      let indexFloat = (-rotation / segment);
      let index = Math.round(indexFloat) % count;
      if (index < 0) index += count;
      setActiveIndex(index);
    }
  });

  return (
    <group ref={groupRef}>
      {managers.map((manager, i) => (
        <CylinderItem 
          key={i} 
          index={i} 
          image={manager.image} 
          count={count} 
          radius={radius}
          scaleX={scaleX}
          scaleY={scaleY}
        />
      ))}
    </group>
  );
};

// Founder Section
const FounderSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize for responsive scaling
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive scales and radius
  const scaleX = windowWidth < 768 ? 1.2 : 1.8;
  const scaleY = windowWidth < 768 ? 2.0 : 2.8;
  const radius = windowWidth < 768 ? 2.5 : 3.2;

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-[#050505] to-black z-0"></div>
      
      {/* Header */}
      <div className="absolute top-10 w-full text-center z-10 pointer-events-none">
        <h3 className="text-[#76b900] font-black tracking-[0.5em] text-xs uppercase mb-2">Leadership Circle</h3>
      </div>

      {/* Center Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none text-center mix-blend-difference px-4">
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter drop-shadow-2xl transition-all duration-300">
          {managers[activeIndex]?.name || managers[0].name}
        </h2>
        <p className="text-[#76b900] text-sm md:text-lg font-bold uppercase tracking-[0.3em] mt-2">
          {managers[activeIndex]?.role || managers[0].role}
        </p>
      </div>

      {/* Canvas */}
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: false }}>
        <fog attach="fog" args={['#000000', 5, 15]} />
        <ambientLight intensity={2} />
        <Carousel radius={radius} setActiveIndex={setActiveIndex} scaleX={scaleX} scaleY={scaleY} />
      </Canvas>
    </section>
  );
};

export default FounderSection;