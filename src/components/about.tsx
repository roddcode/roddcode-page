export function About() {
  return (
    <section className="py-24 container-site content-visibility-auto">
      <div className="border border-border/60 rounded-sm p-8 bg-muted/10 max-w-3xl">
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
              Español nativo · English (Technical)
            </span>
          </p>
          <a
            href="#handshake"
            className="text-xs font-mono text-muted-foreground/60 hover:text-foreground transition-colors mt-1 inline-block"
          >
            → Initiate connection
          </a>
        </div>
      </div>
    </section>
  );
}
