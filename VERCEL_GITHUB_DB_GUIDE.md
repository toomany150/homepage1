# 참좋은부동산 서버리스(Vercel) & GitHub-DB 게시판 시스템 가이드

별도의 유료 데이터베이스(PostgreSQL, MongoDB, Supabase 등) 없이, **GitHub 저장소의 JSON 파일(`data/board.json`)을 데이터베이스로 활용하여 Vercel 서버리스 환경에서 데이터를 100% 영구 보존**하는 아키텍처입니다.

---

## 🏗️ 1. 아키텍처 및 동작 원리

```
[사용자 브라우저] (index.html / board.html / admin.html)
       │
       ▼ (HTTP REST API: GET, POST, PUT, DELETE)
[Vercel Serverless Functions] (/api/board.js, /api/admin.js)
       │
       ▼ (GitHub Contents REST API: Bearer Token 인증)
[GitHub 저장소] (https://github.com/toomany150/homepage1)
       │
       └── data/board.json (Git Commit으로 영구 보존 & 버전 관리)
```

1. **조회 (GET)**:
   - 클라이언트에서 `/api/board` 호출
   - Vercel 서버리스 함수가 GitHub REST API를 통해 최신 `data/board.json` 파일의 내용을 불러옵니다. (단기 캐시 적용으로 GitHub API 속도 극대화)
2. **글쓰기 / 답변 / 수정 / 삭제 (POST, PUT, DELETE)**:
   - Vercel 서버리스 함수가 현재 `data/board.json`의 SHA 해시를 취득하고 변경된 데이터를 적용
   - GitHub API (`PUT /repos/{owner}/{repo}/contents/data/board.json`)를 호출하여 **Git 커밋을 생성**
   - Vercel의 휘발성 파일시스템 한계를 극복하고 **GitHub Git 히스토리에 영구 저장**됩니다.

---

## ⚙️ 2. Vercel 환경변수(Environment Variables) 설정

Vercel 대시보드 (`https://vercel.com/dashboard`)에서 프로젝트 선택 후 **Settings &gt; Environment Variables** 에 아래 3~4개 항목을 추가해 주세요:

| 환경변수 키 (Key) | 예시 값 (Value) | 설명 |
| :--- | :--- | :--- |
| `GITHUB_TOKEN` | `ghp_xxxxxxxxxxxx` | GitHub Personal Access Token (PAT) - `repo` 또는 `Contents: Read and write` 권한 |
| `GITHUB_REPO` | `toomany150/homepage1` | GitHub 저장소 소유자/저장소명 |
| `GITHUB_BRANCH` | `main` | 대상 브랜치 (기본값: `main`) |
| `ADMIN_PASSWORD` | `chamgood2026!` *(원하는 비밀번호)* | 관리자 콘솔 로그인 비밀번호 |
| `JWT_SECRET` | *(선택: 임의의 긴 문자열)* | 관리자 세션 토큰 암호화 키 |

> **💡 로컬 개발 모드 안내**:
> 위 환경변수가 설정되지 않은 로컬 환경(`node server.js`)에서는 자동으로 `data/board.json` 로컬 파일에 데이터를 기록하며 동작하므로 개발 및 테스트에 지장이 없습니다.

---

## 🔑 3. GitHub Personal Access Token (PAT) 발급 방법

1. GitHub 로그인 후 우측 상단 프로필 클릭 &gt; **Settings** 이동
2. 좌측 최하단 **Developer settings** &gt; **Personal access tokens** &gt; **Tokens (classic)** 클릭
3. **Generate new token (classic)** 클릭
4. Note: `Vercel Board DB Token` 입력
5. Expiration: `No expiration` 또는 원하는 기간 선택
6. Scopes(권한) 선택:
   - ✅ **`repo`** (Full control of private repositories) 전체 체크
7. 최하단 **Generate token** 클릭 후 생성된 토큰 문자열(`ghp_...`)을 복사하여 Vercel 환경변수에 등록

---

## 🖥️ 4. 주요 페이지 및 기능 안내

### ① 메인 홈페이지 (`index.html#boardSection`)
- 메인 내비게이션에 **"소통게시판"** 메뉴 추가
- 추천매물, 뉴스, 1:1 상담과 완벽히 조화되는 인터랙티브 게시판 섹션
- 카테고리 필터(공지사항, 매물문의, 상담신청, 계약후기, 자유질문) 및 실시간 검색
- 새 문의글 작성 모달 & 상세 보기 모달 즉시 실행

### ② 전용 게시판 페이지 (`board.html`)
- 고객이 넓은 화면에서 쾌적하게 질문하고 답변을 확인할 수 있는 독립 게시판
- 상단 공지 고정 배너
- 비밀글(🔒) 기능: 작성자 본인 비밀번호를 입력하거나 관리자만 열람 가능
- 좋아요(추천) 및 대표 공인중개사 공식 답변 뱃지

### ③ 관리자 콘솔 대시보드 (`admin.html`)
- 보안 비밀번호 로그인 (`ADMIN_PASSWORD`, 초기값: `chamgood2026!`)
- **실시간 대시보드 지표**:
  - 총 게시글 수, 오늘 신규 등록 건수
  - 🚨 **답변 대기 중인 문의 실시간 카운트** (원클릭 필터링 지원)
  - 총 조회수 및 추천 수
- **GitHub DB 연동 진단 패널**:
  - 현재 연동 상태(🟢 정상 연동 / 🟡 로컬 모드) 및 마지막 커밋 해시 표시
  - 원클릭 JSON DB 전체 백업 다운로드
- **대표 공식 답변 작성**:
  - 자주 쓰는 템플릿(전화상담 안내, 매물 브리핑 발송 완료, 임장 예약 확정 등) 원클릭 적용
  - 작성 즉시 GitHub에 커밋되어 고객 화면에 골드 인증 뱃지로 노출
- **게시글 관리**:
  - 상단 공지 고정 토글
  - 비밀글 원문 및 고객 연락처 즉시 열람
  - 악성 글 삭제

---

## 🚀 5. 로컬 실행 및 테스트 방법

외부 라이브러리 설치 없이 순수 Node.js로 실행됩니다:

```bash
# 1. 로컬 Vercel 서버리스 시뮬레이션 서버 구동
node server.js
```

브라우저 접속 주소:
- 🌐 홈페이지: `http://localhost:3000`
- 📋 소통게시판: `http://localhost:3000/board.html`
- 🛡️ 관리자 대시보드: `http://localhost:3000/admin.html`
- ⚡ 게시판 API: `http://localhost:3000/api/board`
