import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Center,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import gsap from "gsap";
import VideoIntro from "./VideoIntro";

function Model({ scale }) {
  const { scene } = useGLTF("./RTX3080Ti.glb");
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

  // 🔥 Responsive Model Scale
  const [modelScale, setModelScale] = useState(5.5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setModelScale(3.8); // Mobile
      } else if (window.innerWidth < 1024) {
        setModelScale(4.8); // Tablet
      } else {
        setModelScale(5.5); // Desktop
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    gsap.from(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(btnRef.current, {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black text-white">
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-0 right-[15%] w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-[#76b900]/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-[10%] w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-[#76b900]/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* 3D CANVAS */}
      <div className="absolute inset-0 w-full h-full z-[1]">
        <Canvas
          camera={{
            position: window.innerWidth < 768 ? [0, 0, 55] : [0, 0, 45],
            fov: 40,
          }}
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <directionalLight position={[2, 2, 2]} intensity={0.8} />
          <spotLight
            position={[10, 10, 10]}
            intensity={200}
            angle={0.4}
            penumbra={0.8}
          />
          <spotLight
            position={[-10, 5, 10]}
            intensity={150}
            angle={0.35}
            penumbra={1}
          />
          <pointLight position={[0, 5, 0]} intensity={100} />

          <Suspense fallback={null}>
            <Environment preset="city" environmentIntensity={0.8} />
            <Center>
              <Model scale={modelScale} />
            </Center>
            <ContactShadows
              position={[0, -2.5, 0]}
              opacity={0.7}
              scale={20}
              blur={2}
            />
          </Suspense>

          <OrbitControls
            makeDefault
            enableZoom
            enablePan={false}
            minDistance={20}
            maxDistance={45}
            enableDamping
            dampingFactor={0.05}
            rotateSpeed={0.8}
            autoRotate={false}
          />
        </Canvas>
      </div>

      {/* MAIN CONTENT */}
      <div
        className="
        container mx-auto min-h-screen relative z-[100]
        flex flex-col md:flex-row
        justify-between
        px-5 sm:px-8 md:px-10
        pt-20 sm:pt-24
        pb-10 sm:pb-12
        pointer-events-none
      "
      >
        {/* LEFT SIDE */}
        <div className="w-full md:w-5/12 flex flex-col justify-between pointer-events-auto">
          <div ref={textRef} className="flex flex-col gap-0">
            <h3 className="text-[#76b900] font-bold tracking-[0.5em] uppercase text-[10px] mb-3">
              NEXT GEN GRAPHICS
            </h3>

            <h1 className="font-black leading-[0.9] uppercase tracking-[-0.02em] text-[36px] sm:text-[48px] md:text-[64px]">
              THE FUTURE <br />
              OF <span className="text-[#76b900]">GAMING</span>
              <br />
              LIVES HERE
            </h1>

            <p className="font-semibold text-xs sm:text-sm max-w-full sm:max-w-[320px] mt-6 border-l-4 border-[#76b900] pl-4 leading-relaxed py-3 pr-3 bg-black/80">
              Dominate the digital battlefield. Rise through the ranks and etch
              your name in gaming history.
            </p>
          </div>

          <div
            ref={btnRef}
            className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-4 mt-8"
          >
            <button className="px-6 sm:px-8 py-3 bg-[#76b900] text-black font-black uppercase text-[10px] tracking-widest clip-button hover:brightness-110 transition-all hover:scale-105">
              PLAY NOW
            </button>

            <button className="px-6 sm:px-8 py-3 border-2 border-[#76b900]/60 bg-black/80 font-black uppercase text-[10px] tracking-widest clip-button transition-all hover:scale-105 text-[#76b900]">
              JOIN BATTLE
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-4/12 flex flex-col justify-end md:items-end items-start pointer-events-auto mt-10 md:mt-0 pb-6 md:pb-4">
          <div className="flex flex-col items-start md:items-end gap-5 w-full md:w-auto">
            <div className="bg-[#0a0a0a]/95 backdrop-blur-xl p-4 sm:p-5 w-full sm:w-52 border border-[#76b900]/30 clip-stat-card shadow-2xl">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-3xl sm:text-4xl font-black italic">
                  120k
                </span>
                <span className="text-[#76b900] text-[10px] font-bold uppercase tracking-widest italic">
                  USERS
                </span>
              </div>

              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-black bg-gray-800 overflow-hidden"
                  >
                    <img
                      src={`https://i.pravatar.cc/100?img=${i + 25}`}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-row md:flex-col gap-3">
              {["FB", "IG", "X", "DC"].map((s, idx) => (
                <a
                  key={s}
                  href="#"
                  className={`w-11 h-11 flex items-center justify-center rounded-lg text-[11px] font-black border transition-all hover:scale-110 ${
                    idx === 0
                      ? "bg-[#76b900] text-black border-[#76b900]"
                      : "bg-black/80 text-[#76b900] border-[#76b900]/40 hover:bg-[#76b900] hover:text-black hover:border-[#76b900]"
                  }`}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .clip-stat-card {
          clip-path: polygon(0 0, 100% 0, 100% 78%, 82% 100%, 0 100%);
        }
        .clip-button {
          clip-path: polygon(6% 0, 100% 0, 94% 100%, 0 100%);
        }
      `}</style>

      <VideoIntro onComplete={onIntroComplete} />
    </div>
  );
};

export default Hero;