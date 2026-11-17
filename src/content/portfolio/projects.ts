import type { Locale, Project } from "./types";

type LocalCopy = Pick<
  Project,
  "title" | "category" | "summary" | "scope" | "availability" | "highlights"
>;
type Definition = Omit<Project, keyof LocalCopy> & Record<Locale, LocalCopy>;

// Shared facts live once. Translations describe the same contribution and scope.
const projects: Definition[] = [
  {
    slug: "soffia",
    period: "2026",
    role: "AI Engineer",
    status: "published",
    featured: true,
    stack: ["TypeScript", "Next.js", "PostgreSQL", "Vercel AI SDK", "Redis"],
    relatedPosts: [
      "db-fat-llm-light",
      "network-asymmetry",
      "fourth-time-fsm-library",
    ],
    relatedPackages: [
      { name: "reactive-fsm", relationship: "used" },
      { name: "exactly-once", relationship: "related" },
    ],
    es: {
      title: "SoffIA",
      category: "IA aplicada · Reservas",
      summary:
        "Desarrollé un agente de reservas por WhatsApp para clínicas. El modelo interpreta las solicitudes; el backend comprueba la disponibilidad y las reglas de agenda antes de guardar una reserva en PostgreSQL.",
      scope:
        "Producto propio: aplicación, orquestación y conexión con operaciones de reservas.",
      availability: "Utilizado en una clínica estética en 2026.",
    },
    en: {
      title: "SoffIA",
      category: "Applied AI · Booking",
      summary:
        "I built a WhatsApp booking agent for clinics. The model interprets requests; the backend checks availability and scheduling rules before saving a booking in PostgreSQL.",
      scope:
        "Own product: application, orchestration and connection to booking operations.",
      availability: "Used at an aesthetic clinic in 2026.",
    },
  },
  {
    slug: "ndc",
    period: "2026",
    role: "Software Engineer",
    status: "published",
    featured: true,
    stack: ["C#/.NET", "SOAP/XML", "PostgreSQL", "Serilog", "Azure DevOps"],
    delivery: { ndcOperations: 7, migratedRepositories: 4 },
    relatedPosts: ["ndc-payment-and-cancellation"],
    es: {
      title: "Motor de vuelos: integración NDC y migración .NET",
      category: "Backend · Integraciones y migración",
      summary:
        "Integré siete operaciones NDC de Air Europa mediante SOAP/XML en un motor de vuelos multiproveedor. Por separado, fui el único ingeniero a cargo de migrar cuatro repositorios del motor .NET, entregados y validados en producción.",
      scope:
        "Integración en un motor multiproveedor existente y responsabilidad individual sobre la migración de cuatro repositorios críticos.",
      availability: "Operaciones entregadas en producción para agencias.",
    },
    en: {
      title: "Flight engine: NDC integration and .NET migration",
      category: "Backend · Integrations and migration",
      summary:
        "I integrated seven Air Europa NDC operations through SOAP/XML in a multi-provider flight engine. Separately, I was the sole engineer responsible for migrating four .NET engine repositories, delivered and validated in production.",
      scope:
        "Integration within an existing multi-provider engine and sole responsibility for migrating four critical repositories.",
      availability: "Operations delivered to production for travel agencies.",
    },
  },
  {
    slug: "meteor",
    period: "2024–2025",
    role: "Fullstack Engineer",
    status: "published",
    featured: true,
    stack: ["Vue.js", "C#/.NET", "SQL Server", "Tailwind CSS"],
    es: {
      title: "METEOR CRM",
      category: "Fullstack · Proceso comercial",
      summary:
        "Fui el único desarrollador frontend asignado a METEOR, el CRM de leads y reportes de la cuenta Movistar en VML (WPP). Trabajé con Vue, .NET y SQL Server.",
      scope:
        "Único desarrollador frontend del proyecto, dentro de un equipo más amplio de la cuenta; participación fullstack.",
      availability:
        "Trabajo realizado entre diciembre de 2024 y diciembre de 2025.",
      highlights: [
        {
          label: "El proceso comercial pasó de",
          value: "169 a 79 minutos",
          context: "según la medición interna de METEOR.",
        },
      ],
    },
    en: {
      title: "METEOR CRM",
      category: "Fullstack · Sales operations",
      summary:
        "I was the sole frontend developer assigned to METEOR, the leads and reporting CRM for the Movistar account at VML (WPP). I worked with Vue, .NET and SQL Server.",
      scope:
        "The project's sole frontend developer, within a larger account team, with fullstack contributions.",
      availability: "Work carried out between December 2024 and December 2025.",
      highlights: [
        {
          label: "The sales process went from",
          value: "169 to 79 minutes",
          context: "according to METEOR’s internal measurement.",
        },
      ],
    },
  },
];

export function getProjects(locale: Locale): Project[] {
  return projects
    .filter((project) => project.status === "published")
    .map(({ es, en, ...facts }) => ({
      ...facts,
      ...(locale === "es" ? es : en),
    }));
}
