"use client";

import Link from "next/link";
import { FileText, Mail } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary["nav"];
  email: string;
};

/**
 * Sticky bottom action bar — full-width.
 * Uses CSS `position: sticky` so it pins to the viewport bottom while
 * scrolling content, then releases naturally when the footer comes
 * into flow (the bar parks just above the footer).
 *
 * Requires the bar to live as a sibling of <main> and <footer> inside
 * the same parent in the layout.
 */
export function BottomActionBar({ locale, dict, email }: Props) {
  return (
    <div className="sticky bottom-0 z-30 border-t border-line/70 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-end gap-2 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}/resume`}
          aria-label={dict.resume}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-sm font-semibold text-ink shadow-[0_4px_18px_-8px_rgba(76,29,149,0.18)] transition-all hover:-translate-y-0.5 hover:border-violet/45 hover:text-violet-deep"
        >
          <FileText className="h-4 w-4" strokeWidth={2.2} />
          <span>{dict.resume}</span>
        </Link>
        <a
          href={`mailto:${email}`}
          aria-label={`${dict.email} — ${email}`}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper shadow-[0_8px_22px_-8px_rgba(124,58,237,0.45)] transition-all hover:-translate-y-0.5 hover:bg-violet-deep"
        >
          <Mail className="h-4 w-4" strokeWidth={2.2} />
          <span>{dict.email}</span>
        </a>
      </div>
    </div>
  );
}
