import { SITE } from "@/lib/constants";
import type { Locale } from "./types";

export function getIdentity(locale: Locale) {
  return {
    name: SITE.author,
    role: "Backend & AI Systems Engineer",
    headline:
      locale === "es"
        ? "Tres sistemas donde un error podía costar dinero."
        : "Three systems where a mistake could cost money.",
    intro:
      locale === "es"
        ? "En VML (WPP) trabajé en METEOR CRM para la cuenta Movistar. También implementé la integración NDC de Air Europa dentro de un motor de vuelos y desarrollé SoffIA, un agente de reservas por WhatsApp para clínicas."
        : "At VML (WPP), I worked on METEOR CRM for the Movistar account. I also implemented the Air Europa NDC integration within a flight engine and built SoffIA, a WhatsApp booking agent for clinics.",
    location: locale === "es" ? "Lima, Perú" : "Lima, Peru",
  };
}
