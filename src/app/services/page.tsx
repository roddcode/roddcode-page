import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services | roddcode",
  description:
    "I build production AI systems for companies that lose money while nobody's watching. Autonomous agents from $3,000, CRM migration from $5,000, and technical audits from $500.",
};

const services = [
  {
    name: "Autonomous AI Agents",
    description:
      "WhatsApp agents that book, remind, and qualify leads 24/7 — with zero-hallucination architecture. Built for clinics, consultancies, and service businesses that lose leads after hours.",
    from: "$3,000",
    timeline: "3–6 weeks",
    highlights: ["<8s response time", "<8% no-show rate", "24/7 operation"],
  },
  {
    name: "Enterprise CRM Migration",
    description:
      "Replace legacy systems with modern stacks. Proven at Movistar (Telefónica): replaced InConcert, cut process time 53%, eliminated $1,000/month in licenses.",
    from: "$5,000",
    timeline: "1–3 months",
    highlights: [
      "Vue.js + .NET + SQL Server",
      "53% process time reduction",
      "ROI in < 2 months",
    ],
  },
  {
    name: "Technical Audit & Architecture",
    description:
      "A 2-hour deep-dive into your AI pipeline, your infrastructure, or your stack — with a written report and actionable recommendations. For teams whose systems touch money or schedules.",
    from: "$500",
    timeline: "2 hours + report",
    highlights: [
      "Architecture review",
      "Written report",
      "Actionable recommendations",
    ],
  },
];

const faq = [
  {
    question: "How long does it take?",
    answer:
      "Most autonomous agents ship in 3–6 weeks. CRM migrations take 1–3 months depending on scope. Audits take 2 hours and you get a written report the same day.",
  },
  {
    question: "What if it doesn't work?",
    answer:
      "Every project has milestones. You pay per milestone delivered. You see progress weekly. If something's not working, we catch it before it becomes a problem — not after.",
  },
  {
    question: "Is this the right thing for my company?",
    answer:
      "If you have a system that loses money while nobody's watching — leads going cold after hours, manual processes that shouldn't be manual, or a legacy CRM that costs more than it should — the 30-minute audit is free. If I can't help, I'll tell you.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <div className="py-24 container-site max-w-3xl">
        <Link
          href="/"
          className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to roddcode.com
        </Link>
      </div>

      <section className="pb-24 container-site">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl text-foreground mb-6 leading-tight">
            I build production AI systems for companies that lose money while
            nobody's watching.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-20 max-w-xl">
            Autonomous agents. Enterprise CRM migration. Technical audits. Based
            in Lima, working with clients in LATAM and the US.
          </p>

          <div className="flex flex-col gap-16">
            {services.map((s) => (
              <div
                key={s.name}
                className="border border-border/60 rounded-sm p-8 bg-muted/5"
              >
                <div className="flex flex-col gap-6">
                  <div>
                    <h2 className="text-2xl text-foreground font-medium mb-2">
                      {s.name}
                    </h2>
                    <p className="text-sm text-secondary-foreground leading-relaxed max-w-lg">
                      {s.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xl font-mono text-primary tabular-nums">
                      {s.from}
                    </span>
                    <span className="text-sm text-muted-foreground">{s.timeline}</span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {s.highlights.map((h) => (
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
            ))}
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="pb-24 container-site">
        <div className="max-w-3xl">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-8">
            See it in production
          </p>
          <Image
            src="/captura-crm-soffia.webp"
            alt="SoffIA CRM Dashboard"
            width={1517}
            height={908}
            className="w-full h-auto rounded-sm border border-border/30"
            sizes="(max-width: 48rem) calc(100vw - 3rem), 45rem"
          />
          <p className="text-xs font-mono text-muted-foreground mt-4">
            The SoffIA dashboard — real-time Revenue Board, lead pipeline, and
            push notifications. Built with Next.js and Supabase Realtime.
          </p>
        </div>
      </section>

      {/* Testimonial */}
      <section className="pb-24 container-site">
        <div className="max-w-2xl relative">
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
                desc: "30 minutes, free. We talk about what's broken, what it's costing you, and what you need. No pitch. No commitment.",
              },
              {
                step: "02",
                title: "I send you options.",
                desc: "2–3 approaches with prices, timelines, and trade-offs. You choose what fits. No scope creep — what you see is what we build.",
              },
              {
                step: "03",
                title: "We build in milestones.",
                desc: "You pay per milestone delivered. You see progress every week. If something needs to change, we change it — not at the end.",
              },
              {
                step: "04",
                title: "It ships, you keep it.",
                desc: "The system goes to production. You own the code. You own the infrastructure. No vendor lock-in. No monthly hostage fee.",
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
            {faq.map((q) => (
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
            Tell me about your system — leads, costs, bottlenecks. I'll tell you
            what's fixable, how long it takes, and what it costs. If I can't
            help, I'll tell you that too.
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
