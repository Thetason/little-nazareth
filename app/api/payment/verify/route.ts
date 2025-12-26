import { NextRequest, NextResponse } from 'next/server';

// 아임포트 REST API 인증 정보
const IMP_KEY = process.env.IMP_KEY || 'imp00000000'; // 테스트 키
const IMP_SECRET = process.env.IMP_SECRET || 'test_secret';

// 아임포트 액세스 토큰 발급
async function getIamportToken() {
  try {
    const response = await fetch('https://api.iamport.kr/users/getToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imp_key: IMP_KEY,
        imp_secret: IMP_SECRET,
      }),
    });

    const data = await response.json();

    if (data.code !== 0) {
      throw new Error('Failed to get Iamport token');
    }

    return data.response.access_token;
  } catch (error) {
    console.error('Get Iamport Token Error:', error);
    throw error;
  }
}

// 결제 정보 조회
async function getPaymentData(imp_uid: string, access_token: string) {
  try {
    const response = await fetch(`https://api.iamport.kr/payments/${imp_uid}`, {
      method: 'GET',
      headers: {
        'Authorization': access_token,
      },
    });

    const data = await response.json();

    if (data.code !== 0) {
      throw new Error('Failed to get payment data');
    }

    return data.response;
  } catch (error) {
    console.error('Get Payment Data Error:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imp_uid, merchant_uid, amount } = body;

    // 필수 파라미터 체크
    if (!imp_uid || !merchant_uid) {
      return NextResponse.json(
        { success: false, message: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // 1. 아임포트 액세스 토큰 발급
    const access_token = await getIamportToken();

    // 2. 아임포트에서 결제 정보 조회
    const paymentData = await getPaymentData(imp_uid, access_token);

    // 3. 결제 금액 검증
    // TODO: 실제로는 DB에서 주문 정보를 조회하여 금액 비교
    const expectedAmount = amount; // 실제로는 DB에서 가져와야 함

    if (paymentData.amount !== expectedAmount) {
      // 금액 불일치 - 위변조 시도
      return NextResponse.json(
        {
          success: false,
          message: 'Payment amount mismatch',
          details: {
            expected: expectedAmount,
            actual: paymentData.amount,
          },
        },
        { status: 400 }
      );
    }

    // 4. 결제 상태 확인
    if (paymentData.status !== 'paid') {
      return NextResponse.json(
        {
          success: false,
          message: 'Payment not completed',
          status: paymentData.status,
        },
        { status: 400 }
      );
    }

    // 5. 결제 검증 성공
    // TODO: 여기서 주문 정보를 DB에 저장
    console.log('Payment verified:', {
      imp_uid,
      merchant_uid,
      amount: paymentData.amount,
      buyer_name: paymentData.buyer_name,
      buyer_email: paymentData.buyer_email,
    });

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        imp_uid: paymentData.imp_uid,
        merchant_uid: paymentData.merchant_uid,
        amount: paymentData.amount,
        status: paymentData.status,
        paid_at: paymentData.paid_at,
        buyer_name: paymentData.buyer_name,
        buyer_email: paymentData.buyer_email,
      },
    });
  } catch (error) {
    console.error('Payment Verification Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Payment verification failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
