'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerBg, setHeaderBg] = useState('bg-transparent');

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const menuItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'portfolio' },
    { name: 'Services', id: 'services' },
    { name: 'Contact', id: 'contact' },
  ];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#portfolio" },
    { name: "Services", href: "/#services" },
    { name: "Contact", href: "/#contact" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-2 2xs:px-3 xs:px-4 sm:px-6 md:px-12 py-2 2xs:py-3 xs:py-4 md:py-6 bg-black/40 backdrop-blur-lg border-b border-white/5"
      >
        <motion.a
          href="#home"
          onClick={(e) => handleScroll(e, 'home')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="z-50 relative touch-manipulation"
        >
          <span className="text-base 2xs:text-lg xs:text-xl sm:text-2xl font-black tracking-wider bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent hover:from-purple-400 hover:via-pink-400 hover:to-purple-400 transition-all duration-300">
            KEVA
          </span>
        </motion.a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {menuItems.map((item) => (
            <motion.a
              key={item.name}
              href={`#${item.id}`}
              onClick={(e) => handleScroll(e, item.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-white/80 hover:text-white transition-colors duration-300 font-medium text-sm lg:text-base touch-manipulation"
              data-hoverable
            >
              {item.name}
            </motion.a>
          ))}
        </div>
        
        {/* Desktop CTA Button */}
        <motion.button
          onClick={(e: any) => handleScroll(e, 'contact')}
          whileHover={{ scale: 1.05, background: 'linear-gradient(to right, #a855f7, #ec4899)' }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block px-3 lg:px-6 py-1.5 lg:py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-full shadow-lg transition-all duration-300 text-xs lg:text-base touch-manipulation"
          data-hoverable
        >
          Book a call
        </motion.button>

        {/* Mobile Menu Button - SUPER RESPONSIVE */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
          className="md:hidden z-50 relative p-1.5 2xs:p-2 xs:p-2.5 text-white rounded-lg hover:bg-white/10 transition-all duration-200 touch-manipulation"
          data-hoverable
          style={{ minWidth: '44px', minHeight: '44px' }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-4 h-4 2xs:w-5 2xs:h-5 xs:w-6 xs:h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-4 h-4 2xs:w-5 2xs:h-5 xs:w-6 xs:h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.nav>

      {/* Mobile Menu Overlay - EXTREME MOBILE OPTIMIZATION */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-72 2xs:w-80 xs:w-80 max-w-[90vw] bg-black/95 backdrop-blur-xl border-l border-white/10 z-40 p-4 2xs:p-5 xs:p-6 pt-16 2xs:pt-18 xs:pt-20"
            >
              <div className="flex flex-col space-y-4 2xs:space-y-5 xs:space-y-6">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={`#${item.id}`}
                    onClick={(e) => handleScroll(e, item.id)}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="text-lg 2xs:text-xl font-medium text-white/80 hover:text-white transition-colors duration-300 py-3 2xs:py-3.5 xs:py-4 px-2 2xs:px-3 border-b border-white/10 rounded-lg hover:bg-white/5 touch-manipulation"
                    data-hoverable
                    style={{ minHeight: '52px' }}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <motion.button
                  onClick={(e: any) => {
                    handleScroll(e, 'contact');
                    setIsOpen(false);
                  }}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 2xs:mt-5 xs:mt-6 w-full px-4 2xs:px-5 xs:px-6 py-3 2xs:py-3.5 xs:py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-full shadow-lg transition-all duration-300 text-sm 2xs:text-base touch-manipulation"
                  data-hoverable
                  style={{ minHeight: '52px' }}
                >
                  Book a call
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
} 