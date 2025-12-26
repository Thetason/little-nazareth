'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MobileMenu } from '@/components/MobileMenu';
import { SearchBar } from '@/components/SearchBar';
import { useCartStore } from '@/lib/store/cartStore';

export default function PrivacyPolicyPage() {
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  const sections = [
    {
      title: '1. 정보 수집 / Information We Collect',
      content: [
        '회사는 서비스 제공을 위해 다음과 같은 정보를 수집합니다: 이름, 이메일 주소, 배송 주소, 전화번호, 결제 정보.',
        'Little Nazareth collects information necessary to provide our services, including: name, email address, shipping address, phone number, and payment information.',
        '',
        '또한 웹사이트 사용 통계를 위해 브라우저 정보, IP 주소, 방문 페이지 등을 자동으로 수집할 수 있습니다.',
        'We may automatically collect browser information, IP addresses, pages visited, and other usage statistics to improve our website.',
      ],
    },
    {
      title: '2. 정보 사용 / How We Use Your Information',
      content: [
        '수집된 정보는 주문 처리, 배송, 고객 서비스 제공, 마케팅 커뮤니케이션 등의 목적으로 사용됩니다.',
        'We use your information to process orders, arrange shipping, provide customer service, and send promotional communications.',
        '',
        '사용자의 동의 없이 정보는 제3자와 공유되지 않습니다. 단, 배송 및 결제 처리를 위해 필요한 경우는 예외입니다.',
        'Your information will not be shared with third parties without your consent, except where necessary for shipping and payment processing.',
      ],
    },
    {
      title: '3. 쿠키 및 추적 / Cookies & Tracking',
      content: [
        '회사는 사용자 경험을 향상시키기 위해 쿠키를 사용합니다. 사용자는 브라우저 설정에서 쿠키를 거부할 수 있습니다.',
        'Little Nazareth uses cookies to improve user experience. You can disable cookies through your browser settings.',
        '',
        '쿠키는 방문 기록, 선호도, 로그인 상태 등을 저장합니다. 이러한 정보는 개인을 식별하지 않습니다.',
        'Cookies store information about your visits, preferences, and login status. This data does not personally identify you.',
      ],
    },
    {
      title: '4. 정보 보안 / Information Security',
      content: [
        '회사는 개인 정보 보호를 위해 산업 표준의 보안 조치를 취합니다. 결제 정보는 암호화되어 전송됩니다.',
        'Little Nazareth implements industry-standard security measures to protect your personal information. Payment data is encrypted during transmission.',
        '',
        '하지만 인터넷 전송의 완전한 안전을 보장할 수 없습니다. 사용자는 계정 정보를 안전하게 유지할 책임이 있습니다.',
        'We cannot guarantee complete security. You are responsible for maintaining the confidentiality of your account information.',
      ],
    },
    {
      title: '5. 데이터 보유 / Data Retention',
      content: [
        '개인 정보는 서비스 제공 기간 동안 보유됩니다. 사용자의 요청 시 정보 삭제를 진행할 수 있습니다.',
        'We retain personal information for as long as necessary to provide our services. You can request deletion of your data at any time.',
        '',
        '관련 법률에 따라 필요한 정보는 지정된 기간 동안 보유됩니다.',
        'We retain information as required by applicable laws and regulations.',
      ],
    },
    {
      title: '6. 개인 정보 권리 / Your Privacy Rights',
      content: [
        '사용자는 자신의 정보에 접근, 수정, 삭제할 권리가 있습니다. 계정 설정에서 관리하거나 고객 서비스에 문의하세요.',
        'You have the right to access, modify, and delete your personal information. You can manage these through your account or contact customer service.',
        '',
        '또한 정보 처리에 대한 거부 또는 제한을 요청할 수 있습니다.',
        'You can request restriction or objection to processing of your information.',
      ],
    },
    {
      title: '7. 정책 변경 / Changes to Privacy Policy',
      content: [
        '회사는 본 개인정보보호정책을 변경할 수 있습니다. 변경사항은 웹사이트에 게시될 때 효력이 발생합니다.',
        'Little Nazareth may modify this privacy policy at any time. Changes will be effective immediately upon posting to our website.',
        '',
        '계속 사용함으로써 사용자는 변경된 정책에 동의하는 것으로 간주됩니다.',
        'Your continued use of our services constitutes acceptance of the modified policy.',
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
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 font-light mb-12">
            개인정보보호정책 / 마지막 업데이트: 2024년
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
              Privacy Concerns?
            </h3>
            <p className="text-sm text-gray-600 font-light mb-6">
              If you have questions about our privacy practices or your personal information, please contact us directly.
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
