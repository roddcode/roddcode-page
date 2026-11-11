import { Container } from "@/components/layout/container";
import { Footer, Header } from "@/components/portfolio/chrome";
import { getContent } from "@/content/home";
import { pathFor, resolveLocale } from "@/lib/portfolio";
import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import Image from "next/image";
import s from "./preview.module.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Hero y trabajo · roddcode",
  robots: { index: false, follow: false },
};

const previewCopy = {
  soffia: {
    es: "Agente de reservas por WhatsApp. El modelo propone; PostgreSQL valida el estado y confirma.",
    en: "A WhatsApp booking agent. The model proposes; PostgreSQL validates state and confirms.",
  },
  ndc: {
    es: "Siete operaciones de Air Europa dentro de un motor multiproveedor, con contratos escritos a mano.",
    en: "Seven Air Europa operations inside a multi-provider engine, against hand-written contracts.",
  },
  meteor: {
    es: "CRM de leads y reportes, rediseñado con los equipos de ventas antes de implementarlo.",
    en: "A leads and reporting CRM, redesigned with the sales teams before implementation.",
  },
} as const;

export default async function Preview({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const t = getContent(locale);
  const es = locale === "es";

  return (
    <div className={`${s.page} ${display.variable}`}>
      <Header locale={locale} path={pathFor(locale, "/design-preview")} />
      <main id="main-content">
        <section className={s.hero}>
          <Container>
            <p className={s.eyebrow}>Alejandro Alvarado</p>
            <p className={s.role}>
              {es
                ? "Ingeniero de software · Backend e IA aplicada"
                : "Software Engineer · Backend & Applied AI"}
            </p>
            <h1 className={s.headline}>
              <span>
                {es
                  ? "Reservas, vuelos y ventas."
                  : "Bookings, flights and sales."}
              </span>
              <span className={s.headlineSecond}>
                {es
                  ? "Software que no puede improvisar."
                  : "Software that cannot improvise."}
              </span>
            </h1>
            <p className={s.intro}>
              {es
                ? "Desarrollo backend, integraciones y sistemas de IA para operaciones empresariales: reservas por WhatsApp, distribución aérea y procesos comerciales, donde un error tiene consecuencias fuera de la pantalla."
                : "I build backend, integrations and AI systems for business operations: WhatsApp bookings, airline distribution and commercial processes, where a mistake has consequences beyond the screen."}
            </p>
            <div className={s.actions}>
              <a className={s.primary} href={pathFor(locale, "/work")}>
                {es ? "Ver proyectos" : "See projects"}
              </a>
              <a
                className={s.secondary}
                href="mailto:devale.alvarado@gmail.com"
              >
                {es ? "Escríbeme" : "Get in touch"}
              </a>
            </div>
            <p className={s.availability}>
              <span className={s.dot} aria-hidden="true" />
              <span className={s.availText}>
                <span className={s.availGroup}>
                  {es ? "Tiempo completo o contrato" : "Full-time or contract"}
                </span>
                <span className={s.sep}> · </span>
                <span className={s.availGroup}>
                  {es
                    ? "Remoto desde Lima · UTC-5"
                    : "Remote from Lima · UTC-5"}
                </span>
              </span>
            </p>
          </Container>
        </section>

        <section className={s.work}>
          <Container>
            <header className={s.workHead}>
              <h2>{es ? "Trabajo seleccionado" : "Selected work"}</h2>
              <p>01 — 03</p>
            </header>
            {t.systemsList.map((item, index) => (
              <article className={s.row} key={item.id}>
                <a
                  className={s.visual}
                  href={pathFor(locale, `/work/${item.id}`)}
                  tabIndex={-1}
                  aria-label={item.title}
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(max-width: 900px) 100vw, 46vw"
                    />
                  ) : (
                    <span className={s.panel}>
                      <span className={s.panelMark}>NDC 21.3</span>
                      <span className={s.panelMeta}>
                        {es ? "Siete operaciones" : "Seven operations"}
                      </span>
                    </span>
                  )}
                </a>
                <div className={s.rowText}>
                  <p className={s.category}>
                    {String(index + 1).padStart(2, "0")} / {item.kind}
                  </p>
                  <h3>
                    <a href={pathFor(locale, `/work/${item.id}`)}>
                      {item.title}
                    </a>
                  </h3>
                  <p className={s.rowDetail}>
                    {previewCopy[item.id as keyof typeof previewCopy]?.[
                      es ? "es" : "en"
                    ] ?? item.detail}
                  </p>
                  <a
                    className={s.rowLink}
                    href={pathFor(locale, `/work/${item.id}`)}
                  >
                    {es ? "Ver caso" : "Read the case"}
                  </a>
                </div>
              </article>
            ))}
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
