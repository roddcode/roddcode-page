import { SITE } from "@/lib/constants";

type FaqEntry = { question: string; answer: string };

const person = {
  "@type": "Person",
  "@id": `${SITE.url}/#person`,
  name: SITE.author,
  url: SITE.url,
  jobTitle: "Ingeniero de software",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lima",
    addressCountry: "PE",
  },
  sameAs: [SITE.github, SITE.linkedin],
  knowsAbout: [
    "Sistemas de IA deterministas",
    "TypeScript",
    "React",
    "Next.js",
    ".NET",
    "SQL Server",
    "Integraciones ERP y CRM",
  ],
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  name: "roddcode",
  url: SITE.url,
  inLanguage: "es",
  publisher: { "@id": `${SITE.url}/#person` },
};

const service = {
  "@type": "ProfessionalService",
  "@id": `${SITE.url}/#service`,
  name: "roddcode",
  url: SITE.url,
  description: SITE.description,
  founder: { "@id": `${SITE.url}/#person` },
  areaServed: ["Perú", "España", "Latinoamérica"],
  sameAs: [SITE.github, SITE.linkedin],
};

function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data, contenido propio serializado
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function JsonLd() {
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
