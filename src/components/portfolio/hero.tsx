import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { type Locale, getPortfolio } from "@/content/portfolio";
import { getCopy } from "@/content/portfolio/copy";
import { CV, pathFor } from "@/lib/paths";
import Image from "next/image";
import s from "./hero.module.css";
import { ThemeContour } from "./theme-contour";

export function Hero({ locale }: { locale: Locale }) {
  const { identity } = getPortfolio(locale);
  const t = getCopy(locale);
  return (
    <section className={s.heroSection}>
      <ThemeContour className={s.contour} />
      <Container className={s.heroInner} data-reveal>
        <div className={s.byline}>
          <Image
            alt=""
            className={s.avatar}
            height={48}
            src="/alejandro.webp"
            unoptimized
            width={48}
          />
          <div className={s.bylineText}>
            <p className={s.bylineName}>{identity.name}</p>
            <p className={s.bylineRole}>{identity.role}</p>
          </div>
        </div>
        <h1 className={s.title}>{identity.headline}</h1>
        <p className={s.sub}>{identity.intro}</p>
        <div className={s.ctas}>
          <Button asChild>
            <a href={pathFor(locale, "/work")}>{t.viewWork}</a>
          </Button>
          <Button asChild variant="outline">
            <ExternalLink locale={locale} href={CV} data-umami-event="cv_click">
              {t.cv}
            </ExternalLink>
          </Button>
        </div>
        <p className={s.location}>
          TypeScript · C#/.NET · PostgreSQL ·{" "}
          {locale === "es" ? "IA aplicada" : "Applied AI"}
        </p>
        <p className={s.location}>{identity.location} · UTC-5</p>
      </Container>
    </section>
  );
}
