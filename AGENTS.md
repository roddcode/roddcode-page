# AGENTS.md — roddcode.com

## UI and design system

- Read `./DESIGN.md` before any UI change.
- Reuse the components in `src/components/`. Do not rebuild buttons, cards, inputs or navigation with page-level CSS.
- Do not invent colors, spacing, radii, typography or shadows outside `DESIGN.md`.
- If a pattern is missing, add it to `DESIGN.md` or document it before implementing it.
- After changing tokens, run:

```powershell
npx -p "@google/design.md" designmd lint DESIGN.md
```

- Before committing, run:

```powershell
pnpm typecheck
pnpm build
```

## Stack

Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript · Framer Motion.

## Rules

- No gradient mesh blobs, purple/cyan glows or decorative particles.
- No public low-ticket pricing on the root portfolio.
- No outer drop shadows or glassmorphism.
- No hover-only interactions without a touch fallback.
- No text below 12px.
- No `100vh`; use `100dvh` or `100svh`.
- Every metric, price, timestamp and ID uses `tabular-nums`.

## Commands

```powershell
pnpm dev
pnpm build
pnpm typecheck
pnpm lint
```
