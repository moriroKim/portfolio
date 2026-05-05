"use client";

import { motion } from "motion/react";
import { Briefcase, Calendar } from "lucide-react";
import { SectionHeader } from "../section-header";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Props = {
  dict: Dictionary["experience"];
};

const ease = [0.22, 1, 0.36, 1] as const;

export function ExperienceSection({ dict }: Props) {
  return (
    <section
      id="experience"
      className="relative mx-auto w-full max-w-5xl px-6 py-24 md:py-32"
    >
      <SectionHeader eyebrow={dict.eyebrow} title={dict.title} description={dict.subtitle} />

      <div className="relative">
        <span aria-hidden className="timeline-line" />

        <ol className="space-y-12 pl-12 md:pl-20">
          {dict.items.map((item, idx) => (
            <motion.li
              key={item.company + item.period}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease }}
              className="relative"
            >
              {/* Dot on spine — aligned with the period badge row */}
              <span
                aria-hidden
                className="timeline-dot absolute -left-10 top-1.5 h-4 w-4 rounded-full bg-violet md:-left-16"
              />

              {/* Period badge — anchored on spine, lives outside the card */}
              <div className="mb-3 flex items-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-violet/30 bg-violet-soft px-3 py-1 font-mono text-[11px] font-bold tracking-wide text-violet-deep">
                  <Calendar className="h-3 w-3" />
                  {item.period}
                </span>
              </div>

              {/* Card */}
              <article className="group relative overflow-hidden rounded-2xl border border-line bg-paper transition-all duration-500 hover:-translate-y-1 hover:border-violet/45 hover:shadow-[0_24px_60px_-24px_rgba(124,58,237,0.30)]">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-gradient-to-b from-violet to-violet-deep transition-transform duration-500 group-hover:scale-y-100"
                />
                <div className="p-6 md:p-8">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-violet/40 bg-violet/10 px-3 py-1 text-sm font-bold tracking-wide text-violet-deep">
                    <Briefcase className="h-4 w-4" />
                    <span>{item.role}</span>
                  </span>
                  <h4 className="mt-3 text-xl font-bold tracking-tight text-ink transition-colors group-hover:text-violet-deep sm:text-2xl">
                    {item.company}
                  </h4>
                  <p className="mt-3 text-[15px] leading-[1.75] text-ink-muted sm:text-base">
                    {item.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-line-strong bg-paper-warm px-2 py-1 text-[11px] text-ink-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
