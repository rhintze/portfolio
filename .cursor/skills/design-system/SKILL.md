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
| `--color-text` | `#ffffff` | Primary text |
| `--color-text-muted` | `rgba(255,255,255,0.6)` | Secondary text, nav links, captions |
| `--color-border` | `rgba(255,255,255,0.1)` | Borders on glass panels, header, footer |

### Gradient Stops

From Figma — warm red/orange ramp:

| Token | Hex |
|-------|-----|
| `--grad-1` | `#4D0B00` |
| `--grad-2` | `#D01100` |
| `--grad-3` | `#F05304` |
| `--grad-4` | `#FFC18B` |

### Gradients

| Token | Usage |
|-------|-------|
| `--gradient-hero` | Background overlay (applied with `mix-blend-mode: multiply`) |
| `--gradient-glass` | Glass panel fill (20% opacity stops) |

### Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-xl` | `32px` | Glass panels, header, footer |
| `--radius-lg` | `24px` | Cards, large interactive elements |
| `--radius-md` | `16px` | Buttons, inputs |
| `--radius-sm` | `8px` | Tags, small elements |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--gap-section` | `12px` | Gap between content blocks |
| `--padding-page` | `24px` | Page-level padding |
| `--padding-block` | `48px` | Padding inside glass panels |
| `--blur-glass` | `40px` | Backdrop blur for frosted effect |
| `--measure` | `65ch` | Max text width (~65-75 chars/line) |

## Typography

**Font:** IBM Plex Mono (Google Fonts)  
**Weights:** 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)  
**Variable:** `--font-ibm-plex-mono`

### Scale

| Role | Size | Weight | Tracking | Transform |
|------|------|--------|----------|-----------|
| Display / Name | 32px | 700 | -0.352px | uppercase |
| Heading | 24px | 700 | -0.264px | uppercase |
| Quote | 40px | 400 italic | -0.44px | — |
| Body | 20px | 300 | -0.22px | — |
| Body small / Nav | 14–16px | 300 | -0.154 to -0.176px | — |

### Rules

- Line height: `1.5` for body text, `1.3` for quotes.
- All text left-aligned. Text across separate blocks shares the same left margin.
- Max line width controlled by `--measure` inside `ContentBlock`.

## Layout Architecture

```
PageLayout (fixed background + content layer)
├── Background (fixed, full viewport)
│   ├── Image (object-fit: cover)
│   └── Gradient overlay (multiply blend)
├── Header (border, radius, flex row)
├── Main (flex column, gap: 12px, full width)
│   └── ContentBlock (glass panel)
│       └── ResponsiveContainer (max-width: 65ch)
└── Footer (border, radius, flex row)
```

### Key principles

1. **Main has no max-width.** Glass panels stretch full width. Only the
   `ResponsiveContainer` inside each `ContentBlock` constrains text width.
2. **Background gradient uses `mix-blend-mode: multiply`** so the image reads
   as deep saturated red. Black areas remain black.
3. **Home variant:** Main gets `padding-top: min(25vh, 200px)` to reveal the
   background image (eyes) above the frosted blocks.
4. **Glass panels** use `backdrop-filter: blur(40px)` + gradient-glass fill +
   subtle 8s gradient animation.

## Component Patterns

### ContentBlock

Frosted glass container. Accepts `align` prop (`start` | `center` | `end`).
Inner content is always left-aligned for consistency; alignment shifts the
container position, not text direction.

### Header

- Logo left, nav right.
- Nav links: 14px, weight 300, muted. Active: weight 500, full white.
- Uses `--radius-xl` for border-radius.

### Footer

- Credits right-aligned.
- Same border/radius treatment as header.

## Adding New Pages

1. Create `src/app/your-page/page.tsx` and `page.module.css`.
2. Use `<ContentBlock>` for each content section.
3. Use token classes for typography (don't hard-code font sizes).
4. Add route to `navItems` in `src/components/Header/Header.tsx`.
