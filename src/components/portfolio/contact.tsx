import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import type { Locale } from "@/content/portfolio";
import { getCopy } from "@/content/portfolio/copy";
import { SITE } from "@/lib/constants";
import { CV } from "@/lib/paths";
import { ArrowUpRight } from "lucide-react";
import s from "./contact.module.css";
import { ThemeContour } from "./theme-contour";

export function Contact({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  return (
    <section id="contact" className={s.contact}>
      <ThemeContour className={s.contour} interactive />
      <Container className={s.contactGrid} data-reveal>
        <h2>{t.contactTitle}</h2>
        <div>
          <p>{t.contactBody}</p>
          <div className={s.actions}>
            <Button asChild className="gap-4">
              <a href={`mailto:${SITE.email}`}>
                {t.email}
                <ArrowUpRight
                  size={17}
                  aria-hidden="true"
                  className="group-hover/button:translate-x-[2px] group-hover/button:-translate-y-[2px] group-focus-visible/button:translate-x-[2px] group-focus-visible/button:-translate-y-[2px]"
                />
              </a>
            </Button>
            <Button asChild variant="outline">
              <ExternalLink locale={locale} href={CV}>
                {t.cv}
              </ExternalLink>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
