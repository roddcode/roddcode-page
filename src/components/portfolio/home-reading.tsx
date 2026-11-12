import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { type Locale, getPortfolio } from "@/content/portfolio";
import { getCopy } from "@/content/portfolio/copy";
import { getAllPosts } from "@/lib/mdx";
import { pathFor } from "@/lib/paths";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import s from "./home-reading.module.css";

export function HomeReading({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const posts = getAllPosts().slice(0, 3);
  const { about } = getPortfolio(locale);
  const experience = about.timeline.slice(0, 3);
  const technologies = [...new Set(experience.flatMap((item) => item.stack))];
  return (
    <>
      <section className={`${s.section} ${s.about}`} id="experience">
        <Container>
          <div className={s.personTeaser}>
            <div className={s.personIntro} data-reveal>
              <h2>{t.personTitle}</h2>
              <p className={s.personalStatement}>{t.personIntro}</p>
              <p className={s.education}>{about.education}</p>
              <ul
                className={s.technologies}
                aria-label={locale === "es" ? "Tecnologías" : "Technologies"}
              >
                {technologies.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <Button asChild variant="link" size="link">
                <a href={pathFor(locale, "/about")}>
                  {t.meet}
                  <ArrowRight
                    size={17}
                    aria-hidden="true"
                    className="group-hover/button:translate-x-[2px] group-focus-visible/button:translate-x-[2px]"
                  />
                </a>
              </Button>
            </div>
            <div className={s.experience} data-reveal>
              <h3>{t.trajectory}</h3>
              <ol>
                {experience.map((item) => (
                  <li key={`${item.period}-${item.organization}`}>
                    <span className={s.period}>{item.period}</span>
                    <div>
                      <p className={s.organization}>{item.organization}</p>
                      <p className={s.role}>{item.role}</p>
                    </div>
                  </li>
                ))}
              </ol>
              {about.timeline.length > experience.length && (
                <Button asChild variant="link" size="link">
                  <a href={`${pathFor(locale, "/about")}#experience`}>
                    {locale === "es"
                      ? `Ver ${about.timeline.length - experience.length} experiencias más`
                      : `View ${about.timeline.length - experience.length} more experiences`}
                    <ArrowRight size={17} aria-hidden="true" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </Container>
      </section>
      <section className={`${s.section} ${s.writing}`}>
        <Container>
          <div className={s.writingTeaser}>
            <div className={s.writingHeading} data-reveal>
              <h2>{t.writingTitle}</h2>
              <Button asChild variant="link" size="link">
                <a href="/writing">
                  {t.readWriting}
                  <ArrowRight
                    size={17}
                    aria-hidden="true"
                    className="group-hover/button:translate-x-[2px] group-focus-visible/button:translate-x-[2px]"
                  />
                </a>
              </Button>
              <p>{t.writingIntro}</p>
            </div>
            <div className={s.articleList}>
              {posts.map((post) => (
                <a
                  key={post.slug}
                  href={`/writing/${post.slug}`}
                  lang="en"
                  data-reveal
                >
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
    </>
  );
}
