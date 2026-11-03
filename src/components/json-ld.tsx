import { getContent } from "@/content/home";
import { SITE } from "@/lib/constants";

type FaqEntry = { question: string; answer: string };

function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data, contenido propio serializado
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function JsonLd({ locale }: { locale: string }) {
  const t = getContent(locale);
  const isEs = locale === "es";

  const person = {
    "@type": "Person",
    "@id": `${SITE.url}/#person`,
    name: SITE.author,
    url: SITE.url,
    jobTitle: t.hero.role,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lima",
      addressCountry: "PE",
    },
    sameAs: [SITE.github, SITE.linkedin],
    knowsAbout: isEs
      ? [
          "Sistemas de IA deterministas",
          "TypeScript",
          "React",
          "Next.js",
          ".NET",
          "SQL Server",
          "Integraciones ERP y CRM",
        ]
      : [
          "Deterministic AI systems",
          "TypeScript",
          "React",
          "Next.js",
          ".NET",
          "SQL Server",
          "ERP and CRM integrations",
        ],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: "roddcode",
    url: isEs ? SITE.url : `${SITE.url}/en`,
    inLanguage: locale,
    publisher: { "@id": `${SITE.url}/#person` },
  };

  const service = {
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#service`,
    name: "roddcode",
    url: isEs ? SITE.url : `${SITE.url}/en`,
    description: t.hero.sub,
    founder: { "@id": `${SITE.url}/#person` },
    areaServed: isEs
      ? ["Perú", "España", "Latinoamérica"]
      : ["Peru", "Spain", "Latin America"],
    sameAs: [SITE.github, SITE.linkedin],
  };

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@graph": [person, website, service],
      }}
    />
  );
}

export function JsonLdFaq({ items }: { items: readonly FaqEntry[] }) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }}
    />
  );
}
