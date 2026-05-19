// Metadatos del sitio
export const SITE = {
  title: "RoddCode — Engineering AI Infrastructure",
  description:
    "I engineer AI infrastructure that closes revenue gaps. Architect of Soff.ia, an autonomous agent for medical clinics.",
  url: "https://roddcode.com",
  author: "Alejandro Alvarado",
  location: "Lima, PE",
  email: "devale.alvarado@gmail.com",
  cal: "https://cal.com/roddcode/intro",
  github: "https://github.com/roddcode",
  linkedin: "https://www.linkedin.com/in/alejandro-alvarado-roddcode/",
} as const;

// Métricas de la página (reales de auditoría Lighthouse)
export const PAGE_METRICS = [
  { label: "LCP", value: "1.6s" },
  { label: "CLS", value: "0.00" },
  { label: "TBT", value: "110ms" },
  { label: "LH Score", value: "99" },
] as const;

// Filosofía de ingeniería
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

// Arsenal (tabla de tecnologías)
export const ARSENAL = [
  {
    layer: "Application Platform",
    technologies: "Next.js 15, React 19, Tailwind CSS v4",
    approach: "App Router, Edge Runtime, Serverless, Base-8 Layout",
  },
  {
    layer: "Languages & Types",
    technologies: "TypeScript (strict), Node.js, Python",
    approach: "Discriminated Unions, Zod, Strict Typings",
  },
  {
    layer: "Data & Infrastructure",
    technologies: "Postgres, MongoDB, Drizzle ORM, Upstash Redis",
    approach: "Serverless SQL, Mutex Locks, Row Level Security",
  },
  {
    layer: "AI & Automation",
    technologies: "DeepSeek V4, Llama 4 Scout, Whisper v3",
    approach: "Vercel AI SDK, FSM Orchestrator, OCR, Function Calling",
  },
  {
    layer: "Integrations & Async",
    technologies: "Evolution API (WhatsApp), GCal API, QStash",
    approach: "Stateless JIT Jobs, Webhook Idempotency",
  },
] as const;

// Open source projects
export const OPEN_SOURCE_PROJECTS = [
  {
    name: "resilient-fetcher",
    description:
      "TypeScript utility for Next.js that wraps native fetch with exponential backoff, circuit breaking, and UI fallback states.",
    href: "https://github.com/roddcode/resilient-fetcher",
  },
  {
    name: "ssr-auth-pipeline",
    description:
      "OAuth2 token lifecycle manager for Next.js. Handles access/refresh token rotation entirely server-side. Zero tokens in client-side storage.",
    href: "https://github.com/roddcode/ssr-auth-pipeline",
  },
] as const;
