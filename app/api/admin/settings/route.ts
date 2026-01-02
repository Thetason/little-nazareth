import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - 설정 가져오기
export async function GET() {
  try {
    const settings = await prisma.systemSettings.findMany();

    const settingsMap: Record<string, string> = {};
    settings.forEach((setting) => {
      settingsMap[setting.key] = setting.value;
    });

    // 기본값 설정
    return NextResponse.json({
      earlyBirdEnabled: settingsMap.earlyBirdEnabled === 'true',
      earlyBirdDiscount: parseInt(settingsMap.earlyBirdDiscount || '10'),
      referralEnabled: settingsMap.referralEnabled === 'true',
      referralDiscount: parseInt(settingsMap.referralDiscount || '5'),
    });
  } catch (error) {
    console.error('Failed to fetch settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// POST - 설정 업데이트
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { earlyBirdEnabled, earlyBirdDiscount, referralEnabled, referralDiscount } = body;

    // 각 설정 업데이트 또는 생성
    await prisma.systemSettings.upsert({
      where: { key: 'earlyBirdEnabled' },
      update: { value: String(earlyBirdEnabled) },
      create: { key: 'earlyBirdEnabled', value: String(earlyBirdEnabled) },
    });

    await prisma.systemSettings.upsert({
      where: { key: 'earlyBirdDiscount' },
      update: { value: String(earlyBirdDiscount) },
      create: { key: 'earlyBirdDiscount', value: String(earlyBirdDiscount) },
    });

    await prisma.systemSettings.upsert({
      where: { key: 'referralEnabled' },
      update: { value: String(referralEnabled) },
      create: { key: 'referralEnabled', value: String(referralEnabled) },
    });

    await prisma.systemSettings.upsert({
      where: { key: 'referralDiscount' },
      update: { value: String(referralDiscount) },
      create: { key: 'referralDiscount', value: String(referralDiscount) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
