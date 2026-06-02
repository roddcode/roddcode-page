import { SITE } from "@/lib/constants";

export function About() {
  return (
    <section className="py-16 container-site content-visibility-auto">
      <div className="border border-border/60 rounded-sm p-8 bg-muted/10 max-w-3xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              ABOUT
            </p>
            <p className="text-sm text-secondary-foreground leading-relaxed">
              21 years old, 3 years of professional experience.
              <br />
              Building production systems since 18.
              <br />
              Remote-first · Lima, PE
              <br />
              SENATI — Computer Science · 2025 · Top cohort
              <br />
              <span className="text-muted-foreground">
                Español nativo · English B2 (Technical)
              </span>
            </p>
          </div>
          <a
            href="/cv-alejandro-alvarado-fullstack.pdf"
            download="Alejandro-Alvarado-CV-2026.pdf"
            className="inline-flex items-center gap-2 text-xs font-mono text-primary hover:text-foreground transition-colors border border-primary/40 hover:border-foreground/40 px-4 py-2.5 rounded-sm shrink-0"
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
        </div>
      </div>
    </section>
  );
}
