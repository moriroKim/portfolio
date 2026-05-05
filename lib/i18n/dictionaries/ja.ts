import type { Dictionary } from "../dictionary.types";

export const ja: Dictionary = {
  meta: {
    siteName: "Jin-mo Kim — Portfolio",
    description:
      "フロントエンドを軸に、新しい領域も学び続けています。",
  },
  nav: {
    home: "ホーム",
    about: "紹介",
    experience: "経歴",
    projects: "作品",
    resume: "履歴書",
    contact: "連絡先",
    email: "メール",
  },
  hero: {
    name: "キム・ジンモ",
    nameRoman: "Jin-mo Kim",
    roleTitle: "Frontend Engineer, always learning",
    positioningPre: "フロントエンドを軸に、",
    positioningEmphasis: "新しい領域",
    positioningPost: "も学び続けています。",
    subtitle: "",
    metaChips: [],
    ctaPrimary: "プロジェクトを見る",
    ctaSecondary: "履歴書",
  },
  stats: {
    eyebrow: "Highlights",
    title: "一目で見るハイライト",
    subtitle: "プロジェクト · 受賞 · 資格 · 自前運用インフラまで一箇所に。",
    items: [
      { value: "9", label: "Projects shipped", meta: "実務 3 · チーム 4 · ブートキャンプ 2" },
      { value: "2", label: "Awards", meta: "Snowflake 2026 · ACL 2026" },
      { value: "N1", label: "JLPT", meta: "2022 取得 · 日本語能力試験 最上級" },
      { value: "1", label: "Self-hosted server", meta: "Mac mini · チームインフラ" },
    ],
  },
  about: {
    eyebrow: "About",
    title: "プロダクトとインフラを共に運用する",
    paragraphs: [
      "**デザイン**から出発し、ブートキャンプを経て開発者へと移ってきました。現在は (株)Soundmind の **MX マネージャー**として自社サービスの**フロントエンドとモバイル**を担当しています。",
      "携帯ショップの**契約書自動生成ツール**を一人で作り、数日かかっていた書類作業を**5分以内**に短縮した経験が一番印象に残っています。AI ツール基盤チーム **WIGTN CREW** の自作ツールから生まれたプロジェクトは **Snowflake 2026 準優勝**と **ACL 2026 デモトラック採択**につながり、副賞の Mac mini は**チームの自宅サーバー**として運用しています。",
      "これからは**バックエンドとインフラ**まで触れる開発者を目指しており、その過程で**新しい領域を学び続ける姿勢**を最も大切にしています。",
    ],
    chips: ["Designer → Engineer", "AI Native", "Self-hosting", "Always Learning", "Japan-bound"],
  },
  career: {
    eyebrow: "Career",
    title: "経歴",
    description: "実務経歴 · 学歴 · 教育修了 · 語学と資格を一つに集約。",
  },
  experience: {
    eyebrow: "Experience",
    title: "実務経歴",
    subtitle: "在籍した会社で責任を持って担当したサービスと領域。",
    viewProjectLabel: "見る",
    items: [
      {
        period: "2025.07 — 現在",
        company: "Soundmind Inc.",
        role: "MX マネージャー",
        summary:
          "自社マルチサービスのフロントエンド・モバイル・バックオフィスを横断的に担当。",
        bullets: [
          {
            title: "Soundmind 統合会員システム",
            detail:
              "React + Spring Boot + MariaDB + Redis セッション設計。自社マルチサービスが共有する認証・アカウントドメインを運用。",
            projectSlug: "soundmind-sso",
          },
          {
            title: "Mohani",
            detail:
              "RN CLI ベースの子供スマホ管理アプリ(アプリブロック・ドメイン遠隔制御)。CodePush で OTA 更新を運用。",
            projectSlug: "mohani",
          },
          {
            title: "Chocopie",
            detail:
              "通信代理店向け開通チャネル バックオフィス。Canvas 座標マッピングベースの契約書自動生成・A4 出力ツールを単独で設計・デプロイ(Nginx + Jenkins)。",
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
        company: "How About (女性向けアパレル EC)",
        role: "Web デザイナー / パブリッシャー",
        bullets: [
          { title: "自社モールのデザイン + パブリッシングをフルサイクルで担当" },
          { title: "Photoshop デザイン → HTML/CSS/JS マークアップ → Cafe24 反映" },
          { title: "視覚設計とマークアップの基礎を確立" },
        ],
        tags: ["HTML", "JavaScript", "CSS", "Photoshop", "Cafe24"],
      },
    ],
  },
  education: {
    eyebrow: "Education",
    title: "学歴",
    subtitle: "正規の教育課程で学んだ学校。",
    items: [
      {
        period: "2025.03 — 2025.06",
        institution: "江西ポリテック大学",
        major: "スマート金融科 (早期就業のため中途修了)",
        note:
          "フロント/バックエンド/DB/AI/Docker を網羅するブートキャンプ型カリキュラム。",
      },
      {
        period: "2016 — 2024",
        institution: "蔚山大学校",
        major: "中国語中国文学 / 日本語日本文学 (4年制 学士)",
        note: "ダブル専攻で中国語・日本語の両言語を履修。日本語は卒業時点で JLPT N1 取得。",
      },
    ],
  },
  training: {
    eyebrow: "Training",
    title: "教育・修了",
    subtitle: "正規の学歴以外に修了したブートキャンプ・短期プログラム。",
    viewProjectLabel: "見る",
    items: [
      {
        period: "2024.06 — 2024.12",
        institution: "Ozcodingschool — フロントエンドコース",
        program: "6ヶ月コース修了",
        note:
          "企業協業とチームプロジェクトを通じて、実践的なプロダクトサイクル全体を経験。",
        bullets: [
          {
            title: "MovieGet — 映画予約サイト (チームリーダー)",
            detail:
              "3名チームで貢献度1位 (50%, 185 コミット)。Toss Payments 決済統合、TMDB API 連携、リストの無限スクロールのリファクタリング、AWS デプロイを担当。統合マージ PR とビルドブロッカーも自分で対応。",
            projectSlug: "movieget",
          },
          {
            title: "MICGolf — PapaTaLabs 企業協業 自社モール",
            detail:
              "4名チームで貢献度2位 (33%, 126 コミット)。PortOne 決済統合、メール / Naver / Kakao ソーシャルログイン、バックオフィス CRUD、カテゴリ・商品の無限スクロールなど EC のコア領域を担当。",
            projectSlug: "micgolf",
          },
        ],
        tags: ["React", "TypeScript", "Vite", "Zustand", "TanStack Query"],
      },
    ],
  },
  achievements: {
    eyebrow: "Certifications & Awards",
    title: "資格 · 受賞",
    subtitle: "公式試験で取得した資格と、対外的に評価された受賞歴。",
    viewProjectLabel: "見る",
    items: [
      {
        kind: "language",
        date: "2022",
        title: "JLPT N1 (日本語能力試験 1級)",
        meta: "ビジネス会話は強化中 / 漢字は文脈推測中心",
      },
      {
        kind: "award",
        date: "2026",
        title: "Snowflake 2026 ハッカソン準優勝",
        meta: "wigtn-for-snowflake · Team WIGTN CREW",
        projectSlug: "wigtn-snowflake",
        medal: "silver",
      },
      {
        kind: "award",
        date: "2026",
        title: "ACL 2026 Demo Track 採択",
        meta: "wigvo-v2 · Team WIGTN CREW",
        projectSlug: "wigvo-v2",
        medal: "gold",
      },
    ],
  },
  techStack: {
    eyebrow: "Tech Stack",
    title: "使用技術",
    subtitle: "実際のプロジェクトで手を動かして扱った道具と環境。",
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
          "Mac mini セルフホスティング",
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
      title: "実務プロジェクト",
      description:
        "Soundmind 社で複数領域を横断して担当した自社サービス。カードを押すと詳細ケーススタディに移動します。",
    },
    team: {
      eyebrow: "Team & Bootcamp",
      title: "チームプロジェクト",
      description:
        "WIGTN CREW チーム作品とブートキャンプ成果物。ハッカソン受賞作および本人の直接実装比率が高いものを優先。",
    },
    viewCaseStudy: "ケーススタディを見る",
    showMore: "もっと見る",
    showLess: "閉じる",
    items: [
      {
        slug: "wigex",
        category: "team",
        company: "WIGTN CREW",
        title: "wigex — 旅行家計簿 / モノレポ",
        summary:
          "NestJS · Prisma バックエンドと Expo モバイルをモノレポで運用。GCP Cloud Run。",
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
          "Snowflake 2026 ハッカソン準優勝。副賞 Mac mini をチーム自宅サーバーとして運用中。",
        tags: ["Snowflake", "Self-hosting", "Mac mini"],
        role: "Demo · Infra",
        award: "Snowflake 2026 準優勝",
        awardTier: "silver",
        github: "https://github.com/wigtn/wigtn-for-snowflake",
      },
      {
        slug: "soundmind-sso",
        category: "work",
        company: "Soundmind Inc.",
        title: "Soundmind 統合会員システム",
        summary:
          "React + Spring Boot ベースの自社統合認証 · アカウントドメイン。",
        tags: ["React", "Spring Boot", "MariaDB", "Redis"],
        role: "MX マネージャー",
        period: "2025.07 — 現在",
        featured: true,
      },
      {
        slug: "wigvo-v2",
        category: "team",
        company: "WIGTN CREW",
        title: "wigvo-v2",
        summary:
          "ACL 2026 Demo Track 採択。チーム作品に軽度の参加。",
        tags: ["AI", "NLP", "Demo"],
        role: "参加",
        award: "ACL 2026 採択",
        awardTier: "gold",
        github: "https://github.com/wigtn/wigvo-v2",
      },
      {
        slug: "chocopie-contract",
        category: "work",
        company: "Soundmind Inc.",
        title: "Chocopie — 契約書オーサリングツール",
        summary:
          "Canvas 座標マッピングで契約書自動生成と A4 出力まで単独実装。",
        tags: ["Canvas", "TypeScript", "Spring Boot", "Nginx"],
        role: "Solo (契約書ドメイン)",
      },
      {
        slug: "mohani",
        category: "work",
        company: "Soundmind Inc.",
        title: "Mohani — 子供のスマホ管理アプリ",
        summary:
          "子供のスマホ向けアプリブロック · ドメイン遠隔制御 RN アプリ。",
        tags: ["React Native", "Spring Boot", "Redis", "Supabase"],
        role: "Frontend · Mobile",
      },
      {
        slug: "movieget",
        category: "bootcamp",
        company: "Ozcodingschool",
        title: "MovieGet — 映画予約サイト",
        summary:
          "3名チームリーダー、コミット1位 (50%)。Toss Payments · TMDB 連携。",
        tags: ["React", "TypeScript", "Vite", "Toss Payments"],
        role: "Lead · 決済",
        period: "2024.10 — 2024.11",
        github: "https://github.com/movieget/frontend",
      },
      {
        slug: "micgolf",
        category: "bootcamp",
        company: "PapaTaLabs Industry-Academia",
        title: "MICGolf — ゴルフ用品自社モール",
        summary:
          "PortOne 決済 · ソーシャルログイン · バックオフィスまで EC コア担当 (33% コミット)。",
        tags: ["React", "TypeScript", "Zustand", "TanStack Query", "PortOne"],
        role: "決済 · 認証 · バックオフィス",
        featured: true,
        github: "https://github.com/MICGolf/frontend",
      },
      {
        slug: "wigtn-coding",
        category: "team",
        company: "WIGTN CREW",
        title: "wigtn-coding",
        summary:
          "チームワークフローを標準化した Claude Code プラグインを自作。",
        tags: ["Claude Code", "AI Workflow"],
        role: "AI Workflow",
        featured: true,
        github: "https://github.com/wigtn/wigtn-plugins-with-claude-code",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "一緒に働きませんか",
    description:
      "Email · GitHub · LinkedIn のいずれかでご連絡ください。日本の自社サービス企業のポジションを優先的に検討しています。",
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
    copyLabel: "コピー",
    copiedLabel: "コピー済み",
  },
  footer: {
    contact: "コンタクト",
    email: "jinmo@wigtn.com",
    github: "github.com/morirokim",
    rights: "本サイトのすべてのコンテンツは Jin-mo Kim の制作物です。",
  },
  common: {
    role: "役割",
    period: "期間",
    team: "チーム",
    visibility: "公開",
    publicLabel: "公開",
    privateLabel: "非公開 (業務)",
    inProgress: "進行中",
  },
};
