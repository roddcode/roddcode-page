import { Container } from "@/components/layout/container";
import { type Locale, getPortfolio } from "@/content/portfolio";
import { getCopy } from "@/content/portfolio/copy";
import { CV, pathFor } from "@/lib/portfolio";
import s from "./portfolio.module.css";
import { Portrait } from "./portrait";

export function Hero({
  locale,
  variant = "a",
}: { locale: Locale; variant?: "a" | "b" }) {
  const { identity } = getPortfolio(locale);
  const t = getCopy(locale);
  return (
    <section className={s.hero} data-variant={variant}>
      <Container className={s.heroGrid}>
        <div className={s.heroText}>
          <p className={s.personName}>{identity.name}</p>
          <h1 className={s.heroTitle}>{identity.role}</h1>
          <p className={s.heroIntro}>{identity.intro}</p>
          <div className={s.actions}>
            <a className={s.primary} href={pathFor(locale, "/work")}>
              {t.viewWork}
            </a>
            <a
              className={s.secondary}
              href={CV}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.cv}
            </a>
          </div>
          <p className={s.location}>
            {identity.location} <span aria-hidden="true">/</span> UTC-5
          </p>
        </div>
        <Portrait locale={locale} />
      </Container>
    </section>
  );
}
