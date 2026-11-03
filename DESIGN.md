---
version: 3.0
name: roddcode — instrument, not magazine
description: "A working engineer's site. Paper and night, sans only, color reserved for state. No serif, no glass, no gradients."
colors:
  paper: "#f7f5f0"
  paper-raised: "#fdfbf6"
  ink: "#15171a"
  ink-2: "#24262a"
  ink-3: "#4e5157"
  ink-4: "#6b6e74"
  ink-5: "#8b8e94"
  line: "#e4e0d6"
  line-soft: "#efebe2"
  accent: "#1f4e8c"
  accent-hover: "#193f73"
  accent-night: "#5b9bff"
  pass: "#2f9e4f"
  pass-ink: "#1d6b3c"
  pass-bg: "#eaf5ed"
  pass-night: "#8adf9b"
  fail: "#b4433a"
  fail-ink: "#9c3227"
  fail-bg: "#fbeeec"
  night: "#0f1411"
  night-raised: "#17201b"
  night-line: "#222b26"
  night-ink: "#e8eae5"
  night-ink-strong: "#f1f3ef"
  night-muted: "#adb4ae"
typography:
  family-sans: Geist
  family-mono: Geist Mono
  hero:
    fontFamily: Geist
    fontSize: clamp(40px, 5vw, 64px)
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: -0.03em
  h2:
    fontFamily: Geist
    fontSize: clamp(28px, 3.2vw, 40px)
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: -0.02em
  body:
    fontFamily: Geist
    fontSize: 15px
    lineHeight: 1.65
  button:
    fontFamily: Geist
    fontSize: 15px
    fontWeight: 500
    textDecoration: none
  mono:
    fontFamily: Geist Mono
    fontSize: 12px
    fontWeight: 500
    letterSpacing: 0.04em
    textTransform: uppercase
layout:
  container: 1240px
  gutter: clamp(18px, 4vw, 24px)
  section-gap: clamp(56px, 8vw, 112px)
  measure-prose: 65ch
radius:
  control: 8px
  card: 14px
  pill: 999px
spacing:
  scale: "4 · 8 · 12 · 16 · 24 · 32 · 48 · 64"
motion:
  ease-standard: cubic-bezier(0.22, 0.61, 0.36, 1)
  ease-panel: cubic-bezier(0.16, 1, 0.3, 1)
  duration-panel: 420ms
---

# roddcode — design system

This documents what the build actually does. If the code and this file disagree, the code wins and this file is wrong.

## 1. What this surface is

A **Persuade** surface with an **Operate** temperament: a portfolio for hiring managers and technical founders, built to be read in seven seconds and defended in an interview. The visitor's job is to decide whether to email. Everything either supports that decision or gets cut.

Two registers, and only two:

- **Paper** (`#f7f5f0`): the default. Reading and evidence.
- **Night** (`#0f1411`): the systems section, the closing CTA, the footer, and the legacy writing routes.

There is no third world and no decorative gradient. A single navy accent marks primary actions, the active locale, and interactive focus.

## 2. Principles

1. **One accent, with separate jobs.** Navy (`#1f4e8c`) is the brand and action colour. Green and red stay reserved for real success and failure states. The accent sits **108°** from pass green and **131°** from fail red in hue, and the blue channel survives deuteranopia and protanopia, so the three never collapse. This is why the accent is not green: a green accent would have taken a hue the state vocabulary already owns.
2. **One gutter, one owner.** Only `Container` sets page width and horizontal padding. A section never does.
3. **Sans only.** Geist for everything, Geist Mono for metadata. The serif was removed on 2026-10-25 and the last vestige (a `--font-serif` variable that no longer existed) was removed on 2026-10-27.
4. **Density is a feature.** The page can be long; it cannot be loose for the sake of air.
5. **Claims are checkable.** Every number traces to `trayectoria.md`. If it cannot be traced, it does not ship.
6. **Import behaviour, build design.** Anything whose difficulty is behaviour comes from Radix via shadcn. Anything whose difficulty is design is built here. See §7.

## 3. Colour

| Token | Value | Use |
|---|---|---|
| `--color-paper` | `#f7f5f0` | page background (ivory) |
| `--color-paper-raised` | `#fdfbf6` | panels, cards, menus |
| `--color-ink` | `#15171a` | headings, primary text |
| `--color-ink-3` | `#4e5157` | body, notes |
| `--color-ink-4` | `#6b6e74` | meta, dates, secondary labels (4.7:1 on paper) |
| `--color-ink-5` | `#8b8e94` | borders and icons only — **never body text** |
| `--color-line` | `#e4e0d6` | hairlines, dividers |
| `--color-accent` | `#1f4e8c` | primary actions, active locale, focus (7.6:1 on paper) |
| `--color-accent-hover` | `color-mix(accent 82%, black)` | primary action hover |
| `--color-accent-night` | `#5b9bff` | accent text, fills and focus on night (6.71:1 on night) |
| `--color-accent-wash` | `color-mix(accent 8%, paper)` | selected locale, menu hover |
| `--color-pass*` | `#2f9e4f` / `#1d6b3c` / `#eaf5ed` | committed, available, current |
| `--color-fail*` | `#b4433a` / `#9c3227` / `#fbeeec` | blocked, rejected |
| `--color-night*` | `#0f1411` / `#17201b` / `#222b26` | systems, CTA, footer |

On night, secondary text uses `--color-night-muted` (`#adb4ae`, Lc60). There is no tertiary tier: at Lc45 it failed APCA, so hierarchy on night comes from size and weight, not from a dimmer grey. Light-theme ink tokens are never used on night.

**Contrast floor:** 4.5:1 for text under 24px, 3:1 for large text and UI boundaries. Measured pairs, not eyeballed:

```
ink / paper        16.48:1   Lc 99
ink-3 / paper       7.30:1   Lc 82
ink-4 / paper       4.69:1   Lc 69
accent / paper      7.63:1   Lc 82
white / accent      8.31:1
night-ink / night  15.36:1   Lc 93
night-muted/night   8.79:1   Lc 60
```

### The reading surface goes dark on request

`/privacidad`, `/seguridad` and `/writing` are pages of text, and the people who read long technical pieces usually live in dark mode. Those three carry `data-reading-surface`, and under `prefers-color-scheme: dark` that attribute remaps the same tokens to the night scale. No toggle, no cookie, no flash: the OS preference decides.

The portfolio itself stays paper. It is a composed surface with its own tone, not a document.

| Token | Light | Dark | Measured on dark |
|---|---|---|---|
| `paper` | `#f7f5f0` | `#0f1411` | — |
| `paper-raised` | `#fdfbf6` | `#1b2520` | 1.18:1 vs paper (enough to hold code) |
| `ink` | `#15171a` | `#e8eae5` | 15.36:1 |
| `ink-2` | `#24262a` | `#d6dbd5` | 13.25:1 |
| `ink-3` | `#4e5157` | `#adb4ae` | 8.79:1 |
| `ink-4` | `#6b6e74` | `#8a918c` | 5.77:1 |
| `line` | `#e4e0d6` | `#34413a` | 1.74:1 vs paper |
| `accent` | `#1f4e8c` | `#5b9bff` | 6.71:1 (5.69:1 on `paper-raised`) |

Two deliberate departures from the existing night scale: `paper-raised` and `line` are lighter than `night-raised` and `night-line`. At their production values (1.12:1 and 1.28:1) a code block disappeared into the page.

Code switches theme too: `rehype-pretty-code` runs with both `vitesse-light` and `vitesse-dark`, and one media query picks which CSS variable wins.

## 4. Typography

Two families. That is the whole system.

| Role | Size | Weight | Notes |
|---|---|---|---|
| Hero | `clamp(40px, 5vw, 64px)` | 600 | one idea per line, two lines max |
| Section h2 | `clamp(28px, 3.2vw, 40px)` | 600 | sentence case, ends with a period |
| Body | 15px | 400 | line-height 1.65 |
| Prose | 17px | 400 | reading blocks; 65ch max |
| Button | 15–17px | 500 | sentence case |
| Mono label | 12px | 500 | uppercase, tracking 0.04em |

Rules:

- **No serif.** Do not reintroduce one.
- **No size below 11px** for text a user must read. 12px is the floor for labels.
- Tracking above `0.05em` only on short uppercase labels, never on sentence text.
- Measures: 65ch for prose, 52ch for the hero sub, 26ch for a title.

## 5. Layout

Two primitives, and they are not optional.

```tsx
<Container>  // width: 100%; max-width: 1240px; margin-inline: auto; padding-inline: var(--gutter)
<Section>    // padding-block: var(--section-gap); owns the tone (paper | night)
```

**The invariant:** the background lives on `Section` (full-bleed, no horizontal padding); the width lives on `Container`. Exactly one element decides the gutter. Enforced by `tests/layout.spec.ts`: every `[data-container]` must share the same left edge at 1440, 1024 and 390.

**Tokens live in `:root`, not `@theme`.** Tailwind v4 only emits theme variables it maps to a generated utility; `--container-page`, `--gutter`, `--section-gap` were silently dropped from `@theme` and produced a page with no max-width. Layout tokens belong in `:root`; only colour, radius and font families belong in `@theme`.

Section rhythm is `--section-gap`, never a per-component margin.

## 6. Components

- **Navigation.** Brand, then Demo / Sistemas / Trayectoria, the locale selector, CV, and Escríbeme. Below 641px only brand and menu survive: the section links, CV and the locale selector move into a Radix `DropdownMenu` (shadcn) triggered by a 44×44 button. Below 361px the locale chevron drops.
- **Menu panels.** The mobile menu and the locale menu share one skin: square (radius `0`), a 1px `--color-line` hairline, no shadow, `paper-raised` surface, 13px rows with 7px inline padding. The mobile rows are 44px tall for touch; the locale rows are 38px because they only exist on desktop. On night both swap to `night-raised` / `night-line` / `accent-night`. No floating card, no elevation, no rounding: the page is square and the menu is part of it.
- **Gate panel** (`home.tsx`): the hero demo, anchored by `#gate-panel`. Mono header bar, two columns (conversation / execution), state pill. Tabs are a real `tablist`/`tabpanel` pair. Each step carries a **Lucide** icon named after the job it does (`database`, `shield-check`, `workflow`), never a brand logo. The mapping lives in `system-mark.tsx`; the default for an unknown key is `workflow`, so a new system never renders an empty box.
- **Systems** (`systems-stacked.tsx`): night, three stacked cases. Each carries meta as `Disciplina · Alcance · Año`, one prose line, **at most two bullets**, the stack, and a metric. The NDC diagram holds the seven operations; they appear nowhere else.
- **Open source** (`open-source.tsx`): paper band after systems. Two square cards side by side on desktop, stacked on mobile.
- **Trayectoria** (`experience.tsx`): title, then a two-column block — the profile in a bordered panel (lede, closing, the talks line and the stack sentence) and, on desktop, the portrait rendered in ASCII. Below, each role is a bordered `<details>` record: logo tile, role, mono `org · year`, a plus that becomes a minus, and the note plus a mono stack line inside. Open at ≥900px, closed below. `Ver trayectoria completa` closes the list as a line, not a card.
- **Closing contact**: night band with the contour field and a radial mask, centred. Headline, one paragraph naming the role sought and the conditions, then `Escríbeme` (mailto with a prefilled subject) and `LinkedIn`. The primary button **inverts on night**: `--color-accent-night` fill with night ink (6.71:1), because brand navy on night is 2.24:1 and the button loses its shape even though its label reads. This is the one place where the accent is not navy; the rule is that a filled control must clear 3:1 against its band, and navy cannot do that on night.
- **Footer**: night, brand with the line *El modelo propone. La base de datos decide.* composed from `hero.h1a/h1b`, the email copy button, three columns (Trabajo / Perfil / Contacto) and a bottom bar with the copyright left and the legal links right.
- **Content pages** (`/privacidad`, `/seguridad`, `/writing`): share `PageShell` — wordmark, "Volver al inicio", a 720px content column, footer with the legal links. No hero, no bookend, no kicker. The column is left-aligned inside the 1240px container, so the wordmark, the back link, the H1 and the prose all share one left edge at every width.
- **Writing index** (`/writing`): title, one-paragraph lede, then hairline rows. Each row carries date · reading time · series as mono uppercase, the title at 19px, the summary, and themes as plain mono text. No cards, no bordered pills: the border-radius the old version had on its tags was removed.
- **Essay view** (`/writing/[slug]`): mono back link, mono meta, title, summary, then `.prose`. A 2px accent progress line rides the top edge. Code blocks use `vitesse-light` on `paper-raised` with a `line` hairline and zero radius; inline code is a chip on the same surface. Related essays are hairline rows, and the author block repeats the site thesis in English.

## 7. Libraries and the decision rule

**Import behaviour. Build design.** A dropdown is 90% behaviour (focus trap, escape, outside click, keyboard, `aria-expanded`) and it fails silently when hand-rolled. A hero is 90% design.

| Layer | Decision | Why |
|---|---|---|
| Primitives | **shadcn/ui over Radix** | Accessible behaviour, copied into the repo: no version to update, no runtime |
| Styles | **Tailwind v4 by default, CSS for the exception** | See §8 |
| Icons | **Lucide for UI only** | Lucide covers every interface glyph (1.903 canonical icons). The stack field is text, not logos: the redesign dropped the brand marks, so no icon package ships for them. If they return, extract the paths once with `simple-icons` and inline them; the package is not a runtime dependency. |
| Animation | **CSS only** | `framer-motion`, then `motion`, were removed once the last consumer (the legacy chrome) went away. Nothing on the site needs a JS animation library |
| Smooth scroll | **Native** | Lenis belongs to GSAP / R3F scroll-driven pages, not to a normal page |

Icon exceptions have three conditions: the icon does not exist in Lucide; no weight, rotation or composition resolves it; and it is copied into the repo as an inline SVG — never an `icon="set:name"` resolved at runtime.

## 8. Styling

**Tailwind v4 is the base.** Composition, spacing, type, colour by token, states. Everything Tailwind does well is written in Tailwind, because the classes stay visible at the component and the model does not have to invent names.

**CSS is the declared exception**, only for what Tailwind cannot express:

| Case | Why CSS |
|---|---|
| `::details-content`, animated collapse | Tailwind does not expose the pseudo-element |
| `mask-image`, `@supports`, deep pseudo-elements | Selectors do not compose with utilities |
| Keyframes with per-stop control | Intermediate percentages have no class |
| Browser surfaces: scrollbar, selection, caret | No utility; themed once in `globals.css` |
| Global `prefers-reduced-motion` | A transversal rule, not a class |
| Canvas / WebGL layout | Depends on `inset`, `z-index` and nested stacking contexts |

Escape rules: it lives next to the component or in `globals.css`; it carries a comment saying *why* it is not Tailwind; and it only uses tokens — no raw hex, no arbitrary values (`text-[13.5px]`, `bg-[#1f4e8c]`), which lint rejects.

**CSS Modules beat Tailwind utilities.** Utilities live in a `@layer`, module classes do not, so an unlayered `.navMenuPanel { border: 0 }` silently kills the primitive's `border border-line`. Anything a module overrides must be restated there in full, not left half-applied.

**Radix portals escape their ancestor.** `DropdownMenuContent` renders into `document.body`, so `.navDark .panel` never matches: the dark tone has to arrive as an explicit class from React state. This is how the mobile menu gets its night skin while the locale menu (a `<details>`, not portaled) can use a descendant selector.

**A `@layer` loses to the plugin that loads after it.** The `.prose` overrides for `/writing` sat inside `@layer components` and silently lost to `@tailwindcss/typography` on equal specificity: the body rendered at 16px instead of 17px and code blocks kept a 6px radius after the redesign. Moving the block out of the layer (unlayered CSS wins every layer) fixed both without a single `!important`.

**Utilities beat the base layer.** `body` carried `bg-background text-foreground` as Tailwind classes, which resolve to the old dark shadcn token and win over `@layer base`. Every page painted paper over it, so it looked right while the actual page background stayed night. The class is now `bg-paper text-ink`; the base rule and the class finally say the same thing.

`home.module.css` still holds the original CSS Modules implementation. It migrates section by section: **what gets touched gets migrated; what does not, does not.**

## 9. Motion

- Standard ease `cubic-bezier(0.22, 0.61, 0.36, 1)`, 220–320ms.
- Content expansion uses `--ease-panel: cubic-bezier(0.16, 1, 0.3, 1)` at `420ms`. The accordion, the plus→minus icon and the note opacity all ride it, so a disclosure moves as one pulse.
- `prefers-reduced-motion` is a gate, not an option: the demo jumps to its final state, the accordion stops animating, the locale menu loses its transition.
- Never animate `width`, `height`, `top` or `left`.
- Lenis + GSAP or React Three Fiber is the stack for pages where scroll *is* the experience. Not for this one.

## 10. Accessibility

- `<main id="main-content">` wraps content; header and footer sit outside it.
- `:focus-visible` is `2px solid currentColor` with a 3px offset, so it inherits the text colour and always contrasts.
- Icons are `aria-hidden`; state is conveyed by icon **and** text, never colour alone.
- Touch targets are ≥44px on mobile: footer links, the email copy button, the legal links, the demo tabs, the locale selector, the brand and the menu button.
- Safe areas: the viewport declares `viewport-fit=cover`; the sticky header pads by `env(safe-area-inset-top)` and the footer bar by `env(safe-area-inset-bottom)`.
- Below 641px the nav collapses into a menu rather than hiding destinations.
- No skip link (removed by product decision on 2026-10-25).

## 11. Copy

- Spanish is canonical; English is a mirror with identical structure (`src/content/home/{es,en}.ts`, enforced by `HomeContent`). `localeDetection` is on: an English `Accept-Language` lands on `/en`.
- Neutral Spanish. No voseo, no tuteo advertising itself: the site speaks impersonally.
- No em dashes. No "not X, but Y" rhythm. No invented numbers.
- Metrics: no-shows `25% → 12%`, response `47 min → under 10 s`, NDC `7 operations`, METEOR `169 → 79 min`, `$1,000/month`.
- Never name Expertia's client work beyond what the experience row states: `Expertia Travel · vía TechHouse`.
- Demo personas (Camila, Marco, Lucía) are fictional; their avatars are placeholders and must stay anonymised.

## 12. Known debt

Documented so it is not mistaken for intent:

- `home.module.css` is ~2.400 lines and still the source of truth for the home. The Tailwind migration is in progress, not done.
- One `linear-gradient` in the footer and one in the panel header, both older than the token system.
- Raw hex values and dead classes survive in `home.module.css` (`systemItem*`, `wordmark`, `nodes*`).
- `/services` and `/dossier` still render inside `(legacy)` with their own night wrapper and no shared chrome. They are Spanish-only and excluded from the i18n middleware in `src/proxy.ts`.
- Components that no longer mount are kept **outside the repository**, in a local `_old/` folder that git ignores. They are not published: `tsconfig` and Biome skip that path. If one is not revived within a year, it is deleted.

## 13. How to verify

```bash
pnpm typecheck          # types
pnpm lint               # biome, must be clean
pnpm test:layout        # one left edge at 1440 / 1024 / 390
```

Any visual change is judged at 1440×900 and 390×844, in both locales, before it ships. Mobile is also checked at 320px for horizontal overflow and for touch targets under 44px.

Contrast is measured, not estimated: every token pair above was computed with the WCAG 2.x formula and APCA Lc, and the numbers live in this file so a future change has something to fail against.
