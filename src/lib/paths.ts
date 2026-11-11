import type { Locale } from "@/content/portfolio/types";

export const CV = "/cv-alejandro-alvarado-roddcode.pdf";
export function pathFor(locale: Locale, path = "/") {
  return `${locale === "en" ? "/en" : ""}${path === "/" ? "" : path}` || "/";
}
