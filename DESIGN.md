---
version: "alpha"
name: RoddCode Infrastructure
description: "Dossier de ingeniería oscuro y preciso para agentes de IA y sistemas transaccionales. Telemetría, estado determinista y código verificable; cero decoración."
colors:
  canvas: "oklch(0.12 0 0)"
  surface: "oklch(0.15 0 0)"
  surface-elevated: "oklch(0.18 0 0)"
  border: "rgba(255, 255, 255, 0.06)"
  border-strong: "rgba(255, 255, 255, 0.16)"
  text-primary: "oklch(0.96 0 0)"
  text-secondary: "oklch(0.65 0 0)"
  text-muted: "oklch(0.60 0 0)"
  primary: "oklch(0.70 0.15 45)"
  on-primary: "oklch(0.12 0 0)"
  success: "oklch(0.68 0.16 145)"
  danger: "oklch(0.62 0.22 25)"
typography:
  h1:
    fontFamily: Geist
    fontSize: 3rem
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -0.02em
  h2:
    fontFamily: Geist
    fontSize: 1.75rem
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: -0.01em
  body:
    fontFamily: Geist
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  label:
    fontFamily: Geist Mono
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.08em
  code:
    fontFamily: Geist Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  metric:
    fontFamily: Geist Mono
    fontSize: 2rem
    fontWeight: 500
    lineHeight: 1
    letterSpacing: -0.02em
    fontFeature: "tnum"
rounded:
  sm: 4px
  md: 6px
  lg: 8px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  "2xl": 48px
  "3xl": 64px
  "4xl": 96px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: 12px
    height: 44px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: 12px
    height: 44px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: 24px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: 12px
    height: 44px
  badge:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 6px
  nav-link:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.label}"
    padding: 8px
  badge-muted:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 6px
  meta:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-muted}"
    typography: "{typography.label}"
    padding: 4px
  status-success:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.success}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: 6px
  status-danger:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.danger}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: 6px
---

## Overview

An industrial-grade command dossier. Dark, precise, hyper-focused on engineering truth. The page should read like mission-control software for production systems, not a marketing landing page. Every visual element is telemetry, deterministic state, or verifiable code. The reference points are Linear's precision, Warp's terminal discipline, and Oxide's infrastructure honesty.

The design is deliberately spare. Whitespace separates systems, not decoration. Borders define structure. A single amber signal marks action and live state. Nothing glows for the sake of glowing.

## Colors

The palette is a dark neutral field with one action signal. Roles are fixed; do not invent intermediate grays.

- **Canvas:** the page foundation. Use it for the document background and full-bleed sections.
- **Surface:** cards, panels and any structural block that sits above the canvas.
- **Surface Elevated:** popovers, dropdowns and nested panels.
- **Border:** hairline definition at 6% white. **Border Strong:** focus, active and hover boundaries at 16% white.
- **Text Primary:** headlines and body. **Text Secondary:** descriptions and navigation. **Text Muted:** timestamps, labels and metadata. Exactly three levels.
- **Primary (amber):** reserved for primary actions, live-status markers and one key metric per viewport. Never decorative.
- **Success / Danger:** system state only. Do not use them as brand colors.

## Typography

Geist for display and body; Geist Mono for telemetry, code and metrics. Hierarchy comes from weight and opacity before size. Headings use tight tracking; labels use wide tracking.

All numbers in metrics, prices, timestamps and IDs use tabular numerals. Minimum readable size is 12px. Ten-pixel text is forbidden.

## Layout

Use an 8-point spacing rhythm: 4, 8, 16, 24, 32, 48, 64, 96. Macro spacing separates sections; micro spacing separates label from value. Alternate expansive and dense sections so the page has a pulse. Content max width is 72rem for reading and 80rem for case studies. Mobile is the default: stack first, then widen.

## Elevation & Depth

No outer drop shadows. Depth comes from surface value, a 1px inner highlight (`inset 0 1px 0 rgba(255,255,255,0.05)`) and border contrast. A soft SVG turbulence overlay at 2.5% opacity may be used on large dark fields to prevent OLED banding. Never use a glow as a substitute for hierarchy.

## Shapes

Functional containers use 4px or 6px radii. Cards may use 8px. Pills are reserved for badges and status chips. Do not mix sharp and rounded containers in the same view.

## Components

Use the component tokens above. Buttons are 44px tall. Inputs are 44px tall and 16px font size on mobile. Cards use surface and a hairline border. Badges are compact labels, not buttons. Navigation links use secondary text and become primary on hover/focus.

Reuse the existing React components in `src/components/`. Do not rebuild buttons, cards or inputs with page-level CSS. If a component does not exist, create a primitive with the same token contract before using it.

## Do's and Don'ts

- Do use one primary action per viewport.
- Do show the role, the system and the metric in every case study.
- Do use `tabular-nums` for every metric and timestamp.
- Do keep touch targets at 44x44 or larger.
- Do respect `prefers-reduced-motion`.
- Do use `100dvh` or `100svh`, never `100vh`.
- Don't use gradient mesh blobs, purple/cyan glows or decorative particles.
- Don't use public low-ticket pricing on the root portfolio.
- Don't use outer drop shadows or glassmorphism.
- Don't use rounded corners above 8px on functional containers.
- Don't use hover-only interactions without a touch fallback.
- Don't use text below 12px.
- Don't use "AI slop" copy: no "cutting-edge", "synergistic", "revolutionary" or empty superlatives.
