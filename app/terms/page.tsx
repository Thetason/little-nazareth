'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MobileMenu } from '@/components/MobileMenu';
import { SearchBar } from '@/components/SearchBar';
import { useCartStore } from '@/lib/store/cartStore';

export default function TermsOfServicePage() {
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  const sections = [
    {
      title: '1. 서비스 약관 / Service Agreement',
      content: [
        '본 약관은 Little Nazareth(이하 "회사")와 고객(이하 "사용자") 간 전자상거래 거래에 관한 기본적인 사항을 규정합니다.',
        'These terms and conditions govern your use of Little Nazareth\'s website and services. By accessing and using our website, you accept and agree to be bound by these terms.',
        '',
        '사용자는 본 약관에 동의함으로써 회사와의 계약 관계에 동의하는 것으로 간주됩니다.',
        'Users must agree to these terms and conditions to place orders or access our services.',
      ],
    },
    {
      title: '2. 서비스 설명 / Service Description',
      content: [
        '회사는 캐릭터 인형 및 관련 상품의 온라인 판매 서비스를 제공합니다. 상품은 현물 견본, 카탈로그, 사진 등으로 표시되어 있습니다.',
        'Little Nazareth provides online sales of plushies, character goods, and related merchandise. All product descriptions, prices, and availability are accurate at the time of listing.',
        '',
        '제품의 색상, 질감 등은 실제 사진과 약간 다를 수 있습니다. 이는 조명 및 화면 해상도의 차이로 인합니다.',
        'Product colors and textures may appear slightly different due to lighting and screen resolution differences.',
      ],
    },
    {
      title: '3. 주문 및 결제 / Orders & Payment',
      content: [
        '사용자가 상품을 선택하고 결제 정보를 입력한 후 주문이 확정됩니다. 모든 결제는 보안 결제 게이트웨이를 통해 처리됩니다.',
        'Orders are confirmed once you provide payment information and complete checkout. All payments are processed securely through our payment partner.',
        '',
        '회사는 결제 후 사용자에게 주문 확인 이메일을 발송합니다. 사용자는 주문 번호로 주문 상태를 추적할 수 있습니다.',
        'You will receive an order confirmation email with your order number and tracking information.',
      ],
    },
    {
      title: '4. 지적 재산권 / Intellectual Property',
      content: [
        '웹사이트의 모든 콘텐츠, 디자인, 텍스트, 그래픽은 회사의 지적 재산 또는 라이선스입니다. 사용자는 개인용도로만 콘텐츠를 사용할 수 있습니다.',
        'All content on our website, including text, graphics, logos, and product images, is the intellectual property of Little Nazareth or our content providers.',
        '',
        '사용자는 회사의 사전 동의 없이 콘텐츠를 복제, 배포, 전송할 수 없습니다.',
        'You may not reproduce, distribute, or transmit any content without our prior written permission.',
      ],
    },
    {
      title: '5. 책임의 제한 / Limitation of Liability',
      content: [
        '회사는 웹사이트 또는 서비스로 인한 간접적, 부수적, 특수한 손해에 대해 책임지지 않습니다.',
        'Little Nazareth is not liable for indirect, incidental, or consequential damages arising from your use of our website or services.',
        '',
        '회사의 모든 책임은 해당 상품의 판매가로 제한됩니다.',
        'Our total liability is limited to the amount you paid for the product.',
      ],
    },
    {
      title: '6. 약관 변경 / Changes to Terms',
      content: [
        '회사는 언제든지 본 약관을 변경할 수 있습니다. 변경사항은 웹사이트에 게시될 때 효력이 발생합니다.',
        'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website.',
        '',
        '계속 사용함으로써 사용자는 변경된 약관에 동의하는 것으로 간주됩니다.',
        'Your continued use of our services constitutes acceptance of modified terms.',
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
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500 font-light mb-12">
            서비스 약관 / 마지막 업데이트: 2024년
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
              Questions about our Terms?
            </h3>
            <p className="text-sm text-gray-600 font-light mb-6">
              If you have any questions or concerns about these terms and conditions, please don't hesitate to contact us.
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
