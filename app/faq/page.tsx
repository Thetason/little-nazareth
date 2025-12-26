'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { MobileMenu } from '@/components/MobileMenu';
import { SearchBar } from '@/components/SearchBar';
import { useCartStore } from '@/lib/store/cartStore';

const faqs = [
  {
    category: 'Ordering',
    questions: [
      {
        q: 'How do I place an order?',
        a: 'Browse our products, add items to your cart, and proceed to checkout. You can pay securely using credit/debit cards through our payment partner.',
      },
      {
        q: 'Can I modify or cancel my order?',
        a: 'Please contact us immediately after placing your order. We can only modify or cancel orders that haven\'t been shipped yet.',
      },
      {
        q: 'Do you offer gift wrapping?',
        a: 'Yes! You can add gift wrapping during checkout. Please leave a note in the delivery message section.',
      },
    ],
  },
  {
    category: 'Shipping',
    questions: [
      {
        q: 'How long does shipping take?',
        a: 'Standard shipping takes 2-5 business days within Korea. You\'ll receive a tracking number once your order ships.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Currently, we only ship within South Korea. International shipping will be available soon.',
      },
      {
        q: 'How much does shipping cost?',
        a: 'Shipping is free for all orders. We want you to enjoy our soft friends without worrying about extra costs!',
      },
    ],
  },
  {
    category: 'Returns & Exchanges',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We accept returns within 14 days of delivery. Items must be unused, with original tags attached, and in original packaging.',
      },
      {
        q: 'How do I initiate a return?',
        a: 'Contact our customer service team with your order number and reason for return. We\'ll provide return instructions.',
      },
      {
        q: 'When will I receive my refund?',
        a: 'Refunds are processed within 5-7 business days after we receive and inspect the returned item.',
      },
    ],
  },
  {
    category: 'Products',
    questions: [
      {
        q: 'Are your products safe for children?',
        a: 'Yes! All our products meet Korean safety standards (KC certified). However, some items contain small parts and are recommended for ages 3+.',
      },
      {
        q: 'How do I care for my plushies?',
        a: 'Hand wash in cold water with mild detergent. Air dry only—do not use a dryer. Avoid direct sunlight to prevent fading.',
      },
      {
        q: 'Are products available in different sizes?',
        a: 'Each product page shows available sizes. Some characters are available in multiple sizes, while others come in a standard size.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  const toggleItem = (id: string) => {
    const newSet = new Set(openItems);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setOpenItems(newSet);
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

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-light tracking-wider text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-base text-gray-600 font-light mb-12">
            Find answers to common questions about our products and services.
          </p>

          <div className="space-y-12">
            {faqs.map((category, catIndex) => (
              <div key={catIndex}>
                <h2 className="text-2xl font-light tracking-wide text-gray-900 mb-6">
                  {category.category}
                </h2>

                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => {
                    const id = `${catIndex}-${faqIndex}`;
                    const isOpen = openItems.has(id);

                    return (
                      <div key={id} className="bg-white border border-gray-200">
                        <button
                          onClick={() => toggleItem(id)}
                          className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-base font-light text-gray-900 pr-8">
                            {faq.q}
                          </span>
                          <svg
                            className={`w-5 h-5 text-gray-600 flex-shrink-0 transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-8 pb-6 text-sm text-gray-600 font-light leading-relaxed">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-12 border-t border-gray-200 text-center">
            <h3 className="text-xl font-light text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-sm text-gray-600 font-light mb-6">
              Contact our customer service team for personalized assistance.
            </p>
            <a
              href="mailto:hello@littlenazareth.com"
              className="inline-block px-8 py-3 bg-gray-900 text-white text-sm tracking-widest font-light hover:bg-gray-800 transition-colors"
            >
              CONTACT US
            </a>
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
                Little Nazareth brings warmth and comfort through our soft friends.
              </p>
            </div>

            <div>
              <h3 className="text-xs tracking-widest font-medium text-gray-900 mb-4 uppercase">
                Legal
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/terms" className="text-sm text-gray-600 font-light hover:text-gray-900 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-gray-600 font-light hover:text-gray-900 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/refund" className="text-sm text-gray-600 font-light hover:text-gray-900 transition-colors">
                    Refund Policy
                  </Link>
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
