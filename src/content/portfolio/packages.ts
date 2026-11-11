import type { Locale, Package } from "./types";

const fsmExample = `import { createFSM } from 'reactive-fsm';

const fsm = createFSM({
  initialState: 'IDENTITY',
  states: ['IDENTITY', 'BOOKING'],
  tools: {
    IDENTITY: ['validate_identity'],
    BOOKING: ['check_availability', 'reserve_slot'],
  },
});

fsm.allowedTools; // ['validate_identity']
fsm.transitionTo('BOOKING');
fsm.allowedTools; // ['check_availability', 'reserve_slot']`;

const commitExample = `// authority: configured with a domain action and PostgreSQL.
const proposal = await authority.propose(
  'createBooking',
  { slot: 'sat-1500' },
  { idempotencyKey: 'request-42' },
);

if (proposal.status === 'approved') {
  const receipt = await authority.commit(proposal.actionId);
  // Replaying commit returns the stored receipt.
}`;

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
      problem: es
        ? "Una herramienta puede recibir la misma solicitud después de un timeout o un reintento. Comprobar primero y escribir después deja espacio para que dos solicitudes compitan por el mismo recurso."
        : "A tool may receive the same request after a timeout or retry. Checking first and writing later leaves room for two requests to race for the same resource.",
      contract: es
        ? "El protocolo propone una acción, valida reglas de dominio, mantiene una retención y confirma mediante una transacción. Una clave de idempotencia identifica la solicitud; un commit repetido devuelve su recibo almacenado. Las invariantes del dominio deben protegerse también al aplicar la acción."
        : "The protocol proposes an action, validates domain rules, holds it and commits it in a transaction. An idempotency key identifies the request; a repeated commit returns the stored receipt. Domain invariants must also be protected when applying the action.",
      example: commitExample,
      limits: es
        ? [
            "La garantía se limita al efecto dentro de la transacción PostgreSQL; una llamada externa no se vuelve atómica por ejecutarse desde apply.",
            "El producto conserva la responsabilidad de definir validaciones y escrituras condicionales correctas, autenticar al actor y controlar permisos.",
            "El fragmento presupone una authority configurada. El README incluye la acción, el adaptador y el esquema necesarios para un ejemplo completo.",
          ]
        : [
            "The guarantee covers the effect inside the PostgreSQL transaction; an external call does not become atomic by running inside apply.",
            "The product remains responsible for correct validation and conditional writes, actor authentication and permissions.",
            "The snippet assumes a configured authority. The README provides the action, adapter and schema for a complete example.",
          ],
      tests: es
        ? "El repositorio incluye pruebas unitarias, de integración y de concurrencia con PostgreSQL: pnpm test y pnpm test:db. La ejecución de CI consultada el 10 de noviembre de 2026 pasó en Node 22/24 y falló en Node 20."
        : "The repository includes unit, integration and concurrency tests with PostgreSQL: pnpm test and pnpm test:db. The CI run reviewed on 10 November 2026 passed on Node 22/24 and failed on Node 20.",
      consumers: es
        ? "Aborda el problema de reintentos y commits descrito en SoffIA. Su integración en el producto no está comprobada."
        : "It addresses the retry and commit problem described in SoffIA. Its integration into the product is unverified.",
      evidence: [
        {
          label: es
            ? "Arquitectura y alcance de exactly-once"
            : "Architecture and exactly-once scope",
          href: "https://github.com/roddcode/exactly-once/blob/main/docs/architecture.md",
          detail: es
            ? "Protocolo, transacciones y separación de los efectos externos."
            : "Protocol, transactions and the boundary around external effects.",
        },
        {
          label: "CI · 36926172266",
          href: "https://github.com/roddcode/exactly-once/actions/runs/36926172266",
          detail: es
            ? "Resultados de la ejecución citada, desglosados por entorno."
            : "Results from the cited run, broken down by environment.",
        },
      ],
    },
    {
      name: "reactive-fsm",
      version: "1.4.1",
      repo: "https://github.com/roddcode/reactive-fsm",
      npm: "https://www.npmjs.com/package/reactive-fsm",
      summary: es
        ? "Herramientas disponibles por estado y control de bucles para agentes."
        : "State-based tool availability and loop control for agents.",
      problem: es
        ? "Un agente puede intentar usar una herramienta fuera de orden o repetirla sin avanzar. Las instrucciones del prompt no sustituyen el control del flujo en código."
        : "An agent may try a tool out of order or repeat it without progress. Prompt instructions do not replace flow control in code.",
      contract: es
        ? "La configuración declara estados, herramientas y guardas de transición. allowedTools refleja el conjunto permitido en el estado actual. Los adaptadores conectan ese control con proveedores de modelos; el registro de herramientas y sus condiciones siguen formando parte de la aplicación."
        : "Configuration declares states, tools and transition guards. allowedTools reflects the permitted set in the current state. Adapters connect this control to model providers; the tool registry and its conditions remain part of the application.",
      example: fsmExample,
      limits: es
        ? [
            "La máquina de estados no proporciona por sí sola ejecución durable, recuperación tras caídas ni scheduling persistente.",
            "Habilitar una herramienta no acredita identidad ni autorización. El backend debe comprobar permisos y reglas de dominio.",
            "Ocultar herramientas reduce las acciones expuestas al modelo; no garantiza que cualquier respuesta de texto sea correcta ni sustituye validaciones de servidor.",
          ]
        : [
            "The state machine does not itself provide durable execution, crash recovery or persistent scheduling.",
            "Enabling a tool does not establish identity or authorization. The backend must check permissions and domain rules.",
            "Hiding tools limits actions exposed to the model; it does not guarantee correct text responses or replace server-side validation.",
          ],
      tests: es
        ? "El repositorio contiene pruebas del núcleo y adaptadores, ejecutables con pnpm test. La ejecución de CI consultada el 10 de noviembre de 2026 pasó en Node 22 y falló en Node 20."
        : "The repository contains core and adapter tests, runnable with pnpm test. The CI run reviewed on 10 November 2026 passed on Node 22 and failed on Node 20.",
      consumers: es
        ? "Usé reactive-fsm y su adaptador en el código de SoffIA, cuyo lockfile fija la versión 1.4.0. La versión descrita en esta página es la 1.4.1."
        : "I used reactive-fsm and its adapter in SoffIA's code, whose lockfile pins version 1.4.0. The version described on this page is 1.4.1.",
      evidence: [
        {
          label: es ? "API, ejemplos y pruebas" : "API, examples and tests",
          href: "https://github.com/roddcode/reactive-fsm",
          detail: es
            ? "API, ejemplos y pruebas de la versión examinada el 10 de noviembre de 2026."
            : "API, examples and tests for the version examined on 10 November 2026.",
        },
        {
          label: "CI · 36263454411",
          href: "https://github.com/roddcode/reactive-fsm/actions/runs/36263454411",
          detail: es
            ? "Resultados de la ejecución citada, desglosados por entorno."
            : "Results from the cited run, broken down by environment.",
        },
      ],
    },
  ];
}
