'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MobileMenu } from '@/components/MobileMenu';
import { SearchBar } from '@/components/SearchBar';
import { useCartStore } from '@/lib/store/cartStore';

export default function RefundPolicyPage() {
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  const sections = [
    {
      title: '1. 반품 정책 / Return Policy',
      content: [
        '상품을 받은 후 14일 이내에 반품을 신청할 수 있습니다. 이 기간은 상품 수령 날짜부터 계산됩니다.',
        'You may request a return within 14 days of receiving your order. This period is calculated from the date you receive your item.',
        '',
        '반품 가능한 상품: 미사용 상태, 원본 태그 부착, 원본 패키징',
        'Returnable items must be: unused, with original tags attached, and in original packaging.',
        '',
        '반품 불가 상품: 개봉되었거나 사용된 상품, 태그가 제거된 상품, 손상된 상품 (사용자 부주의로 인한).',
        'Non-returnable items: opened or used items, items with removed tags, and items damaged due to mishandling.',
      ],
    },
    {
      title: '2. 환불 프로세스 / Refund Process',
      content: [
        '1단계: 고객 서비스에 이메일로 주문번호와 반품 이유를 알려주세요.',
        'Step 1: Contact customer service via email with your order number and reason for return.',
        '',
        '2단계: 회사는 반품 지침과 배송 라벨을 제공합니다. 사용자는 배송료를 부담하지 않습니다.',
        'Step 2: We will provide return instructions and a prepaid shipping label. You will not pay for return shipping.',
        '',
        '3단계: 상품을 보내주세요. 회사는 수령 후 검사하고 확인을 이메일로 발송합니다.',
        'Step 3: Ship the item to us. We will inspect and confirm receipt via email.',
        '',
        '4단계: 검사 완료 후 5-7 영업일 내에 환불을 처리합니다.',
        'Step 4: We process refunds within 5-7 business days after inspection is complete.',
      ],
    },
    {
      title: '3. 환불 금액 / Refund Amount',
      content: [
        '승인된 반품의 경우 상품 구매 가격 전액을 환불합니다.',
        'For approved returns, we refund the full purchase price of the item.',
        '',
        '배송료는 환불되지 않습니다 (원배송료).',
        'Original shipping costs are non-refundable.',
        '',
        '반품 배송료는 회사가 부담합니다.',
        'We cover the cost of return shipping.',
        '',
        '환불은 원래의 결제 방법으로 처리됩니다. 신용카드 환불의 경우 2-3주가 소요될 수 있습니다.',
        'Refunds are processed to your original payment method. Credit card refunds may take 2-3 weeks to appear.',
      ],
    },
    {
      title: '4. 교환 정책 / Exchange Policy',
      content: [
        '다른 크기나 색상의 상품으로 교환할 수 있습니다. 반품 조건과 동일합니다.',
        'You may exchange items for different sizes or colors under the same return conditions.',
        '',
        '교환하고자 하는 상품이 재고에 있어야 합니다.',
        'The item you wish to exchange must be in stock.',
        '',
        '원본 상품을 먼저 받아야만 새 상품을 발송합니다.',
        'We ship the replacement item after receiving and inspecting the original product.',
      ],
    },
    {
      title: '5. 손상된 또는 잘못된 상품 / Damaged or Wrong Items',
      content: [
        '상품을 받았을 때 손상되었거나 잘못된 상품이 배송된 경우, 즉시 (24시간 이내) 고객 서비스에 연락하세요.',
        'If you receive a damaged or incorrect item, contact customer service within 24 hours with photos of the damage.',
        '',
        '상품 사진을 첨부하여 이메일로 보내주세요. 회사는 즉시 교체 또는 전액 환불을 처리합니다.',
        'Please send photos of the damaged item. We will immediately arrange a replacement or full refund.',
        '',
        '손상된 상품은 반품할 필요가 없을 수 있습니다.',
        'You may not need to return the damaged item.',
      ],
    },
    {
      title: '6. 환불 문제 해결 / Refund Disputes',
      content: [
        '환불에 대한 문제가 발생하면, 고객 서비스팀에 이메일로 연락하세요.',
        'If you have issues with a refund, please contact our customer service team via email.',
        '',
        '회사는 7일 이내에 응답하고 해결 방법을 제시합니다.',
        'We will respond within 7 days and provide a resolution.',
        '',
        '문제 해결을 위해 추가 정보나 상품 사진이 필요할 수 있습니다.',
        'We may request additional information or photos to resolve the issue.',
      ],
    },
    {
      title: '7. 특수 상황 / Special Circumstances',
      content: [
        '선물 상품: 원본 영수증이 없어도 반품할 수 있지만 예외가 적용될 수 있습니다.',
        'Gift items: Can be returned even without the original receipt, though exceptions may apply.',
        '',
        '세일 상품: 반품 가능하지만 할인된 가격으로 환불됩니다.',
        'Sale items: Returnable but refunded at the discounted price paid.',
        '',
        '정책 변경: 회사는 언제든지 반품 정책을 변경할 수 있으며, 변경 전 구매 상품은 구 정책이 적용됩니다.',
        'Policy changes: Little Nazareth may modify this policy, and prior purchases are subject to the policy at the time of purchase.',
      ],
    },
  ];

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
          <h1 className="text-4xl font-light tracking-wider text-gray-900 mb-2">
            Refund Policy
          </h1>
          <p className="text-sm text-gray-500 font-light mb-12">
            반품 및 환불 정책 / 마지막 업데이트: 2024년
          </p>

          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="prose prose-sm max-w-none">
                <h2 className="text-2xl font-light tracking-wide text-gray-900 mb-4 mt-0">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.content.map((paragraph, pIndex) => (
                    paragraph === '' ? (
                      <div key={pIndex} className="h-2" />
                    ) : (
                      <p key={pIndex} className="text-base text-gray-600 font-light leading-relaxed mb-3">
                        {paragraph}
                      </p>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-12 border-t border-gray-200">
            <h3 className="text-xl font-light text-gray-900 mb-4">
              Need Help with a Return?
            </h3>
            <p className="text-sm text-gray-600 font-light mb-6">
              Our customer service team is here to help you with any return or refund questions. Please reach out anytime!
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
