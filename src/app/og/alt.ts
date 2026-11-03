/**
 * Texto alternativo de la tarjeta de enlace, por idioma.
 *
 * Vive fuera de `render.tsx` para que el layout pueda importarlo sin arrastrar
 * la lectura de fuentes ni el motor de imagen al árbol del servidor.
 */
export const OG_ALT = {
  es: "roddcode — El modelo propone. La base de datos decide.",
  en: "roddcode — The model proposes. The database decides.",
} as const;

export type OgLang = keyof typeof OG_ALT;
