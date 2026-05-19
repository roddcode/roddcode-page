import { SITE } from "@/lib/constants";
import Link from "next/link";

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
          style={{ animationDelay: "120ms" }}
        >
          I engineer AI infrastructure
          <br />
          that closes revenue gaps.
        </h1>

        <p
          className="text-xl text-secondary-foreground font-sans font-normal max-w-2xl leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "240ms" }}
        >
          Currently: Architecting <span className="text-primary">SoffIA</span>,
          an autonomous agent that recovers 40% of lost patients for medical
          clinics via WhatsApp. Zero human intervention. 24/7.
        </p>

        <div
          className="flex flex-wrap gap-4 mt-4 animate-fade-in-up"
          style={{ animationDelay: "360ms" }}
        >
          <Link
            href="#case-study"
            className="bg-foreground text-background hover:bg-foreground/90 px-6 py-3 text-sm font-medium transition-all duration-100 ease-out will-change-transform active:scale-[0.98]"
            style={{ borderRadius: "2px" }}
          >
            View SoffIA Case Study ↓
          </Link>
          <Link
            href="#handshake"
            className="border border-border hover:border-[#3a3a39] text-[#a1a1a0] hover:text-foreground px-6 py-3 text-sm font-sans transition-all duration-100 ease-out will-change-transform active:scale-[0.98]"
            style={{ borderRadius: "2px" }}
          >
            Initiate Handshake →
          </Link>
        </div>
      </div>
    </section>
  );
}
