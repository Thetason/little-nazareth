import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SignJWT } from 'jose';
import { createEarlyBirdCoupon, generateReferralCode, getSystemSettings } from '@/lib/couponUtils';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.redirect(new URL('/?error=no_code', request.url));
    }

    // 1. 카카오 액세스 토큰 받기
    const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_REST_API_KEY!,
        redirect_uri: process.env.KAKAO_REDIRECT_URI!,
        code: code,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to get access token');
    }

    const tokenData = await tokenResponse.json();
    const { access_token } = tokenData;

    // 2. 카카오 사용자 정보 받기
    const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });

    if (!userResponse.ok) {
      throw new Error('Failed to get user info');
    }

    const kakaoUser = await userResponse.json();

    console.log('Kakao User:', JSON.stringify(kakaoUser, null, 2));

    // 3. 추천 코드 확인 (쿼리 파라미터에서)
    const referredBy = searchParams.get('ref');

    // 4. 시스템 설정 가져오기
    const settings = await getSystemSettings();

    // 5. DB에 사용자 저장 또는 업데이트
    const existingUser = await prisma.user.findUnique({
      where: { kakaoId: String(kakaoUser.id) },
    });

    let user;
    if (existingUser) {
      // 기존 사용자 - 로그인만
      user = await prisma.user.update({
        where: { kakaoId: String(kakaoUser.id) },
        data: {
          lastLogin: new Date(),
          name: kakaoUser.properties?.nickname || kakaoUser.kakao_account?.profile?.nickname || 'Unknown',
          profileImage: kakaoUser.properties?.profile_image || kakaoUser.kakao_account?.profile?.profile_image_url,
          email: kakaoUser.kakao_account?.email,
          kakaoChannelAdded: true,
          kakaoChannelAddedAt: new Date(),
        },
      });
    } else {
      // 신규 사용자 - 추천 코드 생성
      const newReferralCode = generateReferralCode();

      user = await prisma.user.create({
        data: {
          kakaoId: String(kakaoUser.id),
          name: kakaoUser.properties?.nickname || kakaoUser.kakao_account?.profile?.nickname || 'Unknown',
          profileImage: kakaoUser.properties?.profile_image || kakaoUser.kakao_account?.profile?.profile_image_url,
          email: kakaoUser.kakao_account?.email,
          kakaoChannelAdded: true,
          kakaoChannelAddedAt: new Date(),
          referralCode: newReferralCode,
          referredBy: referredBy || null,
        },
      });

      // 얼리버드 쿠폰 발급 (설정이 활성화된 경우)
      if (settings.earlyBirdEnabled) {
        await createEarlyBirdCoupon(user.id, settings.earlyBirdDiscount);
      }

      // 추천으로 가입한 경우 처리
      if (referredBy && settings.referralEnabled) {
        const referrer = await prisma.user.findUnique({
          where: { referralCode: referredBy },
        });

        if (referrer) {
          // 추천 관계 생성
          await prisma.referral.create({
            data: {
              referrerId: referrer.id,
              referredId: user.id,
            },
          });

          // 추천자 카운트 증가
          await prisma.user.update({
            where: { id: referrer.id },
            data: {
              referralCount: {
                increment: 1,
              },
            },
          });
        }
      }
    }

    // 4. JWT 토큰 생성
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ userId: user.id, kakaoId: user.kakaoId })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(secret);

    // 5. 쿠키 설정 및 홈으로 리다이렉트
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Kakao OAuth error:', error);
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
  }
}
