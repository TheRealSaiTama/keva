'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [showButton, setShowButton] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowSize({ width, height });
      
      // Check if it's a mobile device (width less than 768px for tablets and below)
      setIsMobile(width < 768);
    };

    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // If it's mobile, skip splash screen immediately
    if (isMobile) {
      onComplete();
      return;
    }

    // For desktop/laptop, show button after delay
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isMobile, onComplete]);

  // Don't render splash screen on mobile devices
  if (isMobile) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      exit={{ 
        scale: 1.1,
        opacity: 0,
        filter: "blur(10px)"
      }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Full screen image - desktop optimized */}
      <div className="absolute inset-0">
        <Image
          src="/SPLASHSCREEN.png"
          alt="KEVA"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      {/* Animated particles - optimized for desktop */}
      <div className="absolute inset-0">
        {Array.from({ length: 25 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * (windowSize.width || 0),
              y: (windowSize.height || 0) + 50,
              opacity: 0,
            }}
            animate={{
              y: -50,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Content - desktop centered */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="mt-[60vh]"> {/* This pushes content to center of bottom half */}
          {/* Beautiful Next Button - smaller and perfectly centered */}
          <AnimatePresence>
            {showButton && (
              <motion.div
                initial={{ y: 80, opacity: 0, scale: 0.7 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -50, opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="relative flex flex-col items-center"
              >
                <motion.button
                  onClick={onComplete}
                  data-hoverable
                  className="group relative overflow-hidden"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Button background with glassmorphism */}
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-white/25 to-white/5 backdrop-blur-xl border border-white/40 flex items-center justify-center shadow-2xl">
                    {/* Animated background on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-white/15"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Beautiful transparent arrow */}
                    <motion.div
                      className="relative z-10 text-white/90"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </motion.div>
                  </div>

                  {/* Pulsing ring effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-white/60"
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Secondary ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-white/40"
                    animate={{
                      scale: [1, 1.7, 1],
                      opacity: [0.4, 0, 0.4],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  />

                  {/* Outer glow on hover */}
                  <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </motion.button>

                {/* Elegant button label */}
                <motion.p
                  className="text-white/80 text-base font-light tracking-[0.2em] mt-4 text-center uppercase"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  Enter
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Subtle animated border frame */}
      <motion.div
        className="absolute inset-4 border border-white/10 rounded-lg"
        animate={{
          borderColor: ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.25)", "rgba(255,255,255,0.1)"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}