# Little Nazareth 개발 현황

> 최종 업데이트: 2025-12-09

## 📊 프로젝트 개요

**프로젝트명**: Little Nazareth (리틀 나자렛)
**목적**: 가톨릭/기독교 테마 플러시 토이 제품 랜딩 페이지
**기술 스택**: Next.js 14, TypeScript, Tailwind CSS v4, Framer Motion, shadcn/ui
**참고 디자인**:
- Harry Potter Sorting Hat (인터랙션 패턴)
- Animal Crossing (비주얼 레이아웃)

## 🎯 핵심 기능

1. **인터랙티브 히어로 섹션**: 캐릭터 호버 시 팝업
2. **성격 테스트**: 해리포터 스타일 분류 시스템
3. **캐릭터 소개**: 5개 캐릭터 (다람쥐, 사자, 양, 곰, 사슴)
4. **스토리텔링 페이지**: Animal Crossing 스타일 스크롤 기반 (계획 중)

---

## ✅ 완료된 작업

### 1. 기본 프로젝트 셋업
- [x] Next.js 14 프로젝트 초기화
- [x] Tailwind CSS v4 설정
- [x] Framer Motion 설치
- [x] shadcn/ui 통합
- [x] 디자인 시스템 구축 (`app/globals.css`)

### 2. 히어로 섹션 (현재 활성화)
- [x] 정적 이미지 배경 (`/little-nazareth-hero.png`)
- [x] SVG path 기반 정밀 호버 영역
- [x] 5개 캐릭터 호버 감지 시스템
- [x] 캐릭터별 맞춤 팝업 (위치: top/left)
- [x] Framer Motion 애니메이션
- [x] 캐릭터 팝업 위치 최적화 (mb-20/mr-20)

#### 캐릭터 위치
```typescript
characterPaths = [
  { id: 'squirrel', cx: '21.5%', cy: '70%', popupPosition: 'top' },
  { id: 'lion', cx: '42%', cy: '60%', popupPosition: 'top' },
  { id: 'lamb', cx: '53%', cy: '58%', popupPosition: 'top' },
  { id: 'bear', cx: '62.5%', cy: '69%', popupPosition: 'top' },
  { id: 'deer', cx: '71%', cy: '63%', popupPosition: 'left' }
]
```

### 3. 비디오 트래킹 시스템 (준비됨, 비활성화)
- [x] 타임라인 기반 캐릭터 위치 추적 시스템
- [x] 선형 보간을 통한 부드러운 이동
- [x] 실시간 호버 감지
- [x] 주석 처리로 대기 중 (`app/page.tsx`)
- [x] 가이드 문서 작성 (`TIMELINE_GUIDE.md`)

**활성화 조건**: `/public/hero-video.mp4` 추가 시

### 4. 하단 네비게이션
- [x] Animal Crossing 스타일 디자인
- [x] 4개 메뉴 항목 (홈, 캐릭터, 이야기, 테스트)
- [x] 크기 조정 완료 (w-24, text-5xl, px-20 py-8)
- [x] Glass morphism 효과
- [x] Framer Motion 진입 애니메이션

### 5. 인트로 비디오
- [x] 비디오 자동 재생 (`/intro-video.mp4`)
- [x] 재생 완료 후 히어로 섹션 전환
- [x] 페이드 인/아웃 애니메이션

### 6. 제품 버튼
- [x] 우측 상단 확장 가능 버튼
- [x] 호버 시 제품명 표시
- [x] "Little Nazareth 만나기" 텍스트

### 7. 캐릭터 데이터
- [x] 6개 캐릭터 정의 (`lib/characters.ts`)
  - lamb (양), lion (사자), dove (비둘기), deer (사슴), squirrel (다람쥐), bear (곰)
- [x] 각 캐릭터별 성경 구절, 성격 특성, 컬러 테마

### 8. 테스트 시스템
- [x] 인트로 페이지 (`/test/page.tsx`)
- [x] 질문 페이지 기본 구조
- [x] 결과 페이지 기본 구조

### 9. 디자인 시스템
- [x] 커스텀 컬러 팔레트
  - Primary: Sunset (#FF9B71), Heaven (#B5A4D9)
  - Secondary: Peace (#9CC5A1), Holy (#FFD700)
  - 캐릭터별 컬러
- [x] 커스텀 애니메이션 (float, holy-glow, reveal, spin-reveal)
- [x] Glass effect 유틸리티

---

## 🚧 진행 중인 작업

### 없음 (현재 대기 상태)
- 사용자가 다음 작업 지시 대기 중
- 스토리텔링 페이지 구현 준비 완료 (`SCROLL_STORYTELLING_PLAN.md`)

---

## 📋 계획된 작업

### Phase 1: 스토리텔링 페이지 (예정)
- [ ] `/app/story/page.tsx` 생성
- [ ] 스크롤 기반 섹션 시스템
- [ ] 프로그레스 바
- [ ] 로딩 화면 + 사운드 토글
- [ ] 말풍선 컴포넌트
- [ ] 폴라로이드 컴포넌트
- [ ] 10-15개 섹션 콘텐츠 작성

**상세 플랜**: `SCROLL_STORYTELLING_PLAN.md` 참고

### Phase 2: 테스트 시스템 완성
- [ ] 질문 데이터베이스 구축
- [ ] 답변 로직 구현
- [ ] 결과 계산 알고리즘
- [ ] 결과 페이지 디자인
- [ ] 공유 기능

### Phase 3: 콘텐츠 작성
- [ ] 각 캐릭터 상세 소개 페이지
- [ ] 제품 페이지
- [ ] 블로그/이야기 섹션

### Phase 4: 백엔드 통합
- [ ] 사용자 데이터 저장
- [ ] 테스트 결과 통계
- [ ] 이메일 구독
- [ ] 관리자 대시보드

---

## 🗂️ 파일 구조

```
little-nazareth/
├── app/
│   ├── page.tsx                    # 메인 랜딩 페이지 (히어로 + 네비게이션)
│   ├── layout.tsx                  # 루트 레이아웃
│   ├── globals.css                 # 디자인 시스템
│   ├── test/
│   │   ├── page.tsx                # 테스트 인트로
│   │   ├── question/[id]/page.tsx  # 질문 페이지
│   │   └── result/page.tsx         # 결과 페이지
│   └── (future) story/
│       └── page.tsx                # 스토리텔링 페이지 (계획)
├── components/
│   └── ui/                         # shadcn/ui 컴포넌트
├── lib/
│   └── characters.ts               # 캐릭터 데이터
├── public/
│   ├── intro-video.mp4             # 인트로 비디오
│   ├── little-nazareth-hero.png    # 히어로 배경 이미지
│   └── (future) hero-video.mp4    # 히어로 애니메이션 비디오
├── TIMELINE_GUIDE.md               # 비디오 트래킹 가이드
├── SCROLL_STORYTELLING_PLAN.md     # 스토리텔링 페이지 플랜
└── DEVELOPMENT_STATUS.md           # 이 문서
```

---

## 🎨 현재 UI 상태

### 랜딩 페이지 (`/`)
1. **인트로 비디오** (자동 재생)
   - `/intro-video.mp4`
   - 재생 후 히어로 섹션으로 전환

2. **히어로 섹션** (현재 활성화)
   - 정적 이미지 + SVG 호버 영역
   - 5개 캐릭터 인터랙티브 팝업
   - 우측 상단: 제품 버튼

3. **하단 네비게이션**
   - 홈 (🏠)
   - 캐릭터 (🐿️)
   - 이야기 (📖)
   - 테스트 (✨)

### 테스트 페이지 (`/test`)
- 화려한 그라데이션 배경
- 파티클 애니메이션 (80개)
- 중앙 심볼 (✨) + Holy glow
- "여정 시작하기" CTA 버튼

---

## 🔧 기술적 결정 사항

### 1. SVG Path vs AI Tracking
**결정**: SVG path 기반 호버 영역 사용
**이유**:
- 정밀한 캐릭터 윤곽선 감지
- 성능 우수
- 유지보수 용이

### 2. 정적 이미지 vs 비디오
**현재**: 정적 이미지
**향후**: 비디오 추가 시 타임라인 트래킹 활성화
**이유**:
- 비디오 제작 중
- 시스템은 완전히 준비됨
- 주석 처리로 대기 중

### 3. 스크롤 애니메이션 라이브러리
**결정**: Framer Motion
**이유**:
- React 친화적
- 선언적 API
- 강력한 스크롤 애니메이션 지원
- 이미 프로젝트에 통합됨

### 4. 캐릭터 팝업 위치
**결정**: 캐릭터를 가리지 않는 위치 (mb-20/mr-20)
**이유**: 사용자가 캐릭터를 계속 볼 수 있어야 함

---

## 📊 데이터 구조

### Character Interface
```typescript
export interface Character {
  id: string;
  name: string;
  koreanName: string;
  emoji: string;
  color: string;
  accentColor: string;
  description: string;
  traits: string[];
  bibleVerse: {
    text: string;
    reference: string;
  };
}
```

### CharacterPath (히어로 섹션)
```typescript
interface CharacterPath {
  id: string;
  path: string;  // SVG path data
  cx: string;    // 중심 x 좌표 (%)
  cy: string;    // 중심 y 좌표 (%)
  popupPosition: 'top' | 'left';
}
```

### VideoTimeline (비활성화)
```typescript
interface TimelinePoint {
  time: number;  // 초
  x: number;     // 0-100
  y: number;     // 0-100
}

interface CharacterTimeline {
  [characterId: string]: TimelinePoint[];
}
```

---

## 🎯 우선순위

### High Priority (즉시 필요)
1. 스토리텔링 페이지 구현 여부 결정
2. 비디오 리소스 준비 (hero-video.mp4)
3. 테스트 질문 콘텐츠 작성

### Medium Priority
1. 캐릭터 상세 페이지
2. 제품 페이지
3. 반응형 최적화 (모바일)

### Low Priority
1. 백엔드 통합
2. 다국어 지원
3. SEO 최적화

---

## 🐛 알려진 이슈

### 없음
현재 모든 기능이 정상 작동 중

---

## 📝 개발 노트

### 캐릭터 위치 조정 히스토리
1. 초기 위치 설정
2. 사용자 피드백으로 각 캐릭터 미세 조정
   - 다람쥐: 왼쪽으로 3cm
   - 사자: 6시 방향 3cm
   - 양: 10시 방향 5cm
   - 곰: 4시 방향 5cm
   - 사슴: 5시 방향 10cm
3. 양과 곰 위치 교체
4. 최종 확정

### 네비게이션 크기 조정 히스토리
1. 초기: 기본 크기
2. 3배 축소 → 너무 작음
3. 3배 확대 → 적당
4. 2배 확대 → 좋음
5. 높이만 축소 (py-12 → py-8) → 최종

### 팝업 여백 조정
1. 초기: mb-8/mr-8
2. mb-20/mr-20으로 증가 → 캐릭터 가리지 않음

---

## 🎬 다음 단계

### 즉시 가능한 작업
1. **스토리텔링 페이지 프로토타입 구현**
   - 임시 이미지 사용
   - 기본 스크롤 시스템
   - 플랜은 `SCROLL_STORYTELLING_PLAN.md` 참고

2. **테스트 시스템 완성**
   - 질문 데이터베이스
   - 답변 로직
   - 결과 계산

3. **비디오 추가 대기**
   - `hero-video.mp4` 파일만 추가하면 즉시 활성화 가능
   - 타임라인 데이터 입력 필요 (`TIMELINE_GUIDE.md` 참고)

### 리소스 대기 중
- 배경 이미지 (스토리텔링 페이지용)
- 히어로 비디오 (`hero-video.mp4`)
- 배경음악 (스토리텔링 페이지용)

---

## 💡 개선 아이디어

### UX 개선
- [ ] 스크롤 힌트 추가 (아래 화살표)
- [ ] 로딩 애니메이션 개선
- [ ] 마이크로 인터랙션 추가

### 성능 최적화
- [ ] 이미지 최적화 (next/image)
- [ ] 코드 스플리팅
- [ ] 지연 로딩

### 접근성
- [ ] 키보드 네비게이션
- [ ] 스크린 리더 지원
- [ ] ARIA 레이블

---

## 📞 연락처 & 리소스

### 문서
- `TIMELINE_GUIDE.md`: 비디오 트래킹 시스템 가이드
- `SCROLL_STORYTELLING_PLAN.md`: 스토리텔링 페이지 구현 플랜
- `DEVELOPMENT_STATUS.md`: 이 문서

### 참고 링크
- [Harry Potter Sorting Hat](https://www.harrypotter.com/) - 인터랙션 참고
- [Animal Crossing](https://www.nintendo.com/kr/switch/acbaa/pc/slowlife/) - 레이아웃 참고

---

## 📈 프로젝트 타임라인

```
[완료] Week 1: 기본 셋업 + 히어로 섹션
[완료] Week 2: 캐릭터 호버 시스템 + 네비게이션
[완료] Week 3: 비디오 트래킹 시스템 (비활성화)
[현재] Week 4: 문서화 + 스토리텔링 페이지 플랜
[계획] Week 5-6: 스토리텔링 페이지 구현
[계획] Week 7-8: 테스트 시스템 완성
[계획] Week 9-10: 백엔드 통합 + 배포
```

---

## ✨ 프로젝트 비전

Little Nazareth는 단순한 제품 판매 페이지를 넘어, 사용자가 자신의 기도 친구를 찾는 의미있는 여정을 제공합니다. Harry Potter의 마법적인 인터랙션과 Animal Crossing의 따뜻한 감성을 결합하여, 가톨릭/기독교 신앙을 가진 사람들에게 위로와 동행을 전하는 특별한 경험을 만들고 있습니다.

각 캐릭터는 성경 구절과 함께 특별한 의미를 담고 있으며, 사용자의 성격에 맞는 친구를 추천하는 테스트를 통해 개인화된 경험을 제공합니다.

**핵심 가치**:
- 🙏 **신앙과 기술의 조화**: 전통적인 가톨릭 가치를 현대적 웹 경험으로
- 🎨 **감성적 디자인**: 따뜻하고 친근한 비주얼
- 🤝 **개인화된 경험**: 각자에게 맞는 기도 친구 찾기
- ✨ **의미있는 인터랙션**: 단순한 클릭이 아닌, 여정의 일부

---

_문서 끝. 업데이트는 주요 기능 추가/변경 시 진행._
