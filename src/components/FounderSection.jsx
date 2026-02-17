import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Html } from '@react-three/drei';
import * as THREE from 'three';

// Unsplash images
const managers = [
  {
    name: "Jensen Huang",
    role: "President & CEO",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Jensen_Huang_%28cropped%29.jpg", 
  },
  {
    name: "Colette Kress",
    role: "EVP & CFO",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Jeff Fisher",
    role: "SVP, GeForce",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Tim Teter",
    role: "EVP & General Counsel",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Debora Shoquist",
    role: "EVP, Operations",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Ajay Puri",
    role: "EVP, Worldwide Field Ops",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
  }
];

const CylinderItem = ({ image, index, count, radius }) => {
  const ref = useRef();
  
  // Calculate angle
  const angle = (index / count) * Math.PI * 2;
  
  // Position
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  
  // Rotation (face outward or inward? "Follow Art" usually faces outward or tangent)
  // Let's face center for now, or slightly tangential for that "swirl" look?
  // User said "circle", standard cylinder faces center usually.
  const rotY = angle + Math.PI;

  return (
    <group position={[x, 0, z]} rotation={[0, rotY, 0]}>
      <Image 
        ref={ref}
        url={image}
        transparent
        side={THREE.DoubleSide}
        scale={[1.8, 2.8, 1]} // Reduced width as requested
        opacity={1} 
      />
    </group>
  );
};

const Carousel = ({ radius = 3.5, setActiveIndex }) => { // Reduced radius for tighter gaps
  const groupRef = useRef();
  const count = managers.length;

  useFrame((state, delta) => {
    if (groupRef.current) {
        // Auto rotate
        groupRef.current.rotation.y += delta * 0.2; // Constant speed

        // Calculate active index logic for Center Text
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
        />
      ))}
    </group>
  );
};

const FounderSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-[#050505] to-black z-0"></div>
      
      {/* Header */}
      <div className="absolute top-10 w-full text-center z-10 pointer-events-none">
          <h3 className="text-[#76b900] font-black tracking-[0.5em] text-xs uppercase mb-2">Leadership Circle</h3>
      </div>

      {/* Center Text Layout */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none text-center mix-blend-difference">
             <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter drop-shadow-2xl transition-all duration-300">
               {managers[activeIndex]?.name || managers[0].name}
             </h2>
             <p className="text-[#76b900] md:text-xl font-bold uppercase tracking-[0.3em] inline-block mt-2">
               {managers[activeIndex]?.role || managers[0].role}
             </p>
      </div>

      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: false }}>
        <fog attach="fog" args={['#000000', 5, 15]} /> 
        <ambientLight intensity={2} />
        
        {/* No ScrollControls, just Carousel */}
        <Carousel radius={3.2} setActiveIndex={setActiveIndex} />
      </Canvas>
    </section>
  );
};

export default FounderSection;
