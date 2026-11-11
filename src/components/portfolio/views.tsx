import { Container } from "@/components/layout/container";
import { type Locale, type Project, getPortfolio } from "@/content/portfolio";
import { getCopy } from "@/content/portfolio/copy";
import { SITE } from "@/lib/constants";
import { getAllPosts } from "@/lib/mdx";
import { CV, pathFor } from "@/lib/paths";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { BookingDemo } from "./booking-demo";
import { Footer, Header } from "./chrome";
import s from "./portfolio.module.css";
import { ProjectArt } from "./project-art";

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
          {getPortfolio(locale).projects.map((project) => (
            <ProjectRow key={project.slug} locale={locale} project={project} />
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

function ProseSection({
  id,
  title,
  children,
}: { id: string; title: string; children: ReactNode }) {
  return (
    <section className={s.proseSection} id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function CaseStudy({
  locale,
  project,
}: { locale: Locale; project: Project }) {
  const t = getCopy(locale);
  const sections = [
    ["context", t.context],
    ["contribution", t.contribution],
    ["decisions", t.decisions],
    ["architecture", t.architecture],
    ...(project.slug === "soffia" ? [["gate-panel", t.demoTitle]] : []),
    ["incident", t.incident],
    ["results", t.results],
    ["evidence", t.evidence],
    ["learning", t.learning],
  ];
  const next = getPortfolio(locale).projects.filter(
    (p) => p.slug !== project.slug,
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
            <ProjectArt slug={project.slug} locale={locale} />
          </div>
          <dl className={s.caseMeta}>
            {[
              [t.period, project.period],
              [t.role, project.role],
              [t.scope, project.scope],
              [t.status, project.status],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
      <Container className={s.caseLayout}>
        <aside className={s.caseAside}>
          <nav
            aria-label={
              locale === "es" ? "Contenido del caso" : "Case contents"
            }
          >
            {sections.map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
        </aside>
        <article className={s.caseArticle}>
          <ProseSection id="context" title={t.context}>
            {project.context.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </ProseSection>
          <ProseSection id="contribution" title={t.contribution}>
            <ul>
              {project.contribution.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
            <h3>{t.constraints}</h3>
            <ul>
              {project.constraints.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          </ProseSection>
          <ProseSection id="decisions" title={t.decisions}>
            {project.decisions.map((item) => (
              <div className={s.decision} key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.choice}</p>
                <p className={s.tradeoff}>
                  <strong>{t.tradeoff}: </strong>
                  {item.tradeoff}
                </p>
              </div>
            ))}
          </ProseSection>
          <ProseSection id="architecture" title={t.architecture}>
            <ol className={s.flow}>
              {project.flow.map((step) => (
                <li key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </li>
              ))}
            </ol>
            <p className={s.note}>
              {locale === "es"
                ? "Esquema de responsabilidades, reconstruido para explicar el caso."
                : "A responsibility map reconstructed to explain the case."}
            </p>
            <div className={s.stack}>
              {project.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </ProseSection>
          {project.slug === "soffia" && <BookingDemo locale={locale} />}
          <ProseSection id="incident" title={t.incident}>
            <h3>{project.incident.title}</h3>
            <p>{project.incident.detail}</p>
            <p>
              <strong>{t.handling}: </strong>
              {project.incident.handling}
            </p>
            <p className={s.note}>{project.incident.limitation}</p>
          </ProseSection>
          <ProseSection id="results" title={t.results}>
            <div className={s.resultPanel}>
              <h3>{project.results.title}</h3>
              <p>{project.results.detail}</p>
              <p>
                <strong>{t.provenance}: </strong>
                {project.results.provenance}
              </p>
              <p className={s.note}>{project.results.limitation}</p>
            </div>
          </ProseSection>
          <ProseSection id="evidence" title={t.evidence}>
            <div className={s.evidenceList}>
              {project.evidence.map((item) => (
                <div key={item.label}>
                  <h3>
                    {item.href ? (
                      <a href={item.href}>
                        {item.label}
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    ) : (
                      item.label
                    )}
                  </h3>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </ProseSection>
          <ProseSection id="learning" title={t.learning}>
            {project.learning.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </ProseSection>
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
