'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ComingSoon() {
  return (
    <section className="h-screen w-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none opacity-20 object-cover"
      >
        <source src="/pacman.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 sm:mb-8 leading-tight"
        >
          COMING SOON..
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link href="/" passHref>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded-full shadow-lg transition-all duration-300 text-sm sm:text-base min-h-[48px] touch-manipulation"
              data-hoverable
            >
              Go back to Home
            </motion.a>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 