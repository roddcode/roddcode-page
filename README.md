# roddcode.com

Personal site of Alejandro Alvarado. A professional portfolio refactor is in progress; its positioning is Backend & AI Engineer. Spanish is canonical, English is a mirror at `/en`. Existing essays remain in English at `/writing`.

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
src/app/[locale]/        home, both languages
src/app/(content)/       privacidad, seguridad
src/app/(writing)/       writing index and essays
src/app/api/locale/      explicit language switch
src/components/home/     page sections and the gate demo
src/components/layout/   Container and Section primitives
src/components/ui/       shadcn primitives
src/content/home/        es.ts (canonical) and en.ts (mirror)
public/logos/companies/  employer logos
tests/                   layout contract
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
