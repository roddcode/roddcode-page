import { Container } from "@/components/layout/container";
import { type Locale, getPortfolio } from "@/content/portfolio";
import { getCopy } from "@/content/portfolio/copy";
import { pathFor } from "@/lib/paths";
import { ArrowRight } from "lucide-react";
import { ProjectArt } from "./project-art";
import s from "./work-index.module.css";

export function WorkIndex({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  return (
    <section className={s.section}>
      <Container>
        <div className={s.heading} data-reveal>
          <h1>{t.work}</h1>
          <p>{t.workIntro}</p>
        </div>
        <div className={s.rows}>
          {getPortfolio(locale).projects.map((project) => {
            const titleId = `work-${project.slug}-title`;
            return (
              <a
                key={project.slug}
                className={s.row}
                href={pathFor(locale, `/work/${project.slug}`)}
                aria-labelledby={titleId}
                data-reveal=""
                data-umami-event="case_open"
                data-umami-event-project={project.slug}
              >
                <div className={s.art}>
                  <ProjectArt slug={project.slug} locale={locale} />
                </div>
                <div className={s.body}>
                  <div className={s.meta}>
                    <span>{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.period}</span>
                  </div>
                  <h2 id={titleId}>{project.title}</h2>
                  <p className={s.summary}>{project.summary}</p>
                  <ul className={s.stack}>
                    {project.stack.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                  <span className={s.more} aria-hidden="true">
                    {t.viewCase}
                    <ArrowRight size={17} />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
