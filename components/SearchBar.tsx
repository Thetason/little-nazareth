'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { products } from '@/lib/productData';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter((product) => {
        const query = searchQuery.toLowerCase();
        return (
          product.koreanName.toLowerCase().includes(query) ||
          product.englishName.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        );
      });
      setSearchResults(filtered);
      setIsOpen(true);
    } else {
      setSearchResults([]);
      setIsOpen(false);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false);
      setSearchQuery('');
    }
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
    <div ref={searchRef} className="relative">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full md:w-64 px-4 py-2 text-sm font-light border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full px-4 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 shadow-lg z-50 max-h-96 overflow-y-auto"
          >
            <div className="p-2">
              {searchResults.slice(0, 5).map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  onClick={() => {
                    setIsOpen(false);
                    setSearchQuery('');
                  }}
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-12 h-16 bg-[#F8F6F3] flex items-center justify-center flex-shrink-0">
                    <div className="text-2xl">
                      {product.characterId
                        ? getCharacterEmoji(product.characterId)
                        : '🎁'}
                    </div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-sm text-gray-900 font-light truncate">
                      {product.koreanName}
                    </p>
                    <p className="text-xs text-gray-500 font-light truncate">
                      {product.englishName}
                    </p>
                  </div>
                  <p className="text-sm text-gray-900 font-light flex-shrink-0">
                    ₩{product.price.toLocaleString()}
                  </p>
                </Link>
              ))}
              {searchResults.length > 5 && (
                <Link
                  href={`/search?q=${encodeURIComponent(searchQuery)}`}
                  onClick={() => {
                    setIsOpen(false);
                    setSearchQuery('');
                  }}
                  className="block p-3 text-center text-sm text-gray-600 font-light hover:bg-gray-50 transition-colors"
                >
                  View all {searchResults.length} results →
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No Results */}
      <AnimatePresence>
        {isOpen && searchQuery.trim() && searchResults.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 shadow-lg z-50"
          >
            <div className="p-6 text-center">
              <p className="text-sm text-gray-500 font-light">
                No products found for "{searchQuery}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
