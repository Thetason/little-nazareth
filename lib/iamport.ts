// 아임포트 타입 정의
export interface IamportResponse {
  success: boolean;
  error_code?: string;
  error_msg?: string;
  imp_uid?: string;
  merchant_uid?: string;
  pay_method?: string;
  paid_amount?: number;
  status?: string;
  name?: string;
  pg_provider?: string;
  pg_type?: string;
  pg_tid?: string;
  buyer_name?: string;
  buyer_email?: string;
  buyer_tel?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  custom_data?: string;
  paid_at?: number;
  receipt_url?: string;
}

export interface IamportPaymentData {
  pg: string; // PG사 (예: 'html5_inicis')
  pay_method: 'card' | 'trans' | 'vbank' | 'phone' | 'kakaopay' | 'naverpay' | 'tosspay';
  merchant_uid: string; // 주문번호
  name: string; // 주문명
  amount: number; // 결제금액
  buyer_email?: string;
  buyer_name?: string;
  buyer_tel?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  m_redirect_url?: string; // 모바일 결제 후 리다이렉트 URL
  app_scheme?: string; // 앱 URL 스킴
  custom_data?: string; // 커스텀 데이터
}

// 아임포트 SDK 타입
declare global {
  interface Window {
    IMP?: {
      init: (userCode: string) => void;
      request_pay: (
        data: IamportPaymentData,
        callback?: (response: IamportResponse) => void
      ) => void;
    };
  }
}

export {};
