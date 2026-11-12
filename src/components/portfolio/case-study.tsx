import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { type Locale, type Project, getPortfolio } from "@/content/portfolio";
import { getCopy } from "@/content/portfolio/copy";
import { getAllPosts } from "@/lib/mdx";
import { pathFor } from "@/lib/paths";
import { ArrowLeft, ArrowRight, FileText, Package } from "lucide-react";
import type { ReactNode } from "react";
import s from "./case-study.module.css";
import { CaseToc } from "./case-toc";
import { Contact } from "./contact";
import { ProjectArt } from "./project-art";

export function CaseStudy({
  locale,
  project,
  toc,
  children,
}: {
  locale: Locale;
  project: Project;
  toc: { id: string; title: string }[];
  children: ReactNode;
}) {
  const t = getCopy(locale);
  const es = locale === "es";
  const portfolio = getPortfolio(locale);
  const next = portfolio.projects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 2);
  const posts = getAllPosts().filter(
    (post) => post.slug && project.relatedPosts?.includes(post.slug),
  );
  const packages = (project.relatedPackages ?? []).flatMap((related) => {
    const pkg = portfolio.packages.find((item) => item.name === related.name);
    return pkg ? [{ ...pkg, relationship: related.relationship }] : [];
  });
  const hasRelated = posts.length > 0 || packages.length > 0;
  return (
    <>
      <section className={s.caseHero}>
        <Container>
          <Button asChild variant="link" size="link" className={s.back}>
            <a href={pathFor(locale, "/work")}>
              <ArrowLeft
                size={16}
                aria-hidden="true"
                className="group-hover/button:-translate-x-[2px] group-focus-visible/button:-translate-x-[2px]"
              />
              {t.back}
            </a>
          </Button>
          <div className={s.caseHeroGrid}>
            <div data-reveal>
              <p className={s.category}>{project.category}</p>
              <h1>{project.title}</h1>
              <p className={s.caseSummary}>{project.summary}</p>
            </div>
            <div className={s.caseArt} data-reveal="">
              <ProjectArt slug={project.slug} locale={locale} detail />
            </div>
          </div>
          <dl className={s.caseMeta} data-reveal="">
            {[
              [t.period, project.period],
              [t.role, project.role],
              [t.scope, project.scope],
              [t.status, project.availability],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <ul
            className={s.stack}
            aria-label={es ? "Tecnologías" : "Stack"}
            data-reveal=""
          >
            {project.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </Container>
      </section>
      <Container className={toc.length > 0 ? s.caseLayout : s.caseLayoutSingle}>
        {toc.length > 0 && (
          <aside className={s.caseAside}>
            <CaseToc
              items={toc}
              label={es ? "En este caso" : "On this page"}
              mobileLabel={es ? "Contenido del caso" : "Case contents"}
              navLabel={es ? "Contenido del caso" : "Case contents"}
            />
          </aside>
        )}
        <article className={`${s.caseArticle} ${s.caseBody}`}>
          {children}
          {hasRelated && (
            <section className={s.caseRelated} data-reveal="">
              <h2>
                {es
                  ? "Código y escritos relacionados"
                  : "Related code and writing"}
              </h2>
              <ul className={s.relatedList}>
                {packages.map((pkg) => (
                  <li key={pkg.name}>
                    <a className={s.relatedLink} href={pkg.repo}>
                      <Package
                        size={17}
                        aria-hidden="true"
                        className={s.relatedIcon}
                      />
                      <span className={s.relatedText}>
                        <span className={s.relatedTitle}>{pkg.name}</span>
                        <span className={s.relatedNote}>
                          {pkg.relationship === "used"
                            ? es
                              ? "Usado en el código del proyecto"
                              : "Used in the project code"
                            : es
                              ? "Relacionado por el problema que aborda"
                              : "Related through the problem it addresses"}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
                {posts.map((post) => (
                  <li key={post.slug}>
                    <a
                      className={s.relatedLink}
                      href={`/writing/${post.slug}`}
                      lang="en"
                    >
                      <FileText
                        size={17}
                        aria-hidden="true"
                        className={s.relatedIcon}
                      />
                      <span className={s.relatedText}>
                        <span className={s.relatedTitle}>{post.title}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </Container>
      <section className={s.nextCases} data-reveal="">
        <Container>
          <h2>{t.next}</h2>
          <div className={s.nextGrid}>
            {next.map((item) => (
              <a
                key={item.slug}
                className={s.nextCard}
                href={pathFor(locale, `/work/${item.slug}`)}
                aria-labelledby={`next-${item.slug}-title`}
              >
                <div className={s.nextArt}>
                  <div className={s.nextCanvas}>
                    <ProjectArt slug={item.slug} locale={locale} />
                  </div>
                </div>
                <div className={s.nextBody}>
                  <span className={s.nextCategory}>{item.category}</span>
                  <h3 id={`next-${item.slug}-title`}>{item.title}</h3>
                </div>
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className={s.nextArrow}
                />
              </a>
            ))}
          </div>
        </Container>
      </section>
      <Contact locale={locale} />
    </>
  );
}
