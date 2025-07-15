'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Simple starry background */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }, (_, i) => {
          const size = Math.random() * 2 + 0.5;
          return (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Simple gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-2 xs:px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl w-full"
        >
          {/* Badge */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-4 xs:mb-6 sm:mb-8"
          >
            <div className="inline-flex items-center gap-1 xs:gap-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 backdrop-blur-sm">
              <div className="w-1 h-1 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 bg-garadient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
              <span className="text-2xs xs:text-xs sm:text-sm font-medium text-purple-300">New</span>
              <span className="text-2xs xs:text-xs sm:text-sm text-white/80">Premium Solutions</span>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-3 xs:mb-4 sm:mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent block">
              Intelligent Software for
            </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent block">
              Modern Businesses.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 mb-4 xs:mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed font-light px-1 xs:px-2"
          >
            KEVA brings AI automation to your fingertips & streamline tasks.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col xs:flex-row gap-2 xs:gap-3 sm:gap-4 justify-center items-center max-w-sm xs:max-w-md sm:max-w-none mx-auto"
          >
            <motion.button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-hoverable
              className="group w-full xs:w-auto bg-purple-600 hover:bg-purple-700 px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 rounded-full font-semibold flex items-center justify-center gap-2 xs:gap-3 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 text-xs xs:text-sm sm:text-base min-h-[44px] touch-manipulation"
            >
              Get in touch
              <ArrowRight className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
            
            <motion.button
              onClick={() => {
                const element = document.getElementById('portfolio');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-hoverable
              className="w-full xs:w-auto px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 border border-white/30 rounded-full font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm text-xs xs:text-sm sm:text-base min-h-[44px] touch-manipulation"
            >
              View services
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}