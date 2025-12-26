'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/lib/productData';
import { ProductCard } from '@/components/products/ProductCard';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cartStore';
import { MobileMenu } from '@/components/MobileMenu';
import { SearchBar } from '@/components/SearchBar';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  const [searchResults, setSearchResults] = useState<typeof products>([]);

  useEffect(() => {
    if (query.trim()) {
      const filtered = products.filter((product) => {
        const searchQuery = query.toLowerCase();
        return (
          product.koreanName.toLowerCase().includes(searchQuery) ||
          product.englishName.toLowerCase().includes(searchQuery) ||
          product.description.toLowerCase().includes(searchQuery) ||
          product.category.toLowerCase().includes(searchQuery)
        );
      });
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [query]);

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
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-light tracking-wider text-gray-900 mb-4">
              Search Results
            </h1>
            <p className="text-base text-gray-600 font-light">
              {query && (
                <>
                  Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for "{query}"
                </>
              )}
              {!query && 'Enter a search query to find products'}
            </p>
          </div>

          {/* Results Grid */}
          {searchResults.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {searchResults.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}

          {/* No Results */}
          {query && searchResults.length === 0 && (
            <div className="text-center py-32">
              <div className="mb-8">
                <p className="text-xl text-gray-400 font-light tracking-wide mb-4">
                  No products found
                </p>
                <p className="text-sm text-gray-500 font-light">
                  Try searching with different keywords
                </p>
              </div>
              <Link
                href="/products"
                className="inline-block px-8 py-3 bg-gray-900 text-white text-sm tracking-widest font-light hover:bg-gray-800 transition-colors"
              >
                VIEW ALL PRODUCTS
              </Link>
            </div>
          )}

          {/* Empty State */}
          {!query && (
            <div className="text-center py-32">
              <p className="text-xl text-gray-400 font-light tracking-wide mb-8">
                Start searching for your favorite products
              </p>
              <Link
                href="/products"
                className="inline-block px-8 py-3 bg-gray-900 text-white text-sm tracking-widest font-light hover:bg-gray-800 transition-colors"
              >
                VIEW ALL PRODUCTS
              </Link>
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

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDFBF7]" />}>
      <SearchContent />
    </Suspense>
  );
}
