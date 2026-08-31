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
    eyebrow: "Ownership",
    title: "One product, four layers",
    subtitle: "I built it from the child device through to deployment.",
    items: [
      {
        layer: "Child device app",
        stack: "React Native · Android",
        detail: "Location state machine, network gating, coordinate validation",
        metric: "100% upload success",
        connector: "uploads location",
        projectSlug: "odiya-child",
      },
      {
        layer: "Ingestion server",
        stack: "Spring Boot · Redis · MariaDB",
        detail: "Queue drain, lossless recovery, quarantine and retry",
        metric: "Up to 5,000 rows every 60s",
        connector: "reads",
        projectSlug: "odiya-backend",
      },
      {
        layer: "Parent app",
        stack: "React Native · TypeScript",
        detail: "Interpretation, transit inference, stay clustering, live tracking",
        metric: "89 unit tests on interpretation",
        projectSlug: "odiya-parents",
      },
      {
        layer: "Deploy & operations",
        stack: "Docker · Nginx · Jenkins",
        detail: "Zero-downtime deploys across 3 products, CI, monitoring",
      },
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
    backToList: "All projects",
    noCaseStudy: "A detailed case study for this project is in progress.",
    roleLabel: "Role",
    stackLabel: "Stack",
    periodLabel: "Period",
    items: [
      {
        slug: "odiya-child",
        category: "work",
        company: "Soundmind",
        title: "Odiya — Child Device Location Agent",
        summary:
          "An app that reliably reports location from managed devices where mobile data is off by default.",
        tags: ["React Native", "Android", "Java", "Kotlin", "FCM"],
        role: "Design · Native implementation",
        period: "Jul 2025 — Present",
        featured: true,
        caseStudy: {
          tagline:
            "Reporting location without draining the battery, on a device where MDM keeps data off and logs are unavailable.",
          role: "Designed the location state machine and built the Android native layer",
          period: "Jul 2025 — Present",
          stack: ["React Native", "Android (Java/Kotlin)", "FusedLocation", "Activity Recognition", "FCM"],
          metrics: [
            { value: "100%", label: "Upload success rate (previously data dropped after 1.17s on average)" },
            { value: "357s", label: "Worst measured timer delay in doze (scheduled for 45s)" },
            { value: "4/4", label: "Subway trips where spoofed cell coordinates were correctly rejected" },
          ],
          blocks: [
            {
              heading: "The problem",
              body:
                "These are not ordinary phones. A device management policy keeps mobile data off at all times, and developer mode is blocked, so logs cannot be pulled. The requirement was still that a parent should always be able to see where their child is. Location had to be uploaded on a schedule from a device with its data turned off, and stability had to be guaranteed without any way to observe what went wrong.",
            },
            {
              heading: "Constraints",
              body:
                "Every easy path was closed. The server could not reach the app first, because the network is normally shut, so push-based control was out. Without logs, bugs that did not reproduce had to be fixed by inference. On top of that, the OS power policy defers scheduled timers at will.",
              bullets: [
                "Turning data on means asking the management agent — it takes 3–5 seconds and gives no completion signal",
                "In doze, a 45-second timer was measured firing as late as 357 seconds",
                "Keeping GPS on continuously does not survive a day on battery",
              ],
            },
            {
              heading: "What I decided",
              body:
                "Four changes. First, requests to turn data on and off were consolidated into a single place that counts callers, so data stays on until the last caller finishes, with a minimum hold of six seconds. Second, timers are no longer trusted on their own; a wall-clock check backs them up. Third, GPS is switched on based on how old the last known fix is, rather than on elapsed time. Fourth, incoming coordinates are validated in three stages instead of being trusted.",
              bullets: [
                "A single owner for opening and releasing data — per-caller counts, six-second minimum hold, four independent release safeguards",
                "Wall-clock backstop that corrects for doze timer drift",
                "GPS turns on based on fix age — a failed upload can no longer lock the condition permanently",
                "Three-stage coordinate validation — accuracy gate, satellite count to detect cell-tower positions, speed plausibility",
              ],
            },
            {
              heading: "Outcome",
              body:
                "Uploads no longer break mid-flight. Data used to stay on for a median of 1.17 seconds, which was often not enough to finish a request; with the six-second minimum hold, upload success reached 100%. Changing the GPS condition also removed the failure mode where a single failed upload left the app silent indefinitely. Coordinate validation correctly rejected spoofed cell positions in all four measured subway trips, and the app now stays silent rather than guessing, so the parent app never draws a location it cannot stand behind.",
            },
          ],
        },
      },
      {
        slug: "odiya-parents",
        category: "work",
        company: "Soundmind",
        title: "Odiya — Parent App",
        summary:
          "A map app that presents uncertain location data without overstating it: stays, routes, and live tracking.",
        tags: ["React Native", "TypeScript", "TanStack Query", "Zustand", "Naver Map"],
        role: "Frontend design · Implementation",
        period: "Jul 2025 — Present",
        featured: true,
        caseStudy: {
          tagline:
            "GPS is often wrong. Rather than making wrong data look convincing, the UI says when it does not know.",
          role: "Designed and built the location interpretation logic and screens",
          period: "Jul 2025 — Present",
          stack: ["React Native", "TypeScript", "TanStack Query", "Zustand", "Naver Map", "STOMP"],
          metrics: [
            { value: "89", label: "Unit tests covering location interpretation" },
            { value: "956", label: "Subway stations used for transit inference (47 lines)" },
            { value: "3", label: "Filters a transit guess must pass — station, distance, duration" },
          ],
          blocks: [
            {
              heading: "The problem",
              body:
                "The parent-facing screen cannot simply plot the coordinates the child device uploads. It has to interpret them into statements like \"stayed home for two hours\" or \"appears to have taken the subway\" before they are useful. But the raw data is not clean: GPS wanders indoors and disappears entirely underground. A bad interpretation means a parent believes something false.",
            },
            {
              heading: "Constraints",
              body:
                "The largest constraint was on the user side, not the data. The child app ships through the app stores, and most devices in the field were running older versions. The interpretation screens depended on fields those versions never send. Live tracking had a separate problem: the app and the server each decided state on their own and regularly disagreed.",
              bullets: [
                "Indoor GPS drift split a single stay into several separate places",
                "Subway segments have no coordinates at all — inference is the only option",
                "Older child app versions do not send the fields interpretation needs",
              ],
            },
            {
              heading: "What I decided",
              body:
                "One principle runs through all of it: do not show it if it might be wrong. Subway inference only displays when station, distance, and duration all agree, and stays silent when any one of them does not. Stays split into separate places only past a radius threshold, and a stay crossing midnight is split by day. Users on older child app versions never see the interpretation screens at all. Live tracking follows server state instead of deciding for itself.",
              bullets: [
                "Three-filter subway inference — one mismatch and nothing is shown",
                "Stay clustering with a radius rule and midnight splitting",
                "Per-version UI gating so missing data is never rendered as present",
                "Live tracking follows server state; push only advances the next refresh",
              ],
            },
            {
              heading: "Outcome",
              body:
                "The interpretation rules were extracted into pure functions and covered by 89 unit tests, because the rules are subtle enough (radius multiples, midnight handling, gap detection) that code alone would not keep them honest. Split indoor stays and false subway guesses are gone, as is the empty screen older users used to see. Separately, chat messages were arriving truncated; tracing it showed React Native cutting outgoing strings at a specific character, and switching the transport fixed it.",
            },
          ],
        },
      },
      {
        slug: "kocca-kstt",
        category: "work",
        company: "Soundmind",
        title: "KSTT — Korean Speaking Test Platform",
        summary:
          "A Next.js full-stack service I owned end to end: exam flow, grading admin, speech pipeline, and deploys.",
        tags: ["Next.js", "TypeScript", "Prisma", "MySQL", "Docker", "Playwright"],
        role: "Full-stack (all areas)",
        period: "Jul 2025 — Present",
        featured: true,
        caseStudy: {
          tagline:
            "An exam cannot be un-taken. The work was making sure nothing that changes in production can disturb a result already recorded.",
          role: "Exam flow, grading admin, speech pipeline, and deployment",
          period: "Jul 2025 — Present",
          stack: ["Next.js 15", "React 19", "TypeScript", "Prisma", "MySQL", "Docker", "Vitest", "Playwright"],
          metrics: [
            { value: "30+", label: "Grading and operations admin screens" },
            { value: "50", label: "Data models" },
            { value: "0", label: "Destructive schema changes reaching production (blocked automatically)" },
          ],
          blocks: [
            {
              heading: "The problem",
              body:
                "Learners record pronunciation and speaking answers in the browser; those recordings are transcribed by speech recognition and then scored by human graders. The end goal was not only the scores but a training dataset with personal data stripped and loudness normalised. The difficulty is that all of this keeps changing while it runs — questions get edited, rounds get added, deploys happen — and results already recorded must never move.",
            },
            {
              heading: "Constraints",
              body:
                "Zero-downtime deploys mean old and new code run side by side for a window. A schema change during that window breaks the old code. Speech recognition runs in a separate long-lived worker, and two of them running at once would transcribe the same recording twice. On the candidate side, there were ways around the exam through URL manipulation and browser translation.",
            },
            {
              heading: "What I decided",
              body:
                "The rule was: never touch what cannot be undone. Schema changes applied at deploy time are additive only, and a single destructive statement aborts the deploy. Recordings are never deleted, even on a retake. Questions are pinned to the revision in effect when the exam was taken, so later edits leave past rounds intact. The speech worker records a heartbeat so only one can be live.",
              bullets: [
                "Additive-only schema application — a destructive statement aborts the deploy",
                "Recordings accumulate as generations, distinguishing admin-ordered retakes from self-initiated ones",
                "Questions pinned to the revision used at exam time",
                "Heartbeat-guarded single speech worker",
                "Exam hardening — URL tampering, translation abuse, and microphone-test validity",
              ],
            },
            {
              heading: "Outcome",
              body:
                "Deploys no longer fail on schema accidents: a stray DROP in a migration never reaches the server because the deploy script rejects it. Editing a question in production leaves in-progress and completed rounds untouched. The recording pipeline through loudness normalisation, personal-data removal, and anonymised export to a training dataset now runs end to end.",
            },
          ],
        },
      },
      {
        slug: "odiya-backend",
        category: "work",
        company: "Soundmind",
        title: "Odiya — Location Ingestion Server",
        summary: "A Spring Boot server that stores bursts of incoming location data without losing any of it.",
        tags: ["Spring Boot", "Java", "Redis", "MariaDB", "Flyway"],
        role: "Backend",
        period: "Jul 2025 — Present",
      },
      {
        slug: "mohani",
        category: "work",
        company: "Soundmind",
        title: "Mohani — Child Phone Usage Management",
        summary:
          "A service for parents to control app usage on a child's phone remotely. I worked on the server and both apps.",
        tags: ["React Native", "Spring Boot", "Android", "Knox SDK", "FCM"],
        role: "Server · Child app · Parent app",
        period: "Jul 2025 — Present",
      },
      {
        slug: "soundmind-sso",
        category: "work",
        company: "Soundmind",
        title: "Single Sign-On Server",
        summary:
          "The shared login and account service behind several in-house products, with per-user-type token policy.",
        tags: ["Spring Boot", "Java", "MariaDB", "Redis", "Next.js"],
        role: "Backend · Operations dashboard",
        period: "Jul 2025 — Present",
      },
      {
        slug: "wigtn-snowflake",
        category: "team",
        company: "WIGTN CREW",
        title: "wigtn-for-snowflake",
        summary:
          "Runner-up at Snowflake AI & Data Hackathon Korea 2026. The prize Mac mini now runs as our team home server.",
        tags: ["Snowflake", "Self-hosting"],
        role: "Co-development · Infrastructure",
        award: "Snowflake 2026 Runner-up",
        awardTier: "silver",
      },
      {
        slug: "wigvo-v2",
        category: "team",
        company: "WIGTN CREW",
        title: "WIGVO — Real-Time Bidirectional Speech Translation",
        summary:
          "Live translation over legacy phone calls. Accepted to ACL 2026 Demo Track; I am a co-author.",
        tags: ["AI", "Speech", "Real-time"],
        role: "Co-author · Development",
        award: "ACL 2026 Accepted",
        awardTier: "gold",
        github: "https://github.com/wigtn/wigvo",
      },
      {
        slug: "wigex",
        category: "team",
        company: "WIGTN CREW",
        title: "wigex — Travel Expense Tracker",
        summary:
          "A NestJS/Prisma backend and an Expo mobile app in one repository, deployed on GCP Cloud Run.",
        tags: ["NestJS", "Prisma", "Supabase", "Expo", "GCP Cloud Run"],
        role: "Backend · Mobile · Infrastructure",
        status: "In progress",
      },
      {
        slug: "wigtn-coding",
        category: "team",
        company: "WIGTN CREW",
        title: "wigtn-coding",
        summary: "A Claude Code plugin that standardises our team's development workflow.",
        tags: ["Claude Code", "AI Workflow"],
        role: "Co-development",
        github: "https://github.com/wigtn/wigtn-plugins",
      },
      {
        slug: "micgolf",
        category: "bootcamp",
        company: "Papata Labs (industry collaboration)",
        title: "MICGolf — Golf Equipment Store",
        summary:
          "Owned payments, social login, and the back office — core commerce areas (33% of commits, 126).",
        tags: ["React", "TypeScript", "Zustand", "TanStack Query", "PortOne"],
        role: "Payments · Auth · Back office",
        period: "2024",
        github: "https://github.com/MICGolf/frontend",
      },
      {
        slug: "movieget",
        category: "bootcamp",
        company: "Oz Coding School",
        title: "MovieGet — Movie Ticketing Site",
        summary: "Led a team of three with the most commits (50%, 185). Owned payment integration and deployment.",
        tags: ["React", "TypeScript", "Vite", "Toss Payments"],
        role: "Lead · Payments · Deployment",
        period: "Oct 2024 — Nov 2024",
        github: "https://github.com/movieget/frontend",
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
