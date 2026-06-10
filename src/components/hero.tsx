import { SITE } from "@/lib/constants";

export function Hero() {
  return (
    <section className="py-32 md:py-40 container-site">
      <div className="flex flex-col gap-8 max-w-4xl">
        <p
          className="text-sm font-mono text-muted-foreground animate-fade-in-up"
          style={{ animationDelay: "0ms" }}
        >
          {SITE.author}
        </p>

        <h1
          className="text-5xl md:text-7xl leading-[1.05] tracking-tight text-pretty animate-fade-in-up"
          style={{ animationDelay: "0ms" }}
        >
          Your most expensive operational
          <br />
          gap is what happens when
          <br />
          nobody's watching.
        </h1>

        <p
          className="text-xs font-mono text-muted-foreground animate-fade-in-up"
          style={{ animationDelay: "60ms" }}
        >
          SoffIA · Movistar · 3yr · Lima, PE · Open to remote
        </p>

        <p
          className="text-xl text-secondary-foreground font-sans font-normal max-w-2xl leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "120ms" }}
        >
          {/* [ALTERNATE 1] I build the infrastructure that captures value 24/7 — autonomous agents that convert after-hours leads, enterprise CRMs that replaced legacy systems at Movistar, and deterministic AI pipelines at $0.001 per booking. */}
          {/* [ALTERNATE 2] From replacing enterprise CRMs at Movistar to shipping autonomous agents at $0.001/booking — I build production systems that capture value 24/7. */}
          I ship autonomous agents at{" "}
          <span className="text-primary">$0.001/booking</span> and replaced
          enterprise CRMs at <span className="text-primary">Movistar</span> —
          production systems that capture value 24/7.
        </p>

        <div
          className="flex flex-wrap gap-4 mt-4 animate-fade-in-up"
          style={{ animationDelay: "240ms" }}
        >
          <a
            href="#background"
            className="bg-foreground text-background hover:bg-foreground/90 px-6 py-3 text-sm font-medium transition-colors duration-100 ease-out will-change-transform active:scale-[0.98]"
            style={{ borderRadius: "2px" }}
          >
            3yr Timeline →
          </a>
          <a
            href="#meteor"
            className="border border-border hover:border-muted-foreground/30 text-secondary-foreground hover:text-foreground px-6 py-3 text-sm font-sans transition-colors duration-100 ease-out will-change-transform active:scale-[0.98]"
            style={{ borderRadius: "2px" }}
          >
            METEOR Case Study ↓
          </a>
          <a
            href="#handshake"
            className="border border-border hover:border-muted-foreground/30 text-secondary-foreground hover:text-foreground px-6 py-3 text-sm font-sans transition-colors duration-100 ease-out will-change-transform active:scale-[0.98]"
            style={{ borderRadius: "2px" }}
          >
            Initiate Handshake →
          </a>
        </div>
      </div>
    </section>
  );
}
