import { PrintButton } from "@/components/print-button";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CV — Rodrigo Alvarado | AI Engineer",
  description:
    "AI Engineer with 3 years shipping production software: LLM agents, deterministic control, .NET and PostgreSQL.",
  alternates: { canonical: "/cv" },
};

export default function CvPage() {
  return (
    <div className="container-site max-w-3xl py-24 md:py-32">
      <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/"
          className="text-sm font-mono text-muted-foreground transition-colors hover:text-foreground"
        >
          ← roddcode.com
        </Link>
        <PrintButton />
      </div>

      <header className="mb-12 border-b border-white/10 pb-8">
        <h1 className="mb-2 font-sans text-4xl font-medium tracking-tight md:text-5xl">
          Rodrigo Alvarado
        </h1>
        <p className="mb-4 font-mono text-sm text-primary">
          AI Engineer · LLM agents, deterministic control, .NET + TypeScript
        </p>
        <p className="text-sm leading-relaxed text-secondary-foreground">
          Lima, Peru (UTC-5) · {SITE.email} ·{" "}
          <a href={SITE.linkedin} className="underline hover:text-foreground">
            LinkedIn
          </a>{" "}
          ·{" "}
          <a href={SITE.github} className="underline hover:text-foreground">
            GitHub
          </a>{" "}
          · roddcode.com
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Also known as Alejandro Alvarado.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
          Summary
        </h2>
        <p className="text-sm leading-relaxed text-secondary-foreground">
          AI Engineer with 3 years shipping production software, including 10
          months building and operating a production conversational agent. I
          design the deterministic control layer between LLMs and critical
          databases: state machines, tool gating, row-level locks and
          idempotency. Enterprise integration background in .NET, Azure and
          SOAP/XML.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-primary">
          Experience
        </h2>

        <div className="mb-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-sans text-lg font-medium">
              CoreOS (SoffIA) · AI Engineer
            </h3>
            <span className="font-mono text-xs text-muted-foreground">
              Jan 2026 – Present · Remote
            </span>
          </div>
          <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-sm leading-relaxed text-secondary-foreground">
            <li>
              Built SoffIA, a multi-tenant WhatsApp booking and triage agent for
              clinics: 10-state finite state machine with PostgreSQL as the
              authority, deterministic tool gating, atomic row locks and
              idempotency.
            </li>
            <li>
              Reduced response time from 47 minutes to under 8 seconds, no-shows
              from 25% to under 8%, and cost to $0.001 per booking with zero
              double-booking deadlocks.
            </li>
            <li>
              Built OCR receipt validation with anti-fraud rules, just-in-time
              reminders, per-contact mutexes and a real-time CRM dashboard.
            </li>
            <li>
              Extracted two MIT libraries on npm: reactive-fsm (86 tests, 5
              adapters) and exactly-once (hold-and-commit idempotency with an MCP
              adapter).
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-sans text-lg font-medium">
              Tech-House (Expertia Travel) · Software Engineer
            </h3>
            <span className="font-mono text-xs text-muted-foreground">
              Jun 2026 – Oct 2026 · Remote
            </span>
          </div>
          <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-sm leading-relaxed text-secondary-foreground">
            <li>
              Integrated all 7 Air Europa NDC 21.3 operations into a
              multi-provider .NET flight engine against PROS SOAP/XML, recovering
              18 live offers per search for active travel agencies.
            </li>
            <li>
              Led the .NET 6 to .NET 10 engine migration as the sole engineer
              migrating, across 4 APIs, NuGet packages, Dockerfiles and major
              breaking changes; validated 50/50 GETs byte-for-byte plus a real
              write cycle.
            </li>
            <li>
              Built custom XML builders and parsers, provider contract mapping
              (baggage, fare codes, age mappings, multi-segment journeys), Azure
              Blob payload traceability and Serilog/Grafana/Loki telemetry.
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-sans text-lg font-medium">
              VML (WPP) · Fullstack Engineer
            </h3>
            <span className="font-mono text-xs text-muted-foreground">
              Dec 2024 – Dec 2025 · Lima
            </span>
          </div>
          <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-sm leading-relaxed text-secondary-foreground">
            <li>
              Built METEOR, the in-house CRM in C#/.NET, SQL Server and Vue.js
              that replaced InConcert for Movistar's digital operations.
            </li>
            <li>
              Reduced process time from 169 to 79 minutes (53%), agent reports
              from 30 to 5 minutes, and eliminated $1,000/month in licenses with
              ROI under 2 months.
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-sans text-lg font-medium">
              ITAW Group · Fullstack Developer
            </h3>
            <span className="font-mono text-xs text-muted-foreground">
              May 2024 – Nov 2024 · Callao
            </span>
          </div>
          <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-sm leading-relaxed text-secondary-foreground">
            <li>
              Delivered end-to-end features across logistics, transport, cargo
              and customs for a commercial CRM and an internal ERP based on
              SINTAD.
            </li>
            <li>
              Optimized critical SQL Server and MySQL queries, built REST APIs
              with SOLID principles and modernized legacy UI components.
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
          Skills
        </h2>
        <p className="text-sm leading-relaxed text-secondary-foreground">
          AI agents · LLM tool gating · Finite state machines · Idempotency ·
          TypeScript · C#/.NET · PostgreSQL · SQL Server · Azure · Docker ·
          Next.js · React · Python · LangGraph · Redis · REST · SOAP
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
          Education
        </h2>
        <p className="text-sm leading-relaxed text-secondary-foreground">
          SENATI · Tecnicatura en Desarrollo de Software · 2022–2025
          <br />
          Platzi · Web/Multimedia Management · 2022–2023
        </p>
      </section>

      <section>
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
          Languages
        </h2>
        <p className="text-sm leading-relaxed text-secondary-foreground">
          Spanish: native · English: professional working proficiency
        </p>
      </section>
    </div>
  );
}
