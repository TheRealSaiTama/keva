'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from '@/components/SplashScreen';
import CustomCursor from '@/components/CustomCursor';
import MadeInKevaBox from '@/components/MadeInKevaBox';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Brands from '@/components/Brands';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      <CustomCursor />
      <MadeInKevaBox />
      <Header />
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        ) : (
          <main key="main">
            <div id="home">
              <Hero />
            </div>
            <Brands />
            <div id="services">
              <Services />
            </div>
            <div id="portfolio">
              <Portfolio />
            </div>
            <div id="contact">
              <Contact />
            </div>
            <Footer />
          </main>
        )}
      </AnimatePresence>
    </>
  );
}