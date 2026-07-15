const steps = [
  {
    step: "01",
    title: "30-min call, free.",
    desc: "You tell me the problem. I tell you if I can help.",
  },
  {
    step: "02",
    title: "Spec with prices.",
    desc: "2–3 approaches with timelines and trade-offs. You choose what fits.",
  },
  {
    step: "03",
    title: "Milestone-based build.",
    desc: "You pay per delivery. Code review at every step. You see progress every week.",
  },
  {
    step: "04",
    title: "You own the code.",
    desc: "No lock-in. Optional retainer post-deploy. The system goes to production.",
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 container-site">
      <h2 className="text-4xl md:text-5xl mb-16 leading-tight">How I work</h2>
      <div className="flex flex-col gap-8 max-w-2xl">
        {steps.map((s) => (
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
    </section>
  );
}
