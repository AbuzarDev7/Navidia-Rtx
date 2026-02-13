import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Curser from './components/Curser';
import Hero from './components/Hero';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    
    <>
      <Curser />
      <Navbar />
      <Hero />
    </>

  );
}

export default App;