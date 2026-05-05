"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Star } from "lucide-react";
import { SectionHeader } from "../section-header";
import { ProjectThumbnail } from "../project-thumbnail";
import type { Locale } from "@/lib/i18n/config";
import type { ProjectItem } from "@/lib/i18n/dictionary.types";

type Props = {
  locale: Locale;
  /** Dictionary header for THIS section (work or team) */
  header: { eyebrow: string; title: string; description: string };
  /** Already-filtered items for THIS section */
  items: readonly ProjectItem[];
  viewCaseStudyLabel: string;
  /** DOM id for anchor links */
  sectionId?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function ProjectsSection({
  locale,
  header,
  items,
  viewCaseStudyLabel,
  sectionId,
}: Props) {
  // Sort: featured first → badged next → rest
  const sorted = useMemo(() => {
    return [...items].sort((a, b) => {
      const aRank = a.featured ? 0 : a.badge ? 1 : 2;
      const bRank = b.featured ? 0 : b.badge ? 1 : 2;
      return aRank - bRank;
    });
  }, [items]);

  if (sorted.length === 0) return null;

  return (
    <section
      id={sectionId ?? "projects"}
      className="relative mx-auto w-full max-w-6xl px-6 py-24 md:py-28"
    >
      <SectionHeader
        eyebrow={header.eyebrow}
        title={header.title}
        description={header.description}
      />

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((item, idx) => (
          <motion.li
            key={item.slug}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: idx * 0.05, ease }}
          >
            <Link
              href={`/${locale}/projects/${item.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper transition-all duration-500 hover:-translate-y-1 hover:border-violet/45 hover:shadow-[0_24px_60px_-24px_rgba(124,58,237,0.30)]"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <ProjectThumbnail
                  slug={item.slug}
                  className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                />

                {item.featured && (
                  <div className="absolute left-3 top-3">
                    <span className="inline-flex items-center gap-1 rounded-md bg-paper/95 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-deep shadow-md backdrop-blur">
                      <Star className="h-2.5 w-2.5 fill-current" />
                      Featured
                    </span>
                  </div>
                )}

                {item.badge && (
                  <div className="absolute right-3 top-3 max-w-[60%]">
                    <span className="inline-block rounded-md bg-violet-deep px-2 py-1 text-[10px] font-semibold tracking-wide text-white shadow-md">
                      {item.badge}
                    </span>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent p-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-white/95">
                    {item.role}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-deep">
                  {item.company}
                </p>

                <h3 className="mt-2 text-lg font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-violet-deep sm:text-xl">
                  {item.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-[14px] leading-[1.65] text-ink-muted">
                  {item.summary}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-1.5">
                  {item.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-paper-warm/80 px-2 py-1 text-[11px] font-medium text-ink-muted"
                    >
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 4 && (
                    <span className="text-[11px] text-ink-soft">
                      +{item.tags.length - 4}
                    </span>
                  )}
                </div>

                <div className="mt-5 flex items-center justify-end border-t border-line/60 pt-3">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-ink-soft transition-colors group-hover:text-violet-deep">
                    {viewCaseStudyLabel}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
