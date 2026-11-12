import type { Locale } from "@/content/portfolio";
import type { ReactNode } from "react";
import { Footer, Header } from "./chrome";
import { PageReveal } from "./page-reveal";
import s from "./shell.module.css";

export function PortfolioShell({
  locale,
  path,
  children,
}: { locale: Locale; path: string; children: ReactNode }) {
  return (
    <div className={s.page}>
      <Header locale={locale} path={path} />
      <main id="main-content">{children}</main>
      <PageReveal routeKey={`${locale}:${path}`} />
      <Footer locale={locale} />
    </div>
  );
}
