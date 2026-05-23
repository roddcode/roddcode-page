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
        <p className="text-lg text-secondary-foreground leading-relaxed mb-4">
          Evaluating full-stack and AI engineering roles at product companies
          where systems reach real users.
        </p>
        <p className="text-sm text-muted-foreground mb-12">
          If you ship production systems people actually use, let&apos;s talk.
        </p>

        <div className="flex flex-wrap gap-4 mb-12">
          <a
            href="/cv-alejandro-alvarado-fullstack.pdf"
            download="Alejandro-Alvarado-CV-2026.pdf"
            className="bg-foreground text-background hover:bg-foreground/90 px-8 py-4 text-sm font-medium transition-colors duration-100 ease-out will-change-transform active:scale-[0.98] inline-flex items-center gap-2"
            style={{ borderRadius: "2px" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>Download CV</title>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download CV — ES (PDF)
          </a>
          <Link
            href={`mailto:${SITE.email}?subject=Engineering%20Collaboration`}
            className="border border-border hover:border-muted-foreground/30 text-secondary-foreground hover:text-foreground px-8 py-4 text-sm font-sans transition-colors duration-100 ease-out will-change-transform active:scale-[0.98] inline-flex items-center"
            style={{ borderRadius: "2px" }}
          >
            Send Message →
          </Link>
          <Link
            href={SITE.cal}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors px-8 py-4 inline-flex items-center gap-2 border border-border/40 hover:border-muted-foreground/30 rounded-sm"
          >
            Book Intro Call
            <span className="text-[10px] font-mono text-muted-foreground">
              · International
            </span>
          </Link>
        </div>

        <p className="text-sm text-muted-foreground">
          Prefer email?{" "}
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
