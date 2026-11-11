import { SITE } from "@/lib/constants";
import type { Locale } from "./types";

export function getIdentity(locale: Locale) {
  return {
    name: SITE.author,
    role: "Backend & AI Engineer",
    intro:
      locale === "es"
        ? "Desarrollo agentes de IA, APIs e integraciones para procesos empresariales."
        : "I build AI agents, APIs and integrations for business operations.",
    location: locale === "es" ? "Lima, Perú" : "Lima, Peru",
  };
}
