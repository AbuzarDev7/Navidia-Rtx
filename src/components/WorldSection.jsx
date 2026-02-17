import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere, Html, QuadraticBezierLine } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';

const Globe = () => {
  const globeRef = useRef();
  
  // Load Earth Textures
  const [colorMap, cloudsMap] = useLoader(TextureLoader, [
    // Standard 1k/2k textures - more reliable loading
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
  ]);
  // Generate random connection points on sphere surface
  const connections = useMemo(() => {
    const lines = [];
    const count = 30; // Reduced count for cleaner look with texture
    const r = 4; // Radius
    for (let i = 0; i < count; i++) {
        // Random start point
        const phi1 = Math.random() * Math.PI * 2;
        const theta1 = Math.random() * Math.PI;
        const start = new THREE.Vector3().setFromSphericalCoords(r, theta1, phi1);
        
        // Random end point
        const phi2 = Math.random() * Math.PI * 2;
        const theta2 = Math.random() * Math.PI;
        const end = new THREE.Vector3().setFromSphericalCoords(r, theta2, phi2);
        
        // Control point for curve (higher than surface)
        const mid = start.clone().add(end).normalize().multiplyScalar(r * 1.5);
        
        lines.push({ start, end, mid });
    }
    return lines;
  }, []);

  useFrame((state, delta) => {
     if(globeRef.current) {
         globeRef.current.rotation.y += delta * 0.05; // Slower rotation
     }
  });

  return (
    <group ref={globeRef}>
      {/* Textured Sphere */}
      <mesh>
        <sphereGeometry args={[4, 64, 64]} />
        <meshStandardMaterial 
            map={colorMap} 
            color="#fff" // White to show true texture colors
            roughness={0.6}
            metalness={0.2}
        />
      </mesh>
      
      {/* Cloud Layer */}
      <mesh scale={[1.02, 1.02, 1.02]}>
         <sphereGeometry args={[4, 64, 64]} />
         <meshStandardMaterial 
            map={cloudsMap}
            transparent 
            opacity={0.4} 
            blending={THREE.AdditiveBlending} 
            side={THREE.DoubleSide}
            depthWrite={false}
         />
      </mesh>
      
      {/* Glowing Atmosphere */}
      <mesh scale={[1.1, 1.1, 1.1]}>
        <sphereGeometry args={[4, 32, 32]} />
        <meshBasicMaterial 
            color="#76b900" 
            transparent 
            opacity={0.05} 
            side={THREE.BackSide} 
            blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Connection Lines */}
      {connections.map((line, i) => (
         <QuadraticBezierLine 
            key={i}
            start={line.start}
            end={line.end}
            mid={line.mid}
            color="#76b900"
            lineWidth={1.5}
            transparent
            opacity={0.6}
         />
      ))}
      
    </group>
  );
};

const WorldSection = () => {
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] via-black to-black z-0 pointer-events-none"></div>

      {/* Overlay Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none text-center mix-blend-screen">
          <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter opacity-10 uppercase whitespace-nowrap">
              World Wide
          </h2>
          <h2 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#76b900] to-black tracking-tighter uppercase -mt-4 md:-mt-10">
              RTX ON
          </h2>
          <p className="text-[#76b900] uppercase tracking-[0.5em] font-bold mt-4 animate-pulse">
              Connecting Gamers Globally
          </p>
      </div>

      <Canvas camera={{ position: [0, 0, 12], fov: 45 }} gl={{ antialias: true, alpha: false }}>
        <fog attach="fog" args={['#000000', 10, 30]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#76b900" />
        <directionalLight position={[-5, 5, 5]} intensity={1} color="#fff" />
        
        <React.Suspense fallback={
            <mesh scale={[0.5, 0.5, 0.5]}>
                <sphereGeometry args={[4, 16, 16]} />
                <meshBasicMaterial color="#76b900" wireframe />
            </mesh>
        }>
            <Globe />
        </React.Suspense>
        
        <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={0.5} 
            enablePan={false}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </section>
  );
};

export default WorldSection;
