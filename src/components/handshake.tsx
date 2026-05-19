import { SITE } from "@/lib/constants";
import Link from "next/link";

export function Handshake() {
  return (
    <section id="handshake" className="py-32 container-site">
      <div className="max-w-2xl">
        <h2 className="text-4xl md:text-5xl mb-8 leading-tight">
          Initiate connection
        </h2>
        <p className="text-lg text-[#a1a1a0] leading-relaxed mb-12">
          Available for AI infrastructure projects and senior engineering roles.
          If you need systems that close revenue gaps instead of creating
          technical debt, let&apos;s talk.
        </p>

        <div className="flex flex-wrap gap-4 mb-12">
          <Link
            href={SITE.cal}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-foreground text-background hover:bg-foreground/90 px-8 py-4 text-sm font-medium transition-all duration-100 ease-out will-change-transform active:scale-[0.98] inline-flex items-center gap-2"
            style={{ borderRadius: "2px" }}
          >
            Book Intro Call
            <span className="text-xs opacity-50 font-mono ml-1">cal.com</span>
          </Link>
          <Link
            href={`mailto:${SITE.email}?subject=Engineering%20Collaboration`}
            className="text-sm font-sans text-primary hover:text-foreground transition-all duration-100 ease-out will-change-transform active:scale-[0.98] px-8 py-4 inline-flex items-center"
          >
            Send Message →
          </Link>
        </div>

        <p className="text-sm font-mono text-muted-foreground">
          Prefer email?{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {SITE.email}
          </a>
          <span className="ml-4 opacity-50">· Response &lt; 4h</span>
        </p>
      </div>
    </section>
  );
}
