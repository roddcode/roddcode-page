import { OPEN_SOURCE_PROJECTS } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";

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
      className="py-24 container-site content-visibility-auto scroll-mt-20"
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
          Antes perdíamos leads los fines de semana. Ahora SoffIA los convierte
          mientras dormimos. Mi equipo llegó el lunes con 4 citas nuevas ya
          pagadas.
        </p>
        <p className="text-sm font-mono text-muted-foreground mt-6">
          — Dra. Jomara Herrera, Cirujana Dentista · Clínica Castro y Herrera
        </p>
      </div>

      {/* System fact */}
      <div className="border-l-2 border-primary/60 pl-6 max-w-2xl mb-20">
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

      {/* Tooling — open source */}
      <div className="mb-16 max-w-xl">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">
          TOOLING
        </p>
        <div className="flex flex-col">
          {OPEN_SOURCE_PROJECTS.map((project, i) => (
            <a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-16 group py-6 ${
                i < OPEN_SOURCE_PROJECTS.length - 1
                  ? "border-b border-border/40"
                  : ""
              }`}
            >
              <h3 className="text-base text-foreground leading-snug flex items-center gap-2 group-hover:text-primary transition-colors font-medium shrink-0 md:w-56">
                {project.name}
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.5}
                  className="text-muted-foreground group-hover:text-primary transition-colors"
                />
              </h3>
              <p className="text-sm text-secondary-foreground leading-relaxed grow">
                {project.description}
              </p>
            </a>
          ))}
        </div>
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
