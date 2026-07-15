import Link from "next/link";

const services = [
  {
    title: "Technical Audit",
    price: "from $1,500",
    desc: "2h deep-dive + written report. Find the bug before it finds you.",
  },
  {
    title: "Custom Build",
    price: "from $3,000",
    desc: "AI agents, CRMs, integrations. Milestone-based, not hourly.",
  },
  {
    title: "Post-Deploy Retainer",
    price: "from $1,500/mo",
    desc: "SLA <24h for bugs. Monthly review. Your system stays live.",
  },
];

export function ServicesPreview() {
  return (
    <section className="py-24 container-site">
      <h2 className="text-4xl md:text-5xl mb-12 leading-tight">Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        {services.map((s) => (
          <div
            key={s.title}
            className="border border-border/60 rounded-sm p-6 bg-muted/5 flex flex-col gap-3"
          >
            <p className="text-xs font-mono text-primary tabular-nums">{s.price}</p>
            <h3 className="text-lg text-foreground font-medium leading-snug">{s.title}</h3>
            <p className="text-sm text-secondary-foreground leading-relaxed grow">{s.desc}</p>
          </div>
        ))}
      </div>
      <Link
        href="/services"
        className="text-sm font-mono text-primary hover:text-foreground transition-colors inline-block mt-8"
      >
        [View full details →]
      </Link>
    </section>
  );
}
