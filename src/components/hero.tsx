import { SITE } from "@/lib/constants";

export function Hero() {
  return (
    <section className="py-32 md:py-40 container-site">
      <div className="flex flex-col gap-8 max-w-4xl">
        <div className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: "0ms" }}>
          <span className="relative flex size-8 shrink-0">
            <img src="/alejandro.webp" alt="Alejandro Alvarado" className="size-8 rounded-full" />
            <span className="absolute -bottom-0.5 -right-0.5 flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-3 rounded-full bg-primary ring-2 ring-background" />
            </span>
          </span>
          <p className="text-sm font-mono text-muted-foreground">
            Alejandro Alvarado
          </p>
        </div>

        <h1
          className="text-5xl md:text-7xl leading-[1.05] tracking-tight text-pretty animate-fade-in-up"
          style={{ animationDelay: "0ms" }}
        >
          I build AI systems that don't
          <br />
          hallucinate in production.
        </h1>

        <p
          className="text-xl text-secondary-foreground font-sans font-normal max-w-2xl leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "60ms" }}
        >
          Autonomous agents at{" "}
          <span className="text-primary">$0.001/booking</span>. Enterprise CRM
          that replaced InConcert at{" "}
          <span className="text-primary">Movistar</span>.
        </p>

        <div
          className="flex flex-wrap gap-4 animate-fade-in-up"
          style={{ animationDelay: "120ms" }}
        >
          <a
            href="#meteor"
            className="bg-foreground text-background hover:bg-foreground/90 px-6 py-3 text-sm font-medium transition-colors duration-100 ease-out active:scale-[0.98] active:will-change-transform"
            style={{ borderRadius: "2px" }}
          >
            METEOR Case Study ↓
          </a>
          <a
            href={SITE.cal}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book a 30-min call, opens in new tab"
            data-track="hero-book-call"
            className="border border-border hover:border-muted-foreground/30 text-secondary-foreground hover:text-foreground px-6 py-3 text-sm font-sans transition-colors duration-100 ease-out active:scale-[0.98] active:will-change-transform"
            style={{ borderRadius: "2px" }}
          >
            Book a 30-min call →
          </a>
        </div>
      </div>
    </section>
  );
}
