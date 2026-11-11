import type { Locale, PortfolioContent } from "./types";

type About = PortfolioContent["about"];
export function getAbout(locale: Locale): About {
  const es = locale === "es";
  return {
    intro: es
      ? "Trabajo en backend, integraciones e IA aplicada. Mi experiencia también incluye las interfaces y los procesos que conectan ese trabajo con sus usuarios."
      : "I work on backend, integrations and applied AI. My experience also includes the interfaces and processes that connect that work to its users.",
    paragraphs: es
      ? [
          "Soy Alejandro Alvarado, desarrollador de software en Lima. Empecé construyendo sitios web y después trabajé en aplicaciones empresariales, integraciones y agentes de IA.",
          "En un ERP logístico llevé funcionalidades desde el pedido de un área hasta su entrega. En VML trabajé en un CRM para la cuenta Movistar. Más adelante implementé una integración aérea y desarrollé SoffIA, un producto propio de atención y reservas.",
          "La física me acercó a la programación. Sigo interesado en entender las reglas de un sistema, pero también en observar qué pasa cuando una herramienta se encuentra con la forma de trabajar de las personas. También doy charlas de manera amateur.",
        ]
      : [
          "I'm Alejandro Alvarado, a software developer in Lima. I started by building websites, then worked on enterprise applications, integrations and AI agents.",
          "In a logistics ERP, I took features from a department's request through delivery. At VML I worked on a CRM for the Movistar account. Later I implemented an airline integration and developed SoffIA, my own support and booking product.",
          "Physics brought me to programming. I remain interested in understanding a system's rules, and in observing what happens when a tool meets the way people work. I also give talks at an amateur level.",
        ],
    education: es
      ? "Desarrollo de Software en SENATI, modalidad dual. METEOR formó parte de mi trabajo de tesina."
      : "Software Development at SENATI, in its dual education programme. METEOR was part of my thesis project.",
    method: es
      ? [
          "Uso IA para trabajar en tareas acotadas: primero defino el resultado, el contexto necesario y cómo comprobar el cambio. Reviso el código y la evidencia de ejecución antes de darlo por resuelto.",
          "Extraigo librerías cuando un problema se repite y puedo definir un contrato pequeño. En cada proyecto reviso qué resuelve el paquete y qué debe seguir validando la aplicación.",
          "Documentar las decisiones y mantener ejemplos y pruebas forma parte de la entrega. Los escritos de este sitio recogen problemas y cambios de criterio que he encontrado al construir estos sistemas.",
        ]
      : [
          "I use AI for bounded tasks: first I define the outcome, the context needed and how to check the change. I review the code and execution evidence before calling it complete.",
          "I extract libraries when a problem recurs and I can define a small contract. For each project I review what the package handles and what the application must still validate.",
          "Documenting decisions and maintaining examples and tests are part of delivery. My writing records problems and changes of judgement I have encountered while building these systems.",
        ],
    timeline: [
      {
        period: "2026",
        role: "Software Engineer",
        organization: es
          ? "Plataforma B2B de viajes · Cliente confidencial"
          : "B2B travel platform · Confidential client",
        detail: es
          ? "Integración NDC de Air Europa, contratos XML y trazabilidad. Como único ingeniero a cargo de la migración, entregué cuatro repositorios críticos del motor validados en producción."
          : "Air Europa NDC integration, XML contracts and traceability. As the sole engineer responsible for the migration, I delivered four critical engine repositories validated in production.",
        stack: ["C#/.NET", "SOAP/XML", "PostgreSQL", "Azure"],
      },
      {
        period: "2026",
        role: "AI Engineer",
        organization: "CoreOS · SoffIA",
        detail: es
          ? "Producto propio de atención y reservas por WhatsApp: orquestación, reglas de negocio, PostgreSQL y aplicación de gestión."
          : "Own WhatsApp support and booking product: orchestration, business rules, PostgreSQL and a management application.",
        stack: ["TypeScript", "Next.js", "PostgreSQL"],
      },
      {
        period: "2024–2025",
        role: "Fullstack Engineer",
        organization: es
          ? "VML (WPP) · Cuenta Movistar"
          : "VML (WPP) · Movistar account",
        detail: es
          ? "METEOR CRM para leads y reportes. Único frontend del proyecto dentro de un equipo, con participación fullstack."
          : "METEOR CRM for leads and reporting. The project's sole frontend developer within a team, with fullstack contributions.",
        stack: ["Vue.js", "C#/.NET", "SQL Server"],
      },
      {
        period: "2025",
        role: "Frontend Developer",
        organization: "Viapase · Innotic",
        detail: es
          ? "Contrato de migración progresiva de una plataforma heredada a React y TypeScript, con interfaces adaptables a móvil."
          : "Contract to progressively migrate a legacy platform to React and TypeScript, with mobile-responsive interfaces.",
        stack: ["React", "TypeScript"],
      },
      {
        period: "2024",
        role: "Fullstack Developer",
        organization: "ITAW Group",
        detail: es
          ? "Funcionalidades de CRM y ERP logístico para áreas de logística, transporte, cargo y aduanas: requisitos, APIs, datos e interfaces."
          : "CRM and logistics ERP features for logistics, transport, cargo and customs departments: requirements, APIs, data and interfaces.",
        stack: ["C#/.NET", "Angular", "SQL Server", "MySQL"],
      },
      {
        period: "2023–2024",
        role: es ? "Practicante de desarrollo web" : "Web development intern",
        organization: "Digital Búho SAC",
        detail: es
          ? "Sitios corporativos, mantenimiento e incidencias con WordPress y Vue."
          : "Corporate websites, maintenance and issue handling with WordPress and Vue.",
        stack: ["WordPress", "Vue.js"],
      },
      {
        period: "2023",
        role: es ? "Practicante web" : "Web intern",
        organization: "WebemprendePE",
        detail: es
          ? "Primer trabajo en producción: sitios web, personalización de temas y plugins."
          : "First production work: websites, theme customisation and plugins.",
        stack: ["WordPress", "PHP", "JavaScript"],
      },
    ],
  };
}
