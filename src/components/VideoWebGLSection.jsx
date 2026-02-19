import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import showcase1 from '../assets/images/showcase1.jpg';
import showcase2 from '../assets/images/showcase2.jpg';
import showcase3 from '../assets/images/showcase3.jpg';
import showcase4 from '../assets/images/showcase4.jpg';
import showcase5 from '../assets/images/showcase5.jpg';

gsap.registerPlugin(ScrollTrigger);

// Custom Water Ripple / Displacement Shader
const WaterRippleShader = {
  uniforms: {
    uTexture1: { value: null },
    uTexture2: { value: null },
    uProgress: { value: 0 },
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uHover: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture1;
    uniform sampler2D uTexture2;
    uniform float uProgress;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uHover;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // Water Ripple Logic (Only strong when hovered)
      float wave = sin(uv.y * 8.0 + uTime * 1.5) * 0.005 * uHover;
      wave += sin(uv.x * 12.0 + uTime * 1.2) * 0.003 * uHover;
      
      // Mouse Distortion
      float dist = distance(uv, uMouse);
      float circle = smoothstep(0.4, 0.0, dist) * uHover;
      
      // Displace UVs
      vec2 displacedUv = uv + wave + (circle * 0.02 * sin(dist * 25.0 - uTime * 4.0));
      
      vec4 tex1 = texture2D(uTexture1, displacedUv);
      vec4 tex2 = texture2D(uTexture2, displacedUv);
      
      gl_FragColor = mix(tex1, tex2, uProgress);
    }
  `
};

const InteractivePlane = ({ textures, progress, mouse, isHovered }) => {
  const meshRef = useRef();
  const { viewport } = useThree();

  const uniforms = useMemo(() => ({
    uTexture1: { value: textures[0] },
    uTexture2: { value: textures[1] },
    uProgress: { value: 0 },
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uHover: { value: 0 },
  }), [textures]);

  useFrame((state) => {
    if (meshRef.current && textures) {
      const idx = Math.floor(progress);
      const nextIdx = Math.min(idx + 1, textures.length - 1);
      const localProgress = progress % 1;

      meshRef.current.material.uniforms.uTexture1.value = textures[idx];
      meshRef.current.material.uniforms.uTexture2.value = textures[nextIdx];
      meshRef.current.material.uniforms.uProgress.value = localProgress;
      meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
      
      meshRef.current.material.uniforms.uMouse.value.lerp(mouse.current, 0.1);
      meshRef.current.material.uniforms.uHover.value = THREE.MathUtils.lerp(
        meshRef.current.material.uniforms.uHover.value, 
        isHovered ? 1.0 : 0.0, 
        0.05
      );
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial 
        args={[WaterRippleShader]} 
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
};

const VideoWebGLSection = () => {
  const containerRef = useRef(null);
  const layersRef = useRef([]);
  const textRefs = useRef([]);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));

  const imageUrls = useMemo(() => [
    showcase1,
    showcase2,
    showcase3,
    showcase4,
    showcase5
  ], []);

  const content = [
    { title: "RTX ARCHITECTURE", desc: "CRAFTING THE FUTURE OF PERFORMANCE" },
    { title: "AI PERFORMANCE", desc: "POWERED BY DEEP LEARNING NETWORKS" },
    { title: "RAY TRACED POWER", desc: "TRUE REALISM IN EVERY SHADOW" },
    { title: "QUANTUM DESIGN", desc: "PRECISION IN EVERY SINGLE PIXEL" },
    { title: "THE EVOLUTION", desc: "EXPERIENCE THE NEXT PINNACLE" }
  ];

  useEffect(() => {
    const totalSlides = imageUrls.length;
    
    // Master context for all animations
    const ctx = gsap.context(() => {
        // Pin the container
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: `+=${totalSlides * 100}%`,
            pin: true,
            scrub: 1.2,
            onUpdate: (self) => {
                setProgress(self.progress * (totalSlides - 1));
            }
        });

        // Loop through slides to create coordinated animations
        layersRef.current.forEach((layer, i) => {
            if (i === 0) {
                // Initial state for slide 0 text
                gsap.set(textRefs.current[0], { opacity: 1, y: 0, scale: 1 });
                return;
            }

            const startPos = (i / totalSlides) * (totalSlides * 100);
            const endPos = ((i + 1) / totalSlides) * (totalSlides * 100);

            // Timeline for this specific transition (Reveal slide i)
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: `${startPos}% top`,
                    end: `${endPos}% top`,
                    scrub: true,
                }
            });

            // 1. Slide the BG layer up
            tl.fromTo(layer, 
                { yPercent: 100 },
                { yPercent: 0, ease: "none" }
            );

            // 2. Fade OUT previous text
            if (textRefs.current[i-1]) {
                tl.to(textRefs.current[i-1], {
                    opacity: 0,
                    y: -30,
                    scale: 0.95,
                    duration: 0.3
                }, 0); // Start immediately with the layer slide
            }

            // 3. Fade IN current text
            if (textRefs.current[i]) {
                tl.fromTo(textRefs.current[i],
                    { opacity: 0, y: 50, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.5 },
                    0.2 // Slightly staggered
                );
            }
        });
    }, containerRef);

    return () => ctx.revert();
  }, [imageUrls.length]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height;
    mouse.current.set(x, y);
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen bg-black overflow-hidden select-none font-orbitron"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Fixed WebGL Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <React.Suspense fallback={null}>
            <ImageContent imageUrls={imageUrls} progress={progress} mouse={mouse} isHovered={isHovered} />
          </React.Suspense>
        </Canvas>
      </div>

      {/* Sliding UI Layers */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {content.map((item, i) => (
            <div 
                key={i}
                ref={el => layersRef.current[i] = el}
                className="absolute inset-0 flex items-center justify-start px-12 lg:px-32 transition-colors duration-500"
                style={{ 
                    zIndex: i + 10,
                    backgroundColor: i === 0 ? 'transparent' : 'rgba(0,0,0,0.1)' 
                }}
            >
                <div 
                    ref={el => textRefs.current[i] = el} 
                    className="max-w-5xl opacity-0" // Start hidden
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-[2px] bg-[#76b900] shadow-[0_0_10px_#76b900]"></div>
                        <span className="text-[#76b900] text-sm font-black tracking-[0.5em]">
                            RTX CORE / 0{i + 1}
                        </span>
                    </div>
                    
                    <h2 className="text-white text-[9vw] font-black uppercase tracking-tighter leading-[0.85] italic mb-8 drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
                        {item.title}
                    </h2>
                    
                    <p className="text-white/60 text-lg lg:text-2xl font-bold tracking-[0.2em] italic max-w-2xl border-l-2 border-[#76b900]/30 pl-8 ml-2">
                        {item.desc}
                    </p>

                    <div className="mt-16 flex items-center gap-8">
                        <div className="flex h-12 items-center px-8 border border-white/20 bg-white/5 backdrop-blur-sm">
                             <span className="text-white text-[10px] font-black tracking-widest uppercase">Initializing...</span>
                        </div>
                    </div>
                </div>
            </div>
        ))}
      </div>

      {/* Fixed Sidebar Indicators */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 z-50 pointer-events-none hidden lg:flex flex-col items-center gap-8">
          {imageUrls.map((_, i) => (
              <div key={i} className="group relative flex items-center justify-center">
                  <div className={`w-2 h-2 rotate-45 border-2 transition-all duration-700 ${Math.round(progress) === i ? 'bg-[#76b900] border-[#76b900] scale-150 shadow-[0_0_20px_#76b900]' : 'border-white/20 scale-75'}`}></div>
              </div>
          ))}
      </div>

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_50%,_rgba(0,0,0,0.7)_140%)] z-20"></div>
    </section>
  );
};

const ImageContent = ({ imageUrls, progress, mouse, isHovered }) => {
    const textures = useTexture(imageUrls);
    return <InteractivePlane textures={textures} progress={progress} mouse={mouse} isHovered={isHovered} />;
};

export default VideoWebGLSection;
