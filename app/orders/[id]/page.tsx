'use client';

import { useParams, useRouter } from 'next/navigation';
import { useOrderStore } from '@/lib/store/orderStore';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MobileMenu } from '@/components/MobileMenu';
import { useCartStore } from '@/lib/store/cartStore';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const getOrder = useOrderStore((state) => state.getOrder);
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  const order = getOrder(orderId);

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: 'Pending Payment',
      paid: 'Payment Confirmed',
      preparing: 'Preparing Shipment',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-blue-100 text-blue-800',
      preparing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-gray-900 mb-4">Order Not Found</h1>
          <p className="text-gray-600 font-light mb-8">
            The order you're looking for doesn't exist.
          </p>
          <Link
            href="/orders"
            className="inline-block px-8 py-3 bg-gray-900 text-white text-sm tracking-widest font-light hover:bg-gray-800 transition-colors"
          >
            VIEW ALL ORDERS
          </Link>
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
          {/* Back Button */}
          <Link
            href="/orders"
            className="inline-flex items-center text-sm font-light text-gray-600 hover:text-gray-900 transition-colors mb-8"
          >
            ← Back to Orders
          </Link>

          {/* Order Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-light tracking-wider text-gray-900 mb-4">
                Order #{order.id.split('_')[1]}
              </h1>
              <p className="text-sm text-gray-600 font-light">
                Placed on {formatDate(order.createdAt)}
              </p>
            </div>

            <span className={`inline-block px-6 py-2 text-sm font-light tracking-wide ${getStatusColor(order.status)}`}>
              {getStatusText(order.status)}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Items */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white border border-gray-200 p-8">
                <h2 className="text-xl font-light tracking-wide text-gray-900 mb-6">
                  Order Items
                </h2>

                <div className="space-y-6">
                  {order.items.map((item) => (
                    <div key={item.product.id} className="flex gap-6 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0">
                      <div className="w-24 h-32 bg-[#F8F6F3] flex items-center justify-center flex-shrink-0">
                        <div className="text-4xl">
                          {item.product.characterId
                            ? getCharacterEmoji(item.product.characterId)
                            : '🎁'}
                        </div>
                      </div>

                      <div className="flex-grow">
                        <h3 className="text-base font-light text-gray-900 mb-1">
                          {item.product.koreanName}
                        </h3>
                        <p className="text-sm text-gray-500 font-light mb-3">
                          {item.product.englishName}
                        </p>

                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 font-light">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-base text-gray-900 font-light">
                            ₩{(item.product.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Information */}
              <div className="bg-white border border-gray-200 p-8">
                <h2 className="text-xl font-light tracking-wide text-gray-900 mb-6">
                  Shipping Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 font-light uppercase tracking-wide mb-1">
                      Recipient
                    </p>
                    <p className="text-base text-gray-900 font-light">
                      {order.shippingInfo.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 font-light uppercase tracking-wide mb-1">
                      Phone
                    </p>
                    <p className="text-base text-gray-900 font-light">
                      {order.shippingInfo.phone}
                    </p>
                  </div>

                  {order.shippingInfo.email && (
                    <div>
                      <p className="text-xs text-gray-500 font-light uppercase tracking-wide mb-1">
                        Email
                      </p>
                      <p className="text-base text-gray-900 font-light">
                        {order.shippingInfo.email}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-gray-500 font-light uppercase tracking-wide mb-1">
                      Address
                    </p>
                    <p className="text-base text-gray-900 font-light">
                      {order.shippingInfo.postcode && `(${order.shippingInfo.postcode}) `}
                      {order.shippingInfo.address}
                      {order.shippingInfo.addressDetail && `, ${order.shippingInfo.addressDetail}`}
                    </p>
                  </div>

                  {order.shippingInfo.message && (
                    <div>
                      <p className="text-xs text-gray-500 font-light uppercase tracking-wide mb-1">
                        Delivery Message
                      </p>
                      <p className="text-base text-gray-900 font-light">
                        {order.shippingInfo.message}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 p-8 sticky top-24">
                <h2 className="text-xl font-light tracking-wide text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-600 font-light">
                    <span>Subtotal</span>
                    <span>₩{order.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 font-light">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                </div>

                <div className="flex justify-between text-xl font-light text-gray-900 mb-8">
                  <span>Total</span>
                  <span>₩{order.totalAmount.toLocaleString()}</span>
                </div>

                {/* Payment Information */}
                <div className="space-y-3 pt-6 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500 font-light uppercase tracking-wide mb-1">
                      Payment ID
                    </p>
                    <p className="text-sm text-gray-900 font-light break-all">
                      {order.imp_uid}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 font-light uppercase tracking-wide mb-1">
                      Order ID
                    </p>
                    <p className="text-sm text-gray-900 font-light">
                      {order.id}
                    </p>
                  </div>

                  {order.paidAt && (
                    <div>
                      <p className="text-xs text-gray-500 font-light uppercase tracking-wide mb-1">
                        Payment Date
                      </p>
                      <p className="text-sm text-gray-900 font-light">
                        {formatDate(order.paidAt)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-8 space-y-3">
                  <Link
                    href="/products"
                    className="block w-full text-center border border-gray-900 py-4 text-sm tracking-widest font-light text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
                  >
                    CONTINUE SHOPPING
                  </Link>

                  <button
                    onClick={() => window.print()}
                    className="block w-full text-center border border-gray-300 py-4 text-sm tracking-widest font-light text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    PRINT ORDER
                  </button>
                </div>
              </div>
            </div>
          </div>
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
