'use client';

import { useWishlistStore } from '@/lib/store/wishlistStore';
import { useCartStore } from '@/lib/store/cartStore';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MobileMenu } from '@/components/MobileMenu';
import { SearchBar } from '@/components/SearchBar';
import { useState } from 'react';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addItem);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const handleAddToCart = (item: typeof items[0]) => {
    addToCart(item, 1);
    setAddedItems((prev) => new Set(prev).add(item.id));
    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }, 2000);
  };

  const getCharacterEmoji = (characterId: string): string => {
    const emojiMap: Record<string, string> = {
      lamb: '🐑',
      lion: '🦁',
      squirrel: '🐿️',
      bear: '🐻',
      deer: '🦌',
    };
    return emojiMap[characterId] || '🎁';
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
          <div className="flex items-center justify-between gap-6">
            <Link href="/" className="group flex-shrink-0">
              <h1 className="text-xl md:text-2xl font-light tracking-wider text-gray-800 hover:text-gray-600 transition-colors">
                LITTLE NAZARETH
              </h1>
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:block flex-grow max-w-md">
              <SearchBar />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 flex-shrink-0">
              <Link href="/story" className="text-sm font-light tracking-wide text-gray-600 hover:text-gray-900 transition-colors">
                STORY
              </Link>
              <Link href="/products" className="text-sm font-light tracking-wide text-gray-600 hover:text-gray-900 transition-colors">
                SHOP
              </Link>
              <Link href="/cart" className="text-sm font-light tracking-wide text-gray-600 hover:text-gray-900 transition-colors">
                CART ({getTotalItems()})
              </Link>
              <Link href="/wishlist" className="text-sm font-light tracking-wide text-gray-900 border-b-2 border-gray-900">
                WISHLIST
              </Link>
            </nav>

            {/* Mobile Menu */}
            <MobileMenu />
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <SearchBar />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-light tracking-wider text-gray-900 mb-12">
            My Wishlist
          </h1>

          {/* Empty State */}
          {items.length === 0 && (
            <div className="bg-white border border-gray-200 p-16 text-center">
              <p className="text-base text-gray-400 font-light tracking-wide mb-6">
                Your wishlist is empty
              </p>
              <Link
                href="/products"
                className="inline-block px-8 py-3 bg-gray-900 text-white text-sm tracking-widest font-light hover:bg-gray-800 transition-colors"
              >
                START SHOPPING
              </Link>
            </div>
          )}

          {/* Wishlist Grid */}
          {items.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white border border-gray-200 group hover:border-gray-400 transition-colors"
                >
                  <Link href={`/products/${item.id}`} className="block">
                    <div className="aspect-[3/4] bg-[#F8F6F3] flex items-center justify-center relative">
                      <div className="text-7xl">
                        {item.characterId ? getCharacterEmoji(item.characterId) : '🎁'}
                      </div>
                    </div>
                  </Link>

                  <div className="p-6">
                    <Link href={`/products/${item.id}`}>
                      <h3 className="text-base font-light text-gray-900 mb-1 hover:text-gray-600 transition-colors">
                        {item.koreanName}
                      </h3>
                      <p className="text-sm text-gray-500 font-light mb-4">
                        {item.englishName}
                      </p>
                    </Link>

                    <div className="flex items-center justify-between mb-4">
                      <p className="text-base text-gray-900 font-light">
                        ₩{item.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className={`w-full py-3 text-sm tracking-widest font-light transition-colors ${
                          addedItems.has(item.id)
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-900 text-white hover:bg-gray-800'
                        }`}
                      >
                        {addedItems.has(item.id) ? '✓ ADDED TO CART' : 'ADD TO CART'}
                      </button>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-full py-3 text-sm tracking-widest font-light border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-24 py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-xs tracking-widest font-medium text-gray-900 mb-4 uppercase">
                About
              </h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                Little Nazareth brings warmth and comfort through our soft friends. Each character has their own story to share.
              </p>
            </div>

            <div>
              <h3 className="text-xs tracking-widest font-medium text-gray-900 mb-4 uppercase">
                Customer Care
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-gray-600 font-light hover:text-gray-900 transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 font-light hover:text-gray-900 transition-colors">
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 font-light hover:text-gray-900 transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs tracking-widest font-medium text-gray-900 mb-4 uppercase">
                Connect
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-gray-600 font-light hover:text-gray-900 transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 font-light hover:text-gray-900 transition-colors">
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500 font-light tracking-wide">
              © 2024 Little Nazareth. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
