import type { Metadata } from "next";
import s from "./cv.module.css";

export const metadata: Metadata = {
  title: "Alejandro Alvarado — CV",
  description:
    "AI & Software Engineer. Deterministic control layer between LLMs and transactional systems.",
  robots: { index: true, follow: true },
};

const EXPERIENCE = [
  {
    title: "AI Systems Engineer",
    meta: "SoffIA — transactional AI agent for clinics",
    date: "2026",
    bullets: [
      "WhatsApp booking agent on a 10-state machine with PostgreSQL as the only authority: the model parses intent, deterministic gates validate and lock the row before commit.",
      "Response time 47 min → under 8 s; no-shows 25% → under 12%; $0.001 per booking; zero double bookings.",
      "Receipt OCR with anti-fraud rules, JIT reminders, real-time CRM dashboard.",
    ],
  },
  {
    title: "Software Engineer",
    meta: "Travel technology — Air Europa NDC 21.3",
    date: "2026",
    bullets: [
      "Implemented the seven NDC operations (AirShopping, OfferPrice, OrderCreate, OrderRetrieve, OrderChange, OrderCancel, UpSell) inside a multi-provider flight engine, against PROS.",
      "Hand-written SOAP/XML builders and parsers; strict contract mapping: baggage, fare types, age codes, multi-segment journeys. Fail-closed on any mismatch.",
      "Led the .NET 6 to .NET 10 migration alone.",
    ],
  },
  {
    title: "Full-stack Engineer",
    meta: "VML (WPP) — Movistar account",
    date: "2024–2025",
    bullets: [
      "Replaced InConcert with METEOR, a custom CRM: process time 169 → 79 minutes (53% less), $1,000/month in licences removed, ROI under two months.",
      "C#/.NET and Vue.js over SQL Server.",
    ],
  },
  {
    title: "Full-stack Developer",
    meta: "ITAW Group — logistics, transport, cargo and customs",
    date: "2024",
    bullets: [
      "End-to-end features across a commercial CRM and the SINTAD ERP, from requirements to delivery.",
      "C#/.NET, SQL Server, Angular; query optimisation on critical reports.",
    ],
  },
  {
    title: "Frontend Developer (contract)",
    meta: "Viapase",
    date: "2025",
    bullets: ["Legacy platform migration to React and TypeScript."],
  },
  {
    title: "Web Developer",
    meta: "WebemprendePE · Digital Buho",
    date: "2023–2024",
    bullets: ["Corporate sites, WordPress themes and plugins, Vue.js."],
  },
];

const OPEN_SOURCE = [
  {
    name: "reactive-fsm",
    detail:
      "Typed state machines that decide which tools an LLM may use. MIT, 86 tests, 5 adapters.",
  },
  {
    name: "exactly-once",
    detail: "Hold-and-commit idempotency for tool calls. MIT.",
  },
];

export default function CvPage() {
  return (
    <div className={s.page}>
      <div className={s.bar}>
        <a className={s.back} href="/">
          ← roddcode
        </a>
        <span className={s.hint}>Draft · PDF pending</span>
      </div>

      <main className={s.sheet}>
        <h1 className={s.name}>Alejandro Alvarado</h1>
        <p className={s.role}>AI &amp; Software Engineer</p>

        <p className={s.contact}>
          <span>Lima, Peru (UTC-5)</span>
          <a href="mailto:roddcode.dev@gmail.com">roddcode.dev@gmail.com</a>
          <a
            href="https://github.com/roddcode"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/roddcode
          </a>
          <a
            href="https://www.linkedin.com/in/alejandro-alvarado-roddcode/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://www.npmjs.com/~roddcode"
            target="_blank"
            rel="noopener noreferrer"
          >
            npmjs.com/~roddcode
          </a>
        </p>

        <p className={s.summary}>
          I build the deterministic control layer between LLMs and transactional
          systems: bookings, payments, customer state. Three years shipping
          software other people depend on, in C#/.NET, TypeScript and PostgreSQL.
          The model proposes; the database decides.
        </p>

        <section className={s.section}>
          <span className={s.label}>Experience</span>
          {EXPERIENCE.map((job) => (
            <article key={job.title + job.date} className={s.job}>
              <div className={s.jobHead}>
                <h2 className={s.jobTitle}>{job.title}</h2>
                <span className={s.jobDate}>{job.date}</span>
              </div>
              <p className={s.jobMeta}>{job.meta}</p>
              <ul className={s.bullets}>
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className={s.section}>
          <span className={s.label}>Open source</span>
          <ul className={s.list}>
            {OPEN_SOURCE.map((p) => (
              <li key={p.name}>
                <b>{p.name}</b> — {p.detail}
              </li>
            ))}
          </ul>
        </section>

        <section className={s.section}>
          <span className={s.label}>Stack</span>
          <p className={s.stackLine}>
            TypeScript · C#/.NET · Python · PostgreSQL · SQL Server · Redis ·
            Next.js · React · Azure · Docker · AKS · Serilog
          </p>
        </section>

        <section className={s.section}>
          <span className={s.label}>Languages</span>
          <p className={s.stackLine}>
            Spanish (native) · English (B1/B2, working)
          </p>
        </section>
      </main>
    </div>
  );
}
