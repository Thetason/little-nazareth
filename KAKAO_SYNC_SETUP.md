# 🚀 카카오싱크 (Kakao Sync) 설정 가이드

## ✅ 완료된 사항

- ✅ 데이터베이스 스키마 생성 (SQLite)
- ✅ 카카오 로그인 API 구현
- ✅ 사용자 세션 관리 시스템
- ✅ 로그인 UI 컴포넌트
- ✅ 메인 페이지에 로그인 버튼 추가

---

## 📋 할 일: 카카오 개발자 설정

### 1단계: 카카오 개발자 계정 생성

1. **카카오 개발자 콘솔 접속**
   - https://developers.kakao.com/

2. **로그인**
   - 카카오 계정으로 로그인

3. **내 애플리케이션 > 애플리케이션 추가하기**
   - 앱 이름: `Praying Pals` (또는 원하는 이름)
   - 사업자명: 회사명 입력

---

### 2단계: 앱 키 발급

애플리케이션을 만들면 자동으로 키가 생성됩니다:

1. **앱 설정 > 요약 정보**에서 다음 키 확인:
   - **REST API 키**: `your_rest_api_key_here`
   - **JavaScript 키**: `your_javascript_key_here`

2. **이 키들을 `.env` 파일에 복사하세요!**

---

### 3단계: Redirect URI 설정

1. **제품 설정 > 카카오 로그인** 클릭

2. **Redirect URI 등록**
   - `http://localhost:3001/api/auth/kakao/callback` 추가
   - `https://your-domain.com/api/auth/kakao/callback` (배포 시)

3. **활성화 설정 ON**

---

### 4단계: 동의 항목 설정 (⭐️ 중요!)

1. **제품 설정 > 카카오 로그인 > 동의 항목** 클릭

2. **다음 항목들을 설정**:

   | 항목 | 설정 | 필수 여부 |
   |------|------|----------|
   | 닉네임 | 수집 | 필수 동의 |
   | 프로필 사진 | 수집 | 선택 동의 |
   | 카카오계정(이메일) | 수집 | 선택 동의 |
   | **카카오톡 채널 추가** | **수집** | **선택 동의** ⭐️ |

3. **⚠️ 주의**: "카카오톡 채널 추가" 항목을 꼭 활성화해야 카카오싱크가 작동합니다!

---

### 5단계: 카카오톡 채널 생성 및 연결

1. **카카오톡 채널 관리자 센터 접속**
   - https://center-pf.kakao.com/

2. **새 채널 만들기**
   - 채널명: `Praying Pals`
   - 검색용 아이디: `@prayingpals` (원하는 ID)
   - 프로필 사진 업로드
   - 소개: "서툰 친구들의 따뜻한 이야기"

3. **채널 Public ID 확인**
   - 채널 관리 > 관리 > 상세 설정
   - **Public ID**: `_xxxxxabcd` (밑줄 포함!)
   - 이 ID를 복사하세요!

4. **개발자 콘솔에서 채널 연결**
   - 카카오 개발자 콘솔로 돌아가기
   - **제품 설정 > 카카오톡 채널**
   - 방금 만든 채널 선택 및 연결

---

### 6단계: 환경 변수 설정

`.env` 파일을 열고 다음 값들을 채워넣으세요:

```env
# Kakao Sync 설정
KAKAO_REST_API_KEY="위에서 받은_REST_API_키"
KAKAO_REDIRECT_URI="http://localhost:3001/api/auth/kakao/callback"
KAKAO_CHANNEL_PUBLIC_ID="_위에서_받은_채널_Public_ID"

# JWT 시크릿 (아무 랜덤 문자열 - 안전하게!)
JWT_SECRET="super-secret-random-string-change-this"

# Next.js 환경변수
NEXT_PUBLIC_KAKAO_JS_KEY="위에서_받은_JavaScript_키"
NEXT_PUBLIC_KAKAO_CHANNEL_ID="_위에서_받은_채널_Public_ID"
```

---

### 7단계: 테스트!

1. **서버 재시작**
   ```bash
   npm run dev
   ```

2. **브라우저에서 접속**
   ```
   http://localhost:3001
   ```

3. **"카카오로 3초 회원가입" 버튼 클릭**

4. **카카오 로그인 진행**
   - 닉네임, 프로필, 이메일 동의
   - **⭐️ 카카오톡 채널 추가 동의** ← 여기가 중요!

5. **로그인 성공 시**
   - 프로필 사진이 우측 상단에 표시됨
   - 프로필 클릭 시 "카카오톡 채널 연결됨" 배지 확인

---

## 🎯 작동 원리

```
사용자 클릭 "카카오로 3초 회원가입"
    ↓
카카오 OAuth 페이지로 이동
    ↓
사용자가 동의 (닉네임, 이메일, 채널 추가 등)
    ↓
콜백 URL로 리다이렉트
    ↓
서버에서:
  1. 카카오에서 사용자 정보 받기
  2. DB에 사용자 저장
  3. 채널 추가 여부 기록 (kakaoChannelAdded = true)
  4. JWT 토큰 생성 및 쿠키 설정
    ↓
홈페이지로 돌아옴 (로그인 완료!)
```

---

## 📊 수집되는 데이터

사용자가 회원가입하면 다음 정보가 DB에 저장됩니다:

| 필드 | 설명 | 예시 |
|------|------|------|
| kakaoId | 카카오 고유 ID | "1234567890" |
| name | 닉네임 | "램비" |
| email | 이메일 (선택) | "lambie@example.com" |
| profileImage | 프로필 사진 URL | "http://..." |
| kakaoChannelAdded | 채널 추가 여부 | true |
| kakaoChannelAddedAt | 채널 추가 시각 | 2025-03-01 10:00:00 |
| tumblbugNotify | 텀블벅 알림 수신 | true (기본값) |
| createdAt | 가입 일시 | 2025-03-01 10:00:00 |

---

## 🔔 다음 단계: 메시지 발송

채널 친구가 모이면 다음과 같이 메시지를 보낼 수 있습니다:

### 무료 방법:
1. **카카오톡 채널 메시지**
   - 채널 관리자 센터에서 수동 발송
   - 팔로워 전체에게 공지

### 유료 방법:
1. **알림톡 (Alimtalk)**
   - 건당 ~15원
   - 개별 발송 가능
   - 템플릿 승인 필요
   - 사업자등록 필요

2. **친구톡 (FriendTalk)**
   - 채널 친구에게만
   - 광고성 메시지 가능

---

## 🚨 문제 해결

### 문제: "카카오톡 채널 추가" 동의 항목이 안 보여요
**해결**:
1. 카카오톡 채널을 먼저 만들고
2. 개발자 콘솔에서 채널 연결 후
3. 동의 항목에서 활성화

### 문제: 로그인 후 채널 추가가 안돼요
**해결**:
- `service_terms=channel` 파라미터 확인
- `channel_public_id` 파라미터 확인
- 채널 Public ID가 밑줄(_)로 시작하는지 확인

### 문제: DB 에러가 나요
**해결**:
```bash
npx prisma migrate reset
npx prisma migrate dev --name init
npx prisma generate
```

---

## 📱 배포 시 체크리스트

- [ ] Redirect URI에 프로덕션 URL 추가
- [ ] 환경변수를 Vercel/Netlify 등에 설정
- [ ] SQLite → PostgreSQL 전환 (권장)
- [ ] JWT_SECRET 강력한 랜덤 문자열로 변경
- [ ] 카카오 비즈니스 계정 전환 (알림톡 사용 시)

---

## 💡 유용한 링크

- [카카오 개발자 문서](https://developers.kakao.com/docs)
- [카카오싱크 가이드](https://developers.kakao.com/docs/latest/ko/kakaosync/common)
- [카카오톡 채널 관리자](https://center-pf.kakao.com/)
- [알림톡/친구톡 가이드](https://kakaobusiness.gitbook.io/main/)

---

**구현 완료! 🎉**

이제 카카오로 로그인하고 채널을 추가한 사용자들에게 텀블벅 오픈 알림을 보낼 수 있습니다!
