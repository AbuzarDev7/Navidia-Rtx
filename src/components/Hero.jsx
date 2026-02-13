import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Center, Environment, ContactShadows, Float } from '@react-three/drei';
import gsap from 'gsap';

function Model({ scale }) {
  const { scene } = useGLTF('/RTX3080Ti.glb'); 
  const groupRef = useRef();
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={scene} scale={scale} />
    </group>
  );
}

const Hero = () => {
  const canvasRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    gsap.set(canvasRef.current, { opacity: 0, y: 50 });
    gsap.set(textRef.current, { opacity: 0, y: -30 });

    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.3
    })
    .to(canvasRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out'
    }, "-=0.8");
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#020202]">
      {/* Subtle Glow */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[70%] h-[40%] bg-[#76b900]/5 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Hero Text - Neeche shift kiya */}
      <div ref={textRef} className="absolute top-[60%] left-1/2 -translate-x-1/2 z-20 text-center w-full px-4 pointer-events-none">
        <h1 className="glitch-text text-5xl md:text-8xl font-black text-white tracking-tighter uppercase" data-text="NVIDIA RTX 5090">
          NVIDIA RTX 5090
        </h1>
        <p className="mt-2 text-[#76b900] text-xs md:text-lg font-mono tracking-[0.5em] uppercase font-bold opacity-80">
          The Ultimate Play
        </p>
      </div>

      {/* 3D Canvas */}
      <div ref={canvasRef} className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [4, 0, 35], fov: 35 }}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.3} />
          <spotLight position={[10, 15, 10]} angle={0.15} penumbra={1} intensity={1.5} color="#76b900" />
          
          <Suspense fallback={null}>
            <Environment preset="night" />
            
            <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
              {/* GPU ko upar shift kiya aur chota kiya */}
              <Center position={[0, -1, 0]}>
                <Model scale={4} /> 
              </Center>
            </Float>

            <ContactShadows 
              position={[0, -2, 0]} 
              opacity={0.5} 
              scale={10} 
              blur={3} 
              far={4} 
            />
          </Suspense>

          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2.5}
          />
        </Canvas>
      </div>
  <style>{`
  /* Gaming Glitch Text Effect CSS */

/* Main Glitch Text */
.glitch-text {
    font-size: 80px;
    font-weight: bold;
    text-transform: uppercase;
    position: relative;
    color: #fff;
    letter-spacing: 8px;
    animation: glitch-skew 1s infinite;
    display: inline-block;
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
    text-shadow: -2px 0 #ff00de;
    clip: rect(24px, 550px, 90px, 0);
    animation: glitch-anim-1 2s infinite linear alternate-reverse;
}

.glitch-text::after {
    left: -2px;
    text-shadow: -2px 0 #00fff9, 2px 2px #ff00de;
    clip: rect(85px, 550px, 140px, 0);
    animation: glitch-anim-2 2.5s infinite linear alternate-reverse;
}

@keyframes glitch-anim-1 {
    0% {
        clip: rect(103px, 9999px, 94px, 0);
        transform: skew(0.8deg);
    }
    10% {
        clip: rect(8px, 9999px, 148px, 0);
        transform: skew(0.1deg);
    }
    20% {
        clip: rect(146px, 9999px, 85px, 0);
        transform: skew(0.5deg);
    }
    30% {
        clip: rect(26px, 9999px, 123px, 0);
        transform: skew(1deg);
    }
    40% {
        clip: rect(62px, 9999px, 38px, 0);
        transform: skew(0.3deg);
    }
    50% {
        clip: rect(127px, 9999px, 8px, 0);
        transform: skew(0.7deg);
    }
    60% {
        clip: rect(15px, 9999px, 135px, 0);
        transform: skew(0.2deg);
    }
    70% {
        clip: rect(91px, 9999px, 53px, 0);
        transform: skew(0.9deg);
    }
    80% {
        clip: rect(44px, 9999px, 118px, 0);
        transform: skew(0.4deg);
    }
    90% {
        clip: rect(72px, 9999px, 21px, 0);
        transform: skew(0.6deg);
    }
    100% {
        clip: rect(109px, 9999px, 67px, 0);
        transform: skew(0.8deg);
    }
}

@keyframes glitch-anim-2 {
    0% {
        clip: rect(65px, 9999px, 119px, 0);
        transform: skew(0.5deg);
    }
    10% {
        clip: rect(132px, 9999px, 31px, 0);
        transform: skew(0.9deg);
    }
    20% {
        clip: rect(17px, 9999px, 98px, 0);
        transform: skew(0.2deg);
    }
    30% {
        clip: rect(88px, 9999px, 142px, 0);
        transform: skew(0.7deg);
    }
    40% {
        clip: rect(49px, 9999px, 73px, 0);
        transform: skew(0.3deg);
    }
    50% {
        clip: rect(114px, 9999px, 5px, 0);
        transform: skew(1deg);
    }
    60% {
        clip: rect(36px, 9999px, 126px, 0);
        transform: skew(0.4deg);
    }
    70% {
        clip: rect(81px, 9999px, 55px, 0);
        transform: skew(0.8deg);
    }
    80% {
        clip: rect(23px, 9999px, 107px, 0);
        transform: skew(0.1deg);
    }
    90% {
        clip: rect(96px, 9999px, 42px, 0);
        transform: skew(0.6deg);
    }
    100% {
        clip: rect(58px, 9999px, 133px, 0);
        transform: skew(0.5deg);
    }
}

@keyframes glitch-skew {
    0% {
        transform: skew(0deg);
    }
    10% {
        transform: skew(-2deg);
    }
    20% {
        transform: skew(1deg);
    }
    30% {
        transform: skew(-1deg);
    }
    40% {
        transform: skew(2deg);
    }
    50% {
        transform: skew(-1deg);
    }
    60% {
        transform: skew(1deg);
    }
    70% {
        transform: skew(-2deg);
    }
    80% {
        transform: skew(1deg);
    }
    90% {
        transform: skew(-1deg);
    }
    100% {
        transform: skew(0deg);
    }
}

/* Alternative Glitch Effect - Style 2 */
.glitch-text-2 {
    font-size: 80px;
    font-weight: bold;
    color: #fff;
    position: relative;
    text-transform: uppercase;
    animation: glitch-2 5s infinite;
}

.glitch-text-2::before {
    content: attr(data-text);
    position: absolute;
    left: -2px;
    text-shadow: -5px 0 #ff00de;
    animation: glitch-loop-1 0.3s infinite;
}

.glitch-text-2::after {
    content: attr(data-text);
    position: absolute;
    left: 2px;
    text-shadow: 5px 0 #00fff9;
    animation: glitch-loop-2 0.3s infinite;
}

@keyframes glitch-2 {
    0%, 100% {
        text-shadow: 0 0 0 transparent;
    }
    1% {
        text-shadow: 2px 2px 0 #ff00de, -2px -2px 0 #00fff9;
    }
    2%, 98% {
        text-shadow: 0 0 0 transparent;
    }
    99% {
        text-shadow: -2px 2px 0 #ff00de, 2px -2px 0 #00fff9;
    }
}

@keyframes glitch-loop-1 {
    0% {
        clip: rect(36px, 9999px, 9px, 0);
    }
    25% {
        clip: rect(25px, 9999px, 99px, 0);
    }
    50% {
        clip: rect(50px, 9999px, 102px, 0);
    }
    75% {
        clip: rect(30px, 9999px, 92px, 0);
    }
    100% {
        clip: rect(91px, 9999px, 46px, 0);
    }
}

@keyframes glitch-loop-2 {
    0% {
        top: -1px;
        left: 1px;
        clip: rect(65px, 9999px, 119px, 0);
    }
    25% {
        top: -6px;
        left: 4px;
        clip: rect(79px, 9999px, 19px, 0);
    }
    50% {
        top: -3px;
        left: 2px;
        clip: rect(68px, 9999px, 11px, 0);
    }
    75% {
        top: 0px;
        left: -4px;
        clip: rect(95px, 9999px, 53px, 0);
    }
    100% {
        top: -1px;
        left: -1px;
        clip: rect(31px, 9999px, 149px, 0);
    }
}

/* Neon Glow Glitch Effect - Style 3 */
.glitch-text-neon {
    font-size: 80px;
    font-weight: bold;
    color: #fff;
    text-transform: uppercase;
    animation: neon-flicker 1.5s infinite alternate;
}

@keyframes neon-flicker {
    0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
        text-shadow: 
            0 0 10px #00ff00,
            0 0 20px #00ff00,
            0 0 30px #00ff00,
            0 0 40px #00ff00,
            0 0 70px #00ff00,
            0 0 80px #00ff00;
    }
    20%, 24%, 55% {
        text-shadow: none;
    }
}

/* RGB Split Effect - Style 4 */
.glitch-text-rgb {
    font-size: 80px;
    font-weight: bold;
    color: #fff;
    text-transform: uppercase;
    position: relative;
}

.glitch-text-rgb::before,
.glitch-text-rgb::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
}

.glitch-text-rgb::before {
    animation: rgb-glitch-1 0.2s infinite;
    color: #ff00de;
    z-index: -1;
}

.glitch-text-rgb::after {
    animation: rgb-glitch-2 0.2s infinite;
    color: #00fff9;
    z-index: -2;
}

@keyframes rgb-glitch-1 {
    0% {
        transform: translate(0);
    }
    20% {
        transform: translate(-2px, 2px);
    }
    40% {
        transform: translate(-2px, -2px);
    }
    60% {
        transform: translate(2px, 2px);
    }
    80% {
        transform: translate(2px, -2px);
    }
    100% {
        transform: translate(0);
    }
}

@keyframes rgb-glitch-2 {
    0% {
        transform: translate(0);
    }
    20% {
        transform: translate(2px, -2px);
    }
    40% {
        transform: translate(2px, 2px);
    }
    60% {
        transform: translate(-2px, -2px);
    }
    80% {
        transform: translate(-2px, 2px);
    }
    100% {
        transform: translate(0);
    }
}

/* Responsive */
@media (max-width: 768px) {
    .glitch-text,
    .glitch-text-2,
    .glitch-text-neon,
    .glitch-text-rgb {
        font-size: 50px;
        letter-spacing: 4px;
    }
}

@media (max-width: 480px) {
    .glitch-text,
    .glitch-text-2,
    .glitch-text-neon,
    .glitch-text-rgb {
        font-size: 35px;
        letter-spacing: 2px;
    }
}
      `}</style>
    </div>
  );
};

export default Hero;