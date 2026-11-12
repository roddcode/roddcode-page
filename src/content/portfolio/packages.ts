import type { Locale, Package } from "./types";

export function getPackages(locale: Locale): Package[] {
  const es = locale === "es";
  return [
    {
      name: "exactly-once",
      version: "0.2.0",
      repo: "https://github.com/roddcode/exactly-once",
      npm: "https://www.npmjs.com/package/exactly-once",
      summary: es
        ? "Validación de acciones y commits idempotentes en PostgreSQL."
        : "Action validation and idempotent commits in PostgreSQL.",
    },
    {
      name: "reactive-fsm",
      version: "1.4.1",
      repo: "https://github.com/roddcode/reactive-fsm",
      npm: "https://www.npmjs.com/package/reactive-fsm",
      summary: es
        ? "Herramientas disponibles por estado y control de bucles para agentes."
        : "State-based tool availability and loop control for agents.",
    },
  ];
}
