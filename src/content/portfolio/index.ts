import { getIdentity } from "./identity";
import type { Locale, PortfolioContent } from "./types";

// Replaced by the reviewed bilingual case dataset before delivery.
export function getPortfolio(locale: string): PortfolioContent {
  const language: Locale = locale === "en" ? "en" : "es";
  return {
    identity: getIdentity(language),
    projects: [],
    packages: [],
    about: {
      intro: "",
      paragraphs: [],
      education: "",
      method: [],
      timeline: [],
    },
  };
}

export type * from "./types";
