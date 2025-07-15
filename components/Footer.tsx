'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <motion.h3 
              className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4"
              whileHover={{ scale: 1.05 }}
            >
              KEVA
            </motion.h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Crafting digital excellence through innovative software solutions and cutting-edge technology.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Services</h4>
            <ul className="space-y-2 text-gray-400">
              {['Web Development', 'Mobile Apps', 'Cloud Solutions', 'UI/UX Design'].map((service) => (
                <li key={service}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5, color: '#ffffff' }}
                    whileTap={{ scale: 0.95 }}
                    className="hover:text-white transition-colors duration-200 text-sm sm:text-base py-1 block touch-manipulation"
                    data-hoverable
                  >
                    {service}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
            <ul className="space-y-2 text-gray-400">
              {[
                { name: 'About Us', href: '/#services' },
                { name: 'Our Team', href: '/coming-soon' },
                { name: 'Careers', href: '/coming-soon' },
                { name: 'Blog', href: '/coming-soon' },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} passHref>
                    <motion.a
                      whileHover={{ x: 5, color: '#ffffff' }}
                      whileTap={{ scale: 0.95 }}
                      className="hover:text-white transition-colors duration-200 text-sm sm:text-base py-1 block touch-manipulation"
                      data-hoverable
                    >
                      {item.name}
                    </motion.a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              <li className="break-words">hello@keva.agency</li>
              <li>+91 7065534964</li>
              <li>Ghitorni, Delhi, 110030</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
            © 2025 KEVA Agency. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}