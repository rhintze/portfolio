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

1. **Primary** — The single most important thing (headline, case study title).
   Largest type, strongest weight, full white.
2. **Secondary** — Supporting context (paragraphs, excerpts, principles).
   Smaller type, lighter weight or muted color.
3. **Tertiary** — Navigation cues and metadata (labels, CTAs, counters).
   Smallest type, muted, uppercase tracking.

### Hierarchy Signals (strongest → weakest)

| Signal | How we use it |
|--------|--------------|
| Size | 40px display → 24px page title → 14px body → 10px label |
| Weight | 700 bold headlines → 500 principles → 300 light body |
| Color | `--color-text` (primary) → `--color-text-muted` (secondary) |
| Case | UPPERCASE for headlines/labels/display → Sentence case for body |
| Spacing | More padding around primary content, tighter around tertiary |

## Typography Scale

Standardized roles with consistent sizing:

| Role | Size | Weight | Tracking | Example |
|------|------|--------|----------|---------|
| Display | 40px (28px mobile) | 700 | -0.44px | Capabilities list items |
| Page title | 24px | 700 | -0.264px | Hero headline |
| Section title | 14px | 700 | -0.154px | "Experience", "Design Philosophy" |
| Card title | 16px | 700 | -0.176px | Card headings |
| Body | 14px | 300/500 | -0.154px | Paragraphs, principles |
| Caption | 12px | 300 | -0.132px | Nav, metadata, experience details |
| Label | 10px | 500 | 0.5px | Card labels, meta items |

Display text is intentionally larger than section titles — it serves as
a visual element, not just readable text.

## Spacing Rhythm

All spacing derives from a **4px base unit**. Common values:

| Multiple | px | Usage |
|----------|-----|-------|
| 1× | 4px | Minimum breathing room, main-x padding, card image inset |
| 2× | 8px | Section gaps, card gaps |
| 3× | 12px | Page edge padding, tagline gaps |
| 4× | 16px | Card label-to-body spacing, principle gaps |
| 5× | 20px | Card content padding, image gap |
| 7× | 28px | ContentBlock inner padding, card arrow spacing |
| 8× | 32px | Hero block spacing (headline → bio → meta) |
| 12× | 48px | Case study section padding |

### Rules

- **Never use arbitrary values.** Every spacing value should be a multiple of 4.
- **Tighter = more related.** Elements that belong together have smaller gaps.
- **Looser = more important.** Primary content gets generous breathing room.
- **Vertical rhythm > horizontal precision.** Consistent vertical spacing
  matters more than pixel-perfect horizontal alignment.

### Content Group Spacing

Cards and sections use three distinct content groups:
- **Group 1 → Group 2:** 16px (label to body)
- **Group 2 internal:** 4–6px (title to description, tightly coupled)
- **Group 2 → Group 3:** 28px (body to action/arrow)

Hero uses generous group spacing:
- **Headline → Bio:** 32px
- **Bio → Metadata:** 32px

## Information Density

- **Body text:** 60ch max line width (`--measure`). Prevents eye fatigue.
- **Card text:** Shorter — max 50ch for excerpts, 28ch for titles.
- **Headlines:** Max 8 words. If longer, break into subtitle.
- **Paragraphs:** 2–4 sentences. Break after each complete thought.
- **Lists:** 4–8 items max. Beyond that, group or summarize.

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
| Interactive card | 28px (`--radius-xl`) | 4px inset | Image: 24px |
| ContentBlock (glass) | 28px (`--radius-xl`) | 28px padding | N/A (text content) |
| Header pill | 999px (`--radius-pill`) | 6px padding | Nav pills: 999px, Burger: 50% circle |
| Mobile nav overlay | 0 (inset:0) | 20px padding | Nav links: 999px (`--radius-pill`) |
| Screenshot container | 28px (`--radius-xl`) | 0 padding | Screenshots have own radius |

### When to break the rule

- **Pill shapes** (999px) always stay pill regardless of nesting.
- **Circular elements** (burger button: 50%) follow circle logic, not inset.

## Visual vs Mathematical Alignment

CSS alignment and visual alignment are not the same. Apply optical corrections:

- **Text next to icons:** Icons often need 1–2px vertical offset to align
  with the text baseline.
- **Uppercase text:** Looks higher than it is. Reduce top padding by 1–2px
  or increase bottom padding.
- **Rounded containers:** Padding inside rounded corners needs to be
  slightly larger than padding on straight edges (the radius eats space).
- **Arrow/CTA at bottom of card:** Use consistent margin-top (28px) to
  create clear visual separation from the body group.
- **Metric numbers (large bold):** Large numbers look heavier than text.
  Give them extra whitespace to breathe.

## Container Surface Language

### Read-only surfaces (glass panels)

- Red-tinted semi-transparent glass (`--gradient-glass`)
- `backdrop-filter: blur(var(--blur-glass))`
- Shimmer animation (subtle, 16s loop)
- No border, no hover state
- Used for: hero, info sections, metric cards

### Interactive surfaces (clickable cards)

- Dark semi-transparent (`--color-card-bg`, 0.35 opacity)
- `backdrop-filter: blur(var(--blur-glass))` — same blur as glass
- `border: 1.5px solid transparent` at rest
- On hover: orange border, glow, 2px lift
- On active: scale(0.99), stronger glow
- Used for: navigation cards, case study cards

### Neutral containers (screenshot sections)

- Same `--color-card-bg` as interactive cards but without hover states
- Used to visually group content (screenshots, media)

## Page Composition

Each page follows this vertical flow:

1. **Header** — Fixed, always visible. Anchors the user.
2. **Hero/Title** — ContentBlock with page heading and context.
3. **Content sections** — Rendered directly in page flow:
   - Glass sections for read-only content
   - Card grids for interactive content
   - Dark containers for media/screenshots
4. **Footer** — Pill, credits. Lightweight.

### Home page structure

1. ContentBlock (hero: headline, bio, metadata)
2. Card grid (Case Studies + Creative Lab)
3. Glass section (Experience + Design Philosophy, two columns)
4. Glass section (What I'm known for, display text)

### Breathing room

- Between header and first content: ~64px (from padding calc)
- Between sections: 8px (`--gap-section`)
- Home variant: 200px padding-top for background image reveal

## Page Transitions

Navigation uses a **veil overlay** that fades from opaque black to
transparent (0.45s ease-out with 0.05s delay). The veil is a fixed sibling
element (`z-index: 50`), not a parent — this avoids breaking
`backdrop-filter` on content elements.

**CRITICAL constraint:** Never apply `animation`, `transform`, or `opacity`
animations to parent elements that contain `backdrop-filter` children.
These properties create compositing groups that break the blur effect.

## Responsive Principles

- **Mobile is not a smaller desktop.** Rethink layouts, don't just shrink.
- Cards stack vertically on mobile (no 2-column grid).
- Two-column sections (experience/philosophy) stack on mobile.
- Mobile nav is a full-screen overlay with pill-shaped links.
- Touch targets: minimum 44px height.
- Body text stays 14px on mobile (never shrink for small screens).
- Display text scales: 40px desktop → 28px mobile.
- Headlines stay 24px on all screens.
