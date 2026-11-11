import { Container } from "@/components/layout/container";
import { Footer, Header } from "@/components/portfolio/chrome";
import { Hero } from "@/components/portfolio/hero";
import s from "@/components/portfolio/portfolio.module.css";
import {
  ComponentTeaser,
  Contact,
  HomeReading,
  SelectedWork,
} from "@/components/portfolio/views";
import { getCopy } from "@/content/portfolio/copy";
import { pathFor, resolveLocale } from "@/lib/portfolio";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hero · roddcode",
  robots: { index: false, follow: false },
};
export default async function Preview({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ variant?: string; full?: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const query = await searchParams;
  const variant = query.variant === "b" ? "b" : "a";
  const full = query.full === "1";
  const suffix = full ? "&full=1" : "";
  const t = getCopy(locale);
  return (
    <div className={s.page}>
      <Header
        locale={locale}
        path={`/design-preview?variant=${variant}${suffix}`}
      />
      <div className={s.previewBar}>
        <Container className={s.previewRow}>
          <p>{t.previewNote}</p>
          <nav aria-label={t.preview}>
            {(["a", "b"] as const).map((value) => (
              <a
                key={value}
                aria-current={variant === value ? "page" : undefined}
                href={`${pathFor(locale, "/design-preview")}?variant=${value}${suffix}`}
              >
                {value === "a" ? t.optionA : t.optionB}
              </a>
            ))}
            <a
              href={`${pathFor(locale, "/design-preview")}?variant=${variant}${full ? "" : "&full=1"}`}
            >
              {locale === "es"
                ? full
                  ? "Solo hero"
                  : "Ver página completa"
                : full
                  ? "Hero only"
                  : "View full page"}
            </a>
          </nav>
        </Container>
      </div>
      <main id="main-content">
        <Hero locale={locale} variant={variant} />
        {full && (
          <>
            <SelectedWork locale={locale} />
            <ComponentTeaser locale={locale} />
            <HomeReading locale={locale} />
            <Contact locale={locale} />
          </>
        )}
      </main>
      <Footer locale={locale} />
    </div>
  );
}
