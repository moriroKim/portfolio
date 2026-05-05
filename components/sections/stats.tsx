"use client";

import { motion } from "motion/react";
import { Boxes, Trophy, Languages, Server } from "lucide-react";
import { SectionHeader } from "../section-header";
import CountUp from "../reactbits/CountUp";
import { MagicBento } from "../reactbits/MagicBento";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Props = {
  dict: Dictionary["stats"];
};

const ease = [0.22, 1, 0.36, 1] as const;

const ICONS = [Boxes, Trophy, Languages, Server] as const;

function parseValue(v: string):
  | { kind: "count"; to: number; suffix: string; prefix: string }
  | { kind: "literal"; text: string } {
  const m = /^([^\d]*)(\d+(?:\.\d+)?)([^\d]*)$/.exec(v.trim());
  if (m) {
    const prefix = m[1] ?? "";
    const to = parseFloat(m[2]);
    const suffix = m[3] ?? "";
    return { kind: "count", to, suffix, prefix };
  }
  return { kind: "literal", text: v };
}

export function StatsSection({ dict }: Props) {
  return (
    <section
      id="stats"
      className="relative mx-auto w-full max-w-4xl px-6 py-24 md:py-28"
    >
      <SectionHeader
        eyebrow={dict.eyebrow}
        title={dict.title}
        description={dict.subtitle}
      />

      <MagicBento>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {dict.items.map((stat, idx) => {
            const parsed = parseValue(stat.value);
            const Icon = ICONS[idx % ICONS.length];
            return (
              <motion.li
                key={stat.label + idx}
                data-bento-card
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: idx * 0.07, ease }}
                className="bento-card rounded-2xl border border-line bg-paper p-5 sm:p-6"
              >
                {/* Icon badge */}
                <div className="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-violet-soft text-violet-deep">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                </div>

                {/* Big value */}
                <div className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-bold leading-[0.95] tracking-[-0.045em] text-ink">
                  {parsed.kind === "count" ? (
                    <>
                      {parsed.prefix}
                      <CountUp
                        to={parsed.to}
                        duration={1.6}
                        delay={idx * 0.05}
                        suffix={parsed.suffix}
                      />
                    </>
                  ) : (
                    <span>{parsed.text}</span>
                  )}
                </div>

                {/* Label + meta */}
                <div className="mt-4 space-y-1.5">
                  <p className="text-sm font-bold text-ink">{stat.label}</p>
                  {stat.meta && (
                    <p className="text-[12px] leading-relaxed text-ink-soft">
                      {stat.meta}
                    </p>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ul>
      </MagicBento>
    </section>
  );
}
