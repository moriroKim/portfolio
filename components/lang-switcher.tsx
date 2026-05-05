import Link from "next/link";
import { locales, localeShortNames, type Locale } from "@/lib/i18n/config";

type Props = {
  currentLocale: Locale;
  /** When true, render larger pills suited for mobile sheet usage */
  size?: "sm" | "md";
};

export function LangSwitcher({ currentLocale, size = "sm" }: Props) {
  // Compact desktop pills, larger mobile pills (finger touch only on md)
  const sizing =
    size === "md"
      ? "h-10 px-3 text-sm min-w-[44px]"
      : "h-7 px-2 text-[11px]";

  return (
    <div className="inline-flex items-center gap-px">
      {locales.map((locale) => {
        const isActive = currentLocale === locale;
        return (
          <Link
            key={locale}
            href={`/${locale}`}
            aria-current={isActive ? "page" : undefined}
            className={`inline-flex items-center justify-center rounded-full font-mono font-semibold tracking-tight transition-colors ${sizing} ${
              isActive
                ? "bg-ink text-paper"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            {localeShortNames[locale]}
          </Link>
        );
      })}
    </div>
  );
}
