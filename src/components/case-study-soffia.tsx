import { ArchitectureDiagram } from "./architecture-diagram";

export function CaseStudySoffia() {
  return (
    <section id="case-study" className="py-24 container-site">
      <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">
        CASE STUDY 01 — SoffIA Core
      </p>
      <h2 className="text-4xl md:text-5xl mb-12 leading-tight">
        Architecture of an autonomous agent
      </h2>

      {/* Result Highlights */}
      <div className="grid grid-cols-3 gap-4 mb-20 max-w-xl">
        {[
          { value: "< 8s", label: "Response time" },
          { value: "100%", label: "Leads captured" },
          { value: "< 8%", label: "No-show rate" },
        ].map((s) => (
          <div
            key={s.label}
            className="border border-border/60 rounded-sm p-5 text-center bg-muted/10"
          >
            <p className="text-2xl md:text-3xl font-mono text-primary tabular-nums mb-1">
              {s.value}
            </p>
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-20">
        {/* THE PROBLEM */}
        <div className="grid md:grid-cols-[160px_1fr] gap-10">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest pt-1">
            01 — The Problem
          </p>
          <div className="flex flex-col gap-4 text-secondary-foreground leading-relaxed max-w-2xl">
            <p>
              Dental and aesthetic clinics operate on a brutal conversion
              window: a lead unanswered for{" "}
              <span className="text-foreground font-medium">
                &gt;8 minutes has a ~80% chance of booking with a competitor
              </span>
              .
            </p>
            <ul className="flex flex-col gap-3 mt-2">
              <li className="flex gap-3">
                <span className="text-primary font-mono text-xs mt-1">—</span>
                <span>
                  <strong className="text-foreground font-medium">
                    After-hours leads: 100% loss rate.
                  </strong>{" "}
                  Messages received from 8 PM to 9 AM went cold by morning.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-mono text-xs mt-1">—</span>
                <span>
                  <strong className="text-foreground font-medium">
                    Peak-hour bottleneck:
                  </strong>{" "}
                  47-minute average WhatsApp response time during busy hours.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-mono text-xs mt-1">—</span>
                <span>
                  <strong className="text-foreground font-medium">
                    No-show rate: ~25%.
                  </strong>{" "}
                  Each no-show cost S/200–400 in blocked chair time.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-mono text-xs mt-1">—</span>
                <span>
                  <strong className="text-foreground font-medium">
                    Manual errors:
                  </strong>{" "}
                  Double-bookings and missing reminders were standard.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* THE ARCHITECTURE */}
        <div className="grid md:grid-cols-[160px_1fr] gap-10">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest pt-1">
            02 — The Architecture
          </p>
          <div className="max-w-3xl w-full">
            <ArchitectureDiagram />
          </div>
        </div>

        {/* KEY ENGINEERING DECISIONS */}
        <div className="grid md:grid-cols-[160px_1fr] gap-10">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest pt-1">
            03 — Key Decisions
          </p>
          <div className="grid sm:grid-cols-2 gap-x-16 gap-y-10 max-w-3xl">
            {[
              {
                n: "01",
                title: "Reactive FSM (In-Flight Refresh)",
                body: "Using Vercel AI SDK's prepareStep to inject tools dynamically mid-reasoning, eliminating deadlocks and hallucinated confirmations.",
              },
              {
                n: "02",
                title: "Stateless JIT Reminders (QStash)",
                body: "No cron, no persistent state. A JIT Guard checks appointment validity before each T-24h/T-2h send, killing race conditions cold.",
              },
              {
                n: "03",
                title: "Progressive Tool Gating",
                body: "The LLM only receives tools relevant to its current gate (Identity vs Booking), guided by strict Zod telemetry. Anti-hallucination by architecture.",
              },
              {
                n: "04",
                title: "Non-Negotiable Guardrails",
                body: "Zero-token Noise Guard for IVRs. Strict regex interventions for Code Red, minors, and trolls — triggering instant human handoff.",
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
            04 — The Result
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
                  [
                    "Response time",
                    "47 min / ∞ (after hours)",
                    "< 8 seconds, 24/7",
                  ],
                  ["After-hours leads", "0% (100% loss)", "100% captured"],
                  ["No-show rate", "~25%", "< 8%"],
                  [
                    "Booking deadlocks",
                    "Chronic (race conditions)",
                    "Zero (Reactive FSM)",
                  ],
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
          </div>
        </div>
      </div>
    </section>
  );
}
