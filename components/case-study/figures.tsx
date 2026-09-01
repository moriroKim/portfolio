"use client";

/* ------------------------------------------------------------------
   블록 단위 인라인 도식. 상단의 시스템 다이어그램과 달리, 각 블록이
   설명하는 논리 자체를 그린다. slug + heading 키로 매칭된다.
------------------------------------------------------------------ */

import type { ReactNode } from "react";

const L = (s: string, i: number) => {
  const p = s.split("|");
  return p.length === 3 ? p[i] : s;
};
const idx = (loc: string) => (loc === "ja" ? 1 : loc === "en" ? 2 : 0);

function Frame({ caption, height, children }: { caption: string; height: number; children: ReactNode }) {
  return (
    <figure className="my-7 overflow-hidden rounded-xl border border-line bg-paper-warm">
      <div className="overflow-x-auto p-4 sm:p-5">
        <svg viewBox={`0 0 720 ${height}`} width="100%" style={{ minWidth: 520 }} role="img" aria-label={caption}>
          {children}
        </svg>
      </div>
      <figcaption className="border-t border-line/70 px-5 py-2.5 text-center text-[11px] leading-relaxed text-ink-soft">
        {caption}
      </figcaption>
    </figure>
  );
}

/* ── 도즈: 시간 축 위에서 알람이 어떻게 밀리는가 ── */
function DozeTimeline({ loc }: { loc: string }) {
  const i = idx(loc);
  const t = (s: string) => L(s, i);
  const marks = [0, 45, 136, 240, 357];
  const x = (sec: number) => 90 + (sec / 400) * 560;
  return (
    <Frame
      height={188}
      caption={t(
        "예약한 45초는 도즈에서 지켜지지 않습니다. 실측 발화 시점은 136초에서 357초 사이에 흩어졌고, 그래서 타이머 대신 벽시계로 지난 시간을 다시 계산합니다|予約した45秒はDozeでは守られません。実測の発火時点は136秒から357秒の間に散らばり、そのためタイマーではなく壁時計で経過時間を計算し直します|A scheduled 45 seconds does not hold under doze. Measured firings scattered between 136 and 357 seconds, which is why the wall clock, not the timer, decides how much time passed.",
      )}
    >
      {/* 축 */}
      <line x1={90} y1={118} x2={660} y2={118} stroke="var(--color-line-strong)" strokeWidth={1.5} />
      {marks.map((m) => (
        <g key={m}>
          <line x1={x(m)} y1={113} x2={x(m)} y2={123} stroke="var(--color-line-strong)" strokeWidth={1} />
          <text x={x(m)} y={139} textAnchor="middle" className="fig-tick">{m}s</text>
        </g>
      ))}

      {/* 예약 */}
      <text x={16} y={62} className="fig-lab" fill="#059669">{t("예약|予約|scheduled")}</text>
      <rect x={x(0)} y={48} width={x(45) - x(0)} height={18} rx={9} fill="rgba(5,150,105,0.18)" stroke="#059669" strokeWidth={1} />
      <circle cx={x(45)} cy={57} r={4} fill="#059669" />
      <text x={x(45) + 10} y={61} className="fig-note" fill="#059669">45s</text>

      {/* 실측 범위 */}
      <text x={16} y={94} className="fig-lab" fill="#e11d48">{t("실측|実測|measured")}</text>
      <rect x={x(136)} y={80} width={x(357) - x(136)} height={18} rx={9} fill="rgba(225,29,72,0.14)" stroke="#e11d48" strokeWidth={1} strokeDasharray="4 3" />
      <circle cx={x(136)} cy={89} r={4} fill="#e11d48" />
      <circle cx={x(357)} cy={89} r={4} fill="#e11d48" />
      <text x={(x(136) + x(357)) / 2} y={75} textAnchor="middle" className="fig-note" fill="#e11d48">
        {t("136s ~ 357s 사이에 발화|136s ~ 357sの間に発火|fires between 136s and 357s")}
      </text>

      {/* 편차 화살표 */}
      <path d={`M ${x(45)} 160 L ${x(357)} 160`} stroke="var(--color-violet)" strokeWidth={1.2} strokeDasharray="3 3" />
      <path d={`M ${x(45)} 160 l 6 -4 l 0 8 z`} fill="var(--color-violet)" />
      <path d={`M ${x(357)} 160 l -6 -4 l 0 8 z`} fill="var(--color-violet)" />
      <text x={(x(45) + x(357)) / 2} y={176} textAnchor="middle" className="fig-note" fill="var(--color-violet)">
        {t("이 편차를 벽시계로 보정|このズレを壁時計で補正|corrected against the wall clock")}
      </text>
    </Frame>
  );
}

/* ── 코드푸시: 두 경로 비교 ── */
function CodePushPaths({ loc }: { loc: string }) {
  const i = idx(loc);
  const t = (s: string) => L(s, i);
  const Node = ({ x, y, w, label, tone }: { x: number; y: number; w: number; label: string; tone: "bad" | "good" }) => {
    const c = tone === "bad" ? "#e11d48" : "#059669";
    const bg = tone === "bad" ? "rgba(225,29,72,0.08)" : "rgba(5,150,105,0.08)";
    return (
      <g>
        <rect x={x} y={y} width={w} height={34} rx={6} fill={bg} stroke={c} strokeWidth={1.2} />
        <text x={x + w / 2} y={y + 21} textAnchor="middle" className="fig-node" fill={c}>{label}</text>
      </g>
    );
  };
  const Arrow = ({ x1, x2, y, tone }: { x1: number; x2: number; y: number; tone: "bad" | "good" }) => (
    <g>
      <line x1={x1} y1={y} x2={x2 - 7} y2={y} stroke={tone === "bad" ? "#e11d48" : "#059669"} strokeWidth={1.2} opacity={0.6} />
      <path d={`M ${x2} ${y} l -7 -4 l 0 8 z`} fill={tone === "bad" ? "#e11d48" : "#059669"} opacity={0.8} />
    </g>
  );
  return (
    <Frame
      height={176}
      caption={t(
        "네이티브를 바꾸려면 여전히 방문이 필요합니다. 화면 로직만 고치면 되는 경우에는, 위치 전송을 위해 이미 열리는 네트워크 창에 번들을 얹어 보냅니다|ネイティブを変えるには依然として来店が必要です。画面ロジックだけを直す場合は、位置送信のためにすでに開く通信の窓にバンドルを載せて送ります|Changing native code still needs a visit. When only screen logic needs fixing, the bundle rides the network window that already opens for location uploads.",
      )}
    >
      <text x={16} y={30} className="fig-lab" fill="#e11d48">{t("이전|以前|before")}</text>
      <Node x={16} y={42} w={132} label={t("버그 발견|バグ発見|bug found")} tone="bad" />
      <Arrow x1={148} x2={176} y={59} tone="bad" />
      <Node x={176} y={42} w={150} label={t("서비스센터 방문|サービスセンター来店|service center visit")} tone="bad" />
      <Arrow x1={326} x2={354} y={59} tone="bad" />
      <Node x={354} y={42} w={150} label={t("수동 업데이트|手動アップデート|manual update")} tone="bad" />
      <Arrow x1={504} x2={532} y={59} tone="bad" />
      <Node x={532} y={42} w={172} label={t("단말 1대만 해결|端末1台だけ解決|one device fixed")} tone="bad" />

      <line x1={16} y1={92} x2={704} y2={92} stroke="var(--color-line)" strokeWidth={1} />

      <text x={16} y={122} className="fig-lab" fill="#059669">{t("이후|以後|after")}</text>
      <Node x={16} y={134} w={132} label={t("번들만 교체|バンドルのみ差替|bundle only")} tone="good" />
      <Arrow x1={148} x2={176} y={151} tone="good" />
      <Node x={176} y={134} w={150} label={t("위치 전송 창에 편승|位置送信の窓に同載|rides the upload window")} tone="good" />
      <Arrow x1={326} x2={354} y={151} tone="good" />
      <Node x={354} y={134} w={150} label={t("단계적 적용|段階的に適用|staged rollout")} tone="good" />
      <Arrow x1={504} x2={532} y={151} tone="good" />
      <Node x={532} y={134} w={172} label={t("실패 시 자동 롤백|失敗時は自動ロールバック|auto rollback on failure")} tone="good" />
    </Frame>
  );
}

/* ── 블루그린: 배포 중 트래픽이 어디로 가는가 ── */
function BlueGreen({ loc }: { loc: string }) {
  const i = idx(loc);
  const t = (s: string) => L(s, i);
  const Slot = ({ y, name, state, tone }: { y: number; name: string; state: string; tone: "live" | "warm" | "off" }) => {
    const c = tone === "live" ? "#059669" : tone === "warm" ? "#d97706" : "#94a3b8";
    return (
      <g>
        <rect x={250} y={y} width={190} height={40} rx={7}
          fill={tone === "off" ? "var(--color-paper-soft)" : `${c}14`} stroke={c} strokeWidth={1.3}
          strokeDasharray={tone === "warm" ? "5 3" : undefined} />
        <text x={266} y={y + 18} className="fig-node" fill={c}>{name}</text>
        <text x={266} y={y + 32} className="fig-note" fill="var(--color-ink-soft)">{state}</text>
      </g>
    );
  };
  return (
    <Frame
      height={210}
      caption={t(
        "새 버전은 비활성 슬롯에서 먼저 뜨고, DB와 Redis까지 확인하는 준비 상태 점검을 통과해야만 트래픽을 받습니다. 그동안 수집은 한 번도 멈추지 않습니다|新バージョンは非稼働スロットで先に立ち上がり、DBとRedisまで確認する準備状態チェックを通過して初めてトラフィックを受けます。その間、収集は一度も止まりません|The new version boots on the idle slot and only takes traffic after a readiness check that reaches DB and Redis. Ingestion never stops.",
      )}
    >
      <rect x={16} y={78} width={140} height={44} rx={7} fill="var(--color-paper)" stroke="var(--color-line-strong)" strokeWidth={1.2} />
      <text x={86} y={96} textAnchor="middle" className="fig-node">{t("자녀 단말|子ども端末|devices")}</text>
      <text x={86} y={111} textAnchor="middle" className="fig-note">{t("위치 업로드|位置アップロード|uploads")}</text>

      <line x1={156} y1={100} x2={193} y2={100} stroke="var(--color-ink-soft)" strokeWidth={1.3} />
      <path d="M 200 100 l -7 -4 l 0 8 z" fill="var(--color-ink-soft)" />
      <rect x={200} y={78} width={34} height={44} rx={6} fill="var(--color-violet-soft)" stroke="var(--color-violet)" strokeWidth={1.2} />
      <text x={217} y={104} textAnchor="middle" className="fig-node" fill="var(--color-violet-deep)">N</text>
      <text x={217} y={136} textAnchor="middle" className="fig-note">nginx</text>

      <Slot y={40} name={t("green 슬롯|greenスロット|green slot")} state={t("새 버전 · 준비 상태 점검 중|新バージョン · 準備状態チェック中|new build, readiness check")} tone="warm" />
      <Slot y={122} name={t("blue 슬롯|blueスロット|blue slot")} state={t("현재 트래픽 처리 중|現在トラフィック処理中|serving traffic now")} tone="live" />

      <path d="M 234 96 L 244 62" stroke="#d97706" strokeWidth={1.2} strokeDasharray="4 3" />
      <path d="M 234 106 L 244 140" stroke="#059669" strokeWidth={1.4} />
      <path d="M 244 140 l -8 -2 l 3 7 z" fill="#059669" />

      <rect x={468} y={40} width={236} height={40} rx={7} fill="rgba(217,119,6,0.08)" stroke="#d97706" strokeWidth={1.2} />
      <text x={484} y={58} className="fig-node" fill="#d97706">{t("준비 상태 점검|準備状態チェック|readiness gate")}</text>
      <text x={484} y={72} className="fig-note">{t("DB · Redis · 로그인 응답|DB · Redis · ログイン応答|DB, Redis, login response")}</text>
      <line x1={440} y1={60} x2={461} y2={60} stroke="#d97706" strokeWidth={1.2} />
      <path d="M 468 60 l -7 -4 l 0 8 z" fill="#d97706" />

      <text x={468} y={122} className="fig-note" fill="var(--color-ink-soft)">
        {t("통과하면 nginx가 트래픽을 green으로 넘기고|通過すればnginxがトラフィックをgreenへ渡し|on pass, nginx hands traffic to green")}
      </text>
      <text x={468} y={138} className="fig-note" fill="var(--color-ink-soft)">
        {t("그 뒤에 blue를 내립니다|その後にblueを落とします|and only then blue stops")}
      </text>
      <text x={468} y={160} className="fig-note" fill="#e11d48">
        {t("실패하면 트래픽은 blue에 그대로|失敗すればトラフィックはblueのまま|on failure traffic stays on blue")}
      </text>
    </Frame>
  );
}

const FIGURES: Record<string, Record<string, (p: { loc: string }) => ReactNode>> = {
  "odiya-child": {
    "절전 모드와의 싸움": DozeTimeline,
    "省電力モードとの戦い": DozeTimeline,
    "Fighting doze mode": DozeTimeline,
    "서비스센터에 가야 고칠 수 있는 앱": CodePushPaths,
    "サービスセンターに行かないと直せないアプリ": CodePushPaths,
    "An app you had to visit a service center to fix": CodePushPaths,
  },
  "odiya-backend": {
    "레거시 톰캣에서 무중단 배포로": BlueGreen,
    "レガシーTomcatから無停止デプロイへ": BlueGreen,
    "From legacy Tomcat to zero-downtime deploys": BlueGreen,
  },
};

export function BlockFigure({ slug, heading, locale }: { slug: string; heading: string; locale: string }) {
  const F = FIGURES[slug]?.[heading];
  return F ? <F loc={locale} /> : null;
}
