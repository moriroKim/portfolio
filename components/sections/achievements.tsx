"use client";

import { motion } from "motion/react";
import { Languages, BookCheck } from "lucide-react";
import { SectionHeader } from "../section-header";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Props = {
  dict: Dictionary["achievements"];
};

const ease = [0.22, 1, 0.36, 1] as const;

const iconFor = (kind: "cert" | "language") => {
  if (kind === "cert") return BookCheck;
  return Languages;
};

export function AchievementsSection({ dict }: Props) {
  return (
    <section
      id="achievements"
      className="relative mx-auto w-full max-w-5xl px-6 py-24 md:py-32"
    >
      <SectionHeader
        eyebrow={dict.eyebrow}
        title={dict.title}
        description={dict.subtitle}
      />

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {dict.items.map((item, idx) => {
          const Icon = iconFor(item.kind);
          return (
            <motion.li
              key={item.title + item.date}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.06, ease }}
              className="glass-card group rounded-xl p-5"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-violet-soft p-2 text-violet-deep">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">
                    {item.date}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-ink">
                    {item.title}
                  </h3>
                  {item.meta && (
                    <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                      {item.meta}
                    </p>
                  )}
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
