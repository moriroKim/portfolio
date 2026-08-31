"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Smartphone, Server, Map, Rocket } from "lucide-react";
import { SectionHeader } from "../section-header";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary["stats"];
};

const ease = [0.22, 1, 0.36, 1] as const;
const ICONS = [Smartphone, Server, Map, Rocket] as const;

export function StatsSection({ locale, dict }: Props) {
  return (
    <section
      id="stats"
      className="relative mx-auto w-full max-w-3xl px-6 py-24 md:py-28"
    >
      <SectionHeader
        eyebrow={dict.eyebrow}
        title={dict.title}
        description={dict.subtitle}
      />

      <ol className="mt-4">
        {dict.items.map((layer, idx) => {
          const Icon = ICONS[idx % ICONS.length];
          const isLast = idx === dict.items.length - 1;

          const card = (
            <div className="layer-card relative overflow-hidden rounded-2xl border border-line bg-paper p-5 transition-colors duration-300 group-hover:border-violet/50 sm:p-6">
              <div className="flex items-start gap-4">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-soft text-violet-deep">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h3 className="font-display text-lg font-bold tracking-tight text-ink">
                      {layer.layer}
                    </h3>
                    <p className="font-mono text-[11px] text-ink-soft">
                      {layer.stack}
                    </p>
                  </div>

                  <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-muted">
                    {layer.detail}
                  </p>

                  {layer.metric && (
                    <p className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-violet-faint px-2.5 py-1 font-mono text-[12px] font-bold text-violet-dark">
                      <span
                        aria-hidden
                        className="inline-block h-1.5 w-1.5 rounded-full bg-violet"
                      />
                      {layer.metric}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );

          return (
            <motion.li
              key={layer.layer}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease }}
            >
              {layer.projectSlug ? (
                <Link
                  href={`/${locale}/projects/${layer.projectSlug}`}
                  className="group block"
                >
                  {card}
                </Link>
              ) : (
                <div className="group">{card}</div>
              )}

              {!isLast && (
                <div
                  className="flex items-center gap-2.5 py-2 pl-[38px]"
                  aria-hidden
                >
                  <span className="layer-flow relative h-9 w-px bg-line-strong" />
                  {layer.connector && (
                    <span className="font-mono text-[11px] text-ink-soft">
                      {layer.connector}
                    </span>
                  )}
                </div>
              )}
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
