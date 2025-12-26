'use client';

import { useState } from 'react';
import { products, categories } from '@/lib/productData';
import { ProductCard } from '@/components/products/ProductCard';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cartStore';
import { MobileMenu } from '@/components/MobileMenu';
import { SearchBar } from '@/components/SearchBar';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name':
        return a.koreanName.localeCompare(b.koreanName);
      case 'featured':
      default:
        // Featured items first, then by newest (assuming id order)
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Header - Jellycat Style */}
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
              <Link href="/test" className="text-sm font-light tracking-wide text-gray-600 hover:text-gray-900 transition-colors">
                FIND YOUR MATE
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

      {/* Category Filter - Minimal Underline Style */}
      <section className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-wrap gap-8 justify-center md:justify-start py-6">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`text-sm font-light tracking-wider transition-all pb-1 ${
                selectedCategory === 'all'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              ALL
            </button>

            {Object.entries(categories).map(([key, cat]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`text-sm font-light tracking-wider transition-all pb-1 ${
                  selectedCategory === key
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {cat.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sort & Filter Bar */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 font-light">
            {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
          </p>

          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-600 font-light">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="text-sm font-light border border-gray-300 px-4 py-2 focus:outline-none focus:border-gray-900 transition-colors bg-white"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {sortedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-32">
            <p className="text-base text-gray-400 font-light tracking-wide">
              No products found
            </p>
          </div>
        )}
      </section>

      {/* Footer - Jellycat Minimal Style */}
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
