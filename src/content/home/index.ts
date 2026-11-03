import { en } from "./en";
import { es } from "./es";
import type { HomeContent } from "./types";

export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";

const CONTENT: Record<Locale, HomeContent> = { es, en };

export function getContent(locale: string): HomeContent {
  return CONTENT[
    (LOCALES as readonly string[]).includes(locale)
      ? (locale as Locale)
      : DEFAULT_LOCALE
  ];
}

export type {
  HomeContent,
  CaseContent,
  SystemContent,
  NdcContent,
} from "./types";
