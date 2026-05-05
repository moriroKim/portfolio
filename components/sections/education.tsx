"use client";

import { motion } from "motion/react";
import { GraduationCap, Calendar } from "lucide-react";
import { SectionHeader } from "../section-header";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Props = {
  dict: Dictionary["education"];
};

const ease = [0.22, 1, 0.36, 1] as const;

export function EducationSection({ dict }: Props) {
  return (
    <section
      id="education"
      className="relative mx-auto w-full max-w-4xl px-6 py-24 md:py-32"
    >
      <SectionHeader eyebrow={dict.eyebrow} title={dict.title} description={dict.subtitle} />

      <div className="relative">
        <span aria-hidden className="timeline-line" />

        <ol className="space-y-10 pl-12 md:pl-20">
          {dict.items.map((item, idx) => (
            <motion.li
              key={item.institution + item.period}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease }}
              className="relative"
            >
              <span
                aria-hidden
                className="timeline-dot absolute -left-10 top-1.5 h-4 w-4 rounded-full bg-violet-light md:-left-16"
              />

              {/* Period badge — extends from the spine via a connector line */}
              <div className="relative mb-3 flex items-center">
                <span
                  aria-hidden
                  className="absolute right-full top-1/2 h-px w-6 -translate-y-1/2 bg-line-strong md:w-12"
                />
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-paper-soft px-3 py-1 font-mono text-[11px] font-bold tracking-wide text-ink-muted">
                  <Calendar className="h-3 w-3" />
                  {item.period}
                </span>
              </div>

              <article className="group relative overflow-hidden rounded-2xl border border-line bg-paper transition-colors duration-300 hover:border-violet/45">
                <div className="p-6 md:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h4 className="text-lg font-bold text-ink transition-colors group-hover:text-violet-deep sm:text-xl">
                      {item.institution}
                    </h4>
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-violet/40 bg-violet/10 px-3 py-1 text-sm font-bold tracking-wide text-violet-deep">
                      <GraduationCap className="h-4 w-4" />
                      <span>{item.major}</span>
                    </span>
                  </div>
                  {item.note && (
                    <p className="mt-3 text-[14px] leading-[1.75] text-ink-muted">
                      {item.note}
                    </p>
                  )}
                </div>
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
