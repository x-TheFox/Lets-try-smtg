# Gate 1 — Current System & Performance Baselines

## 1. Extracted Design Tokens (Original Site)

### A. Typography
- **Primary Font Family**: `"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif`
- **Loaded Weights**: 400, 500, 600, 700 (300 declared in HTML link but unloaded in initial paint)
- **Computed Type Scale**:
  - `10px` / `0.625rem` — Micro badges / metadata
  - `12px` / `0.75rem` — Address fine-print, legal labels
  - `14px` / `0.875rem` — Navigation links, footer links, secondary copy
  - `16px` / `1.0rem` — Base body text (`line-height: 24px` / `1.5`)
  - `18px` / `1.125rem` — Card titles, subheadings
  - `20px` / `1.25rem` — Section callouts
  - `36px` / `2.25rem` — Section headers (`H2`)
  - `72px` / `4.5rem` — Hero headline (`H1`) on large desktop (`48px` on mobile)

### B. Color Palette
- **Primary Brand Accent**: Teal `rgb(13, 148, 136)` / `#0D9488` / `oklch(0.6 0.118 184.704)`
- **Secondary Accent**: Blue `rgb(59, 130, 246)` / `#3B82F6` (used in external links / icons)
- **Dark Neutral (Headings & Dark Sections)**: Slate 900 `rgb(15, 23, 42)` / `#0F172A` / `oklch(0.208 0.042 265.755)`
- **Body Neutral (Paragraphs)**: Slate 600 `oklch(0.446 0.043 257.281)` / `#475569`
- **Muted Neutral (Borders & Dividers)**: Slate 300/400 `oklch(0.704 0.04 256.788)`
- **Light Background**: Pure White `rgb(255, 255, 255)` & Off-white tint `oklab(0.999994 0.0000455678 0.0000200868 / 0.05)`

### C. Layout & Spacing Rhythm
- **Container Max-Width**: `max-w-7xl` (`1280px`) on desktop
- **Section Padding**: `py-16` (`64px`) to `py-24` (`96px`)
- **Grid Systems**: 3-column equal grid for Services (`grid-cols-1 md:grid-cols-3 gap-8`), 4-column grid for Footer addresses

---

## 2. Performance & Vitals Baseline (Live Chromium Audit)

| Metric | Measured Baseline | Target Standard | Assessment |
|---|---|---|---|
| **TTFB** (Time to First Byte) | 32.9 ms | < 200 ms | **EXCELLENT** (CloudFront edge cache hit) |
| **FCP** (First Contentful Paint) | 2,552 ms | < 1,000 ms | **POOR** (Delayed due to render-blocking Google Font stylesheet & Crisp chat script injection) |
| **LCP** (Largest Contentful Paint) | ~2,780 ms | < 2,000 ms | **POOR** (Hero image `vcfo-hero.jpg` 265KB uncompressed, not preloaded) |
| **CLS** (Cumulative Layout Shift) | 0.04 | < 0.05 | **ACCEPTABLE** |
| **DOM Content Loaded** | 322.2 ms | < 500 ms | **GOOD** |
| **Total Window Load** | 567.0 ms | < 1,500 ms | **GOOD** |

---

## 3. Accessibility & DOM Quality Audit

1. **Heading Hierarchy**:
   - `H1` correctly present on all routes.
   - Jump in hierarchy: Missing `H2` before some `H3` items in footer columns.
2. **Contrast**:
   - Slate-600 on white passes WCAG AA (ratio 5.4:1).
   - Teal-600 on dark slate passes, but teal text on white background in certain badges has contrast ~3.8:1 (fails WCAG AA for normal text < 4.5:1). Rebuilt system will enforce compliant contrast tokens (≥ 4.5:1 for body, ≥ 3:1 for large text).
3. **Interactive Targets**:
   - Mobile tap targets in navigation dropdown are slightly cramped (< 44px height).
   - Logo in header missing clear focus outline.
4. **Motion & Interactions**:
   - Original site has very minimal motion: standard browser hover underlines, basic opacity transition on cards.
   - Missing spring physics, lack of haptic active states, lack of orchestrated page entry or view transitions.
