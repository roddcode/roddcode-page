# roddcode.com

Personal site of Alejandro Alvarado. Its positioning is Backend & AI Systems Engineer. Spanish is canonical, English is a mirror at `/en`. Existing essays remain in English at `/writing`.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · next-intl · Geist + Geist Mono.

## Run

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Verify before shipping

```bash
pnpm typecheck    # tsc --noEmit
pnpm lint         # biome
pnpm test         # layout, keyboard, locale, CV redirects and article metadata
pnpm build
pnpm og:contour   # recaptures the OG background (needs pnpm dev)
```

Run the same tests against the production build in PowerShell:

```powershell
$env:PLAYWRIGHT_PRODUCTION = '1'
pnpm test
Remove-Item Env:PLAYWRIGHT_PRODUCTION
```

The typography selector parser is overridden within v6 until the upstream plugin removes its vulnerable pin.

## Structure

```
src/app/[locale]/        home, work, open-source and about (ES/EN)
src/app/(content)/       privacidad, seguridad
src/app/(writing)/       preserved writing index and essays
src/app/api/locale/      explicit language switch with a local return path
src/components/portfolio/ shared shell, views and SoffIA illustration
src/content/portfolio/   typed metadata and bilingual shared copy
src/content/work/        independent ES/EN case narratives in MDX
src/content/writing/     existing published essays
src/lib/work.tsx         trusted local MDX compilation and heading index
tests/                   navigation, interaction and layout checks
```

## Project documentation

| Document | Responsibility |
|---|---|
| [AGENTS.md](AGENTS.md) | Agent entry point, limits and reading map |
| [PROJECT_SPEC.md](PROJECT_SPEC.md) | Accepted product scope and open visual direction |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Current implementation and the proposed transition |
| [DESIGN.md](DESIGN.md) | Visual system; historical layout descriptions are being reconciled with the refactor |
| [DECISIONS.md](DECISIONS.md) | Decisions and their acceptance state |
| [ROADMAP.md](ROADMAP.md) | Selected outcomes and sequence |
| [BACKLOG.md](BACKLOG.md) | Missing case details and evidence |
| [EVALS.md](EVALS.md) | Verification contract and observed baseline |

The user’s current instructions take precedence over historical documentation. Code describes what exists; it does not automatically override the intended product or accepted design.

## Add a project

Add a typed record in `src/content/portfolio/projects.ts`, then its narrative at `src/content/work/{es,en}/<slug>.mdx`. Use `status: "draft"` while preparing it; drafts do not enter public routes, indexes or the sitemap. `featured` controls its home placement separately from publication. `availability` describes the product or engagement, independently of publication status. Highlights and related essays/packages are optional.

Cases have their own headings rather than a fixed incident/results template. Heading links are generated during MDX compilation. `<ProjectHighlights />` reuses the optional registry excerpt inside a case. Only SoffIA includes `<BookingDemo />`; it uses synthetic browser state. Writing supports an optional `kind` (`essay`, `technical-note`, `research-note`) without requiring categories or changing existing articles.

The editorial structure is implemented. The visual direction remains deferred until the user supplies a reference; `/design-preview` is an unapproved, noindex experiment.
