import Image from "next/image";
import Link from "next/link";
import { CodeBlock } from "./code-block";

export function CaseStudySoffia() {
  return (
    <section
      id="case-study"
      className="py-24 container-site content-visibility-auto scroll-mt-20"
    >
      <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">
        CASE STUDY 01 — SoffIA Core
      </p>
      <h2 className="text-4xl md:text-5xl mb-12 leading-tight">
        Architecture of an autonomous agent
      </h2>

      {/* Result Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20 max-w-xl">
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
            <p className="text-xs font-mono text-secondary-foreground uppercase tracking-wider">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Visual Proof */}
      <div className="flex flex-col gap-6 mb-20 max-w-3xl">
        <Image
          src="/captura-crm-soffia.webp"
          alt="SoffIA CRM Dashboard"
          width={1517}
          height={908}
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
              Dental and aesthetic clinics operate on a brutal conversion
              window: a lead unanswered for{" "}
              <span className="text-foreground font-medium">
                &gt;8 minutes has a ~80% chance of booking with a competitor
              </span>
              .
            </p>
            <ul className="flex flex-col gap-3 mt-2">
              <li className="flex gap-3">
                <span className="text-tertiary font-mono text-xs mt-1">—</span>
                <span>
                  <strong className="text-foreground font-medium">
                    After-hours leads: 100% loss rate.
                  </strong>{" "}
                  Messages received from 8 PM to 9 AM went cold by morning.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-tertiary font-mono text-xs mt-1">—</span>
                <span>
                  <strong className="text-foreground font-medium">
                    Peak-hour bottleneck:
                  </strong>{" "}
                  47-minute average WhatsApp response time during busy hours.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-tertiary font-mono text-xs mt-1">—</span>
                <span>
                  <strong className="text-foreground font-medium">
                    No-show rate: ~25%.
                  </strong>{" "}
                  Each no-show cost S/200–400 in blocked chair time.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-tertiary font-mono text-xs mt-1">—</span>
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
          <div className="max-w-3xl w-full flex flex-col gap-4 min-w-0">
            {/* Desktop diagram */}
            <svg
              viewBox="0 0 800 240"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto hidden md:block"
              role="img"
              aria-label="SoffIA ingress pipeline: Redis Buffer → Debounce Lock → QStash Enqueue → Idempotency Gate"
            >
              <title>SoffIA Ingress Pipeline</title>
              <defs>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="10"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="oklch(0.6 0.15 45)" />
                </marker>
              </defs>
              <g fill="none" stroke="oklch(0.6 0.15 45)" strokeWidth={1.5}>
                <rect x="40" y="90" width="140" height="60" rx="4" />
                <rect x="230" y="90" width="160" height="60" rx="4" />
                <rect x="440" y="90" width="160" height="60" rx="4" />
                <rect x="650" y="90" width="150" height="60" rx="4" />
              </g>
              <g
                stroke="oklch(0.6 0.15 45)"
                strokeWidth={1.5}
                markerEnd="url(#arrow)"
              >
                <line x1="180" y1="120" x2="220" y2="120" />
                <line x1="390" y1="120" x2="430" y2="120" />
                <line x1="600" y1="120" x2="640" y2="120" />
              </g>
              <g
                fill="oklch(0.95 0 0)"
                fontSize={14}
                fontWeight={500}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
              >
                <text x="110" y="125">
                  Redis Buffer
                </text>
                <text x="310" y="116">
                  Debounce Lock
                </text>
                <text x="310" y="134" fontSize={12} fill="oklch(0.65 0 0)">
                  (3s window)
                </text>
                <text x="520" y="116">
                  QStash Enqueue
                </text>
                <text x="520" y="134" fontSize={12} fill="oklch(0.65 0 0)">
                  (2s / 8s delay)
                </text>
                <text x="725" y="116">
                  Idempotency Gate
                </text>
                <text x="725" y="134" fontSize={12} fill="oklch(0.65 0 0)">
                  (msgId dedup)
                </text>
              </g>
            </svg>

            {/* Mobile vertical diagram */}
            <div className="md:hidden flex flex-col gap-3">
              {[
                { step: "01", title: "Redis Buffer", desc: "Rapid-fire coalescing of inbound WhatsApp messages" },
                { step: "02", title: "Debounce Lock", desc: "3s window per sender — coalesce rapid messages into one" },
                { step: "03", title: "QStash Enqueue", desc: "Deferred job: 2s for text, 8s for audio (Whisper)" },
                { step: "04", title: "Idempotency Gate", desc: "msgId dedup — duplicate messages are dropped" },
              ].map((s, i) => (
                <div key={s.step} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-sm border border-primary/40 bg-primary/5 flex items-center justify-center shrink-0">
                      <span className="text-xs font-mono text-primary">{s.step}</span>
                    </div>
                    {i < 3 && <div className="w-px h-6 bg-primary/20" />}
                  </div>
                  <div className="flex flex-col gap-0.5 pt-1">
                    <span className="text-sm font-medium text-foreground">{s.title}</span>
                    <span className="text-xs text-muted-foreground">{s.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] font-mono text-muted-foreground leading-relaxed">
              The ingress pipeline: inbound WhatsApp messages hit Redis for
              rapid-fire coalescing, acquire a debounce lock within a 3-second
              window, then enqueue a deferred QStash job — all before the LLM is
              ever invoked. Duplicate message IDs are dropped at the idempotency
              gate.
            </p>
          </div>
        </div>

        {/* ARCHITECTURAL PATTERNS */}
        <div className="grid md:grid-cols-[160px_1fr] gap-10">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest pt-1">
            03 — Architectural Patterns
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
                essay: "/writing/deterministic-ai",
                essayLabel: "Read: Deterministic AI →",
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
                {d.essay ? (
                  <Link
                    href={d.essay}
                    className="text-xs font-mono text-primary hover:text-foreground transition-colors mt-3 inline-block"
                  >
                    {d.essayLabel}
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* DEEP DIVE */}
        <div className="grid md:grid-cols-[160px_1fr] gap-10">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest pt-1">
            04 — Deep Dive
          </p>
          <div className="flex flex-col gap-10 max-w-3xl min-w-0">
            {/* Callout */}
            <div className="border-l-2 border-primary pl-5">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
                ARCHITECTURAL PRINCIPLE
              </p>
              <p className="text-sm text-secondary-foreground leading-relaxed">
                SoffIA is{" "}
                <strong className="text-foreground font-medium">
                  DB-Fat, LLM-Light
                </strong>
                : state management and business logic live in PostgreSQL via a
                deterministic flow protected by mutex locks. The LLM operates
                purely as a semantic router — stateless, enjaulado, and
                cost-controlled by the Loop Shield.
              </p>
            </div>

            {/* Production Constraint */}
            <div className="border-l-2 border-primary/60 pl-5">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
                PRODUCTION CONSTRAINT
              </p>
              <p className="text-sm text-secondary-foreground leading-relaxed">
                The production agent handles multi-patient bookings concurrently.
                Atomic room locking via PostgreSQL{" "}
                <code className="text-foreground bg-muted px-1.5 py-0.5 text-xs">
                  FOR UPDATE SKIP LOCKED
                </code>
                , payment voucher OCR validation, and Google Calendar bidirectional
                sync — all within a single Vercel serverless function (60s budget).
                Zero cold-start failures.
              </p>
            </div>

            {/* Loop Shield */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-mono text-foreground uppercase tracking-widest">
                Loop Shield — forced tool termination
              </p>
              <CodeBlock
                title="orchestrator.ts"
                code={`// LOOP SHIELD: From Step 4 onward, if tools appear in two consecutive
// steps, it's a cognitive loop. Tracks tool presence, not identity.
// Threshold is 4 because steps 1-3 are permitted critical transitions.
if (stepNumber >= 4) {
  const prevStepHadTools = (steps[stepNumber - 1]?.toolCalls?.length ?? 0) > 0;
  const prevPrevStepHadTools = (steps[stepNumber - 2]?.toolCalls?.length ?? 0) > 0;
  if (prevStepHadTools && prevPrevStepHadTools) {
    return { toolChoice: 'none' };
  }
}`}
              />
            </div>

            {/* Gate Refresh */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-mono text-foreground uppercase tracking-widest">
                Gate Refresh — mid-reasoning state injection
              </p>
              <CodeBlock
                title="orchestrator.ts"
                code={`// If gate advanced to GATE_SCHEDULE or GATE_IDENTITY and transaction
// tools are not yet registered, inject them.
if (
  (freshGate === 'GATE_SCHEDULE' || freshGate === 'GATE_IDENTITY') &&
  !allowedTools['reservar_cita_sota']
) {
  allowedTools['revisar_disponibilidad_sota'] = buildRevisarDisponibilidadTool(
    identityContext.org_id,
    identityContext.contact_id,
    identityContext.min_hours_notice
  );
  allowedTools['reservar_cita_sota'] = buildReservarCitaTool(
    identityContext.org_id,
    identityContext.contact_id,
    freshInterestId,
    freshName,
    freshDni,
    dbMeta.resolvedDeposit || '0',
    identityContext.bank_details_text,
    identityContext.min_hours_notice,
    activeOptionsArr
  );
}`}
              />
            </div>
          </div>
        </div>

        {/* THE RESULT */}
        <div className="grid md:grid-cols-[160px_1fr] gap-10">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest pt-1">
            05 — The Result
          </p>
          <div className="flex flex-col gap-6 max-w-2xl min-w-0">
            <div className="border-l-2 border-primary pl-5">
              <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">
                COST METRICS
              </p>
              <p className="text-sm text-secondary-foreground leading-relaxed">
                Avg cost per booking:{" "}
                <strong className="text-foreground">~$0.001</strong>
                <br />
                LLM calls per booking:{" "}
                <strong className="text-foreground">3–5</strong> (gate-gated,
                not open-ended)
                <br />
                Model: DeepSeek-V4 · ~2,400 tokens avg per booking
              </p>
            </div>
            <div className="w-full overflow-x-auto">
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
      </div>
    </section>
  );
}
