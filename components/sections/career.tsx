"use client";

import { motion } from "motion/react";
import {
  Briefcase,
  GraduationCap,
  Sparkles,
  Languages,
  BookCheck,
} from "lucide-react";
import { SectionHeader } from "../section-header";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Props = {
  career: Dictionary["career"];
  experience: Dictionary["experience"];
  education: Dictionary["education"];
  training: Dictionary["training"];
  achievements: Dictionary["achievements"];
};

const ease = [0.22, 1, 0.36, 1] as const;

function SubBlockHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="mb-8 flex items-baseline gap-3">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet-deep">
        {eyebrow}
      </span>
      <span aria-hidden className="h-px flex-1 bg-line" />
      <h3 className="text-base font-bold text-ink sm:text-lg">{title}</h3>
    </header>
  );
}

export function CareerSection({
  career,
  experience,
  education,
  training,
  achievements,
}: Props) {
  return (
    <section
      id="experience"
      className="relative mx-auto w-full max-w-5xl px-6 py-24 md:py-32"
    >
      <SectionHeader
        eyebrow={career.eyebrow}
        title={career.title}
        description={career.description}
      />

      <div className="space-y-16 md:space-y-20">
        {/* Experience block */}
        <div>
          <SubBlockHeader eyebrow={experience.eyebrow} title={experience.title} />
          <div className="relative">
            <span aria-hidden className="timeline-line" />
            <ol className="space-y-8 pl-12 md:pl-20">
              {experience.items.map((item, idx) => (
                <motion.li
                  key={item.company + item.period}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: idx * 0.08, ease }}
                  className="relative"
                >
                  <span
                    aria-hidden
                    className="timeline-dot absolute -left-10 top-7 h-4 w-4 rounded-full bg-violet md:-left-16"
                  />
                  <article className="group relative overflow-hidden rounded-2xl border border-line bg-paper transition-all duration-500 hover:-translate-y-1 hover:border-violet/45 hover:shadow-[0_24px_60px_-24px_rgba(124,58,237,0.30)]">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-gradient-to-b from-violet to-violet-deep transition-transform duration-500 group-hover:scale-y-100"
                    />
                    <div className="p-6 md:p-8">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-medium tracking-wide text-ink-muted">
                          {item.period}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-violet/40 bg-violet/10 px-3 py-1 text-sm font-bold tracking-wide text-violet-deep">
                          <Briefcase className="h-4 w-4" />
                          <span>{item.role}</span>
                        </span>
                      </div>
                      <h4 className="mt-3 text-xl font-bold tracking-tight text-ink transition-colors group-hover:text-violet-deep sm:text-2xl">
                        {item.company}
                      </h4>
                      {item.summary && (
                        <p className="mt-3 text-[15px] leading-[1.75] text-ink-muted sm:text-base">
                          {item.summary}
                        </p>
                      )}
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
        </div>

        {/* Education block */}
        <div>
          <SubBlockHeader eyebrow={education.eyebrow} title={education.title} />
          <div className="relative">
            <span aria-hidden className="timeline-line" />
            <ol className="space-y-6 pl-12 md:pl-20">
              {education.items.map((item, idx) => (
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
                    className="timeline-dot absolute -left-10 top-7 h-4 w-4 rounded-full bg-violet-light md:-left-16"
                  />
                  <article className="group relative overflow-hidden rounded-2xl border border-line bg-paper transition-all duration-500 hover:-translate-y-0.5 hover:border-violet/45 hover:shadow-[0_18px_45px_-18px_rgba(124,58,237,0.25)]">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-gradient-to-b from-violet-light to-violet transition-transform duration-500 group-hover:scale-y-100"
                    />
                    <div className="p-6 md:p-7">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-medium tracking-wide text-ink-muted">
                          {item.period}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-violet/40 bg-violet/10 px-3 py-1 text-sm font-bold tracking-wide text-violet-deep">
                          <GraduationCap className="h-4 w-4" />
                          <span>{item.major}</span>
                        </span>
                      </div>
                      <h4 className="mt-3 text-lg font-bold text-ink transition-colors group-hover:text-violet-deep sm:text-xl">
                        {item.institution}
                      </h4>
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
        </div>

        {/* Training block */}
        <div>
          <SubBlockHeader eyebrow={training.eyebrow} title={training.title} />
          <div className="relative">
            <span aria-hidden className="timeline-line" />
            <ol className="space-y-6 pl-12 md:pl-20">
              {training.items.map((item, idx) => (
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
                    className="timeline-dot absolute -left-10 top-7 h-4 w-4 rounded-full bg-violet md:-left-16"
                  />
                  <article className="group relative overflow-hidden rounded-2xl border border-line bg-paper transition-all duration-500 hover:-translate-y-0.5 hover:border-violet/45 hover:shadow-[0_18px_45px_-18px_rgba(124,58,237,0.25)]">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-gradient-to-b from-violet to-violet-deep transition-transform duration-500 group-hover:scale-y-100"
                    />
                    <div className="p-6 md:p-7">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-medium tracking-wide text-ink-muted">
                          {item.period}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-violet/40 bg-violet/10 px-3 py-1 text-sm font-bold tracking-wide text-violet-deep">
                          <Sparkles className="h-4 w-4" />
                          <span>{item.program}</span>
                        </span>
                      </div>
                      <h4 className="mt-3 text-lg font-bold text-ink transition-colors group-hover:text-violet-deep sm:text-xl">
                        {item.institution}
                      </h4>
                      {item.note && (
                        <p className="mt-3 text-[14px] leading-[1.75] text-ink-muted">
                          {item.note}
                        </p>
                      )}
                      {item.tags && item.tags.length > 0 && (
                        <ul className="mt-4 flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <li
                              key={tag}
                              className="rounded-md border border-line-strong bg-paper-warm px-2 py-1 text-[11px] text-ink-muted"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>

        {/* Achievements block — grid */}
        <div>
          <SubBlockHeader eyebrow={achievements.eyebrow} title={achievements.title} />
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {achievements.items.map((item, idx) => {
              const Icon = item.kind === "cert" ? BookCheck : Languages;
              return (
                <motion.li
                  key={item.title + item.date}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.06, ease }}
                  className="group rounded-xl border border-line bg-paper p-5 transition-all hover:-translate-y-0.5 hover:border-violet/45 hover:shadow-[0_12px_30px_-14px_rgba(124,58,237,0.25)]"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-violet-soft p-2 text-violet-deep">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-ink-soft">
                        {item.date}
                      </p>
                      <h4 className="mt-1 text-sm font-semibold text-ink">
                        {item.title}
                      </h4>
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
        </div>
      </div>
    </section>
  );
}
