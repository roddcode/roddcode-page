import { Container } from "@/components/layout/container";
import { type Locale, type Project, getPortfolio } from "@/content/portfolio";
import { getCopy } from "@/content/portfolio/copy";
import { SITE } from "@/lib/constants";
import { getAllPosts } from "@/lib/mdx";
import { CV, pathFor } from "@/lib/paths";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Footer, Header } from "./chrome";
import s from "./portfolio.module.css";
import { ProjectArt } from "./project-art";
import { ProjectHighlights } from "./project-highlights";

export function PortfolioShell({
  locale,
  path,
  children,
}: { locale: Locale; path: string; children: ReactNode }) {
  return (
    <div className={s.page}>
      <Header locale={locale} path={path} />
      <main id="main-content">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}

export function Contact({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  return (
    <section id="contact" className={s.contact}>
      <Container className={s.contactGrid}>
        <h2>{t.contactTitle}</h2>
        <div>
          <p>{t.contactBody}</p>
          <div className={s.actions}>
            <a href={`mailto:${SITE.email}`} className={s.primary}>
              {t.email}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a
              href={CV}
              className={s.secondary}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.cv}
            </a>
          </div>
          <a className={s.contactEmail} href={SITE.linkedin}>
            LinkedIn
          </a>
        </div>
      </Container>
    </section>
  );
}

function ProjectRow({ locale, project }: { locale: Locale; project: Project }) {
  const t = getCopy(locale);
  return (
    <article className={s.projectRow}>
      <a
        className={s.projectVisualLink}
        href={pathFor(locale, `/work/${project.slug}`)}
        tabIndex={-1}
        aria-label={`${t.viewCase}: ${project.title}`}
      >
        <ProjectArt slug={project.slug} locale={locale} />
      </a>
      <div className={s.projectText}>
        <p className={s.category}>
          {project.category} <span>{project.period}</span>
        </p>
        <h3>
          <a href={pathFor(locale, `/work/${project.slug}`)}>{project.title}</a>
        </h3>
        <p>{project.summary}</p>
        <p className={s.projectRole}>{project.role}</p>
        <ProjectHighlights project={project} />
        <a
          className={s.textLink}
          href={pathFor(locale, `/work/${project.slug}`)}
        >
          {t.viewCase}
          <ArrowRight size={17} aria-hidden="true" />
        </a>
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
        <div className={s.sectionHeading}>
          {index ? <h1>{t.work}</h1> : <h2>{t.selected}</h2>}
          <p>{index ? t.workIntro : t.selectedIntro}</p>
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

export function ComponentTeaser({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  return (
    <section id="open-source" className={`${s.section} ${s.darkBand}`}>
      <Container>
        <div className={s.sectionHeading}>
          <h2>{t.componentsTitle}</h2>
          <p>{t.componentsIntro}</p>
        </div>
        <div className={s.packageGrid}>
          {getPortfolio(locale).packages.map((pkg) => (
            <article key={pkg.name}>
              <div className={s.packageName}>
                <h3>{pkg.name}</h3>
                <span>v{pkg.version}</span>
              </div>
              <p>{pkg.summary}</p>
              <a
                className={s.textLink}
                href={`${pathFor(locale, "/open-source")}#${pkg.name}`}
              >
                {t.readContract}
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function HomeReading({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const posts = getAllPosts().slice(0, 3);
  return (
    <section className={s.section} id="experience">
      <Container>
        <div className={s.personTeaser}>
          <h2>{t.personTitle}</h2>
          <div>
            <p>{t.personIntro}</p>
            <a className={s.textLink} href={pathFor(locale, "/about")}>
              {t.meet}
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className={s.writingTeaser}>
          <div>
            <h2>{t.writingTitle}</h2>
            <p>{t.writingIntro}</p>
            <a className={s.textLink} href="/writing">
              {t.readWriting}
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
          <div className={s.articleList}>
            {posts.map((post) => (
              <a key={post.slug} href={`/writing/${post.slug}`} lang="en">
                <span>
                  {post.readingTime} {t.reading}
                </span>
                <h3>{post.title}</h3>
                <ArrowUpRight size={19} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

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
  const next = getPortfolio(locale).projects.filter(
    (p) => p.slug !== project.slug,
  );
  const posts = getAllPosts().filter(
    (post) => post.slug && project.relatedPosts?.includes(post.slug),
  );
  return (
    <>
      <section className={s.caseHero}>
        <Container>
          <a className={s.textLink} href={pathFor(locale, "/work")}>
            {t.back}
          </a>
          <div className={s.caseHeroGrid}>
            <div>
              <p className={s.category}>{project.category}</p>
              <h1>{project.title}</h1>
              <p className={s.caseSummary}>{project.summary}</p>
            </div>
            <ProjectArt slug={project.slug} locale={locale} detail />
          </div>
          <dl className={s.caseMeta}>
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
          <div className={s.stack}>
            {project.stack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </Container>
      </section>
      <Container className={s.caseLayout}>
        <aside className={s.caseAside}>
          <nav
            aria-label={
              locale === "es" ? "Contenido del caso" : "Case contents"
            }
          >
            {toc.map(({ id, title }) => (
              <a key={id} href={`#${id}`}>
                {title}
              </a>
            ))}
            {project.slug === "soffia" && (
              <a href="#gate-panel">{t.demoTitle}</a>
            )}
          </nav>
        </aside>
        <article className={`${s.caseArticle} ${s.caseBody}`}>
          {children}
          {(posts.length > 0 || Boolean(project.relatedPackages?.length)) && (
            <section className={s.caseRelated}>
              <h2>
                {locale === "es"
                  ? "Código y escritos relacionados"
                  : "Related code and writing"}
              </h2>
              <ul>
                {project.relatedPackages?.map((pkg) => (
                  <li key={pkg.name}>
                    <a href={`${pathFor(locale, "/open-source")}#${pkg.name}`}>
                      {pkg.name}
                    </a>
                    {" · "}
                    {pkg.relationship === "used"
                      ? locale === "es"
                        ? "Usado en el código del proyecto"
                        : "Used in the project code"
                      : locale === "es"
                        ? "Relacionado por el problema que aborda"
                        : "Related through the problem it addresses"}
                  </li>
                ))}
                {posts.map((post) => (
                  <li key={post.slug}>
                    <a href={`/writing/${post.slug}`} lang="en">
                      {post.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </Container>
      <section className={`${s.section} ${s.nextCases}`}>
        <Container>
          <h2>{t.next}</h2>
          <div>
            {next.map((item) => (
              <a key={item.slug} href={pathFor(locale, `/work/${item.slug}`)}>
                <span>{item.category}</span>
                <h3>{item.title}</h3>
                <ArrowRight size={22} aria-hidden="true" />
              </a>
            ))}
          </div>
        </Container>
      </section>
      <Contact locale={locale} />
    </>
  );
}

export function OpenSourcePage({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  return (
    <>
      <section className={s.section}>
        <Container>
          <div className={s.sectionHeading}>
            <h1>{t.components}</h1>
            <p>{t.componentsIntro}</p>
          </div>
          <nav className={s.packageIndex} aria-label={t.components}>
            {getPortfolio(locale).packages.map((pkg) => (
              <a key={pkg.name} href={`#${pkg.name}`}>
                {pkg.name}
                <span>v{pkg.version}</span>
              </a>
            ))}
          </nav>
          {getPortfolio(locale).packages.map((pkg) => (
            <article className={s.packageDetail} key={pkg.name} id={pkg.name}>
              <div className={s.packageHeader}>
                <h2>{pkg.name}</h2>
                <p>
                  {t.examined}: {pkg.version}
                </p>
                <p>{pkg.summary}</p>
                <div className={s.actions}>
                  <a className={s.textLink} href={pkg.repo}>
                    {t.source}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                  <a className={s.textLink} href={pkg.npm}>
                    {t.package}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
              <div className={s.packageProse}>
                <h3>{t.problem}</h3>
                <p>{pkg.problem}</p>
                <h3>{t.contract}</h3>
                <p>{pkg.contract}</p>
                <h3>{t.example}</h3>
                <pre>
                  <code>{pkg.example}</code>
                </pre>
                <h3>{t.limits}</h3>
                <ul>
                  {pkg.limits.map((limit) => (
                    <li key={limit}>{limit}</li>
                  ))}
                </ul>
                <h3>{t.tests}</h3>
                <p>{pkg.tests}</p>
                <h3>{t.consumers}</h3>
                <p>{pkg.consumers}</p>
                <div className={s.evidenceList}>
                  {pkg.evidence.map((item) => (
                    <div key={item.label}>
                      <h4>
                        {item.href ? (
                          <a href={item.href}>
                            {item.label}
                            <ArrowUpRight size={15} aria-hidden="true" />
                          </a>
                        ) : (
                          item.label
                        )}
                      </h4>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </Container>
      </section>
      <Contact locale={locale} />
    </>
  );
}

export function AboutPage({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const { about, identity } = getPortfolio(locale);
  return (
    <>
      <section className={s.section}>
        <Container>
          <div className={s.aboutHeading}>
            <div>
              <p className={s.category}>{identity.name}</p>
              <h1>{t.aboutIntro}</h1>
            </div>
            <p>{about.intro}</p>
          </div>
          <div className={s.aboutLayout}>
            <div className={s.aboutPerson}>
              {about.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
              <h2>{t.education}</h2>
              <p>{about.education}</p>
              <div className={s.actions}>
                <a
                  className={s.primary}
                  href={CV}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.cv}
                </a>
                <a className={s.textLink} href={SITE.linkedin}>
                  LinkedIn
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
            <section className={s.timeline}>
              <h2>{t.trajectory}</h2>
              {about.timeline.map((item) => (
                <article key={`${item.period}-${item.organization}`}>
                  <p className={s.category}>{item.period}</p>
                  <h3>{item.role}</h3>
                  <p className={s.organization}>{item.organization}</p>
                  <p>{item.detail}</p>
                  <div className={s.stack}>
                    {item.stack.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                </article>
              ))}
            </section>
          </div>
          <section className={s.method}>
            <h2>{t.method}</h2>
            <div>
              {about.method.map((text) => (
                <p key={text}>{text}</p>
              ))}
              <a className={s.textLink} href="/writing/db-fat-llm-light">
                DB-Fat, LLM-Light
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </section>
        </Container>
      </section>
      <Contact locale={locale} />
    </>
  );
}
