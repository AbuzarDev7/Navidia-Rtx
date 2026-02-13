import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

function Model(props) {
  const gltf = useGLTF('/gpu2.glb');
  const groupRef = useRef();
  
  useEffect(() => {
    if (gltf.scene) {
      // Clone the scene
      const clonedScene = gltf.scene.clone(true);
      
      // Optimize materials
      clonedScene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          if (child.material) {
            const materials = Array.isArray(child.material) ? child.material : [child.material];
            materials.forEach((mat) => {
              mat.needsUpdate = true;
            });
          }
        }
      });
      
      // Clear previous children
      if (groupRef.current) {
        while (groupRef.current.children.length > 0) {
          groupRef.current.remove(groupRef.current.children[0]);
        }
        groupRef.current.add(clonedScene);
      }
    }
  }, [gltf]);
  
  // Rotation animation
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });
  
  return <group ref={groupRef} {...props} />;
}

function Loader() {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 1, 0.5]} />
      <meshStandardMaterial color="#00ff00" wireframe />
    </mesh>
  );
}

const Hero = () => {
  const leftDivRef = useRef(null);
  const rightDivRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    gsap.set(leftDivRef.current, { xPercent: 0 });
    gsap.set(rightDivRef.current, { xPercent: 0 });
    gsap.set(canvasRef.current, { opacity: 0, scale: 0.8 });
    gsap.set(textRef.current, { opacity: 0, y: -50 });

    tl.to([leftDivRef.current, rightDivRef.current], {
      xPercent: (index) => index === 0 ? -100 : 100,
      duration: 1.5,
      ease: 'power4.inOut',
      stagger: 0.1
    })
    .to(canvasRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'back.out(1.7)'
    }, '-=0.8')
    .to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5');

  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div ref={leftDivRef} className="absolute top-0 left-0 w-1/2 h-full bg-black z-50" />
      <div ref={rightDivRef} className="absolute top-0 right-0 w-1/2 h-full bg-black z-50" />

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900 to-black z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div ref={textRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full px-4 pointer-events-none">
        <h1 className="glitch-text text-5xl md:text-8xl font-black text-white tracking-wider uppercase" data-text="NVIDIA RTX 5090">
          NVIDIA RTX 5090
        </h1>
        <p className="mt-4 text-green-400 text-lg md:text-xl font-mono tracking-widest">
          The Ultimate Play
        </p>
      </div>

      <div ref={canvasRef} className="absolute inset-0 z-10">
        <Canvas
          camera={{ 
            position: [0, 0, 5], 
            fov: 75,
            near: 0.1,
            far: 1000
          }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
          dpr={[1, 2]}
        >
          <color attach="background" args={['#000000']} />
          
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <directionalLight position={[-10, -10, -5]} intensity={0.3} />
          <pointLight position={[0, 0, 10]} color="#00ff00" intensity={1} />
          <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={0.5} castShadow />
          
          <Suspense fallback={<Loader />}>
            <Model scale={3} position={[0, -0.5, 0]} />
          </Suspense>
        </Canvas>
      </div>

      <style>{`
        .glitch-text {
          position: relative;
          color: white;
          text-shadow: 2px 2px 0px #00ff00, -2px -2px 0px #ff00ff;
          animation: glitch 1s infinite linear alternate-reverse;
        }
        
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .glitch-text::before {
          left: 2px;
          text-shadow: -2px 0 #00ff00;
          clip: rect(24px, 550px, 90px, 0);
          animation: glitch-anim 2s infinite linear alternate-reverse;
        }
        
        .glitch-text::after {
          left: -2px;
          text-shadow: -2px 0 #ff00ff;
          clip: rect(85px, 550px, 140px, 0);
          animation: glitch-anim 3s infinite linear alternate-reverse;
        }
        
        @keyframes glitch {
          0%, 100% { transform: translate(0,0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, -2px); }
        }
        
        @keyframes glitch-anim {
          0% { clip: rect(61px, 9999px, 52px, 0); }
          50% { clip: rect(63px, 9999px, 37px, 0); }
          100% { clip: rect(173px, 9999px, 166px, 0); }
        }
      `}</style>
    </div>
  );
};

export default Hero;