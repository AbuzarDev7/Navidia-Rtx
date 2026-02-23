import React from 'react';
import Hero from '../components/Hero';
import CardShowcase from '../components/CardShowcase';
import AwardSection from '../components/AwardSection';
import MobileAwardSection from '../components/MobileAwardSection';
import FounderSection from '../components/FounderSection';
import VideoWebGLSection from '../components/VideoWebGLSection';
import WorldSection from '../components/WorldSection';

const Home = ({ onIntroComplete, introFinished }) => {
  return (
    <div className="relative z-10">
      <Hero onIntroComplete={onIntroComplete} introFinished={introFinished} />
      <CardShowcase />
      <div className="hidden md:block">
        <AwardSection />
      </div>
      <div className="block md:hidden">
        <MobileAwardSection />
      </div>
      <FounderSection />
      <VideoWebGLSection />
      <WorldSection />
    </div>
  );
};

export default Home;
