import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { type Locale, getPortfolio } from "@/content/portfolio";
import { getCopy } from "@/content/portfolio/copy";
import { ArrowUpRight } from "lucide-react";
import s from "./component-teaser.module.css";

export function ComponentTeaser({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  return (
    <section id="open-source" className={s.section}>
      <Container>
        <div className={s.sectionHeading} data-reveal>
          <h2>{t.componentsTitle}</h2>
          <p>{t.componentsIntro}</p>
        </div>
        <div className={s.packageGrid}>
          {getPortfolio(locale).packages.map((pkg) => (
            <article key={pkg.name} id={pkg.name}>
              <div className={s.packageName}>
                <h3>{pkg.name}</h3>
                <span>v{pkg.version}</span>
              </div>
              <p>{pkg.summary}</p>
              <Button asChild variant="link" size="link">
                <a href={pkg.repo}>
                  {t.viewCode}
                  <ArrowUpRight
                    size={17}
                    aria-hidden="true"
                    className="group-hover/button:translate-x-[2px] group-hover/button:-translate-y-[2px] group-focus-visible/button:translate-x-[2px] group-focus-visible/button:-translate-y-[2px]"
                  />
                </a>
              </Button>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
