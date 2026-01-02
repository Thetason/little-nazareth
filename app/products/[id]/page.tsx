'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { products } from '@/lib/productData';
import { useCartStore } from '@/lib/store/cartStore';
import { useRecentlyViewedStore } from '@/lib/store/recentlyViewedStore';
import { useInventoryStore } from '@/lib/store/inventoryStore';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ProductCard } from '@/components/products/ProductCard';
import { ReviewList } from '@/components/reviews/ReviewList';
import { ReviewForm } from '@/components/reviews/ReviewForm';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { addItem: addRecentlyViewed, getItems: getRecentlyViewed } = useRecentlyViewedStore();
  const { initializeInventory, getStock, isInStock, isLowStock } = useInventoryStore();

  const product = products.find((p) => p.id === params.id);
  const recentlyViewed = getRecentlyViewed().filter((item) => item.id !== product?.id).slice(0, 4);

  useEffect(() => {
    // Initialize inventory on first load
    initializeInventory();
  }, [initializeInventory]);

  useEffect(() => {
    if (!product) {
      router.push('/products');
    } else {
      // Add to recently viewed
      addRecentlyViewed(product);
    }
  }, [product, router, addRecentlyViewed]);

  if (!product) return null;

  const currentStock = getStock(product.id);
  const productInStock = isInStock(product.id, quantity);
  const lowStock = isLowStock(product.id);

  const handleAddToCart = () => {
    if (!isInStock(product.id, quantity)) {
      alert(`재고가 부족합니다. 현재 재고: ${currentStock}개`);
      return;
    }

    addItem(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    const maxQuantity = Math.min(10, currentStock);

    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link href="/" className="group">
            <h1 className="text-xl md:text-2xl font-light tracking-wider text-gray-800 hover:text-gray-600 transition-colors">
              LITTLE NAZARETH
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            <Link href="/story" className="text-sm font-light tracking-wide text-gray-600 hover:text-gray-900 transition-colors">
              STORY
            </Link>
            <Link href="/test" className="text-sm font-light tracking-wide text-gray-600 hover:text-gray-900 transition-colors">
              FIND YOUR MATE
            </Link>
            <Link href="/products" className="text-sm font-light tracking-wide text-gray-600 hover:text-gray-900 transition-colors">
              SHOP
            </Link>
            <Link href="/cart" className="text-sm font-light tracking-wide text-gray-600 hover:text-gray-900 transition-colors">
              CART ({useCartStore((state) => state.getTotalItems())})
            </Link>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 font-light">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gray-900 transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.koreanName}</span>
        </div>
      </div>

      {/* Product Details */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="aspect-square bg-[#F8F6F3] flex items-center justify-center relative overflow-hidden"
          >
            {product.featured && (
              <div className="absolute top-6 left-6 z-10">
                <span className="bg-black text-white px-4 py-2 text-xs tracking-widest font-light">
                  NEW
                </span>
              </div>
            )}
            <img
              src={product.image}
              alt={product.koreanName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const emojiDiv = document.createElement('div');
                  emojiDiv.className = 'text-[200px] md:text-[250px]';
                  emojiDiv.textContent = product.characterId ? getCharacterEmoji(product.characterId) : '🎁';
                  parent.appendChild(emojiDiv);
                }
              }}
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-light tracking-wide text-gray-900">
                {product.koreanName}
              </h1>
              <p className="text-xl text-gray-900 font-light">
                ₩{product.price.toLocaleString()}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-base text-gray-600 font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Stock Status */}
            <div className="space-y-2">
              {currentStock > 0 ? (
                <>
                  <p className="text-sm text-green-600 font-light">
                    In Stock ({currentStock} available)
                  </p>
                  {lowStock && (
                    <p className="text-sm text-orange-600 font-light">
                      ⚠️ Only {currentStock} left in stock!
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm text-red-600 font-light">Out of Stock</p>
              )}
            </div>

            {/* Quantity Selector */}
            {currentStock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-light text-gray-600 tracking-wide">
                    QUANTITY
                  </span>
                  <div className="flex items-center border border-gray-300">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-6 py-2 border-x border-gray-300 text-gray-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gray-900 text-white py-4 text-sm tracking-widest font-light hover:bg-gray-800 transition-colors"
                >
                  {addedToCart ? '✓ ADDED TO CART' : 'ADD TO CART'}
                </button>

                {/* View Cart Link */}
                {addedToCart && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <Link
                      href="/cart"
                      className="text-sm text-gray-600 hover:text-gray-900 underline transition-colors"
                    >
                      View Cart & Checkout
                    </Link>
                  </motion.div>
                )}
              </div>
            )}

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6 space-y-3">
              <h3 className="text-xs tracking-widest font-medium text-gray-900 uppercase">
                Details
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 font-light">
                <li>• Category: {getCategoryName(product.category)}</li>
                <li>• Material: Soft plush (placeholder)</li>
                <li>• Care: Hand wash only (placeholder)</li>
                <li>• Made with love in Little Nazareth</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <div className="mt-24">
          <h2 className="text-2xl font-light tracking-wide text-gray-900 mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products
              .filter((p) => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="group"
                >
                  <div className="aspect-[4/5] bg-[#F8F6F3] flex items-center justify-center mb-3 group-hover:bg-gray-200 transition-colors">
                    <div className="text-6xl">
                      {relatedProduct.characterId
                        ? getCharacterEmoji(relatedProduct.characterId)
                        : '🎁'}
                    </div>
                  </div>
                  <h3 className="text-sm font-light text-gray-900 group-hover:text-gray-600 transition-colors">
                    {relatedProduct.koreanName}
                  </h3>
                  <p className="text-sm text-gray-600 font-light mt-1">
                    ₩{relatedProduct.price.toLocaleString()}
                  </p>
                </Link>
              ))}
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mt-24">
          <h2 className="text-2xl font-light tracking-wide text-gray-900 mb-8">
            Customer Reviews
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ReviewList productId={product.id} />
            </div>

            <div className="lg:col-span-1">
              <ReviewForm productId={product.id} onSuccess={() => {}} />
            </div>
          </div>
        </div>

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-light tracking-wide text-gray-900 mb-8">
              Recently Viewed
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recentlyViewed.map((item, index) => (
                <ProductCard key={item.id} product={item} index={index} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
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

function getCategoryName(category: string): string {
  const categoryNames: Record<string, string> = {
    plushie: 'Plushie',
    sticker: 'Sticker',
    book: 'Book',
    accessory: 'Accessory',
    homegoods: 'Home Goods',
  };
  return categoryNames[category] || category;
}
