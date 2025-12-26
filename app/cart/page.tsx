'use client';

import { useCartStore } from '@/lib/store/cartStore';
import { useCouponStore } from '@/lib/store/couponStore';
import { useInventoryStore } from '@/lib/store/inventoryStore';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCartStore();
  const {
    appliedCoupon,
    initializeCoupons,
    validateCoupon,
    applyCoupon,
    removeCoupon,
    calculateDiscount,
    getCoupon
  } = useCouponStore();
  const { initializeInventory, getStock, isInStock } = useInventoryStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    initializeCoupons();
    initializeInventory();
  }, [initializeCoupons, initializeInventory]);

  const handleQuantityChange = (productId: string, change: number) => {
    const item = items.find((i) => i.product.id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + change);
    }
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponMessage({ type: 'error', text: '쿠폰 코드를 입력해주세요.' });
      return;
    }

    const subtotal = getTotalPrice();
    const validation = validateCoupon(couponCode, subtotal);

    if (validation.valid) {
      applyCoupon(couponCode);
      setCouponMessage({ type: 'success', text: validation.message });
      setCouponCode('');
    } else {
      setCouponMessage({ type: 'error', text: validation.message });
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponMessage(null);
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  const subtotal = getTotalPrice();
  const discount = appliedCoupon ? calculateDiscount(appliedCoupon, subtotal) : 0;
  const total = subtotal - discount;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDFBF7]">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
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
            </nav>
          </div>
        </header>

        {/* Empty Cart */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-8xl">🛒</div>
            <h1 className="text-3xl font-light tracking-wide text-gray-900">
              Your cart is empty
            </h1>
            <p className="text-gray-600 font-light">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              href="/products"
              className="inline-block mt-6 px-8 py-4 bg-gray-900 text-white text-sm tracking-widest font-light hover:bg-gray-800 transition-colors"
            >
              CONTINUE SHOPPING
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

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
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-light tracking-wider text-gray-900 mb-12">
            Shopping Cart ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white border border-gray-200 p-6 flex flex-col md:flex-row gap-6"
                >
                  {/* Product Image */}
                  <Link
                    href={`/products/${item.product.id}`}
                    className="flex-shrink-0 w-full md:w-32 h-40 bg-[#F8F6F3] flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <div className="text-6xl">
                      {item.product.characterId
                        ? getCharacterEmoji(item.product.characterId)
                        : '🎁'}
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex-grow space-y-4">
                    <div>
                      <Link
                        href={`/products/${item.product.id}`}
                        className="text-lg font-light text-gray-900 hover:text-gray-600 transition-colors"
                      >
                        {item.product.koreanName}
                      </Link>
                      <p className="text-sm text-gray-600 font-light mt-1">
                        {item.product.description}
                      </p>
                      {(() => {
                        const stock = getStock(item.product.id);
                        return stock < item.quantity ? (
                          <p className="text-xs text-red-600 font-light mt-1">
                            ⚠️ 재고 부족 (재고: {stock}개)
                          </p>
                        ) : stock <= 10 ? (
                          <p className="text-xs text-orange-600 font-light mt-1">
                            재고: {stock}개 남음
                          </p>
                        ) : (
                          <p className="text-xs text-green-600 font-light mt-1">
                            재고 있음
                          </p>
                        );
                      })()}
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center border border-gray-300">
                        <button
                          onClick={() => handleQuantityChange(item.product.id, -1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-x border-gray-300 text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.product.id, 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-lg font-light text-gray-900">
                          ₩{(item.product.price * item.quantity).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500 font-light">
                          ₩{item.product.price.toLocaleString()} each
                        </p>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-xs text-gray-500 hover:text-red-600 font-light underline transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white border border-gray-200 p-8 sticky top-24">
                <h2 className="text-xl font-light tracking-wide text-gray-900 mb-6">
                  Order Summary
                </h2>

                {/* Coupon Section */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <label className="block text-sm font-light text-gray-700 mb-2">
                    Coupon Code
                  </label>

                  {!appliedCoupon ? (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                          placeholder="Enter code"
                          className="flex-1 border border-gray-300 px-3 py-2 text-sm font-light focus:outline-none focus:border-gray-500 transition-colors"
                        />
                        <button
                          onClick={handleApplyCoupon}
                          className="px-6 py-2 bg-gray-900 text-white text-sm font-light tracking-wide hover:bg-gray-800 transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {couponMessage && (
                        <p className={`text-xs font-light ${
                          couponMessage.type === 'success' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {couponMessage.text}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="bg-green-50 border border-green-200 p-3 rounded">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-light text-gray-900">{appliedCoupon}</p>
                          <p className="text-xs font-light text-gray-600 mt-1">
                            {getCoupon(appliedCoupon)?.description}
                          </p>
                        </div>
                        <button
                          onClick={handleRemoveCoupon}
                          className="text-xs text-red-600 hover:text-red-800 font-light underline transition-colors ml-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Price Summary */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600 font-light">
                    <span>Subtotal</span>
                    <span>₩{subtotal.toLocaleString()}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-red-600 font-light">
                      <span>Discount</span>
                      <span>-₩{discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600 font-light">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>

                  <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-light text-gray-900">
                    <span>Total</span>
                    <span>₩{total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-gray-900 text-white py-4 text-sm tracking-widest font-light hover:bg-gray-800 transition-colors mb-4"
                >
                  PROCEED TO CHECKOUT
                </button>

                <Link
                  href="/products"
                  className="block w-full text-center border border-gray-300 py-4 text-sm tracking-widest font-light text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  CONTINUE SHOPPING
                </Link>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    Shipping and taxes calculated at checkout. Free shipping on orders over ₩50,000.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
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
