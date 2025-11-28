# 프론트엔드 챌린지 로드맵

이 프로젝트는 **핵심 프론트엔드 역량**을 기르기 위해 기획된 주간 챌린지 모음입니다. 각 주차별로 하나의 실용적인 과제를 깊이 있게 구현합니다.

## 챌린지 개요

|    주차     | 주제 (챌린지명)                                   | 핵심 목표 기술 및 역량                                                            | 규모/난이도 |
| :---------: | :------------------------------------------------ | :-------------------------------------------------------------------------------- | :---------: |
| **Week 1**  | **인터랙티브 데이터 대시보드 위젯**               | 상태 관리, 외부 차트 라이브러리 연동, 동적 필터링.                                |    기본     |
| **Week 2**  | **드래그 앤 드롭 파일 업로더**                    | Vanilla JS, 브라우저 `Drag & Drop API`, `FileReader`, UX 개선.                    |    기본     |
| **Week 3**  | **다국어 지원 시스템 구축**                       | `i18n` 라이브러리 통합, 상태 지속성(`localStorage`), 복수형 처리.                 |    보통     |
| **Week 4**  | **대용량 데이터 필터링 테이블**                   | 성능 최적화(Debounce), 실시간 검색, 반응형 테이블 디자인, 정렬 로직.              |    보통     |
| **Week 5**  | **커스텀 폼 유효성 검사 라이브러리**              | Vanilla JS 모듈 설계, 스키마 기반 유효성 검사, 객체 지향.                         |    보통     |
| **Week 6**  | **WYSIWYG 마크다운 에디터 개발**                  | 복잡한 DOM 조작, `contentEditable` HTML → Markdown 변환, 커서 제어.               |   어려움    |
| **Week 7**  | **실시간 협업 화이트보드 (드로잉)**               | `Canvas API` 활용, Node.js + WebSocket 실시간 동기화, 드로잉 데이터 관리.         |   어려움    |
| **Week 8**  | **Next/Nuxt 기반의 고성능 랜딩 페이지 목업 구현** | SSR/SSG, Core Web Vitals 최적화, 이미지/폰트 최적화, SEO.                         |    최상     |
| **Week 9**  | **다기능 모달 (Modal) 컴포넌트**                  | 접근성(A11y) Focus Trap, 본문 스크롤 방지, 외부/ESC 닫기, 애니메이션.             |    보통     |
| **Week 10** | **토스트(Toast) 알림 시스템**                     | 여러 알림 큐 관리, 자동 소멸, Hover 일시 정지, 유형별 스타일, CSS 애니메이션.     |    보통     |
| **Week 11** | **아코디언 (Accordion) 컴포넌트**                 | 높이 애니메이션(`scrollHeight`), 싱글/멀티 토글 모드, WAI-ARIA 접근성.            |    보통     |
| **Week 12** | **클릭 아웃사이드 훅/디렉티브**                   | `document` 이벤트 리스너 관리, `Node.contains()`, 재사용 가능한 훅/디렉티브 설계. |    보통     |

## 주차별 상세 가이드

각 주차별 상세 구현 요구사항, 필수 단계, 심화 도전 과제는 다음 파일을 참고해 주세요.

- [**1주차 가이드**](./apps//week1/README.md): 대시보드 위젯
- [**2주차 가이드**](./apps//week2/README.md): 파일 업로더
- [**3주차 가이드**](./apps//week3/README.md): 다국어 지원
- [**4주차 가이드**](./apps//week4/README.md): 필터링 테이블
- [**5주차 가이드**](./apps//week5/README.md): 폼 검사 라이브러리
- [**6주차 가이드**](./apps//week6/README.md): 마크다운 에디터
- [**7주차 가이드**](./apps//week7/README.md): 실시간 화이트보드
- [**8주차 가이드**](./apps//week8/README.md): 고성능 랜딩 페이지
- [**9주차 가이드**](./apps//week9/README.md): 다기능 모달
- [**10주차 가이드**](./apps//week10/README.md): 토스트 알림 시스템
- [**11주차 가이드**](./apps//week11/README.md): 아코디언 컴포넌트
- [**12주차 가이드**](./apps//week12/README.md): 클릭 아웃사이드 훅/디렉티브

## 주요 기술 스택

각 주차별 요구사항에 따라 유연하게 선택 가능하며, 아래 기술이 주로 사용됩니다.

- **프레임워크:** React, Vue, Svelte (선택적)
- **기본:** Vanilla JavaScript, HTML5, CSS3
- **백엔드/실시간:** Node.js, WebSocket (Socket.io), Firebase (선택적)
- **프레임워크:** Next.js / Nuxt.js (8주차)
- **특수 API:** Canvas API, Drag and Drop API, Intersection Observer, FileReader API
- **라이브러리:** Chart.js/Recharts (시각화), marked.js (마크다운 파싱), i18next (다국어)
