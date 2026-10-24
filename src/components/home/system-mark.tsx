import {
  BracketsCurly,
  ChartBar,
  FlowArrow,
  Pulse,
  Repeat,
  Scan,
  Scales,
  ShieldCheck,
} from "@phosphor-icons/react";

/** SVG oficial a color, servido desde /public/logos (self-hosted, sin runtime). */
const FILES: Record<string, string> = {
  PostgreSQL: "postgresql.webp",
  PROS: "pros.webp",
  Serilog: "serilog.webp",
  zod: "zod.svg",
  Docker: "docker.svg",
  Redis: "redis.svg",
  TypeScript: "typescript.svg",
  Azure: "azure.svg",
  ".NET": "dotnet.svg",
  "Next.js": "nextjs.svg",
  React: "react.svg",
  GitHub: "github.svg",
  LinkedIn: "linkedin.svg",
  "Node.js": "nodejs.svg",
};

const ICONS = {
  model: Scan,
  "reactive-fsm": FlowArrow,
  policy: ShieldCheck,
  parser: BracketsCurly,
  PROS: Scales,
  "exactly-once": Repeat,
  Serilog: Pulse,
  report: ChartBar,
};

const BOX = {
  width: 20,
  height: 20,
  display: "inline-grid",
  placeItems: "center",
  flex: "none",
} as const;

export function BrandLogo({ name, size = 16 }: { name: string; size?: number }) {
  const file = FILES[name];
  if (!file) return null;

  return (
    <img
      src={`/logos/${file}`}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      style={{ objectFit: "contain", flex: "none" }}
    />
  );
}

export function SystemMark({ system }: { system: string }) {
  if (FILES[system]) {
    return (
      <span style={BOX}>
        <BrandLogo name={system} size={18} />
      </span>
    );
  }

  const Icon = ICONS[system as keyof typeof ICONS] ?? FlowArrow;
  return (
    <span style={BOX}>
      <Icon size={17} weight="fill" aria-hidden="true" />
    </span>
  );
}
