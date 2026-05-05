import Link from "next/link";
import { Mail } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary["footer"];
};

function GithubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-1.93c-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.35.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.9-.39s1.98.13 2.9.39c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

export function Footer({ locale: _locale, dict }: Props) {
  void _locale;
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-line/70 bg-paper-warm/50 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:gap-16">
          {/* Tagline */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-deep">
              Jin-mo Kim · 2026
            </p>
            <p className="max-w-md text-sm leading-relaxed text-ink-muted">
              {dict.rights}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3 md:items-end">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-deep">
              {dict.contact}
            </p>
            <a
              href={`mailto:${dict.email}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-violet-deep"
            >
              <Mail className="h-4 w-4" />
              {dict.email}
            </a>
            <a
              href={`https://${dict.github}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-violet-deep"
            >
              <GithubMark className="h-4 w-4" />
              {dict.github}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-line/60 pt-6 text-xs text-ink-soft sm:flex-row sm:items-center">
          <span>© {year} Jin-mo Kim</span>
          <span>Built with Next.js · Tailwind · ReactBits</span>
        </div>
      </div>
    </footer>
  );
}
