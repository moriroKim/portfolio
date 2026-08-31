import type { Dictionary } from "../dictionary.types";

export const en: Dictionary = {
  meta: {
    siteName: "Jinmo Kim Portfolio",
    description:
      "From the frontend to the backend and the infrastructure, I build one product end to end.",
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
    name: "Jinmo Kim",
    nameRoman: "Jin-mo Kim",
    roleTitle: "Full-stack Engineer",
    positioningPre: "From the frontend to the backend and the infrastructure,",
    positioningEmphasis: "I build one product",
    positioningPost: " end to end.",
    subtitle:
      "Mobile native, server, app, and zero-downtime deploys: four layers, one engineer.",
    metaChips: ["React Native", "Spring Boot", "Next.js", "Android Native"],
    ctaPrimary: "View Projects",
    ctaSecondary: "Resume",
  },
  about: {
    eyebrow: "About",
    title: "I build one product end to end",
    paragraphs: [
      "Since July 2025, I have been working as an **MX Manager at Soundmind**. On a single child safety product, I built all four layers myself, **from the Android native code on the device to the collection server, the parent app, and zero-downtime deployment**.",
      "The problem I wrestled with longest was not losing location data on devices where a management policy keeps mobile data off and logs cannot be read. After funneling data opening and release through a single gateway and correcting for the power-saving timer delays I measured in the field, the **transmission success rate reached 100%**. On the server, I changed the pipeline to drain and store incoming locations atomically and quarantine failures separately, so a single broken record no longer halts the entire load.",
      "In the parent app, I built the logic that interprets noisy coordinates into places stayed and travel routes, eliminating **the problem of indoor stays splitting apart and baseless movement guesses appearing on screen**.",
      "At **WIGTN**, a five-person AI development and research crew, we build AI systems that run in real environments. On **WIGVO**, which performs two-way real-time interpretation over the ordinary phone network, I handled the relay server and deployment infrastructure, recording a median latency of **555 milliseconds** on real calls and **zero echo loops across 147 calls**. The paper was accepted to **ACL 2026 System Demonstrations**.",
      "With the same team, we released **two open-source plugins** covering Claude Code's parallel agent orchestration and Codex's Evidence Contract, and took second place at the **Snowflake AI & Data Hackathon Korea 2026**.",
      "At the company, I have built one product end to end; on the team, I have explored how to put AI into the development process itself. Connecting the two, I want to work on **redesigning how development and operations are done, not just using AI as a tool**.",
    ],
    chips: ["Full-stack", "Mobile Native", "AI-native Workflow", "Infra & Deploy"],
  },
  career: {
    eyebrow: "Career",
    title: "Career History",
    description: "Work experience · education · training · languages and certifications, gathered in one place.",
  },
  experience: {
    eyebrow: "Experience",
    title: "Work Experience",
    subtitle: "Services and areas I have owned at work.",
    viewProjectLabel: "View project",
    items: [
      {
        period: "2025.07 ~ Present",
        company: "Soundmind",
        role: "MX Manager",
        summary:
          "Responsible for the apps, servers, web, and deployment of child safety and education services.",
        bullets: [
          {
            title: "Odiya Child Device App",
            detail:
              "Solved a problem where transmissions dropped on managed devices that keep mobile data off by default. Funneled data-enable requests through a single gateway and added a minimum 6-second hold rule, securing a 100% transmission success rate.",
            projectSlug: "odiya-child",
          },
          {
            title: "Odiya Parent App",
            detail:
              "Designed the location interpretation UI around the principle \"better to show nothing than to be wrong\". Three-stage subway inference filter, stay clustering, and screen gating by child app version. 89 unit tests.",
            projectSlug: "odiya-parents",
          },
          {
            title: "Odiya Location Collection Server",
            detail:
              "Stores up to 5,000 records every 60 seconds in batches via a Redis queue, recovering in order on failure. Removed a structure where a single corrupted record halted all storage.",
            projectSlug: "odiya-backend",
          },
          {
            title: "KOCCA Korean Speaking Test Platform",
            detail:
              "Owned every area: test-taking screens, around 30 grading admin pages, the STT/TTS pipeline, and building the AI training dataset. Destructive schema changes are automatically blocked at deploy time.",
            projectSlug: "kocca-kstt",
          },
          {
            title: "Mohani Child Smartphone Usage Management",
            detail:
              "Designed a structure where devices catch up on settings by themselves even when push messages are lost. Added redundancy so blocking persists even if accessibility permission is turned off.",
            projectSlug: "mohani",
          },
          {
            title: "Unified Login Server",
            detail:
              "Separated token policies by user type. If a stolen token is reused, every token for that account is invalidated immediately.",
            projectSlug: "soundmind-sso",
          },
          {
            title: "Deployment and Operations",
            detail:
              "Built zero-downtime deployment for three products. Set up Jenkins automated deployment and server/log monitoring.",
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
    title: "Schools",
    subtitle: "Where I formally studied.",
    items: [
      {
        period: "2025.03 ~ 2025.06",
        institution: "Gangseo Polytechnic College",
        major: "Smart Finance Program (left early after job offer)",
        note:
          "Bootcamp-style curriculum spanning frontend/backend/DB/AI/Docker.",
      },
      {
        period: "2016 ~ 2024",
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
        period: "2024.06 ~ 2024.12",
        institution: "Ozcodingschool · Frontend Track",
        program: "6-month program · Completed",
        note:
          "Industry collaboration and team projects for hands-on end-to-end product experience.",
        bullets: [
          {
            title: "MovieGet · Movie ticketing site (Team Lead)",
            detail:
              "Top contributor on a 3-person team (50%, 185 commits). Owned Toss Payments integration, TMDB API wiring, list-page infinite scroll refactor, and AWS deploy. Also handled the integration merge PR and build blockers.",
            projectSlug: "movieget",
          },
          {
            title: "MICGolf · PapaTaLabs industry collaboration storefront",
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
    title: "Technologies",
    subtitle: "Tools and environments I have handled hands-on in real projects.",
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
        items: ["Docker", "Nginx", "Jenkins", "Zero-downtime deployment", "Prometheus", "Grafana", "GCP Cloud Run", "GitHub Actions"],
      },
      { label: "Tooling", items: ["Claude Code"] },
      { label: "Test", items: ["Vitest", "Playwright", "JUnit", "Testcontainers"] },
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
    altOptionLabel: "Option",
    altProsLabel: "Strengths",
    altConsLabel: "Drawbacks",
    altChosenLabel: "Chosen",
    items: [
      {
        slug: "odiya-child",
        category: "work",
        company: "Soundmind",
        title: "Odiya Child Device App",
        summary:
          "An app that sends location without missing a beat, on managed devices where mobile data is normally switched off.",
        tags: ["React Native", "Android", "Java", "Kotlin", "FCM"],
        role: "Architecture · Native implementation",
        period: "2025.07 ~ Present",
        featured: true,
        caseStudy: {
          tagline:
            "On a device where the management policy keeps mobile data off and logs are out of reach, the job was to find a way to never miss a location while still conserving battery.",
          role: "Location-collection state machine design and Android native implementation",
          period: "2025.07 ~ Present",
          stack: ["React Native", "Android (Java/Kotlin)", "FusedLocation", "Activity Recognition", "FCM"],
          metrics: [
            { value: "100%", label: "Delivery success rate (previously, data dropped after an average of 1.17 seconds)", tone: "outcome" },
            { value: "357s", label: "Maximum timer delay measured in power-saving mode (scheduled at 45 seconds)" , tone: "problem" },
            { value: "4/4", label: "Measured subway trips in which cell-tower coordinates were correctly filtered out", tone: "outcome" },
          ],
          blocks: [
            {
              heading: "The problem",
              body:
                "The devices this app runs on are not ordinary smartphones. A management policy introduced for child protection keeps the device's mobile data off by default and locks down developer mode, so when something goes wrong there is no way to pull logs. Yet the requirement was that parents must be able to check their child's location at any time. I had to send location periodically from a device with data turned off, and guarantee stability with no way to observe what was going wrong.",
              bullets: [
                "Mobile data is blocked by default, so every transmission must ask the management agent to open it",
                "Developer mode is locked, making log collection from real devices impossible",
                "Field bugs that could not be reproduced had to be fixed on guesswork, over and over",
              ],
            },
            {
              heading: "Constraints",
              body:
                "Most of the usual solutions were off the table. With the network normally closed, the server could not reach the app first, so push-driven control was out, and keeping GPS always on was not an option because of battery. On top of that, Android's power-saving policy would arbitrarily postpone the timers I scheduled.",
              bullets: [
                "Opening data is asynchronous, takes 3 to 5 seconds, and gives no signal when it completes",
                "I measured timers scheduled at 45 seconds slipping by up to 357 seconds in power-saving mode",
                "Keeping GPS lit at all times drains the battery before the day is over",
                "Trusting coordinates on the accuracy value alone gets you fooled by cell-tower positions disguised as GPS",
              ],
            },
            {
              heading: "Alternatives considered",
              body:
                "The fork in the road was how to manage opening the network. I compared three approaches, and the first two were actually built and run before their problems surfaced and they were discarded.",
              table: [
                {
                  option: "Keep data always open",
                  pros: "Simplest to implement, and transmissions can never fail",
                  cons: "Directly contradicts the intent of the management policy, and battery and data costs are unsustainable",
                },
                {
                  option: "Open and close per request (single token)",
                  pros: "Opens only when needed, satisfying both the policy and the battery",
                  cons: "With a shared token, whichever request finished first cut the network out from under one still in flight. Measured median hold time: 1.17 seconds",
                },
                {
                  option: "Single gateway + per-requester counting",
                  pros: "Stays open until the last user finishes, and a minimum hold time can be enforced as a rule",
                  cons: "A missed release leaves it open indefinitely, so separate safeguards are needed",
                  chosen: true,
                },
              ],
            },
            {
              heading: "Decision and rationale",
              body:
                "I chose the single-gateway approach. The deciding factor was that the open request is asynchronous with no completion signal. Transmitting the moment you ask means the data goes out before the network is actually open, and closing the moment a transmission ends makes the next request wait another 3 seconds. So I count requesters, keep the network open until the last one finishes, and added a minimum 6-second rule. The risk of a missed release is contained by four layers of safeguards.",
              bullets: [
                "Per-requester counting manages open and release, with a minimum hold of 6 seconds",
                "Four layers guarantee release: a wake lock deadline, a watchdog, secondary reclamation on the alarm tick, and generation tokens",
                "Generation tokens stop a late-arriving old callback from cutting the network of a new session",
                "The GPS trigger was changed to the age of the held location, so a failed transmission can never lock the condition permanently",
                "Coordinates are validated in order: an accuracy gate, satellite-count discrimination, then speed plausibility",
              ],
            },
            {
              heading: "Implementation and missteps",
              body:
                "Even built to the design, it went wrong three more times in the field. With no way to see logs, I narrowed things down each time by forming a hypothesis and piggybacking diagnostic records onto transmissions to retrieve them.",
              bullets: [
                "① I first set the minimum hold time to 3 seconds and failures persisted. After measuring that the open request takes 3 to 5 seconds, I raised it to 6 seconds, and the failures disappeared.",
                "② I built the stationary-state check on a time window, and a device that failed one transmission could never satisfy the condition again and went silent. I rebuilt it with the age of the held location as the threshold instead of a window.",
                "③ For a long time I could not find why collection stopped in power-saving mode. Logging scheduled timers against actual clock time showed 45-second schedules slipping by up to 357 seconds. I corrected it with a real-time backstop.",
                "④ Since developer mode is locked and logs cannot be pulled, I piggybacked diagnostic records onto location transmissions and had the server absorb duplicates. Opening the network separately for this path was forbidden.",
              ],
            },
            {
              heading: "Outcome",
              body:
                "Data no longer cuts out mid-transmission. Previously the data connection held for only 1.17 seconds on average, so requests often failed to complete; after adding the minimum 6-second hold rule, the delivery success rate reached 100%. Since changing the GPS trigger condition, the app no longer stays silent just because one transmission failed. Coordinate validation correctly filtered out cell-tower coordinates in all 4 of 4 measured subway trips, and because nothing is sent when confidence is low, the parent app never draws a location it cannot back up.",
            },
          ],
        },
      },
      {
        slug: "odiya-parents",
        category: "work",
        company: "Soundmind",
        title: "Odiya Parent App",
        summary:
          "A map app that presents uncertain location data without overstating it. It shows places stayed, movement paths, and real-time tracking.",
        tags: ["React Native", "TypeScript", "TanStack Query", "Zustand", "Naver Map"],
        role: "Frontend design · implementation",
        period: "2025.07 ~ Present",
        featured: true,
        caseStudy: {
          tagline:
            "GPS is often wrong. Instead of dressing up wrong data to look plausible, I built screens that say we don't know when we don't know.",
          role: "Location interpretation logic and screen design · implementation",
          period: "2025.07 ~ Present",
          stack: ["React Native", "TypeScript", "TanStack Query", "Zustand", "Naver Map", "STOMP"],
          metrics: [
            { value: "89", label: "Unit tests covering the location interpretation logic", tone: "outcome" },
            { value: "956 stations", label: "Station data used for subway inference (47 lines)" },
            { value: "3 stages", label: "Filters a transport-mode guess must pass" },
          ],
          blocks: [
            {
              heading: "The problem",
              body:
                "A parent's screen is useless if it just plots the raw coordinates the child's device uploads. They only become information once translated into statements like stayed home for two hours, seems to have moved by subway, or currently near school. The problem was that the raw data is not clean. GPS drifts indoors and drops out entirely on the subway. If the interpretation is wrong, parents end up believing false information as fact, and in a service tied directly to a child's safety, that is worse than having no feature at all.",
            },
            {
              heading: "Constraints",
              body:
                "The biggest constraint was on the user side, not the data side. The child's device app ships through the app store, and most devices actually in the field were running old versions. The newly built interpretation screens needed fields that old versions do not send. Real-time tracking had a different problem: the app and the server each judged the state on their own, so they frequently fell out of sync.",
              bullets: [
                "Indoor GPS drift split a single stay at one place into several fragments on screen",
                "Subway segments have no coordinates at all, so inference is the only option",
                "Old versions of the child app do not send the fields the interpretation needs",
                "In real-time tracking, the app and the server each made their own judgment and the states diverged",
              ],
            },
            {
              heading: "Alternatives considered",
              body:
                "The core question was how to represent GPS-dead segments on screen. Leave the gap empty and parents get anxious; fill it in and it can be wrong.",
              table: [
                {
                  option: "Connect gaps with a straight line",
                  pros: "The path stays unbroken and looks natural",
                  cons: "Draws straight lines through buildings and presents routes never actually taken as if they were fact",
                },
                {
                  option: "Leave gaps empty",
                  pros: "Nothing can be wrong and the implementation is simple",
                  cons: "A 30-minute subway trip disappears entirely, so parents conclude location tracking is broken",
                },
                {
                  option: "Infer only when every condition is met",
                  pros: "Shows information only when it is right, so trust is preserved, and leaves gaps otherwise, so no false impressions are created",
                  cons: "Real trips that fail the filters also go unshown, so some coverage must be given up",
                  chosen: true,
                },
              ],
            },
            {
              heading: "Decision and rationale",
              body:
                "I chose to give up some coverage. On a screen tied directly to a child's safety, a single wrong display costs more than a missing feature, because once parents start doubting the screen, they stop trusting even the correct information. So I made it a principle to show nothing rather than show something wrong, and applied the same standard at every point where interpretation happens.",
              bullets: [
                "Subway trips are shown only after passing all three conditions: station matching, distance, and travel time",
                "Gap detection along a path is computed in exactly one place, preventing overlapping lines drawn from different values",
                "Stay clusters split only after exceeding 3x the radius from the starting point, and stays crossing midnight are split by date",
                "For users on old child-app versions, the interpretation screens are disabled entirely",
                "In real-time tracking the server session is the source of truth, and push messages are used only as a signal to fetch sooner",
              ],
            },
            {
              heading: "Implementation and trial and error",
              body:
                "The interpretation rules were easy to state in words but hard to uphold in code. Fixing one condition kept quietly breaking another screen, so I pulled the rules out of the screens into pure functions and pinned them down with tests.",
              bullets: [
                "① I first built stay detection as a fixed radius around the starting point, and slowly moving segments got lumped into a single place. I changed it to follow the current center but split once it exceeds 3x the radius from the starting point.",
                "② A stay crossing midnight was counted at full duration on both dates. I fixed it to cut at the date boundary and sum each side separately.",
                "③ Computing path gaps separately per screen drew overlapping lines on the same segment. I unified the computation into a single place.",
                "④ Chat messages arrived truncated midway. I confirmed strings were being cut at the frame terminator character and resolved it by changing the transmission method.",
                "⑤ Labels on the map overlapped under the OS font-scaling setting. I wrapped the text component to neutralize the scaling; the previous approach had silently stopped working.",
              ],
            },
            {
              heading: "Outcome",
              body:
                "Every interpretation rule was extracted into pure functions with 89 unit tests attached, because rules like what radius multiple to use, how to handle midnight, and where to detect gaps are subtle enough that code alone does not keep them. The fragmenting of indoor stays and the wrong subway guesses disappeared, and old-version users no longer saw blank screens. As a bonus, I traced why chat messages arrived truncated, confirmed that React Native cuts strings at a particular character when sending, and resolved it by changing the transmission method.",
            },
          ],
        },
      },
      {
        slug: "kocca-kstt",
        category: "work",
        company: "Soundmind",
        title: "KSTT Korean Speaking Test Platform",
        summary:
          "A full-stack Next.js service where I owned everything from the test-taking screens to the grading admin, speech recognition and synthesis, and building the training dataset.",
        tags: ["Next.js", "TypeScript", "Prisma", "STT", "TTS", "Docker"],
        role: "Full stack (all areas)",
        period: "2025.07 ~ Present",
        featured: true,
        caseStudy: {
          tagline:
            "The work was to put speech recognition and synthesis at the center of the product, while making sure that no matter what changes in production, the results of exams already taken never waver.",
          role: "Full ownership: test taking · grading admin · speech pipeline · deployment",
          period: "2025.07 ~ Present",
          stack: ["Next.js 15", "React 19", "TypeScript", "Prisma", "MySQL", "STT", "TTS", "ffmpeg", "Docker"],
          metrics: [
            { value: "30+", label: "Admin screens for grading and operations" },
            { value: "50", label: "Data models" },
            { value: "2", label: "Speech synthesis providers (self-hosted model and external API)" },
          ],
          blocks: [
            {
              heading: "The problem",
              body:
                "Foreign language learners record their pronunciation and speaking in the browser to take the exam, the recordings are transcribed by speech recognition, and graders score them. The end goal was not just grading results but a training dataset with personal information removed and loudness normalized. The hard part was that all of this keeps changing while in production. While questions get edited, new exam rounds get added, and deploys go out, the results of exams already taken must never change.",
            },
            {
              heading: "Constraints",
              body:
                "We use zero-downtime deployment, so during a deploy the old code and the new code run side by side for a while. If the database schema changes at that moment, the old code breaks. Speech recognition takes a long time, so a separate program handles it, but if two of them accidentally run at once they process the same recording twice. On the test-taker side there were bypass routes: manipulating the URL, or reading questions in advance with the browser's translation feature.",
              bullets: [
                "Old and new versions coexist during a deploy, so a schema change becomes an outage",
                "Duplicate speech recognition processing transcribes the same recording twice and doubles the cost",
                "Cheating paths through exam URLs and the translation feature were left open",
              ],
            },
            {
              heading: "Alternatives considered",
              body:
                "Transcription takes tens of seconds per item. Where to run this work determined the entire architecture.",
              table: [
                {
                  option: "Synchronous processing inside the request",
                  pros: "Simplest structure, no state management needed",
                  cons: "The upload request stays locked until transcription finishes, and when timeouts and retries overlap, the same recording gets transcribed twice",
                },
                {
                  option: "Scheduler embedded in the app server",
                  pros: "Keeps the deployment as a single unit",
                  cons: "During a zero-downtime deploy there are two servers, so two schedulers run, and in-flight jobs get cut off on every deploy",
                },
                {
                  option: "Dedicated always-on worker + row-lock claiming",
                  pros: "Jobs are claimed atomically one at a time, so duplication is blocked at the source, and it keeps running regardless of deploys",
                  cons: "The worker is a separate process, so whether it is alive or dead has to be managed separately",
                  chosen: true,
                },
              ],
            },
            {
              heading: "The decision and why",
              body:
                "I chose the dedicated worker. The remaining problem was the worker itself dying, or two of them running, and I solved that by having the worker periodically record its liveness in the DB. If another worker's record is still fresh, a new worker refuses to start; when the record stops, we can tell a clean shutdown from a lost connection. I applied the same standard to deployment: anything irreversible must be kept out of reach of the automated path.",
              bullets: [
                "Schema changes at deploy time are additive only; if a destructive statement is detected, the deploy is aborted before it reaches the server",
                "Recordings accumulate in generations with no deletion, distinguishing admin-ordered retakes from self re-recordings",
                "Questions are pinned to their revision at test time, so edits never affect past exam rounds",
                "Bypass routes on the test screen are blocked: access to unassigned questions, abuse of the translation feature, mic test validity",
              ],
            },
            {
              heading: "Implementation and trial and error",
              body:
                "Unexpected problems surfaced at the build and deploy boundary. Because we build on a Mac and run in a Linux container, things that worked fine locally would break on the server.",
              bullets: [
                "① The dev tools panel once got mixed into the production bundle. A refactoring that cleaned up conditional imports had quietly broken the bundler's dead-code elimination, so I banned that pattern as a rule and changed the process to inspect the build output to confirm.",
                "② Artifacts built on a Mac failed to start in the container. The DB engine and image library ship platform-specific binaries, so I fixed the build to include the Linux binaries in the output.",
                "③ Leaving the dev worker running locally during a production deploy nearly caused duplicate transcriptions. I introduced worker identifiers and added a guard to the deploy script so the production worker refuses to start if a liveness record from a different identifier exists.",
              ],
            },
            {
              heading: "The speech pipeline",
              body:
                "In this service, speech processing is not an add-on; it is the center of the product. When a test taker finishes recording, our self-hosted speech recognition server transcribes it, the question prompts are generated with speech synthesis, and the final output is a training dataset. All three paths must never stop in production, so I spent more time making them unbreakable after the models were wired up than on wiring them up.",
              bullets: [
                "Speech recognition is split into a separate always-on program, with a cap on concurrent processing and jobs locked and claimed one at a time",
                "That program records its liveness periodically, which prevents double execution and distinguishes a clean shutdown from a lost connection",
                "Speech synthesis has two paths, a self-hosted model and an external API, branched by voice identifier, so if one is blocked it fails over to the other",
                "Synthesized audio is post-processed to meet the speed standard for each question type",
                "The training dataset maps one audio file to one row, strips personal information, and exports it grouped under anonymous identifiers",
              ],
            },
            {
              heading: "Results",
              body:
                "Deploys no longer fail from schema accidents. Destructive commands are filtered out automatically by the deploy script, so even if a delete statement slips into a migration by mistake, it never reaches the server. Editing questions in production does not change the results of rounds in progress or already finished. The three pipelines, speech recognition, synthesis, and the dataset, now run without anyone watching, and once recordings accumulate, the flow all the way to exported training data continues automatically.",
            },
          ],
        },
      },
      {
        slug: "odiya-backend",
        category: "work",
        company: "Soundmind",
        title: "Odiya Location Collection Server",
        summary:
          "A Spring Boot server that stores bursts of incoming location data without losing a single record.",
        tags: ["Spring Boot", "Java", "Redis", "MariaDB", "Flyway"],
        role: "Backend",
        period: "2025.07 ~ Present",
      },
      {
        slug: "mohani",
        category: "work",
        company: "Soundmind",
        title: "Mohani Child Smartphone Usage Management",
        summary:
          "A service that lets parents remotely control app usage on their child's smartphone. I was responsible for the server, the child app, and the parent app.",
        tags: ["React Native", "Spring Boot", "Android", "Knox SDK", "FCM"],
        role: "Server · Child App · Parent App",
        period: "2025.07 ~ Present",
      },
      {
        slug: "soundmind-sso",
        category: "work",
        company: "Soundmind",
        title: "Unified Login Server",
        summary:
          "A login and account server shared by multiple in-house services. I designed token policies for each user type.",
        tags: ["Spring Boot", "Java", "MariaDB", "Redis", "Next.js"],
        role: "Backend · Operations Dashboard",
        period: "2025.07 ~ Present",
      },
      {
        slug: "wigtn-snowflake",
        category: "team",
        company: "WIGTN CREW",
        title: "wigtn-for-snowflake",
        summary:
          "Runner-up entry at the Snowflake AI & Data Hackathon Korea 2026. We now run the Mac mini we won as a prize as the team's home server.",
        tags: ["Snowflake", "Self-hosting"],
        role: "Co-development · Infrastructure",
        award: "Snowflake 2026 Runner-up",
        awardTier: "silver",
      },
      {
        slug: "wigvo-v2",
        category: "team",
        company: "WIGTN CREW",
        title: "WIGVO Real-Time Phone Call Interpretation",
        summary:
          "Interprets regular phone calls in both directions in real time. The receiving side does not need to install an app. I participated as a co-author of a paper accepted to ACL 2026.",
        tags: ["OpenAI Realtime API", "Twilio", "FastAPI", "Python", "Next.js"],
        role: "Relay server · Infrastructure",
        award: "Accepted to ACL 2026",
        awardTier: "gold",
        featured: true,
        github: "https://github.com/wigtn/wigvo",
        youtube: "https://youtu.be/_ixVEnHJxjk",
        caseStudy: {
          tagline:
            "Bridges a web client and any phone number with two real-time voice sessions. The receiving side just answers the phone, with no app and no carrier integration.",
          role: "Relay server and deployment infrastructure · Paper co-author (1 of 5)",
          period: "2026",
          stack: ["FastAPI", "Python 3.12", "OpenAI Realtime API", "Twilio Media Streams", "Docker", "Caddy"],
          metrics: [
            { value: "555ms", label: "Median caller-to-callee latency (measured in production)", tone: "outcome" },
            { value: "0", label: "Echo-induced translation loops across 147 calls", tone: "outcome" },
            { value: "$0.28", label: "Cost per minute of call time" },
          ],
          blocks: [
            {
              heading: "What it is",
              body:
                "An open-source system that interprets between Korean and English in both directions, in real time, over regular phone network calls. It connects a web client and an arbitrary phone number through two concurrent voice sessions, using a telephony API's media streams for transport. The receiving side needs no app install and no carrier integration. It was accepted to the ACL 2026 System Demonstrations track and is released under the MIT license.",
            },
            {
              heading: "The problem to solve",
              body:
                "Bidirectional interpretation over the phone network creates a failure mode of its own: an echo loop, where the interpreted audio plays out of the other party's speaker, comes back in through the microphone, and gets translated again. Once it starts, the same phrase repeats until the call ends. On top of that, the phone network has narrow bandwidth and is latency-sensitive, so common echo cancellation techniques are hard to apply as-is.",
            },
            {
              heading: "Alternatives considered",
              body:
                "How to break the echo loop determined the identity of the system. The paper compared three approaches.",
              table: [
                {
                  option: "Acoustic echo cancellation (AEC)",
                  pros: "The standard technique in call quality, with many existing implementations",
                  cons: "The phone network's narrow band and high latency jitter make reference signal alignment difficult, and it cannot remove enough of the leaked interpretation audio",
                },
                {
                  option: "A single session handling both directions",
                  pros: "Half the session cost and a simpler setup",
                  cons: "Cannot tell whether the audio it hears is the other party speaking or the interpretation it just sent out, so it cannot prevent a loop of re-translating its own output",
                },
                {
                  option: "Dual sessions + echo gating",
                  pros: "Separates sessions by direction and decides whose turn it is to speak, cutting off the very path by which its own output comes back",
                  cons: "Requires managing the state and cost of two sessions, and the relay server becomes the real-time bottleneck",
                  chosen: true,
                },
              ],
            },
            {
              heading: "My part",

              body:
                "I was responsible for the relay server and the deployment infrastructure. The relay server sits between the two voice sessions and the telephony API's media streams, relaying audio and actually enforcing the echo gating. Because it must not stall or lag while a call is running in real time, most of the work was about managing resources and lifecycles precisely rather than adding features.",
              bullets: [
                "Managed concurrent call capacity under a single lock, guaranteeing that reserved plus active calls never exceed the cap",
                "Structured the call lifecycle of reserve, confirm, and terminate so that calls failing during setup never linger holding resources",
                "Built the real-time path, including audio routing, ring buffers, voice activity detection, and barge-in handling",
                "Added a recovery path for dropped sessions and filtering for hallucinated responses",
                "Cleaned up the server entry points, including request rate limiting and tenant auth key issuance",
                "Attached an observability layer that tracks latency and event loop lag, so mid-call bottlenecks can be examined after the fact",
                "Built the Docker Compose and Caddy based deployment setup and operated it with automatic certificate renewal",
              ],
            },
            {
              heading: "Results",
              body:
                "The paper's core contribution, dual-session echo gating, uses deterministic silence injection and energy-based voice activity detection to decide whose turn it is to speak, blocking the path by which the system's own output comes back. In the production deployment it recorded a median caller-to-callee latency of 555 milliseconds, 0 echo loops across 147 calls, and $0.28 per minute of call time, evaluated over 155 Korean-English calls. The relay server is verified by 47 test files covering unit, component, integration, and load tests.",
            },
          ],
        },
      },
      {
        slug: "wigex",
        category: "team",
        company: "WIGTN CREW",
        title: "wigex Travel Expense Tracker",
        summary:
          "A NestJS and Prisma backend and an Expo mobile app maintained in a single repository. Deployed to GCP Cloud Run.",
        tags: ["NestJS", "Prisma", "Supabase", "Expo", "GCP Cloud Run"],
        role: "Backend · Mobile · Infrastructure",
        status: "In progress",
      },
      {
        slug: "wigtn-coding",
        category: "team",
        company: "WIGTN CREW",
        title: "wigtn-coding",
        summary:
          "A Claude Code plugin that standardizes our team's development workflow. It was an attempt to turn AI tooling into shared team conventions.",
        tags: ["Claude Code", "AI Workflow", "Developer Tooling"],
        role: "Co-development",
        github: "https://github.com/wigtn/wigtn-plugins",
      },
      {
        slug: "micgolf",
        category: "bootcamp",
        company: "Papata Labs Corporate Collaboration",
        title: "MICGolf Golf Equipment Store",
        summary:
          "I handled core commerce areas including payments, social login, and the back office, and authored 126 commits, 33% of the team's total.",
        tags: ["React", "TypeScript", "Zustand", "TanStack Query", "PortOne"],
        role: "Payments · Auth · Back Office",
        period: "2024",
        github: "https://github.com/MICGolf/frontend",
      },
      {
        slug: "movieget",
        category: "bootcamp",
        company: "OZ Coding School",
        title: "MovieGet Movie Ticketing Site",
        summary:
          "I led a three-person team and authored 185 commits, 50% of the total. I was responsible for payment integration and deployment.",
        tags: ["React", "TypeScript", "Vite", "Toss Payments"],
        role: "Team Lead · Payments · Deployment",
        period: "2024.10 ~ 2024.11",
        github: "https://github.com/movieget/frontend",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's Work Together",
    description:
      "Reach out via Email, GitHub, or LinkedIn. I am currently prioritizing positions at Japanese companies that build their own services.",
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
    rights: "All content on this site is the work of Jinmo Kim.",
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
