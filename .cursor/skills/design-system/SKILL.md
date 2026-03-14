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
| `--color-card-bg` | `rgba(18,18,18,0.35)` | Dark frosted card resting state |
| `--color-card-bg-hover` | `rgba(24,24,24,0.45)` | Card hover state |
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
| `--radius-pill` | `999px` | Header, footer, nav pills (desktop + mobile), burger button |
| `--radius-xl` | `28px` | Glass panels, interactive cards, screenshot containers |
| `--radius-lg` | `20px` | Images, screenshot frames |
| `--radius-md` | `12px` | Small buttons |
| `--radius-sm` | `6px` | Tags, small badges |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--gap-section` | `8px` | Between ContentBlocks and page sections |
| `--gap-card` | `8px` | Between cards inside a grid |
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

### Type Scale

| Role | Size | Weight | Tracking | Usage |
|------|------|--------|----------|-------|
| Display | 40px (28px mobile) | 700 | -0.44px | "What I'm known for" items |
| Page title | 24px | 700 | -0.264px | Hero headline, uppercase |
| Section title | 14px | 700 | -0.154px | Section headings, uppercase |
| Card title | 16px | 700 | -0.176px | Card headings, experience roles |
| Body | 14px | 300 | -0.154px | Paragraphs, principles |
| Caption | 12px | 300 | -0.132px | Nav, metadata, experience details |
| Label | 10px | 500 | 0.5px | Card labels, metadata dots, uppercase |

## Container Backgrounds

Two distinct surface treatments:

**Read-only containers** = Red glass gradient (`--gradient-glass`):
- `backdrop-filter: blur(var(--blur-glass))`
- `background-image: var(--gradient-glass)` with shimmer animation
- Used for: ContentBlock, glass sections, metric cards

**Clickable containers** = Dark frosted (`--color-card-bg`):
- `backdrop-filter: blur(var(--blur-glass))`
- `background: var(--color-card-bg)` (semi-transparent dark gray)
- Used for: navigation cards, case study cards, screenshot containers

Both use the same blur intensity — only the background color differs.

## Interactive Pattern

**Interactive content** = dark frosted cards with backdrop-blur:
- Resting: `background: var(--color-card-bg)`, `border: 1.5px solid transparent`
- Hover: `border-color: var(--color-accent)`, subtle glow, 2px lift
- Active: `scale(0.99)`, stronger glow
- Focus-visible: 2px orange outline with 2px offset
- CTA/arrow: shifts right 4px, color changes to `--color-accent`

### Card Content Groups

Cards use three semantic content groups with clear spacing:
1. **Label** (top) — 10px uppercase label, 16px margin-bottom
2. **Body** (middle) — Title + description grouped tightly (4px gap)
3. **Action** (bottom) — Arrow/CTA with 28px margin-top

### Card Image Inset

Card thumbnails are inset 4px from the card edge with a calculated inner
radius: `margin: 4px 4px 0`, `border-radius: 24px` (28px outer - 4px gap).

## Glass Block Rules

There is **no maximum** on the number of glass ContentBlocks or sections
per page. Each section type uses its appropriate surface treatment.

Pages use ContentBlock for header/hero text, then render additional sections
(glass sections, card grids, screenshot containers) directly in the page
flow outside of ContentBlock.

## Component Patterns

### ContentBlock
Glass container. Props: `align`, `grow`. When `grow=true`, inner max-width
is removed so cards can fill the width. Padding: 28px 32px desktop, 24px mobile.

### FadeImage
Client component wrapping `next/image` with shimmer loading placeholder.
Shows animated gray gradient while loading, fades to reveal image on load.
Props: standard `ImageProps` + `shimmer` boolean.

**CRITICAL:** Never use FadeImage or any animated component inside elements
that are children of `backdrop-filter` containers. Animations on child
elements can interfere with backdrop-filter compositing.

### Interactive Cards
Dark frosted with orange border on hover. Image thumbnail inset 4px with
24px radius. Uses `--radius-xl` (28px) for outer card radius.

### Header
Logo left, nav right. Desktop nav uses pill-shaped links with 4px gap and
orange border hover. Burger button is fully circular (`border-radius: 50%`).
Mobile nav links use pill shape (`--radius-pill`), 14px font size.

### Mobile Nav
Rendered as a **sibling** of `.headerInner`, not inside it. This avoids the
`backdrop-filter` containing block issue. `position: fixed; inset: 0;`
z-index: 98. Nav links use `--radius-pill` matching desktop style.

### Page Transition Veil
A fixed overlay (`z-index: 50`) rendered as a sibling of the content layer.
Background matches `--color-bg`. Fades from opaque to transparent on each
navigation via `key={pathname}`. Uses CSS animation (opacity only).

**CRITICAL:** Never use `animation` or `transform` on parent elements that
contain children with `backdrop-filter`. This creates a compositing group
that breaks the blur effect. The veil works because it's a sibling, not
a parent.

### ImageViewer
Rendered via `createPortal(document.body)` with `useState` mount guard for SSR.
z-index: 9000. Images use inline opacity transition (not FadeImage) —
starts at `opacity: 0`, transitions to 1 on load. No shimmer wrapper to
avoid layout offset issues.

### ScreenshotGroup
Flex layout for phone screenshots. Used both inside CaseStudySection (as
visual column) and as standalone sections outside containers. When standalone,
wrap in a dark frosted container for visual grouping. Gap: 20px between items.

### MetricsBlock
Standalone section outside CaseStudyContainer. Cards use glass gradient
background with blur. Side-by-side columns on desktop, stacking on mobile.

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
