"use client";

import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

type Satellite = {
  label: string;
  x: number;
  y: number;
  color: string;
  labelX: number;
  labelY: number;
  anchor: "start" | "middle" | "end";
};

const VIEW = { w: 320, h: 280 } as const;
const CENTER = {
  label: "Frontend",
  x: 160,
  y: 140,
  color: "#8b5cf6",
  radius: 26,
} as const;

const SATELLITES: Satellite[] = [
  { label: "Mobile", x: 160, y: 56, color: "#06b6d4", labelX: 160, labelY: 30, anchor: "middle" },
  { label: "Backend", x: 256, y: 140, color: "#10b981", labelX: 278, labelY: 144, anchor: "start" },
  { label: "Infra", x: 160, y: 224, color: "#f59e0b", labelX: 160, labelY: 254, anchor: "middle" },
  { label: "AI", x: 64, y: 140, color: "#6366f1", labelX: 42, labelY: 144, anchor: "end" },
];

const NODE_R = 14;
const LINE_GAP = 4;

export function SkillNetwork() {
  return (
    <div className="relative aspect-[320/280] w-full overflow-hidden rounded-2xl border border-line bg-paper-soft">
      <svg
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        className="h-full w-full"
        aria-label="Frontend at the center, expanding into Mobile, Backend, Infra, and AI"
      >
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft glow behind center */}
        <circle cx={CENTER.x} cy={CENTER.y} r={70} fill="url(#centerGlow)" />

        {/* Connection lines from center to each satellite */}
        {SATELLITES.map((s, i) => {
          const dx = s.x - CENTER.x;
          const dy = s.y - CENTER.y;
          const dist = Math.hypot(dx, dy);
          const ux = dx / dist;
          const uy = dy / dist;
          const startX = CENTER.x + ux * (CENTER.radius + LINE_GAP);
          const startY = CENTER.y + uy * (CENTER.radius + LINE_GAP);
          const endX = s.x - ux * (NODE_R + LINE_GAP);
          const endY = s.y - uy * (NODE_R + LINE_GAP);
          const visibleLength = Math.hypot(endX - startX, endY - startY);
          const startDelay = 0.7 + i * 0.45;

          return (
            <motion.line
              key={`line-${s.label}`}
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke="#cdc8db"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeDasharray={visibleLength}
              initial={{ strokeDashoffset: visibleLength, opacity: 0 }}
              whileInView={{ strokeDashoffset: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                strokeDashoffset: { duration: 0.55, delay: startDelay, ease },
                opacity: { duration: 0.2, delay: startDelay },
              }}
            />
          );
        })}

        {/* Center node */}
        <motion.circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={CENTER.radius}
          fill={CENTER.color}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.15, ease }}
          style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
        />

        {/* Center label — below the node */}
        <motion.text
          x={CENTER.x}
          y={CENTER.y + CENTER.radius + 22}
          textAnchor="middle"
          className="fill-[var(--color-violet-deep)] font-mono text-[11px] font-bold"
          initial={{ opacity: 0, y: -4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.45 }}
        >
          {CENTER.label}
        </motion.text>

        {/* Satellite nodes + labels */}
        {SATELLITES.map((s, i) => {
          const nodeDelay = 0.95 + i * 0.45;
          const labelDelay = nodeDelay + 0.15;

          return (
            <g key={`sat-${s.label}`}>
              {/* Subtle ring behind satellite for depth */}
              <motion.circle
                cx={s.x}
                cy={s.y}
                r={NODE_R + 6}
                fill="none"
                stroke={s.color}
                strokeOpacity={0.18}
                strokeWidth={1}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: nodeDelay, ease }}
                style={{ transformOrigin: `${s.x}px ${s.y}px` }}
              />

              <motion.circle
                cx={s.x}
                cy={s.y}
                r={NODE_R}
                fill={s.color}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: nodeDelay, ease }}
                style={{ transformOrigin: `${s.x}px ${s.y}px` }}
              />

              <motion.text
                x={s.labelX}
                y={s.labelY}
                textAnchor={s.anchor}
                dominantBaseline="middle"
                className="fill-[var(--color-ink)] font-mono text-[10px] font-bold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: labelDelay }}
              >
                {s.label}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
