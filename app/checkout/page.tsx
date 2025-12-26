'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cartStore';
import { useOrderStore } from '@/lib/store/orderStore';
import { useInventoryStore } from '@/lib/store/inventoryStore';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Script from 'next/script';
import { IamportPaymentData, IamportResponse } from '@/lib/iamport';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const addOrder = useOrderStore((state) => state.addOrder);
  const { decreaseStock, isInStock } = useInventoryStore();
  const [iamportLoaded, setIamportLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // 배송 정보
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    postcode: '',
    address: '',
    addressDetail: '',
    message: '',
  });

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = () => {
    if (!iamportLoaded) {
      alert('결제 시스템을 로딩 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.address) {
      alert('배송 정보를 모두 입력해주세요.');
      return;
    }

    // Check stock availability for all items
    for (const item of items) {
      if (!isInStock(item.product.id, item.quantity)) {
        alert(`재고 부족: ${item.product.koreanName}의 재고가 부족합니다.`);
        return;
      }
    }

    if (!window.IMP) {
      alert('결제 시스템 초기화에 실패했습니다.');
      return;
    }

    setIsProcessing(true);

    // 주문번호 생성
    const merchantUid = `order_${new Date().getTime()}`;
    const orderName = items.length > 1
      ? `${items[0].product.koreanName} 외 ${items.length - 1}건`
      : items[0].product.koreanName;

    const paymentData: IamportPaymentData = {
      pg: 'html5_inicis', // 테스트: html5_inicis.INIpayTest
      pay_method: 'card',
      merchant_uid: merchantUid,
      name: orderName,
      amount: getTotalPrice(),
      buyer_email: shippingInfo.email,
      buyer_name: shippingInfo.name,
      buyer_tel: shippingInfo.phone,
      buyer_addr: `${shippingInfo.address} ${shippingInfo.addressDetail}`,
      buyer_postcode: shippingInfo.postcode,
      m_redirect_url: `${window.location.origin}/order/success`,
      custom_data: JSON.stringify({
        items: items.map((item) => ({
          productId: item.product.id,
          productName: item.product.koreanName,
          quantity: item.quantity,
          price: item.product.price,
        })),
        shippingMessage: shippingInfo.message,
      }),
    };

    window.IMP.request_pay(paymentData, (response: IamportResponse) => {
      setIsProcessing(false);

      if (response.success) {
        // 결제 성공
        // TODO: 백엔드로 결제 검증 요청 (imp_uid, merchant_uid)
        console.log('결제 성공:', response);

        // 재고 감소
        let stockDecreaseFailed = false;
        for (const item of items) {
          const success = decreaseStock(item.product.id, item.quantity);
          if (!success) {
            console.error(`재고 감소 실패: ${item.product.koreanName}`);
            stockDecreaseFailed = true;
          }
        }

        if (stockDecreaseFailed) {
          alert('일부 상품의 재고 처리에 실패했습니다. 고객센터에 문의해주세요.');
        }

        // 주문 정보 저장
        addOrder({
          id: response.merchant_uid!,
          imp_uid: response.imp_uid!,
          items: items,
          shippingInfo: shippingInfo,
          totalAmount: getTotalPrice(),
          status: 'paid',
          createdAt: Date.now(),
          paidAt: Date.now(),
        });

        // 장바구니 비우기
        clearCart();

        // 주문 완료 페이지로 이동
        router.push(`/order/success?imp_uid=${response.imp_uid}&merchant_uid=${response.merchant_uid}`);
      } else {
        // 결제 실패
        alert(`결제에 실패했습니다.\n${response.error_msg}`);
      }
    });
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      {/* 아임포트 스크립트 로드 */}
      <Script
        src="https://cdn.iamport.kr/v1/iamport.js"
        onLoad={() => {
          if (window.IMP) {
            // 테스트 가맹점 코드 (실제로는 회원가입 후 발급받은 코드 사용)
            window.IMP.init('imp00000000');
            setIamportLoaded(true);
          }
        }}
      />

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

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-light tracking-wider text-gray-900 mb-12">
              Checkout
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* 배송 정보 입력 */}
              <div className="lg:col-span-2 space-y-8">
                {/* Contact Information */}
                <div className="bg-white border border-gray-200 p-8">
                  <h2 className="text-xl font-light tracking-wide text-gray-900 mb-6">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 font-light mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={shippingInfo.name}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 px-4 py-3 text-gray-900 font-light focus:outline-none focus:border-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 font-light mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={shippingInfo.email}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 px-4 py-3 text-gray-900 font-light focus:outline-none focus:border-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 font-light mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                        placeholder="010-0000-0000"
                        className="w-full border border-gray-300 px-4 py-3 text-gray-900 font-light focus:outline-none focus:border-gray-900"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white border border-gray-200 p-8">
                  <h2 className="text-xl font-light tracking-wide text-gray-900 mb-6">
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 font-light mb-2">
                        Postcode
                      </label>
                      <input
                        type="text"
                        name="postcode"
                        value={shippingInfo.postcode}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 px-4 py-3 text-gray-900 font-light focus:outline-none focus:border-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 font-light mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 px-4 py-3 text-gray-900 font-light focus:outline-none focus:border-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 font-light mb-2">
                        Address Detail
                      </label>
                      <input
                        type="text"
                        name="addressDetail"
                        value={shippingInfo.addressDetail}
                        onChange={handleInputChange}
                        placeholder="Apartment, suite, etc."
                        className="w-full border border-gray-300 px-4 py-3 text-gray-900 font-light focus:outline-none focus:border-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 font-light mb-2">
                        Delivery Message
                      </label>
                      <textarea
                        name="message"
                        value={shippingInfo.message}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full border border-gray-300 px-4 py-3 text-gray-900 font-light focus:outline-none focus:border-gray-900 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 주문 요약 */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-gray-200 p-8 sticky top-24">
                  <h2 className="text-xl font-light tracking-wide text-gray-900 mb-6">
                    Order Summary
                  </h2>

                  {/* 상품 목록 */}
                  <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-4">
                        <div className="w-16 h-20 bg-[#F8F6F3] flex items-center justify-center flex-shrink-0">
                          <div className="text-3xl">
                            {item.product.characterId
                              ? getCharacterEmoji(item.product.characterId)
                              : '🎁'}
                          </div>
                        </div>
                        <div className="flex-grow">
                          <p className="text-sm text-gray-900 font-light">
                            {item.product.koreanName}
                          </p>
                          <p className="text-xs text-gray-500 font-light">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-sm text-gray-900 font-light mt-1">
                            ₩{(item.product.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 가격 정보 */}
                  <div className="space-y-3 mb-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-between text-gray-600 font-light">
                      <span>Subtotal</span>
                      <span>₩{getTotalPrice().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 font-light">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-light text-gray-900">
                      <span>Total</span>
                      <span>₩{getTotalPrice().toLocaleString()}</span>
                    </div>
                  </div>

                  {/* 결제 버튼 */}
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing || !iamportLoaded}
                    className={`w-full py-4 text-sm tracking-widest font-light transition-colors ${
                      isProcessing || !iamportLoaded
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {isProcessing ? 'PROCESSING...' : !iamportLoaded ? 'LOADING...' : 'PAY NOW'}
                  </button>

                  <div className="mt-4">
                    <Link
                      href="/cart"
                      className="block w-full text-center border border-gray-300 py-4 text-sm tracking-widest font-light text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      BACK TO CART
                    </Link>
                  </div>

                  {/* 안내 문구 */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-xs text-gray-500 font-light leading-relaxed">
                      💳 테스트 모드입니다. 실제 결제되지 않습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
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
