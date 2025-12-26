'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/store/cartStore';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden relative w-10 h-10 flex items-center justify-center"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span
            className={`w-full h-0.5 bg-gray-800 transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`w-full h-0.5 bg-gray-800 transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-full h-0.5 bg-gray-800 transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </div>
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeMenu}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-2xl md:hidden"
          >
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button
                onClick={closeMenu}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            <nav className="px-6 py-4">
              <ul className="space-y-6">
                <li>
                  <Link
                    href="/"
                    onClick={closeMenu}
                    className="block text-base font-light tracking-wide text-gray-800 hover:text-gray-600 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/story"
                    onClick={closeMenu}
                    className="block text-base font-light tracking-wide text-gray-800 hover:text-gray-600 transition-colors"
                  >
                    Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="/test"
                    onClick={closeMenu}
                    className="block text-base font-light tracking-wide text-gray-800 hover:text-gray-600 transition-colors"
                  >
                    Find Your Mate
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    onClick={closeMenu}
                    className="block text-base font-light tracking-wide text-gray-800 hover:text-gray-600 transition-colors"
                  >
                    Shop
                  </Link>
                </li>
                <li className="pt-4 border-t border-gray-200">
                  <Link
                    href="/wishlist"
                    onClick={closeMenu}
                    className="block text-base font-light tracking-wide text-gray-800 hover:text-gray-600 transition-colors"
                  >
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cart"
                    onClick={closeMenu}
                    className="block text-base font-light tracking-wide text-gray-800 hover:text-gray-600 transition-colors"
                  >
                    Cart ({getTotalItems()})
                  </Link>
                </li>
                <li>
                  <Link
                    href="/orders"
                    onClick={closeMenu}
                    className="block text-base font-light tracking-wide text-gray-800 hover:text-gray-600 transition-colors"
                  >
                    My Orders
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 font-light text-center">
                © 2024 Little Nazareth
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
