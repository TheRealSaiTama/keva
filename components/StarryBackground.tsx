'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface StarryBackgroundProps {
  starCount?: number;
  twinkleStarCount?: number;
}

export default function StarryBackground({
  starCount = 150,
  twinkleStarCount = 50,
}: StarryBackgroundProps) {
  const stars = useMemo(() => {
    return Array.from({ length: starCount }).map((_, i) => ({
      id: `star-${i}`,
      size: Math.random() * 1.5 + 0.5,
      animationDelay: Math.random() * 4,
      duration: Math.random() * 2 + 3,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
  }, [starCount]);

  const twinkleStars = useMemo(() => {
    return Array.from({ length: twinkleStarCount }).map((_, i) => ({
      id: `twinkle-star-${i}`,
      size: Math.random() * 1 + 0.5,
      animationDelay: Math.random() * 5,
      duration: Math.random() * 2.5 + 2,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
  }, [twinkleStarCount]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: star.left,
            top: star.top,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.animationDelay,
            ease: "easeInOut",
          }}
        />
      ))}

      {twinkleStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: star.left,
            top: star.top,
            filter: 'blur(0.5px)',
          }}
          animate={{
            opacity: [0.1, 0.8, 0.1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.animationDelay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
} 