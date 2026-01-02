import { NextResponse } from 'next/server';

export async function GET() {
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?` +
    `client_id=${process.env.KAKAO_REST_API_KEY}` +
    `&redirect_uri=${encodeURIComponent(process.env.KAKAO_REDIRECT_URI!)}` +
    `&response_type=code` +
    `&scope=profile_nickname,profile_image,account_email` +
    `&service_terms=channel` + // ⭐️ 카카오싱크: 채널 추가 동의 항목
    `&channel_public_id=${process.env.KAKAO_CHANNEL_PUBLIC_ID}`; // ⭐️ 채널 ID

  return NextResponse.redirect(kakaoAuthUrl);
}
