'use client';

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function MadeInKevaBox() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: 2,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      className="fixed bottom-6 right-6 z-[9990] group"
    >
      {/* Main container with glassmorphism effect */}
      <motion.div
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 20px 40px rgba(139, 69, 255, 0.3)"
        }}
        whileTap={{ scale: 0.95 }}
        data-hoverable
        className="relative overflow-hidden bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 cursor-pointer transition-all duration-300 hover:border-purple-400/50"
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10"
          animate={{
            background: [
              'linear-gradient(45deg, rgba(139, 69, 255, 0.1) 0%, rgba(255, 69, 139, 0.1) 50%, rgba(139, 69, 255, 0.1) 100%)',
              'linear-gradient(45deg, rgba(255, 69, 139, 0.1) 0%, rgba(69, 139, 255, 0.1) 50%, rgba(255, 69, 139, 0.1) 100%)',
              'linear-gradient(45deg, rgba(69, 139, 255, 0.1) 0%, rgba(139, 69, 255, 0.1) 50%, rgba(69, 139, 255, 0.1) 100%)',
              'linear-gradient(45deg, rgba(139, 69, 255, 0.1) 0%, rgba(255, 69, 139, 0.1) 50%, rgba(139, 69, 255, 0.1) 100%)',
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex items-center gap-3">
          {/* Animated lightning icon */}
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300"
          >
            <Zap className="w-4 h-4" fill="currentColor" />
          </motion.div>

          {/* Text */}
          <span className="text-white/90 text-sm font-medium tracking-wide group-hover:text-white transition-colors duration-300">
            Made in KEVA
          </span>
        </div>

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1 }}
        />

        {/* Subtle border animation */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(45deg, transparent, rgba(139, 69, 255, 0.3), transparent)',
            padding: '1px',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'xor',
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Floating particles around the box */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/60 rounded-full"
            initial={{
              x: Math.random() * 80 - 40,
              y: Math.random() * 60 - 30,
              opacity: 0,
            }}
            animate={{
              y: [null, -20, null],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Pulsing ring effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-purple-400/30 opacity-0 group-hover:opacity-100"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}