"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, ChevronDown } from "lucide-react";
import { SiGithub, SiYoutube } from "react-icons/si";
import { SectionHeader } from "../section-header";
import { ProjectThumbnail } from "../project-thumbnail";
import { MagicBento } from "../reactbits/MagicBento";
import type { Locale } from "@/lib/i18n/config";
import type { ProjectItem } from "@/lib/i18n/dictionary.types";

type Props = {
  locale: Locale;
  header: { eyebrow: string; title: string; description: string };
  items: readonly ProjectItem[];
  showMoreLabel: string;
  showLessLabel: string;
  sectionId?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;
const VISIBLE_LIMIT = 3;

export function ProjectsSection({
  locale,
  header,
  items,
  showMoreLabel,
  showLessLabel,
  sectionId,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const sorted = useMemo(() => {
    return [...items].sort((a, b) => {
      const aRank = a.featured ? 0 : a.award ? 1 : 2;
      const bRank = b.featured ? 0 : b.award ? 1 : 2;
      return aRank - bRank;
    });
  }, [items]);

  const visible = expanded ? sorted : sorted.slice(0, VISIBLE_LIMIT);
  const hiddenCount = Math.max(0, sorted.length - VISIBLE_LIMIT);

  if (sorted.length === 0) return null;

  return (
    <section
      id={sectionId ?? "projects"}
      className="relative mx-auto w-full max-w-5xl px-6 py-24 md:py-28"
    >
      <SectionHeader
        eyebrow={header.eyebrow}
        title={header.title}
        description={header.description}
      />

      <MagicBento>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <AnimatePresence initial={false}>
            {visible.map((item, idx) => (
              <motion.li
                key={item.slug}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, delay: idx * 0.04, ease }}
                className="relative"
              >
                <Link
                  href={`/${locale}/projects/${item.slug}`}
                  data-bento-card
                  className="bento-card group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper transition-colors duration-300 hover:border-violet/50"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <ProjectThumbnail
                      slug={item.slug}
                      className="h-full w-full"
                    />

                    {(item.award || item.status) && (
                      <div className="absolute left-3 top-3 flex max-w-[calc(100%-1.5rem)] flex-col items-start gap-1.5">
                        {item.award && (
                          <span
                            className={`award-shimmer inline-flex max-w-full items-center gap-1 truncate rounded-md px-2.5 py-1 text-[10px] font-bold tracking-wide ring-1 ${
                              item.awardTier === "gold"
                                ? "bg-amber-400 text-amber-950 ring-amber-500/40"
                                : "bg-zinc-300 text-zinc-900 ring-zinc-400/50"
                            }`}
                          >
                            <Trophy className="relative z-[1] h-2.5 w-2.5 shrink-0" />
                            <span className="relative z-[1] truncate">
                              {item.award}
                            </span>
                          </span>
                        )}
                        {item.status && (
                          <span className="inline-flex max-w-full items-center gap-1.5 truncate rounded-full bg-paper/90 px-2.5 py-1 text-[10px] font-bold tracking-wide text-emerald-700 ring-1 ring-emerald-500/35 backdrop-blur">
                            <span
                              aria-hidden
                              className="live-dot inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-500"
                            />
                            {item.status}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div>
                      <h3 className="text-lg font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-violet-deep sm:text-xl">
                        {item.title}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <p className="text-[12px] font-medium text-ink-soft">
                          {item.company}
                        </p>
                        <span className="inline-flex items-center rounded-full border border-violet/30 bg-violet-soft/70 px-2 py-0.5 text-[10.5px] font-semibold tracking-wide text-violet-deep">
                          {item.role}
                        </span>
                      </div>
                    </div>

                    <p className="text-[13px] leading-[1.6] text-ink-muted">
                      {item.summary}
                    </p>

                    <div className="mt-auto border-t border-line/70 pt-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-line/80 bg-paper-warm/70 px-2 py-0.5 text-[11px] font-medium text-ink-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>

                {(item.github || item.youtube) && (
                  <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5">
                    {item.github && (
                      <a
                        href={item.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub repository"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-paper/90 text-ink-muted shadow-[0_4px_14px_-4px_rgba(0,0,0,0.2)] ring-1 ring-line/70 backdrop-blur transition-colors hover:bg-ink hover:text-paper"
                      >
                        <SiGithub className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {item.youtube && (
                      <a
                        href={item.youtube}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="YouTube video"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-paper/90 text-ink-muted shadow-[0_4px_14px_-4px_rgba(0,0,0,0.2)] ring-1 ring-line/70 backdrop-blur transition-colors hover:bg-red-600 hover:text-white"
                      >
                        <SiYoutube className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </MagicBento>

      {/* Show more / less */}
      {hiddenCount > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 text-sm font-semibold text-ink-muted transition-all hover:border-violet/50 hover:text-violet-deep hover:shadow-[0_8px_24px_-12px_rgba(124,58,237,0.35)]"
          >
            <span>
              {expanded ? showLessLabel : `${showMoreLabel} (+${hiddenCount})`}
            </span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
              strokeWidth={2.2}
            />
          </button>
        </div>
      )}
    </section>
  );
}
