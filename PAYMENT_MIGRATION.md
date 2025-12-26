# 결제 시스템 전환 가이드
## 아임포트 → 토스페이먼츠

---

## 📋 **현재 상태 (아임포트)**

### 설정
- **가맹점 코드**: `imp00000000` (테스트)
- **PG사**: KG이니시스 (html5_inicis)
- **수수료**: 3.3-3.5%

### 구현 파일
```
lib/iamport.ts           - 타입 정의
app/checkout/page.tsx    - 결제 페이지
app/order/success/page.tsx - 주문 완료
```

---

## 🎯 **토스페이먼츠 전환 시점**

다음 조건 중 하나 이상 충족 시 전환 권장:
- ✅ 월 매출 300만원 돌파
- ✅ 사업자등록증 발급 완료
- ✅ 수수료 절감 필요 (연 30만원+)
- ✅ 더 나은 UX 원함

---

## 🔄 **전환 방법**

### Step 1: 토스페이먼츠 회원가입
```
1. https://www.tosspayments.com 접속
2. 회원가입 & 사업자등록
3. 가맹점 심사 (1-2주)
4. 클라이언트 키 & 시크릿 키 발급
```

### Step 2: 라이브러리 설치
```bash
npm install @tosspayments/payment-sdk
```

### Step 3: 타입 정의 업데이트
**파일**: `lib/tosspayments.ts` (새로 생성)

\`\`\`typescript
// 토스페이먼츠 타입 정의
export interface TossPaymentData {
  amount: number;
  orderId: string;
  orderName: string;
  customerName?: string;
  customerEmail?: string;
  successUrl: string;
  failUrl: string;
}

export interface TossPaymentResponse {
  paymentKey: string;
  orderId: string;
  amount: number;
  status: 'READY' | 'IN_PROGRESS' | 'WAITING_FOR_DEPOSIT' | 'DONE' | 'CANCELED' | 'PARTIAL_CANCELED' | 'ABORTED' | 'EXPIRED';
}
\`\`\`

### Step 4: 결제 페이지 수정
**파일**: `app/checkout/page.tsx`

**변경 전 (아임포트):**
\`\`\`typescript
import Script from 'next/script';

<Script
  src="https://cdn.iamport.kr/v1/iamport.js"
  onLoad={() => {
    window.IMP.init('imp00000000');
  }}
/>

window.IMP.request_pay(paymentData, callback);
\`\`\`

**변경 후 (토스페이먼츠):**
\`\`\`typescript
import { loadTossPayments } from '@tosspayments/payment-sdk';

const tossPayments = await loadTossPayments('test_ck_발급받은키');

await tossPayments.requestPayment('카드', {
  amount: getTotalPrice(),
  orderId: merchantUid,
  orderName: orderName,
  customerName: shippingInfo.name,
  customerEmail: shippingInfo.email,
  successUrl: window.location.origin + '/order/success',
  failUrl: window.location.origin + '/order/fail',
});
\`\`\`

### Step 5: 주문 완료 페이지 수정
**파일**: `app/order/success/page.tsx`

**변경 전:**
\`\`\`typescript
const imp_uid = searchParams.get('imp_uid');
const merchant_uid = searchParams.get('merchant_uid');
\`\`\`

**변경 후:**
\`\`\`typescript
const paymentKey = searchParams.get('paymentKey');
const orderId = searchParams.get('orderId');
const amount = searchParams.get('amount');
\`\`\`

---

## 💰 **비용 비교**

### 월 매출 500만원 기준

| 항목 | 아임포트 | 토스페이먼츠 | 절감액 |
|------|----------|--------------|--------|
| 수수료율 | 3.3-3.5% | 2.9-3.2% | 0.3-0.4% |
| 월 수수료 | 165,000-175,000원 | 145,000-160,000원 | 15,000-20,000원 |
| 연 수수료 | 1,980,000-2,100,000원 | 1,740,000-1,920,000원 | **180,000-240,000원** |

---

## 📝 **체크리스트**

### 전환 전 확인사항
- [ ] 사업자등록증 발급 완료
- [ ] 토스페이먼츠 가맹점 심사 통과
- [ ] 클라이언트 키 발급 완료
- [ ] 시크릿 키 발급 완료 (서버 검증용)
- [ ] 테스트 환경 구축

### 전환 작업
- [ ] `@tosspayments/payment-sdk` 설치
- [ ] `lib/tosspayments.ts` 생성
- [ ] `app/checkout/page.tsx` 수정
- [ ] `app/order/success/page.tsx` 수정
- [ ] 백엔드 검증 API 구현 (webhook)
- [ ] 테스트 결제 진행

### 전환 후 확인
- [ ] 실제 결제 테스트 (소액)
- [ ] 환불 테스트
- [ ] 정산 확인
- [ ] 고객 CS 대응 준비

---

## 🚨 **주의사항**

1. **백엔드 검증 필수**
   - 프론트엔드만으로는 보안 취약
   - 반드시 서버에서 결제 검증 구현
   - 토스 API로 실제 결제 금액 확인

2. **점진적 전환 권장**
   - 처음엔 아임포트 + 토스 병행
   - 테스트 완료 후 토스로 완전 전환

3. **이전 주문 데이터**
   - 아임포트 주문은 계속 관리 필요
   - 환불 등은 아임포트로 처리

---

## 📚 **참고 문서**

- [토스페이먼츠 개발자 가이드](https://docs.tosspayments.com)
- [토스 결제 SDK 문서](https://docs.tosspayments.com/reference/widget-sdk)
- [토스 API 레퍼런스](https://docs.tosspayments.com/reference)

---

## 💬 **도움이 필요하면?**

전환 작업 시 문제가 생기면:
1. 토스페이먼츠 고객센터: 1544-7772
2. 토스 개발자 커뮤니티: https://community.tosspayments.com
3. 아임포트 고객센터: 1670-5176

---

**작성일**: 2025-01-XX
**작성자**: Claude Code
**다음 리뷰**: 월 매출 300만원 달성 시
