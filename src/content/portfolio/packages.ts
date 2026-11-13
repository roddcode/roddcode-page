import type { Locale, Package } from "./types";

export function getPackages(locale: Locale): Package[] {
  const es = locale === "es";
  return [
    {
      name: "exactly-once",
      repo: "https://github.com/roddcode/exactly-once",
      npm: "https://www.npmjs.com/package/exactly-once",
      summary: es
        ? "Validación de acciones y commits idempotentes en PostgreSQL."
        : "Action validation and idempotent commits in PostgreSQL.",
    },
    {
      name: "reactive-fsm",
      repo: "https://github.com/roddcode/reactive-fsm",
      npm: "https://www.npmjs.com/package/reactive-fsm",
      summary: es
        ? "Herramientas visibles por estado y presupuestos de llamadas para agentes de IA en TypeScript."
        : "State-based tool availability and tool-call budgets for TypeScript AI agents.",
    },
  ];
}
