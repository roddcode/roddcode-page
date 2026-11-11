/**
 * Texto alternativo de la tarjeta de enlace, por idioma.
 *
 * Vive fuera de `render.tsx` para que el layout pueda importarlo sin arrastrar
 * la lectura de fuentes ni el motor de imagen al árbol del servidor.
 */
import { getIdentity } from "@/content/portfolio/identity";

export const OG_ALT = {
  es: `${getIdentity("es").name} · ${getIdentity("es").role}. Agentes de IA, APIs e integraciones.`,
  en: `${getIdentity("en").name} · ${getIdentity("en").role}. AI agents, APIs and integrations.`,
} as const;

export type OgLang = keyof typeof OG_ALT;
