import { PAGE_METRICS } from "@/lib/constants";

export function LiveMetrics() {
  return (
    <section className="py-10 border-y border-border">
      <div className="container-site">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-8">
          THIS PAGE IN PRODUCTION
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {PAGE_METRICS.map((metric) => (
            <div key={metric.label} className="flex flex-col gap-2">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                {metric.label}
              </span>
              <span className="tabular-nums text-3xl text-primary leading-none font-mono">
                {metric.value}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs font-mono text-muted-foreground mt-8">
          Measured via Vercel Analytics. Updated every deploy.
        </p>
      </div>
    </section>
  );
}
