import {
  Activity,
  Braces,
  ChartColumn,
  CircleCheck,
  Database,
  GitBranch,
  Repeat,
  Scale,
  ScanLine,
  ShieldCheck,
  Workflow,
} from "lucide-react";

/**
 * Icono por el TRABAJO que hace el sistema, no por la marca.
 *
 * Antes acá se servían logos oficiales desde /public/logos. El problema era
 * visual: un logo a color de 18px al lado de un icono de línea pesa distinto,
 * y en una lista de cinco pasos ese contraste rompe el ritmo. Un set único
 * (Lucide, mismo trazo y tamaño) deja que el texto cargue la jerarquía.
 *
 * Además elimina cinco pedidos de imagen en el panel principal.
 */
const ICONS = {
  model: ScanLine,
  "reactive-fsm": GitBranch,
  policy: ShieldCheck,
  parser: Braces,
  PostgreSQL: Database,
  PROS: Scale,
  "exactly-once": Repeat,
  zod: CircleCheck,
  Serilog: Activity,
  report: ChartColumn,
  sistema: Workflow,
} as const;

const BOX = {
  width: 20,
  height: 20,
  display: "inline-grid",
  placeItems: "center",
  flex: "none",
} as const;

export function SystemMark({ system }: { system: string }) {
  const Icon = ICONS[system as keyof typeof ICONS] ?? Workflow;

  return (
    <span style={BOX}>
      <Icon size={17} strokeWidth={1.75} aria-hidden="true" />
    </span>
  );
}
