import type { Dictionary } from "../dictionary.types";

export const ko: Dictionary = {
  meta: {
    siteName: "Jin-mo Kim — Portfolio",
    description:
      "자녀 단말부터 서버, 보호자 앱, 배포까지 한 제품을 끝까지 만듭니다.",
  },
  nav: {
    home: "홈",
    about: "소개",
    experience: "경력",
    projects: "프로젝트",
    resume: "이력서",
    contact: "연락처",
    email: "이메일",
  },
  hero: {
    name: "김진모",
    nameRoman: "Jin-mo Kim",
    roleTitle: "Full-stack Engineer",
    positioningPre: "자녀 단말부터 서버, 보호자 앱, 배포까지",
    positioningEmphasis: "한 제품을 끝까지",
    positioningPost: " 만듭니다.",
    subtitle:
      "(주)사운드마인드에서 자녀 보호·교육 서비스의 앱·서버·웹·배포를 담당하고 있습니다.",
    metaChips: ["React Native", "Spring Boot", "Next.js", "Android Native"],
    ctaPrimary: "프로젝트 보기",
    ctaSecondary: "이력서",
  },
  stats: {
    eyebrow: "Highlights",
    title: "한눈에 보는 하이라이트",
    subtitle: "근거를 댈 수 있는 숫자만 적었습니다.",
    items: [
      { value: "100%", label: "위치 전송 성공률", meta: "기존 평균 1.17초 만에 데이터 끊김 → 최소 6초 유지" },
      { value: "89", label: "위치 해석 단위 테스트", meta: "체류·이동·공백 판정 규칙" },
      { value: "4개층", label: "담당 범위", meta: "모바일 네이티브 · 백엔드 · 웹 · 배포" },
      { value: "ACL 2026", label: "논문 채택 · 공저자", meta: "WIGVO — 실시간 전화 통역 · Demo Track" },
    ],
  },
  about: {
    eyebrow: "About",
    title: "한 제품을 끝까지 만듭니다",
    paragraphs: [
      "(주)사운드마인드에서 **MX 매니저**로 일하며 자녀 보호·교육 서비스의 **앱, 서버, 웹, 배포**까지 함께 맡고 있습니다. 한 제품을 놓고 자녀 단말부터 서버, 보호자 앱, 배포까지 전부 직접 만들어 왔습니다.",
      "가장 오래 매달린 문제는 **자녀 단말에서 위치를 빠뜨리지 않고 보내는 일**이었습니다. 관리 정책 때문에 데이터가 평소 꺼져 있고 로그도 볼 수 없는 환경이라, 데이터를 켜고 끄는 요청을 한 곳으로 모아 전송 도중 끊기는 일을 없앴습니다. 절전 모드에서 타이머가 45초 대신 **최대 357초**까지 밀리는 것도 직접 재서 보정했습니다.",
      "보호자 앱에서는 **\"틀릴 바에는 보여주지 않는다\"**를 기준으로 삼았습니다. 이동 수단 추측에 조건을 세 개 걸고, 구버전 앱에는 해석 화면을 아예 띄우지 않았습니다. 해석 규칙은 순수 함수로 분리해 **단위 테스트 89개**로 지키고 있습니다.",
      "회사 밖에서는 **WIGTN CREW**에서 AI 제품을 만듭니다. 일반 전화 통화를 실시간 통역하는 **WIGVO**는 **ACL 2026 System Demonstrations**에 채택돼 공저자로 참여했고, 프로덕션에서 발신자→수신자 **555ms 지연**과 **147통 중 에코 루프 0건**을 기록했습니다. **Snowflake AI & Data Hackathon Korea 2026 준우승**도 같은 팀에서 함께 했습니다.",
      "회사 일에서도 **AI를 제품에 붙이는 쪽**을 주로 맡았습니다. KOCCA 시험 플랫폼에서 음성 인식·합성 파이프라인과 AI 학습 데이터셋 구축을 담당하며, 모델을 붙이는 것보다 **붙인 뒤에 안 깨지게 만드는 일**에 시간을 더 썼습니다.",
      "앞으로도 화면부터 서버, 배포까지 **한 제품을 끝까지 책임지는 방식**으로 일하고 싶습니다.",
    ],
    chips: ["Full-stack", "Mobile Native", "AI Integration", "Infra & Deploy"],
  },
  career: {
    eyebrow: "Career",
    title: "경력 사항",
    description: "실무 경력 · 학력 · 교육 수료 · 어학과 자격을 한곳에 모았습니다.",
  },
  experience: {
    eyebrow: "Experience",
    title: "실무 경력",
    subtitle: "회사에서 책임지고 다룬 서비스와 영역.",
    viewProjectLabel: "바로가기",
    items: [
      {
        period: "2025.07 — 현재",
        company: "(주)사운드마인드",
        role: "MX 매니저",
        summary:
          "자녀 보호·교육 서비스의 앱·서버·웹·배포를 함께 담당.",
        bullets: [
          {
            title: "오디야 — 자녀 단말 위치 수집",
            detail:
              "데이터가 평소 꺼져 있는 관리 단말에서 전송이 끊기던 문제를 해결. 데이터 개방 요청을 한 곳으로 모으고 최소 6초 유지 규칙을 넣어 전송 성공률 100% 확보.",
            projectSlug: "odiya-child",
          },
          {
            title: "오디야 — 보호자 앱",
            detail:
              "\"틀릴 바에는 보여주지 않는다\"를 기준으로 위치 해석 UI를 설계. 지하철 추론 3단 필터, 체류 군집화, 자녀앱 버전별 화면 게이트. 단위 테스트 89개.",
            projectSlug: "odiya-parents",
          },
          {
            title: "오디야 — 위치 수집 서버",
            detail:
              "Redis 큐로 60초마다 최대 5,000건씩 나눠 저장하고, 실패 시 순서를 지켜 복구. 깨진 데이터 한 건이 전체 저장을 멈추던 구조를 제거.",
            projectSlug: "odiya-backend",
          },
          {
            title: "KOCCA 한국어 말하기 시험 플랫폼",
            detail:
              "응시 화면·채점 관리자 30여 개·STT/TTS 파이프라인·AI 학습 데이터셋 구축까지 전 영역 담당. 배포 시 파괴적 스키마 변경을 자동 차단.",
            projectSlug: "kocca-kstt",
          },
          {
            title: "모하니 — 자녀 스마트폰 사용 관리",
            detail:
              "푸시가 유실돼도 단말이 설정을 스스로 따라잡는 구조 설계. 접근성 권한이 꺼져도 차단이 유지되도록 이중화.",
            projectSlug: "mohani",
          },
          {
            title: "통합 로그인 서버",
            detail:
              "사용자 종류별 토큰 정책 분리. 토큰이 탈취돼 재사용되면 해당 계정 토큰 전부를 즉시 무효화.",
            projectSlug: "soundmind-sso",
          },
          {
            title: "배포·운영",
            detail:
              "세 개 제품에 무중단 배포 구축. Jenkins 자동 배포와 서버·로그 모니터링 구성.",
          },
        ],
        tags: [
          "React Native",
          "Android",
          "Spring Boot",
          "Next.js",
          "TypeScript",
          "Redis",
          "MariaDB",
          "Docker",
          "Nginx",
          "Jenkins",
        ],
      },
    ],
  },
  education: {
    eyebrow: "Education",
    title: "학력 사항",
    subtitle: "정규 교육 과정으로 거쳐온 학교.",
    items: [
      {
        period: "2025.03 — 2025.06",
        institution: "강서폴리텍대학교",
        major: "스마트금융과 (조기 취업으로 중도 이수)",
        note: "프론트/백엔드/DB/AI/Docker 전반을 다루는 부트캠프형 커리큘럼.",
      },
      {
        period: "2016 — 2024",
        institution: "울산대학교",
        major: "중어중문 / 일어일문 (4년제 학사)",
        note: "복수 전공으로 중국어·일본어 양 언어를 학습. 일본어는 졸업 시점에 JLPT N1 취득.",
      },
    ],
  },
  training: {
    eyebrow: "Training",
    title: "교육 및 수료",
    subtitle: "정규 학력 외에 따로 이수한 부트캠프·단기 과정.",
    viewProjectLabel: "바로가기",
    items: [
      {
        period: "2024.06 — 2024.12",
        institution: "오즈코딩스쿨 - 프론트엔드 과정",
        program: "6개월 과정 수료",
        note:
          "기업협업과 팀 프로젝트를 통해 실전 제품 사이클 전반을 경험.",
        bullets: [
          {
            title: "MovieGet — 영화 예매 사이트 (팀장)",
            detail:
              "3인 팀에서 커밋 1위(50%, 185건). Toss Payments 결제 통합 + TMDB API 연동 + 리스트 무한 스크롤 리팩토링 + AWS 배포 책임. 통합 머지 PR과 빌드 블로커도 직접 처리.",
            projectSlug: "movieget",
          },
          {
            title: "MICGolf — 파파타랩스 기업협업 자사몰",
            detail:
              "4인 팀에서 커밋 2위(33%, 126건). PortOne 결제 통합, 이메일/네이버/카카오 소셜 로그인, 백오피스 CRUD, 카테고리·상품 무한 스크롤 등 e-커머스 핵심 영역 담당.",
            projectSlug: "micgolf",
          },
        ],
        tags: ["React", "TypeScript", "Vite", "Zustand", "TanStack Query"],
      },
    ],
  },
  achievements: {
    eyebrow: "Certifications & Awards",
    title: "자격증 · 수상",
    subtitle: "공식 시험으로 검증된 자격과 외부에서 인정받은 수상 이력.",
    viewProjectLabel: "바로가기",
    items: [
      {
        kind: "language",
        date: "2022",
        title: "JLPT N1 (일본어능력시험 1급)",
        meta: "비즈니스 회화는 보강 중 / 한자는 문맥 추론 위주",
      },
      {
        kind: "award",
        date: "2026",
        title: "Snowflake 2026 해커톤 준우승",
        meta: "wigtn-for-snowflake · Team WIGTN CREW",
        projectSlug: "wigtn-snowflake",
        medal: "silver",
      },
      {
        kind: "award",
        date: "2026",
        title: "ACL 2026 Demo Track 채택",
        meta: "wigvo-v2 · Team WIGTN CREW",
        projectSlug: "wigvo-v2",
        medal: "gold",
      },
    ],
  },
  techStack: {
    eyebrow: "Tech Stack",
    title: "사용 기술",
    subtitle: "실제 프로젝트에서 손으로 다뤄본 도구와 환경.",
    groups: [
      {
        label: "Primary Stack",
        items: ["React Native", "Spring Boot", "Next.js", "Android Native"],
      },
      { label: "Languages", items: ["TypeScript", "JavaScript", "Java", "Kotlin"] },
      {
        label: "Frontend",
        items: ["React", "React Native", "Next.js", "Expo", "Vite", "Tailwind CSS", "Zustand", "TanStack Query"],
      },
      {
        label: "Mobile Native",
        items: ["Android", "FCM", "FusedLocation", "Activity Recognition", "Samsung Knox SDK", "OTA (hot-updater)"],
      },
      { label: "Backend", items: ["Spring Boot", "NestJS", "Node.js", "JPA/Hibernate", "Prisma", "WebSocket/STOMP"] },
      { label: "Data", items: ["MariaDB", "MySQL", "Redis", "PostgreSQL (Supabase)", "Flyway"] },
      {
        label: "Infra · DevOps",
        items: ["Docker", "Nginx", "Jenkins", "무중단 배포", "Prometheus", "Grafana", "GCP Cloud Run", "GitHub Actions"],
      },
      {
        label: "AI · ML Integration",
        items: ["STT 파이프라인", "TTS (자체 호스팅 · API)", "학습 데이터셋 구축", "ffmpeg 오디오 처리", "Claude Code"],
      },
      { label: "Test", items: ["Vitest", "Playwright", "JUnit", "Testcontainers"] },
    ],
  },
  projects: {
    work: {
      eyebrow: "Work Projects",
      title: "실무 프로젝트",
      description:
        "(주)사운드마인드에서 여러 영역을 넘나들며 담당한 자사 서비스. 카드를 누르면 상세 케이스 스터디로 이동합니다.",
    },
    team: {
      eyebrow: "Team & Bootcamp",
      title: "팀 프로젝트",
      description:
        "WIGTN CREW 팀 작업물과 부트캠프 산출물. 해커톤 수상작과 본인 직접 구현이 강한 프로젝트 우선.",
    },
    viewCaseStudy: "케이스 스터디 보기",
    showMore: "더보기",
    showLess: "접기",
    backToList: "프로젝트 목록",
    noCaseStudy: "이 프로젝트는 상세 케이스 스터디를 준비 중입니다.",
    roleLabel: "역할",
    stackLabel: "사용 기술",
    periodLabel: "기간",
    items: [
      {
        slug: "odiya-child",
        category: "work",
        company: "(주)사운드마인드",
        title: "오디야 — 자녀 단말 위치 수집",
        summary:
          "데이터가 평소 꺼져 있는 관리 단말에서 위치를 빠뜨리지 않고 보내는 앱.",
        tags: ["React Native", "Android", "Java", "Kotlin", "FCM"],
        role: "설계 · 네이티브 구현",
        period: "2025.07 — 현재",
        featured: true,
        caseStudy: {
          tagline:
            "MDM이 데이터를 꺼두고 로그도 볼 수 없는 단말에서, 배터리를 아끼면서 위치를 놓치지 않는 방법.",
          role: "위치 수집 상태기계 설계 및 Android 네이티브 구현",
          period: "2025.07 — 현재",
          stack: ["React Native", "Android (Java/Kotlin)", "FusedLocation", "Activity Recognition", "FCM"],
          metrics: [
            { value: "100%", label: "전송 성공률 (기존: 평균 1.17초 만에 데이터 끊김)" },
            { value: "357초", label: "절전 모드에서 실측된 최대 타이머 지연 (예약값 45초)" },
            { value: "4/4", label: "지하철 이동 실측 건 중 좌표 위장 정확 판별" },
          ],
          blocks: [
            {
              heading: "문제",
              body:
                "이 앱이 도는 단말은 일반 스마트폰이 아니다. 관리 정책이 기기 전체의 모바일 데이터를 평소 꺼두고, 개발자 모드가 막혀 있어 로그도 뽑을 수 없다. 그런데 요구사항은 '자녀가 어디 있는지 부모가 항상 볼 수 있어야 한다'였다. 데이터가 꺼진 기기에서 주기적으로 위치를 보내야 하고, 문제가 생겨도 원인을 볼 방법이 없는 상태에서 안정성을 확보해야 했다.",
            },
            {
              heading: "제약",
              body:
                "쉬운 해법이 전부 막혀 있었다. 서버가 먼저 앱에 연락할 수 없어서(네트워크가 닫혀 있으므로) 푸시로 제어할 수 없었고, 로그를 볼 수 없어서 재현되지 않는 버그는 추측으로만 고쳐야 했다. 게다가 OS 절전 정책이 예약한 타이머를 임의로 미룬다.",
              bullets: [
                "데이터를 켜려면 관리 에이전트에 요청해야 하는데, 켜지는 데 3~5초가 걸리고 완료 신호가 없다",
                "절전 모드에서 예약 타이머가 45초 대신 최대 357초까지 밀린다 (직접 측정)",
                "GPS를 계속 켜두면 배터리가 하루를 못 간다",
              ],
            },
            {
              heading: "결정",
              body:
                "네 가지를 바꿨다. 첫째, 데이터를 켜고 끄는 요청을 여러 곳에서 하던 것을 한 곳으로 모으고, 누가 요청했는지를 세어 마지막 사용자가 끝날 때까지 끄지 않도록 했다. 최소 6초는 켜두는 규칙도 넣었다. 둘째, 타이머를 믿지 않고 실제 시각을 기준으로 다시 확인하는 장치를 뒀다. 셋째, GPS를 켜는 조건을 시간이 아니라 '마지막 위치를 받은 지 얼마나 됐나'로 바꿨다. 넷째, 받은 좌표를 그대로 믿지 않고 세 단계로 검증했다.",
              bullets: [
                "데이터 개방·반납을 한 곳에서 관리 — 요청자별 카운트, 최소 유지 6초, 반납 누락 대비 장치 4중",
                "실제 시각 기준 재확인 — 절전 모드의 타이머 지연을 보정",
                "GPS 점등 조건을 '보유 위치의 나이'로 — 전송에 실패해도 조건이 잠기지 않는 구조",
                "좌표 3단 검증 — 정확도 게이트, 위성 개수로 기지국 좌표 판별, 이동 속도 타당성",
              ],
            },
            {
              heading: "결과",
              body:
                "전송 도중 데이터가 끊기던 문제가 사라졌다. 기존에는 데이터가 켜진 상태가 평균 1.17초밖에 유지되지 않아 전송이 자주 실패했는데, 최소 6초 유지 규칙을 넣은 뒤로는 전송 성공률이 100%가 됐다. GPS 점등 조건을 바꾼 뒤로는 전송에 한 번 실패했다고 앱이 영영 침묵하는 일도 없어졌다. 좌표 검증은 지하철 이동 실측 4건에서 기지국 좌표를 전부 정확히 걸러냈고, 확신이 없으면 아예 표시하지 않도록 해서 부모 앱이 잘못된 위치를 그리지 않게 됐다.",
            },
          ],
        },
      },
      {
        slug: "odiya-parents",
        category: "work",
        company: "(주)사운드마인드",
        title: "오디야 — 보호자 앱",
        summary:
          "불확실한 위치 데이터를 과장 없이 보여주는 지도 앱. 머문 곳·이동 경로·실시간 추적.",
        tags: ["React Native", "TypeScript", "TanStack Query", "Zustand", "Naver Map"],
        role: "프론트엔드 설계 · 구현",
        period: "2025.07 — 현재",
        featured: true,
        caseStudy: {
          tagline:
            "GPS는 자주 틀린다. 틀린 걸 그럴듯하게 보여주는 대신, 모르는 건 모른다고 말하는 UI.",
          role: "위치 해석 로직 및 화면 설계·구현",
          period: "2025.07 — 현재",
          stack: ["React Native", "TypeScript", "TanStack Query", "Zustand", "Naver Map", "STOMP"],
          metrics: [
            { value: "89개", label: "위치 해석 로직 단위 테스트" },
            { value: "956역", label: "지하철 추론에 쓰는 역 데이터 (47개 노선)" },
            { value: "3단", label: "이동 수단 추측 필터 — 역 위치·거리·소요시간" },
          ],
          blocks: [
            {
              heading: "문제",
              body:
                "부모가 보는 화면은 자녀앱이 올린 좌표를 그대로 찍는 게 아니라, 해석해서 보여줘야 한다. '집에 2시간 있었다', '지하철로 이동한 것 같다', '지금 학교 근처다' 같은 말로 바꿔야 쓸모가 있다. 그런데 원본 데이터가 깨끗하지 않다. 실내에서는 GPS가 흔들리고, 지하철에서는 아예 끊긴다. 해석을 잘못하면 부모가 잘못된 정보를 사실로 믿는다.",
            },
            {
              heading: "제약",
              body:
                "가장 큰 제약은 데이터 자체가 아니라 사용자 쪽에 있었다. 자녀앱은 스토어를 통해 배포되는데, 실제로 쓰는 단말의 대부분이 구버전이었다. 새 기능으로 만든 해석 화면은 구버전 앱이 보내지 않는 데이터를 필요로 했다. 그리고 실시간 추적은 앱과 서버가 각자 상태를 판단하면서 서로 어긋나는 일이 잦았다.",
              bullets: [
                "실내 GPS 흔들림으로 한 장소 체류가 여러 개로 쪼개짐",
                "지하철 구간은 좌표가 통째로 비어 있음 — 추측 외에는 방법이 없음",
                "구버전 자녀앱은 해석에 필요한 필드를 보내지 않음",
              ],
            },
            {
              heading: "결정",
              body:
                "관통하는 원칙을 하나 정했다. \"틀릴 바에는 보여주지 않는다.\" 이 원칙을 세 곳에 똑같이 적용했다. 지하철 이동은 역 위치·거리·소요시간 세 조건을 모두 만족할 때만 표시하고 하나라도 어긋나면 침묵한다. 머문 곳은 일정 반경을 넘어가야 다른 장소로 나누고, 자정을 넘긴 체류는 날짜별로 잘라 계산한다. 구버전 앱 사용자에게는 해석 화면 자체를 띄우지 않는다. 실시간 추적은 앱이 판단하지 않고 서버 상태만 따라가게 했다.",
              bullets: [
                "지하철 추론 3단 필터 — 하나라도 안 맞으면 표시하지 않음",
                "체류 군집화에 반경 기준 분리 + 자정 분할 규칙",
                "자녀앱 버전별 UI 게이트 — 없는 데이터를 있는 것처럼 보이지 않게",
                "실시간 추적은 서버 상태만 따라가고, 푸시는 화면 갱신을 앞당기는 신호로만 사용",
              ],
            },
            {
              heading: "결과",
              body:
                "해석 규칙은 전부 순수 함수로 분리하고 단위 테스트 89개를 붙였다. 규칙이 미묘해서(반경 몇 배, 자정 처리, 공백 판정 기준) 코드만으로는 지킬 수 없었기 때문이다. 실내 체류가 쪼개지던 문제와 잘못된 지하철 추측이 사라졌고, 구버전 사용자에게 빈 화면이 보이던 문제도 없어졌다. 부가로, 채팅 메시지가 중간에 잘려 도착하는 원인을 추적해 React Native가 문자열 전송 시 특정 문자에서 자르는 문제임을 확인하고 전송 방식을 바꿔 해결했다.",
            },
          ],
        },
      },
      {
        slug: "kocca-kstt",
        category: "work",
        company: "(주)사운드마인드",
        title: "KSTT — 한국어 말하기 시험 플랫폼",
        summary:
          "응시 화면부터 채점 관리자, STT·TTS 파이프라인, AI 학습 데이터셋 구축까지 담당한 Next.js 풀스택 서비스.",
        tags: ["Next.js", "TypeScript", "Prisma", "STT", "TTS", "Docker"],
        role: "풀스택 (전 영역)",
        period: "2025.07 — 현재",
        featured: true,
        caseStudy: {
          tagline:
            "STT·TTS를 제품의 중심에 놓되, 운영 중에 무엇이 바뀌어도 이미 치른 시험 결과는 흔들리지 않게 만드는 일.",
          role: "응시 · 채점 관리자 · 음성 인식 파이프라인 · 배포 전 영역",
          period: "2025.07 — 현재",
          stack: ["Next.js 15", "React 19", "TypeScript", "Prisma", "MySQL", "STT", "TTS", "ffmpeg", "Docker"],
          metrics: [
            { value: "30여 개", label: "채점·운영 관리자 화면" },
            { value: "50개", label: "데이터 모델 규모" },
            { value: "2종", label: "TTS 제공자 분기 — 자체 호스팅 모델 + 외부 API" },
          ],
          blocks: [
            {
              heading: "문제",
              body:
                "외국인 학습자가 브라우저에서 발음과 말하기를 녹음해 응시하고, 그 녹음을 음성 인식으로 전사한 뒤 채점자가 채점하는 서비스다. 최종 목적은 채점 결과만이 아니라 개인정보를 지우고 음량을 고르게 맞춘 AI 학습용 데이터셋을 만드는 것이었다. 문제는 이 전체가 운영 중에도 계속 바뀐다는 점이었다. 문항을 고치고, 회차를 추가하고, 배포를 한다. 그 와중에 이미 치른 시험 결과는 절대 변하면 안 된다.",
            },
            {
              heading: "제약",
              body:
                "무중단 배포를 쓰는데, 배포 도중에는 예전 코드와 새 코드가 잠시 같이 돈다. 이때 DB 구조가 바뀌면 예전 코드가 깨진다. 그리고 음성 인식 작업은 시간이 오래 걸려 별도 프로그램이 처리하는데, 실수로 두 개가 동시에 돌면 같은 녹음을 중복 처리한다. 응시자 쪽에서는 주소를 조작하거나 번역 기능으로 문제를 읽는 우회 경로가 있었다.",
            },
            {
              heading: "결정",
              body:
                "'되돌릴 수 없는 것은 건드리지 않는다'를 기준으로 네 가지를 정했다. 배포할 때 DB 구조 변경은 추가만 허용하고, 컬럼을 지우거나 데이터를 삭제하는 명령이 하나라도 있으면 배포를 멈춘다. 녹음은 재응시를 해도 지우지 않고 남긴다. 문항은 응시 시점의 내용을 따로 보관해서, 나중에 고쳐도 이미 치른 회차는 그대로 유지된다. 음성 인식 프로그램은 살아 있는지 주기적으로 표시하게 해서 하나만 돌도록 막았다.",
              bullets: [
                "배포 시 스키마 변경은 추가 전용 — 파괴적 명령 감지되면 배포 중단",
                "녹음은 삭제하지 않고 세대로 쌓음 — 관리자 재응시와 자가 재녹음을 구분",
                "회차별 문항을 응시 시점 그대로 보관",
                "음성 인식 작업 중복 실행 차단 — 살아 있음 표시 기반",
                "응시 화면 우회 경로 차단 — 주소 조작, 번역 기능 악용, 마이크 테스트 유효성",
              ],
            },
            {
              heading: "AI 파이프라인",
              body:
                "이 서비스에서 AI는 부가 기능이 아니라 제품의 중심이다. 응시자가 녹음을 마치면 자체 호스팅 STT 서버가 전사하고, 문항 안내 음성은 TTS로 생성하며, 최종 산출물은 AI 학습용 데이터셋이다. 세 갈래 모두 운영 중에 멈추면 안 되는 경로라, 모델을 붙이는 것보다 붙인 뒤에 안 깨지게 만드는 쪽에 시간을 더 썼다.",
              bullets: [
                "STT 전사를 별도 상시 워커로 분리 — 동시 처리 상한을 두고, 작업은 행 잠금으로 하나씩 선점",
                "워커가 살아 있는지 주기적으로 기록하게 해 이중 실행을 차단하고, 정상 종료와 연락 두절을 구분",
                "TTS는 자체 호스팅 모델과 외부 API 두 갈래를 두고 음성 ID 접두어로 분기 — 한쪽이 막혀도 대체 가능",
                "합성 음성은 ffmpeg로 속도를 후처리해 문항 유형별 속도 기준을 맞춤",
                "학습 데이터셋은 음원 1개를 1행으로, 개인정보를 지우고 익명 ID로 묶어 내보내도록 자동화",
              ],
            },
            {
              heading: "결과",
              body:
                "배포가 스키마 사고로 실패하는 일이 없어졌다. 파괴적 명령은 배포 스크립트가 자동으로 걸러내기 때문에, 실수로 마이그레이션에 DROP을 넣어도 서버에 도달하지 않는다. 문항을 운영 중에 수정해도 진행 중이거나 이미 끝난 회차의 결과가 변하지 않는다. STT·TTS·데이터셋 세 파이프라인은 모두 사람이 지켜보지 않아도 도는 상태가 됐고, 녹음이 쌓이면 학습용 데이터로 나가는 과정까지 자동화됐다.",
            },
          ],
        },
      },
      {
        slug: "odiya-backend",
        category: "work",
        company: "(주)사운드마인드",
        title: "오디야 — 위치 수집 서버",
        summary:
          "한꺼번에 들어오는 위치 데이터를 잃지 않고 저장하는 Spring Boot 서버.",
        tags: ["Spring Boot", "Java", "Redis", "MariaDB", "Flyway"],
        role: "백엔드",
        period: "2025.07 — 현재",
      },
      {
        slug: "mohani",
        category: "work",
        company: "(주)사운드마인드",
        title: "모하니 — 자녀 스마트폰 사용 관리",
        summary:
          "부모가 자녀 스마트폰의 앱 사용을 원격 제어하는 서비스. 서버·자녀앱·부모앱 담당.",
        tags: ["React Native", "Spring Boot", "Android", "Knox SDK", "FCM"],
        role: "서버 · 자녀앱 · 부모앱",
        period: "2025.07 — 현재",
      },
      {
        slug: "soundmind-sso",
        category: "work",
        company: "(주)사운드마인드",
        title: "통합 로그인 서버",
        summary:
          "여러 자사 서비스가 함께 쓰는 로그인·계정 서버. 사용자 종류별 토큰 정책 설계.",
        tags: ["Spring Boot", "Java", "MariaDB", "Redis", "Next.js"],
        role: "백엔드 · 운영 대시보드",
        period: "2025.07 — 현재",
      },
      {
        slug: "wigtn-snowflake",
        category: "team",
        company: "WIGTN CREW",
        title: "wigtn-for-snowflake",
        summary:
          "Snowflake AI & Data Hackathon Korea 2026 준우승작. 부상 Mac mini를 팀 홈서버로 운영.",
        tags: ["Snowflake", "Self-hosting"],
        role: "공동 개발 · 인프라",
        award: "Snowflake 2026 준우승",
        awardTier: "silver",
        github: "https://github.com/wigtn/wigtn-for-snowflake",
      },
      {
        slug: "wigvo-v2",
        category: "team",
        company: "WIGTN CREW",
        title: "WIGVO — 실시간 전화 통역",
        summary:
          "일반 전화 통화를 양방향 실시간 통역. 상대는 앱을 깔지 않아도 됩니다. ACL 2026 채택, 공저자 5인 중 1인.",
        tags: ["OpenAI Realtime API", "Twilio", "FastAPI", "Next.js", "Python"],
        role: "공저자 · 개발 참여",
        award: "ACL 2026 채택",
        awardTier: "gold",
        featured: true,
        github: "https://github.com/wigtn/wigvo-v2",
        youtube: "https://youtu.be/_ixVEnHJxjk",
        caseStudy: {
          tagline:
            "웹 클라이언트와 아무 전화번호 사이를 두 개의 실시간 음성 세션으로 잇는다. 상대방은 앱도, 통신사 연동도 필요 없이 그냥 전화를 받으면 된다.",
          role: "공저자 (5인 중 1인) · 개발 참여",
          period: "2026",
          stack: ["OpenAI Realtime API", "Twilio Media Streams", "FastAPI", "Python 3.12", "Next.js 16"],
          metrics: [
            { value: "555ms", label: "발신자 → 수신자 중간 지연 (프로덕션 실측)" },
            { value: "0건", label: "147통 중 에코 유발 번역 루프" },
            { value: "$0.28", label: "통화 1분당 비용" },
          ],
          blocks: [
            {
              heading: "무엇인가",
              body:
                "일반 전화망(PSTN) 통화에서 한국어와 영어를 양방향으로 실시간 통역하는 오픈소스 시스템이다. 웹 클라이언트와 임의의 전화번호 사이를 두 개의 동시 음성 세션으로 연결하고, 전송은 통신 API의 미디어 스트림을 쓴다. 받는 쪽은 앱을 설치할 필요도, 통신사와 연동할 필요도 없다. ACL 2026 System Demonstrations 트랙에 채택됐고 MIT 라이선스로 공개돼 있다.",
            },
            {
              heading: "풀어야 했던 문제",
              body:
                "전화망에서 양방향 통역을 하면 고유한 고장이 생긴다. 통역된 음성이 상대 스피커로 나가고, 그 소리가 마이크로 다시 들어와 또 번역되는 에코 루프다. 한 번 걸리면 통화가 끝날 때까지 같은 말이 되풀이된다. 게다가 전화망은 대역폭이 좁고(G.711 협대역) 지연에 민감해서, 흔한 에코 제거 기법을 그대로 쓰기 어렵다.",
            },
            {
              heading: "해법",
              body:
                "논문의 기여는 이중 세션 에코 게이팅(dual-session echo gating)이다. 두 세션을 독립적으로 두되, 결정론적 무음 주입과 에너지 기반 음성 활동 감지로 어느 쪽이 말할 차례인지를 판정해 자기 출력이 되돌아오는 경로를 막는다. 프로덕션 배포에서 발신자→수신자 중간 지연 555ms, 147통 통화 중 에코 루프 0건, 분당 0.28달러를 기록했고 한영 통화 155통으로 평가했다.",
            },
          ],
        },
      },
      {
        slug: "wigex",
        category: "team",
        company: "WIGTN CREW",
        title: "wigex — 여행 가계부",
        summary:
          "NestJS·Prisma 백엔드와 Expo 모바일을 한 저장소로 운영. GCP Cloud Run 배포.",
        tags: ["NestJS", "Prisma", "Supabase", "Expo", "GCP Cloud Run"],
        role: "백엔드 · 모바일 · 인프라",
        status: "In progress",
        github: "https://github.com/wigtn/wigex",
      },
      {
        slug: "wigtn-coding",
        category: "team",
        company: "WIGTN CREW",
        title: "wigtn-coding",
        summary:
          "팀 개발 워크플로우를 표준화한 Claude Code 플러그인. AI 도구를 팀 공통 규칙으로 만드는 시도.",
        tags: ["Claude Code", "AI Workflow", "Developer Tooling"],
        role: "공동 개발",
        github: "https://github.com/wigtn/wigtn-plugins-with-claude-code",
      },
      {
        slug: "micgolf",
        category: "bootcamp",
        company: "파파타랩스 기업협업",
        title: "MICGolf — 골프용품 자사몰",
        summary:
          "결제·소셜 로그인·백오피스 등 커머스 핵심 영역 담당 (커밋 33%, 126건).",
        tags: ["React", "TypeScript", "Zustand", "TanStack Query", "PortOne"],
        role: "결제 · 인증 · 백오피스",
        period: "2024",
        github: "https://github.com/MICGolf/frontend",
      },
      {
        slug: "movieget",
        category: "bootcamp",
        company: "오즈코딩스쿨",
        title: "MovieGet — 영화 예매 사이트",
        summary: "3인 팀장, 커밋 1위(50%, 185건). 결제 연동과 배포 담당.",
        tags: ["React", "TypeScript", "Vite", "Toss Payments"],
        role: "팀장 · 결제 · 배포",
        period: "2024.10 — 2024.11",
        github: "https://github.com/movieget/frontend",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "함께 일하고 싶다면",
    description:
      "이메일 · GitHub · LinkedIn 으로 연락 주세요. 일본 자사 서비스 기업 포지션을 우선적으로 보고 있습니다.",
    methods: [
      {
        label: "Email",
        value: "jinmo@wigtn.com",
        href: "mailto:jinmo@wigtn.com",
      },
      {
        label: "GitHub",
        value: "github.com/morirokim",
        href: "https://github.com/morirokim",
      },
      {
        label: "LinkedIn",
        value: "linkedin.com/in/jinmo-kim",
        href: "https://www.linkedin.com/in/jinmo-kim",
      },
    ],
    copyLabel: "복사",
    copiedLabel: "복사됨",
  },
  footer: {
    contact: "연락처",
    email: "jinmo@wigtn.com",
    github: "github.com/morirokim",
    rights: "본 사이트의 모든 콘텐츠는 김진모의 작업물입니다.",
  },
  common: {
    role: "역할",
    period: "기간",
    team: "팀 규모",
    visibility: "공개",
    publicLabel: "공개",
    privateLabel: "비공개 (실무)",
    inProgress: "진행 중",
  },
};
