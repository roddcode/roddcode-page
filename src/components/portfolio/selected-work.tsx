import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { type Locale, type Project, getPortfolio } from "@/content/portfolio";
import { getCopy } from "@/content/portfolio/copy";
import { pathFor } from "@/lib/paths";
import { ArrowRight } from "lucide-react";
import { ProjectArt } from "./project-art";
import { ProjectHighlights } from "./project-highlights";
import s from "./selected-work.module.css";

function ProjectRow({ locale, project }: { locale: Locale; project: Project }) {
  const t = getCopy(locale);
  return (
    <article className={s.projectRow}>
      <a
        className={s.projectVisualLink}
        href={pathFor(locale, `/work/${project.slug}`)}
        tabIndex={-1}
        aria-label={`${t.viewCase}: ${project.title}`}
        data-umami-event="case_open"
        data-umami-event-project={project.slug}
      >
        <ProjectArt slug={project.slug} locale={locale} />
      </a>
      <div className={s.projectText}>
        <p className={s.category}>
          {project.category} <span>{project.period}</span>
        </p>
        <h3>
          <a
            href={pathFor(locale, `/work/${project.slug}`)}
            data-umami-event="case_open"
            data-umami-event-project={project.slug}
          >
            {project.title}
          </a>
        </h3>
        <p>{project.summary}</p>
        <ProjectHighlights project={project} />
        <Button asChild variant="link" size="link">
          <a
            href={pathFor(locale, `/work/${project.slug}`)}
            data-umami-event="case_open"
            data-umami-event-project={project.slug}
          >
            {t.viewCase}
            <ArrowRight
              size={17}
              aria-hidden="true"
              className="group-hover/button:translate-x-[2px] group-focus-visible/button:translate-x-[2px]"
            />
          </a>
        </Button>
      </div>
    </article>
  );
}
export function SelectedWork({
  locale,
  index = false,
}: { locale: Locale; index?: boolean }) {
  const t = getCopy(locale);
  return (
    <section id="systems" className={s.section}>
      <Container>
        <div className={s.sectionHeading} data-reveal>
          {index ? <h1>{t.work}</h1> : <h2>{t.selected}</h2>}
          {index && <p>{t.workIntro}</p>}
        </div>
        <div className={s.projectRows}>
          {getPortfolio(locale)
            .projects.filter((project) => index || project.featured)
            .map((project) => (
              <ProjectRow
                key={project.slug}
                locale={locale}
                project={project}
              />
            ))}
        </div>
      </Container>
    </section>
  );
}
