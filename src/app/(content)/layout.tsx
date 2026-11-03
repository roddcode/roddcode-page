import { PageShell } from "@/components/page-shell";
import type { ReactNode } from "react";

export default function ContentLayout({ children }: { children: ReactNode }) {
  return <PageShell>{children}</PageShell>;
}
