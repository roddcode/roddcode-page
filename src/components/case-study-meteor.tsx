import Image from "next/image";
import { CodeBlock } from "./code-block";
import { ProcessComparison } from "./process-comparison";

export function CaseStudyMeteor() {
  return (
    <section
      id="meteor"
      className="py-24 container-site content-visibility-auto scroll-mt-20"
    >
      <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">
        CASE STUDY 02 — METEOR
      </p>
      <h2 className="text-4xl md:text-5xl mb-12 leading-tight">
        CRM that replaced InConcert at Movistar
      </h2>

      {/* Result Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 max-w-2xl">
        {[
          { value: "53%", label: "Process time ↓" },
          { value: "$0", label: "License cost" },
          { value: "< 2 mo", label: "Payback period" },
          { value: "100%", label: "ROI achieved" },
        ].map((s) => (
          <div
            key={s.label}
            className="border border-border/60 rounded-sm p-5 text-center bg-muted/10"
          >
            <p className="text-2xl md:text-3xl font-mono text-primary tabular-nums mb-1">
              {s.value}
            </p>
            <p className="text-xs font-mono text-secondary-foreground uppercase tracking-wider">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Visual Proof */}
      <div className="mb-20 max-w-3xl">
        <Image
          src="/meteor-crm-dark.webp"
          alt="METEOR CRM — Leads Dashboard"
          width={1600}
          height={770}
          className="w-full h-auto rounded-sm border border-border/30"
          sizes="(max-width: 48rem) calc(100vw - 3rem), 45rem"
        />
      </div>

      <div className="flex flex-col gap-16 md:gap-20">
        {/* THE PROBLEM */}
        <div className="grid md:grid-cols-[160px_1fr] gap-10">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest pt-1">
            01 — The Problem
          </p>
          <div className="flex flex-col gap-4 text-secondary-foreground leading-relaxed max-w-2xl min-w-0">
            <p>
              Lead management and reporting depended on a third-party system
              (InConcert) that cost{" "}
              <span className="text-foreground font-medium">
                $1,000 USD/month
              </span>{" "}
              in licenses. Each lead process took 169 minutes, and generating
              reports required 30 minutes of manual work daily.
            </p>
            <p>
              Every custom report required a developer to write ad-hoc SQL
              queries — a bottleneck that delayed operational decisions by
              days. Agents had no self-service access to their own data.
            </p>
          </div>
        </div>

        {/* APPROACH */}
        <div className="grid md:grid-cols-[160px_1fr] gap-10">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest pt-1">
            02 — Approach
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-16 gap-y-10 max-w-4xl min-w-0">
            {[
              {
                n: "01",
                title: "Full-Stack Rewrite",
                body: "Replaced the monolithic InConcert UI with a Vue.js + Tailwind frontend and C# .NET backend, cutting process time by 53%.",
              },
              {
                n: "02",
                title: "SQL Server Migration",
                body: "All lead data migrated into a normalized SQL Server schema, eliminating the $1K/mo licensing cost entirely.",
              },
              {
                n: "03",
                title: "Real-Time Reporting",
                body: "Built on-demand reports (Excel, PDF, CSV) with configurable validation rules. Eliminated 30 min/day of manual reporting and the developer bottleneck for custom requests.",
              },
            ].map((d) => (
              <div key={d.n}>
                <p className="text-xs font-mono text-tertiary mb-3">{d.n}</p>
                <h3 className="text-lg mb-2 text-foreground leading-snug font-medium">
                  {d.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ARCHITECTURE DIAGRAM */}
        <div className="grid md:grid-cols-[160px_1fr] gap-10">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest pt-1">
          </p>
          <div className="max-w-3xl w-full flex flex-col gap-4 min-w-0">
            <svg viewBox="0 0 700 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto hidden md:block" role="img" aria-label="METEOR architecture: Vue.js SPA → .NET API with JWT Middleware → SQL Server with Stored Procedures">
              <title>METEOR Architecture</title>
              <defs>
                <marker id="arrow-meteor" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="oklch(0.6 0.15 45)" />
                </marker>
              </defs>
              <g fill="none" stroke="oklch(0.6 0.15 45)" strokeWidth={1.5}>
                <rect x="40" y="50" width="150" height="60" rx="4" />
                <rect x="270" y="50" width="150" height="60" rx="4" />
                <rect x="500" y="50" width="160" height="60" rx="4" />
              </g>
              <g stroke="oklch(0.6 0.15 45)" strokeWidth={1.5} markerEnd="url(#arrow-meteor)">
                <line x1="190" y1="80" x2="260" y2="80" />
                <line x1="420" y1="80" x2="490" y2="80" />
              </g>
              <g fill="oklch(0.95 0 0)" fontSize={14} fontWeight={500} textAnchor="middle" fontFamily="ui-monospace, monospace">
                <text x="115" y="85">Vue.js SPA</text>
                <text x="345" y="76">.NET API</text>
                <text x="345" y="94" fontSize={12} fill="oklch(0.65 0 0)">JWT Middleware</text>
                <text x="580" y="76">SQL Server</text>
                <text x="580" y="94" fontSize={12} fill="oklch(0.65 0 0)">Stored Procedures</text>
              </g>
            </svg>
            <div className="md:hidden flex flex-col gap-3">
              {[
                { step: "01", title: "Vue.js SPA", desc: "Tailwind CSS frontend consuming REST APIs" },
                { step: "02", title: ".NET API", desc: "JWT Middleware — access + refresh token rotation" },
                { step: "03", title: "SQL Server", desc: "Parameterized stored procedures for reporting" },
              ].map((s, i) => (
                <div key={s.step} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-sm border border-primary/40 bg-primary/5 flex items-center justify-center shrink-0">
                      <span className="text-xs font-mono text-primary">{s.step}</span>
                    </div>
                    {i < 2 && <div className="w-px h-6 bg-primary/20" />}
                  </div>
                  <div className="flex flex-col gap-0.5 pt-1">
                    <span className="text-sm font-medium text-foreground">{s.title}</span>
                    <span className="text-xs text-muted-foreground">{s.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* IMPACT */}
        <div className="grid md:grid-cols-[160px_1fr] gap-10">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest pt-1">
            03 — Impact
          </p>
          <div className="min-w-0">
            <ProcessComparison />
            <p className="text-xs font-mono text-muted-foreground mt-6">
              Stack: Vue.js · Tailwind CSS · C# .NET · SQL Server
            </p>
          </div>
        </div>

        {/* DEEP DIVE */}
        <div className="grid md:grid-cols-[160px_1fr] gap-10">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest pt-1">
            04 — Deep Dive
          </p>
          <div className="flex flex-col gap-10 max-w-3xl min-w-0">
            {/* JWT Auth */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-mono text-foreground uppercase tracking-widest">
                JWT Authentication — stateless session management
              </p>
              <p className="text-sm text-secondary-foreground leading-relaxed">
                Built a stateless auth flow with JWT and refresh tokens between
                the Vue.js SPA and the C# .NET API. Access tokens carried the
                user session in a signed claim, issued with short expiry and
                rotated transparently via refresh tokens stored in HttpOnly
                cookies. The token lifecycle was enforced middleware-side on
                every protected route, eliminating server-side session storage
                entirely.
              </p>
              <CodeBlock
                title="JwtRefreshMiddleware.cs"
                lang="C#"
                code={`public class JwtRefreshMiddleware
{
    private readonly RequestDelegate _next;

    public JwtRefreshMiddleware(RequestDelegate next) => _next = next;

    public async Task InvokeAsync(HttpContext context)
    {
        var accessToken = context.Request.Headers["Authorization"]
            .FirstOrDefault()?.Replace("Bearer ", "");

        if (accessToken is null)
        {
            await _next(context);
            return;
        }

        try
        {
            var principal = ValidateToken(accessToken);
            context.User = principal;
        }
        catch (SecurityTokenExpiredException)
        {
            var refreshToken = context.Request.Cookies["refresh_token"];
            if (refreshToken is null)
            {
                context.Response.StatusCode = 401;
                return;
            }

            var newAccessToken = await RotateRefreshToken(refreshToken);
            context.Response.Cookies.Append("refresh_token",
                newAccessToken.RefreshToken,
                new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict
                });

            context.Request.Headers["Authorization"] =
                $"Bearer {newAccessToken.AccessToken}";
            context.User = ValidateToken(newAccessToken.AccessToken);
        }

        await _next(context);
    }
}`}
              />
            </div>

            {/* Stored Procedures */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-mono text-foreground uppercase tracking-widest">
                SQL Server Stored Procedures — parameterized report generation
              </p>
              <p className="text-sm text-secondary-foreground leading-relaxed">
                All report queries lived in stored procedures with strict
                parameterized inputs, preventing injection and ensuring
                consistent execution plans. The frontend called a single .NET
                endpoint that executed the procedure, serialized the result
                into Excel/PDF/CSV on demand, and streamed it back — replacing
                30 minutes of daily manual work per agent with a 5-second
                download.
              </p>
              <CodeBlock
                title="usp_GenerateLeadReport.sql"
                lang="SQL"
                code={`CREATE PROCEDURE usp_GenerateLeadReport
    @StartDate DATE,
    @EndDate DATE
AS
BEGIN
    SELECT
        ClientName,
        Status,
        DATEDIFF(MINUTE, CreatedAt, ClosedAt)
            AS ProcessingTime
    FROM Leads
    WHERE CreatedAt BETWEEN @StartDate AND @EndDate
    ORDER BY CreatedAt DESC
END`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
