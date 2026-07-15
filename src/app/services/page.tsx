import { type Metadata } from "next";
import Image from "next/image";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "RoddCode | Services",
  description:
    "Production AI systems for transactional businesses. Autonomous agents, CRM migration, custom development, and technical audits — from $500.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="py-24 container-site">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl text-foreground mb-6 leading-tight">
            I build production AI systems for{" "}
            <span className="text-primary">
              companies that lose money while nobody is watching
            </span>
            .
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-20 max-w-xl">
            Autonomous agents. Enterprise CRM migration. Custom development.
            Technical audits. Remote — LATAM, Spain, and US clients.
          </p>

          <div className="flex flex-col gap-16">
            {/* AI Agents */}
            <div className="border border-border/60 rounded-sm p-8 bg-muted/5">
              <h2 className="text-2xl text-foreground font-medium mb-2 flex items-center gap-3">
                Autonomous AI Agents
                <span className="text-[10px] font-mono text-primary border border-primary/30 rounded-sm px-1.5 py-0.5">Most requested</span>
              </h2>
              <p className="text-sm text-secondary-foreground leading-relaxed max-w-lg mb-6">
                WhatsApp agents that book, remind, and qualify leads 24/7 — with
                zero-hallucination architecture. Built for clinics,
                consultancies, and service businesses that lose leads after
                hours.
              </p>

              <Image
                src="/captura-crm-soffia.webp"
                alt="AI Agent CRM Dashboard"
                width={1517}
                height={908}
                className="w-full h-auto rounded-sm border border-border/30 mb-6"
                sizes="(max-width: 48rem) calc(100vw - 3rem), 45rem"
              />

              <div className="flex items-center gap-4 mb-4">
                <span className="text-xl font-mono text-primary tabular-nums">
                  FROM $4,000
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

            {/* Custom Development */}
            <div className="border border-border/60 rounded-sm p-8 bg-muted/5">
              <h2 className="text-2xl text-foreground font-medium mb-2">
                Custom Development & Automation
              </h2>
              <p className="text-sm text-secondary-foreground leading-relaxed max-w-lg mb-6">
                Web applications, SaaS MVPs, API integrations, workflow
                automations — anything that turns manual processes into
                software. If your team is doing something a machine should do,
                let me build it.
              </p>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-xl font-mono text-primary tabular-nums">
                  FROM $3,000
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
                  "53% process time ↓",
                  "ROI in < 2 months",
                  "Stack-agnostic",
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
                  $1,500
                </span>
                <span className="text-sm text-muted-foreground">2 hours + report (first 5 clients at $800)</span>
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

            {/* Retainer */}
            <div className="border border-border/60 rounded-sm p-8 bg-muted/5">
              <h2 className="text-2xl text-foreground font-medium mb-2">
                Post-Deploy Retainer
              </h2>
              <p className="text-sm text-secondary-foreground leading-relaxed max-w-lg mb-6">
                SLA {'<'}24h for bugs, 1 monthly review call, uptime monitoring.
                New features are scoped separately — the retainer covers
                keeping your system running, not rebuilding it.
              </p>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-xl font-mono text-primary tabular-nums">
                  $1,500–3,000/month
                </span>
                <span className="text-sm text-muted-foreground">month-to-month, cancel anytime</span>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  "SLA < 24h for bugs",
                  "Monthly review call",
                  "Uptime monitoring",
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

      {/* Process */}
      <section className="pb-24 container-site">
        <div className="max-w-2xl">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-8">
            How it works
          </p>
          <div className="flex flex-col gap-6">
            {[
              { step: "01", title: "30-min call, free.", desc: "You tell me the problem. I tell you if I can help." },
              { step: "02", title: "Spec with prices.", desc: "2–3 approaches with timelines and trade-offs." },
              { step: "03", title: "Milestone-based build.", desc: "You pay per delivery. Code review at every step." },
              { step: "04", title: "You own the code.", desc: "No lock-in. Optional retainer post-deploy." },
            ].map((s) => (
              <div key={s.step} className="flex gap-6">
                <span className="text-xs font-mono text-primary tabular-nums shrink-0 pt-0.5">{s.step}</span>
                <div>
                  <p className="text-sm text-foreground font-medium mb-1">{s.title}</p>
                  <p className="text-sm text-secondary-foreground leading-relaxed">{s.desc}</p>
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
                  "During the build: you pay per milestone, so you never fund something broken — I catch failures before they ship. After launch: the Post-Deploy Retainer covers a <24h SLA fix. Without it, I still triage and quote the fix before it becomes your problem.",
              },
              {
                question: "How do we communicate during the build?",
                answer:
                  "Weekly async updates, plus a live call at each milestone. All specs, code, and docs in English.",
              },
              {
                question: "Do you work with startups outside LATAM?",
                answer:
                  "Yes. I work remotely with clients in LATAM, Spain, and the US. Payment in USD or EUR.",
              },
              {
                question: "What stack do you use?",
                answer:
                  "Next.js, TypeScript, .NET, PostgreSQL, DeepSeek, Docker. Stack-agnostic for legacy migrations — I've worked with Vue.js, Angular, SQL Server, and PHP.",
              },
              {
                question: "Can you work with my existing codebase?",
                answer:
                  "Yes. I specialize in taking over existing systems — whether it's fixing a broken AI agent, migrating a legacy CRM, or extending a codebase that needs architecture discipline.",
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
              aria-label="Book your free audit, opens in new tab"
              className="bg-foreground text-background hover:bg-foreground/90 px-8 py-4 text-sm font-medium transition-colors duration-100 ease-out active:scale-[0.98] active:will-change-transform inline-flex items-center"
              style={{ borderRadius: "2px" }}
            >
              Book your free audit
            </a>
            <a
              href={`mailto:${SITE.email}?subject=Services%20Inquiry`}
              className="border border-border hover:border-muted-foreground/30 text-secondary-foreground hover:text-foreground px-8 py-4 text-sm font-sans transition-colors duration-100 ease-out will-change-transform active:scale-[0.98] inline-flex items-center"
              style={{ borderRadius: "2px" }}
            >
              Prefer email? →
            </a>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            {SITE.email} · Response {'<'} 4h
          </p>
        </div>
      </section>
    </>
  );
}
