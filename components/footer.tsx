import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary["footer"];
};

export function Footer({ locale: _locale, dict }: Props) {
  void _locale;
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16 border-t border-line/70 bg-paper-warm/50 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-2 px-6 py-6 text-xs text-ink-soft sm:flex-row sm:items-center">
        <span>
          © {year} Jin-mo Kim · {dict.rights}
        </span>
        <span>Built with Next.js · Tailwind · ReactBits</span>
      </div>
    </footer>
  );
}
