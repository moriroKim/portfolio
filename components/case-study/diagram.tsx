"use client";

/* ------------------------------------------------------------------
   Architecture diagram on React Flow.
   The library owns edge routing, label backgrounds, and layering, so
   text and shapes cannot collide. Bands render as group zones; nodes
   are uniform cards whose pictogram tile carries the semantics.
------------------------------------------------------------------ */

import { memo, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ReactFlow,
  Handle,
  Position,
  MarkerType,
  type Node as FlowNode,
  type Edge as FlowEdge,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { IconType } from "react-icons";
import {
  SiReact, SiAndroid, SiKotlin, SiSpringboot, SiRedis,
  SiMariadbfoundation, SiMysql, SiPrisma, SiNextdotjs, SiDocker,
  SiNginx, SiJenkins, SiOpenai, SiTwilio, SiFastapi, SiPython,
  SiFirebase, SiNaver, SiSamsung, SiFfmpeg, SiTypescript, SiReactquery,
  SiNestjs, SiExpo, SiGooglecloud, SiSupabase,
} from "react-icons/si";
import {
  AlarmClock, Satellite, Gauge, Radio, Shield, Mic, Cloud,
  Activity, HardDrive, FileAudio, Layers, Footprints, TrainFront,
  GitBranch, EyeOff, Lock, RefreshCw, Waves, ServerCog, ScrollText,
  Server, Database, Smartphone, AppWindow, Cog,
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
  nestjs: SiNestjs, expo: SiExpo, gcp: SiGooglecloud, supabase: SiSupabase,
  alarm: AlarmClock, satellite: Satellite, gauge: Gauge, radio: Radio,
  db: Database, shield: Shield, mic: Mic, activity: Activity,
  disk: HardDrive, audio: FileAudio, layers: Layers, steps: Footprints,
  train: TrainFront, branch: GitBranch, hide: EyeOff, lock: Lock,
  retry: RefreshCw, waves: Waves, server: ServerCog, scroll: ScrollText,
};

const PICTO: Record<Kind, LucideIcon> = {
  app: AppWindow, native: Smartphone, server: Server,
  store: Database, worker: Cog, external: Cloud,
};

const KIND_COLOR: Record<Kind, { c: string; soft: string }> = {
  app:      { c: "#0891b2", soft: "rgba(8,145,178,0.10)" },
  native:   { c: "#4f46e5", soft: "rgba(79,70,229,0.10)" },
  server:   { c: "#7c3aed", soft: "rgba(124,58,237,0.10)" },
  worker:   { c: "#059669", soft: "rgba(5,150,105,0.10)" },
  store:    { c: "#d97706", soft: "rgba(217,119,6,0.10)" },
  external: { c: "#64748b", soft: "rgba(100,116,139,0.10)" },
};

const KIND_LABEL: Record<string, Record<Kind, string>> = {
  ko: { app: "앱 / 클라이언트", native: "네이티브", server: "서버", worker: "워커", store: "저장소", external: "외부" },
  ja: { app: "アプリ / クライアント", native: "ネイティブ", server: "サーバー", worker: "ワーカー", store: "ストレージ", external: "外部" },
  en: { app: "App / client", native: "Native", server: "Server", worker: "Worker", store: "Storage", external: "External" },
};
const HOVER_HINT: Record<string, string> = {
  ko: "블록에 마우스를 올리면 연결된 흐름만 강조됩니다. 드래그로 이동, 버튼으로 확대할 수 있습니다.",
  ja: "ブロックにカーソルを合わせると、つながるフローだけが強調されます。ドラッグで移動できます。",
  en: "Hover a block to highlight its flows. Drag to pan.",
};

/* ---------- 레이아웃 상수 ---------- */
const CANVAS_W = 980;
const NODE_W = 236;
const NODE_H = 68;
const NODE_GAP = 18;
const BAND_HEAD = 30;
const BAND_PAD = 14;
const BAND_GAP = 60;

/* ---------- 커스텀 노드 ---------- */
const CardNode = memo(function CardNode({ data }: NodeProps) {
  const d = data as unknown as {
    name: string; role: string; kind: Kind; icon?: string; dim: boolean; hot: boolean;
  };
  const kc = KIND_COLOR[d.kind];
  const Picto = PICTO[d.kind];
  const Brand = d.icon ? ICONS[d.icon] : undefined;
  const hs = { opacity: 0, width: 6, height: 6, border: "none", background: "transparent", minWidth: 0, minHeight: 0 };
  return (
    <div
      className="flex items-start gap-2.5 rounded-lg border bg-paper px-3 py-2.5"
      style={{
        width: NODE_W, minHeight: NODE_H,
        borderColor: d.hot ? kc.c : "var(--color-line-strong)",
        opacity: d.dim ? 0.25 : 1,
        boxShadow: d.hot ? `0 10px 24px -12px ${kc.c}70` : "0 1px 2px rgba(15,13,26,0.05)",
        transition: "opacity .25s, box-shadow .2s, border-color .2s",
      }}
    >
      <Handle id="tt" type="target" position={Position.Top} style={hs} />
      <Handle id="ts" type="source" position={Position.Top} style={hs} />
      <Handle id="bt" type="target" position={Position.Bottom} style={hs} />
      <Handle id="bs" type="source" position={Position.Bottom} style={hs} />
      <Handle id="lt" type="target" position={Position.Left} style={hs} />
      <Handle id="ls" type="source" position={Position.Left} style={hs} />
      <Handle id="rt" type="target" position={Position.Right} style={hs} />
      <Handle id="rs" type="source" position={Position.Right} style={hs} />
      <span
        aria-hidden
        className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
        style={{ background: kc.soft, color: kc.c }}
      >
        <Picto className="h-5 w-5" strokeWidth={1.9} />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1.5">
          <span className="truncate font-mono text-[12.5px] font-semibold text-ink">{d.name}</span>
          {Brand && <Brand className="h-3 w-3 shrink-0 text-ink-soft/70" aria-hidden />}
        </span>
        <span className="mt-0.5 block text-[11px] leading-snug text-ink-soft">{d.role}</span>
      </span>
    </div>
  );
});

const ZoneNode = memo(function ZoneNode({ data }: NodeProps) {
  const d = data as unknown as { label: string; w: number; h: number };
  return (
    <div
      className="rounded-xl border border-line/80"
      style={{ width: d.w, height: d.h, background: "rgba(241,239,247,0.35)" }}
    >
      <span className="absolute -top-2 left-3 bg-paper-warm px-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
        {d.label}
      </span>
    </div>
  );
});

const NODE_TYPES = { card: CardNode, zone: ZoneNode };

/* ---------- Spec → React Flow 변환 (정적 1회) ---------- */
function edgeStyle(e: Edge, active: boolean, hot: boolean) {
  const blocked = e.kind === "blocked";
  const color = blocked ? "#fb7185" : hot ? "var(--color-violet)" : "#a3abba";
  return {
    style: {
      stroke: color,
      strokeWidth: hot ? 2.2 : 1.5,
      strokeDasharray: blocked ? "4 4" : e.kind === "async" ? "7 4" : undefined,
      opacity: active ? 1 : 0.08,
      transition: "opacity .25s, stroke .2s",
    },
    markerEnd: { type: MarkerType.ArrowClosed, width: 15, height: 15, color },
    zIndex: hot ? 10 : 0,
  };
}

function buildGraph(spec: Spec) {
  const bandOf = new Map<string, number>();
  spec.bands.forEach((b, i) => b.nodes.forEach((n) => bandOf.set(n.id, i)));

  const nodes: FlowNode[] = [];
  let y = 0;
  spec.bands.forEach((band, bi) => {
    const zoneH = BAND_HEAD + NODE_H + BAND_PAD;
    nodes.push({
      id: `zone-${bi}`,
      type: "zone",
      position: { x: 0, y },
      data: { label: band.label, w: CANVAS_W, h: zoneH },
      selectable: false, draggable: false, focusable: false,
      zIndex: -1,
    });
    const n = band.nodes.length;
    const total = n * NODE_W + (n - 1) * NODE_GAP;
    const startX = (CANVAS_W - total) / 2;
    band.nodes.forEach((node, i) => {
      nodes.push({
        id: node.id,
        type: "card",
        position: { x: startX + i * (NODE_W + NODE_GAP), y: y + BAND_HEAD },
        data: { ...node, dim: false, hot: false },
        draggable: false,
      });
    });
    y += zoneH + BAND_GAP;
  });

  const edges: FlowEdge[] = spec.edges.map((e, i) => {
    const bi = bandOf.get(e.from) ?? 0;
    const bj = bandOf.get(e.to) ?? 0;
    const sameBand = bi === bj;
    const down = bj > bi;
    return {
      id: `e${i}`,
      source: e.from,
      target: e.to,
      sourceHandle: sameBand ? "rs" : down ? "bs" : "ts",
      targetHandle: sameBand ? "lt" : down ? "tt" : "bt",
      type: "smoothstep",
      pathOptions: { borderRadius: 14 },
      animated: e.kind !== "blocked",
      label: e.wire,
      labelStyle: {
        fontFamily: "var(--font-mono)", fontSize: 10, fill: "var(--color-ink-muted)",
        fontWeight: 600,
      },
      labelBgStyle: {
        fill: "var(--color-paper)", stroke: "var(--color-line)", strokeWidth: 1,
        fillOpacity: 1,
      },
      labelBgPadding: [7, 4] as [number, number],
      labelBgBorderRadius: 9,
      data: { kind: e.kind, active: true, hot: false },
      ...edgeStyle(e, true, false),
    };
  });

  return { nodes, edges, height: y - BAND_GAP };
}

function DiagramView({ spec, locale }: { spec: Spec; locale: string }) {
  const [focus, setFocus] = useState<string | null>(null);
  const base = useMemo(() => buildGraph(spec), [spec]);
  const [nodes, setNodes] = useState(base.nodes);
  const [edges, setEdges] = useState(base.edges);

  useEffect(() => {
    setNodes(base.nodes);
    setEdges(base.edges);
    setFocus(null);
  }, [base]);

  useEffect(() => {
    const neighbor = new Set<string>();
    if (focus) {
      neighbor.add(focus);
      for (const e of spec.edges) {
        if (e.from === focus) neighbor.add(e.to);
        if (e.to === focus) neighbor.add(e.from);
      }
    }
    // 바뀐 요소만 새 객체로: memo된 노드가 그대로면 리렌더되지 않는다
    setNodes((prev) =>
      prev.map((n) => {
        if (n.type !== "card") return n;
        const dim = focus !== null && !neighbor.has(n.id);
        const hot = focus === n.id;
        const d = n.data as { dim: boolean; hot: boolean };
        return d.dim === dim && d.hot === hot
          ? n
          : { ...n, data: { ...n.data, dim, hot } };
      }),
    );
    setEdges((prev) =>
      prev.map((ed) => {
        const active = !focus || ed.source === focus || ed.target === focus;
        const hot = focus !== null && active;
        const d = ed.data as { kind?: Edge["kind"]; active: boolean; hot: boolean };
        if (d.active === active && d.hot === hot) return ed;
        return {
          ...ed,
          data: { ...d, active, hot },
          ...edgeStyle({ from: ed.source, to: ed.target, kind: d.kind }, active, hot),
        };
      }),
    );
  }, [focus, spec]);

  const height = base.height;

  return (
    <figure className="my-10 md:-mx-16 lg:-mx-36 xl:-mx-44">
      <div
        className="overflow-hidden rounded-2xl border border-line bg-paper-warm"
        style={{ height: Math.min(820, height + 56) }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={NODE_TYPES}
          fitView
          fitViewOptions={{ padding: 0.04 }}
          minZoom={0.4}
          maxZoom={1.6}
          zoomOnScroll={false}
          zoomOnPinch
          panOnDrag
          preventScrolling={false}
          nodesConnectable={false}
          elementsSelectable={false}
          proOptions={{ hideAttribution: true }}
          onNodeMouseEnter={(_, n) => n.type === "card" && setFocus(n.id)}
          onNodeMouseLeave={() => setFocus(null)}
          onPaneClick={() => setFocus(null)}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
        {(Object.keys(KIND_COLOR) as Kind[]).map((k) => {
          const P = PICTO[k];
          return (
            <span key={k} className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-wide text-ink-soft">
              <span
                aria-hidden
                className="inline-flex h-4 w-4 items-center justify-center rounded"
                style={{ background: KIND_COLOR[k].soft, color: KIND_COLOR[k].c }}
              >
                <P className="h-2.5 w-2.5" strokeWidth={2} />
              </span>
              {(KIND_LABEL[locale] ?? KIND_LABEL.ko)[k]}
            </span>
          );
        })}
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
type SpecPair = { infra: RawSpec; code?: RawSpec };

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
      nodes: b.nodes.map((n) => ({ ...n, name: L(n.name, idx), role: L(n.role, idx) })),
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
  "odiya-backend": {
    infra: {
      caption:
        "단말이 올린 위치는 큐에 먼저 쌓이고, 드레인이 나눠 저장합니다. 손상 건은 격리했다가 자동으로 재주입됩니다.|端末が上げた位置はまずキューに積まれ、ドレインが分割保存します。破損分は隔離され自動で再投入されます。|Uploads land in a queue first; a drain stores them in batches. Damaged rows are quarantined and re-injected automatically.",
      bands: [
        { label: "DEVICES", nodes: [
          { id: "child", name: "자녀 단말들|子ども端末|Child devices", role: "30초 간격 위치 업로드|30秒間隔の位置アップロード|Uploads every 30 seconds", kind: "native", icon: "android" },
        ]},
        { label: "BACKEND", nodes: [
          { id: "api", name: "Spring Boot", role: "수집 API · 선검증|収集API · 事前検証|Ingestion API, validate first", kind: "server", icon: "spring" },
          { id: "drain", name: "드레인 스케줄러|ドレインスケジューラ|Drain scheduler", role: "60초 · 원자적 일괄 pop|60秒 · アトミック一括pop|60s atomic batch pop", kind: "worker", icon: "retry" },
        ]},
        { label: "BUFFER", nodes: [
          { id: "queue", name: "Redis 수집 큐|Redis収集キュー|Redis ingest queue", role: "실패 시 역순 복원|失敗時は逆順復元|Restored in order on failure", kind: "store", icon: "redis" },
          { id: "dlq", name: "격리 보관함|隔離保管箱|Quarantine", role: "손상 건 · 자동 재주입|破損分 · 自動再投入|Damaged rows, auto re-inject", kind: "store", icon: "shield" },
        ]},
        { label: "DATA", nodes: [
          { id: "db", name: "MariaDB", role: "위치 이력 · 일 파티션|位置履歴 · 日次パーティション|History, daily partitions", kind: "store", icon: "mariadb" },
        ]},
      ],
      edges: [
        { from: "child", to: "api", wire: "gzip POST" },
        { from: "api", to: "queue" },
        { from: "api", to: "dlq", wire: "손상 건|破損分|damaged", kind: "async" },
        { from: "drain", to: "queue", wire: "5,000건|5,000件|5,000 rows" },
        { from: "queue", to: "db", wire: "중복 제거 저장|重複除去保存|dedup insert" },
        { from: "dlq", to: "queue", wire: "재주입|再投入|re-inject", kind: "async" },
      ],
    },
  },

  "mohani": {
    infra: {
      caption:
        "제어 명령은 푸시로 가지만 푸시를 믿지 않습니다. 단말이 설정 버전을 폴링해 스스로 따라잡고, 접근성이 꺼지면 감시 서비스가 차단을 이어받습니다.|制御命令はプッシュで届きますが、プッシュを信頼しません。端末が設定バージョンをポーリングして自ら追いつき、アクセシビリティが切られると監視サービスがブロックを引き継ぎます。|Commands travel over push, but push is never trusted: the device polls a settings version and catches up on its own, and a watchdog keeps blocking even with accessibility off.",
      bands: [
        { label: "PARENT", nodes: [
          { id: "papp", name: "부모앱|保護者アプリ|Parent app", role: "차단 · 수면 시간 설정|ブロック · 睡眠時間の設定|Sets blocks and sleep hours", kind: "app", icon: "react" },
        ]},
        { label: "BACKEND", nodes: [
          { id: "be", name: "Spring Boot", role: "정책 저장 · 명령 발송|ポリシー保存 · 命令送信|Stores policy, sends commands", kind: "server", icon: "spring" },
          { id: "ver", name: "버전 카운터|バージョンカウンター|Version counter", role: "설정마다 원자적 +1|設定ごとにアトミック+1|Atomic +1 per change", kind: "store", icon: "db" },
        ]},
        { label: "PUSH", nodes: [
          { id: "fcm", name: "FCM", role: "유실 가능한 신호|失われうる信号|A signal that can be lost", kind: "external", icon: "firebase" },
        ]},
        { label: "CHILD DEVICE", nodes: [
          { id: "capp", name: "자녀앱|子どもアプリ|Child app", role: "버전 비교 · 자가 복구|バージョン比較 · 自己復旧|Compares version, self-heals", kind: "native", icon: "android" },
          { id: "knox", name: "Knox", role: "앱 비활성화 · 방화벽|アプリ無効化 · ファイアウォール|App disable, firewall", kind: "external", icon: "samsung" },
          { id: "guard", name: "감시 서비스|監視サービス|Watchdog service", role: "접근성 꺼지면 차단 지속|アクセシビリティOFFでも継続|Keeps blocking without a11y", kind: "worker", icon: "shield" },
        ]},
      ],
      edges: [
        { from: "papp", to: "be", wire: "설정 변경|設定変更|change" },
        { from: "be", to: "ver", wire: "+1" },
        { from: "be", to: "fcm", kind: "async" },
        { from: "fcm", to: "capp", kind: "async" },
        { from: "capp", to: "ver", wire: "폴링 비교|ポーリング比較|poll" },
        { from: "capp", to: "knox" },
        { from: "guard", to: "capp", kind: "async" },
      ],
    },
  },

  "soundmind-sso": {
    infra: {
      caption:
        "여러 제품이 한 계정을 공유합니다. 보호자와 자녀 단말은 토큰 정책이 다르고, 인증 이벤트는 재시도 후 보관함을 거쳐 복구됩니다.|複数プロダクトが一つのアカウントを共有します。保護者と子ども端末はトークンポリシーが異なり、認証イベントはリトライ後に保管箱を経て復旧されます。|Products share one account. Guardians and child devices get different token policies, and auth events retry, then park for manual recovery.",
      bands: [
        { label: "PRODUCTS", nodes: [
          { id: "apps", name: "제품 서비스들|プロダクト群|Product services", role: "위치 · 사용 관리 · 교육|見守り · 利用管理 · 教育|Safety, control, education", kind: "app", icon: "layers" },
          { id: "admin", name: "운영 대시보드|運用ダッシュボード|Ops dashboard", role: "Next.js · 세션 강제 종료|Next.js · セッション強制終了|Next.js, kill sessions", kind: "app", icon: "next" },
        ]},
        { label: "AUTH CORE", nodes: [
          { id: "sso", name: "SSO Spring Boot", role: "발급 · 검증 · 재사용 감지|発行 · 検証 · 再利用検知|Issue, verify, reuse detection", kind: "server", icon: "spring" },
        ]},
        { label: "STATE", nodes: [
          { id: "tokens", name: "토큰 저장소|トークンストア|Token store", role: "세션 겸용 · 계보 폐기|セッション兼用 · 系譜失効|Doubles as sessions", kind: "store", icon: "lock" },
          { id: "cache", name: "Redis", role: "프로필 공유 캐시|プロフィール共有キャッシュ|Shared profile cache", kind: "store", icon: "redis" },
        ]},
        { label: "EVENTS", nodes: [
          { id: "hook", name: "웹훅 발송기|Webhook送信|Webhook sender", role: "지수 백오프 3회|指数バックオフ3回|3 retries, backoff", kind: "worker", icon: "retry" },
          { id: "park", name: "실패 보관함|失敗保管箱|Failure parking", role: "관리자 수동 재처리|管理者が手動再処理|Manual replay", kind: "store", icon: "disk" },
        ]},
      ],
      edges: [
        { from: "apps", to: "sso", wire: "introspect" },
        { from: "admin", to: "sso" },
        { from: "sso", to: "tokens" },
        { from: "sso", to: "cache" },
        { from: "sso", to: "hook", kind: "async" },
        { from: "hook", to: "apps", wire: "인증 이벤트|認証イベント|auth events", kind: "async" },
        { from: "hook", to: "park", wire: "3회 실패 시|3回失敗時|after 3 fails", kind: "async" },
      ],
    },
  },

  "wigex": {
    infra: {
      caption:
        "백엔드와 모바일이 한 저장소에서 함께 갑니다. 서버는 Cloud Run으로, 데이터는 Supabase로 나갑니다.|バックエンドとモバイルが一つのリポジトリで進みます。サーバーはCloud Runへ、データはSupabaseへ。|Backend and mobile travel in one repository; the server ships to Cloud Run, data lives in Supabase.",
      bands: [
        { label: "MONOREPO", nodes: [
          { id: "mobile", name: "Expo 앱|Expoアプリ|Expo app", role: "여행 가계부 화면|旅行家計簿の画面|Travel ledger UI", kind: "app", icon: "expo" },
          { id: "api", name: "NestJS + Prisma", role: "도메인 API|ドメインAPI|Domain API", kind: "server", icon: "nestjs" },
        ]},
        { label: "CLOUD", nodes: [
          { id: "run", name: "GCP Cloud Run", role: "컨테이너 배포|コンテナデプロイ|Container deploys", kind: "server", icon: "gcp" },
          { id: "supa", name: "Supabase", role: "Postgres · 인증|Postgres · 認証|Postgres and auth", kind: "store", icon: "supabase" },
        ]},
      ],
      edges: [
        { from: "mobile", to: "run", wire: "HTTPS" },
        { from: "api", to: "run", wire: "배포|デプロイ|deploy", kind: "async" },
        { from: "run", to: "supa" },
      ],
    },
  },

  "micgolf": {
    infra: {
      caption:
        "사용자가 물건을 사는 경로와 운영자가 상품을 관리하는 경로, 양쪽을 담당했습니다.|ユーザーが購入する経路と、運用者が商品を管理する経路の両方を担当しました。|I owned both the buying path and the operator path.",
      bands: [
        { label: "CLIENT", nodes: [
          { id: "shop", name: "자사몰 프론트|ECフロント|Storefront", role: "React · 무한 스크롤|React · 無限スクロール|React, infinite scroll", kind: "app", icon: "react" },
          { id: "back", name: "백오피스|バックオフィス|Back office", role: "상품 · 카테고리 CRUD|商品 · カテゴリCRUD|Product and category CRUD", kind: "app", icon: "react" },
        ]},
        { label: "EXTERNAL", nodes: [
          { id: "pay", name: "PortOne", role: "결제 게이트웨이|決済ゲートウェイ|Payment gateway", kind: "external", icon: "lock" },
          { id: "social", name: "소셜 로그인|ソーシャルログイン|Social login", role: "이메일 · 네이버 · 카카오|メール · Naver · Kakao|Email, Naver, Kakao", kind: "external", icon: "branch" },
        ]},
        { label: "BACKEND", nodes: [
          { id: "api", name: "협업사 API|協業先API|Partner API", role: "주문 · 상품 도메인|注文 · 商品ドメイン|Orders and products", kind: "server", icon: "server" },
        ]},
      ],
      edges: [
        { from: "shop", to: "pay", wire: "결제|決済|pay" },
        { from: "shop", to: "social", wire: "로그인|ログイン|login" },
        { from: "shop", to: "api" },
        { from: "back", to: "api", wire: "CRUD" },
      ],
    },
  },

  "movieget": {
    infra: {
      caption:
        "영화 데이터는 외부 API에서, 결제는 Toss로, 배포는 AWS로. 팀장이 통합 머지와 빌드 복구까지 맡는 구조였습니다.|映画データは外部APIから、決済はTossで、デプロイはAWSへ。チームリーダーが統合マージとビルド復旧まで担う体制でした。|Movie data from an external API, payments through Toss, deploys on AWS; the lead also owned merges and build recovery.",
      bands: [
        { label: "CLIENT", nodes: [
          { id: "web", name: "React + Vite", role: "예매 화면 · 무한 스크롤|予約画面 · 無限スクロール|Booking UI, infinite scroll", kind: "app", icon: "react" },
        ]},
        { label: "EXTERNAL", nodes: [
          { id: "tmdb", name: "TMDB API", role: "영화 데이터|映画データ|Movie data", kind: "external", icon: "db" },
          { id: "toss", name: "Toss Payments", role: "결제|決済|Payments", kind: "external", icon: "lock" },
        ]},
        { label: "DEPLOY", nodes: [
          { id: "aws", name: "AWS", role: "정적 배포|静的デプロイ|Static hosting", kind: "server", icon: "disk" },
        ]},
      ],
      edges: [
        { from: "web", to: "tmdb", wire: "조회|照会|fetch" },
        { from: "web", to: "toss", wire: "결제|決済|pay" },
        { from: "web", to: "aws", wire: "배포|デプロイ|deploy", kind: "async" },
      ],
    },
  },
};


export function CaseStudyDiagram({ slug, locale = "ko" }: { slug: string; locale?: string }): ReactNode {
  const pair = SPECS[slug];
  const [tab, setTab] = useState<0 | 1>(0);
  if (!pair) return null;
  const labels = TAB_LABEL[locale] ?? TAB_LABEL.ko;
  const spec = resolve(tab === 0 || !pair.code ? pair.infra : pair.code, locale);
  if (!pair.code) {
    return <DiagramView spec={spec} locale={locale} />;
  }
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
