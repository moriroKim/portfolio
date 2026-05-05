import type { Dictionary } from "../dictionary.types";

export const en: Dictionary = {
  meta: {
    siteName: "Jin-mo Kim — Portfolio",
    description:
      "Frontend-grown engineer expanding into backend and infrastructure.",
  },
  nav: {
    home: "Home",
    about: "About",
    experience: "Career",
    projects: "Work",
    resume: "Résumé",
    contact: "Contact",
    email: "Email",
  },
  hero: {
    name: "Jin-mo Kim",
    nameRoman: "김진모",
    roleTitle: "Software Engineer",
    positioningPre: "An engineer growing from frontend toward backend and",
    positioningEmphasis: "infrastructure",
    positioningPost: ".",
    subtitle: "",
    metaChips: [],
    ctaPrimary: "View projects",
    ctaSecondary: "Résumé",
  },
  stats: {
    eyebrow: "Highlights",
    title: "Highlights at a glance",
    subtitle: "Projects, awards, credentials, and self-hosted infra — in one view.",
    items: [
      { value: "9", label: "Projects shipped" },
      { value: "2", label: "Awards", meta: "Snowflake 2026 · ACL 2026" },
      { value: "N1", label: "JLPT" },
      { value: "1", label: "Self-hosted server", meta: "Mac mini · team infra" },
    ],
  },
  about: {
    eyebrow: "About",
    title: "Operating product and infrastructure together",
    paragraphs: [
      "Eight years as a web designer / front-end implementer for online apparel shops let me handle visual design and markup as a single cycle. That foundation carried into bootcamp, where I led a movie-ticketing site team and shipped an e-commerce client-collaboration project (PapaTaLabs DTC mall). I came into engineering with a designer's eye and a shopping-mall domain already in hand.",
      "Today I'm the MX Manager at Soundmind Inc., owning frontend, mobile, and backend across the company's multi-service stack. For Chocopie — our telecom-dealer operations system — I built a React 19 PDF contract-authoring tool from zero to one as the sole owner (Fabric.js + Web Worker + IndexedDB, 21,489 LOC merged in a single PR), bringing template registration from days of outside design work down to about five minutes.",
      "With WIGTN CREW, an AI-native engineering team, I built our Claude Code plugin and codified a PRD → digging → implement → quality-check loop. Every team project ships and operates on top of that workflow, and we treat it as a place to validate context and harness design for AI collaboration in practice.",
      "On top of that workflow, wigtn-for-snowflake took runner-up at Snowflake 2026 Hackathon and wigvo-v2 was accepted to ACL 2026's demo track. The Mac mini we received as the prize now runs as our team's home server, self-hosting the backends we build.",
      "On the backend side, the Mohani SSO auth server is where I redesigned the entire member lifecycle across Phase 0–4 — a Dormant → Anonymize → 3-year retention → Hard delete state machine, plus a four-layer defense (Internal API key, JWT blacklist, Webhook DLQ + idempotency, just-in-time recheck) where each threat is owned by its closest layer. That work is what's pulling my center of gravity into backend and infrastructure; long term I'm aiming at DevOps · MLOps · LLMOps.",
    ],
    chips: ["JLPT N1", "AI Native", "Self-hosting"],
  },
  career: {
    eyebrow: "Career",
    title: "Career history",
    description: "Work, education, training, and language credentials in one place.",
  },
  experience: {
    eyebrow: "Experience",
    title: "Work history",
    subtitle: "Work",
    items: [
      {
        period: "2025.07 — Present",
        company: "Soundmind Inc.",
        role: "MX Manager",
        description:
          "Owned frontend, mobile, and back-office across the company's multi-product suite. Cross-stack contributions on Soundmind Unified Identity (shared auth/account), Mohani (parent-controlled phone-management RN app), and Chocopie (carrier activation back-office).",
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
        company: "How About (women's apparel e-commerce)",
        role: "Web Designer / Publisher",
        description:
          "Owned both design and publishing on the storefront — translating visual layouts into production markup end-to-end.",
        tags: ["HTML", "JavaScript", "CSS", "Photoshop", "Cafe24"],
      },
    ],
  },
  education: {
    eyebrow: "Education",
    title: "Schools",
    subtitle: "Schools",
    items: [
      {
        period: "2025.03 — 2025.06",
        institution: "Gangseo Polytechnic College",
        major: "Smart Finance Program (left early after job offer)",
        note:
          "Bootcamp-style curriculum spanning frontend/backend/DB/AI/Docker/K8s.",
      },
      {
        period: "2016 — 2024",
        institution: "University of Ulsan",
        major: "Chinese Lit / Japanese Lit (B.A.)",
        note: "Double major covering Chinese and Japanese language and literature. Earned JLPT N1 by graduation.",
      },
    ],
  },
  training: {
    eyebrow: "Training",
    title: "Training & Programs",
    subtitle: "Bootcamps & Programs",
    items: [
      {
        period: "2024.06 — 2024.12",
        institution: "Ozcodingschool",
        program: "Frontend Bootcamp · 6 months · Completed",
        note:
          "Industry-academia collaboration (PapaTaLabs storefront) and team project (MovieGet, team lead) for hands-on end-to-end experience.",
        tags: ["React", "TypeScript", "Vite", "Zustand", "TanStack Query"],
      },
    ],
  },
  achievements: {
    eyebrow: "Languages & Certs",
    title: "Languages & Certifications",
    subtitle: "Languages & Certifications",
    items: [
      {
        kind: "language",
        date: "2022",
        title: "JLPT N1 (Japanese-Language Proficiency, Level 1)",
        meta: "Business-level still developing; reads kanji largely by context.",
      },
    ],
  },
  techStack: {
    eyebrow: "Tech Stack",
    title: "Tech I work with",
    subtitle: "Hands-on stack across the product cycle",
    groups: [
      { label: "Languages", items: ["TypeScript", "Java"] },
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
          "Mac mini self-hosting",
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
      title: "Company work",
      description:
        "Cross-stack work shipped at Soundmind Inc. Tap a card to read the full case study.",
    },
    team: {
      eyebrow: "Team & Bootcamp",
      title: "Team projects",
      description:
        "WIGTN CREW team work and bootcamp outputs. Sorted to surface hackathon wins and projects where my hands-on contribution was strongest.",
    },
    viewCaseStudy: "View case study",
    items: [
      {
        slug: "wigex",
        category: "team",
        company: "WIGTN CREW",
        title: "wigex — Travel Ledger / Monorepo",
        summary:
          "NestJS + Prisma notifications, common wallet, AI FX advice — all hand-built. Operating GCP Cloud Run (incl. Tokyo → Seoul region migration). Working across the api · admin · mobile monorepo.",
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
          "Snowflake 2026 Hackathon runner-up. Built the team's home server with the prize Mac mini, currently hosting the wigex backend.",
        tags: ["Snowflake", "Self-hosting", "Mac mini"],
        role: "Demo · Infra",
        badge: "Snowflake 2026 Runner-up",
        featured: true,
      },
      {
        slug: "soundmind-sso",
        category: "work",
        company: "Soundmind Inc.",
        title: "Soundmind Unified Identity",
        summary:
          "The shared authentication & account domain that the company's multi-service stack depends on. React + Spring Boot + MariaDB + Redis session design.",
        tags: ["React", "Spring Boot", "MariaDB", "Redis"],
        role: "MX Manager",
        period: "2025.07 — Present",
        featured: true,
      },
      {
        slug: "wigvo-v2",
        category: "team",
        company: "WIGTN CREW",
        title: "wigvo-v2",
        summary:
          "Accepted to ACL 2026 Demo Track. Team submission — light participation, low personal code contribution.",
        tags: ["AI", "NLP", "Demo"],
        role: "Participant (low code contribution)",
        badge: "ACL 2026 Accepted",
      },
      {
        slug: "chocopie-contract",
        category: "work",
        company: "Soundmind Inc.",
        title: "Chocopie — Contract Authoring Tool",
        summary:
          "Loaded mobile-carrier activation contracts into HTML Canvas, mapped fields by coordinates, rendered customer input as text on the form, and automated A4 output. Solo-owned.",
        tags: ["Canvas", "TypeScript", "Spring Boot", "Nginx"],
        role: "Solo (contract domain)",
      },
      {
        slug: "mohani",
        category: "work",
        company: "Soundmind Inc.",
        title: "Mohani — Parent-controlled phone management",
        summary:
          "Remote control of app blocking and domain access. RN CLI + CodePush operations.",
        tags: ["React Native", "Spring Boot", "Redis", "Supabase"],
        role: "Frontend · Mobile",
      },
      {
        slug: "movieget",
        category: "bootcamp",
        company: "Ozcodingschool",
        title: "MovieGet — Movie ticketing",
        summary:
          "Team lead with the highest commit count (50%). Toss Payments integration, TMDB integration. 4-week project.",
        tags: ["React", "TypeScript", "Vite", "Toss Payments"],
        role: "Lead · Payments",
        period: "2024.10 — 2024.11",
      },
      {
        slug: "micgolf",
        category: "bootcamp",
        company: "PapaTaLabs Industry-Academia",
        title: "MICGolf — Golf-equipment storefront",
        summary:
          "Owned PortOne payments, email/Naver/Kakao social login, back-office CRUD, and infinite scroll across the e-commerce core (33% of commits).",
        tags: ["React", "TypeScript", "Zustand", "TanStack Query", "PortOne"],
        role: "Payments · Auth · Back-office",
      },
      {
        slug: "wigtn-plugins",
        category: "team",
        company: "WIGTN CREW",
        title: "wigtn-plugins-with-claude-code",
        summary:
          "The Claude Code plugin underpinning our team workflow. Standardized the PRD → digging → implement → quality-check loop.",
        tags: ["Claude Code", "AI Workflow"],
        role: "AI Workflow",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's work together",
    description:
      "Reach me by email or GitHub. I'm prioritizing positions at Japanese first-party product companies.",
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
    copyLabel: "Copy",
    copiedLabel: "Copied",
  },
  footer: {
    contact: "Contact",
    email: "jinmo@wigtn.com",
    github: "github.com/morirokim",
    rights: "All content on this site is the work of Jin-mo Kim.",
  },
  common: {
    role: "Role",
    period: "Period",
    team: "Team size",
    visibility: "Visibility",
    publicLabel: "Public",
    privateLabel: "Private (work)",
    inProgress: "In progress",
  },
};
