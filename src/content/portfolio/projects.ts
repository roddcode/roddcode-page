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
        "Desarrollé un agente por WhatsApp para atender consultas, comprobar disponibilidad y gestionar reservas de clínicas, con reglas de agenda validadas en PostgreSQL.",
      scope:
        "Producto propio: aplicación, orquestación y conexión con operaciones de reservas.",
      availability:
        "Uso histórico en una clínica estética. La demostración de este caso es ilustrativa.",
    },
    en: {
      title: "SoffIA",
      category: "Applied AI · Booking",
      summary:
        "I developed a WhatsApp agent to handle enquiries, check availability and manage clinic bookings, with scheduling rules validated in PostgreSQL.",
      scope:
        "Own product: application, orchestration and connection to booking operations.",
      availability:
        "Historical use at an aesthetic clinic. The demonstration in this case is illustrative.",
    },
  },
  {
    slug: "ndc",
    period: "2026",
    role: "Software Engineer",
    status: "published",
    featured: true,
    stack: ["C#/.NET", "SOAP/XML", "PostgreSQL", "Serilog", "Azure DevOps"],
    es: {
      title: "Motor de vuelos: integración NDC y migración .NET",
      category: "Backend · Integraciones y migración",
      summary:
        "Implementé siete operaciones NDC de Air Europa dentro de un motor de vuelos existente. En otro trabajo, fui el único ingeniero responsable de migrar cuatro repositorios críticos del motor, entregados y validados en producción.",
      scope:
        "Integración en un motor multiproveedor existente y responsabilidad individual sobre la migración de cuatro repositorios críticos.",
      availability:
        "Integración utilizada históricamente en producción por agencias. Caso de trabajo privado.",
    },
    en: {
      title: "Flight engine: NDC integration and .NET migration",
      category: "Backend · Integrations and migration",
      summary:
        "I implemented seven Air Europa NDC operations inside an existing flight engine. In a separate assignment, I was the sole engineer responsible for migrating four critical engine repositories, delivered and validated in production.",
      scope:
        "Integration within an existing multi-provider engine and sole responsibility for migrating four critical repositories.",
      availability:
        "Integration historically used in production by travel agencies. Private client work.",
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
        "Trabajé en METEOR para la cuenta Movistar en VML (WPP): un CRM para gestionar leads y reportes, con Vue, .NET y SQL Server.",
      scope:
        "Único desarrollador frontend del proyecto, dentro de un equipo; participación fullstack.",
      availability:
        "Trabajo realizado entre diciembre de 2024 y diciembre de 2025. Caso de software empresarial.",
      highlights: [
        {
          label: "Medición interna del proyecto",
          value: "169 → 79 minutos",
          context: "Duración del proceso comercial evaluado en METEOR.",
        },
      ],
    },
    en: {
      title: "METEOR CRM",
      category: "Fullstack · Sales operations",
      summary:
        "I worked on METEOR for the Movistar account at VML (WPP): a leads and reporting CRM built with Vue, .NET and SQL Server.",
      scope:
        "The project's sole frontend developer, working within a team, with fullstack contributions.",
      availability:
        "Work carried out between December 2024 and December 2025. An enterprise software case.",
      highlights: [
        {
          label: "Internal project measurement",
          value: "169 → 79 minutes",
          context: "Duration of the sales process evaluated in METEOR.",
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
