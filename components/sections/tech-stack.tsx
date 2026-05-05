"use client";

import { motion } from "motion/react";
import { SectionHeader } from "../section-header";
import { TechIcon } from "../tech-icon";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Props = {
  dict: Dictionary["techStack"];
};

const ease = [0.22, 1, 0.36, 1] as const;

export function TechStackSection({ dict }: Props) {
  return (
    <section
      id="tech-stack"
      className="relative mx-auto w-full max-w-6xl px-6 py-24 md:py-32"
    >
      <SectionHeader eyebrow={dict.eyebrow} title={dict.title} description={dict.subtitle} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease }}
        className="overflow-hidden rounded-2xl border border-line bg-paper"
      >
        <ul className="divide-y divide-line/60">
          {dict.groups.map((group) => (
            <li
              key={group.label}
              className="grid grid-cols-1 gap-2 px-5 py-4 transition-colors hover:bg-paper-warm/40 md:grid-cols-[160px_1fr] md:items-center md:gap-6 md:px-7 md:py-4"
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-violet" />
                <h3 className="text-sm font-bold tracking-tight text-ink/85 md:text-base">
                  {group.label}
                </h3>
              </div>

              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((tech) => (
                  <li
                    key={tech}
                    className="inline-flex items-center gap-1.5 rounded-md border border-line/80 bg-paper-warm/50 px-2 py-1 text-xs text-ink/90 transition-colors hover:border-violet/40 hover:bg-paper hover:text-ink"
                  >
                    <TechIcon name={tech} className="h-3.5 w-3.5 shrink-0" />
                    <span className="font-medium">{tech}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
