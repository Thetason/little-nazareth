import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 총 사용자 수
    const totalUsers = await prisma.user.count();

    // 카카오톡 채널 추가한 사용자 수
    const channelAddedUsers = await prisma.user.count({
      where: { kakaoChannelAdded: true },
    });

    // 오늘 가입자 수
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    });

    // 지난 7일 일별 가입자 수
    const dailySignups = await getDailySignups(7);

    // 총 쿠폰 수 및 사용률
    const totalCoupons = await prisma.coupon.count();
    const usedCoupons = await prisma.coupon.count({
      where: { isUsed: true },
    });

    // 추천 통계
    const totalReferrals = await prisma.referral.count();
    const topReferrers = await prisma.user.findMany({
      where: { referralCount: { gt: 0 } },
      orderBy: { referralCount: 'desc' },
      take: 5,
      select: {
        id: true,
        name: true,
        referralCount: true,
        profileImage: true,
      },
    });

    // 채널 추가율
    const channelAddRate = totalUsers > 0
      ? ((channelAddedUsers / totalUsers) * 100).toFixed(1)
      : '0';

    return NextResponse.json({
      overview: {
        totalUsers,
        channelAddedUsers,
        channelAddRate: parseFloat(channelAddRate),
        todayUsers,
      },
      coupons: {
        total: totalCoupons,
        used: usedCoupons,
        unused: totalCoupons - usedCoupons,
        usageRate: totalCoupons > 0
          ? ((usedCoupons / totalCoupons) * 100).toFixed(1)
          : '0',
      },
      referrals: {
        total: totalReferrals,
        topReferrers,
      },
      dailySignups,
    });
  } catch (error) {
    console.error('Failed to fetch admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}

async function getDailySignups(days: number) {
  const result = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);

    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    const count = await prisma.user.count({
      where: {
        createdAt: {
          gte: date,
          lt: nextDate,
        },
      },
    });

    result.push({
      date: date.toISOString().split('T')[0],
      count,
    });
  }

  return result;
}
