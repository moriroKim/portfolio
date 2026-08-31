"use client";

/* ------------------------------------------------------------------
   Architecture diagram.
   Nodes are plain HTML laid out by CSS grid, so text can never
   overlap a shape. Edges are measured from the rendered nodes and
   drawn in an SVG overlay, with a pulse travelling along each path.
------------------------------------------------------------------ */

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { IconType } from "react-icons";
import {
  SiReact, SiAndroid, SiKotlin, SiSpringboot, SiRedis,
  SiMariadbfoundation, SiMysql, SiPrisma, SiNextdotjs, SiDocker,
  SiNginx, SiJenkins, SiOpenai, SiTwilio, SiFastapi, SiPython,
  SiFirebase, SiNaver, SiSamsung, SiFfmpeg, SiTypescript, SiReactquery,
} from "react-icons/si";
import {
  AlarmClock, Satellite, Gauge, Radio, Database, Shield, Mic,
  Activity, HardDrive, FileAudio, Layers, Footprints, TrainFront,
  GitBranch, EyeOff, Lock, RefreshCw, Waves, ServerCog, ScrollText,
  type LucideIcon,
} from "lucide-react";

type Kind = "app" | "native" | "server" | "store" | "external" | "worker";
type Node = { id: string; name: string; role: string; kind: Kind; icon?: string };
type Band = { label: string; nodes: Node[] };
type Edge = { from: string; to: string; wire?: string; kind?: "sync" | "async" | "blocked" };
type Spec = { bands: Band[]; edges: Edge[]; caption: string };

const ICONS: Record<string, IconType | LucideIcon> = {
  react: SiReact, android: SiAndroid, kotlin: SiKotlin, spring: SiSpringboot,
  redis: SiRedis, mariadb: SiMariadbfoundation, mysql: SiMysql, prisma: SiPrisma,
  next: SiNextdotjs, docker: SiDocker, nginx: SiNginx, jenkins: SiJenkins,
  openai: SiOpenai, twilio: SiTwilio, fastapi: SiFastapi, python: SiPython,
  firebase: SiFirebase, naver: SiNaver, samsung: SiSamsung, ffmpeg: SiFfmpeg,
  ts: SiTypescript, query: SiReactquery,
  alarm: AlarmClock, satellite: Satellite, gauge: Gauge, radio: Radio,
  db: Database, shield: Shield, mic: Mic, activity: Activity,
  disk: HardDrive, audio: FileAudio, layers: Layers, steps: Footprints,
  train: TrainFront, branch: GitBranch, hide: EyeOff, lock: Lock,
  retry: RefreshCw, waves: Waves, server: ServerCog, scroll: ScrollText,
};

type KindStyle = { c: string; soft: string; tag: string };
const KIND_STYLE: Record<Kind, KindStyle> = {
  app:      { c: "#06b6d4", soft: "rgba(6,182,212,0.08)",  tag: "APP" },
  native:   { c: "#6366f1", soft: "rgba(99,102,241,0.08)", tag: "NATIVE" },
  server:   { c: "#8b5cf6", soft: "rgba(139,92,246,0.08)", tag: "SERVER" },
  worker:   { c: "#10b981", soft: "rgba(16,185,129,0.08)", tag: "WORKER" },
  store:    { c: "#f59e0b", soft: "rgba(245,158,11,0.08)", tag: "STORE" },
  external: { c: "#64748b", soft: "rgba(100,116,139,0.08)",tag: "EXT" },
};

const KIND_LABEL: Record<string, Record<Kind, string>> = {
  ko: { app: "앱 / 클라이언트", native: "네이티브", server: "서버", worker: "워커", store: "저장소", external: "외부" },
  ja: { app: "アプリ / クライアント", native: "ネイティブ", server: "サーバー", worker: "ワーカー", store: "ストレージ", external: "外部" },
  en: { app: "App / client", native: "Native", server: "Server", worker: "Worker", store: "Storage", external: "External" },
};
const HOVER_HINT: Record<string, string> = {
  ko: "블록에 마우스를 올리면 연결된 흐름만 강조됩니다.",
  ja: "ブロックにカーソルを合わせると、つながるフローだけが強調されます。",
  en: "Hover a block to highlight only its connected flows.",
};

type Path = { d: string; wire?: string; wx: number; wy: number; kind?: Edge["kind"]; from: string; to: string };

function DiagramView({ spec, locale }: { spec: Spec; locale: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState<Path[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [focus, setFocus] = useState<string | null>(null);

  const kindOf = new Map<string, Kind>();
  for (const b of spec.bands) for (const n of b.nodes) kindOf.set(n.id, n.kind);

  const neighbor = new Set<string>();
  if (focus) {
    neighbor.add(focus);
    for (const e of spec.edges) {
      if (e.from === focus) neighbor.add(e.to);
      if (e.to === focus) neighbor.add(e.from);
    }
  }
  const edgeActive = (e: { from: string; to: string }) =>
    !focus || e.from === focus || e.to === focus;

  const measure = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const rb = root.getBoundingClientRect();
    const box = new Map<string, DOMRect>();
    root.querySelectorAll<HTMLElement>("[data-node]").forEach((el) => {
      box.set(el.dataset.node!, el.getBoundingClientRect());
    });
    const out: Path[] = [];
    for (const e of spec.edges) {
      const a = box.get(e.from);
      const b = box.get(e.to);
      if (!a || !b) continue;
      const ax = a.left - rb.left, ay = a.top - rb.top;
      const bx = b.left - rb.left, by = b.top - rb.top;
      const sameRow = Math.abs(ay - by) < 8;
      if (sameRow) {
        const leftFirst = ax < bx;
        const x1 = leftFirst ? ax + a.width : ax;
        const x2 = leftFirst ? bx : bx + b.width;
        const y = ay + a.height / 2;
        out.push({
          d: `M ${x1} ${y} L ${x2} ${y}`,
          wire: e.wire, wx: (x1 + x2) / 2, wy: y - 7, kind: e.kind,
          from: e.from, to: e.to,
        });
      } else {
        const down = by > ay;
        const x1 = ax + a.width / 2;
        const y1 = down ? ay + a.height : ay;
        const x2 = bx + b.width / 2;
        const y2 = down ? by : by + b.height;
        const my = (y1 + y2) / 2;
        out.push({
          d: `M ${x1} ${y1} L ${x1} ${my} L ${x2} ${my} L ${x2} ${y2}`,
          wire: e.wire,
          wx: Math.abs(x2 - x1) > 40 ? (x1 + x2) / 2 : x2 + 8,
          wy: my - 5,
          kind: e.kind,
          from: e.from, to: e.to,
        });
      }
    }
    setPaths(out);
    setSize({ w: rb.width, h: rb.height });
  }, [spec]);

  useLayoutEffect(measure, [measure]);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    return () => ro.disconnect();
  }, [measure]);

  return (
    <figure className="my-12">
      <div className="rounded-xl border border-line bg-paper-warm p-4 sm:p-6">
        <div ref={rootRef} className="relative">
          {/* edge overlay */}
          {size.w > 0 && (
            <svg
              className="pointer-events-none absolute inset-0 z-0"
              width={size.w} height={size.h}
              viewBox={`0 0 ${size.w} ${size.h}`}
              aria-hidden
            >
              <defs>
                <marker id="adg-a" viewBox="0 0 10 10" refX="8.5" refY="5"
                  markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M0,1.5 L8.5,5 L0,8.5 z" fill="var(--color-ink-soft)" />
                </marker>
              </defs>
              {paths.map((p, i) => {
                const active = edgeActive(p);
                const c = p.kind === "blocked"
                  ? "var(--color-rose)"
                  : KIND_STYLE[kindOf.get(p.from) ?? "external"].c;
                return (
                  <g key={i} style={{ opacity: active ? 1 : 0.12, transition: "opacity .25s" }}>
                    <path d={p.d} fill="none"
                      stroke={c}
                      strokeWidth={focus && active ? 2 : 1.4}
                      strokeDasharray={p.kind === "blocked" ? "3 3" : p.kind === "async" ? "6 3" : undefined}
                      markerEnd="url(#adg-a)" opacity={focus && active ? 0.9 : 0.55}
                      style={{ transition: "stroke-width .2s, opacity .25s" }}
                    />
                    {p.kind !== "blocked" && (
                      <circle r={focus && active ? 4 : 3.2} fill={c} className="adg-pulse">
                        <animateMotion dur={focus && active ? "1.4s" : "3s"} begin={`${i * 0.2}s`}
                          repeatCount="indefinite" path={p.d} />
                        <animate attributeName="opacity" dur={focus && active ? "1.4s" : "3s"} begin={`${i * 0.2}s`}
                          values="0;1;1;0" keyTimes="0;0.08;0.88;1" repeatCount="indefinite" />
                      </circle>
                    )}
                    {p.wire && (
                      <g>
                        <rect x={p.wx - p.wire.length * 4.6 - 3} y={p.wy - 10.5}
                          width={p.wire.length * 9.2 + 6} height={15} rx={7.5}
                          fill="var(--color-paper-warm)" stroke={c} strokeOpacity={0.35} strokeWidth={0.8} />
                        <text x={p.wx} y={p.wy} textAnchor="middle" className="adg-wire" fill={c}>
                          {p.wire}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          )}

          {/* bands */}
          <div className="relative z-10 flex flex-col gap-9">
            {spec.bands.map((band) => (
              <div key={band.label}>
                <p className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                  <span aria-hidden className="inline-block h-px w-4 bg-line-strong" />
                  {band.label}
                </p>
                <div
                  className="grid gap-2.5"
                  style={{ gridTemplateColumns: `repeat(${band.nodes.length}, minmax(0, 1fr))` }}
                >
                  {band.nodes.map((node) => {
                    const Icon = node.icon ? ICONS[node.icon] : undefined;
                    const ks = KIND_STYLE[node.kind];
                    const dimmed = focus !== null && !neighbor.has(node.id);
                    const isFocus = focus === node.id;
                    return (
                      <button
                        type="button"
                        key={node.id}
                        data-node={node.id}
                        onMouseEnter={() => setFocus(node.id)}
                        onMouseLeave={() => setFocus(null)}
                        onFocus={() => setFocus(node.id)}
                        onBlur={() => setFocus(null)}
                        onClick={() => setFocus(isFocus ? null : node.id)}
                        aria-pressed={isFocus}
                        className="cursor-pointer rounded-xl border bg-paper px-3 py-2.5 text-left outline-none"
                        style={{
                          borderColor: isFocus ? ks.c : `color-mix(in srgb, ${ks.c} 45%, transparent)`,
                          background: isFocus ? ks.soft : "var(--color-paper)",
                          opacity: dimmed ? 0.3 : 1,
                          transform: isFocus ? "translateY(-2px)" : "none",
                          boxShadow: isFocus ? `0 8px 20px -10px ${ks.c}80` : "none",
                          transition: "opacity .25s, transform .2s, box-shadow .2s, background .2s, border-color .2s",
                        }}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex min-w-0 items-center gap-2">
                            {Icon && (
                              <span
                                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
                                style={{ background: ks.soft, color: ks.c }}
                              >
                                <Icon className="h-3 w-3" aria-hidden />
                              </span>
                            )}
                            <span className="truncate font-mono text-[11.5px] font-semibold text-ink">
                              {node.name}
                            </span>
                          </div>
                          <span
                            className="shrink-0 rounded px-1 py-0.5 font-mono text-[7px] font-bold tracking-widest"
                            style={{ color: ks.c, background: ks.soft }}
                          >
                            {ks.tag}
                          </span>
                        </div>
                        <p className="mt-1.5 text-[10.5px] leading-snug text-ink-soft">
                          {node.role}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
        {(Object.keys(KIND_STYLE) as Kind[]).map((k) => (
          <span key={k} className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-wide text-ink-soft">
            <span aria-hidden className="inline-block h-2 w-2 rounded-sm" style={{ background: KIND_STYLE[k].c }} />
            {(KIND_LABEL[locale] ?? KIND_LABEL.ko)[k]}
          </span>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs leading-relaxed text-ink-soft">
        {spec.caption}
        <span className="mt-1 block text-[10.5px] text-ink-soft/70">
          {HOVER_HINT[locale] ?? HOVER_HINT.ko}
        </span>
      </figcaption>
    </figure>
  );
}

/* ---------------- specs ---------------- */
/* 문자열은 "ko|ja|en" 3중 표기. 파이프가 없으면 전 언어 공통. */

type RawSpec = Spec;
type SpecPair = { infra: RawSpec; code: RawSpec };

const L = (s: string, idx: number) => {
  const parts = s.split("|");
  return parts.length === 3 ? parts[idx] : s;
};
function resolve(spec: RawSpec, locale: string): Spec {
  const idx = locale === "ja" ? 1 : locale === "en" ? 2 : 0;
  return {
    caption: L(spec.caption, idx),
    bands: spec.bands.map((b) => ({
      label: b.label,
      nodes: b.nodes.map((n) => ({ ...n, role: L(n.role, idx) })),
    })),
    edges: spec.edges.map((e) => ({ ...e, wire: e.wire ? L(e.wire, idx) : undefined })),
  };
}

const TAB_LABEL: Record<string, [string, string]> = {
  ko: ["인프라 구성", "코드 컴포넌트"],
  ja: ["インフラ構成", "コードコンポーネント"],
  en: ["Infrastructure", "Code components"],
};

const SPECS: Record<string, SpecPair> = {
  "odiya-child": {
    infra: {
      caption:
        "단말의 데이터는 관리 에이전트가 평소 꺼둡니다. 앱은 전송 직전에만 개방을 요청하고, 서버 명령은 업로드 응답에 실려 내려옵니다.|端末のモバイルデータは管理エージェントが普段オフにします。アプリは送信直前だけ開放を要求し、サーバー命令はアップロード応答に載って届きます。|Mobile data is kept off by the management agent. The app requests access only right before an upload, and server commands ride back on the upload response.",
      bands: [
        { label: "MANAGED DEVICE", nodes: [
          { id: "app", name: "오디야 자녀앱|オディヤ子どもアプリ|Odiya child app", role: "React Native + Android 네이티브|React Native + Androidネイティブ|React Native + Android native", kind: "native", icon: "android" },
          { id: "knox", name: "Knox Agent", role: "기기 데이터 ON / OFF 통제|端末データのON / OFF制御|Turns device data on and off", kind: "external", icon: "samsung" },
        ]},
        { label: "NETWORK", nodes: [
          { id: "cell", name: "Cellular", role: "전송 시에만 열리는 데이터 경로|送信時のみ開く通信経路|Opens only for uploads", kind: "external", icon: "radio" },
          { id: "sms", name: "SMS", role: "일회성 코드로 앱 기동|ワンタイムコードでアプリ起動|One-time code wakes the app", kind: "external", icon: "waves" },
        ]},
        { label: "BACKEND", nodes: [
          { id: "spring", name: "Spring Boot", role: "수집 API · 명령 편승 응답|収集API · 命令同載レスポンス|Ingestion API, commands piggyback on responses", kind: "server", icon: "spring" },
        ]},
        { label: "DATA", nodes: [
          { id: "redis", name: "Redis", role: "수집 큐 · 현재 상태|収集キュー · 現在状態|Ingest queue and live state", kind: "store", icon: "redis" },
          { id: "maria", name: "MariaDB", role: "위치 이력 · 일 단위 파티션|位置履歴 · 日次パーティション|Location history, daily partitions", kind: "store", icon: "mariadb" },
        ]},
      ],
      edges: [
        { from: "app", to: "knox", wire: "개방 요청|開放要求|open request" },
        { from: "knox", to: "cell" },
        { from: "app", to: "cell", wire: "gzip POST" },
        { from: "cell", to: "spring" },
        { from: "sms", to: "app", kind: "async" },
        { from: "spring", to: "redis" },
        { from: "redis", to: "maria", wire: "60초 드레인|60秒ドレイン|60s drain" },
      ],
    },
    code: {
      caption:
        "알람이 다음 알람을 예약하며 주기를 유지합니다. 좌표는 세 단계 검증을 통과한 것만 전송되고, 실패분은 보관 후 다음 전송에 동승합니다.|アラームが次のアラームを予約して周期を保ちます。座標は三段階の検証を通過したものだけ送信され、失敗分は保管して次の送信に同載します。|An alarm reschedules itself to keep the cycle alive. Only coordinates that pass three validation stages are sent; failures are parked and ride along with the next upload.",
      bands: [
        { label: "SCHEDULING", nodes: [
          { id: "alarm", name: "AlarmManager", role: "알람 자기 재예약 · 절전 백스톱|アラーム自己再予約 · 省電力バックストップ|Self-rescheduling alarm, doze backstop", kind: "native", icon: "alarm" },
          { id: "ar", name: "ActivityRecognition", role: "정지 / 이동 전환 감지|静止 / 移動の遷移検知|Detects still vs moving", kind: "native", icon: "activity" },
        ]},
        { label: "LOCATION", nodes: [
          { id: "fused", name: "FusedLocation", role: "위치 fix 획득|位置fixの取得|Acquires location fixes", kind: "native", icon: "satellite" },
          { id: "gnss", name: "GnssStatus", role: "위성 수로 셀 좌표 판별|衛星数で基地局座標を判別|Satellite count exposes cell positions", kind: "native", icon: "gauge" },
          { id: "sanity", name: "PositionSanity", role: "이동 속도 타당성 검사|移動速度の妥当性検査|Speed plausibility check", kind: "native", icon: "shield" },
        ]},
        { label: "NETWORK GATING", nodes: [
          { id: "nsm", name: "SessionManager", role: "요청자 카운트 · 최소 6초 유지|要求元カウント · 最低6秒維持|Caller counts, six-second minimum hold", kind: "native", icon: "radio" },
        ]},
        { label: "TRANSPORT", nodes: [
          { id: "retrofit", name: "Retrofit + OkHttp", role: "gzip 업로드 · 재시도|gzipアップロード · リトライ|Gzip upload with retries", kind: "native", icon: "android" },
          { id: "queue", name: "ParkingQueue", role: "실패분 보관 후 동승|失敗分を保管し同載|Parks failures to ride along later", kind: "store", icon: "disk" },
        ]},
      ],
      edges: [
        { from: "alarm", to: "fused", wire: "tick" },
        { from: "ar", to: "fused" },
        { from: "fused", to: "gnss" },
        { from: "gnss", to: "sanity" },
        { from: "sanity", to: "nsm", wire: "검증 통과분|検証通過分|validated only" },
        { from: "nsm", to: "retrofit" },
        { from: "queue", to: "retrofit", kind: "async" },
      ],
    },
  },

  "odiya-parents": {
    infra: {
      caption:
        "부모 앱은 서버를 폴링해 위치를 읽고, 푸시는 조회를 앞당기는 신호로만 씁니다. 화면 수정은 스토어 심사 없이 OTA로 배포됩니다.|保護者アプリはサーバーをポーリングして位置を読み、プッシュは照会を早める信号としてだけ使います。画面の修正はストア審査なしにOTAで配布されます。|The parent app polls the server for locations; push only advances the next poll. UI fixes ship over the air without store review.",
      bands: [
        { label: "PARENT DEVICE", nodes: [
          { id: "papp", name: "오디야 부모앱|オディヤ保護者アプリ|Odiya parent app", role: "React Native 0.79 · 신규 아키텍처|React Native 0.79 · 新アーキテクチャ|React Native 0.79, new architecture", kind: "app", icon: "react" },
        ]},
        { label: "CHANNELS", nodes: [
          { id: "http", name: "HTTPS polling", role: "15~60초 · 추적 시 3초|15~60秒 · 追跡時3秒|15-60s, 3s while tracking", kind: "external", icon: "query" },
          { id: "fcm", name: "FCM", role: "조회 가속 신호|照会の加速信号|Advances the next poll", kind: "external", icon: "firebase" },
          { id: "ws", name: "STOMP / WS", role: "채팅 수신 전용|チャット受信専用|Chat receive only", kind: "external", icon: "waves" },
        ]},
        { label: "BACKEND", nodes: [
          { id: "spring", name: "Spring Boot", role: "위치 이력 · 실시간 세션 장부|位置履歴 · リアルタイムセッション台帳|Location history, live-track ledger", kind: "server", icon: "spring" },
        ]},
        { label: "DELIVERY", nodes: [
          { id: "ota", name: "hot-updater OTA", role: "Supabase 번들 · 공식/무표시 이원화|Supabaseバンドル · 公式/サイレント二系統|Supabase bundles, official and silent tracks", kind: "worker", icon: "retry" },
          { id: "store", name: "App Store / Play", role: "네이티브 릴리스|ネイティブリリース|Native releases", kind: "external", icon: "disk" },
        ]},
      ],
      edges: [
        { from: "spring", to: "http", wire: "위치 이력|位置履歴|history" },
        { from: "http", to: "papp" },
        { from: "fcm", to: "papp", kind: "async" },
        { from: "ws", to: "papp", kind: "async" },
        { from: "ota", to: "papp", wire: "JS 번들|JSバンドル|JS bundle" },
        { from: "store", to: "papp", kind: "async" },
      ],
    },
    code: {
      caption:
        "해석 로직은 화면과 분리된 순수 함수라 단위 테스트 89개로 규칙을 고정합니다. 조건을 만족하지 못하면 지도에 그리지 않습니다.|解釈ロジックは画面から分離された純粋関数で、89個のユニットテストでルールを固定しています。条件を満たさなければ地図に描きません。|Interpretation lives in pure functions pinned by 89 unit tests. If the conditions are not met, nothing is drawn.",
      bands: [
        { label: "FETCH", nodes: [
          { id: "tq", name: "TanStack Query", role: "폴링 · 캐시|ポーリング · キャッシュ|Polling and cache", kind: "app", icon: "query" },
        ]},
        { label: "INTERPRETATION", nodes: [
          { id: "stay", name: "stayPoints.ts", role: "체류 군집 · 자정 분할|滞在クラスタ · 日付分割|Stay clustering, midnight split", kind: "app", icon: "steps" },
          { id: "subway", name: "subway.ts", role: "956역 · 3중 필터|956駅 · 三重フィルター|956 stations, triple filter", kind: "app", icon: "train" },
          { id: "ver", name: "childVersion.ts", role: "자녀앱 버전 게이트|子どもアプリのバージョンゲート|Child-app version gate", kind: "app", icon: "branch" },
        ]},
        { label: "STATE", nodes: [
          { id: "zustand", name: "zustand", role: "auth · chat · liveTrack|auth · chat · liveTrack|auth, chat, liveTrack stores", kind: "app", icon: "layers" },
        ]},
        { label: "RENDER", nodes: [
          { id: "map", name: "Naver Map SDK", role: "머문 곳 · 경로 표시|滞在地 · 経路表示|Draws stays and routes", kind: "app", icon: "naver" },
          { id: "silent", name: "표시하지 않음|表示しない|Not shown", role: "조건 불충족 시 침묵|条件を満たさなければ沈黙|Silent when unsure", kind: "external", icon: "hide" },
        ]},
      ],
      edges: [
        { from: "tq", to: "stay" },
        { from: "tq", to: "subway" },
        { from: "tq", to: "ver" },
        { from: "stay", to: "zustand" },
        { from: "subway", to: "zustand" },
        { from: "ver", to: "zustand" },
        { from: "zustand", to: "map", wire: "충족|充足|met" },
        { from: "zustand", to: "silent", wire: "미충족|未充足|not met", kind: "blocked" },
      ],
    },
  },

  "kocca-kstt": {
    infra: {
      caption:
        "맥에서 빌드한 산출물이 검증 게이트를 지나 blue/green 슬롯으로 배포됩니다. 스키마 변경은 추가 전용만 통과합니다.|Macでビルドした成果物が検証ゲートを通ってblue/greenスロットへデプロイされます。スキーマ変更は追加専用のみ通過します。|Artifacts built on a Mac pass a verification gate into blue/green slots. Only additive schema changes get through.",
      bands: [
        { label: "CLIENT", nodes: [
          { id: "browser", name: "Browser", role: "응시자 · 채점자|受験者 · 採点者|Candidates and graders", kind: "app", icon: "next" },
        ]},
        { label: "EDGE", nodes: [
          { id: "nginx", name: "nginx", role: "blue / green 트래픽 전환|blue / greenのトラフィック切替|Switches traffic between slots", kind: "server", icon: "nginx" },
        ]},
        { label: "RUNTIME", nodes: [
          { id: "next", name: "Next.js runner", role: "standalone · 스케줄러 내장|standalone · スケジューラ内蔵|Standalone with built-in scheduler", kind: "server", icon: "next" },
          { id: "sttw", name: "STT worker", role: "별도 컨테이너 · 하트비트|別コンテナ · ハートビート|Separate container with heartbeat", kind: "worker", icon: "mic" },
        ]},
        { label: "DATA & EXTERNAL", nodes: [
          { id: "mysql", name: "MySQL", role: "모델 50개|モデル50個|50 models", kind: "store", icon: "mysql" },
          { id: "s3", name: "Object Storage", role: "녹음 · 미디어|録音 · メディア|Recordings and media", kind: "store", icon: "disk" },
          { id: "stt", name: "STT / TTS servers", role: "자체 호스팅 + 외부 API|セルフホスト + 外部API|Self-hosted plus external API", kind: "external", icon: "audio" },
        ]},
        { label: "DEPLOY", nodes: [
          { id: "gate", name: "CI 게이트|CIゲート|CI gate", role: "타입체크 · 테스트 · 스모크|型チェック · テスト · スモーク|Typecheck, tests, smoke", kind: "server", icon: "scroll" },
          { id: "ddl", name: "ADD-only SQL", role: "삭제 구문 감지 시 중단|削除構文の検知で中断|Aborts on destructive statements", kind: "server", icon: "lock" },
        ]},
      ],
      edges: [
        { from: "browser", to: "nginx", wire: "HTTPS" },
        { from: "nginx", to: "next" },
        { from: "next", to: "mysql" },
        { from: "next", to: "s3", wire: "presigned" },
        { from: "sttw", to: "stt" },
        { from: "sttw", to: "mysql", wire: "전사 결과|文字起こし結果|transcripts" },
        { from: "gate", to: "ddl" },
        { from: "ddl", to: "nginx", wire: "통과 시 전환|通過時に切替|switch on pass" },
      ],
    },
    code: {
      caption:
        "응시 요청은 게이트를 지나 도메인 코어로 들어가고, 녹음은 세대로 쌓이며, 문항은 응시 시점 리비전으로 고정됩니다.|受験リクエストはゲートを通ってドメインコアへ入り、録音は世代として積まれ、設問は受験時点のリビジョンに固定されます。|Requests pass an entry gate into the domain core; recordings accumulate as generations and questions are pinned to their revision.",
      bands: [
        { label: "ENTRY", nodes: [
          { id: "action", name: "Server Actions", role: "변이 · CSRF 게이트|ミューテーション · CSRFゲート|Mutations behind a CSRF gate", kind: "server", icon: "ts" },
          { id: "route", name: "Route Handlers", role: "업로드 · 오디오 서빙|アップロード · オーディオ配信|Uploads and audio serving", kind: "server", icon: "next" },
        ]},
        { label: "DOMAIN CORE", nodes: [
          { id: "egate", name: "examEntryGate", role: "배정 검증 · 부정행위 차단|割当検証 · 不正行為の遮断|Assignment checks, anti-cheat", kind: "server", icon: "lock" },
          { id: "rev", name: "roundSnapshot", role: "응시 시점 문항 고정|受験時点の設問固定|Pins questions at exam time", kind: "server", icon: "scroll" },
          { id: "attempt", name: "attempt model", role: "녹음 세대 보존|録音の世代保存|Recordings kept as generations", kind: "server", icon: "db" },
        ]},
        { label: "PIPELINES", nodes: [
          { id: "sttb", name: "sttBatch", role: "FOR UPDATE 선점 · 단일성|FOR UPDATE先取 · 単一性|Row-lock claim, single worker", kind: "worker", icon: "mic" },
          { id: "tts", name: "TTS router", role: "voiceId 접두어 분기|voiceIdプレフィックス分岐|Routes by voiceId prefix", kind: "worker", icon: "audio" },
          { id: "norm", name: "audioNormalize", role: "음량 정규화 · 데이터셋|音量正規化 · データセット|Loudness and dataset build", kind: "worker", icon: "ffmpeg" },
        ]},
        { label: "PERSISTENCE", nodes: [
          { id: "prisma", name: "Prisma", role: "도메인 스키마|ドメインスキーマ|Domain schema", kind: "store", icon: "prisma" },
        ]},
      ],
      edges: [
        { from: "action", to: "egate" },
        { from: "route", to: "attempt", wire: "녹음|録音|recording" },
        { from: "egate", to: "rev" },
        { from: "attempt", to: "sttb", kind: "async" },
        { from: "rev", to: "tts" },
        { from: "sttb", to: "prisma" },
        { from: "norm", to: "prisma" },
      ],
    },
  },

  "wigvo-v2": {
    infra: {
      caption:
        "브라우저와 일반 전화 사이를 릴레이 서버가 잇습니다. 방향별로 하나씩, 두 개의 실시간 세션이 통역을 맡습니다.|ブラウザと一般電話の間をリレーサーバーがつなぎます。方向ごとに一つずつ、二つのリアルタイムセッションが通訳を担います。|The relay bridges a browser and an ordinary phone. Two realtime sessions interpret, one per direction.",
      bands: [
        { label: "CALLER", nodes: [
          { id: "web", name: "Next.js Client", role: "발신자 · 브라우저 오디오|発信者 · ブラウザオーディオ|Caller, browser audio", kind: "app", icon: "next" },
        ]},
        { label: "RELAY", nodes: [
          { id: "caddy", name: "Caddy", role: "TLS 자동 갱신|TLS自動更新|Automatic TLS", kind: "server", icon: "lock" },
          { id: "relay", name: "FastAPI relay", role: "Docker · 이중 세션 중계|Docker · 二重セッション中継|Docker, dual-session relay", kind: "server", icon: "fastapi" },
          { id: "obs", name: "Langfuse", role: "지연 · 루프 지체 추적|遅延 · ループ遅滞の追跡|Latency and loop-lag tracing", kind: "server", icon: "gauge" },
        ]},
        { label: "AI SESSIONS", nodes: [
          { id: "sa", name: "OpenAI Realtime A", role: "발신자 측 통역|発信者側の通訳|Caller-side interpretation", kind: "external", icon: "openai" },
          { id: "sb", name: "OpenAI Realtime B", role: "수신자 측 통역|受信者側の通訳|Callee-side interpretation", kind: "external", icon: "openai" },
        ]},
        { label: "TELEPHONY", nodes: [
          { id: "twilio", name: "Twilio Media Streams", role: "G.711 미디어 스트림|G.711メディアストリーム|G.711 media streams", kind: "external", icon: "twilio" },
          { id: "pstn", name: "PSTN", role: "수신자 · 앱 불필요|受信者 · アプリ不要|Callee, no app needed", kind: "external", icon: "radio" },
        ]},
      ],
      edges: [
        { from: "web", to: "caddy", wire: "WSS" },
        { from: "caddy", to: "relay" },
        { from: "relay", to: "sa", wire: "PCM" },
        { from: "relay", to: "sb", wire: "PCM" },
        { from: "relay", to: "twilio" },
        { from: "twilio", to: "pstn" },
        { from: "relay", to: "obs", kind: "async" },
      ],
    },
    code: {
      caption:
        "릴레이 내부입니다. 에코 게이트가 말할 차례를 판정해 통역 음성이 되돌아와 다시 번역되는 경로를 끊고, 용량 관리가 동시 통화의 상한을 지킵니다.|リレーの内部です。エコーゲートが話す順番を判定し、通訳音声が戻って再翻訳される経路を断ち、容量管理が同時通話の上限を守ります。|Inside the relay: the echo gate decides whose turn it is and cuts the re-translation path, while the capacity manager holds the concurrency ceiling.",
      bands: [
        { label: "ROUTES", nodes: [
          { id: "stream", name: "routes/stream", role: "클라이언트 WS 수신|クライアントWS受信|Client websocket in", kind: "server", icon: "waves" },
          { id: "hook", name: "twilio_webhook", role: "통화 이벤트 수신|通話イベント受信|Call events in", kind: "server", icon: "twilio" },
        ]},
        { label: "CALL LIFECYCLE", nodes: [
          { id: "cm", name: "call_manager", role: "통화 상태 오케스트레이션|通話状態のオーケストレーション|Orchestrates call state", kind: "server", icon: "server" },
          { id: "cap", name: "capacity_manager", role: "예약 + 활성 ≤ 상한|予約 + アクティブ ≤ 上限|reserved + active ≤ cap", kind: "server", icon: "gauge" },
        ]},
        { label: "REALTIME PATH", nodes: [
          { id: "router", name: "audio_router", role: "링 버퍼 · 끼어들기|リングバッファ · 割り込み|Ring buffer, barge-in", kind: "server", icon: "waves" },
          { id: "vad", name: "local_vad", role: "에너지 기반 발화 감지|エネルギーベースの発話検知|Energy-based voice detection", kind: "server", icon: "activity" },
          { id: "echo", name: "echo_gate", role: "무음 주입 · 차례 판정|無音注入 · 順番判定|Silence injection, turn-taking", kind: "server", icon: "shield" },
        ]},
        { label: "RESILIENCE", nodes: [
          { id: "recov", name: "recovery", role: "세션 재연결|セッション再接続|Session reconnection", kind: "server", icon: "retry" },
          { id: "guard", name: "guardrail", role: "환각 응답 차단|ハルシネーション応答の遮断|Blocks hallucinated output", kind: "server", icon: "hide" },
        ]},
      ],
      edges: [
        { from: "stream", to: "cm" },
        { from: "hook", to: "cm" },
        { from: "cm", to: "cap", wire: "reserve" },
        { from: "cm", to: "router" },
        { from: "router", to: "vad" },
        { from: "vad", to: "echo" },
        { from: "echo", to: "recov", kind: "async" },
        { from: "echo", to: "guard" },
      ],
    },
  },
};

export function CaseStudyDiagram({ slug, locale = "ko" }: { slug: string; locale?: string }): ReactNode {
  const pair = SPECS[slug];
  const [tab, setTab] = useState<0 | 1>(0);
  if (!pair) return null;
  const labels = TAB_LABEL[locale] ?? TAB_LABEL.ko;
  const spec = resolve(tab === 0 ? pair.infra : pair.code, locale);
  return (
    <div>
      <div className="mt-12 flex justify-center gap-1 rounded-full border border-line bg-paper-soft p-1 sm:mx-auto sm:w-fit">
        {labels.map((lb, i) => (
          <button
            key={lb}
            type="button"
            onClick={() => setTab(i as 0 | 1)}
            aria-pressed={tab === i}
            className={`rounded-full px-4 py-1.5 font-mono text-[11px] font-semibold transition-all ${
              tab === i
                ? "bg-violet text-white shadow-[0_4px_12px_-4px_rgba(139,92,246,0.5)]"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            {lb}
          </button>
        ))}
      </div>
      <div className="-mt-6">
        <DiagramView key={tab} spec={spec} locale={locale} />
      </div>
    </div>
  );
}
