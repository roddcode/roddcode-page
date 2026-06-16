import { type Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Services | roddcode",
  description:
    "I build production AI systems for companies that lose money while nobody is watching. Autonomous agents, CRM migration, custom development, and technical audits — from $500.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="py-24 container-site">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl text-foreground mb-6 leading-tight">
            I build production AI systems for companies that lose money while
            nobody is watching.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-20 max-w-xl">
            Autonomous agents. Enterprise CRM migration. Custom development.
            Technical audits. Based in Lima, working with clients in LATAM and
            the US.
          </p>

          <div className="flex flex-col gap-16">
            {/* AI Agents */}
            <div className="border border-border/60 rounded-sm p-8 bg-muted/5">
              <h2 className="text-2xl text-foreground font-medium mb-2">
                Autonomous AI Agents
              </h2>
              <p className="text-sm text-secondary-foreground leading-relaxed max-w-lg mb-6">
                WhatsApp agents that book, remind, and qualify leads 24/7 — with
                zero-hallucination architecture. Built for clinics,
                consultancies, and service businesses that lose leads after
                hours.
              </p>

              <Image
                src="/captura-crm-soffia.webp"
                alt="SoffIA CRM Dashboard"
                width={1517}
                height={908}
                className="w-full h-auto rounded-sm border border-border/30 mb-6"
                sizes="(max-width: 48rem) calc(100vw - 3rem), 45rem"
              />

              <div className="flex items-center gap-4 mb-4">
                <span className="text-xl font-mono text-primary tabular-nums">
                  FROM $3,000
                </span>
                <span className="text-sm text-muted-foreground">3–6 weeks</span>
              </div>

              <div className="flex flex-wrap gap-3">
                {["<8s response time", "<8% no-show rate", "24/7 operation"].map(
                  (h) => (
                    <span
                      key={h}
                      className="text-xs font-mono text-muted-foreground border border-border/40 rounded-sm px-3 py-1"
                    >
                      {h}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* CRM Migration */}
            <div className="border border-border/60 rounded-sm p-8 bg-muted/5">
              <h2 className="text-2xl text-foreground font-medium mb-2">
                Enterprise CRM Migration
              </h2>
              <p className="text-sm text-secondary-foreground leading-relaxed max-w-lg mb-6">
                Replace legacy systems with modern stacks. Proven at Movistar
                (Telefónica): replaced InConcert, cut process time 53%,
                eliminated $1,000/month in licenses.
              </p>

              <Image
                src="/meteor-crm-dark.webp"
                alt="METEOR CRM — Leads Dashboard"
                width={1600}
                height={770}
                className="w-full h-auto rounded-sm border border-border/30 mb-6"
                sizes="(max-width: 48rem) calc(100vw - 3rem), 45rem"
              />

              <div className="flex items-center gap-4 mb-4">
                <span className="text-xl font-mono text-primary tabular-nums">
                  FROM $5,000
                </span>
                <span className="text-sm text-muted-foreground">1–3 months</span>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  "Vue.js + .NET + SQL Server",
                  "53% process time ↓",
                  "ROI in &lt; 2 months",
                ].map((h) => (
                  <span
                    key={h}
                    className="text-xs font-mono text-muted-foreground border border-border/40 rounded-sm px-3 py-1"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Audit */}
            <div className="border border-border/60 rounded-sm p-8 bg-muted/5">
              <h2 className="text-2xl text-foreground font-medium mb-2">
                Technical Audit & Architecture
              </h2>
              <p className="text-sm text-secondary-foreground leading-relaxed max-w-lg mb-6">
                A 2-hour deep-dive into your AI pipeline, your infrastructure,
                or your stack — with a written report and actionable
                recommendations. For teams whose systems touch money or
                schedules.
              </p>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-xl font-mono text-primary tabular-nums">
                  FROM $500
                </span>
                <span className="text-sm text-muted-foreground">2 hours + report</span>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  "Architecture review",
                  "Written report",
                  "Actionable next steps",
                ].map((h) => (
                  <span
                    key={h}
                    className="text-xs font-mono text-muted-foreground border border-border/40 rounded-sm px-3 py-1"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Custom Development */}
            <div className="border border-border/60 rounded-sm p-8 bg-muted/5">
              <h2 className="text-2xl text-foreground font-medium mb-2">
                Custom Development & Automation
              </h2>
              <p className="text-sm text-secondary-foreground leading-relaxed max-w-lg mb-6">
                Web applications, SaaS MVPs, API integrations, workflow
                automations — anything that turns manual processes into
                software. If your team is doing something a machine should do,
                let us build it.
              </p>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-xl font-mono text-primary tabular-nums">
                  FROM $2,000
                </span>
                <span className="text-sm text-muted-foreground">2–8 weeks</span>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  "Web apps & SaaS MVPs",
                  "API integrations",
                  "Workflow automation",
                ].map((h) => (
                  <span
                    key={h}
                    className="text-xs font-mono text-muted-foreground border border-border/40 rounded-sm px-3 py-1"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="pb-24 container-site">
        <div className="max-w-2xl relative">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">
            Trusted by
          </p>
          <span
            className="absolute -top-6 -left-2 text-8xl leading-none text-foreground opacity-10 select-none font-serif"
            aria-hidden
          >
            &ldquo;
          </span>
          <p className="text-2xl md:text-3xl leading-snug text-foreground relative z-10 font-sans">
            Antes perdíamos leads los fines de semana. Ahora SoffIA los
            convierte mientras dormimos. Mi equipo llegó el lunes con 4 citas
            nuevas ya pagadas.
          </p>
          <p className="text-sm font-mono text-muted-foreground mt-6">
            — Dra. Jomara Herrera, Cirujana Dentista · Clínica Castro y Herrera
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="pb-24 container-site">
        <div className="max-w-2xl">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-8">
            How it works
          </p>
          <div className="flex flex-col gap-8">
            {[
              {
                step: "01",
                title: "You tell me the problem.",
                desc: "30 minutes, free. We talk about what's broken, what it's costing you, and what you need.",
              },
              {
                step: "02",
                title: "I send you options.",
                desc: "2–3 approaches with prices, timelines, and trade-offs. You choose what fits.",
              },
              {
                step: "03",
                title: "We build in milestones.",
                desc: "You pay per milestone delivered. You see progress every week.",
              },
              {
                step: "04",
                title: "It ships, you keep it.",
                desc: "The system goes to production. You own the code. No vendor lock-in.",
              },
            ].map((s) => (
              <div key={s.step} className="flex gap-6">
                <span className="text-xs font-mono text-primary tabular-nums shrink-0 pt-0.5">
                  {s.step}
                </span>
                <div>
                  <p className="text-sm text-foreground font-medium mb-1">
                    {s.title}
                  </p>
                  <p className="text-sm text-secondary-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-24 container-site">
        <div className="max-w-2xl">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-8">
            FAQ
          </p>
          <div className="flex flex-col gap-8">
            {[
              {
                question: "What if it doesn't work?",
                answer:
                  "You pay per milestone delivered. You see progress every week. If something's not working, we catch it before it becomes a problem.",
              },
              {
                question: "What does the process look like?",
                answer:
                  "A 30-minute call (free). A proposal with 2–3 options. Milestone-based payment. You own everything at the end.",
              },
            ].map((q) => (
              <div key={q.question}>
                <p className="text-sm text-foreground font-medium mb-2">
                  {q.question}
                </p>
                <p className="text-sm text-secondary-foreground leading-relaxed">
                  {q.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 container-site border-t border-border/40">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl mb-8 leading-tight">
            Book a free 30-minute audit
          </h2>
          <p className="text-lg text-secondary-foreground leading-relaxed mb-4">
            Tell me about your system — leads, costs, bottlenecks. I will tell
            you what is fixable, how long it takes, and what it costs. If I
            can not help, I will tell you that too.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="https://cal.com/roddcode/intro"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-foreground text-background hover:bg-foreground/90 px-8 py-4 text-sm font-medium transition-colors duration-100 ease-out will-change-transform active:scale-[0.98] inline-flex items-center"
              style={{ borderRadius: "2px" }}
            >
              Book your free audit
            </a>
            <a
              href="mailto:devale.alvarado@gmail.com?subject=Services%20Inquiry"
              className="border border-border hover:border-muted-foreground/30 text-secondary-foreground hover:text-foreground px-8 py-4 text-sm font-sans transition-colors duration-100 ease-out will-change-transform active:scale-[0.98] inline-flex items-center"
              style={{ borderRadius: "2px" }}
            >
              Prefer email? →
            </a>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            devale.alvarado@gmail.com · Response &lt; 4h
          </p>
        </div>
      </section>
    </>
  );
}
