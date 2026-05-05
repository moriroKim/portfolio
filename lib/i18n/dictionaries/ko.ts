import type { Dictionary } from "../dictionary.types";

export const ko: Dictionary = {
  meta: {
    siteName: "Jin-mo Kim — Portfolio",
    description:
      "프론트엔드 출신, 백엔드와 인프라로 활동 영역을 넓혀가는 엔지니어.",
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
    roleTitle: "Software Engineer",
    positioningPre: "프론트엔드 출신, 백엔드와",
    positioningEmphasis: "인프라",
    positioningPost: "로 활동 영역을 넓혀가는 엔지니어.",
    subtitle: "",
    metaChips: [],
    ctaPrimary: "프로젝트 보기",
    ctaSecondary: "이력서",
  },
  stats: {
    eyebrow: "Highlights",
    title: "한눈에 보는 하이라이트",
    subtitle: "프로젝트 · 수상 · 자격증 · 자체 운영 인프라까지 한 곳에 정리.",
    items: [
      { value: "9", label: "Projects shipped" },
      { value: "2", label: "Awards", meta: "Snowflake 2026 · ACL 2026" },
      { value: "N1", label: "JLPT" },
      { value: "1", label: "Self-hosted server", meta: "Mac mini · 팀 인프라" },
    ],
  },
  about: {
    eyebrow: "About",
    title: "프로덕트와 인프라를 함께 운영합니다",
    paragraphs: [
      "8년간 쇼핑몰 웹디자이너 / 퍼블리셔로 시각 설계와 마크업을 한 사이클에서 함께 다뤄온 경험은, 부트캠프에서 e-커머스 기업협업 프로젝트(파파타랩스 자사몰)와 영화 예매 사이트 팀장 역할로 자연스럽게 이어졌습니다. 디자인 감각과 쇼핑몰 도메인 이해를 자산 삼아 코드 영역으로 넘어왔습니다.",
      "현재 (주)사운드마인드의 MX 매니저로 자사 다중 서비스의 프론트엔드·모바일·백엔드를 담당하고 있습니다. 통신 대리점 통합 운영 시스템 Chocopie의 PDF 계약서 저작 도구를 React 19 기반으로 21,489 LOC 단일 PR로 0→1 구축해 통합했고(Fabric.js + Web Worker + IndexedDB), 양식 등록 시간을 수일에서 약 5분으로 단축했습니다.",
      "AI-Native 개발팀 WIGTN CREW에서는 Claude Code 플러그인을 직접 제작해 PRD → digging → implement → 품질검사 루프를 표준화했습니다. 팀의 모든 프로젝트가 이 워크플로우 위에서 출품·운영되며, AI 협업 환경에서의 컨텍스트와 하네스 설계를 실전 위에서 검증해 나가고 있습니다.",
      "이 워크플로우 위에서 출품한 wigtn-for-snowflake가 Snowflake 2026 해커톤 준우승, wigvo-v2가 ACL 2026 데모트랙에 채택되었습니다. 부상으로 받은 Mac mini를 팀 홈서버로 구축해 자체 프로젝트 백엔드를 셀프호스팅하고 있습니다.",
      "한편 Mohani SSO 인증 서버에서는 회원 라이프사이클 정책을 Phase 0~4 전 영역에 걸쳐 재설계했습니다 — 휴면→익명화→3년 보관→hard delete 상태 기계와, 외부 위조 webhook · 탈퇴 후 JWT 재사용 · 이벤트 유실/중복 · 탈퇴 후 race를 각각 가장 가까운 레이어가 책임지는 4중 방어선 도입. 이 경험을 발판으로 백엔드·인프라로 무게중심을 옮기는 중이며, 장기적으로 DevOps · MLOps · LLMOps 영역을 지향합니다.",
    ],
    chips: ["JLPT N1", "AI Native", "Self-hosting"],
  },
  career: {
    eyebrow: "Career",
    title: "경력 사항",
    description: "실무 경력 · 학력 · 교육 수료 · 어학과 자격을 한곳에 모았습니다.",
  },
  experience: {
    eyebrow: "Experience",
    title: "실무 경력",
    subtitle: "Work",
    items: [
      {
        period: "2025.07 — 현재",
        company: "(주)사운드마인드",
        role: "MX 매니저",
        description:
          "자사 다중 서비스의 프론트엔드·모바일·백오피스를 두루 담당. (1) Soundmind 통합 회원 시스템 — React + Spring Boot + MariaDB + Redis 세션 설계로 자사 멀티 서비스가 공유하는 인증/계정 도메인 운영. (2) 모하니 — RN CLI 기반 자녀 스마트폰 관리 앱(앱 차단·도메인 원격 제어), CodePush 운영. (3) 초코파이 — 휴대폰 개통 채널 백오피스, 본인 단독으로 Canvas 좌표 매핑 기반 계약서 자동 생성·A4 출력 도구 설계 및 배포(Nginx + Jenkins).",
        tags: [
          "React",
          "Spring Boot",
          "MariaDB",
          "Redis",
          "React Native",
          "Nginx",
          "Jenkins",
        ],
      },
      {
        period: "2024",
        company: "하우어바웃 (여성의류 쇼핑몰)",
        role: "웹디자이너 / 퍼블리셔",
        description:
          "자사 쇼핑몰의 디자인과 퍼블리싱을 함께 담당. Photoshop 시안 → HTML/CSS/JS 마크업 → Cafe24 커머스 플랫폼 적용까지의 사이클을 처음부터 끝까지 운영하며 시각 설계와 마크업 기본기를 다졌습니다.",
        tags: ["HTML", "JavaScript", "CSS", "Photoshop", "Cafe24"],
      },
    ],
  },
  education: {
    eyebrow: "Education",
    title: "학력 사항",
    subtitle: "Schools",
    items: [
      {
        period: "2025.03 — 2025.06",
        institution: "강서폴리텍대학교",
        major: "스마트금융과 (조기 취업으로 중도 이수)",
        note: "프론트/백엔드/DB/AI/Docker/K8s 전반을 다루는 부트캠프형 커리큘럼.",
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
    subtitle: "Bootcamps & Programs",
    items: [
      {
        period: "2024.06 — 2024.12",
        institution: "오즈코딩스쿨",
        program: "프론트엔드 부트캠프 6개월 수료",
        note:
          "기업협업(파파타랩스 자사몰)·팀 프로젝트(영화예매 사이트, 팀장)로 실전 제품 사이클 전반을 경험.",
        tags: ["React", "TypeScript", "Vite", "Zustand", "TanStack Query"],
      },
    ],
  },
  achievements: {
    eyebrow: "Languages & Certs",
    title: "어학 · 자격증",
    subtitle: "Languages & Certifications",
    items: [
      {
        kind: "language",
        date: "2022",
        title: "JLPT N1 (일본어능력시험 1급)",
        meta: "비즈니스 회화는 보강 중 / 한자는 문맥 추론 위주",
      },
    ],
  },
  techStack: {
    eyebrow: "Tech Stack",
    title: "사용 기술",
    subtitle: "Hands-on stack across the product cycle",
    groups: [
      {
        label: "Languages",
        items: ["TypeScript", "Java"],
      },
      {
        label: "Frontend",
        items: [
          "React",
          "Next.js",
          "Vite",
          "Tailwind CSS",
          "Zustand",
          "TanStack Query",
          "Styled-components",
        ],
      },
      {
        label: "Mobile",
        items: ["React Native", "Expo", "Supabase (CodePush)"],
      },
      {
        label: "Backend",
        items: ["NestJS", "Spring Boot", "Node.js", "Prisma"],
      },
      {
        label: "Data",
        items: ["MariaDB", "Redis", "Supabase (Postgres)", "SQLite"],
      },
      {
        label: "Infra · DevOps",
        items: [
          "GCP Cloud Run",
          "Docker",
          "GitHub Actions",
          "Jenkins",
          "Nginx",
          "Mac mini 셀프호스팅",
        ],
      },
      {
        label: "Integrations",
        items: ["PortOne", "Toss Payments", "FCM / Expo Push"],
      },
      {
        label: "AI · Tooling",
        items: ["Claude Code"],
      },
    ],
  },
  projects: {
    work: {
      eyebrow: "Work Projects",
      title: "회사 프로젝트",
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
    items: [
      {
        slug: "wigex",
        category: "team",
        company: "WIGTN CREW",
        title: "wigex — 여행 가계부 / 모노레포",
        summary:
          "NestJS + Prisma 알림 도메인·공통지갑·AI 환전 직접 구현. GCP Cloud Run 운영(리전 도쿄→서울 이전 포함). api · admin · mobile 모노레포 전반에 걸쳐 작업.",
        tags: ["NestJS", "Prisma", "Supabase", "Expo", "GCP Cloud Run"],
        role: "Backend · Mobile · Infra",
        badge: "In progress",
        featured: true,
      },
      {
        slug: "wigtn-snowflake",
        category: "team",
        company: "WIGTN CREW",
        title: "wigtn-for-snowflake",
        summary:
          "Snowflake 2026 해커톤 준우승작. 부상으로 받은 Mac mini를 팀 홈서버로 구축, 현재 wigex 백엔드 호스팅 담당.",
        tags: ["Snowflake", "Self-hosting", "Mac mini"],
        role: "Demo · Infra",
        badge: "Snowflake 2026 준우승",
        featured: true,
      },
      {
        slug: "soundmind-sso",
        category: "work",
        company: "(주)사운드마인드",
        title: "Soundmind 통합 회원 시스템",
        summary:
          "자사 다중 서비스가 의존하는 공통 인증·계정 도메인. React + Spring Boot + MariaDB + Redis 세션 설계.",
        tags: ["React", "Spring Boot", "MariaDB", "Redis"],
        role: "MX 매니저",
        period: "2025.07 — 현재",
        featured: true,
      },
      {
        slug: "wigvo-v2",
        category: "team",
        company: "WIGTN CREW",
        title: "wigvo-v2",
        summary:
          "ACL 2026 Demo Track 채택작. 팀 작품으로 본인 코드 기여도는 낮으며 가벼운 참여.",
        tags: ["AI", "NLP", "Demo"],
        role: "참여 (코드 기여도 낮음)",
        badge: "ACL 2026 채택",
      },
      {
        slug: "chocopie-contract",
        category: "work",
        company: "(주)사운드마인드",
        title: "초코파이 — 계약서 저작 도구",
        summary:
          "휴대폰 개통 계약서를 HTML Canvas에 로드 → 도형/고객정보를 좌표로 매핑 → 입력값을 양식에 텍스트 렌더링 → A4 출력까지 자동화. 단독 담당.",
        tags: ["Canvas", "TypeScript", "Spring Boot", "Nginx"],
        role: "Solo (계약서 도메인)",
      },
      {
        slug: "mohani",
        category: "work",
        company: "(주)사운드마인드",
        title: "모하니 — 자녀 스마트폰 관리 앱",
        summary:
          "앱 차단 / 도메인 접근 원격 제어. RN CLI · CodePush 기반 운영.",
        tags: ["React Native", "Spring Boot", "Redis", "Supabase"],
        role: "프론트 · 모바일",
      },
      {
        slug: "movieget",
        category: "bootcamp",
        company: "오즈코딩스쿨",
        title: "MovieGet — 영화 예매 사이트",
        summary:
          "팀장 + 1위 커밋(50%). Toss Payments 통합, TMDB 연동. 4주 프로젝트.",
        tags: ["React", "TypeScript", "Vite", "Toss Payments"],
        role: "Lead · 결제",
        period: "2024.10 — 2024.11",
      },
      {
        slug: "micgolf",
        category: "bootcamp",
        company: "파파타랩스 기업협업",
        title: "MICGolf — 골프용품 자사몰",
        summary:
          "PortOne 결제 통합, 이메일/네이버/카카오 소셜 로그인, 백오피스 CRUD, 무한 스크롤 등 e-커머스 핵심 영역 담당 (33% 커밋).",
        tags: [
          "React",
          "TypeScript",
          "Zustand",
          "TanStack Query",
          "PortOne",
        ],
        role: "결제 · 인증 · 백오피스",
      },
      {
        slug: "wigtn-plugins",
        category: "team",
        company: "WIGTN CREW",
        title: "wigtn-plugins-with-claude-code",
        summary:
          "팀 워크플로우 기반 Claude Code 플러그인 자체 제작. PRD → digging → implement → 품질검사 루프의 표준화.",
        tags: ["Claude Code", "AI Workflow"],
        role: "AI Workflow",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "함께 일하고 싶다면",
    description:
      "이메일 또는 GitHub로 연락 주세요. 일본 자사 서비스 기업 포지션을 우선적으로 보고 있습니다.",
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
