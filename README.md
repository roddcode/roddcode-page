# roddcode.com

Personal site of Alejandro Alvarado, AI and software engineer. Spanish is canonical, English is a mirror at `/en`.

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

Design decisions live in `DESIGN.md`. Copy rules, metrics and the visual system are documented there; if the code and that file disagree, the code is right.
