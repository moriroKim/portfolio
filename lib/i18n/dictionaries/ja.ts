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
    backToList: "プロジェクト一覧",
    noCaseStudy: "このプロジェクトの詳細ケーススタディは準備中です。",
    roleLabel: "役割",
    stackLabel: "使用技術",
    periodLabel: "期間",
    items: [
      {
        slug: "odiya-child",
        category: "work",
        company: "サウンドマインド",
        title: "オディヤ — 子ども端末の位置収集",
        summary:
          "モバイルデータが普段オフの管理端末で、位置情報を取りこぼさず送るアプリ。",
        tags: ["React Native", "Android", "Java", "Kotlin", "FCM"],
        role: "設計・ネイティブ実装",
        period: "2025.07 — 現在",
        featured: true,
        caseStudy: {
          tagline:
            "MDMがデータをオフにし、ログも見られない端末で、電池を節約しながら位置を逃さない方法。",
          role: "位置収集ステートマシンの設計と Android ネイティブ実装",
          period: "2025.07 — 現在",
          stack: ["React Native", "Android (Java/Kotlin)", "FusedLocation", "Activity Recognition", "FCM"],
          metrics: [
            { value: "100%", label: "送信成功率（従来は平均1.17秒でデータが切断）" },
            { value: "357秒", label: "省電力モードで実測した最大タイマー遅延（設定値45秒）" },
            { value: "4/4", label: "地下鉄移動の実測ケースで基地局座標を正しく判別" },
          ],
          blocks: [
            {
              heading: "課題",
              body:
                "このアプリが動くのは通常のスマートフォンではない。管理ポリシーが端末全体のモバイルデータを普段オフにしており、開発者モードが塞がれているためログも取得できない。それでも要件は「子どもの居場所を保護者がいつでも確認できること」だった。データがオフの端末から定期的に位置を送信し、問題が起きても原因を見る手段がない状態で安定性を確保する必要があった。",
            },
            {
              heading: "制約",
              body:
                "簡単な解法がすべて塞がれていた。ネットワークが閉じているためサーバーからアプリへ先に連絡できず、プッシュによる制御ができない。ログが見られないため再現しないバグは推測で直すしかない。さらに OS の省電力ポリシーが予約したタイマーを任意に遅延させる。",
              bullets: [
                "データをオンにするには管理エージェントへ依頼が必要で、3〜5秒かかり完了通知もない",
                "省電力モードで予約タイマーが45秒ではなく最大357秒まで遅延（実測）",
                "GPSを常時オンにすると電池が一日もたない",
              ],
            },
            {
              heading: "判断",
              body:
                "四点を変更した。第一に、複数箇所から行っていたデータのオン・オフ要求を一箇所へ集約し、要求元をカウントして最後の利用者が終わるまでオフにしないようにした。最低6秒は維持する規則も加えた。第二に、タイマーを信用せず実時刻を基準に再確認する仕組みを置いた。第三に、GPSを点灯する条件を時間ではなく「最後に位置を取得してからの経過」に変えた。第四に、受け取った座標をそのまま信用せず三段階で検証した。",
              bullets: [
                "データ開放・返却を一箇所で管理 — 要求元別カウント、最低維持6秒、返却漏れ対策を四重に",
                "実時刻基準の再確認 — 省電力モードのタイマー遅延を補正",
                "GPS点灯条件を「保有位置の経過時間」へ — 送信失敗で条件がロックされない構造",
                "座標の三段検証 — 精度ゲート、衛星数による基地局座標の判別、移動速度の妥当性",
              ],
            },
            {
              heading: "結果",
              body:
                "送信途中でデータが切れる問題が解消した。従来はデータがオンの状態が平均1.17秒しか維持されず送信が頻繁に失敗していたが、最低6秒維持の規則を入れて以降は送信成功率が100%になった。GPS点灯条件を変えたことで、送信に一度失敗しただけでアプリが沈黙し続ける事象もなくなった。座標検証は地下鉄移動の実測4件すべてで基地局座標を正しく除外し、確信が持てない場合は表示しないようにしたため、保護者アプリが誤った位置を描かなくなった。",
            },
          ],
        },
      },
      {
        slug: "odiya-parents",
        category: "work",
        company: "サウンドマインド",
        title: "オディヤ — 保護者アプリ",
        summary:
          "不確かな位置データを誇張せずに見せる地図アプリ。滞在地・移動経路・リアルタイム追跡。",
        tags: ["React Native", "TypeScript", "TanStack Query", "Zustand", "Naver Map"],
        role: "フロントエンド設計・実装",
        period: "2025.07 — 現在",
        featured: true,
        caseStudy: {
          tagline:
            "GPSはよく間違える。間違いをもっともらしく見せる代わりに、分からないことは分からないと言うUI。",
          role: "位置解釈ロジックと画面の設計・実装",
          period: "2025.07 — 現在",
          stack: ["React Native", "TypeScript", "TanStack Query", "Zustand", "Naver Map", "STOMP"],
          metrics: [
            { value: "89件", label: "位置解釈ロジックの単体テスト" },
            { value: "956駅", label: "地下鉄推論に使う駅データ（47路線）" },
            { value: "3段", label: "移動手段推論のフィルタ — 駅位置・距離・所要時間" },
          ],
          blocks: [
            {
              heading: "課題",
              body:
                "保護者が見る画面は、子どもアプリが送った座標をそのまま打つのではなく、解釈して見せる必要がある。「家に2時間いた」「地下鉄で移動したようだ」といった言葉に変えて初めて役に立つ。しかし元データは綺麗ではない。屋内ではGPSが揺れ、地下鉄では途切れる。解釈を誤ると保護者が誤った情報を事実として信じてしまう。",
            },
            {
              heading: "制約",
              body:
                "最大の制約はデータ自体ではなく利用者側にあった。子どもアプリはストア経由で配布されるが、実際に使われている端末の大半が旧バージョンだった。新機能として作った解釈画面は、旧バージョンが送らないデータを必要とする。さらにリアルタイム追跡はアプリとサーバーが各自で状態を判断し、食い違うことが多かった。",
              bullets: [
                "屋内GPSの揺れで、一箇所の滞在が複数に分割される",
                "地下鉄区間は座標が丸ごと欠落 — 推論以外に方法がない",
                "旧バージョンの子どもアプリは解釈に必要なフィールドを送らない",
              ],
            },
            {
              heading: "判断",
              body:
                "貫く原則を一つ決めた。「間違えるくらいなら見せない」。この原則を三箇所に同じように適用した。地下鉄移動は駅位置・距離・所要時間の三条件をすべて満たすときだけ表示し、一つでも外れれば沈黙する。滞在地は一定半径を超えて初めて別の場所として分け、日付をまたぐ滞在は日ごとに切って計算する。旧バージョン利用者には解釈画面そのものを出さない。リアルタイム追跡はアプリが判断せずサーバーの状態にのみ従うようにした。",
              bullets: [
                "地下鉄推論の三段フィルタ — 一つでも合わなければ表示しない",
                "滞在クラスタリングに半径基準の分離と日付分割の規則",
                "子どもアプリのバージョン別UIゲート — 無いデータを有るように見せない",
                "リアルタイム追跡はサーバー状態のみに追従、プッシュは更新を早める信号としてのみ使用",
              ],
            },
            {
              heading: "結果",
              body:
                "解釈規則はすべて純粋関数として切り出し、単体テストを89件付けた。規則が微妙（半径の倍率、日付跨ぎの処理、空白判定の基準）で、コードだけでは守れなかったためである。屋内滞在が分割される問題と誤った地下鉄推論はなくなり、旧バージョン利用者に空の画面が出る問題も解消した。副次的に、チャットメッセージが途中で切れて届く原因を追跡し、React Native が文字列送信時に特定の文字で切断する問題であることを突き止めて送信方式を変更し解決した。",
            },
          ],
        },
      },
      {
        slug: "kocca-kstt",
        category: "work",
        company: "サウンドマインド",
        title: "KSTT — 韓国語スピーキング試験プラットフォーム",
        summary:
          "受験画面から採点管理者、音声認識処理、無停止デプロイまで担当した Next.js フルスタックサービス。",
        tags: ["Next.js", "TypeScript", "Prisma", "MySQL", "Docker", "Playwright"],
        role: "フルスタック（全領域）",
        period: "2025.07 — 現在",
        featured: true,
        caseStudy: {
          tagline:
            "試験は一度受けたら取り消せない。運用中に何が変わっても、既に受けた結果が揺らがないようにする仕事。",
          role: "受験・採点管理・音声認識パイプライン・デプロイの全領域",
          period: "2025.07 — 現在",
          stack: ["Next.js 15", "React 19", "TypeScript", "Prisma", "MySQL", "Docker", "Vitest", "Playwright"],
          metrics: [
            { value: "30余", label: "採点・運用の管理者画面" },
            { value: "50", label: "データモデル数" },
            { value: "0件", label: "デプロイ中の破壊的スキーマ変更（自動遮断）" },
          ],
          blocks: [
            {
              heading: "課題",
              body:
                "外国人学習者がブラウザで発音とスピーキングを録音して受験し、その録音を音声認識で書き起こしたうえで採点者が採点するサービスである。最終目的は採点結果だけでなく、個人情報を除去し音量を均一化した AI 学習用データセットを作ることだった。問題は、この全体が運用中も変わり続ける点にある。設問を直し、回次を追加し、デプロイする。その間、既に受けた試験の結果は決して変わってはならない。",
            },
            {
              heading: "制約",
              body:
                "無停止デプロイを使うため、デプロイ中は旧コードと新コードが一時的に同時に動く。このときDB構造が変わると旧コードが壊れる。また音声認識処理は時間がかかるため別プログラムが担うが、誤って二つ同時に動くと同じ録音を重複処理してしまう。受験者側では、URLを操作したり翻訳機能で設問を読む迂回経路があった。",
            },
            {
              heading: "判断",
              body:
                "「取り消せないものには触れない」を基準に四点を定めた。デプロイ時のDB構造変更は追加のみ許可し、カラム削除やデータ削除の命令が一つでもあればデプロイを中止する。録音は再受験しても削除せず残す。設問は受験時点の内容を別途保管し、後から直しても既に受けた回次はそのまま維持される。音声認識プログラムは生存を定期的に記録させ、一つだけが動くようにした。",
              bullets: [
                "デプロイ時のスキーマ変更は追加専用 — 破壊的命令を検知したらデプロイ中止",
                "録音は削除せず世代として蓄積 — 管理者による再受験と自主的な録り直しを区別",
                "回次ごとの設問を受験時点のまま保管",
                "音声認識処理の二重起動を遮断 — 生存記録に基づく",
                "受験画面の迂回経路を遮断 — URL操作、翻訳機能の悪用、マイクテストの有効性",
              ],
            },
            {
              heading: "結果",
              body:
                "デプロイがスキーマ事故で失敗することがなくなった。破壊的命令はデプロイスクリプトが自動で弾くため、誤ってマイグレーションに DROP を入れてもサーバーに到達しない。設問を運用中に修正しても、進行中および終了済みの回次の結果は変わらない。録音ファイルは音量を均一化し個人情報を除去したうえで匿名IDに紐づけ、AI学習用データセットとして書き出す工程まで自動化した。",
            },
          ],
        },
      },
      {
        slug: "odiya-backend",
        category: "work",
        company: "サウンドマインド",
        title: "オディヤ — 位置収集サーバー",
        summary: "一度に流入する位置データを失わずに保存する Spring Boot サーバー。",
        tags: ["Spring Boot", "Java", "Redis", "MariaDB", "Flyway"],
        role: "バックエンド",
        period: "2025.07 — 現在",
      },
      {
        slug: "mohani",
        category: "work",
        company: "サウンドマインド",
        title: "モハニ — 子どものスマホ利用管理",
        summary:
          "保護者が子どものスマホのアプリ利用を遠隔制御するサービス。サーバー・子どもアプリ・保護者アプリを担当。",
        tags: ["React Native", "Spring Boot", "Android", "Knox SDK", "FCM"],
        role: "サーバー・子どもアプリ・保護者アプリ",
        period: "2025.07 — 現在",
      },
      {
        slug: "soundmind-sso",
        category: "work",
        company: "サウンドマインド",
        title: "統合ログインサーバー",
        summary:
          "複数の自社サービスが共有するログイン・アカウントサーバー。利用者種別ごとのトークン方針を設計。",
        tags: ["Spring Boot", "Java", "MariaDB", "Redis", "Next.js"],
        role: "バックエンド・運用ダッシュボード",
        period: "2025.07 — 現在",
      },
      {
        slug: "wigtn-snowflake",
        category: "team",
        company: "WIGTN CREW",
        title: "wigtn-for-snowflake",
        summary:
          "Snowflake AI & Data Hackathon Korea 2026 準優勝作。副賞の Mac mini をチームのホームサーバーとして運用。",
        tags: ["Snowflake", "Self-hosting"],
        role: "共同開発・インフラ",
        award: "Snowflake 2026 準優勝",
        awardTier: "silver",
        github: "https://github.com/wigtn/wigtn-for-snowflake",
      },
      {
        slug: "wigvo-v2",
        category: "team",
        company: "WIGTN CREW",
        title: "WIGVO — リアルタイム双方向音声翻訳",
        summary:
          "一般電話網の通話をリアルタイム翻訳するシステム。ACL 2026 Demo Track 採択、共著者として参加。",
        tags: ["AI", "Speech", "Real-time"],
        role: "共著者・開発参加",
        award: "ACL 2026 採択",
        awardTier: "gold",
        github: "https://github.com/wigtn/wigvo-v2",
      },
      {
        slug: "wigex",
        category: "team",
        company: "WIGTN CREW",
        title: "wigex — 旅行家計簿",
        summary:
          "NestJS・Prisma のバックエンドと Expo モバイルを単一リポジトリで運用。GCP Cloud Run へデプロイ。",
        tags: ["NestJS", "Prisma", "Supabase", "Expo", "GCP Cloud Run"],
        role: "バックエンド・モバイル・インフラ",
        status: "In progress",
        github: "https://github.com/wigtn/wigex",
      },
      {
        slug: "wigtn-coding",
        category: "team",
        company: "WIGTN CREW",
        title: "wigtn-coding",
        summary: "チームの開発ワークフローを標準化した Claude Code プラグイン。",
        tags: ["Claude Code", "AI Workflow"],
        role: "共同開発",
        github: "https://github.com/wigtn/wigtn-plugins-with-claude-code",
      },
      {
        slug: "micgolf",
        category: "bootcamp",
        company: "パパタラボ 企業協業",
        title: "MICGolf — ゴルフ用品の自社モール",
        summary:
          "決済・ソーシャルログイン・バックオフィスなどEC中核領域を担当（コミット33%、126件）。",
        tags: ["React", "TypeScript", "Zustand", "TanStack Query", "PortOne"],
        role: "決済・認証・バックオフィス",
        period: "2024",
        github: "https://github.com/MICGolf/frontend",
      },
      {
        slug: "movieget",
        category: "bootcamp",
        company: "オズコーディングスクール",
        title: "MovieGet — 映画予約サイト",
        summary: "3人チームのリーダー、コミット1位（50%、185件）。決済連携とデプロイを担当。",
        tags: ["React", "TypeScript", "Vite", "Toss Payments"],
        role: "リーダー・決済・デプロイ",
        period: "2024.10 — 2024.11",
        github: "https://github.com/movieget/frontend",
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
