---
name: code-quality
description: >-
  Ensures code quality, build stability, and dev server health across all
  changes. Use BEFORE and AFTER every code change — especially multi-file
  edits, component refactors, or dependency updates. Prevents webpack cache
  corruption, SSR errors, type failures, and runtime regressions.
---

# Code Quality Protocol

## The Problem

Next.js 15 with webpack dev server is prone to **HMR cache corruption** when
many files change in quick succession. Symptoms:

- `__webpack_modules__[moduleId] is not a function`
- `SegmentViewNode` manifest errors
- `Cannot find module` errors during page data collection
- Pages stuck loading / 500 errors in dev
- `pages-manifest.json` ENOENT

These are **not code bugs** — they're stale cache artifacts. But they block
development and waste time debugging phantom issues.

## Pre-Change Checklist

Before making changes, verify:

1. **Read before edit.** Always read a file's current state before modifying
   it. Never assume content from memory or conversation context.

2. **Plan the dependency chain.** Map which files import what. If changing a
   component's props or exports, find every consumer first.

3. **Check for SSR safety.** Any code that accesses `document`, `window`,
   `localStorage`, or other browser APIs must:
   - Be in a `"use client"` component
   - Be wrapped in `useEffect` or behind a `mounted` state guard
   - Never run at module level or during render

4. **Check stacking context rules.** `backdrop-filter`, `transform`,
   `filter`, and `will-change` create new containing blocks. `position: fixed`
   inside these becomes relative to the ancestor, not the viewport.

5. **Never animate parents of backdrop-filter children.** CSS `animation`,
   `transform`, or `opacity < 1` on a parent element creates a compositing
   group that breaks `backdrop-filter` on all descendants. If page transitions
   or loading effects are needed, use sibling overlay elements (like the
   page veil) instead of animating the content container. The `FadeImage`
   component is safe inside portals (ImageViewer) but must NOT be used
   inside elements that rely on `backdrop-filter`.

## During Changes

### Single-file edits
- Edit, save, verify in browser. Low risk.

### Multi-file edits (3+ files)
- Batch related changes together (e.g., component + its CSS module).
- Avoid creating circular imports.
- If renaming exports, update ALL import sites in the same batch.

### Component restructuring
- Keep backward compatibility during transition. Don't remove props that
  consumers still reference.
- If changing a component's DOM structure (e.g., moving elements from child
  to sibling), update the corresponding CSS module in the same edit.

### Adding new dependencies
- Use the package manager (`npm install`). Never guess version numbers.
- After installing, restart the dev server (HMR won't pick up new node_modules).

## Post-Change Verification

After every substantive change:

### 1. Type check
```bash
npx tsc --noEmit
```
Catches type errors without building. Fast.

### 2. Lint check
Use the IDE linter (ReadLints tool) on changed files.

### 3. Build check (for multi-file changes)
```bash
Remove-Item -Recurse -Force .next; npx next build
```
The clean build is critical — it catches:
- Missing imports
- SSR-incompatible code
- Type errors that dev mode ignores
- Static generation failures

### 4. Dev server health
If the dev server is running and showing errors:
```powershell
# Kill all node processes
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

# Clear the cache
Remove-Item -Recurse -Force .next

# Restart
npx next dev
```

**Never** try to debug `__webpack_modules__` or `SegmentViewNode` errors in
code. These are always cache issues. Kill, clean, restart.

## Common Pitfalls

### `createPortal` and SSR
```typescript
// BAD — document doesn't exist during SSR
export default function Modal(props) {
  return createPortal(<Content />, document.body);
}

// GOOD — mount guard
export default function Modal(props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(<Content />, document.body);
}
```

### `backdrop-filter` containing block
```css
/* BAD — child's position:fixed is relative to parent, not viewport */
.parent {
  backdrop-filter: blur(40px);
}
.child {
  position: fixed;
  inset: 0; /* Will be sized to .parent, not viewport */
}

/* GOOD — move the fixed element outside the backdrop-filter parent */
```

### CSS Module specificity
```css
/* BAD — .navOpen may not override .nav if specificity is equal */
.nav { display: none; }
.navOpen { display: flex; }

/* The element has both classes: class={`${styles.nav} ${styles.navOpen}`}
   Works IF .navOpen appears AFTER .nav in the file.
   But fragile — better to use separate elements or a wrapper class. */
```

### `next/image` with external URLs
- External image hosts need `remotePatterns` in `next.config.ts`.
- Figma API URLs need `unoptimized` prop (they redirect).
- Missing config causes build failures or silent 404s.

### Global CSS vs CSS Modules
- Global rules like `a:hover { text-decoration: underline }` affect ALL
  elements, including Next.js `<Link>` components. This can cause visual
  bugs with navigation cards and buttons.
- Keep globals minimal: reset, tokens, sr-only, focus-visible.
- All component styles go in CSS Modules.

## Dependency Graph

Key import relationships to be aware of:

```
layout.tsx
└── PageLayout.tsx (client)
    ├── Header.tsx (client)
    │   └── Header.module.css
    ├── Footer.tsx (server)
    │   └── Footer.module.css
    └── PageLayout.module.css

page.tsx (server)
├── ContentBlock.tsx (server)
│   ├── ResponsiveContainer.tsx
│   └── ContentBlock.module.css
└── page.module.css

case-studies/[slug]/page.tsx (client)
├── CaseStudyContainer.tsx
├── QuoteBlock.tsx
├── CaseStudySection.tsx
├── ScreenshotGroup.tsx (client)
├── MetricsBlock.tsx
├── SectionDivider.tsx
└── ImageViewer.tsx (client, portal)
```

### Server vs Client boundaries

| Component | Boundary | Reason |
|-----------|----------|--------|
| PageLayout | client | usePathname |
| Header | client | useState (menu), usePathname |
| Footer | server | No interactivity |
| ContentBlock | server | Pure presentation |
| ImageViewer | client | useState, useEffect, createPortal |
| ScreenshotGroup | client | onClick handlers |
| All pages except [slug] | server | No client state |
| [slug]/page.tsx | client | ImageViewer state management |

## Recovery Procedures

### Webpack cache corruption
```powershell
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep 2
Remove-Item -Recurse -Force .next
npx next dev
```

### Module not found during build
1. Check import paths (case-sensitive on Linux/Vercel).
2. Verify the file exists.
3. Check `tsconfig.json` path aliases (`@/` → `src/`).
4. Clean `.next` and rebuild.

### Hydration mismatch
1. Check for browser-only code in render path.
2. Add `suppressHydrationWarning` to `<html>` and `<body>` (already done).
3. Wrap browser-dependent rendering in `useEffect` + `mounted` guard.

### Static generation failure
1. Check `generateStaticParams` returns all needed slugs.
2. Ensure server components don't import client-only libraries.
3. Verify Figma/external URLs are accessible during build.

## When to Escalate

If after kill → clean → restart the errors persist:
1. Delete `node_modules/.cache` as well.
2. Run `npm install` to refresh node_modules.
3. If still failing, check Next.js GitHub issues for the specific error.
