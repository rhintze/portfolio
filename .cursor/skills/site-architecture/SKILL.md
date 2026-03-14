---
name: site-architecture
description: >-
  Maps the portfolio's page structure, component tree, data flow, and asset
  pipeline. Use when adding new pages, creating components, refactoring
  existing pages, managing images/videos, or when the user asks about how
  the site is organized, where content lives, or how to add new content.
---

# Site Architecture

## Page Map

| Route | File | Description | Key components |
|-------|------|-------------|----------------|
| `/` | `src/app/page.tsx` | Home — intro + two navigation cards (Case Studies, Creative Lab) | ContentBlock, Link, Image |
| `/about` | `src/app/about/page.tsx` | Bio and background | ContentBlock |
| `/case-studies` | `src/app/case-studies/page.tsx` | Case study index — 3 cards with images, metrics, CTA | ContentBlock, Link, Image |
| `/case-studies/[slug]` | `src/app/case-studies/[slug]/page.tsx` | Case study detail — editorial layout | CaseStudyContainer, QuoteBlock, CaseStudySection, ScreenshotGroup, MetricsBlock, SectionDivider, ImageViewer |
| `/creative-lab` | `src/app/creative-lab/page.tsx` | Personal projects — immersive gallery | ContentBlock (title only), Image |

## Component Tree

```
PageLayout (client, wraps all pages)
├── Background (Image + gradient overlay)
├── Header (client)
│   ├── headerInner (logo + desktop nav + burger)
│   └── mobileNav (sibling of headerInner — avoids backdrop-filter bug)
├── Main
│   └── [Page content]
└── Footer

ContentBlock (glass panel container)
├── ResponsiveContainer → inner (max-width: 60ch for text)
└── When grow=true → inner has no max-width

CaseStudyContainer (article wrapper for detail pages)
├── QuoteBlock
├── SectionDivider
├── CaseStudySection (two-column: text + visual)
│   └── ScreenshotGroup (clickable images)
├── MetricsBlock (metric cards grid)
└── SectionDivider

ImageViewer (portal on document.body, z-9000)
```

## Data Model

### Case Studies (currently inline, future: CMS or MDX)

```typescript
type CaseStudy = {
  slug: string;
  label: string;        // company name
  title: string;
  excerpt: string;
  metric: string;       // hero number (e.g. "2.6×")
  metricLabel: string;
  image: string;        // card preview URL
  imageAlt: string;
};
```

### Screenshots

```typescript
type Screenshot = {
  src: string;
  alt: string;
  caption?: string;
  description?: string;  // shown in ImageViewer
};
```

### Creative Lab Projects

```typescript
type ProjectImage = {
  src: string;
  alt: string;
  aspect?: "cinematic" | "wide" | "standard" | "portrait";
};

type CreativeProject = {
  title: string;
  medium: string;
  year?: string;
  description?: string;
  featured?: boolean;       // hero treatment with larger frame
  images: ProjectImage[];   // supports multi-image projects
};
```

## Asset Pipeline

| Type | Location | Loading |
|------|----------|---------|
| Local images | `public/images/` | next/image, auto-optimized |
| Figma assets | `figma.com/api/mcp/asset/...` | next/image, `unoptimized` flag |
| Fonts | Google Fonts via `next/font` | Self-hosted, swap display |

### Image Guidelines

- Use `next/image` with `fill` + `object-fit: cover` for thumbnails.
- Always provide meaningful `alt` text describing the visual content.
- Figma URLs require `unoptimized` prop (external host).
- Local images in `public/images/` are automatically optimized.
- Card thumbnails use `aspect-ratio: 16/9`.

## Adding a New Case Study

1. Add entry to `caseStudies` array in `src/app/case-studies/page.tsx`.
2. Create detail content in `src/app/case-studies/[slug]/page.tsx` (or create
   a separate file and import). Use the existing component primitives:
   - `CaseStudyContainer` (outer glass wrapper)
   - `QuoteBlock` (hero quote)
   - `CaseStudySection` (text + optional visual)
   - `ScreenshotGroup` (phone/desktop screenshots, clickable)
   - `MetricsBlock` (impact numbers)
   - `SectionDivider` (thin horizontal line)
3. Add slug to `generateStaticParams` in `[slug]/layout.tsx`.
4. Add card image to `public/images/` or use Figma asset URL.

## Adding a New Creative Lab Project

1. Add images to `public/images/`.
2. Add entry to `projects` array in `src/app/creative-lab/page.tsx`.
3. Set `featured: true` for hero-treatment projects (large cinematic frame).
4. Choose aspect per image: `cinematic` (2.39:1), `wide` (16:9),
   `standard` (4:3), or `portrait` (3:4).
5. Multi-image projects: add multiple entries to the `images` array.
   Additional images render in a 2-column grid below the first.
6. For video content: use `<video>` with `preload="metadata"`, poster frame,
   and lazy loading. Keep videos under 10MB; consider WebM + MP4 fallback.

## Adding a New Page

1. Create `src/app/your-page/page.tsx` + `page.module.css`.
2. Use `ContentBlock` for static text, `ContentBlock grow` for card grids.
3. Follow typography scale from the design-system skill.
4. Add route to `navItems` in `src/components/Header/Header.tsx`.

## Stacking Context / Z-Index Map

| Layer | z-index | Element |
|-------|---------|---------|
| Background | 0 | Background image + gradient |
| Content | 1 | ContentLayer (main + footer) |
| Mobile nav overlay | 98 | Full-screen nav (sibling of headerInner) |
| Header inner | 99 | headerInner (relative, inside .header) |
| Header | 100 | Fixed header wrapper |
| ImageViewer | 9000 | Portal on document.body |

## Performance Notes

- All pages are statically generated (SSG).
- Dynamic routes use `generateStaticParams` for pre-rendering.
- Images use next/image for automatic optimization (except Figma URLs).
- CSS Modules ensure zero unused CSS in production.
- No client-side JavaScript on static pages (ContentBlock, Footer are server
  components). Only Header, ImageViewer, and case study detail use `"use client"`.

## Future Considerations

- **MDX for case studies:** Move content from inline JSX to `.mdx` files for
  easier editing. Use `@next/mdx` or `contentlayer`.
- **CMS integration:** If content grows, consider a headless CMS (Sanity,
  Contentful) to manage case studies and creative lab projects.
- **Video optimization:** For creative lab videos, consider Cloudinary or
  Mux for adaptive streaming and poster generation.
- **Analytics:** Integrate Vercel Analytics or Plausible for privacy-friendly
  tracking without cookie banners.
- **i18n:** If multilingual support is needed, use Next.js i18n routing.
