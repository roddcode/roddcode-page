import { Experience } from "@/components/home/experience";
import { Home } from "@/components/home/home";
import s from "@/components/home/home.module.css";
import { OpenSource } from "@/components/home/open-source";
import { SystemsStacked } from "@/components/home/systems-stacked";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { LOCALES, type Locale, getContent } from "@/content/home";
import { logoIndex } from "@/lib/logos";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getContent(locale);
  return {
    title: `Alejandro Alvarado · ${t.hero.role}`,
    description: t.hero.sub,
    alternates: {
      canonical: locale === "es" ? "/" : `/${locale}`,
      languages: { es: "/", en: "/en" },
      types: { "application/rss+xml": "/feed.xml" },
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const t = getContent(locale);
  return (
    <Home
      locale={locale as Locale}
      content={{
        nav: t.nav,
        hero: t.hero,
        panel: t.panel,
        cases: t.cases,
        contact: t.contact,
        footer: t.footer,
      }}
      systems={
        <Section id="systems" tone="night" dark className={s.systems}>
          <Container>
            <h2 className={s.systemsTitle}>{t.systems.title}</h2>
            <SystemsStacked
              items={t.systemsList}
              ndc={t.systems.ndc}
              builtWith={t.systems.builtWith}
            />
          </Container>
        </Section>
      }
      openSource={<OpenSource t={t.openSource} />}
      experience={
        <Experience t={t.experience} about={t.about} logos={logoIndex()} />
      }
    />
  );
}
