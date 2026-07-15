const steps = [
  {
    step: "01",
    title: "You tell me the problem.",
    desc: "30 minutes, free. We talk about what's broken, what it's costing you, and what you need.",
  },
  {
    step: "02",
    title: "Architecture spec before code.",
    desc: "I design the architecture and share specs first. You see the plan before I write a single line.",
  },
  {
    step: "03",
    title: "I build in milestones.",
    desc: "You pay per milestone delivered. Code review at every step. You see progress every week.",
  },
  {
    step: "04",
    title: "It ships, you own it.",
    desc: "The system goes to production. You own the code. No vendor lock-in. Optional retainer post-deploy.",
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
