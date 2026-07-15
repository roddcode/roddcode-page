import { OPEN_SOURCE_PROJECTS } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";

export function TrustLayer() {
  return (
    <section
      id="trust"
      className="py-24 container-site content-visibility-auto scroll-mt-20"
    >
      <h2 className="text-4xl md:text-5xl mb-20 leading-tight">
        Trust signals
      </h2>

      <div className="flex items-center gap-2 mb-16">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
        </span>
        <span className="text-xs font-mono text-muted-foreground">Building in production since 2023</span>
      </div>

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

      {/* Testimonial 2 — Abraham */}
      <div className="max-w-3xl mb-20 relative">
        <span
          className="absolute -top-6 -left-2 text-8xl leading-none text-foreground opacity-10 select-none font-serif"
          aria-hidden
        >
          &ldquo;
        </span>
        <p className="text-3xl leading-snug text-foreground relative z-10 font-sans">
          Trabajé con devs toda mi carrera. Alejandro es el único que entregaba
          antes de que el cliente lo pidiera. Eso no es desarrollo. Es
          anticipación.
        </p>
        <p className="text-sm font-mono text-muted-foreground mt-6">
          — Abraham Mantilla Elorriaga, Especialista en Generación de Demanda
          B2B · SoffIA
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
              aria-label="reactive-fsm on npm, opens in new tab"
              className={`flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-16 group py-6 ${
                i < OPEN_SOURCE_PROJECTS.length - 1
                  ? "border-b border-border/40"
                  : ""
              }`}
            >
              <h3 className="text-base text-foreground leading-snug flex items-center gap-2 group-hover:text-foreground transition-colors font-medium shrink-0 md:w-56">
                {project.name}
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.5}
                  className="text-muted-foreground group-hover:text-foreground transition-colors"
                />
              </h3>
              <p className="text-sm text-secondary-foreground leading-relaxed grow">
                {project.description}
              </p>
            </a>
          ))}
        </div>
      </div>

    </section>
  );
}
