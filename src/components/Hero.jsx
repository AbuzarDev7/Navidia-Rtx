 import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Center, Environment, ContactShadows } from '@react-three/drei';
import gsap from 'gsap';
import VideoIntro from './VideoIntro';

function Model({ scale }) {
  const { scene } = useGLTF('./RTX3080Ti.glb'); 
  const groupRef = useRef();
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={scene} scale={scale} />
    </group>
  );
}

const Hero = ({ onIntroComplete }) => {
  const textRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    gsap.from(textRef.current, { opacity: 0, y: -20, duration: 1, ease: 'power3.out' });
    gsap.from(btnRef.current, { opacity: 0, y: 20, duration: 1, delay: 0.3, ease: 'power3.out' });
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      
      {/* --- BACKGROUND GLOWS --- */}
      <div className="absolute top-0 right-[15%] w-[350px] h-[350px] bg-[#76b900]/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-[10%] w-[350px] h-[350px] bg-[#76b900]/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* --- INTERACTIVE 3D CANVAS (BACKGROUND LAYER) --- */}
      <div className="absolute inset-0 w-full h-full z-[1]">
        <Canvas camera={{ position: [0, 0, 45], fov: 40 }}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[2,2,2]} intensity={0.8} color="#dbe0d3" />

          <spotLight
            position={[10, 10, 10]}
            intensity={200}
            angle={0.4}
            penumbra={0.8}
            color="#fefffc"
          />
          
          <spotLight
            position={[-10, 5, 10]}
            intensity={150}
            angle={0.35}
            penumbra={1}
            color="#ffffff"
          />
          
          <pointLight position={[0, 5, 0]} intensity={100} color="#ffffff" />

          <Suspense fallback={null}>
            <Environment preset="city" environmentIntensity={0.8} />

            <Center>
              <Model scale={5.5} />
            </Center>

            <ContactShadows
              position={[0, -2.5, 0]}
              opacity={0.7}
              scale={20}
              blur={2}
              color="#ffffff"
            />
          </Suspense>

          <OrbitControls
            makeDefault
            enableZoom={true}
            enablePan={false}
            minDistance={20}
            maxDistance={45}
            enableDamping={true}
            dampingFactor={0.05}
            rotateSpeed={0.8}
            autoRotate={false}
          />
        </Canvas>
      </div>

      {/* --- MAIN UI CONTENT --- */}
      <div className="container mx-auto h-full relative z-[100] flex justify-between px-10 pt-24 pb-12 pointer-events-none">
        
        {/* LEFT SIDE: Text Top & Buttons Bottom */}
        <div className="w-full md:w-5/12 flex flex-col justify-between h-full pointer-events-auto">
           
           {/* TEXT SECTION - GAMING STYLE WITH GLITCH EFFECT */}
     <div ref={textRef} className="flex flex-col gap-0">

  {/* SMALL HEADER */}
  <h3
    className="text-[#76b900] font-bold tracking-[0.5em] uppercase text-[10px] mb-3"
    style={{
      textShadow: `
        0 0 8px #76b900,
        0 0 18px #76b900
      `
    }}
  >
    NEXT GEN GRAPHICS
  </h3>

  {/* MAIN HEADING */}
  <h1
    className="font-black leading-[0.9] uppercase tracking-[-0.02em]"
    style={{
      fontSize: "64px",
      color: "#ffffff",
      fontWeight: 900,
      textShadow: `
        3px 3px 0 #000,
        0 0 25px rgba(118,185,0,0.5)
      `
    }}
  >
    THE FUTURE <br />
    OF{" "}
    <span
      style={{
        color: "#76b900",
        textShadow: `
          3px 3px 0 #000,
          0 0 15px #76b900,
          0 0 35px rgba(118,185,0,0.8)
        `
      }}
    >
      GAMING
    </span>{" "}
    <br />
    LIVES HERE
  </h1>

  {/* PARAGRAPH */}
  <p
    className="font-semibold text-sm max-w-[320px] mt-6 border-l-4 border-[#76b900] pl-4 leading-relaxed py-3 pr-3"
    style={{
      color: "#eaeaea",
      backgroundColor: "rgba(0, 0, 0, 0.85)",
      textShadow: `
        0 0 8px rgba(118,185,0,0.4)
      `
    }}
  >
    Dominate the digital battlefield. Rise through the ranks and etch your name in gaming history.
  </p>

</div>


           {/* BUTTONS - SMALLER TEXT */}
           <div ref={btnRef} className="flex gap-4 mb-4">
              <button className="px-8 py-3 bg-[#76b900] text-black font-black uppercase text-[10px] tracking-widest clip-button hover:brightness-110 transition-all hover:scale-105" style={{
                WebkitFontSmoothing: 'antialiased',
                boxShadow: '0 0 25px rgba(118,185,0,0.6), inset 0 0 20px rgba(255,255,255,0.2)'
              }}>
                PLAY NOW
              </button>
              <button className="px-8 py-3 border-2 border-[#76b900]/60 bg-black/80 font-black uppercase text-[10px] tracking-widest clip-button transition-all hover:scale-105" style={{
                color: '#76b900',
                WebkitFontSmoothing: 'antialiased',
                textShadow: '0 0 10px rgba(118,185,0,0.8)',
                boxShadow: '0 0 15px rgba(118,185,0,0.3)'
              }}>
                JOIN BATTLE
              </button>
           </div>
        </div>

        {/* RIGHT SIDE: HUD Elements */}
        <div className="w-full md:w-4/12 flex flex-col justify-end items-end h-full relative pointer-events-auto pb-4">
           
           <div className="flex flex-col items-end gap-5">
              
            

              {/* USER STAT CARD */}
              <div className="bg-[#0a0a0a]/95 backdrop-blur-xl p-5 w-52 border border-[#76b900]/30 clip-stat-card shadow-2xl hover:border-[#76b900]/70 transition-all">
                 <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-4xl font-black italic brightness-110" style={{
                      color: '#ffffff',
                      WebkitFontSmoothing: 'antialiased',
                      textShadow: '0 0 20px rgba(118,185,0,0.6), 3px 3px 6px rgba(0,0,0,0.9)'
                    }}>120k</span>
                    <span className="text-[#76b900] text-[10px] font-bold uppercase tracking-widest italic brightness-150" style={{
                      WebkitFontSmoothing: 'antialiased',
                      textShadow: '0 0 10px #76b900'
                    }}>USERS</span>
                 </div>
                 <div className="flex -space-x-2">
                    {[1,2,3].map((i) => (
                       <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gray-800 overflow-hidden hover:scale-110 hover:z-10 transition-transform" style={{
                         boxShadow: '0 0 10px rgba(118,185,0,0.3)'
                       }}>
                          <img src={`https://i.pravatar.cc/100?img=${i+25}`} alt="avatar" className="w-full h-full object-cover" />
                       </div>
                    ))}
                 </div>
              </div>

              {/* SOCIAL ICONS - NOW IN COLUMN LAYOUT */}
              <div className="flex flex-col gap-3">
                 {['FB', 'IG', 'X', 'DC'].map((s, idx) => (
                    <a key={s} href="#" className={`w-11 h-11 flex items-center justify-center rounded-lg text-[11px] font-black border transition-all hover:scale-110
                       ${idx === 0 
                         ? 'bg-[#76b900] text-black border-[#76b900]' 
                         : 'bg-black/80 text-[#76b900] border-[#76b900]/40 hover:bg-[#76b900] hover:text-black hover:border-[#76b900]'
                       }`} style={{
                      WebkitFontSmoothing: 'antialiased',
                      boxShadow: idx === 0 
                        ? '0 0 25px rgba(118,185,0,0.8)' 
                        : '0 0 15px rgba(118,185,0,0.3)',
                      textShadow: idx === 0 ? 'none' : '0 0 10px #76b900'
                    }}>
                       {s}
                    </a>
                 ))}
              </div>
           </div>

        </div>
      </div>

      
      <style>{` 
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }
        
        .clip-trapezoid { 
          clip-path: polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%); 
        }
        .clip-stat-card { 
          clip-path: polygon(0 0, 100% 0, 100% 78%, 82% 100%, 0 100%); 
        }
        .clip-button { 
          clip-path: polygon(6% 0, 100% 0, 94% 100%, 0 100%); 
        }
      `}</style>

      {/* --- VIDEO INTRO OVERLAY --- */}
      <VideoIntro onComplete={onIntroComplete} />
    </div>
  );
};

export default Hero;