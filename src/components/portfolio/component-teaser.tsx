import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { type Locale, getPortfolio } from "@/content/portfolio";
import { getCopy } from "@/content/portfolio/copy";
import { ArrowUpRight } from "lucide-react";
import { Suspense } from "react";
import s from "./component-teaser.module.css";
import { PackageVersion, PackageVersionPlaceholder } from "./package-version";

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
                <Suspense fallback={<PackageVersionPlaceholder />}>
                  <PackageVersion name={pkg.name} locale={locale} />
                </Suspense>
              </div>
              <p>{pkg.summary}</p>
              <div className={s.actions}>
                <Button asChild variant="link" size="link">
                  <ExternalLink locale={locale} href={pkg.repo}>
                    {t.viewCode}
                    <ArrowUpRight
                      size={17}
                      aria-hidden="true"
                      className="group-hover/button:translate-x-[2px] group-hover/button:-translate-y-[2px] group-focus-visible/button:translate-x-[2px] group-focus-visible/button:-translate-y-[2px]"
                    />
                  </ExternalLink>
                </Button>
                <Button asChild variant="link" size="link">
                  <ExternalLink
                    locale={locale}
                    href={pkg.npm}
                    aria-label={`${pkg.name} on npm`}
                  >
                    npm
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </ExternalLink>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
