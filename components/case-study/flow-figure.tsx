"use client";

/* ------------------------------------------------------------------
   인라인 도식용 React Flow 캔버스.
   자유 배치(원형·격자)를 쓰되 줌과 패닝이 붙으므로, 한 화면에 다
   안 들어와도 사용자가 직접 확대해서 볼 수 있다.
------------------------------------------------------------------ */

import { memo, useMemo } from "react";
import {
  ReactFlow, Handle, Position, MarkerType,
  type Node as FlowNode, type Edge as FlowEdge, type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { LucideIcon } from "lucide-react";

export type Tone = "muted" | "cyan" | "violet" | "amber" | "rose" | "emerald" | "indigo";
export const TONE: Record<Tone, { fg: string; bg: string; bd: string }> = {
  muted:   { fg: "#64748b", bg: "rgba(100,116,139,0.10)", bd: "rgba(100,116,139,0.38)" },
  cyan:    { fg: "#0891b2", bg: "rgba(8,145,178,0.10)",   bd: "rgba(8,145,178,0.42)" },
  violet:  { fg: "#7c3aed", bg: "rgba(124,58,237,0.10)",  bd: "rgba(124,58,237,0.42)" },
  amber:   { fg: "#b45309", bg: "rgba(217,119,6,0.12)",   bd: "rgba(217,119,6,0.44)" },
  rose:    { fg: "#e11d48", bg: "rgba(225,29,72,0.09)",   bd: "rgba(225,29,72,0.40)" },
  emerald: { fg: "#047857", bg: "rgba(5,150,105,0.10)",   bd: "rgba(5,150,105,0.42)" },
  indigo:  { fg: "#4f46e5", bg: "rgba(79,70,229,0.10)",   bd: "rgba(79,70,229,0.42)" },
};

export type Chip = {
  id: string;
  icon: LucideIcon;
  label: string;
  note?: string;
  tone?: Tone;
  badge?: string;
  dashed?: boolean;
  /** 순차 점등 순번 */
  seq?: number;
  x: number;
  y: number;
};
export type Link = {
  from: string; to: string; tone?: Tone; label?: string;
  dashed?: boolean; curve?: boolean;
};

const HANDLES = ["t", "b", "l", "r"] as const;
const POS = { t: Position.Top, b: Position.Bottom, l: Position.Left, r: Position.Right };

const ChipNode = memo(function ChipNode({ data }: NodeProps) {
  const d = data as unknown as Chip & { total: number };
  const c = TONE[d.tone ?? "muted"];
  const Icon = d.icon;
  const hs = { opacity: 0, width: 5, height: 5, border: "none", background: "transparent", minWidth: 0, minHeight: 0 };
  const anim = d.seq !== undefined
    ? { animation: `fig-sweep ${d.total * 1.05}s ease-in-out infinite`, animationDelay: `${d.seq * 1.05}s` }
    : undefined;
  return (
    <div
      className="fig-step relative flex items-start gap-2 rounded-xl border bg-paper px-2.5 py-2"
      style={{
        width: 158, borderColor: c.bd, borderStyle: d.dashed ? "dashed" : "solid",
        ["--fg" as string]: c.fg, ...anim,
      }}
    >
      {HANDLES.map((h) => (
        <span key={h}>
          <Handle id={`${h}t`} type="target" position={POS[h]} style={hs} />
          <Handle id={`${h}s`} type="source" position={POS[h]} style={hs} />
        </span>
      ))}
      <span className="mt-px inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
        style={{ background: c.bg, color: c.fg }}>
        <Icon className="h-[15px] w-[15px]" strokeWidth={2} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block whitespace-normal text-[11.5px] font-bold leading-[1.25]" style={{ color: c.fg }}>{d.label}</span>
        {d.note && <span className="mt-1 block whitespace-normal text-[9.5px] leading-[1.35] text-ink-soft">{d.note}</span>}
      </span>
      {d.badge && (
        <span className="absolute -top-2 right-2 rounded px-1 py-0.5 font-mono text-[8px] font-bold shadow-sm"
          style={{ background: "var(--color-paper)", color: c.fg, border: `1px solid ${c.bd}` }}>{d.badge}</span>
      )}
    </div>
  );
});

const NODE_TYPES = { chip: ChipNode };
const CHIP_W = 158, CHIP_H = 54;

/** 두 칩의 상대 위치로 가장 짧은 핸들 쌍을 고른다. */
function pickHandles(a: Chip, b: Chip): [string, string] {
  const dx = b.x - a.x, dy = b.y - a.y;
  if (Math.abs(dx) > Math.abs(dy)) return dx > 0 ? ["rs", "lt"] : ["ls", "rt"];
  return dy > 0 ? ["bs", "tt"] : ["ts", "bt"];
}

export function FlowFigure({
  chips, links, title, conclusion, height = 300,
}: {
  chips: Chip[]; links: Link[]; title?: string; height?: number;
  conclusion?: { icon: LucideIcon; text: string; tone: Tone };
}) {
  const total = chips.filter((c) => c.seq !== undefined).length || 1;
  const nodes: FlowNode[] = useMemo(
    () => chips.map((c) => ({
      id: c.id, type: "chip",
      position: { x: c.x, y: c.y },
      data: { ...c, total },
      draggable: false,
    })),
    [chips, total],
  );
  const byId = useMemo(() => new Map(chips.map((c) => [c.id, c])), [chips]);
  const edges: FlowEdge[] = useMemo(
    () => links.map((l, i) => {
      const a = byId.get(l.from), b = byId.get(l.to);
      const [sh, th] = a && b ? pickHandles(a, b) : ["rs", "lt"];
      const col = TONE[l.tone ?? "muted"].fg;
      return {
        id: `e${i}`, source: l.from, target: l.to,
        sourceHandle: sh, targetHandle: th,
        type: l.curve ? "default" : "smoothstep",
        pathOptions: l.curve ? undefined : { borderRadius: 16 },
        animated: true,
        label: l.label,
        labelStyle: { fontFamily: "var(--font-mono)", fontSize: 9.5, fill: col, fontWeight: 700 },
        labelBgStyle: { fill: "var(--color-paper)", stroke: "var(--color-line)", strokeWidth: 1, fillOpacity: 1 },
        labelBgPadding: [6, 3] as [number, number],
        labelBgBorderRadius: 8,
        style: { stroke: col, strokeWidth: 1.6, strokeDasharray: l.dashed ? "5 4" : undefined, opacity: 0.75 },
        markerEnd: { type: MarkerType.ArrowClosed, width: 14, height: 14, color: col },
      };
    }),
    [links, byId],
  );

  const C = conclusion;
  return (
    <figure className="my-7 rounded-xl border border-line bg-paper-warm">
      {title && (
        <p className="border-b border-line/70 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
          {title}
        </p>
      )}
      <div style={{ height }}>
        <ReactFlow
          nodes={nodes} edges={edges} nodeTypes={NODE_TYPES}
          fitView fitViewOptions={{ padding: 0.12 }}
          minZoom={0.2} maxZoom={2}
          zoomOnScroll={false} zoomOnPinch zoomOnDoubleClick panOnDrag
          preventScrolling={false} nodesConnectable={false} elementsSelectable={false}
          proOptions={{ hideAttribution: true }}
        />
      </div>
      {C && (
        <div className="flex items-center gap-2 border-t border-line/70 px-4 py-2.5"
          style={{ background: TONE[C.tone].bg }}>
          <C.icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} style={{ color: TONE[C.tone].fg }} aria-hidden />
          <p className="text-[11px] font-semibold leading-snug" style={{ color: TONE[C.tone].fg }}>{C.text}</p>
        </div>
      )}
    </figure>
  );
}

/** 원형 배치 좌표. 사이클·생명주기에 쓴다. */
export function ring(n: number, i: number, rx = 250, ry = 118, cx = 300, cy = 160) {
  const a = (i / n) * Math.PI * 2 - Math.PI / 2;
  return { x: cx + rx * Math.cos(a) - CHIP_W / 2, y: cy + ry * Math.sin(a) - CHIP_H / 2 };
}
