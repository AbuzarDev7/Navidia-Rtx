import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CardShowcase = () => {
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const cardsRef = useRef([]);
  const finalCardRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // GSAP Animation (Desktop Only)
  useEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const leftPanel = leftPanelRef.current;
      const cards = cardsRef.current;
      const finalCard = finalCardRef.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 1,
        },
      });

      // Animate normal cards
      cards.forEach((card, index) => {
        tl.fromTo(
          card,
          {
            x: "120vw",
            y: index * 10,
            rotation: 5,
            opacity: 0,
          },
          {
            x: 0,
            y: index * 5,
            rotation: 0,
            opacity: 1,
            duration: 1,
          },
          index * 0.5
        );
      });

      // Animate final card (RTX 6090)
      if (finalCard) {
        tl.fromTo(
          finalCard,
          { x: "120vw", opacity: 0 },
          { x: 0, opacity: 1, duration: 1 },
          "-=0.5"
        );

        tl.to(finalCard, {
          scale: 1,
          width: "100vw",
          height: "100vh",
          x: "-50vw",
          y: 0,
          position: "absolute",
          top: 0,
          left: 0,
          margin: 0,
          zIndex: 100,
          borderRadius: 0,
          duration: 2,
          ease: "power4.inOut",
        });

        tl.to([leftPanel, ...cards], {
          opacity: 0,
          duration: 0.5,
        }, "<");
      }

    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const cardsData = [
    {
      name: "3080 Ti",
      img: "https://nvidianews.nvidia.com/_gallery/get_file/?file_id=60b5c5cded6ae549cd412207",
    },
    {
      name: "4010",
      img: "https://cdn.mos.cms.futurecdn.net/KYzGJSuUStbsaqqBVQrYfe.png",
    },
    {
      name: "4090",
      img: "https://i.pinimg.com/736x/cf/90/54/cf905474dfdef7dd5aa235a03fe80297.jpg",
    },
    {
      name: "5090",
      img: "https://i.pinimg.com/736x/de/5e/7b/de5e7b604735fa080b33e7b8f81f16d6.jpg",
    },
  ];

  return (
    <div
      ref={containerRef}
      className={`relative w-full bg-black text-white ${
        isMobile
          ? "flex flex-col py-20 px-6"
          : "flex h-screen overflow-hidden"
      }`}
    >
      {/* LEFT PANEL */}
      <div
        ref={leftPanelRef}
        className={
          isMobile
            ? "w-full text-center mb-16 flex flex-col items-center"
            : "w-1/2 h-full flex flex-col justify-center p-16 z-10 relative"
        }
      >
        <h2 className="text-[#76b900] text-xl font-bold tracking-widest mb-4 uppercase">
          Technology
        </h2>

        <h1
          className={`${
            isMobile ? "text-3xl" : "text-6xl"
          } font-black mb-6 leading-tight`}
        >
          GEFORCE RTX <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#dacfc0]">
            40 & 50 SERIES
          </span>
        </h1>

        <p
          className={`${
            isMobile ? "text-sm max-w-full" : "text-lg max-w-md"
          } text-gray-400 mb-8`}
        >
          Beyond fast. The NVIDIA® GeForce RTX™ 40 Series GPUs are beyond fast
          for gamers and creators.
        </p>

        <button className="w-fit px-8 py-3 bg-[#76b900] text-black font-bold uppercase tracking-wider hover:bg-white transition-colors duration-300">
          See All Products
        </button>
      </div>

      {/* RIGHT PANEL */}
      <div
        className={
          isMobile
            ? "w-full flex flex-col items-center gap-10"
            : "w-1/2 h-full relative z-10 flex items-center justify-center perspective-[2000px]"
        }
      >
        {/* Normal Cards */}
        {cardsData.map((card, index) => (
          <div
            key={index}
            ref={addToRefs}
            className={
              isMobile
                ? "relative w-[90%] max-w-[350px] h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                : "absolute w-[350px] h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            }
            style={!isMobile ? { zIndex: index + 1 } : {}}
          >
            <img
              src={card.img}
              alt={card.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="absolute inset-0 p-8 flex items-center justify-center text-center">
              <h3 className="text-4xl font-black text-white">
                RTX {card.name}
              </h3>
            </div>
          </div>
        ))}

        {/* RTX 6090 - Desktop Only */}
        {!isMobile && (
          <div
            ref={finalCardRef}
            className="absolute w-[350px] h-[500px] rounded-[30px] bg-black flex items-center justify-center overflow-hidden"
          >
            <h2 className="text-[#76b900] text-5xl font-black text-center">
              RTX 6090 <br />
              <span className="text-white text-lg tracking-widest">
                COMING SOON
              </span>
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardShowcase;