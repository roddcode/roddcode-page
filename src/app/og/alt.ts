/**
 * Texto alternativo de la tarjeta de enlace, por idioma.
 *
 * Vive fuera de `render.tsx` para que el layout pueda importarlo sin arrastrar
 * la lectura de fuentes ni el motor de imagen al árbol del servidor.
 */
export const OG_ALT = {
  es: "Alejandro Alvarado · Backend & AI Engineer. Agentes de IA, APIs e integraciones.",
  en: "Alejandro Alvarado · Backend & AI Engineer. AI agents, APIs and integrations.",
} as const;

export type OgLang = keyof typeof OG_ALT;
