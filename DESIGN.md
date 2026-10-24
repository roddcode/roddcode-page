---
version: alpha
name: Test Bench — roddcode
description: "A measurement instrument, not a landing page. Evidence is displayed as readings; color is state, never brand."
colors:
  primary: "#EDEDE4"
  canvas: "#0A0B09"
  surface: "#101210"
  surface-raised: "#161815"
  ink: "#EDEDE4"
  ink-secondary: "#9A9C93"
  ink-muted: "#6B6D64"
  line: "#22241F"
  line-strong: "#33362E"
  pass: "#8ADF9B"
  fail: "#E0685A"
  active: "#E0A458"
typography:
  display:
    fontFamily: IBM Plex Sans
    fontSize: 72px
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: -0.03em
  h2:
    fontFamily: IBM Plex Sans
    fontSize: 2rem
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: -0.02em
  h3:
    fontFamily: IBM Plex Sans
    fontSize: 1.25rem
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: -0.01em
  body:
    fontFamily: IBM Plex Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
  body-long:
    fontFamily: IBM Plex Sans
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: 0em
  label:
    fontFamily: IBM Plex Mono
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.06em
    fontFeature: "tnum 1"
  reading:
    fontFamily: IBM Plex Mono
    fontSize: 1.5rem
    fontWeight: 500
    lineHeight: 1
    letterSpacing: -0.01em
    fontFeature: "tnum 1"
  reading-lg:
    fontFamily: IBM Plex Mono
    fontSize: 2.5rem
    fontWeight: 500
    lineHeight: 1
    letterSpacing: -0.02em
    fontFeature: "tnum 1"
  code:
    fontFamily: IBM Plex Mono
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0em
rounded:
  none: 0px
  hair: 2px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 96px
  5xl: 128px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.canvas}"
    typography: "{typography.label}"
    rounded: "{rounded.hair}"
    padding: 14px 20px
    height: 44px
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.hair}"
    padding: 14px 20px
    height: 44px
  case-panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.none}"
    padding: 24px
  panel-raised:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.none}"
    padding: 24px
  body-secondary:
    textColor: "{colors.ink-secondary}"
    typography: "{typography.body}"
  reading-block:
    textColor: "{colors.ink}"
    typography: "{typography.reading-lg}"
  state-pass:
    textColor: "{colors.pass}"
    typography: "{typography.label}"
  state-fail:
    textColor: "{colors.fail}"
    typography: "{typography.label}"
  state-active:
    textColor: "{colors.active}"
    typography: "{typography.label}"
  rule:
    backgroundColor: "{colors.line}"
    height: 1px
  rule-strong:
    backgroundColor: "{colors.line-strong}"
    height: 1px
  section-index:
    textColor: "{colors.ink-muted}"
    typography: "{typography.label}"
---

# Test Bench — roddcode

## Overview

This is not a portfolio and not a landing page. It is a **test bench**: a surface where a system is measured and the reading is shown. Every section displays evidence; nothing displays an intention.

The metaphor is physical, and it is the author's origin: physics, where a result does not negotiate. The page borrows the language of measurement instruments — readings, units, tick marks, pass/refuse states — and nothing else. It does not borrow the costume of a SaaS landing, a crypto dashboard, or an AI startup.

**The rule that governs the whole system:** if there is no reading, there is no section. Nothing goes on the page because it looks good or because a competitor has it. Every element answers *what does this measure?*

The instrument appears in the readings, not in the scenery. Roughly 90% of any viewport is typography and air. The measurement cues are small, precise, and scarce; they earn attention because they are rare.

### Why this is not a Linear clone

Explicit rejections. None of these appear in this system:

- Gradients, glows, glassmorphism, mesh backgrounds.
- Rounded cards (16–24px), floating panels, drop shadows.
- Purple, indigo, cyan, or any "AI accent".
- Spring animations with bounce or overshoot.
- Particle fields, beams, spotlight-follows-cursor, icon clouds.
- Hero badges ("available for work"), logo walls, testimonial carousels.
- Numbers repeated in three places. One reading per claim.

If a component from a copy-paste library is used, its surface treatment is stripped and rebuilt with these tokens. The technique may be borrowed; the skin never is.

## Colors

There is **no brand accent**. Color on this site is a **state**, not decoration. That single rule removes the most common tell of a generated site: a pretty accent sprinkled over everything.

- **Canvas** `#0A0B09` — the bench. Near-black with a faint green-grey cast, like a phosphor screen that has been on for years. Not pure black, not blue-black.
- **Surface** `#101210` / **Surface raised** `#161815` — panels. Exactly two steps; never a third.
- **Ink** `#EDEDE4` — primary text. Warm off-white, not `#FFFFFF`. Pure white on near-black vibrates at large sizes.
- **Ink secondary** `#9A9C93` — body secondary, descriptions.
- **Ink muted** `#6B6D64` — metadata, timestamps, section indices, units.
- **Line** `#22241F` / **Line strong** `#33362E` — hairlines. Structure is drawn with 1px lines, never with shadows.
- **Pass** `#8ADF9B` — a verified metric, a green state, a test that holds.
- **Fail** `#E0685A` — a refusal. What the system rejected. Desaturated, not alarm red.
- **Active** `#E0A458` — the current step in a sequence. Used on exactly one element per viewport, if any.

Usage rules:

1. Semantic color appears **only** on state: a reading, a chip, a line of a trace. Never on a heading, never on a large area.
2. Maximum **one** `active` element visible at a time.
3. `pass` and `fail` never appear together with equal weight. The refusal is the point of the section; the pass is the baseline.
4. No color for hierarchy. Hierarchy is size, weight, and space.
5. Text on canvas must clear WCAG AA (4.5:1). `ink-muted` is for non-essential metadata only.

## Typography

**IBM Plex Sans** for everything structural, **IBM Plex Mono** for everything measured. Plex was designed for technical documentation: it has engineering provenance, honest letterforms, and excellent tabular figures. It is not the default stack of every AI-generated site, which is the point.

- **Display** — hero H1 only. Medium weight (500), tight tracking. A medium weight reads as a person stating a fact; bold reads as a pitch. The token records the desktop value (72px); in code it scales down to 40px on mobile with `clamp()`, never below.
- **H2** — section titles. Same family, one step down.
- **H3** — card titles and subsection heads.
- **Body** — 16px, 1.6. **Body long** — 18px, 1.65, for `/about` only, capped at 68 characters per line.
- **Label** — mono, 12px, uppercase, `+0.06em` tracking, `tnum`. Section indices, units, metadata.
- **Reading** / **Reading lg** — mono, tabular, tight. Every number on the site uses these. Numbers are content, not decoration.
- **Code** — mono, 13px, for the invariable test output and inline code.

Rules:

1. Every number carries `font-feature-settings: "tnum" 1`. Non-negotiable: a metric that jitters while animating is a broken instrument.
2. Units are always present and always in `label` style: `ms`, `%`, `USD`, `ops`.
3. No more than three type sizes in a single viewport.
4. No italics. No letter-spaced lowercase. No all-caps headings.
5. Line length: 60–68 characters for prose. Wider only for code and traces.

## Layout

A fixed chassis, not a canvas.

- **Grid:** 12 columns, max width `1200px`, gutter `24px`, page padding `24px` mobile / `48px` desktop.
- **Section rhythm:** `96px` mobile, `128px` desktop between sections. This is where the premium lives — not in effects.
- **Hairline structure:** every section is separated by a 1px `line` rule that runs the full width of the container. Sections also carry an index in the left rail (`01 —`, `02 —`) in `label` style.
- **Two-column asymmetry:** text occupies 5–6 columns, the reading or trace occupies 5–7. Never a symmetric 50/50 split; never a centered hero.
- **Mobile:** single column, readings stay visible (`overflow-x: auto` with snap for multi-step traces — never hidden behind a breakpoint). Touch targets ≥ 44px.

## Elevation & Depth

There is **no elevation**. No shadows, no blur, no z-index theater.

Depth is expressed three ways only:

1. A surface step (`canvas` → `surface` → `surface-raised`).
2. A hairline (`line`, then `line-strong` for the focused element).
3. Position in the reading order (what comes first in the trace).

The single exception: a sticky section index may sit over content with `background: canvas` at 92% opacity. No blur, no glass.

## Shapes

- **Radius:** `0px` for panels, rules, traces, and images. `2px` for interactive controls only (buttons, inputs, chips). Nothing else.
- **Icons:** 16px or 20px, stroke `1.25px`, monochrome `ink-secondary`. Lucide only, never filled, never colored.
- **Dots and ticks:** square, 4px or 6px. A state dot is a square, not a circle — circles read as decoration, squares read as a marker.
- **Images:** full-bleed within their column, no border radius, no shadow. If an image needs a frame to look good, it is the wrong image.

## Components

- **Button primary** — ink background, canvas text, 2px radius, 44px min height. One per viewport.
- **Button secondary** — transparent, 1px `line-strong` border. Never more than one next to a primary.
- **Case panel** — `surface`, 1px `line`, no radius, no shadow. Contains: index, title, one-line problem, one-line decision, one reading, one sentence of consequence.
- **Reading block** — the metric. Mono, tabular, with its unit in `label` above. Optional baseline tick rule beneath: a 1px line with 8px ticks every 24px, `line` color, purely typographic.
- **Trace** — the refusal sequence. Three rows: `model`, `postgres`, `system`. Each row is a label plus a mono line. The blocked row uses `fail` on its state word only, not on the whole line.
- **Section index** — `01 —` in the left rail, mono, muted. It is navigation and rhythm at once.
- **Terminal block** — mono on `surface`, no window chrome (no traffic-light dots: that is costume). A single top hairline and a `label` with the command.
- **Footer** — one hairline, four columns of links in `label` style, the full name in `body` small.

## Do's and Don'ts

**Do**

- Show the refusal. The system saying *no* is the most convincing thing on the page.
- Keep one reading per claim, with its unit.
- Use white space as the primary luxury signal.
- Let the type carry the hierarchy; resist adding a box.
- Write the number first, then the sentence that explains why it mattered.

**Don't**

- Don't add an accent color to "make it pop". Color is state.
- Don't round a panel to make it feel modern. It doesn't.
- Don't animate anything that isn't a state change or a reading counting to its value.
- Don't put a metric in the hero. Numbers shown everywhere are trusted nowhere.
- Don't use `100vh` sections, autoplay carousels, or scroll-jacking.
- Don't copy a component's default skin. Strip it to these tokens or don't use it.
- Don't claim a number that is not in `trayectoria`. A single unverifiable figure costs more than a missing one.
