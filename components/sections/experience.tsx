"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Briefcase, Calendar, SquareArrowOutUpRight } from "lucide-react";
import { SectionHeader } from "../section-header";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary["experience"];
};

const ease = [0.22, 1, 0.36, 1] as const;

export function ExperienceSection({ locale, dict }: Props) {
  return (
    <section
      id="experience"
      className="relative mx-auto w-full max-w-4xl px-6 py-24 md:py-32"
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

              {/* Card */}
              <article className="group relative overflow-hidden rounded-2xl border border-line bg-paper transition-colors duration-300 hover:border-violet/45">
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h4 className="text-xl font-bold tracking-tight text-ink transition-colors group-hover:text-violet-deep sm:text-2xl">
                      {item.company}
                    </h4>
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-violet/40 bg-violet/10 px-3 py-1 text-sm font-bold tracking-wide text-violet-deep">
                      <Briefcase className="h-4 w-4" />
                      <span>{item.role}</span>
                    </span>
                  </div>

                  {item.summary && (
                    <p className="mt-3 text-[15px] leading-[1.75] text-ink-muted sm:text-base">
                      {item.summary}
                    </p>
                  )}

                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="mt-5 space-y-4">
                      {item.bullets.map((b) => (
                        <li
                          key={b.title}
                          className="flex gap-3 text-[14px] leading-[1.7] sm:text-[15px]"
                        >
                          <span
                            aria-hidden
                            className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet"
                          />
                          <div className="flex-1">
                            {b.detail ? (
                              <>
                                <div className="font-bold text-ink">{b.title}</div>
                                <div className="mt-1 text-ink-muted">
                                  {b.detail}
                                  {b.projectSlug && (
                                    <Link
                                      href={`/${locale}/projects/${b.projectSlug}`}
                                      aria-label={dict.viewProjectLabel}
                                      title={dict.viewProjectLabel}
                                      className="ml-1 inline-flex h-5 w-5 -translate-y-px items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-violet/10 hover:text-violet-deep"
                                    >
                                      <SquareArrowOutUpRight className="h-4 w-4" />
                                    </Link>
                                  )}
                                </div>
                              </>
                            ) : (
                              <div className="text-ink-muted">{b.title}</div>
                            )}
                          </div>
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
    </section>
  );
}
