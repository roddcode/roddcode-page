import { SITE } from "@/lib/constants";
import Link from "next/link";

export function Handshake() {
  return (
    <section
      id="handshake"
      className="py-24 container-site content-visibility-auto scroll-mt-20"
    >
      <div className="max-w-2xl">
        <h2 className="text-4xl md:text-5xl mb-8 leading-tight">
          Initiate connection
        </h2>
        <p className="text-xs font-mono text-muted-foreground mb-4">
          Available for projects
        </p>
        <p className="text-lg text-secondary-foreground leading-relaxed mb-4">
          I help companies build production AI systems
          and replace legacy enterprise infrastructure.
        </p>
        <p className="text-sm text-muted-foreground mb-12">
          If your system with AI handles something that can't fail, let's talk 30 minutes. If I have nothing to contribute, I'll tell you in the first 10.
        </p>

        <div className="flex flex-wrap gap-4 mb-12">
          <Link
            href={SITE.cal}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book a 30-min call, opens in new tab"
            data-track="handshake-book-call"
            className="bg-foreground text-background hover:bg-foreground/90 px-8 py-4 text-sm font-medium transition-colors duration-100 ease-out active:scale-[0.98] active:will-change-transform inline-flex items-center gap-2"
            style={{ borderRadius: "2px" }}
          >
            Book a 30-min call — Free. No commitment.
          </Link>
          <Link
            href={`mailto:${SITE.email}?subject=Engineering%20Collaboration`}
            className="border border-border hover:border-muted-foreground/30 text-secondary-foreground hover:text-foreground px-8 py-4 text-sm font-sans transition-colors duration-100 ease-out active:scale-[0.98] active:will-change-transform inline-flex items-center"
            style={{ borderRadius: "2px" }}
          >
            Initiate Handshake →
          </Link>
        </div>

        <p className="text-sm text-secondary-foreground">
          ¿Hablas español? Escríbeme directo:{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {SITE.email}
          </a>
          <span className="ml-4">· Response &lt; 4h</span>
        </p>
      </div>
    </section>
  );
}
