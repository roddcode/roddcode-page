export function CaseStudyMeteor() {
  return (
    <section id="meteor" className="py-24 container-site">
      <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">
        CASE STUDY 02 — METEOR
      </p>
      <h2 className="text-4xl md:text-5xl mb-20 leading-tight">
        CRM that replaced InConcert at Movistar
      </h2>

      <div className="flex flex-col gap-20">
        {/* THE PROBLEM */}
        <div className="grid md:grid-cols-[160px_1fr] gap-10">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest pt-1">
            01 — The Problem
          </p>
          <div className="flex flex-col gap-4 text-secondary-foreground leading-relaxed max-w-2xl">
            <p>
              Lead management and reporting depended on a third-party system
              (InConcert) that cost{" "}
              <span className="text-foreground font-medium">
                $1,000 USD/month
              </span>{" "}
              in licenses. Each lead process took 169 minutes, and generating
              reports required 30 minutes of manual work daily.
            </p>
          </div>
        </div>

        {/* APPROACH */}
        <div className="grid md:grid-cols-[160px_1fr] gap-10">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest pt-1">
            02 — Approach
          </p>
          <div className="grid sm:grid-cols-2 gap-x-16 gap-y-10 max-w-3xl">
            {[
              {
                n: "01",
                title: "Full-Stack Rewrite",
                body: "Replaced the monolithic InConcert UI with a Vue.js + Tailwind frontend and C# .NET backend, cutting process time by 53%.",
              },
              {
                n: "02",
                title: "SQL Server Migration",
                body: "All lead data migrated into a normalized SQL Server schema, eliminating the $1K/mo licensing cost entirely.",
              },
            ].map((d) => (
              <div key={d.n}>
                <p className="text-xs font-mono text-primary mb-3">{d.n}</p>
                <h3 className="text-lg mb-2 text-foreground leading-snug font-medium">
                  {d.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* THE RESULT */}
        <div className="grid md:grid-cols-[160px_1fr] gap-10">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest pt-1">
            03 — The Result
          </p>
          <div className="w-full max-w-2xl overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[440px]">
              <thead>
                <tr>
                  <th className="pb-3 text-xs font-mono text-muted-foreground uppercase tracking-widest border-b border-border pr-8">
                    Metric
                  </th>
                  <th className="pb-3 text-xs font-mono text-muted-foreground uppercase tracking-widest border-b border-border pr-8">
                    Before
                  </th>
                  <th className="pb-3 text-xs font-mono text-muted-foreground uppercase tracking-widest border-b border-border">
                    After
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Process time", "169 min", "79 min (53% ↓)"],
                  ["Licensing cost", "$1,000 USD/mo", "$0 (eliminated)"],
                  ["Monthly ROI", "—", "53.79%"],
                  ["Payback period", "—", "< 2 months"],
                ].map(([metric, before, after]) => (
                  <tr
                    key={metric}
                    className="hover:bg-muted/40 transition-colors group"
                  >
                    <td className="py-4 text-sm text-secondary-foreground border-b border-border pr-8">
                      {metric}
                    </td>
                    <td className="py-4 text-sm text-muted-foreground border-b border-border pr-8 tabular-nums">
                      {before}
                    </td>
                    <td className="py-4 border-b border-border tabular-nums text-primary font-medium">
                      {after}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs font-mono text-muted-foreground mt-4">
              Stack: Vue.js · Tailwind CSS · C# .NET · SQL Server
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
