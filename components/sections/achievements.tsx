"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Languages,
  BookCheck,
  Trophy,
  SquareArrowOutUpRight,
} from "lucide-react";
import { SectionHeader } from "../section-header";
import { MagicBento } from "../reactbits/MagicBento";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary["achievements"];
};

const ease = [0.22, 1, 0.36, 1] as const;

const iconFor = (kind: "cert" | "language" | "award") => {
  if (kind === "award") return Trophy;
  if (kind === "cert") return BookCheck;
  return Languages;
};

const iconStyleFor = (medal?: "gold" | "silver" | "bronze") => {
  if (medal === "gold") {
    return "bg-amber-100 text-amber-700 ring-1 ring-amber-300/50";
  }
  if (medal === "silver") {
    return "bg-zinc-200 text-zinc-600 ring-1 ring-zinc-300/60";
  }
  if (medal === "bronze") {
    return "bg-orange-100 text-orange-700 ring-1 ring-orange-300/50";
  }
  return "bg-violet-soft text-violet-deep";
};

export function AchievementsSection({ locale, dict }: Props) {
  return (
    <section
      id="achievements"
      className="relative mx-auto w-full max-w-4xl px-6 py-24 md:py-32"
    >
      <SectionHeader
        eyebrow={dict.eyebrow}
        title={dict.title}
        description={dict.subtitle}
      />

      <MagicBento>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {dict.items.map((item, idx) => {
            const Icon = iconFor(item.kind);
            return (
              <motion.li
                key={item.title + item.date}
                data-bento-card
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease }}
                className={`bento-card relative rounded-xl border border-line bg-paper p-5${
                  item.projectSlug ? " cursor-pointer" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`rounded-lg p-2 ${iconStyleFor(item.medal)}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">
                        {item.date}
                      </p>
                      {item.projectSlug && (
                        <SquareArrowOutUpRight
                          aria-hidden
                          className="h-4 w-4 text-ink-soft"
                        />
                      )}
                    </div>
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

                {item.projectSlug && (
                  <Link
                    href={`/${locale}/projects/${item.projectSlug}`}
                    aria-label={`${item.title} — ${dict.viewProjectLabel}`}
                    className="absolute inset-0 rounded-xl"
                  />
                )}
              </motion.li>
            );
          })}
        </ul>
      </MagicBento>
    </section>
  );
}
