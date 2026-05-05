import { ko } from "./dictionaries/ko";
import { ja } from "./dictionaries/ja";
import { en } from "./dictionaries/en";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionary.types";

const dictionaries: Record<Locale, Dictionary> = { ko, ja, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
