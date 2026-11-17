import type { Locale } from "@/content/portfolio/types";
import { getLocale } from "next-intl/server";

/** Idioma de interfaz ya resuelto por `i18n/request.ts` para esta petición. */
export async function getInterfaceLocale(): Promise<Locale> {
  return (await getLocale()) === "en" ? "en" : "es";
}
