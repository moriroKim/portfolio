"use client";

import { motion } from "motion/react";
import { SectionHeader } from "../section-header";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Props = {
  dict: Dictionary["about"];
};

const ease = [0.22, 1, 0.36, 1] as const;

export function AboutSection({ dict }: Props) {
  return (
    <section id="about" className="relative mx-auto w-full max-w-5xl px-6 py-24 md:py-32">
      <SectionHeader eyebrow={dict.eyebrow} title={dict.title} />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_auto] md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
          className="space-y-6"
        >
          {dict.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-base leading-[1.75] text-ink-muted sm:text-lg"
            >
              {p}
            </p>
          ))}
          <ul className="flex flex-wrap gap-2 pt-2">
            {dict.chips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-violet/25 bg-violet-soft px-3 py-1 font-mono text-[11px] text-violet-deep"
              >
                {chip}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Profile placeholder — Lanyard goes here in the next phase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="hidden h-[280px] w-[200px] shrink-0 self-start md:block"
        >
          <div className="relative h-full w-full overflow-hidden rounded-2xl border border-line bg-paper-soft">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-soft via-paper to-violet-soft opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                Profile
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
