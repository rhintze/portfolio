---
name: design-system
description: >-
  Manages the portfolio design system: tokens, typography, colors, gradients,
  spacing, and component patterns. Use when creating or editing pages,
  components, or styles in the portfolio project, or when the user mentions
  design tokens, colors, fonts, spacing, or visual consistency.
---

# Portfolio Design System

## Tokens (globals.css :root)

All visual values live as CSS custom properties. Never hard-code colors, radii,
spacing, or font stacks. Always reference tokens.

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#000000` | Page background |
| `--color-text` | `#ffffff` | Primary text, headlines, active nav |
| `--color-text-muted` | `rgba(255,255,255,0.6)` | Body text, captions, inactive elements |
| `--color-border` | `rgba(255,255,255,0.1)` | Header/footer borders |
| `--color-accent` | `#F05304` | Hover borders, CTA highlights, focus outlines |
| `--color-accent-muted` | `rgba(240,83,4,0.5)` | Focus-visible outlines |

### Interactive Surface

| Token | Value | Usage |
|-------|-------|-------|
| `--color-card-bg` | `rgba(18,18,18,0.92)` | Dark opaque card resting state |
| `--color-card-bg-hover` | `rgba(24,24,24,0.95)` | Card hover state |
| `--color-glow` | `rgba(240,83,4,0.12)` | Subtle orange glow on hover |
| `--color-glow-strong` | `rgba(240,83,4,0.25)` | Stronger glow on active/press |

### Gradients

| Token | Usage |
|-------|-------|
| `--gradient-hero` | Background overlay (multiply blend over image) |
| `--gradient-glass` | Static glass panels (low-opacity red-orange stops) |

### Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-pill` | `999px` | Header, footer, nav pills, tags |
| `--radius-xl` | `28px` | Glass panels (ContentBlock) |
| `--radius-lg` | `20px` | Interactive cards, images |
| `--radius-md` | `12px` | Mobile nav links, small buttons |
| `--radius-sm` | `6px` | Tags, small badges |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--gap-section` | `8px` | Between ContentBlocks |
| `--gap-card` | `8px` | Between cards inside a container |
| `--padding-page` | `12px` | Page edge padding |
| `--padding-block` | `36px` | Case study section padding |
| `--padding-main-x` | `4px` | Main horizontal padding |
| `--header-height` | `44px` | Fixed header height |
| `--blur-glass` | `40px` | Backdrop blur intensity |
| `--measure` | `60ch` | Max text width in ContentBlock |

## Typography

**Font:** IBM Plex Mono (Google Fonts)
**Weights:** 300, 400, 500, 600, 700
**Variable:** `--font-ibm-plex-mono`

| Role | Size | Weight | Tracking |
|------|------|--------|----------|
| Display / Name | 24px | 700 | -0.264px |
| Heading | 20px | 700 | -0.22px |
| Section title | 18px | 700 | -0.198px |
| Card title | 16px | 700 | -0.176px |
| Body | 16px | 300 | -0.176px |
| Body small | 14px | 300 | -0.154px |
| Caption / Nav | 12px | 300 | -0.132px |
| Micro label | 10–11px | 500 | 0.5px |

## Interactive Pattern

**Static content** = red glass panels (`--gradient-glass`), no border, shimmer.

**Interactive content** = dark opaque cards inside glass panels:
- Resting: `background: var(--color-card-bg)`, `border: 1.5px solid transparent`
- Hover: `border-color: var(--color-accent)`, subtle glow, 2px lift, image zoom 1.03×
- Active: `scale(0.99)`, stronger glow
- Focus-visible: 2px orange outline with 2px offset
- CTA/arrow: shifts right 4px, color changes to `--color-accent`

## Glass Block Rules

**Maximum 2 glass ContentBlocks per page.**

- **Block 1 (required):** Title, subtitle, and minimal metadata (date, company,
  tags). Compact — no body copy, no cards, no grow.
- **Block 2 (optional):** Interactive content (card grids, lists). Uses `grow`
  to fill remaining space.

Pages that need immersive content (Creative Lab) break out of ContentBlock
entirely — images and gallery sections render directly in the page flow
without glass wrappers.

## Component Patterns

### ContentBlock
Glass container. Props: `align`, `grow`. When `grow=true`, inner max-width
is removed so cards can fill the width. Padding: 28px 32px desktop, 24px mobile.

### Interactive Cards
Dark opaque with orange border on hover. Image thumbnail (16:9 aspect ratio)
+ text content. Border radius follows inset rule (see visual-language skill).

### Header
Logo left, nav right. Desktop nav uses pill-shaped links with orange border
hover. Mobile: burger button triggers full-screen overlay nav as sibling of
headerInner (outside backdrop-filter context for correct fixed positioning).

### Mobile Nav
Rendered as a **sibling** of `.headerInner`, not inside it. This avoids the
`backdrop-filter` containing block issue. `position: fixed; inset: 0;`
z-index: 98. `headerInner` uses `position: relative; z-index: 99` to stay
above the overlay so the close button remains tappable. 6px gap between
nav items.

### Creative Lab Gallery
Full-bleed image gallery outside of ContentBlock. No glass wrapper — images
are the content. Supports aspect ratios: `cinematic` (2.39:1), `wide` (16:9),
`standard` (4:3), `portrait` (3:4). Featured projects get `--radius-xl` frames.
Metadata sits in a dark translucent bar below each image. Tags use `--radius-sm`
with subtle white background. Hover: slow 1.02× zoom (0.6s cubic-bezier).

### ImageViewer
Rendered via `createPortal(document.body)` with `useState` mount guard for SSR.
z-index: 9000. Background click closes. Arrow buttons always visible (disabled
at 20% opacity). Supports `description` text. Counter at bottom.

## Accessibility

- `:focus-visible` with `--color-accent-muted` outline
- `aria-label` on icon-only buttons, image triggers, card links
- `aria-current="page"` on active nav links
- `aria-expanded` on burger menu
- `aria-modal` + `role="dialog"` on ImageViewer
- Keyboard: Enter/Space on interactive cards, Escape closes dialogs
- Skip-to-content link (sr-only, visible on focus)
- Semantic roles: banner, navigation, main, contentinfo

## Related Skills

- **visual-language** — Hierarchy, spacing rhythm, radius inset rules,
  optical alignment, responsive principles
- **content-design** — Copy guidelines, voice/tone, review checklists
- **site-architecture** — Page map, component tree, data models, asset pipeline
- **code-quality** — Build verification protocol, SSR safety, cache recovery,
  dependency graph, server/client boundaries
