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


/* ---------- 공용 시각 프리미티브 ---------- */

/** SVG 안에 lucide 아이콘을 심는다. */
function Ico({ d, x, y, size = 15, c }: { d: string; x: number; y: number; size?: number; c: string }) {
  const sc = size / 24;
  return (
    <g transform={`translate(${x} ${y}) scale(${sc})`}>
      <path d={d} fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

/** 아이콘 타일이 붙은 카드. 모든 인라인 도식의 기본 단위. */
function Card({
  x, y, w, h = 46, title, sub, c, icon, tone = "solid", pulse,
}: {
  x: number; y: number; w: number; h?: number;
  title: string; sub?: string; c: string; icon?: string;
  tone?: "solid" | "dashed" | "ghost"; pulse?: boolean;
}) {
  const tile = 30;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={9}
        fill={tone === "ghost" ? "var(--color-paper-soft)" : "var(--color-paper)"}
        stroke={c} strokeWidth={1.4} strokeDasharray={tone === "dashed" ? "5 4" : undefined} />
      {pulse && (
        <rect x={x} y={y} width={w} height={h} rx={9} fill={c} opacity={0}>
          <animate attributeName="opacity" values="0;0.12;0" dur="2.4s" repeatCount="indefinite" />
        </rect>
      )}
      {icon && (
        <>
          <rect x={x + 9} y={y + (h - tile) / 2} width={tile} height={tile} rx={7} fill={c} opacity={0.13} />
          <Ico d={icon} x={x + 9 + (tile - 15) / 2} y={y + (h - tile) / 2 + (tile - 15) / 2} c={c} />
        </>
      )}
      <text x={icon ? x + 48 : x + 14} y={sub ? y + h / 2 - 3 : y + h / 2 + 4} className="fig-node" fill={c}>
        {title}
      </text>
      {sub && (
        <text x={icon ? x + 48 : x + 14} y={y + h / 2 + 12} className="fig-note">{sub}</text>
      )}
    </g>
  );
}

/** 흐르는 화살표. */
function Flow({
  d, c, dashed, delay = 0, dur = 2.6, label,
}: { d: string; c: string; dashed?: boolean; delay?: number; dur?: number; label?: string }) {
  const id = `fl${Math.abs([...d].reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) | 0, 7))}`;
  return (
    <g>
      <path id={id} d={d} fill="none" stroke={c} strokeWidth={1.4} opacity={0.55}
        strokeDasharray={dashed ? "5 4" : undefined} markerEnd={`url(#ar-${c.replace(/[^a-z0-9]/gi, "")})`} />
      <circle r={3.4} fill={c}>
        <animateMotion dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" path={d} />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.85;1"
          dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
      </circle>
      {label && <text className="fig-note" fill={c} style={{ fontSize: 9 }}>{label}</text>}
    </g>
  );
}

/** 화살표 마커 정의 (색상별). */
function Markers({ colors }: { colors: string[] }) {
  return (
    <defs>
      {colors.map((c) => (
        <marker key={c} id={`ar-${c.replace(/[^a-z0-9]/gi, "")}`} viewBox="0 0 10 10"
          refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0,1.5 L8.5,5 L0,8.5 z" fill={c} />
        </marker>
      ))}
    </defs>
  );
}

/* lucide path 데이터 */
const I = {
  moon: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",
  alarm: "M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z M12 9v4l2 2 M5 3 2 6 M22 6l-3-3",
  lock: "M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4",
  unlock: "M5 11h14v10H5z M8 11V7a4 4 0 0 1 7.5-2",
  upload: "M12 19V5 M5 12l7-7 7 7",
  repeat: "M17 2l4 4-4 4 M3 11V9a4 4 0 0 1 4-4h14 M7 22l-4-4 4-4 M21 13v2a4 4 0 0 1-4 4H3",
  battery: "M3 8h14v8H3z M20 11v2",
  shield: "M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z",
  phone: "M7 2h10v20H7z M11 18h2",
  server: "M3 4h18v7H3z M3 13h18v7H3z M7 8h.01 M7 17h.01",
  cloud: "M18 17H7A4 4 0 1 1 8 9a5 5 0 0 1 9.5 2A3.5 3.5 0 0 1 18 17Z",
  db: "M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3Z M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6",
  wrench: "M14 7a4 4 0 1 0 3 6.9L21 18l-3 3-4.1-4.1A4 4 0 0 0 14 7Z",
  store: "M3 9h18l-1.5 11h-15z M8 9V6a4 4 0 0 1 8 0v3",
  check: "M20 6 9 17l-5-5",
  x: "M18 6 6 18 M6 6l12 12",
  gauge: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M12 3a9 9 0 0 1 9 9 M12 12 17 8",
  train: "M6 3h12v13H6z M6 16l-2 5 M18 16l2 5 M9 8h6",
  filter: "M3 4h18l-7 8v7l-4 2v-9z",
  route: "M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M18 9v3a4 4 0 0 1-4 4H6",
  eyeoff: "M10.7 5.1A9 9 0 0 1 21 12a17 17 0 0 1-3 3.6 M6.6 6.6A17 17 0 0 0 3 12a9 9 0 0 0 12.9 4.3 M2 2l20 20",
  layers: "M12 3 2 9l10 6 10-6z M2 15l10 6 10-6",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M12 7v5l3 2",
  zap: "M13 2 4 14h7l-1 8 9-12h-7z",
};

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

/* ── 도즈: 잠든 기기에서 한 사이클이 도는 과정 ── */
function DozeTimeline({ loc }: { loc: string }) {
  const i = idx(loc);
  const t = (s: string) => L(s, i);

  const steps = [
    { icon: I.moon,   c: "#64748b", label: t("기기 잠듦|端末が眠る|asleep"),          note: t("CPU 정지 · 통신 차단|CPU停止 · 通信遮断|CPU off, network gated") },
    { icon: I.alarm,  c: "#0891b2", label: t("알람 발화|アラーム発火|alarm fires"),    note: t("약 9분 그리드|約9分グリッド|~9 min grid") },
    { icon: I.lock,   c: "#d97706", label: t("웨이크락 획득|ウェイクロック取得|wake lock"), note: t("최대 90초|最大90秒|90s cap") },
    { icon: I.upload, c: "#7c3aed", label: t("수집과 전송|収集と送信|collect, send"),  note: t("좌표 검증 · 개방|座標検証 · 開放|validate, open") },
    { icon: I.unlock, c: "#d97706", label: t("웨이크락 반납|ウェイクロック返却|release"), note: t("워치독이 회수|ウォッチドッグが回収|watchdog reclaims") },
    { icon: I.repeat, c: "#0891b2", label: t("다음 알람 예약|次のアラーム予約|reschedule"), note: t("체인 유지|チェーン維持|keeps the chain") },
  ];
  const W = 106, GAP = 12, X0 = 20, Y = 66, CYCLE = 7.2;
  const cx = (n: number) => X0 + n * (W + GAP);

  return (
    <Frame
      height={236}
      caption={t(
        "잠든 기기에서 한 사이클이 도는 과정입니다. 알람이 깨우고, 웨이크락이 일하는 동안 CPU를 붙잡고, 끝나면 반납한 뒤 다음 알람을 직접 예약합니다. 마지막 예약이 빠지면 체인이 끊겨 앱은 다시 깨어나지 못합니다|眠った端末で1サイクルが回る過程です。アラームが起こし、ウェイクロックが作業中のCPUを掴み、終われば返却して次のアラームを自ら予約します。最後の予約が抜ければチェーンが切れ、アプリは二度と目覚めません|One cycle on a sleeping device: the alarm wakes it, the wake lock holds the CPU while work happens, then it is released and the next alarm is booked. Miss that last step and the chain breaks and the app never wakes again.",
      )}
    >
      <Markers colors={["#64748b", "#0891b2", "#d97706", "#7c3aed"]} />

      <rect x={12} y={34} width={696} height={98} rx={12} fill="rgba(100,116,139,0.06)"
        stroke="var(--color-line)" strokeWidth={1} strokeDasharray="6 5" />
      <Ico d={I.moon} x={22} y={16} size={13} c="#64748b" />
      <text x={42} y={28} className="fig-lab" fill="#64748b">
        {t("도즈 상태 · 시스템은 앱을 계속 재우려 한다|Doze状態 · システムはアプリを眠らせ続けようとする|doze, the system keeps trying to sleep the app")}
      </text>

      {steps.map((st, n) => (
        <g key={st.label}>
          <Card x={cx(n)} y={Y} w={W} h={52} title={st.label} sub={st.note} c={st.c} icon={st.icon} />
          <rect x={cx(n)} y={Y} width={W} height={52} rx={9} fill={st.c} opacity={0}>
            <animate attributeName="opacity" values="0;0.15;0.15;0" keyTimes="0;0.05;0.13;0.19"
              dur={`${CYCLE}s`} begin={`${(n * CYCLE) / steps.length}s`} repeatCount="indefinite" />
          </rect>
          {n < steps.length - 1 && (
            <Flow d={`M ${cx(n) + W} ${Y + 26} L ${cx(n + 1)} ${Y + 26}`} c={steps[n + 1].c}
              dur={CYCLE / steps.length} delay={(n * CYCLE) / steps.length} />
          )}
        </g>
      ))}

      <line x1={cx(2) + 8} y1={Y + 64} x2={cx(4) + W - 8} y2={Y + 64} stroke="#d97706" strokeWidth={2.4} strokeLinecap="round" />
      <line x1={cx(2) + 8} y1={Y + 59} x2={cx(2) + 8} y2={Y + 69} stroke="#d97706" strokeWidth={2.4} />
      <line x1={cx(4) + W - 8} y1={Y + 59} x2={cx(4) + W - 8} y2={Y + 69} stroke="#d97706" strokeWidth={2.4} />
      <Ico d={I.lock} x={(cx(2) + cx(4) + W) / 2 - 44} y={Y + 74} size={12} c="#d97706" />
      <text x={(cx(2) + cx(4) + W) / 2 - 26} y={Y + 85} className="fig-note" fill="#d97706">
        {t("웨이크락이 CPU를 붙잡는 구간 (최대 90초)|ウェイクロックがCPUを掴む区間 (最大90秒)|wake lock holds the CPU here (90s cap)")}
      </text>

      <Flow
        d={`M ${cx(5) + W / 2} ${Y + 52} L ${cx(5) + W / 2} 204 L ${cx(0) + W / 2} 204 L ${cx(0) + W / 2} ${Y + 52}`}
        c="#0891b2" dashed dur={CYCLE} delay={(5 * CYCLE) / steps.length} />
      <Ico d={I.repeat} x={(cx(0) + cx(5) + W) / 2 - 108} y={212} size={12} c="#0891b2" />
      <text x={(cx(0) + cx(5) + W) / 2 - 90} y={223} className="fig-note" fill="#0891b2">
        {t("자기 재예약 체인 · 이 화살표가 끊기면 다시 깨어나지 못한다|自己再予約チェーン · この矢印が切れれば二度と目覚めない|self-rescheduling chain, break this and it never wakes again")}
      </text>
    </Frame>
  );
}

/* ── 도즈: 예약과 실측의 편차 ── */
function DozeDrift({ loc }: { loc: string }) {
  const i = idx(loc);
  const t = (s: string) => L(s, i);
  const marks = [0, 45, 136, 240, 357];
  const x = (sec: number) => 96 + (sec / 400) * 560;
  return (
    <Frame
      height={150}
      caption={t(
        "그래서 타이머를 믿을 수 없습니다. 45초로 예약해도 실제 발화는 136초에서 357초 사이에 흩어졌고, 깨어날 때마다 벽시계로 실제 지난 시간을 다시 계산해 밀린 만큼 보정합니다|だからタイマーは信用できません。45秒で予約しても実際の発火は136秒から357秒の間に散らばり、目覚めるたびに壁時計で実際の経過時間を計算し直して遅れた分を補正します|This is why timers cannot be trusted. A 45-second schedule fired anywhere from 136 to 357 seconds out, so every wake recomputes real elapsed time from the wall clock and corrects the backlog.",
      )}
    >
      <line x1={96} y1={92} x2={664} y2={92} stroke="var(--color-line-strong)" strokeWidth={1.5} />
      {marks.map((m) => (
        <g key={m}>
          <line x1={x(m)} y1={87} x2={x(m)} y2={97} stroke="var(--color-line-strong)" strokeWidth={1} />
          <text x={x(m)} y={113} textAnchor="middle" className="fig-tick">{m}s</text>
        </g>
      ))}
      <text x={16} y={44} className="fig-lab" fill="#059669">{t("예약|予約|scheduled")}</text>
      <rect x={x(0)} y={32} width={x(45) - x(0)} height={16} rx={8} fill="rgba(5,150,105,0.2)" stroke="#059669" strokeWidth={1} />
      <circle cx={x(45)} cy={40} r={4} fill="#059669" />
      <text x={16} y={74} className="fig-lab" fill="#e11d48">{t("실측|実測|measured")}</text>
      <rect x={x(136)} y={62} width={x(357) - x(136)} height={16} rx={8} fill="rgba(225,29,72,0.14)" stroke="#e11d48" strokeWidth={1} strokeDasharray="4 3" />
      <circle r={4.5} fill="#e11d48">
        <animate attributeName="cx" values={`${x(136)};${x(357)};${x(190)};${x(300)};${x(136)}`} dur="5s" repeatCount="indefinite" />
        <animate attributeName="cy" values="70;70;70;70;70" dur="5s" repeatCount="indefinite" />
      </circle>
      <path d={`M ${x(45)} 130 L ${x(357)} 130`} stroke="var(--color-violet)" strokeWidth={1.2} strokeDasharray="3 3" />
      <path d={`M ${x(45)} 130 l 6 -4 l 0 8 z`} fill="var(--color-violet)" />
      <path d={`M ${x(357)} 130 l -6 -4 l 0 8 z`} fill="var(--color-violet)" />
      <text x={(x(45) + x(357)) / 2} y={146} textAnchor="middle" className="fig-note" fill="var(--color-violet)">
        {t("이 편차를 벽시계로 보정|このズレを壁時計で補正|corrected against the wall clock")}
      </text>
    </Frame>
  );
}

function DozeFigures({ loc }: { loc: string }) {
  return (
    <>
      <DozeTimeline loc={loc} />
      <DozeDrift loc={loc} />
    </>
  );
}

/* ── 코드푸시: 두 경로 비교 ── */
function CodePushPaths({ loc }: { loc: string }) {
  const i = idx(loc);
  const t = (s: string) => L(s, i);
  const before = [
    { icon: I.x,     label: t("버그 발견|バグ発見|bug found") },
    { icon: I.store, label: t("서비스센터 방문|サービスセンター来店|service center") },
    { icon: I.wrench,label: t("수동 업데이트|手動アップデート|manual update") },
    { icon: I.phone, label: t("단말 1대만 해결|端末1台だけ解決|one device fixed") },
  ];
  const after = [
    { icon: I.layers, label: t("번들만 교체|バンドルのみ差替|bundle only") },
    { icon: I.upload, label: t("전송 창에 편승|送信の窓に同載|rides the window") },
    { icon: I.route,  label: t("단계적 적용|段階的に適用|staged rollout") },
    { icon: I.repeat, label: t("실패 시 롤백|失敗時ロールバック|auto rollback") },
  ];
  const W = 156, GAP = 20, X0 = 44;
  const cx = (n: number) => X0 + n * (W + GAP);
  return (
    <Frame
      height={196}
      caption={t(
        "네이티브를 바꾸려면 여전히 방문이 필요합니다. 화면 로직만 고치면 되는 경우에는, 위치 전송을 위해 이미 열리는 네트워크 창에 번들을 얹어 보냅니다|ネイティブを変えるには依然として来店が必要です。画面ロジックだけを直す場合は、位置送信のためにすでに開く通信の窓にバンドルを載せて送ります|Changing native code still needs a visit. When only screen logic needs fixing, the bundle rides the network window that already opens for location uploads.",
      )}
    >
      <Markers colors={["#e11d48", "#059669"]} />
      <Ico d={I.x} x={16} y={44} size={13} c="#e11d48" />
      <text x={16} y={34} className="fig-lab" fill="#e11d48">{t("이전|以前|before")}</text>
      {before.map((n, k) => (
        <g key={n.label}>
          <Card x={cx(k)} y={38} w={W} h={44} title={n.label} c="#e11d48" icon={n.icon} tone="dashed" />
          {k < before.length - 1 && (
            <Flow d={`M ${cx(k) + W} 60 L ${cx(k + 1)} 60`} c="#e11d48" dashed delay={k * 0.5} />
          )}
        </g>
      ))}

      <line x1={16} y1={104} x2={704} y2={104} stroke="var(--color-line)" strokeWidth={1} />

      <Ico d={I.check} x={16} y={134} size={13} c="#059669" />
      <text x={16} y={124} className="fig-lab" fill="#059669">{t("이후|以後|after")}</text>
      {after.map((n, k) => (
        <g key={n.label}>
          <Card x={cx(k)} y={128} w={W} h={44} title={n.label} c="#059669" icon={n.icon} />
          {k < after.length - 1 && (
            <Flow d={`M ${cx(k) + W} 150 L ${cx(k + 1)} 150`} c="#059669" delay={k * 0.45} />
          )}
        </g>
      ))}
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

/* ── 요금제: 요청 1건의 바이트 구성이 어떻게 줄어드는가 ── */
function DataPlan({ loc }: { loc: string }) {
  const i = idx(loc);
  const t = (s: string) => L(s, i);
  const X = 132, W = 520;
  const Bar = ({ y, segs, total, label }: {
    y: number; label: string;
    segs: { w: number; c: string; name: string }[]; total: string;
  }) => {
    let acc = 0;
    return (
      <g>
        <text x={16} y={y + 15} className="fig-lab" fill="var(--color-ink-soft)">{label}</text>
        {segs.map((sg) => {
          const x0 = X + acc;
          acc += sg.w;
          return (
            <g key={sg.name}>
              <rect x={x0} y={y} width={sg.w} height={22} fill={sg.c} opacity={0.85}>
                <animate attributeName="width" from="0" to={sg.w} dur="0.9s" fill="freeze" />
              </rect>
              {sg.w > 54 && (
                <text x={x0 + sg.w / 2} y={y + 15} textAnchor="middle" className="fig-note" fill="#fff" style={{ fontSize: 9 }}>
                  {sg.name}
                </text>
              )}
            </g>
          );
        })}
        <text x={X + acc + 10} y={y + 16} className="fig-node" fill="var(--color-ink)">{total}</text>
      </g>
    );
  };
  return (
    <Frame
      height={186}
      caption={t(
        "요청 1건은 본문과 연결 비용으로 나뉩니다. 압축이 본문을 89% 줄이고, 연결 재사용이 매번 새로 치르던 핸드셰이크를 걷어냅니다. 남는 것은 실제 위치 데이터뿐입니다|リクエスト1件は本文と接続コストに分かれます。圧縮が本文を89%削り、接続再利用が毎回支払っていたハンドシェイクを取り除きます。残るのは実際の位置データだけです|A single request splits into body and connection cost. Compression takes 89% off the body, and connection reuse strips the handshake that used to be paid every time. What remains is the location data itself.",
      )}
    >
      <text x={16} y={22} className="fig-lab" fill="#e11d48">{t("개선 전 · 요청 1건|改善前 · リクエスト1件|before, one request")}</text>
      <Bar y={32} label="" total="15.7KB"
        segs={[
          { w: 190, c: "#e11d48", name: t("TLS 핸드셰이크|TLSハンドシェイク|TLS handshake") },
          { w: 330, c: "#fb7185", name: t("평문 JSON 본문|平文JSON本文|plain JSON body") },
        ]} />

      <text x={16} y={92} className="fig-lab" fill="#059669">{t("개선 후 · 요청 1건|改善後 · リクエスト1件|after, one request")}</text>
      <Bar y={102} label="" total="1.1KB"
        segs={[{ w: 36, c: "#059669", name: "" }]} />
      <text x={X + 46} y={118} className="fig-note" fill="#059669">
        {t("gzip 본문만 · 연결은 재사용|gzip本文のみ · 接続は再利用|gzipped body only, connection reused")}
      </text>

      <line x1={X} y1={140} x2={X + W} y2={140} stroke="var(--color-line)" strokeWidth={1} />
      <text x={X} y={160} className="fig-note" fill="var(--color-ink-muted)">
        {t("단말 1대 월 전송량|端末1台の月間送信量|monthly per device")}
      </text>
      <text x={X + 150} y={160} className="fig-node" fill="#e11d48">43MB</text>
      <text x={X + 200} y={160} className="fig-note">→</text>
      <text x={X + 222} y={160} className="fig-node" fill="#059669">6.8MB</text>
      <text x={X + 286} y={160} className="fig-note" fill="var(--color-ink-soft)">
        {t("하루 96회 업로드 기준|1日96回のアップロード基準|at 96 uploads a day")}
      </text>
    </Frame>
  );
}

/* ── 모하니: 우회는 계층을 타고 온다 ── */
function BypassLayers({ loc }: { loc: string }) {
  const i = idx(loc);
  const t = (s: string) => L(s, i);
  const rows = [
    { y: 42,  c: "#7c3aed", icon: I.shield, name: t("제조사 정책|メーカーポリシー|vendor policy"),
      block: t("시각 잠금 · 설정 봉쇄 · 도메인 차단|時刻ロック · 設定封鎖 · ドメイン遮断|clock lock, settings, domains"),
      atk: { icon: I.clock, label: t("시계 되돌리기|時計の巻き戻し|clock rollback") } },
    { y: 110, c: "#0891b2", icon: I.layers, name: t("안드로이드 권한|Android権限|Android permissions"),
      block: t("데드맨 스위치 · 사용 기록 스윕|デッドマンスイッチ · 利用履歴スイープ|dead man's switch, usage sweep"),
      atk: { icon: I.eyeoff, label: t("접근성 끄기|アクセシビリティ解除|revoke a11y") } },
    { y: 178, c: "#059669", icon: I.phone, name: t("앱 계층|アプリ層|app layer"),
      block: t("화면 내용 판정 · 보호 묶음|画面内容の判定 · 保護グループ|on-screen checks, clusters"),
      atk: { icon: I.x, label: t("앱 강제 종료|アプリ強制終了|force stop") } },
  ];
  return (
    <Frame
      height={244}
      caption={t(
        "우회는 차단을 정면으로 뚫지 않고, 차단이 서 있는 계층을 치웁니다. 그래서 시도가 들어온 계층과 같은 곳에서 막습니다. 앱 계층에서 응급 처치하면 다음 우회가 바로 나옵니다|迂回はブロックを正面から破らず、ブロックが立つ層を取り除きます。だから試みが来た層と同じ場所で塞ぎます。アプリ層で応急処置すれば、次の迂回がすぐ出てきます|A bypass does not break blocking head-on; it removes the layer blocking stands on. So each attempt is answered at the layer it came from. Patch it in the app layer and the next bypass arrives immediately.",
      )}
    >
      <Markers colors={["#e11d48", "#7c3aed", "#0891b2", "#059669"]} />
      <text x={16} y={30} className="fig-lab" fill="#e11d48">{t("우회 시도|迂回の試み|attempts")}</text>
      <text x={214} y={30} className="fig-lab" fill="var(--color-ink-soft)">
        {t("같은 계층에서 대응|同じ層で対応|answered at the same layer")}
      </text>

      {rows.map((r, n) => (
        <g key={r.name}>
          <Card x={16} y={r.y} w={158} h={44} title={r.atk.label} c="#e11d48" icon={r.atk.icon} tone="dashed" />
          <Flow d={`M 174 ${r.y + 22} L 208 ${r.y + 22}`} c="#e11d48" dashed delay={n * 0.7} dur={2.4} />
          <g>
            <circle cx={196} cy={r.y + 22} r={9} fill="var(--color-paper-warm)" />
            <Ico d={I.x} x={190} y={r.y + 16} size={12} c="#e11d48" />
          </g>
          <Card x={214} y={r.y} w={402} h={44} title={r.name} sub={r.block} c={r.c} icon={r.icon} />
          <Ico d={I.check} x={630} y={r.y + 15} size={14} c={r.c} />
          <text x={652} y={r.y + 27} className="fig-note" fill={r.c}>{t("차단|遮断|blocked")}</text>
        </g>
      ))}
    </Frame>
  );
}

/* ── 보호자 앱: 세 조건을 모두 통과해야 표시 ── */
function TripleFilter({ loc }: { loc: string }) {
  const i = idx(loc);
  const t = (s: string) => L(s, i);
  const gates = [
    { x: 176, name: t("역 매칭|駅マッチング|station"), icon: I.train },
    { x: 320, name: t("거리|距離|distance"), icon: I.route },
    { x: 464, name: t("소요시간|所要時間|duration"), icon: I.clock },
  ];
  return (
    <Frame
      height={186}
      caption={t(
        "지하철 이동은 세 조건을 모두 통과할 때만 표시합니다. 하나라도 어긋나면 추측을 버리고 공백으로 남깁니다. 커버리지를 일부 포기하는 대신, 화면에 뜬 것은 믿을 수 있게 만든 것입니다|地下鉄移動は三つの条件をすべて通過したときだけ表示します。一つでも外れれば推測を捨てて空白のまま残します。カバレッジを一部諦める代わりに、画面に出たものは信じられるようにしました|A subway trip is shown only when all three conditions hold. If any one fails, the guess is discarded and the gap stays a gap. Coverage is traded away so whatever does appear can be trusted.",
      )}
    >
      <Markers colors={["#7c3aed", "#059669", "#e11d48", "#94a3b8"]} />
      <Card x={16} y={44} w={140} h={48} title={t("GPS 공백|GPS空白|GPS gap")}
        sub={t("좌표 없음|座標なし|no fixes")} c="#94a3b8" icon={I.eyeoff} tone="ghost" />
      <Flow d="M 156 68 L 176 68" c="#7c3aed" />

      {gates.map((g, n) => (
        <g key={g.name}>
          <Card x={g.x} y={44} w={120} h={48} title={g.name} c="#7c3aed" icon={g.icon} pulse />
          {n < gates.length - 1 && (
            <Flow d={`M ${g.x + 120} 68 L ${gates[n + 1].x} 68`} c="#7c3aed" delay={n * 0.5} />
          )}
          <path d={`M ${g.x + 60} 92 L ${g.x + 60} 126`} stroke="#e11d48" strokeWidth={1.2} strokeDasharray="4 3" />
          <path d={`M ${g.x + 60} 132 l -4 -7 l 8 0 z`} fill="#e11d48" />
        </g>
      ))}

      <Flow d="M 584 68 L 606 68" c="#059669" delay={1} />
      <Card x={606} y={44} w={98} h={48} title={t("표시|表示|shown")}
        sub={t("지도에|地図に|on the map")} c="#059669" icon={I.check} />

      <rect x={244} y={134} width={232} height={30} rx={8} fill="rgba(225,29,72,0.07)"
        stroke="#e11d48" strokeWidth={1.2} strokeDasharray="5 4" />
      <Ico d={I.x} x={258} y={142} size={13} c="#e11d48" />
      <text x={280} y={153} className="fig-note" fill="#e11d48">
        {t("하나라도 어긋나면 표시하지 않음|一つでも外れれば表示しない|any mismatch, nothing is shown")}
      </text>
    </Frame>
  );
}

/* ── KSTT: 배포 앞의 스키마 게이트 ── */
function SchemaGate({ loc }: { loc: string }) {
  const i = idx(loc);
  const t = (s: string) => L(s, i);
  return (
    <Frame
      height={192}
      caption={t(
        "배포 스크립트가 마이그레이션을 먼저 읽습니다. 컬럼을 추가하는 구문만 통과하고, 삭제하는 구문이 하나라도 있으면 서버에 닿기 전에 배포가 멈춥니다. 무중단 배포 구간에는 구버전 코드가 함께 돌기 때문입니다|デプロイスクリプトがマイグレーションを先に読みます。カラムを追加する構文だけが通り、削除する構文が一つでもあればサーバーに届く前にデプロイが止まります。無停止デプロイの区間では旧バージョンのコードも一緒に動くからです|The deploy script reads the migration first. Only additive statements pass; a single destructive one stops the deploy before it reaches the server, because old code still runs during a zero-downtime switch.",
      )}
    >
      <Markers colors={["#059669", "#e11d48", "#d97706", "#94a3b8"]} />
      <Card x={16} y={62} w={158} h={52} title={t("마이그레이션|マイグレーション|migration")}
        sub={t("배포에 포함|デプロイに含む|part of the deploy")} c="#94a3b8" icon={I.db} tone="ghost" />
      <Flow d="M 174 88 L 220 88" c="#d97706" />

      <Card x={220} y={54} w={190} h={68} title={t("추가 전용 게이트|追加専用ゲート|additive-only gate")} c="#d97706" icon={I.filter} pulse />
      <Ico d={I.check} x={236} y={98} size={11} c="#059669" />
      <text x={254} y={108} className="fig-note" fill="#059669" style={{ fontSize: 9 }}>ADD COLUMN / INDEX</text>
      <Ico d={I.x} x={236} y={110} size={11} c="#e11d48" />
      <text x={254} y={120} className="fig-note" fill="#e11d48" style={{ fontSize: 9 }}>DROP / DELETE / TRUNCATE</text>

      <Flow d="M 410 70 L 470 70" c="#059669" delay={0.6} />
      <Card x={470} y={46} w={190} h={48} title={t("blue / green 전환|blue / green切替|blue / green switch")}
        sub={t("무중단 배포 진행|無停止デプロイ進行|deploy proceeds")} c="#059669" icon={I.server} />

      <Flow d="M 410 110 L 470 132" c="#e11d48" dashed delay={1.2} />
      <Card x={470} y={110} w={190} h={48} title={t("배포 즉시 중단|デプロイ即中断|deploy aborts")}
        sub={t("서버에 닿기 전|サーバーに届く前|before it reaches the server")} c="#e11d48" icon={I.x} tone="dashed" />

      <text x={430} y={62} className="fig-note" fill="#059669" style={{ fontSize: 9 }}>{t("통과|通過|pass")}</text>
      <text x={424} y={128} className="fig-note" fill="#e11d48" style={{ fontSize: 9 }}>{t("감지|検知|found")}</text>
    </Frame>
  );
}

/* ── 권한 스택: 이 앱이 도는 근거 ── */
function PermissionStack({ loc }: { loc: string }) {
  const i = idx(loc);
  const t = (s: string) => L(s, i);
  const rows = [
    {
      y: 46, c: "#4f46e5", icon: I.battery,
      name: t("배터리 최적화 예외|電池最適化の除外|battery exemption"),
      grant: t("사용자가 직접 승인|ユーザーが直接承認|user grants it"),
      without: t("대기 등급 하락 · 알람 지연|待機ランク低下 · アラーム遅延|standby drops, alarms slip"),
      withIt: t("정확 알람 발화 · 백그라운드 통신|正確アラーム発火 · バックグラウンド通信|exact alarms, background net"),
    },
    {
      y: 126, c: "#7c3aed", icon: I.shield,
      name: t("Knox 관리 라이선스|Knox管理ライセンス|Knox license"),
      grant: t("온보딩 활성화 · 제조사 승인|オンボーディング有効化 · メーカー承認|onboarding, vendor approval"),
      without: t("데이터 개방 요청 자체가 거부|データ開放要求そのものが拒否|the data request is refused"),
      withIt: t("데이터 제어 · 방화벽 · 앱 비활성화|データ制御 · ファイアウォール · アプリ無効化|data toggle, firewall, disable"),
    },
  ];
  return (
    <Frame
      height={246}
      caption={t(
        "이 앱은 두 권한 위에 서 있습니다. 배터리 최적화 예외가 없으면 잠든 기기에서 깨어나지 못하고, Knox 라이선스가 없으면 깨어나도 데이터를 열 수 없습니다. 하나만 빠져도 전송은 0건이므로, 온보딩에서 둘 다 확보하지 못하면 다음 단계로 넘어가지 않습니다|このアプリは二つの権限の上に立っています。電池最適化の除外がなければ眠った端末で目覚められず、Knoxライセンスがなければ目覚めても通信を開けません。どちらか一つ欠けても送信は0件のため、オンボーディングで両方を確保できなければ次へ進みません|The app stands on two grants. Without the battery exemption it cannot wake on a sleeping device; without the Knox license it wakes but cannot open data. Missing either means nothing ships, so onboarding does not advance until both are held.",
      )}
    >
      <Markers colors={["#4f46e5", "#7c3aed", "#e11d48", "#059669"]} />
      <text x={20} y={30} className="fig-lab" fill="var(--color-ink-soft)">
        {t("온보딩에서 확보해야 하는 것|オンボーディングで確保するもの|secured during onboarding")}
      </text>
      {rows.map((r, n) => (
        <g key={r.name}>
          <Card x={16} y={r.y} w={188} h={56} title={r.name} sub={r.grant} c={r.c} icon={r.icon} pulse />
          <Flow d={`M 204 ${r.y + 18} L 250 ${r.y + 18}`} c="#e11d48" dashed dur={3} delay={n * 0.5} />
          <Card x={250} y={r.y - 2} w={214} h={26} title="" c="#e11d48" tone="ghost" />
          <Ico d={I.x} x={260} y={r.y + 4} size={12} c="#e11d48" />
          <text x={278} y={r.y + 15} className="fig-note" fill="#e11d48" style={{ fontSize: 9 }}>{r.without}</text>
          <Flow d={`M 204 ${r.y + 40} L 250 ${r.y + 40}`} c="#059669" dur={2.6} delay={n * 0.5} />
          <Card x={250} y={r.y + 28} w={214} h={26} title="" c="#059669" />
          <Ico d={I.check} x={260} y={r.y + 34} size={12} c="#059669" />
          <text x={278} y={r.y + 45} className="fig-note" fill="#059669" style={{ fontSize: 9 }}>{r.withIt}</text>
          <Flow d={`M 464 ${r.y + 40} L 512 ${n === 0 ? 118 : 130}`} c="#059669" dur={2.6} delay={n * 0.5 + 0.4} />
        </g>
      ))}
      <Card x={512} y={78} w={192} h={92} title="" c="#7c3aed" />
      <Ico d={I.zap} x={528} y={94} size={17} c="#7c3aed" />
      <text x={554} y={107} className="fig-node" fill="#7c3aed">
        {t("둘 다 있어야 동작|両方揃って動作|both required")}
      </text>
      <text x={528} y={128} className="fig-note">
        {t("깨어나서 · 데이터를 열고 · 보낸다|目覚めて · 通信を開き · 送る|wake, open data, upload")}
      </text>
      <line x1={528} y1={140} x2={688} y2={140} stroke="var(--color-line)" strokeWidth={1} />
      <Ico d={I.x} x={528} y={148} size={11} c="#e11d48" />
      <text x={546} y={158} className="fig-note" fill="#e11d48" style={{ fontSize: 9 }}>
        {t("하나만 빠져도 전송 0건|一つ欠ければ送信0件|miss one and nothing ships")}
      </text>
      <rect x={16} y={202} width={688} height={30} rx={8} fill="rgba(217,119,6,0.07)"
        stroke="#d97706" strokeWidth={1.2} strokeDasharray="5 4" />
      <Ico d={I.lock} x={30} y={210} size={13} c="#d97706" />
      <text x={52} y={221} className="fig-note" fill="#d97706">
        {t("온보딩은 게이트다 · 두 권한을 시스템에 다시 확인한 뒤에만 다음 단계로 넘어간다|オンボーディングはゲート · 二つの権限をシステムに再確認してから次へ進む|onboarding is a gate: both grants are re-checked with the system before advancing")}
      </text>
    </Frame>
  );
}

const FIGURES: Record<string, Record<string, (p: { loc: string }) => ReactNode>> = {
  "odiya-child": {
    "절전 모드와의 싸움": DozeFigures,
    "省電力モードとの戦い": DozeFigures,
    "Fighting doze mode": DozeFigures,
    "제약": PermissionStack,
    "制約": PermissionStack,
    "Constraints": PermissionStack,
    "요금제라는 제약": DataPlan,
    "料金プランという制約": DataPlan,
    "The data plan as a constraint": DataPlan,
    "서비스센터에 가야 고칠 수 있는 앱": CodePushPaths,
    "サービスセンターに行かないと直せないアプリ": CodePushPaths,
    "An app you had to visit a service center to fix": CodePushPaths,
  },
  "odiya-parents": {
    "선택과 근거": TripleFilter,
    "選択と根拠": TripleFilter,
    "Decision and rationale": TripleFilter,
  },
  "mohani": {
    "설치 후에 열리는 우회 루트들": BypassLayers,
    "設置後に開く迂回ルート": BypassLayers,
    "The bypass routes that open after setup": BypassLayers,
  },
  "kocca-kstt": {
    "선택과 근거": SchemaGate,
    "選択と根拠": SchemaGate,
    "Decision and rationale": SchemaGate,
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
