"use client";

import { motion } from "motion/react";
import { Mail, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "../section-header";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Props = {
  dict: Dictionary["contact"];
};

const ease = [0.22, 1, 0.36, 1] as const;

function GithubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-1.93c-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.35.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.9-.39s1.98.13 2.9.39c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function LinkedinMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

const iconForLabel = (label: string) => {
  const l = label.toLowerCase();
  if (l === "email") return Mail;
  if (l === "github") return GithubMark;
  if (l === "linkedin") return LinkedinMark;
  return Mail;
};

export function ContactSection({ dict }: Props) {
  return (
    <section
      id="contact"
      className="relative mx-auto w-full max-w-4xl px-6 py-24 md:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease }}
        className="relative overflow-hidden rounded-3xl border border-violet/30 bg-gradient-to-br from-violet-soft via-paper-warm to-paper p-8 sm:p-12"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-violet/20 blur-3xl"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(186,230,253,0.5), transparent)" }}
        />

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <SectionHeader
              eyebrow={dict.eyebrow}
              title={dict.title}
              description={dict.description}
              align="left"
            />
          </div>

          <ul className="flex flex-col gap-3 self-center">
            {dict.methods.map((m, idx) => {
              const Icon = iconForLabel(m.label);
              const isExternal = m.href.startsWith("http");
              return (
                <motion.li
                  key={m.label}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.1 + idx * 0.08, ease }}
                >
                  <a
                    href={m.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    className="group flex items-center gap-4 rounded-2xl border border-line bg-paper/85 px-5 py-4 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-violet/50 hover:bg-paper hover:shadow-[0_18px_40px_-16px_rgba(124,58,237,0.35)]"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-soft text-violet-deep transition-colors group-hover:bg-violet group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
                        {m.label}
                      </p>
                      <p className="mt-0.5 truncate text-sm font-semibold text-ink">
                        {m.value}
                      </p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-ink-soft transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-deep" />
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
