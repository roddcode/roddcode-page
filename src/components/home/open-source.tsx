import { Container } from "@/components/layout/container";
import type { HomeContent } from "@/content/home/types";
import s from "./home.module.css";

export function OpenSource({ t }: { t: HomeContent["openSource"] }) {
  return (
    <Container>
      <section className={s.oss} id="open-source" aria-labelledby="oss-title">
        <h2 className={s.ossLabel} id="oss-title">
          {t.label}.
        </h2>
        <p className={s.ossIntro}>{t.intro}</p>

        <ol className={s.ossList}>
          {t.packages.map((pkg) => (
            <li key={pkg.name} className={s.ossRow}>
              <div className={s.ossLine}>
                <h3 className={s.ossName}>{pkg.name}</h3>
                <span className={s.ossVersion}>v{pkg.version}</span>
              </div>

              <p className={s.ossDesc}>{pkg.description}</p>
              <p className={s.ossFacts}>{pkg.facts.join(" · ")}</p>

              <div className={s.ossLinks}>
                <a
                  className={s.ossLink}
                  href={pkg.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  className={s.ossLink}
                  href={pkg.npm}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  npm
                </a>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </Container>
  );
}
