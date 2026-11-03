import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { HomeContent } from "@/content/home/types";
import type { LogoIndex } from "@/lib/logos";
import { ExperienceItem } from "./experience-item";
import s from "./home.module.css";

function monogram(org: string) {
  const first = org.split("·")[0]?.trim() || org;
  return first
    .replace(/[^\p{L}]/gu, "")
    .slice(0, 3)
    .toLowerCase();
}

/**
 * Trayectoria.
 *
 * El perfil va en una caja de dos columnas separadas por hairline: la
 * narrativa a la izquierda y la ficha verificable a la derecha. Debajo, los
 * puestos son registros colapsables con el stack alineado a la derecha, así
 * la fila cerrada no queda vacía.
 */
export function Experience({
  t,
  about,
  logos,
}: {
  t: HomeContent["experience"];
  about: HomeContent["about"];
  logos: LogoIndex;
}) {
  return (
    <Section id="experience" tone="paper">
      <Container>
        <div className={s.expHead}>
          <h2 className={s.expTitle}>{t.title}</h2>

          <a
            className={s.tlMore}
            href="/cv-alejandro-alvarado-roddcode.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={s.tlMoreLabel}>{t.cvLink}</span>
            <span className={s.tlMoreMeta}>{t.cvMeta}</span>
            <svg
              viewBox="0 0 12 12"
              aria-hidden="true"
              className={s.tlMoreIcon}
            >
              <path
                d="M3.5 8.5L8.5 3.5M8.5 3.5H4.7M8.5 3.5V7.3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <div className={s.about}>
          <div className={s.aboutProse}>
            <p className={s.aboutLede}>{about.lede}</p>
            <p className={s.aboutP}>{about.closing}</p>
            <p className={s.aboutP}>{about.outside}</p>
          </div>

          <div className={s.aboutSpecs}>
            <p className={s.aboutStack}>{about.stack}</p>

            <div className={s.aboutMeta}>
              <p className={s.aboutMetaLine}>{t.base}</p>
              <p className={s.aboutMetaLine}>{t.education}</p>
            </div>
          </div>
        </div>

        <ol className={s.tl}>
          {t.items.map((item) => {
            const company = logos.companies[item.logo ?? item.id];
            const tile = company ? (
              <img
                className={s.tlTileImg}
                src={`/logos/companies/${company}`}
                alt=""
                width={32}
                height={32}
                loading="lazy"
              />
            ) : (
              monogram(item.org)
            );

            return (
              <li key={item.id}>
                <ExperienceItem
                  tile={tile}
                  role={item.role}
                  org={item.org}
                  when={item.when}
                  note={item.note}
                  stack={item.stack}
                />
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
