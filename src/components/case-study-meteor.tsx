import Image from "next/image";
import { ProcessComparison } from "./process-comparison";

export function CaseStudyMeteor() {
  return (
    <section
      id="meteor"
      className="py-24 container-site content-visibility-auto scroll-mt-20"
    >
      <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">
        CASE STUDY 02 — METEOR
      </p>
      <h2 className="text-4xl md:text-5xl mb-12 leading-tight">
        CRM that replaced InConcert at Movistar
      </h2>

      {/* Result Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 max-w-2xl">
        {[
          { value: "53%", label: "Process time ↓" },
          { value: "$0", label: "License cost" },
          { value: "< 2 mo", label: "Payback period" },
          { value: "100%", label: "ROI achieved" },
        ].map((s) => (
          <div
            key={s.label}
            className="border border-border/60 rounded-sm p-5 text-center bg-muted/10"
          >
            <p className="text-2xl md:text-3xl font-mono text-primary tabular-nums mb-1">
              {s.value}
            </p>
            <p className="text-xs font-mono text-secondary-foreground uppercase tracking-wider">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Visual Proof */}
      <div className="mb-20 max-w-3xl">
        <Image
          src="/meteor-crm-dark.webp"
          alt="METEOR CRM — Leads Dashboard"
          width={1600}
          height={770}
          className="w-full h-auto rounded-sm border border-border/30"
          sizes="(max-width: 48rem) calc(100vw - 3rem), 45rem"
        />
      </div>

      <div className="flex flex-col gap-20">
        {/* THE PROBLEM */}
        <div className="grid md:grid-cols-[160px_1fr] gap-10">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest pt-1">
            01 — The Problem
          </p>
          <div className="flex flex-col gap-4 text-secondary-foreground leading-relaxed max-w-2xl min-w-0">
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-16 gap-y-10 max-w-4xl min-w-0">
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
              {
                n: "03",
                title: "Real-Time Reporting",
                body: "Built on-demand reports (Excel, PDF, CSV) with configurable validation rules. Eliminated 30 min/day of manual reporting and the developer bottleneck for custom requests.",
              },
            ].map((d) => (
              <div key={d.n}>
                <p className="text-xs font-mono text-tertiary mb-3">{d.n}</p>
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

        {/* IMPACT */}
        <div className="grid md:grid-cols-[160px_1fr] gap-10">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest pt-1">
            03 — Impact
          </p>
          <div className="min-w-0">
            <ProcessComparison />
            <p className="text-xs font-mono text-muted-foreground mt-6">
              Stack: Vue.js · Tailwind CSS · C# .NET · SQL Server
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
