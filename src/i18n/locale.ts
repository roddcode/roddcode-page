import type { Locale } from "@/content/portfolio/types";

/** Devuelve el locale solo si es uno de los que publica el sitio. */
export function matchLocale(
  value: string | null | undefined,
): Locale | undefined {
  return value === "es" || value === "en" ? value : undefined;
}

/**
 * Elige el idioma declarado con mayor peso en `Accept-Language`.
 * Es el último recurso para rutas que no pasan por el middleware.
 */
export function matchAcceptLanguage(header: string | null): Locale | undefined {
  if (!header) return undefined;
  const preferences = header
    .split(",")
    .map((entry) => {
      const [tag = "", ...params] = entry.trim().split(";");
      const quality = params.find((param) => param.trim().startsWith("q="));
      const weight = quality ? Number.parseFloat(quality.trim().slice(2)) : 1;
      return {
        language: tag.trim().toLowerCase().split("-")[0],
        weight: Number.isFinite(weight) ? weight : 0,
      };
    })
    .filter((entry) => entry.weight > 0)
    .sort((a, b) => b.weight - a.weight);

  for (const preference of preferences) {
    const locale = matchLocale(preference.language);
    if (locale) return locale;
  }
  return undefined;
}
