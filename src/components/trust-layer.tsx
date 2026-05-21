interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  payload: {
    size?: number;
    ref_type?: string;
    ref?: string;
    commits?: Array<{ message: string }>;
  };
  created_at: string;
}

function formatTimeAgo(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    if (Number.isNaN(diffMs) || diffMs < 0) return "active";

    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${Math.max(1, diffMins)}m ago`;
    }
    if (diffHours < 24) {
      return `${diffHours}h ago`;
    }
    return `${diffDays}d ago`;
  } catch {
    return "recently";
  }
}

function formatEvent(event: GitHubEvent): string {
  const repoName = event.repo.name.replace(/^roddcode\//, "");
  const timeAgo = formatTimeAgo(event.created_at);

  switch (event.type) {
    case "PushEvent": {
      const branch = event.payload.ref
        ? event.payload.ref.replace("refs/heads/", "")
        : "main";
      return `[${timeAgo}] pushed to ${branch} in ${repoName}`;
    }
    case "CreateEvent": {
      const refType = event.payload.ref_type || "repository";
      const refName = event.payload.ref ? ` "${event.payload.ref}"` : "";
      return `[${timeAgo}] created ${refType}${refName} in ${repoName}`;
    }
    case "WatchEvent":
      return `[${timeAgo}] starred ${repoName}`;
    case "PullRequestEvent":
      return `[${timeAgo}] active on pull request in ${repoName}`;
    default:
      return `[${timeAgo}] active on ${repoName}`;
  }
}

export async function TrustLayer() {
  let stats: {
    public_repos: number;
    followers: number;
    created_at: string;
  } | null = null;
  let events: GitHubEvent[] = [];

  try {
    const [statsRes, eventsRes] = await Promise.all([
      fetch("https://api.github.com/users/roddcode", {
        next: { revalidate: 3600 },
      }),
      fetch("https://api.github.com/users/roddcode/events", {
        next: { revalidate: 3600 },
      }),
    ]);

    if (statsRes.ok) {
      stats = await statsRes.json();
    }
    if (eventsRes.ok) {
      const rawEvents = await eventsRes.json();
      if (Array.isArray(rawEvents)) {
        events = rawEvents.slice(0, 3);
      }
    }
  } catch {
    // Silently fallback to static representation on fetch failures
  }

  // Fallback logs if API rate-limited or offline
  const fallbackLogs = [
    "[1d ago] optimized reactive FSM tool transitions in SoffIA",
    "[2d ago] hardened session boundary token lifecycles",
    "[3d ago] initialized core engine resilient-fetcher",
  ];

  return (
    <section
      id="trust"
      className="py-24 container-site content-visibility-auto"
    >
      <h2 className="text-4xl md:text-5xl mb-20 leading-tight">
        Trust signals
      </h2>

      {/* Testimonial */}
      <div className="max-w-3xl mb-20 relative">
        <span
          className="absolute -top-6 -left-2 text-8xl leading-none text-foreground opacity-10 select-none font-serif"
          aria-hidden
        >
          &ldquo;
        </span>
        <p className="text-3xl leading-snug text-foreground relative z-10 font-sans">
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
        <p className="text-sm text-secondary-foreground leading-relaxed">
          The production agent handles multi-patient bookings concurrently.
          Atomic room locking via PostgreSQL{" "}
          <code className="text-foreground bg-muted px-1.5 py-0.5 text-xs">
            FOR UPDATE SKIP LOCKED
          </code>
          , payment voucher OCR validation, and Google Calendar bidirectional
          sync — all within a single Vercel serverless function (60s budget).
          Zero cold-start failures.
        </p>
      </div>

      {/* GitHub stats & Real-time Console */}
      <div className="flex flex-col gap-6 max-w-xl">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            GitHub Activity
          </p>
          <p className="text-xs font-mono text-secondary-foreground tabular-nums">
            {stats ? (
              <>
                {stats.public_repos} repos · {stats.followers} followers ·
                Active since {new Date(stats.created_at).getFullYear()}
              </>
            ) : (
              <>Stats unavailable</>
            )}
          </p>
        </div>

        {/* Console Box */}
        <div className="bg-muted border border-border/50 rounded-sm p-4 font-mono text-xs shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]">
          <div className="flex items-center justify-between border-b border-border/20 pb-2 mb-3">
            <div className="flex gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
            </div>
            <span className="text-[10px] text-secondary-foreground select-none">
              roddcode@github: ~
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {events.length > 0
              ? events.map((event) => (
                  <div
                    key={event.id}
                    className="text-secondary-foreground leading-relaxed flex gap-2"
                  >
                    <span className="text-primary select-none">$</span>
                    <span className="break-all">{formatEvent(event)}</span>
                  </div>
                ))
              : fallbackLogs.map((log) => (
                  <div
                    key={log}
                    className="text-secondary-foreground leading-relaxed flex gap-2"
                  >
                    <span className="text-primary select-none">$</span>
                    <span>{log}</span>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
