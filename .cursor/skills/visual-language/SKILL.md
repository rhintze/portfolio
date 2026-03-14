---
name: visual-language
description: >-
  Defines the visual design language for the portfolio: hierarchy, spacing
  rhythm, density, radius relationships, alignment, and typographic rules.
  Use when evaluating or adjusting visual quality, layout proportions,
  spacing, font sizing, border radius, element alignment, or when something
  "looks off" visually. Ensures design intentionality beyond CSS correctness.
---

# Visual Language

## Content Hierarchy

Every page follows a **Z-pattern reading flow**:

1. **Primary** — The single most important thing (name, case study title).
   Largest type, strongest weight, full white.
2. **Secondary** — Supporting context (tagline, excerpt, metric).
   Smaller type, lighter weight or muted color.
3. **Tertiary** — Navigation cues and metadata (labels, CTAs, counters).
   Smallest type, muted, uppercase tracking.

### Hierarchy Signals (strongest → weakest)

| Signal | How we use it |
|--------|--------------|
| Size | 24px display → 16px body → 12px caption |
| Weight | 700 bold headlines → 300 light body |
| Color | `--color-text` (primary) → `--color-text-muted` (secondary) |
| Case | UPPERCASE for headlines/labels → Sentence case for body |
| Spacing | More padding around primary content, tighter around tertiary |

## Spacing Rhythm

All spacing derives from a **4px base unit**. Common values:

| Multiple | px | Usage |
|----------|-----|-------|
| 1× | 4px | Minimum breathing room, main-x padding |
| 2× | 8px | Section gaps, card gaps |
| 3× | 12px | Page edge padding, tagline gaps |
| 5× | 20px | Card content padding, inner spacing |
| 7× | 28px | ContentBlock inner padding |
| 8× | 32px | Desktop ContentBlock horizontal padding |
| 9× | 36px | Case study section padding |

### Rules

- **Never use arbitrary values.** Every spacing value should be a multiple of 4.
- **Tighter = more related.** Elements that belong together have smaller gaps.
- **Looser = more important.** Primary content gets generous breathing room.
- **Vertical rhythm > horizontal precision.** Consistent vertical spacing
  matters more than pixel-perfect horizontal alignment.

## Information Density

- **Body text:** 60ch max line width (`--measure`). Prevents eye fatigue.
  Aim for 8–12 words per line.
- **Card text:** Shorter — max 50ch for excerpts, 24ch for titles.
- **Headlines:** Max 8 words. If longer, break into subtitle.
- **Paragraphs:** 2–4 sentences. Break after each complete thought.
- **Lists:** 4–6 items max. Beyond that, group or summarize.

## Typography Sizing Rules

- **Never use more than 3 font sizes on a single visible screen.**
  Exception: metric callouts and micro labels.
- **Minimum body size:** 12px (never go below for any readable text).
- **Scale ratio:** Roughly 1.25× between each step:
  10 → 12 → 14 → 16 → 18 → 20 → 24
- **Letter-spacing tightens as size increases.** Large text needs negative
  tracking; small text needs neutral or positive tracking.

## Border Radius Inset Rule

When a rounded container holds a rounded child element, the child's radius
must be **reduced by the gap** between the child and the container edge.

```
outer_radius = container border-radius
gap          = padding between container edge and child edge
inner_radius = outer_radius - gap (minimum 0)
```

### Current relationships

| Container | Radius | Gap to child | Child radius |
|-----------|--------|-------------|--------------|
| ContentBlock (glass) | 28px (`--radius-xl`) | 28px padding | Cards: 20px (`--radius-lg`) → 28 - 8 = 20 ✓ |
| Card | 20px (`--radius-lg`) | 0 (image flush) | Image: 0 (squared inside card overflow) |
| Header pill | 999px (`--radius-pill`) | 6px padding | Nav pills: 999px (same — both pill) |
| Mobile nav overlay | 0 (inset:0) | 20px padding | Nav links: 12px (`--radius-md`) |

### When to break the rule

- **Pill shapes** (999px) always stay pill regardless of nesting.
- **Images inside cards** use `overflow: hidden` on the card — no radius on
  the image itself.

## Visual vs Mathematical Alignment

CSS alignment and visual alignment are not the same. Apply optical corrections:

- **Text next to icons:** Icons often need 1–2px vertical offset to align
  with the text baseline.
- **Uppercase text:** Looks higher than it is. Reduce top padding by 1–2px
  or increase bottom padding.
- **Rounded containers:** Padding inside rounded corners needs to be
  slightly larger than padding on straight edges (the radius eats space).
- **Arrow/CTA at bottom of card:** Align optically to the last line of text,
  not to a mathematical grid. Use `margin-top: auto` to push down, not
  fixed spacing.
- **Metric numbers (large bold):** Large numbers look heavier than text.
  Give them extra whitespace to breathe.

## Interactive Element Visual Language

### Static elements (glass panels)

- Red-tinted semi-transparent glass
- Shimmer animation (subtle, 16s loop)
- No border, no hover state
- Content reads through the panel

### Interactive elements (cards, links, buttons)

- Dark opaque background (`--color-card-bg`)
- `border: 1.5px solid transparent` at rest
- On hover: `border-color: var(--color-accent)` (bright orange #F05304)
- On hover: subtle outer glow + 2px lift
- On active: scale(0.99) press effect + stronger glow
- Thumbnail images zoom 1.03× on hover
- Arrow/CTA shifts right 4px + changes to accent color
- All transitions: 0.15–0.25s ease

### Focus states

- 2px orange outline (`--color-accent-muted`) with 2px offset
- Visible only on keyboard navigation (`:focus-visible`)

## Color Usage Rules

- **White (#fff)** — Primary headlines, active nav, metric values
- **Muted (rgba 0.6)** — Body text, descriptions, labels, inactive nav
- **Accent (#F05304)** — Hover borders, focus outlines, CTA highlights only
- **Never use accent for static text.** It's reserved for interaction feedback.
- **Background surfaces** go from transparent glass (static) to opaque dark
  gray (interactive). The contrast signals clickability.

## Page Composition

Each page follows this vertical flow:

1. **Header** — Fixed, always visible. Anchors the user.
2. **Title block** — ContentBlock with the page heading. Short, bold.
3. **Context block** — ContentBlock with explanatory text. Light, readable.
4. **Action area** — ContentBlock with cards/interactive elements. Grows
   to fill remaining viewport height.
5. **Footer** — Pill, credits. Lightweight.

### Breathing room

- Between header and first content: enough to feel separation (~64px total
  from top with padding calc).
- Between title and body blocks: 8px (tight — they're related).
- Between body and card blocks: 8px (same grouping).
- Home variant: extra padding-top to reveal background image eyes.

## Responsive Principles

- **Mobile is not a smaller desktop.** Rethink layouts, don't just shrink.
- Cards stack vertically on mobile (no 2-column grid).
- Case study cards switch from horizontal to vertical.
- Mobile nav is a full-screen overlay, not a dropdown.
- Touch targets: minimum 44px height.
- Body text stays 16px on mobile (never shrink for small screens).
- Headlines can reduce one step (24→20px) but no further.
