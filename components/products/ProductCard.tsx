'use client';

import { Product } from '@/lib/productData';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cartStore';
import { useWishlistStore } from '@/lib/store/wishlistStore';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="group cursor-pointer"
      >
      {/* Product Image */}
      <div className="relative aspect-[4/5] bg-[#F8F6F3] overflow-hidden mb-4">
        {product.featured && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-black text-white px-3 py-1 text-xs tracking-widest font-light">
              NEW
            </span>
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm hover:bg-white transition-colors rounded-full group/heart"
        >
          <svg
            className={`w-5 h-5 transition-colors ${
              inWishlist ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-gray-600 group-hover/heart:stroke-red-500'
            }`}
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            />
          </svg>
        </button>

        {/* Placeholder - 실제 이미지로 교체 예정 */}
        <div className="w-full h-full flex items-center justify-center text-7xl md:text-8xl group-hover:scale-105 transition-transform duration-700 ease-out">
          {product.characterId ? getCharacterEmoji(product.characterId) : '🎁'}
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 bg-white/95 flex items-center justify-center">
            <span className="text-xs tracking-widest text-gray-500 font-light">OUT OF STOCK</span>
          </div>
        )}

        {/* Quick Add Button (hover state) */}
        {product.inStock && (
          <motion.button
            initial={{ opacity: 0 }}
            onClick={handleAddToCart}
            className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm text-gray-900 py-4 text-xs tracking-widest font-light hover:bg-gray-900 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            {addedToCart ? '✓ ADDED' : 'ADD TO CART'}
          </motion.button>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        <h3 className="text-sm font-light tracking-wide text-gray-900 group-hover:text-gray-600 transition-colors">
          {product.koreanName}
        </h3>
        <p className="text-xs text-gray-500 font-light line-clamp-1">
          {product.description}
        </p>
        <p className="text-sm text-gray-900 font-light pt-1">
          ₩{product.price.toLocaleString()}
        </p>
      </div>
      </motion.div>
    </Link>
  );
}

function getCharacterEmoji(characterId: string): string {
  const emojiMap: Record<string, string> = {
    lamb: '🐑',
    lion: '🦁',
    squirrel: '🐿️',
    bear: '🐻',
    deer: '🦌',
  };
  return emojiMap[characterId] || '🎁';
}
