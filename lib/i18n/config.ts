export const locales = ["ko", "ja", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ko";

export const localeNames: Record<Locale, string> = {
  ko: "한국어",
  ja: "日本語",
  en: "English",
};

export const localeShortNames: Record<Locale, string> = {
  ko: "KO",
  ja: "JA",
  en: "EN",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
