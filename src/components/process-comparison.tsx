export function ProcessComparison() {
  return (
    <div className="w-full max-w-3xl">
      {/* Hero stat */}
      <div className="border border-border/60 rounded-sm p-8 text-center bg-muted/10 mb-6">
        <p className="text-5xl md:text-6xl font-mono text-primary tabular-nums leading-none mb-2">
          53%
        </p>
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          Process time reduction
        </p>
      </div>

      {/* Bar comparison */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center mb-8">
        <div className="text-right">
          <p className="text-2xl font-mono text-muted-foreground tabular-nums">
            169 min
          </p>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            Before
          </p>
        </div>
        <div className="w-24 flex flex-col gap-1.5">
          <div className="h-3 w-full bg-muted-foreground/20 rounded-sm relative overflow-hidden">
            <div className="h-full w-full bg-muted-foreground/40 rounded-sm" />
          </div>
          <div className="h-3 w-full bg-muted-foreground/20 rounded-sm relative overflow-hidden">
            <div className="h-full w-[47%] bg-primary rounded-sm" />
          </div>
        </div>
        <div>
          <p className="text-2xl font-mono text-primary tabular-nums">79 min</p>
          <p className="text-xs font-mono text-primary uppercase tracking-wider">
            After
          </p>
        </div>
      </div>

      {/* Key wins — compact */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            metric: "15 → 13",
            label: "Steps",
            detail: "2 process steps eliminated",
          },
          {
            metric: "3 → 1",
            label: "Tools",
            detail: "Consolidated into single CRM",
          },
          {
            metric: "$1K → $0",
            label: "Licensing",
            detail: "License cost eliminated",
          },
        ].map((w) => (
          <div
            key={w.label}
            className="border border-border/40 rounded-sm p-4 text-center bg-muted/[0.04]"
          >
            <p className="text-lg font-mono text-primary tabular-nums mb-0.5">
              {w.metric}
            </p>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
              {w.label}
            </p>
            <p className="text-[10px] text-muted-foreground leading-snug">
              {w.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
