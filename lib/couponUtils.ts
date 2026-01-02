import { prisma } from './prisma';

// 랜덤 쿠폰 코드 생성
export function generateCouponCode(prefix: string = 'PRAYING'): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = prefix + '-';
  for (let i = 0; i < 8; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

// 랜덤 추천 코드 생성
export function generateReferralCode(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

// 얼리버드 쿠폰 생성
export async function createEarlyBirdCoupon(userId: number, discount: number = 10) {
  const code = generateCouponCode('EARLYBIRD');

  // 30일 후 만료
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  return await prisma.coupon.create({
    data: {
      code,
      type: 'EARLY_BIRD',
      discount,
      userId,
      expiresAt,
    },
  });
}

// 추천 쿠폰 생성
export async function createReferralCoupon(userId: number, discount: number = 5) {
  const code = generateCouponCode('REFERRAL');

  // 30일 후 만료
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  return await prisma.coupon.create({
    data: {
      code,
      type: 'REFERRAL',
      discount,
      userId,
      expiresAt,
    },
  });
}

// 시스템 설정 가져오기
export async function getSystemSettings() {
  const settings = await prisma.systemSettings.findMany();

  const settingsMap: Record<string, string> = {};
  settings.forEach((setting) => {
    settingsMap[setting.key] = setting.value;
  });

  return {
    earlyBirdEnabled: settingsMap.earlyBirdEnabled === 'true',
    earlyBirdDiscount: parseInt(settingsMap.earlyBirdDiscount || '10'),
    referralEnabled: settingsMap.referralEnabled === 'true',
    referralDiscount: parseInt(settingsMap.referralDiscount || '5'),
  };
}
