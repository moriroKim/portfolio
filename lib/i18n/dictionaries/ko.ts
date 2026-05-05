import type { Dictionary } from "../dictionary.types";

export const ko: Dictionary = {
  meta: {
    siteName: "Jin-mo Kim — Portfolio",
    description:
      "프론트엔드를 중심으로, 새로운 영역도 꾸준히 익혀갑니다.",
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
    roleTitle: "Frontend Engineer, always learning",
    positioningPre: "프론트엔드를 중심으로,",
    positioningEmphasis: "새로운 영역",
    positioningPost: "도 꾸준히 익혀갑니다.",
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
      { value: "9", label: "Projects shipped", meta: "실무 3 · 팀 4 · 부트캠프 2" },
      { value: "2", label: "Awards", meta: "Snowflake 2026 · ACL 2026" },
      { value: "N1", label: "JLPT", meta: "2022 취득 · 일본어 능력시험 최상위급" },
      { value: "1", label: "Self-hosted server", meta: "Mac mini · 팀 인프라" },
    ],
  },
  about: {
    eyebrow: "About",
    title: "프로덕트와 인프라를 함께 운영합니다",
    paragraphs: [
      "**디자인**에서 출발해 부트캠프를 거치며 개발자로 옮겨왔고, 지금은 (주)사운드마인드의 **MX 매니저**로 자사 서비스의 **프론트엔드와 모바일**을 만들고 있습니다.",
      "휴대폰 매장의 **계약서 자동 생성 도구**를 혼자 만들어 며칠 걸리던 양식 작업을 **5분으로** 단축한 일이 가장 기억에 남고, AI 도구 기반 팀 **WIGTN CREW**의 프로젝트는 **Snowflake 2026 준우승**과 **ACL 2026 데모트랙 채택**, 그리고 부상 Mac mini를 **팀 홈서버로 운영**하는 것으로 이어졌습니다.",
      "앞으로는 **백엔드와 인프라**까지 닿아 보고 싶고, 그 과정에서 **새로운 영역을 배우는 자세**를 가장 중요하게 생각합니다.",
    ],
    chips: ["Designer → Engineer", "AI Native", "Self-hosting", "Always Learning"],
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
          "자사 다중 서비스의 프론트엔드·모바일·백오피스를 두루 담당.",
        bullets: [
          {
            title: "Soundmind 통합 회원 시스템",
            detail:
              "React + Spring Boot + MariaDB + Redis 세션 설계로, 자사 멀티 서비스가 공유하는 인증/계정 도메인을 운영.",
            projectSlug: "soundmind-sso",
          },
          {
            title: "모하니",
            detail:
              "RN CLI 기반 자녀 스마트폰 관리 앱(앱 차단·도메인 원격 제어). CodePush로 무선 업데이트 운영.",
            projectSlug: "mohani",
          },
          {
            title: "초코파이",
            detail:
              "휴대폰 개통 채널 백오피스. 본인 단독으로 Canvas 좌표 매핑 기반 계약서 자동 생성·A4 출력 도구 설계 및 배포(Nginx + Jenkins).",
            projectSlug: "chocopie-contract",
          },
        ],
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
        period: "2023 — 2024",
        company: "하우어바웃 (여성의류 쇼핑몰)",
        role: "웹디자이너 / 퍼블리셔",
        bullets: [
          { title: "자사 쇼핑몰 디자인 + 퍼블리싱 풀사이클 담당" },
          { title: "Photoshop 시안 → HTML/CSS/JS 마크업 → Cafe24 적용" },
          { title: "시각 설계와 마크업 기본기 확립" },
        ],
        tags: ["HTML", "JavaScript", "CSS", "Photoshop", "Cafe24"],
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
        items: ["React", "React Native", "NestJS", "Spring Boot"],
      },
      {
        label: "Languages",
        items: ["TypeScript", "Java"],
      },
      {
        label: "Frontend",
        items: [
          "React",
          "React Native",
          "Next.js",
          "Expo",
          "Vite",
          "Tailwind CSS",
          "Zustand",
          "TanStack Query",
          "Styled-components",
        ],
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
        label: "AI · Tooling",
        items: ["Claude Code"],
      },
      {
        label: "OS",
        items: ["Windows", "macOS", "Ubuntu"],
      },
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
    items: [
      {
        slug: "wigex",
        category: "team",
        company: "WIGTN CREW",
        title: "wigex — 여행 가계부 / 모노레포",
        summary:
          "NestJS · Prisma 백엔드와 Expo 모바일을 모노레포로 운영. GCP Cloud Run.",
        tags: ["NestJS", "Prisma", "Supabase", "Expo", "GCP Cloud Run"],
        role: "Backend · Mobile · Infra",
        status: "In progress",
        featured: true,
        github: "https://github.com/wigtn/wigex",
      },
      {
        slug: "wigtn-snowflake",
        category: "team",
        company: "WIGTN CREW",
        title: "wigtn-for-snowflake",
        summary:
          "Snowflake 2026 해커톤 준우승. 부상 Mac mini를 팀 홈서버로 직접 운영.",
        tags: ["Snowflake", "Self-hosting", "Mac mini"],
        role: "Demo · Infra",
        award: "Snowflake 2026 준우승",
        awardTier: "silver",
        github: "https://github.com/wigtn/wigtn-for-snowflake",
      },
      {
        slug: "soundmind-sso",
        category: "work",
        company: "(주)사운드마인드",
        title: "Soundmind 통합 회원 시스템",
        summary:
          "React + Spring Boot 기반 자사 통합 인증 · 계정 도메인.",
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
          "ACL 2026 Demo Track 채택. 팀 작품에 가벼운 참여.",
        tags: ["AI", "NLP", "Demo"],
        role: "참여",
        award: "ACL 2026 채택",
        awardTier: "gold",
        github: "https://github.com/wigtn/wigvo-v2",
      },
      {
        slug: "chocopie-contract",
        category: "work",
        company: "(주)사운드마인드",
        title: "초코파이 — 계약서 저작 도구",
        summary:
          "Canvas 좌표 매핑으로 계약서 자동 생성 · A4 출력까지 단독 구현.",
        tags: ["Canvas", "TypeScript", "Spring Boot", "Nginx"],
        role: "Solo (계약서 도메인)",
      },
      {
        slug: "mohani",
        category: "work",
        company: "(주)사운드마인드",
        title: "모하니 — 자녀 스마트폰 관리 앱",
        summary:
          "자녀 스마트폰의 앱 차단 · 도메인 원격 제어 RN 앱.",
        tags: ["React Native", "Spring Boot", "Redis", "Supabase"],
        role: "프론트 · 모바일",
      },
      {
        slug: "movieget",
        category: "bootcamp",
        company: "오즈코딩스쿨",
        title: "MovieGet — 영화 예매 사이트",
        summary:
          "3인 팀장, 커밋 1위(50%). Toss Payments · TMDB 연동.",
        tags: ["React", "TypeScript", "Vite", "Toss Payments"],
        role: "Lead · 결제",
        period: "2024.10 — 2024.11",
        github: "https://github.com/movieget/frontend",
      },
      {
        slug: "micgolf",
        category: "bootcamp",
        company: "파파타랩스 기업협업",
        title: "MICGolf — 골프용품 자사몰",
        summary:
          "PortOne 결제 · 소셜 로그인 · 백오피스까지 EC 핵심 담당(33% 커밋).",
        tags: [
          "React",
          "TypeScript",
          "Zustand",
          "TanStack Query",
          "PortOne",
        ],
        role: "결제 · 인증 · 백오피스",
        featured: true,
        github: "https://github.com/MICGolf/frontend",
      },
      {
        slug: "wigtn-coding",
        category: "team",
        company: "WIGTN CREW",
        title: "wigtn-coding",
        summary:
          "팀 워크플로우를 표준화한 Claude Code 플러그인 자체 제작.",
        tags: ["Claude Code", "AI Workflow"],
        role: "AI Workflow",
        featured: true,
        github: "https://github.com/wigtn/wigtn-plugins-with-claude-code",
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
