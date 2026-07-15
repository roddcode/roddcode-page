import { OPEN_SOURCE_PROJECTS } from "@/lib/constants";

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
          — Abraham Mantilla Elorriaga, Socio Comercial · SoffIA
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
              className="group flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-muted/20"
            >
              <span className="flex size-5 shrink-0 items-center justify-center font-mono text-xs text-foreground border border-border/40 rounded-sm">
                λ
              </span>
              <span className="w-24 shrink-0 truncate text-sm font-medium text-foreground sm:w-28">
                {project.name}
              </span>
              <span className="hidden min-w-0 flex-1 truncate text-sm text-muted-foreground md:block">
                {project.description}
              </span>
              <span className="hidden h-1 w-14 shrink-0 overflow-hidden rounded-full bg-border sm:block lg:w-20">
                <span className="block h-full rounded-full bg-primary transition-all duration-500 group-hover:bg-foreground" style={{ width: "100%" }} />
              </span>
              <span className="flex w-20 shrink-0 items-center justify-end gap-1 font-mono text-xs tabular-nums text-muted-foreground transition-colors group-hover:text-foreground-2">
                <span>86 tests · 5 adapters</span>
              </span>
            </a>
          ))}
        </div>
      </div>

    </section>
  );
}
