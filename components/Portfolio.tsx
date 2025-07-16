'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

const projects = [
  {
    title: "RetailSync",
    category: "Web Application",
    description: "A modern e-commerce solution with advanced analytics and AI-powered recommendations.",
    image: "/images/Retailsync.png",
    tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"]
  },
  {
    title: "VoteSecure",
    category: "Mobile Application",
    description: "Secure financial management app with real-time transactions and budgeting tools.",
    image: "/images/votesecure.png",
    tech: ["React Native", "Node.js", "MongoDB", "Plaid API"]
  },
  {
    title: "30DC Python",
    category: "Web Application",
    description: "Comprehensive patient management system with real-time monitoring and analytics.",
    image: "/images/30dcpython.png",
    tech: ["React", "Python", "FastAPI", "PostgreSQL"]
  },
  {
    title: "Keva",
    category: "Cloud Platform",
    description: "Machine learning platform for automated business intelligence and predictions.",
    image: "/images/keva.png",
    tech: ["Next.js", "Python", "TensorFlow", "AWS"]
  }
];

function ImagePlane({ src, active }: { src: string, active: boolean }) {
  const texture = useLoader(TextureLoader, src);
  const { viewport } = useThree();

  // Calculate aspect ratios
  const imageAspect = texture.image.width / texture.image.height;
  const viewportAspect = viewport.width / viewport.height;

  // Calculate scale to fit inside the viewport (contain)
  let scale: [number, number, number];
  if (viewportAspect > imageAspect) {
    // Viewport is wider than the image, so fit to height
    scale = [viewport.height * imageAspect, viewport.height, 1];
  } else {
    // Viewport is taller than the image, so fit to width
    scale = [viewport.width, viewport.width / imageAspect, 1];
  }

  return (
    <mesh scale={scale}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

const ProjectTitle = ({ title, i, setActiveProject }: { title: string, i: number, setActiveProject: (i: number | null) => void }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const dx = useTransform(x, val => val - (ref.current?.offsetLeft ?? 0) - (ref.current?.clientWidth ?? 0) / 2);
  const dy = useTransform(y, val => val - (ref.current?.offsetTop ?? 0) - (ref.current?.clientHeight ?? 0) / 2);

  const springX = useSpring(dx, { stiffness: 200, damping: 20, mass: 0.5 });
  const springY = useSpring(dy, { stiffness: 200, damping: 20, mass: 0.5 });
  
  const distance = useMotionValue(150);

  useEffect(() => {
    const unsubscribeX = springX.onChange(val => {
      const yVal = springY.get();
      distance.set(Math.sqrt(val ** 2 + yVal ** 2));
    });
    const unsubscribeY = springY.onChange(val => {
      const xVal = springX.get();
      distance.set(Math.sqrt(xVal ** 2 + val ** 2));
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    }
  }, [springX, springY, distance]);

  const textX = useTransform(distance, [150, 0], [0, springX]);
  const textY = useTransform(distance, [150, 0], [0, springY]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setActiveProject(i)}
      onMouseLeave={() => setActiveProject(null)}
      style={{ x: textX, y: textY }}
      className="relative z-10 cursor-pointer"
    >
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl md:text-6xl lg:text-8xl font-bold text-gray-700 hover:text-white transition-colors duration-500"
      >
        {title}
      </motion.h2>
    </motion.div>
  );
};

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 500, height: 350 });

  // Update container dimensions when active project changes
  useEffect(() => {
    if (activeProject !== null) {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        const containerWidth = 500; // Fixed width
        const containerHeight = containerWidth / aspectRatio;
        setContainerDimensions({ width: containerWidth, height: containerHeight });
      };
      img.src = projects[activeProject].image;
    }
  }, [activeProject]);

  return (
    <motion.section
      id="portfolio"
      className="relative bg-black text-white py-24 sm:py-32 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-24"
        >
          <div className="inline-block bg-purple-600/10 border border-purple-500/20 rounded-full px-4 py-2 backdrop-blur-sm mb-6">
            <span className="text-sm font-medium text-purple-300">Portfolio</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Featured Work</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Hover over a title to reveal the project. A showcase of our innovative solutions.
          </p>
        </motion.div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col gap-4 md:gap-8">
            {projects.map((project, i) => (
              <ProjectTitle key={project.title} i={i} title={project.title} setActiveProject={setActiveProject} />
            ))}
          </div>

          <div 
            className="hidden lg:block w-full sticky top-24"
            style={{ 
              width: `${containerDimensions.width}px`, 
              height: `${containerDimensions.height}px`,
              maxWidth: '100%'
            }}
          >
            <div className="absolute inset-0 bg-gray-800/50 rounded-2xl border border-white/10 backdrop-blur-sm"></div>
            <AnimatePresence>
              {activeProject !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full"
                >
                  <Canvas className="rounded-2xl">
                    <Suspense fallback={null}>
                      <ImagePlane src={projects[activeProject].image} active={activeProject !== null} />
                    </Suspense>
                  </Canvas>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}