export type SystemNode = {
  label: string;
  meta?: string;
  state?: "blocked" | "ok";
};

export type System = {
  id: string;
  index: string;
  title: string;
  kind: string;
  reading: string;
  readingLabel: string;
  status: string;
  summary: string;
  nodes: SystemNode[];
  image?: string;
  period: string;
  discipline: string;
  scope?: string;
  detail: string;
  bullets: string[];
  stack: string[];
};

export const SYSTEMS: System[] = [
  {
    id: "soffia",
    index: "01",
    title: "SoffIA",
    kind: "AI agent for clinics",
    reading: "25% to 12%",
    readingLabel: "no-shows",
    status: "archived",
    summary:
      "A WhatsApp booking agent for clinics. The model could invent an appointment; the database had to stop it.",
    nodes: [
      { label: "WhatsApp", meta: "inbound" },
      { label: "reactive-fsm", meta: "10 states" },
      { label: "PostgreSQL", meta: "FOR UPDATE SKIP LOCKED" },
      { label: "slot_taken", meta: "blocked", state: "blocked" },
      { label: "alternatives", meta: "3 rows" },
    ],
    image: "/captura-crm-soffia.webp",
    period: "2026",
    discipline: "AI systems",
    scope: "Sole engineer",
    detail:
      "A WhatsApp booking agent for clinics. The model reads intent; deterministic gates check the calendar, lock the row and confirm. It ran in production for months and the database never let it invent an appointment.",
    bullets: [
      "10-state machine with PostgreSQL as the only authority",
      "Row locks and idempotency before every commit",
      "Receipt OCR with anti-fraud rules and JIT reminders",
    ],
    stack: ["TypeScript", "PostgreSQL", "Docker", "Vercel AI SDK"],
  },
  {
    id: "ndc",
    index: "02",
    title: "Air Europa NDC 21.3",
    kind: "Flight engine integration",
    reading: "7",
    readingLabel: "operations in production",
    status: "in production",
    summary:
      "Seven NDC 21.3 operations inside a multi-provider engine, against hand-written XML contracts.",
    nodes: [
      { label: "agency session", meta: "SOAP" },
      { label: "NDC 21.3", meta: "7 operations" },
      { label: "PROS", meta: "fare parity" },
      { label: "PostgreSQL", meta: "offer lock" },
      { label: "order 8F2A", meta: "committed", state: "ok" },
    ],
    period: "2026",
    discipline: "Backend",
    scope: "Owned the integration",
    detail:
      "Seven Air Europa NDC 21.3 operations inside a multi-provider flight engine, against hand-written XML contracts. Strict parsing, fail-closed on any mismatch, and a trace for every order.",
    bullets: [
      "AirShopping, OfferPrice, OrderCreate, OrderRetrieve, OrderChange, OrderCancel, UpSell",
      "Hand-built SOAP/XML builders and parsers against PROS",
      "Led the .NET 6 to .NET 10 migration alone",
    ],
    stack: ["C#/.NET 10", "SOAP/XML", "AKS", "Serilog"],
  },
  {
    id: "meteor",
    index: "03",
    title: "METEOR CRM",
    kind: "Enterprise CRM",
    reading: "53%",
    readingLabel: "less process time",
    status: "delivered",
    summary:
      "Replaced InConcert at Movistar Peru. The commercial process was redesigned, not ported.",
    nodes: [
      { label: "InConcert", meta: "legacy" },
      { label: "batch queue", meta: "retry" },
      { label: "dedupe", meta: "by hash" },
      { label: "SQL Server", meta: "write + trace" },
      { label: "1,842 rows", meta: "0 duplicates", state: "ok" },
    ],
    image: "/meteor-crm-dark.webp",
    period: "2024–2025",
    discipline: "Full-stack",
    detail:
      "Replaced InConcert for the Movistar account at VML. The commercial process was redesigned, not ported: 169 minutes became 79, and the licence went away.",
    bullets: [
      "Full-stack CRM in C#/.NET and Vue.js over SQL Server",
      "Process redesign with the commercial teams, not a lift-and-shift",
      "$1,000/month in licences removed, ROI under two months",
    ],
    stack: ["C#/.NET", "Vue.js", "SQL Server"],
  },
];
