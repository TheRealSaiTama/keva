'use client';

import { motion } from 'framer-motion';

const brands = ["She&Soul", "Securelance", "Shavezedit", "UchaanArts", "TechCorp", "DataFlow"];

export default function Brands() {
  return (
    <section className="bg-black pb-12 sm:pb-16 md:pb-20">
      <div className="container mx-auto text-center px-4 sm:px-6">
        {/* Video Player Section */}
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl mx-auto h-20 sm:h-24 md:h-28 lg:h-32 mb-6 sm:mb-8 md:mb-10 overflow-hidden rounded-lg">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src="/scenechange.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Trusted By Text */}
        <p className="text-gray-400 mb-6 sm:mb-8 md:mb-10 text-sm sm:text-base md:text-lg px-4">
          Trusted by over 10+ businesses
        </p>

        {/* Brands Scroller */}
        <div className="relative overflow-hidden h-12 sm:h-16 md:h-20 w-full max-w-full mx-auto">
          <motion.div
            className="flex items-center gap-8 sm:gap-12 md:gap-16 absolute whitespace-nowrap h-full"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }}
            style={{ width: "200%" }}
          >
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="flex items-center justify-center text-gray-400 font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl px-4 sm:px-6 md:px-8 flex-shrink-0"
              >
                {brand}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 