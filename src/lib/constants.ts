export const SITE = {
  title: "Sistemas con IA que no fallan cuando hay plata en juego | roddcode",
  description:
    "Auditoría e ingeniería de sistemas con IA para negocios transaccionales en LATAM y España. El modelo propone, la base de datos decide.",
  url: "https://roddcode.com",
  author: "Alejandro Alvarado",
  location: "Lima, PE",
  email: "roddcode.dev@gmail.com",
  cal: "https://cal.com/roddcode/intro",
  whatsapp: "",
  github: "https://github.com/roddcode",
  linkedin: "https://www.linkedin.com/in/alejandro-alvarado-roddcode/",
} as const;

export const PAGE_METRICS = [
  { label: "LCP", value: "1.6s" },
  { label: "CLS", value: "0.00" },
  { label: "TBT", value: "110ms" },
  { label: "LH Score", value: "99" },
] as const;

export const PHILOSOPHY_TENETS = [
  {
    number: "01",
    title: "Network Asymmetry",
    description:
      "External APIs fail. Every fetch in my systems carries exponential backoff, circuit breakers, and graceful degradation. The user never sees a broken spinner.",
    slug: "network-asymmetry",
  },
  {
    number: "02",
    title: "Server-Centric State",
    description:
      "Critical state lives on the server. HttpOnly cookies, server-side sessions, zero client-side token storage. The browser is a rendering surface, not a vault.",
    slug: "server-centric-state",
  },
  {
    number: "03",
    title: "Deterministic AI",
    description:
      "LLMs are non-deterministic by nature. I wrap every model output with Zod schemas and state machines. If it doesn't validate, it doesn't reach production.",
    slug: "deterministic-ai",
  },
] as const;

export const OPEN_SOURCE_PROJECTS = [
  {
    name: "reactive-fsm",
    description:
      "Zero-dependency TypeScript library for controlling LLM tool access via state machines. MIT, 5 adapters, 86 tests.",
    href: "https://npmjs.com/package/reactive-fsm",
  },
] as const;
