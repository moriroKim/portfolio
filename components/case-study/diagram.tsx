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

const KIND_BORDER: Record<Kind, string> = {
  app: "border-line-strong",
  native: "border-indigo/50",
  server: "border-violet/50",
  worker: "border-emerald/60",
  store: "border-line-strong",
  external: "border-ink-soft/40",
};
const KIND_TAG: Record<Kind, string> = {
  app: "APP", native: "NATIVE", server: "SERVER",
  worker: "WORKER", store: "STORE", external: "EXT",
};

type Path = { d: string; wire?: string; wx: number; wy: number; kind?: Edge["kind"] };

function DiagramView({ spec }: { spec: Spec }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState<Path[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });

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
              {paths.map((p, i) => (
                <g key={i}>
                  <path d={p.d} fill="none"
                    stroke={p.kind === "blocked" ? "var(--color-rose)" : "var(--color-ink-soft)"}
                    strokeWidth={1.3}
                    strokeDasharray={p.kind === "blocked" ? "3 3" : p.kind === "async" ? "6 3" : undefined}
                    markerEnd="url(#adg-a)" opacity={0.65}
                  />
                  {p.kind !== "blocked" && (
                    <circle r={3.2} fill="var(--color-violet)" className="adg-pulse">
                      <animateMotion dur="3s" begin={`${i * 0.2}s`} repeatCount="indefinite" path={p.d} />
                      <animate attributeName="opacity" dur="3s" begin={`${i * 0.2}s`}
                        values="0;1;1;0" keyTimes="0;0.08;0.88;1" repeatCount="indefinite" />
                    </circle>
                  )}
                  {p.wire && (
                    <g>
                      <rect x={p.wx - p.wire.length * 4.4} y={p.wy - 10}
                        width={p.wire.length * 8.8} height={14} rx={3}
                        fill="var(--color-paper-warm)" opacity={0.92} />
                      <text x={p.wx} y={p.wy} textAnchor="middle" className="adg-wire">
                        {p.wire}
                      </text>
                    </g>
                  )}
                </g>
              ))}
            </svg>
          )}

          {/* bands */}
          <div className="relative z-10 flex flex-col gap-9">
            {spec.bands.map((band) => (
              <div key={band.label}>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                  {band.label}
                </p>
                <div
                  className="grid gap-2.5"
                  style={{ gridTemplateColumns: `repeat(${band.nodes.length}, minmax(0, 1fr))` }}
                >
                  {band.nodes.map((node) => {
                    const Icon = node.icon ? ICONS[node.icon] : undefined;
                    return (
                      <div
                        key={node.id}
                        data-node={node.id}
                        className={`rounded-lg border bg-paper px-3 py-2.5 ${KIND_BORDER[node.kind]}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex min-w-0 items-center gap-1.5">
                            {Icon && (
                              <Icon className="h-3.5 w-3.5 shrink-0 text-ink-muted" aria-hidden />
                            )}
                            <span className="truncate font-mono text-[11.5px] font-semibold text-ink">
                              {node.name}
                            </span>
                          </div>
                          <span className="shrink-0 font-mono text-[7.5px] tracking-widest text-ink-soft/80">
                            {KIND_TAG[node.kind]}
                          </span>
                        </div>
                        <p className="mt-1 text-[10.5px] leading-snug text-ink-soft">
                          {node.role}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs leading-relaxed text-ink-soft">
        {spec.caption}
      </figcaption>
    </figure>
  );
}

/* ---------------- specs ---------------- */

const SPECS: Record<string, Spec> = {
  "odiya-child": {
    caption:
      "네트워크는 전송 직전에만 열립니다. Knox 에이전트에 개방을 요청해 최소 6초를 유지한 뒤 반납하고, 서버 명령은 별도 채널 없이 업로드 응답에 실려 돌아옵니다.",
    bands: [
      { label: "Scheduling", nodes: [
        { id: "alarm", name: "AlarmManager", role: "알람 자기 재예약 · 절전 백스톱", kind: "native", icon: "alarm" },
        { id: "ar", name: "ActivityRecognition", role: "정지 / 이동 전환 감지", kind: "native", icon: "activity" },
      ]},
      { label: "Location", nodes: [
        { id: "fused", name: "FusedLocation", role: "위치 fix 획득", kind: "native", icon: "satellite" },
        { id: "gnss", name: "GnssStatus", role: "위성 수로 셀 좌표 판별", kind: "native", icon: "gauge" },
        { id: "sanity", name: "PositionSanity", role: "이동 속도 타당성 검사", kind: "native", icon: "shield" },
      ]},
      { label: "Network gating", nodes: [
        { id: "nsm", name: "SessionManager", role: "요청자 카운트 · 최소 6초 유지", kind: "native", icon: "radio" },
        { id: "knox", name: "Knox Agent", role: "기기 데이터 ON / OFF", kind: "external", icon: "samsung" },
      ]},
      { label: "Transport", nodes: [
        { id: "retrofit", name: "Retrofit + OkHttp", role: "gzip 본문 업로드 · 재시도", kind: "native", icon: "android" },
        { id: "queue", name: "ParkingQueue", role: "실패분 보관 후 다음 전송에 동승", kind: "store", icon: "disk" },
      ]},
      { label: "Backend", nodes: [
        { id: "api", name: "Spring Boot", role: "POST /child-status · 응답에 명령 편승", kind: "server", icon: "spring" },
      ]},
    ],
    edges: [
      { from: "alarm", to: "fused", wire: "tick" },
      { from: "ar", to: "fused" },
      { from: "fused", to: "gnss" },
      { from: "gnss", to: "sanity" },
      { from: "sanity", to: "nsm", wire: "검증 통과분" },
      { from: "nsm", to: "knox", wire: "broadcast" },
      { from: "nsm", to: "retrofit" },
      { from: "queue", to: "retrofit", kind: "async" },
      { from: "retrofit", to: "api", wire: "gzip POST" },
    ],
  },

  "odiya-parents": {
    caption:
      "해석 로직은 화면과 분리된 순수 함수라 단위 테스트 89개로 규칙을 고정합니다. 조건을 만족하지 못하면 지도에 그리지 않습니다.",
    bands: [
      { label: "Fetch", nodes: [
        { id: "tq", name: "TanStack Query", role: "15~60초 폴링 · 추적 시 3초", kind: "app", icon: "query" },
        { id: "fcm", name: "FCM", role: "조회를 앞당기는 신호", kind: "external", icon: "firebase" },
        { id: "stomp", name: "STOMP / WebSocket", role: "채팅 수신 전용 소켓", kind: "app", icon: "waves" },
      ]},
      { label: "Interpretation · 순수 함수, 테스트 89개", nodes: [
        { id: "stay", name: "stayPoints.ts", role: "체류 군집 · 자정 분할", kind: "app", icon: "steps" },
        { id: "subway", name: "subway.ts", role: "956역 · 3중 필터", kind: "app", icon: "train" },
        { id: "ver", name: "childVersion.ts", role: "자녀앱 버전 게이트", kind: "app", icon: "branch" },
      ]},
      { label: "State", nodes: [
        { id: "zustand", name: "zustand", role: "auth · chat · liveTrack 스토어", kind: "app", icon: "layers" },
      ]},
      { label: "Render", nodes: [
        { id: "map", name: "Naver Map SDK", role: "머문 곳 · 경로 표시", kind: "app", icon: "naver" },
        { id: "silent", name: "표시하지 않음", role: "조건 불충족 시 침묵", kind: "external", icon: "hide" },
      ]},
      { label: "Backend", nodes: [
        { id: "be", name: "Spring Boot", role: "GET /api/odiya · 위치 이력", kind: "server", icon: "spring" },
      ]},
    ],
    edges: [
      { from: "be", to: "tq", wire: "위치 이력" },
      { from: "tq", to: "stay" },
      { from: "tq", to: "subway" },
      { from: "fcm", to: "ver", kind: "async" },
      { from: "stay", to: "zustand" },
      { from: "subway", to: "zustand" },
      { from: "ver", to: "zustand" },
      { from: "zustand", to: "map", wire: "충족" },
      { from: "zustand", to: "silent", wire: "미충족", kind: "blocked" },
      { from: "stomp", to: "zustand", kind: "async" },
    ],
  },

  "kocca-kstt": {
    caption:
      "음성 인식 워커는 행 잠금으로 작업을 선점하고 생존을 기록해 하나만 살아 있습니다. 배포는 추가 전용 SQL만 통과시키고, 삭제 구문을 만나면 서버에 닿기 전에 멈춥니다.",
    bands: [
      { label: "Client", nodes: [
        { id: "exam", name: "Next.js App Router", role: "응시 · 마이크 테스트 · 녹음", kind: "app", icon: "next" },
        { id: "admin", name: "Admin 30여 화면", role: "채점 · 회차 · 데이터셋", kind: "app", icon: "react" },
      ]},
      { label: "Application", nodes: [
        { id: "action", name: "Server Actions", role: "변이 · CSRF 게이트", kind: "server", icon: "ts" },
        { id: "route", name: "Route Handlers", role: "녹음 업로드 · 오디오 서빙", kind: "server", icon: "next" },
        { id: "gate", name: "examEntryGate", role: "배정 검증 · 부정행위 차단", kind: "server", icon: "lock" },
      ]},
      { label: "Workers", nodes: [
        { id: "stt", name: "STT Worker", role: "FOR UPDATE 선점 · 하트비트", kind: "worker", icon: "mic" },
        { id: "tts", name: "TTS 2종", role: "자체 호스팅 + 외부 API 분기", kind: "worker", icon: "audio" },
        { id: "ffmpeg", name: "ffmpeg", role: "음량 정규화 · 속도 보정", kind: "worker", icon: "ffmpeg" },
      ]},
      { label: "Data", nodes: [
        { id: "prisma", name: "Prisma + MySQL", role: "모델 50개", kind: "store", icon: "prisma" },
        { id: "s3", name: "Object Storage", role: "녹음 · 문항 미디어", kind: "store", icon: "disk" },
        { id: "ds", name: "Dataset Export", role: "1음원 1행 · 개인정보 제거", kind: "store", icon: "db" },
      ]},
      { label: "Deploy", nodes: [
        { id: "ddl", name: "ADD-only SQL 게이트", role: "삭제 구문 감지 시 배포 중단", kind: "server", icon: "scroll" },
        { id: "bg", name: "Docker + nginx", role: "blue / green 무중단 전환", kind: "server", icon: "docker" },
      ]},
    ],
    edges: [
      { from: "exam", to: "route", wire: "녹음 업로드" },
      { from: "admin", to: "action" },
      { from: "route", to: "stt", kind: "async" },
      { from: "gate", to: "tts" },
      { from: "stt", to: "prisma", wire: "전사 결과" },
      { from: "tts", to: "s3" },
      { from: "ffmpeg", to: "ds" },
      { from: "prisma", to: "ddl" },
      { from: "ddl", to: "bg", wire: "통과 시" },
    ],
  },

  "wigvo-v2": {
    caption:
      "두 개의 Realtime 세션이 통화 양쪽을 각각 맡고, FastAPI 릴레이가 그 사이에서 오디오를 중계합니다. 에코 게이트가 말할 차례를 판정해 통역 음성이 되돌아와 다시 번역되는 경로를 끊습니다.",
    bands: [
      { label: "Endpoint", nodes: [
        { id: "web", name: "Next.js Client", role: "발신자 · 브라우저", kind: "app", icon: "next" },
        { id: "twilio", name: "Twilio Media Streams", role: "전화망 전송 · G.711", kind: "external", icon: "twilio" },
      ]},
      { label: "Realtime session", nodes: [
        { id: "sa", name: "OpenAI Realtime A", role: "발신자 측 통역", kind: "external", icon: "openai" },
        { id: "sb", name: "OpenAI Realtime B", role: "수신자 측 통역", kind: "external", icon: "openai" },
      ]},
      { label: "Relay server · FastAPI · Python 3.12", nodes: [
        { id: "router", name: "audio_router", role: "링 버퍼 · 끼어들기 처리", kind: "server", icon: "waves" },
        { id: "echo", name: "echo_gate", role: "무음 주입 · 발화 감지", kind: "server", icon: "shield" },
        { id: "cap", name: "capacity_manager", role: "예약 + 활성 ≤ 상한", kind: "server", icon: "server" },
        { id: "recov", name: "recovery", role: "세션 재연결 · 환각 차단", kind: "server", icon: "retry" },
      ]},
      { label: "Infra", nodes: [
        { id: "docker", name: "Docker Compose", role: "릴레이 · 프록시 구성", kind: "server", icon: "docker" },
        { id: "caddy", name: "Caddy", role: "TLS 자동 갱신", kind: "server", icon: "lock" },
        { id: "obs", name: "Langfuse + loop_lag", role: "지연 · 루프 지체 추적", kind: "server", icon: "gauge" },
      ]},
    ],
    edges: [
      { from: "web", to: "sa", wire: "PCM" },
      { from: "twilio", to: "sb", wire: "G.711" },
      { from: "sa", to: "router" },
      { from: "sb", to: "echo" },
      { from: "router", to: "echo", wire: "믹스" },
      { from: "echo", to: "cap" },
      { from: "cap", to: "recov" },
      { from: "router", to: "docker" },
      { from: "echo", to: "obs", kind: "async" },
    ],
  },
};

export function CaseStudyDiagram({ slug }: { slug: string }): ReactNode {
  const spec = SPECS[slug];
  return spec ? <DiagramView spec={spec} /> : null;
}
