export async function TrustLayer() {
  let stats = null;
  try {
    const res = await fetch("https://api.github.com/users/roddcode", {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      stats = await res.json();
    }
  } catch {
    // Silently handle fetch errors and fallback
  }

  return (
    <section id="trust" className="py-32 container-site">
        <h2 className="text-4xl md:text-5xl mb-20 leading-tight">
          Trust signals
        </h2>

        {/* Testimonial */}
        <div className="max-w-3xl mb-20 relative">
          <span
            className="absolute -top-6 -left-2 text-8xl leading-none text-foreground opacity-10 select-none"
            style={{ fontFamily: "var(--font-eb-garamond)" }}
            aria-hidden
          >
            &ldquo;
          </span>
          <p
            className="text-3xl leading-snug text-foreground relative z-10"
            style={{ fontFamily: "var(--font-eb-garamond)", fontWeight: 400 }}
          >
            Le pregunté si tenía disponibilidad para mañana y en menos de 5
            segundos me dio horarios, me pidió mis datos, me registró y me dijo
            cuánto tenía que adelantar. Todo por WhatsApp. No tuve que llamar a
            nadie.
          </p>
          <p className="text-sm font-mono text-muted-foreground mt-6">
            — Beta patient, Valoración de Ortodoncia, May 2026
          </p>
        </div>

        {/* System fact */}
        <div className="border-l-2 border-border pl-6 max-w-2xl mb-20">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
            SYSTEM FACT
          </p>
          <p className="text-sm text-secondary-foreground font-mono leading-relaxed">
            The production agent handles multi-patient bookings concurrently.
            Atomic room locking via PostgreSQL{" "}
            <code className="text-foreground bg-muted px-1.5 py-0.5 text-xs">
              FOR UPDATE SKIP LOCKED
            </code>
            , payment voucher OCR validation, and Google Calendar
            bidirectional sync — all within a single Vercel serverless
            function (60s budget). Zero cold-start failures.
          </p>
        </div>

        {/* GitHub stats */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
            GitHub Activity
          </p>
          <div className="flex gap-[3px] flex-wrap max-w-sm">
            {Array.from({ length: 42 }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 ${
                  i % 7 === 0
                    ? "bg-muted-foreground"
                    : i % 5 === 0
                    ? "bg-[#3a3a39]"
                    : i % 3 === 0
                    ? "bg-[#262625]"
                    : "bg-border"
                }`}
              />
            ))}
          </div>
          <p className="text-xs font-mono text-muted-foreground tabular-nums">
            {stats ? (
              <>
                {stats.public_repos} repos · {stats.followers} followers ·
                Active since {new Date(stats.created_at).getFullYear()}
              </>
            ) : (
              <>Fetching live stats...</>
            )}
          </p>
        </div>
    </section>
  );
}
