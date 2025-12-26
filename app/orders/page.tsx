'use client';

import { useOrderStore } from '@/lib/store/orderStore';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MobileMenu } from '@/components/MobileMenu';
import { useCartStore } from '@/lib/store/cartStore';

export default function OrdersPage() {
  const orders = useOrderStore((state) => state.getAllOrders());
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: 'Pending',
      paid: 'Paid',
      preparing: 'Preparing',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      pending: 'text-yellow-600',
      paid: 'text-blue-600',
      preparing: 'text-purple-600',
      shipped: 'text-indigo-600',
      delivered: 'text-green-600',
      cancelled: 'text-red-600',
    };
    return colorMap[status] || 'text-gray-600';
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <Link href="/story" className="text-sm font-light tracking-wide text-gray-600 hover:text-gray-900 transition-colors">
              STORY
            </Link>
            <Link href="/products" className="text-sm font-light tracking-wide text-gray-600 hover:text-gray-900 transition-colors">
              SHOP
            </Link>
            <Link href="/test" className="text-sm font-light tracking-wide text-gray-600 hover:text-gray-900 transition-colors">
              FIND YOUR MATE
            </Link>
            <Link href="/cart" className="text-sm font-light tracking-wide text-gray-600 hover:text-gray-900 transition-colors">
              CART ({getTotalItems()})
            </Link>
            <Link href="/orders" className="text-sm font-light tracking-wide text-gray-900 border-b-2 border-gray-900">
              MY ORDERS
            </Link>
          </nav>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-light tracking-wider text-gray-900 mb-12">
            My Orders
          </h1>

          {/* Empty State */}
          {orders.length === 0 && (
            <div className="bg-white border border-gray-200 p-16 text-center">
              <p className="text-base text-gray-400 font-light tracking-wide mb-6">
                You haven't placed any orders yet
              </p>
              <Link
                href="/products"
                className="inline-block px-8 py-3 bg-gray-900 text-white text-sm tracking-widest font-light hover:bg-gray-800 transition-colors"
              >
                START SHOPPING
              </Link>
            </div>
          )}

          {/* Orders List */}
          {orders.length > 0 && (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link href={`/orders/${order.id}`}>
                    <div className="bg-white border border-gray-200 p-8 hover:border-gray-400 transition-colors group">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        {/* 주문 정보 */}
                        <div className="flex-grow space-y-3">
                          <div className="flex flex-wrap items-center gap-4">
                            <h2 className="text-lg font-light text-gray-900">
                              Order #{order.id.split('_')[1]}
                            </h2>
                            <span className={`text-sm font-light ${getStatusColor(order.status)}`}>
                              {getStatusText(order.status)}
                            </span>
                          </div>

                          <p className="text-sm text-gray-600 font-light">
                            {formatDate(order.createdAt)}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {order.items.map((item, idx) => (
                              <span key={idx} className="text-sm text-gray-500 font-light">
                                {item.product.koreanName} × {item.quantity}
                                {idx < order.items.length - 1 && ','}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* 주문 금액 */}
                        <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-2">
                          <div className="text-right">
                            <p className="text-sm text-gray-500 font-light mb-1">Total</p>
                            <p className="text-xl font-light text-gray-900">
                              ₩{order.totalAmount.toLocaleString()}
                            </p>
                          </div>

                          <div className="md:hidden flex-grow" />

                          <span className="text-sm text-gray-400 font-light group-hover:text-gray-600 transition-colors">
                            View Details →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
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
