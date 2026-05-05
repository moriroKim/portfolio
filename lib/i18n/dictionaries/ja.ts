import type { Dictionary } from "../dictionary.types";

export const ja: Dictionary = {
  meta: {
    siteName: "Jin-mo Kim — Portfolio",
    description:
      "フロントエンド出身、バックエンドとインフラへ活動領域を広げているエンジニア。",
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
    roleTitle: "Software Engineer",
    positioningPre: "フロントエンド出身、バックエンドと",
    positioningEmphasis: "インフラ",
    positioningPost: "へ活動領域を広げているエンジニア。",
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
      { value: "9", label: "Projects shipped" },
      { value: "2", label: "Awards", meta: "Snowflake 2026 · ACL 2026" },
      { value: "N1", label: "JLPT" },
      { value: "1", label: "Self-hosted server", meta: "Mac mini · チームインフラ" },
    ],
  },
  about: {
    eyebrow: "About",
    title: "プロダクトとインフラを共に運用する",
    paragraphs: [
      "8年間、EC ショッピングモールのウェブデザイナー兼パブリッシャーとして、ビジュアル設計とマークアップを一つのサイクルで扱ってきました。その経験はブートキャンプで EC 企業協業プロジェクト(PapaTaLabs 自社モール)や映画予約サイトのリーダー役へと自然につながり、デザイン感覚と EC ドメインを資産として持ち込みながらコード領域へ移ってきました。",
      "現在は (株)Soundmind の MX マネージャーとして、自社マルチサービスのフロントエンド・モバイル・バックエンドを担当しています。通信代理店向け統合運用システム Chocopie には React 19 ベースの PDF 契約書オーサリングツールを 21,489 LOC の単一 PR で 0→1 で単独構築・統合し(Fabric.js + Web Worker + IndexedDB)、フォーム登録時間を数日から約5分に短縮しました。",
      "また AI-Native な開発チーム WIGTN CREW では Claude Code プラグインを自作し、PRD → digging → implement → 品質検査 のループを標準化しました。チームの全プロジェクトがこのワークフロー上で出品・運用されており、AI 協業環境におけるコンテキストとハーネス設計を実戦の中で検証しています。",
      "このワークフロー上で出品した wigtn-for-snowflake が Snowflake 2026 ハッカソン準優勝、wigvo-v2 が ACL 2026 デモトラックに採択されました。副賞で得た Mac mini をチームの自宅サーバーとして構築し、自社プロジェクトのバックエンドをセルフホスティングしています。",
      "一方、子どものスマホ管理ソリューション Mohani の SSO 認証サーバーでは、会員ライフサイクル方針を Phase 0~4 にわたって全面再設計しました — 休眠→匿名化→3年保管→ハードデリートの状態機械、そして外部偽造 webhook・退会後の JWT 再利用・イベント消失/重複・退会後 race のそれぞれを、最も近いレイヤーが担う4重防御線の導入。この経験を足がかりにバックエンド・インフラへ重心を移しており、長期的には DevOps · MLOps · LLMOps を志向しつつ、短期的には日本の自社サービス企業への転職を準備しています。",
    ],
    chips: ["JLPT N1", "AI Native", "Self-hosting", "Japan-bound"],
  },
  career: {
    eyebrow: "Career",
    title: "経歴",
    description: "実務経歴 · 学歴 · 教育修了 · 語学と資格を一つに集約。",
  },
  experience: {
    eyebrow: "Experience",
    title: "実務経歴",
    subtitle: "Work",
    items: [
      {
        period: "2025.07 — 現在",
        company: "Soundmind Inc.",
        role: "MX マネージャー",
        description:
          "自社マルチサービスのフロントエンド・モバイル・バックオフィスを横断的に担当。Soundmind 統合会員システム(共通認証/アカウント)、Mohani(子供のスマホ管理 RN アプリ)、Chocopie(開通チャネル バックオフィス)でクロススタック貢献。",
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
        company: "How About (女性向けアパレル EC)",
        role: "Web デザイナー / パブリッシャー",
        description:
          "自社モールのデザインとパブリッシングを兼任。視覚設計をベースにコードへ落とすサイクルを経験。",
        tags: ["HTML", "JavaScript", "CSS", "Photoshop", "Cafe24"],
      },
    ],
  },
  education: {
    eyebrow: "Education",
    title: "学歴",
    subtitle: "Schools",
    items: [
      {
        period: "2025.03 — 2025.06",
        institution: "江西ポリテック大学",
        major: "スマート金融科 (早期就業のため中途修了)",
        note:
          "フロント/バックエンド/DB/AI/Docker/K8s を網羅するブートキャンプ型カリキュラム。",
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
    subtitle: "Bootcamps & Programs",
    items: [
      {
        period: "2024.06 — 2024.12",
        institution: "Ozcodingschool",
        program: "フロントエンド ブートキャンプ 6ヶ月修了",
        note:
          "企業協業 (PapaTaLabs 自社モール)、チームプロジェクト (映画予約サイト, リーダー) で実践的なプロダクトサイクル全体を経験。",
        tags: ["React", "TypeScript", "Vite", "Zustand", "TanStack Query"],
      },
    ],
  },
  achievements: {
    eyebrow: "Languages & Certs",
    title: "語学 · 資格",
    subtitle: "Languages & Certifications",
    items: [
      {
        kind: "language",
        date: "2022",
        title: "JLPT N1 (日本語能力試験 1級)",
        meta: "ビジネス会話は強化中 / 漢字は文脈推測中心",
      },
    ],
  },
  techStack: {
    eyebrow: "Tech Stack",
    title: "使用技術",
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
          "Mac mini セルフホスティング",
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
      title: "会社プロジェクト",
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
    items: [
      {
        slug: "wigex",
        category: "team",
        company: "WIGTN CREW",
        title: "wigex — 旅行家計簿 / モノレポ",
        summary:
          "NestJS + Prisma 通知ドメイン · 共通ウォレット · AI 為替を直接実装。GCP Cloud Run 運用(リージョン東京→ソウル移転含む)。api · admin · mobile モノレポ全体にまたがる作業。",
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
          "Snowflake 2026 ハッカソン準優勝作。副賞 Mac mini をチーム自宅サーバーとして構築し、現在 wigex のバックエンドをホスティング。",
        tags: ["Snowflake", "Self-hosting", "Mac mini"],
        role: "Demo · Infra",
        badge: "Snowflake 2026 準優勝",
        featured: true,
      },
      {
        slug: "soundmind-sso",
        category: "work",
        company: "Soundmind Inc.",
        title: "Soundmind 統合会員システム",
        summary:
          "自社マルチサービスが依存する共通認証 · アカウントドメイン。React + Spring Boot + MariaDB + Redis セッション設計。",
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
          "ACL 2026 Demo Track 採択作。チーム作品で本人のコード貢献度は低く、軽度の参加。",
        tags: ["AI", "NLP", "Demo"],
        role: "参加 (コード貢献度は低い)",
        badge: "ACL 2026 採択",
      },
      {
        slug: "chocopie-contract",
        category: "work",
        company: "Soundmind Inc.",
        title: "Chocopie — 契約書オーサリングツール",
        summary:
          "携帯開通契約書を HTML Canvas にロード → 図形/顧客情報を座標マッピング → 入力値をフォームにテキストレンダリング → A4 出力まで自動化。単独担当。",
        tags: ["Canvas", "TypeScript", "Spring Boot", "Nginx"],
        role: "Solo (契約書ドメイン)",
      },
      {
        slug: "mohani",
        category: "work",
        company: "Soundmind Inc.",
        title: "Mohani — 子供のスマホ管理アプリ",
        summary:
          "アプリブロック / ドメインアクセス遠隔制御。RN CLI · CodePush ベースで運用。",
        tags: ["React Native", "Spring Boot", "Redis", "Supabase"],
        role: "Frontend · Mobile",
      },
      {
        slug: "movieget",
        category: "bootcamp",
        company: "Ozcodingschool",
        title: "MovieGet — 映画予約サイト",
        summary:
          "リーダー + コミット 1位 (50%)。Toss Payments 統合、TMDB 連携。4週間プロジェクト。",
        tags: ["React", "TypeScript", "Vite", "Toss Payments"],
        role: "Lead · 決済",
        period: "2024.10 — 2024.11",
      },
      {
        slug: "micgolf",
        category: "bootcamp",
        company: "PapaTaLabs Industry-Academia",
        title: "MICGolf — ゴルフ用品自社モール",
        summary:
          "PortOne 決済統合、Email/Naver/Kakao ソーシャルログイン、バックオフィス CRUD、無限スクロールなど EC コア領域を担当 (33% コミット)。",
        tags: ["React", "TypeScript", "Zustand", "TanStack Query", "PortOne"],
        role: "決済 · 認証 · バックオフィス",
      },
      {
        slug: "wigtn-plugins",
        category: "team",
        company: "WIGTN CREW",
        title: "wigtn-plugins-with-claude-code",
        summary:
          "チームワークフローの基盤となる Claude Code プラグインを自作。PRD → digging → implement → 品質検査ループの標準化。",
        tags: ["Claude Code", "AI Workflow"],
        role: "AI Workflow",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "一緒に働きませんか",
    description:
      "Email または GitHub までご連絡ください。日本の自社サービス企業のポジションを優先的に検討しています。",
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
