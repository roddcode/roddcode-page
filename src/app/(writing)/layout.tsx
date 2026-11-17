import { PageShell } from "@/components/page-shell";
import { getInterfaceLocale } from "@/i18n/server";
import type { ReactNode } from "react";

/**
 * Los ensayos viven fuera de `[locale]`: su URL es neutral y el artículo se
 * mantiene en inglés. La interfaz, en cambio, sigue el idioma de la solicitud.
 */
export default async function WritingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getInterfaceLocale();
  return (
    <PageShell locale={locale} path="/writing" wide>
      {children}
    </PageShell>
  );
}
