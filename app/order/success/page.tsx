'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const [orderInfo, setOrderInfo] = useState({
    imp_uid: '',
    merchant_uid: '',
  });

  useEffect(() => {
    const imp_uid = searchParams.get('imp_uid');
    const merchant_uid = searchParams.get('merchant_uid');

    if (imp_uid && merchant_uid) {
      setOrderInfo({ imp_uid, merchant_uid });

      // TODO: 백엔드로 결제 검증 요청
      // fetch('/api/payment/verify', {
      //   method: 'POST',
      //   body: JSON.stringify({ imp_uid, merchant_uid })
      // })
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
          <Link href="/" className="group">
            <h1 className="text-xl md:text-2xl font-light tracking-wider text-gray-800 hover:text-gray-600 transition-colors">
              LITTLE NAZARETH
            </h1>
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
            className="inline-block"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </motion.div>

          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-light tracking-wide text-gray-900">
              Order Completed!
            </h1>
            <p className="text-lg text-gray-600 font-light">
              Thank you for your purchase
            </p>
          </div>

          {/* Order Info */}
          {orderInfo.merchant_uid && (
            <div className="bg-white border border-gray-200 p-8 text-left">
              <h2 className="text-sm tracking-widest font-medium text-gray-900 uppercase mb-4">
                Order Information
              </h2>
              <div className="space-y-3 text-sm font-light">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Number</span>
                  <span className="text-gray-900 font-mono">{orderInfo.merchant_uid}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment ID</span>
                  <span className="text-gray-900 font-mono">{orderInfo.imp_uid}</span>
                </div>
              </div>
            </div>
          )}

          {/* Info Message */}
          <div className="bg-blue-50 border border-blue-200 p-6 text-left">
            <h3 className="text-sm font-medium text-blue-900 mb-2">
              📧 Order Confirmation Email
            </h3>
            <p className="text-sm text-blue-700 font-light">
              We've sent an order confirmation email with your order details and tracking information.
            </p>
          </div>

          {/* What's Next */}
          <div className="bg-white border border-gray-200 p-8 text-left">
            <h2 className="text-sm tracking-widest font-medium text-gray-900 uppercase mb-4">
              What's Next?
            </h2>
            <ul className="space-y-3 text-sm text-gray-600 font-light">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>We're preparing your order</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-300 mt-0.5">○</span>
                <span>Your order will be shipped within 2-3 business days</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-300 mt-0.5">○</span>
                <span>You'll receive a tracking number via email</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/products"
              className="px-8 py-4 bg-gray-900 text-white text-sm tracking-widest font-light hover:bg-gray-800 transition-colors"
            >
              CONTINUE SHOPPING
            </Link>
            <Link
              href="/"
              className="px-8 py-4 border border-gray-300 text-gray-600 text-sm tracking-widest font-light hover:bg-gray-50 transition-colors"
            >
              GO TO HOME
            </Link>
          </div>

          {/* Contact Support */}
          <div className="pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 font-light">
              Questions about your order?{' '}
              <a href="#" className="text-gray-900 underline hover:text-gray-600 transition-colors">
                Contact Support
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
