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
pnpm test:analytics
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

## Analytics

Traffic and events use Umami Cloud. Vercel Web Analytics instrumentation and its package have been removed; Vercel Speed Insights stays for real-world performance metrics. Set `NEXT_PUBLIC_UMAMI_WEBSITE_ID` (the website UUID) in Vercel Production and redeploy. Do not commit the real ID; it is a public website identifier, not an API key. The tracker renders only when `NODE_ENV=production`, `VERCEL_ENV=production` and the ID is a valid UUID. Locally, in Preview and without the variable, the site ships no tracker and makes no Umami request.

When enabled, the page contains one `https://cloud.umami.is/script.js` and the tracker posts collections to `https://gateway.umami.is/api/send`. CSP allows only those two hosts. Pageviews and client-side navigations are automatic; query strings and hashes are excluded. Do Not Track is respected.

Four events are emitted from existing links: `cv_click`, `email_click`, `github_click` and `case_open` (with a `project` property: `soffia`, `ndc` or `meteor`). A click is not proof of an email being sent, a CV being read or a download completing.

Exclude your own visits per browser with `localStorage.setItem('umami.disabled', '1')`; remove it with `localStorage.removeItem('umami.disabled')`. Load the tracker once in production, navigate between routes and confirm the script tag stays single. Then check Umami manually: Realtime/Overview for pageviews, Events for the four names and the `project` property. Reload after changing the exclusion flag. In DevTools → Network, confirm the script loads once per document and `gateway.umami.is/api/send` receives one pageview per navigation and one custom event per tracked click. A case click followed by a destination pageview is expected, not a duplicate. The repository tests intercept Umami traffic, including manually created browser contexts; they cannot confirm what your dashboard received.

The configured-tracker regression uses a dummy ID and the same production build. Run it with `PLAYWRIGHT_PRODUCTION=1`, `VERCEL_ENV=production` and `NEXT_PUBLIC_UMAMI_WEBSITE_ID=3f7b2c1a-9d4e-4a6b-8c2d-1e5f7a9b0c3d`, then `pnpm exec playwright test tests/analytics.spec.ts --project=chromium --grep "configured production build"`. Clear those variables afterward. CI runs this separately from the unconfigured suite; neither run contacts Umami.

The privacy pages describe the confirmed Hobby plan's six-month analytics retention, separately from provider logs/backups and Vercel retention. Before real activation, validate the lawful basis, processor agreement and international transfers under [Peru's current data protection rules](https://www.gob.pe/institucion/anpd/normas-legales/6554453-16-2024-jus) and GDPR/ePrivacy where applicable. Cookie-free operation alone does not establish a consent exemption: the [AEPD guidance](https://www.aepd.es/guias/guia-cookies-analiticas-externas.pdf) sets conditions that require assessment. No marketing cookies or consent manager are added by this integration.

Official references: [collect data](https://docs.umami.is/docs/collect-data), [tracker configuration](https://docs.umami.is/docs/tracker-configuration), [track events](https://docs.umami.is/docs/track-events), [exclude your own visits](https://docs.umami.is/docs/exclude-my-own-visits).

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
