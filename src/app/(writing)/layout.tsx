import { PageShell } from "@/components/page-shell";
import type { ReactNode } from "react";

/**
 * Los ensayos viven fuera de `(legacy)` desde el reskin: comparten el mismo
 * chrome de contenido que /privacidad y /seguridad, en papel y con Geist.
 */
export default function WritingLayout({ children }: { children: ReactNode }) {
  return <PageShell locale="en">{children}</PageShell>;
}
