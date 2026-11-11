import { getAbout } from "./about";
import { getIdentity } from "./identity";
import { getPackages } from "./packages";
import { getProjects } from "./projects";
import type { Locale, PortfolioContent } from "./types";

export function getPortfolio(locale: string): PortfolioContent {
  const language: Locale = locale === "en" ? "en" : "es";
  return {
    identity: getIdentity(language),
    projects: getProjects(language),
    packages: getPackages(language),
    about: getAbout(language),
  };
}

export type * from "./types";
