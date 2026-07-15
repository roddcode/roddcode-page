import { SITE } from "@/lib/constants";

export function Hero() {
  return (
    <section className="py-32 md:py-40 container-site">
      <div className="flex flex-col gap-8 max-w-4xl">
        <p
          className="text-sm font-mono text-muted-foreground animate-fade-in-up"
          style={{ animationDelay: "0ms" }}
        >
          Alejandro Alvarado
        </p>

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
          replacement at <span className="text-primary">Movistar</span>.
          Architecture that ships — milestone-based, not hourly.
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
