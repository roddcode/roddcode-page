import { OPEN_SOURCE_PROJECTS } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";

const activityLogs = [
  "[1d ago] optimized reactive FSM tool transitions in SoffIA",
  "[2d ago] hardened session boundary token lifecycles",
  "[3d ago] published reactive-fsm v1.3.0 — 5 adapters, 86 tests",
];

export function TrustLayer() {
  return (
    <section
      id="trust"
      className="py-24 container-site content-visibility-auto scroll-mt-20"
    >
      <h2 className="text-4xl md:text-5xl mb-20 leading-tight">
        Trust signals
      </h2>

      {/* Testimonial */}
      <div className="max-w-3xl mb-20 relative">
        <span
          className="absolute -top-6 -left-2 text-8xl leading-none text-foreground opacity-10 select-none font-serif"
          aria-hidden
        >
          &ldquo;
        </span>
        <p className="text-3xl leading-snug text-foreground relative z-10 font-sans">
          Antes perdíamos leads los fines de semana. Ahora SoffIA los convierte
          mientras dormimos. Mi equipo llegó el lunes con 4 citas nuevas ya
          pagadas.
        </p>
        <p className="text-sm font-mono text-muted-foreground mt-6">
          — Dra. Jomara Herrera, Cirujana Dentista · Clínica Castro y Herrera
        </p>
      </div>

      {/* Tooling — open source */}
      <div className="mb-16 max-w-xl">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">
          TOOLING
        </p>
        <div className="flex flex-col">
          {OPEN_SOURCE_PROJECTS.map((project, i) => (
            <a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-16 group py-6 ${
                i < OPEN_SOURCE_PROJECTS.length - 1
                  ? "border-b border-border/40"
                  : ""
              }`}
            >
              <h3 className="text-base text-foreground leading-snug flex items-center gap-2 group-hover:text-primary transition-colors font-medium shrink-0 md:w-56">
                {project.name}
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.5}
                  className="text-muted-foreground group-hover:text-primary transition-colors"
                />
              </h3>
              <p className="text-sm text-secondary-foreground leading-relaxed grow">
                {project.description}
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* GitHub Activity */}
      <div className="flex flex-col gap-6 max-w-xl">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
          GitHub Activity
        </p>

        {/* Console Box */}
        <div className="bg-muted border border-border/50 rounded-sm p-4 font-mono text-xs shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]">
          <div className="flex items-center justify-between border-b border-border/20 pb-2 mb-3">
            <div className="flex gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
            </div>
            <span className="text-[10px] text-secondary-foreground select-none">
              roddcode@github: ~
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {activityLogs.map((log) => (
              <div
                key={log}
                className="text-secondary-foreground leading-relaxed flex gap-2"
              >
                <span className="text-primary select-none">$</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
