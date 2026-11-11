import s from "@/components/home/home.module.css";
import { Container } from "@/components/layout/container";
import { type Locale, getPortfolio } from "@/content/portfolio";
import { getCopy } from "@/content/portfolio/copy";
import { CV, pathFor } from "@/lib/paths";
import ui from "./portfolio.module.css";

export function Hero({ locale }: { locale: Locale }) {
  const { identity } = getPortfolio(locale);
  const t = getCopy(locale);
  return (
    <section className={s.heroSection}>
      <Container className={s.heroInner}>
        <p className={s.bylineName}>{identity.name}</p>
        <p className={s.bylineRole}>{identity.role}</p>
        <h1 className={s.title}>{identity.headline}</h1>
        <p className={s.sub}>{identity.intro}</p>
        <div className={s.ctas}>
          <a className={ui.primary} href={pathFor(locale, "/work")}>
            {t.viewWork}
          </a>
          <a
            className={ui.secondary}
            href={CV}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.cv}
          </a>
        </div>
        <p className={ui.location}>
          TypeScript · C#/.NET · PostgreSQL ·{" "}
          {locale === "es" ? "IA aplicada" : "Applied AI"}
        </p>
        <p className={ui.location}>{identity.location} · UTC-5</p>
      </Container>
    </section>
  );
}
