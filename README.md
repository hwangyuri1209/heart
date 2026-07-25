# 🌿 마음 상담소 (Mind Counseling Center)

> 지친 현대인을 위한 감정 안식처 & AI 마음 상담 플랫폼  
> **"당신의 마음에 가만히 귀를 기울입니다."**

---

## 📌 프로젝트 소개 (Overview)

**마음 상담소**는 일상 속 스트레스와 감정적 피로를 겪는 분들을 위한 따뜻하고 다정한 디지털 감정 안식처입니다.  
`Soft Minimalism`과 `Organic Tactility` 디자인 시스템을 기반으로 한 포근한 크림톤 인터페이스 위에, Gemini AI 기반의 실시간 마음 상담 및 위로 편지 생성 기능, 그리고 이용자 간 온기를 나눌 수 있는 마음 광장(게시판) 커뮤니티를 제공합니다.

---

## ✨ 주요 기능 (Key Features)

1. 🏠 **홈 (Home)**
   - **오늘의 기분 선택**: 5가지 유기적 모형의 감정 노드(행복, 평온, 피곤, 슬픔, 불안) 선택
   - **오늘의 마음 카드**: 매일 마음을 가다듬어 주는 수채화 일러스트 카드 및 메시지
   - **AI 상담 & 최근 기록 요약**: 원클릭 AI 상담 시작 및 최근 활동 내역 바로가기

2. 💬 **AI 마음 상담 (Counseling)**
   - **Gemini AI 실시간 연동**: 다정하고 따뜻한 어조로 사용자의 고민에 깊이 공감하는 1:1 상담
   - **맞춤 추천 답변 칩**: 상황에 맞는 한 줄 대화 칩 선택 제공
   - **위로 편지 모드**: 긴 고민이나 일기 형태의 이야기를 작성하면 정성스러운 위로 편지 답장 생성

3. 📅 **마음 일기 & 위로 편지 (Diary)**
   - **마음의 흐름 캘린더**: 날짜별 감정 점으로 한 달간의 마음 흐름을 시각화
   - **일기 작성 & Gemini 위로 편지**: 일기를 작성하면 Gemini AI가 마음을 보듬어 주는 전용 위로 편지를 자동 생성 및 저장

4. 💬 **마음 광장 - 커뮤니티 게시판 (Board)**
   - **온기 나누기**: 위로, 고민, 응원, 감사, 자유 카테고리별 글 작성
   - **상호작용**: 공감(좋아요) 및 따뜻한 응원 댓글 작성 기능
   - **검색 및 태그**: 카테고리 필터링 및 해시태그/키워드 검색

5. 🧘 **명상 & 호흡 (Meditation)**
   - **5분 호흡 명상**: 타이머와 유기적 호흡 애니메이션이 연동된 가이드 세션
   - **잠들기 전 평온**: 숙면 및 스트레스 해소를 위한 소리/가이드 라이브러리
   - **감정 상태별 명상 추천**: 활기찬, 평온한, 복잡한, 지친 상태에 맞춘 콘텐츠 안내

6. 👤 **마이페이지 (My Page)**
   - **마음 통계**: 최근 7일 및 지난달 마음 흐름 그래프 시각화 (평균 평온도, 명상 시간, 기록 횟수)
   - **이번 달 리포트**: 주요 감정 키워드 분석 및 종합 안식 리포트
   - **프로필 & 계정 설정**: 닉네임 수정 및 알림, 개인정보 관리

---

## 🛠 기술 스택 (Tech Stack)

### **Frontend**
- **Framework**: React 19, TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v4, Google Material Symbols Outlined, Google Fonts (Plus Jakarta Sans, Be Vietnam Pro)

### **Backend**
- **Server**: Express 4 (Node.js)
- **AI Engine**: `@google/genai` (Gemini 3.6 Flash Model)
- **Bundler**: `esbuild` (서버 번들링)

---

## 🚀 실행 방법 (Getting Started)

### 1. Repository 클론 및 패키지 설치

```bash
# 패키지 설치
npm install
```

### 2. 환경 변수 설정

`.env.example` 파일을 참고하여 `.env` 파일에 Gemini API 키를 설정합니다.

```env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

### 3. 개발 서버 실행

```bash
npm run dev
```

서버가 실행되면 [http://localhost:3000](http://localhost:3000)에서 앱을 확인할 수 있습니다.

### 4. 프로덕션 빌드 및 실행

```bash
# 빌드
npm run build

# 서버 실행
npm start
```

---

## 🎨 디자인 시스템 (Design System)

- **컬러 팔레트**:
  - `Background / Surface`: `#fefccf` (Warm Cream)
  - `Primary (Lavender)`: `#585896`
  - `Secondary (Mint)`: `#2c6956` / `#aeedd5`
  - `Text`: `#1d1d03` (Soft Charcoal)
- **타이포그래피**:
  - Headings: `Plus Jakarta Sans`
  - Body: `Be Vietnam Pro`
- **디자인 철학**: 둥근 곡선(Pill/Organic Shape), 소프트 블러, 그림자 최소화, 여백 중심의 편안함

---

## 📄 라이선스 (License)

Apache License 2.0
