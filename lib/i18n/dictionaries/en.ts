import type { Dictionary } from "../dictionary.types";

export const en: Dictionary = {
  meta: {
    siteName: "Jin-mo Kim — Portfolio",
    description:
      "Anchored in frontend — always learning what's next.",
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
    roleTitle: "Frontend Engineer, always learning",
    positioningPre: "Anchored in frontend — always learning",
    positioningEmphasis: "what's next",
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
      { value: "9", label: "Projects shipped", meta: "Work 3 · Team 4 · Bootcamp 2" },
      { value: "2", label: "Awards", meta: "Snowflake 2026 · ACL 2026" },
      { value: "N1", label: "JLPT", meta: "Earned 2022 · Highest JLPT level" },
      { value: "1", label: "Self-hosted server", meta: "Mac mini · team infra" },
    ],
  },
  about: {
    eyebrow: "About",
    title: "Operating product and infrastructure together",
    paragraphs: [
      "I started in **design**, moved through bootcamp into engineering, and now work as an **MX Manager** at Soundmind — building the **frontend and mobile** sides of our services.",
      "The work I'm proudest of is a **contract-authoring tool** I built solo for our mobile-carrier channel — it cut form prep from days down to **under five minutes**. With **WIGTN CREW**, an AI-native team, our self-built tooling drove **runner-up at Snowflake 2026** and **ACL 2026 demo-track acceptance**, and the Mac mini we won runs as our **team home server**.",
      "Looking ahead, I'd like to grow into **backend and infrastructure** — and what I value most along the way is **staying willing to learn whatever comes next**.",
    ],
    chips: ["Designer → Engineer", "AI Native", "Self-hosting", "Always Learning"],
  },
  career: {
    eyebrow: "Career",
    title: "Career history",
    description: "Work, education, training, and language credentials in one place.",
  },
  experience: {
    eyebrow: "Experience",
    title: "Work history",
    subtitle: "Companies I've worked at and the products I owned inside them.",
    viewProjectLabel: "View",
    items: [
      {
        period: "2025.07 — Present",
        company: "Soundmind Inc.",
        role: "MX Manager",
        summary:
          "Cross-stack ownership across the company's multi-service suite — frontend, mobile, and back office.",
        bullets: [
          {
            title: "Soundmind Unified Identity",
            detail:
              "React + Spring Boot + MariaDB + Redis session design — the shared auth/account domain that all our services depend on.",
            projectSlug: "soundmind-sso",
          },
          {
            title: "Mohani",
            detail:
              "RN CLI app for parent-controlled child-phone management (app blocking, remote DNS control). OTA updates via CodePush.",
            projectSlug: "mohani",
          },
          {
            title: "Chocopie",
            detail:
              "Carrier activation back office. Sole owner of the Canvas-coordinate-mapped contract auto-generation and A4 output tool, including deploy on Nginx + Jenkins.",
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
        company: "How About (women's apparel e-commerce)",
        role: "Web Designer / Publisher",
        bullets: [
          { title: "Full-cycle ownership of storefront design + publishing" },
          { title: "Photoshop layouts → HTML/CSS/JS markup → Cafe24 deployment" },
          { title: "Built foundations in visual design and frontend markup" },
        ],
        tags: ["HTML", "JavaScript", "CSS", "Photoshop", "Cafe24"],
      },
    ],
  },
  education: {
    eyebrow: "Education",
    title: "Schools",
    subtitle: "Where I formally studied.",
    items: [
      {
        period: "2025.03 — 2025.06",
        institution: "Gangseo Polytechnic College",
        major: "Smart Finance Program (left early after job offer)",
        note:
          "Bootcamp-style curriculum spanning frontend/backend/DB/AI/Docker.",
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
    subtitle: "Bootcamps and short-form programs outside formal schooling.",
    viewProjectLabel: "View",
    items: [
      {
        period: "2024.06 — 2024.12",
        institution: "Ozcodingschool — Frontend Track",
        program: "6-month program · Completed",
        note:
          "Industry collaboration and team projects for hands-on end-to-end product experience.",
        bullets: [
          {
            title: "MovieGet — Movie ticketing site (Team Lead)",
            detail:
              "Top contributor on a 3-person team (50%, 185 commits). Owned Toss Payments integration, TMDB API wiring, list-page infinite scroll refactor, and AWS deploy. Also handled the integration merge PR and build blockers.",
            projectSlug: "movieget",
          },
          {
            title: "MICGolf — PapaTaLabs industry collaboration storefront",
            detail:
              "Second-most commits on a 4-person team (33%, 126 commits). Owned PortOne checkout integration, email / Naver / Kakao social login, back-office CRUD, and category/product infinite scroll across the e-commerce surface.",
            projectSlug: "micgolf",
          },
        ],
        tags: ["React", "TypeScript", "Vite", "Zustand", "TanStack Query"],
      },
    ],
  },
  achievements: {
    eyebrow: "Certifications & Awards",
    title: "Certifications & Awards",
    subtitle: "Verified credentials and external recognition.",
    viewProjectLabel: "View",
    items: [
      {
        kind: "language",
        date: "2022",
        title: "JLPT N1 (Japanese-Language Proficiency, Level 1)",
        meta: "Business-level still developing; reads kanji largely by context.",
      },
      {
        kind: "award",
        date: "2026",
        title: "Snowflake 2026 Hackathon · Runner-up",
        meta: "wigtn-for-snowflake · Team WIGTN CREW",
        projectSlug: "wigtn-snowflake",
        medal: "silver",
      },
      {
        kind: "award",
        date: "2026",
        title: "ACL 2026 Demo Track · Accepted",
        meta: "wigvo-v2 · Team WIGTN CREW",
        projectSlug: "wigvo-v2",
        medal: "gold",
      },
    ],
  },
  techStack: {
    eyebrow: "Tech Stack",
    title: "Tech I work with",
    subtitle: "Tools and environments I've actually used in real projects.",
    groups: [
      {
        label: "Primary Stack",
        items: ["React", "React Native", "NestJS", "Spring Boot"],
      },
      { label: "Languages", items: ["TypeScript", "Java"] },
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
          "Mac mini self-hosting",
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
    showMore: "Show more",
    showLess: "Show less",
    items: [
      {
        slug: "wigex",
        category: "team",
        company: "WIGTN CREW",
        title: "wigex — Travel Ledger / Monorepo",
        summary:
          "NestJS · Prisma backend + Expo mobile run as a monorepo on GCP Cloud Run.",
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
          "Snowflake 2026 Hackathon runner-up. Mac mini prize is now our team's home server.",
        tags: ["Snowflake", "Self-hosting", "Mac mini"],
        role: "Demo · Infra",
        award: "Snowflake 2026 Runner-up",
        awardTier: "silver",
        github: "https://github.com/wigtn/wigtn-for-snowflake",
      },
      {
        slug: "soundmind-sso",
        category: "work",
        company: "Soundmind Inc.",
        title: "Soundmind Unified Identity",
        summary:
          "Cross-service auth & account domain on React + Spring Boot.",
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
          "Accepted to ACL 2026 Demo Track. Light team contribution.",
        tags: ["AI", "NLP", "Demo"],
        role: "Participant",
        award: "ACL 2026 Accepted",
        awardTier: "gold",
        github: "https://github.com/wigtn/wigvo-v2",
      },
      {
        slug: "chocopie-contract",
        category: "work",
        company: "Soundmind Inc.",
        title: "Chocopie — Contract Authoring Tool",
        summary:
          "Solo-built Canvas-coordinate contract generator with A4 output.",
        tags: ["Canvas", "TypeScript", "Spring Boot", "Nginx"],
        role: "Solo (contract domain)",
      },
      {
        slug: "mohani",
        category: "work",
        company: "Soundmind Inc.",
        title: "Mohani — Parent-controlled phone management",
        summary:
          "Parent-controlled RN app for blocking apps and remote DNS gating.",
        tags: ["React Native", "Spring Boot", "Redis", "Supabase"],
        role: "Frontend · Mobile",
      },
      {
        slug: "movieget",
        category: "bootcamp",
        company: "Ozcodingschool",
        title: "MovieGet — Movie ticketing",
        summary:
          "3-person team lead, top committer (50%). Toss Payments + TMDB.",
        tags: ["React", "TypeScript", "Vite", "Toss Payments"],
        role: "Lead · Payments",
        period: "2024.10 — 2024.11",
        github: "https://github.com/movieget/frontend",
      },
      {
        slug: "micgolf",
        category: "bootcamp",
        company: "PapaTaLabs Industry-Academia",
        title: "MICGolf — Golf-equipment storefront",
        summary:
          "Owned PortOne checkout, social login, and back-office across the e-com core (33%).",
        tags: ["React", "TypeScript", "Zustand", "TanStack Query", "PortOne"],
        role: "Payments · Auth · Back-office",
        featured: true,
        github: "https://github.com/MICGolf/frontend",
      },
      {
        slug: "wigtn-coding",
        category: "team",
        company: "WIGTN CREW",
        title: "wigtn-coding",
        summary:
          "Self-built Claude Code plugin standardizing the team workflow.",
        tags: ["Claude Code", "AI Workflow"],
        role: "AI Workflow",
        featured: true,
        github: "https://github.com/wigtn/wigtn-plugins-with-claude-code",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's work together",
    description:
      "Reach me via email, GitHub, or LinkedIn. I'm prioritizing positions at Japanese first-party product companies.",
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
