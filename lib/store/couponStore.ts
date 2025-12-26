import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed'; // 할인율 or 고정금액
  value: number; // percentage: 10 = 10%, fixed: 5000 = 5000원
  minPurchase: number; // 최소 구매 금액
  maxDiscount?: number; // 최대 할인 금액 (percentage 타입인 경우)
  validFrom: number;
  validUntil: number;
  usageLimit: number; // 총 사용 가능 횟수
  usedCount: number; // 현재 사용된 횟수
  description: string;
}

interface CouponState {
  coupons: Coupon[];
  appliedCoupon: string | null;
  initializeCoupons: () => void;
  getCoupon: (code: string) => Coupon | undefined;
  validateCoupon: (code: string, totalAmount: number) => { valid: boolean; message: string };
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
  calculateDiscount: (code: string, totalAmount: number) => number;
}

// 샘플 쿠폰들
const defaultCoupons: Coupon[] = [
  {
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minPurchase: 0,
    maxDiscount: 10000,
    validFrom: Date.now(),
    validUntil: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1년
    usageLimit: 1000,
    usedCount: 0,
    description: '신규 가입 환영 10% 할인',
  },
  {
    code: 'SAVE5000',
    type: 'fixed',
    value: 5000,
    minPurchase: 30000,
    validFrom: Date.now(),
    validUntil: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30일
    usageLimit: 500,
    usedCount: 0,
    description: '3만원 이상 구매 시 5천원 할인',
  },
  {
    code: 'SPECIAL20',
    type: 'percentage',
    value: 20,
    minPurchase: 50000,
    maxDiscount: 20000,
    validFrom: Date.now(),
    validUntil: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7일
    usageLimit: 100,
    usedCount: 0,
    description: '특별 20% 할인 (5만원 이상)',
  },
];

export const useCouponStore = create<CouponState>()(
  persist(
    (set, get) => ({
      coupons: [],
      appliedCoupon: null,

      initializeCoupons: () => {
        const state = get();
        if (state.coupons.length === 0) {
          set({ coupons: defaultCoupons });
        }
      },

      getCoupon: (code) => {
        return get().coupons.find(
          (coupon) => coupon.code.toUpperCase() === code.toUpperCase()
        );
      },

      validateCoupon: (code, totalAmount) => {
        const coupon = get().getCoupon(code);

        if (!coupon) {
          return { valid: false, message: '유효하지 않은 쿠폰 코드입니다.' };
        }

        const now = Date.now();

        if (now < coupon.validFrom) {
          return { valid: false, message: '아직 사용할 수 없는 쿠폰입니다.' };
        }

        if (now > coupon.validUntil) {
          return { valid: false, message: '만료된 쿠폰입니다.' };
        }

        if (coupon.usedCount >= coupon.usageLimit) {
          return { valid: false, message: '사용 가능 횟수를 초과했습니다.' };
        }

        if (totalAmount < coupon.minPurchase) {
          return {
            valid: false,
            message: `최소 구매 금액 ₩${coupon.minPurchase.toLocaleString()}이 필요합니다.`,
          };
        }

        return { valid: true, message: '쿠폰이 적용되었습니다!' };
      },

      applyCoupon: (code) => {
        set({ appliedCoupon: code.toUpperCase() });
      },

      removeCoupon: () => {
        set({ appliedCoupon: null });
      },

      calculateDiscount: (code, totalAmount) => {
        const coupon = get().getCoupon(code);
        if (!coupon) return 0;

        let discount = 0;

        if (coupon.type === 'percentage') {
          discount = Math.floor((totalAmount * coupon.value) / 100);
          if (coupon.maxDiscount) {
            discount = Math.min(discount, coupon.maxDiscount);
          }
        } else {
          discount = coupon.value;
        }

        return Math.min(discount, totalAmount);
      },
    }),
    {
      name: 'little-nazareth-coupons',
    }
  )
);
