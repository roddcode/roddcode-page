# roddcode.com

Alejandro Alvarado's personal portfolio: backend, integrations and applied AI.

The site connects selected projects, professional experience, open-source code and essays. Spanish pages use unprefixed URLs; English pages use /en. Essays stay in English at /writing.

## Run locally

Use Node.js 24 and pnpm 9.5.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. No API keys or database are required. The booking demonstration uses fictional browser state.

## Verify

```sh
pnpm lint
pnpm validate:content
pnpm test:content
pnpm build
pnpm typecheck
pnpm exec playwright install chromium firefox webkit
```

Run browser tests against the production build:

```powershell
$env:PLAYWRIGHT_PRODUCTION = '1'
pnpm test
Remove-Item Env:PLAYWRIGHT_PRODUCTION
```

The suite runs the main regression tests in Chromium and focused layout/control checks in Firefox and WebKit. CI performs the same checks on pull requests and pushes to main. Visual inspection is still required for changes to layout or media.

Development mode includes compilation and debugging overhead. To evaluate interactions without that overhead, run pnpm build followed by pnpm start.

## Structure

```text
src/app/                    routes, metadata, RSS and sitemap
src/components/portfolio/   portfolio views and shared navigation
src/components/writing/     article lists, metadata and article footer
src/components/ui/          shared shadcn/Radix controls
src/content/portfolio/      shared facts and bilingual copy
src/content/work/{es,en}/   case narratives
src/content/writing/        English essays
src/lib/                    content loading and rendering
scripts/validate-content.mjs content integrity checks
tests/                      content and browser tests
```

Next.js App Router, React, TypeScript, Tailwind CSS, CSS Modules, next-intl and next-themes. Content is local; there is no CMS or application backend in this repository.

## Add a case study

1. Add an entry to src/content/portfolio/projects.ts with shared facts and ES/EN copy. Start with status: "draft"; change it to "published" when ready. featured independently controls inclusion on the home.
2. Add src/content/work/es/<slug>.mdx and its English counterpart. Use your own h2 section titles; the loader builds section anchors and the contents navigation.
3. Optionally register an image or diagram in src/components/portfolio/project-media.ts. Cases without a registered resource get a generic fallback.
4. Set relatedPosts and relatedPackages only when relevant. Package relationships distinguish actual use from a related problem.
5. Run pnpm validate:content and the verification commands above. Inspect both locales and themes on desktop and mobile.

Do not duplicate project facts between home, list and case headers. Shared metadata belongs in the registry; the MDX explains decisions and outcomes.

## Add an essay

Create src/content/writing/<slug>.mdx with a lowercase, hyphenated filename:

```mdx
---
title: "A concrete title"
date: "2026-11-12"
summary: "What the reader will learn."
themes: [backend]
draft: true
---

Your article.

## A section
```

Set draft: false (or remove it) to publish. Published articles appear in Writing, RSS and the sitemap. Drafts cannot be opened through the public article route. Use an underscore-prefixed filename or the ignored _drafts directory for incomplete local notes; these are never published. Do not commit private draft material.

Dates must be real YYYY-MM-DD calendar dates. If you include slug in frontmatter, it must match the filename. Invalid public-facing content fails validation rather than disappearing silently. Reading time is calculated; kind and series are optional metadata.

## Design and maintenance

- [DESIGN.md](DESIGN.md): tokens, typography, surfaces, spacing and motion.
- [ARCHITECTURE.md](ARCHITECTURE.md): component and content boundaries.
- [AGENTS.md](AGENTS.md): contributor instructions for coding agents.

Theme choice persists in local storage; language choice uses a functional cookie. Existing open-source page URLs redirect to the home section. Publication and external profile edits are separate from local verification.

## Dependency maintenance

Dependabot opens weekly version pull requests for the root pnpm project and for GitHub Actions. Minor and patch release updates are grouped; majors stay individual. Nothing is auto-merged.

Security updates follow a separate path: Dependabot raises them as soon as an advisory matches the lockfile, without waiting for the weekly schedule. That requires vulnerability alerts and Dependabot security updates to be enabled in GitHub repository settings. Confirm they are on rather than assuming it.

Both paths need review. `.github/workflows/security.yml` runs `pnpm install --frozen-lockfile` and `pnpm audit --audit-level=moderate` on a weekly schedule, on dependency changes, and on manual dispatch, auditing dev dependencies too and failing if the registry is unreachable. `.github/workflows/verify.yml` remains the full gate: lint, content checks, build, typecheck and browser tests. An audit is not a substitute for those checks, which is why dependency pull requests are never merged automatically.

Run `pnpm audit --audit-level=moderate` before publishing. When a new advisory lands, treat a patched dependency deploy as the fix, not the report.

The same pattern applies to other repositories, adapting the ecosystem, directory, package manager and Node version, and verifying the lockfile with a frozen install.

## License

Implementation code is available under the [MIT license](LICENSE). Portfolio copy, essays, documentation, CV, photographs, screenshots, logos and other media are reserved to their respective owners and are excluded from that license.

Las versiones visibles de las librerías proceden de npm y se cachean en el servidor durante 24 horas. Si el registro no responde, se oculta ese dato opcional; descripción y enlaces siguen disponibles. La versión utilizada en un caso histórico se documenta por separado.
