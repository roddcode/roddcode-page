import { SITE } from "@/lib/constants";

type FaqEntry = { question: string; answer: string };

const person = {
  "@type": "Person",
  "@id": `${SITE.url}/#person`,
  name: "Rodrigo Alejandro Alvarado",
  alternateName: ["Rodrigo Alvarado", "Alejandro Alvarado", "roddcode"],
  url: SITE.url,
  jobTitle: "AI Engineer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lima",
    addressCountry: "PE",
  },
  sameAs: [
    SITE.github,
    SITE.linkedin,
    "https://npmjs.com/package/reactive-fsm",
    "https://npmjs.com/package/exactly-once",
  ],
  knowsAbout: [
    "AI agents",
    "LLM tool gating",
    "Deterministic systems",
    "TypeScript",
    ".NET",
    "PostgreSQL",
    "Azure",
    "Transactional integrations",
  ],
};

const profilePage = {
  "@type": "ProfilePage",
  "@id": `${SITE.url}/#profilepage`,
  url: SITE.url,
  mainEntity: { "@id": `${SITE.url}/#person` },
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  name: "roddcode",
  url: SITE.url,
  inLanguage: "es",
  publisher: { "@id": `${SITE.url}/#person` },
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
        "@graph": [person, website, profilePage],
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
