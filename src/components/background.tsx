const milestones = [
  {
    period: "Jan 2026 → Present",
    title: "Core OS — AI Engineer",
    location:
      "SoffIA Agent · Freelance contractor · Clínica dental real · 5 mo — Direct owner, full autonomy. Transitioned from enterprise frontend to AI infrastructure by building SoffIA end-to-end: first LLM system, designed and deployed without prior AI team.",
    body: [
      "Architected fully autonomous conversational agent with LLMs in transactional pipeline — 24/7 booking via WhatsApp. Response time: 47 min → < 8s. No-show rate: 25% → < 8%.",
      "Reactive FSM with in-flight tool injection, stateless JIT reminders via QStash, OCR validation, Google Calendar sync — all within a single Vercel serverless function. Zero cold-start failures.",
      "Built real-time CRM dashboard: Revenue Board, lead pipeline visualization, push notifications. Lighthouse 99/100.",
      "Stack: Next.js (Base-8 Layout), TypeScript (Discriminated Unions), DeepSeek-V4, PostgreSQL, Supabase, Docker.",
    ],
  },
  {
    period: "Dec 2024 → Dec 2025",
    title: "VML (WPP) — Frontend Engineer",
    location:
      "Movistar (Telefónica) Account · 1 yr — Sole frontend, reported to CTO",
    body: [
      "Designed and built METEOR, a CRM that replaced InConcert at Movistar Perú. Vue.js + Tailwind CSS frontend, C# .NET + SQL Server backend.",
      "Reduced operational process time from 169 min to 79 min (53% ↓). Eliminated $1,000 USD/month in third-party licensing costs. ROI recovered in < 2 months.",
      "Built REST APIs for intelligent lead querying, e-commerce integrations (idempotent webhooks), and real-time reporting dashboards. Landed national-scale campaign pages and email templates.",
    ],
  },
  {
    period: "May 2024 → Nov 2024",
    title: "ITAW Group — Fullstack Developer",
    location: "Logistics ERP · 7 mo — Fullstack ownership of ERP modules",
    body: [
      "Developed REST APIs and business logic for an internal logistics ERP using C# .NET, SQL Server, and MySQL.",
      "Optimized complex SQL queries cutting critical report processing time by 30%. Automated business processes with Python scripts.",
    ],
  },
  {
    period: "Dec 2023 → May 2024",
    title: "Digital Buho SAC — Web Developer Intern",
    location: "First role at 18 · 6 mo — Foundation in production web",
    body: [
      "Built corporate websites with WordPress and Vue.js. Technical incident management and responsive layout implementation.",
    ],
  },
];

export function Background() {
  return (
    <section
      id="background"
      className="py-24 container-site content-visibility-auto"
    >
      <h2 className="text-4xl md:text-5xl mb-16 leading-tight">Background</h2>
      <div className="flex flex-col gap-16">
        {milestones.map((m) => (
          <div
            key={m.title}
            className="grid md:grid-cols-[120px_1fr] gap-6 md:gap-12"
          >
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest pt-1 leading-relaxed">
              {m.period}
            </p>
            <div>
              <div className="flex flex-col gap-1 mb-4">
                <h3 className="text-xl text-foreground font-medium leading-snug">
                  {m.title}
                </h3>
                <p className="text-xs font-mono text-muted-foreground">
                  {m.location}
                </p>
              </div>
              <ul className="flex flex-col gap-3">
                {m.body.map((line) => (
                  <li
                    key={line}
                    className="text-sm text-secondary-foreground leading-relaxed flex gap-3"
                  >
                    <span className="text-tertiary font-mono text-xs mt-1 select-none">
                      —
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
