import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { type Locale, getPortfolio } from "@/content/portfolio";
import { getCopy } from "@/content/portfolio/copy";
import { SITE } from "@/lib/constants";
import { CV } from "@/lib/paths";
import { ArrowUpRight } from "lucide-react";
import s from "./about-page.module.css";
import { Contact } from "./contact";
import { SocialIcon } from "./social-icon";

export function AboutPage({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const { about, identity } = getPortfolio(locale);
  return (
    <>
      <section className={s.section}>
        <Container>
          <div className={s.aboutHeading} data-reveal>
            <div>
              <p className={s.category}>{identity.name}</p>
              <h1>{t.aboutIntro}</h1>
            </div>
            <p>{about.intro}</p>
          </div>
          <div className={s.aboutLayout}>
            <div className={s.aboutPerson} data-reveal>
              {about.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
            <aside className={s.education} data-reveal>
              <h2>{t.education}</h2>
              <p>{about.education}</p>
              <div className={s.actions}>
                <Button asChild>
                  <ExternalLink locale={locale} href={CV}>
                    {t.cv}
                  </ExternalLink>
                </Button>
                <Button asChild variant="link" size="link">
                  <ExternalLink locale={locale} showIcon href={SITE.linkedin}>
                    <SocialIcon name="linkedin" />
                    LinkedIn
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="group-hover/button:translate-x-[2px] group-hover/button:-translate-y-[2px] group-focus-visible/button:translate-x-[2px] group-focus-visible/button:-translate-y-[2px]"
                    />
                  </ExternalLink>
                </Button>
              </div>
            </aside>
          </div>
          <section
            className={s.timeline}
            id="experience"
            aria-labelledby="experience-title"
          >
            <div className={s.sectionHeading} data-reveal>
              <h2 id="experience-title">{t.trajectory}</h2>
              <p>
                {about.timeline.length}{" "}
                {locale === "es" ? "experiencias" : "experiences"}
              </p>
            </div>
            <ol>
              {about.timeline.map((item) => (
                <li key={`${item.period}-${item.organization}`}>
                  <article>
                    <p className={s.category}>{item.period}</p>
                    <div className={s.position}>
                      <h3>{item.role}</h3>
                      <p className={s.organization}>{item.organization}</p>
                    </div>
                    <div className={s.contribution}>
                      <p>{item.detail}</p>
                      <ul
                        className={s.stack}
                        aria-label={
                          locale === "es" ? "Tecnologías" : "Technologies"
                        }
                      >
                        {item.stack.map((tech) => (
                          <li key={tech}>{tech}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </section>
          <section className={s.method}>
            <div className={s.sectionHeading} data-reveal>
              <h2>{t.method}</h2>
              <Button asChild variant="link" size="link">
                <a href="/writing/db-fat-llm-light">
                  DB-Fat, LLM-Light
                  <ArrowUpRight
                    size={16}
                    aria-hidden="true"
                    className="group-hover/button:translate-x-[2px] group-hover/button:-translate-y-[2px] group-focus-visible/button:translate-x-[2px] group-focus-visible/button:-translate-y-[2px]"
                  />
                </a>
              </Button>
            </div>
            <div className={s.methodGrid}>
              {about.method.map((text) => (
                <p key={text} data-reveal>
                  {text}
                </p>
              ))}
            </div>
          </section>
        </Container>
      </section>
      <Contact locale={locale} />
    </>
  );
}
