'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  // Refs for performance optimization
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastPositionRef = useRef<CursorPosition>({ x: 0, y: 0 });
  const targetPositionRef = useRef<CursorPosition>({ x: 0, y: 0 });
  const velocityRef = useRef<CursorPosition>({ x: 0, y: 0 });

  // Performance-optimized position interpolation
  const lerp = (start: number, end: number, factor: number): number => {
    return start + (end - start) * factor;
  };

  // High-performance animation loop using requestAnimationFrame
  const animate = useCallback(() => {
    const current = lastPositionRef.current;
    const target = targetPositionRef.current;
    const velocity = velocityRef.current;

    // Smooth interpolation with different speeds for different elements
    const mainCursorSpeed = 0.85; // Very responsive for main cursor
    const trailSpeed = 0.15; // Slower for trail effect
    const ringSpeed = 0.25; // Medium for outer ring

    // Calculate new positions with interpolation
    const newMainX = lerp(current.x, target.x, mainCursorSpeed);
    const newMainY = lerp(current.y, target.y, mainCursorSpeed);
    
    const newTrailX = lerp(current.x, target.x, trailSpeed);
    const newTrailY = lerp(current.y, target.y, trailSpeed);
    
    const newRingX = lerp(current.x, target.x, ringSpeed);
    const newRingY = lerp(current.y, target.y, ringSpeed);

    // Update velocity for momentum effects
    velocity.x = newMainX - current.x;
    velocity.y = newMainY - current.y;

    // Apply transforms directly to DOM elements for better performance
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${newMainX - 8}px, ${newMainY - 8}px, 0)`;
    }
    
    if (trailRef.current) {
      trailRef.current.style.transform = `translate3d(${newTrailX - 12}px, ${newTrailY - 12}px, 0)`;
    }
    
    if (outerRingRef.current) {
      const scale = isHovering ? 1.8 : 1;
      const opacity = isHovering ? 0.8 : 0.4;
      outerRingRef.current.style.transform = `translate3d(${newRingX - 16}px, ${newRingY - 16}px, 0) scale(${scale})`;
      outerRingRef.current.style.opacity = opacity.toString();
    }

    // Update last position
    lastPositionRef.current = { x: newMainX, y: newMainY };

    // Continue animation loop
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [isHovering]);

  // Optimized mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetPositionRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  // Hover state handlers
  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  // Cursor visibility handlers
  const handleMouseEnterWindow = useCallback(() => setIsVisible(true), []);
  const handleMouseLeaveWindow = useCallback(() => setIsVisible(false), []);

  useEffect(() => {
    // Check if device is mobile or touch-enabled
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isTouchDevice || isSmallScreen);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) return;

    // Initialize position
    const initializePosition = (e: MouseEvent) => {
      const initialPos = { x: e.clientX, y: e.clientY };
      setMousePosition(initialPos);
      lastPositionRef.current = initialPos;
      targetPositionRef.current = initialPos;
    };

    // Set up event listeners with passive option for better performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousemove', initializePosition, { once: true, passive: true });
    window.addEventListener('mouseenter', handleMouseEnterWindow, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeaveWindow, { passive: true });

    // Add hover listeners to interactive elements
    const addHoverListeners = () => {
      const hoverableElements = document.querySelectorAll('button, a, [data-hoverable], input, textarea, select');
      
      hoverableElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter, { passive: true });
        el.addEventListener('mouseleave', handleMouseLeave, { passive: true });
      });

      return hoverableElements;
    };

    const hoverableElements = addHoverListeners();

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animate);

    // Observer for dynamically added elements
    const observer = new MutationObserver(() => {
      // Re-add listeners to new elements
      const newElements = document.querySelectorAll('button, a, [data-hoverable], input, textarea, select');
      newElements.forEach(el => {
        if (!Array.from(hoverableElements).includes(el)) {
          el.addEventListener('mouseenter', handleMouseEnter, { passive: true });
          el.addEventListener('mouseleave', handleMouseLeave, { passive: true });
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      // Cleanup
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mouseenter', handleMouseEnterWindow);
      window.removeEventListener('mouseleave', handleMouseLeaveWindow);
      
      hoverableElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      observer.disconnect();
    };
  }, [isMobile, animate, handleMouseMove, handleMouseEnter, handleMouseLeave, handleMouseEnterWindow, handleMouseLeaveWindow]);

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor dot - highest priority, most responsive */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          perspective: '1000px',
        }}
      />
      
      {/* Outer ring - medium responsiveness */}
      <div
        ref={outerRingRef}
        className={`fixed top-0 left-0 w-8 h-8 border border-white/60 rounded-full pointer-events-none z-[9998] mix-blend-difference transition-opacity duration-300 ${
          isVisible ? 'opacity-40' : 'opacity-0'
        }`}
        style={{
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
          perspective: '1000px',
        }}
      />

      {/* Trailing effect - slowest, creates smooth follow effect */}
      <div
        ref={trailRef}
        className={`fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9997] mix-blend-difference blur-sm transition-all duration-300 ${
          isVisible ? 'opacity-20' : 'opacity-0'
        } ${
          isHovering 
            ? 'bg-white/40 scale-150' 
            : 'bg-white/20 scale-100'
        }`}
        style={{
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
          perspective: '1000px',
        }}
      />

      {/* Global cursor styles */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        body {
          cursor: none !important;
        }

        /* Optimize rendering for cursor elements */
        [data-cursor] {
          transform: translateZ(0);
          will-change: transform;
        }

        /* Prevent cursor flicker on page load */
        html {
          cursor: none !important;
        }

        /* Handle iframe cursor hiding */
        iframe {
          pointer-events: auto;
        }

        /* Ensure smooth scrolling doesn't interfere */
        html {
          scroll-behavior: smooth;
        }

        /* Optimize for high DPI displays */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          [data-cursor] {
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>
    </>
  );
}