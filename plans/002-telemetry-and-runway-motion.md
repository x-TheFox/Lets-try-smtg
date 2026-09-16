# 002 — Financial Telemetry Ticker & Interactive Runway Horizon Gauge

- **Status**: DONE
- **Commit**: 230726a
- **Severity**: HIGH
- **Category**: State Indication & Feedback
- **Estimated scope**: 2 files (`src/components/home/HeroCommandCenter.tsx`, `src/pages/CfoPage.tsx`)

## Problem

In `src/components/home/HeroCommandCenter.tsx:164-212`, when the user toggles between "Seed Stage", "Series A/B Growth", and "Enterprise Pods", key metrics (`18.4 Mo`, `1.1x`, `100%`, `-45%`) hard-swap instantly without transition. Furthermore, the segmented controller stage buttons (`HeroCommandCenter.tsx:119-152`) abruptly toggle background color classes without a physical sliding pill indicator. In `src/pages/CfoPage.tsx:117-129`, the modeled cash runway outputs a static number without visual horizon feedback.

```tsx
/* HeroCommandCenter.tsx:164-166 — current */
<div className="text-3xl font-extrabold font-mono text-agrya-slate-900 tracking-tight">
  {current.runway}
</div>
```

## Target

1. **Segmented Controller Sliding Indicator**: In `HeroCommandCenter.tsx`, implement a smooth sliding active background indicator (`transition: transform 220ms var(--ease-spring), width 220ms var(--ease-spring)`) that glides between Seed, Growth, and Enterprise buttons.
2. **Numeric Crossfade & Slide-In**: When `activeStage` changes, each telemetry card's numeric metric animates smoothly with a micro-fade/slide:
   `opacity: 0; transform: translateY(4px)` -> `opacity: 1; transform: translateY(0)` with duration 180ms `var(--ease-out)` using key-driven remounting or CSS transition state.
3. **Interactive Liquid Runway Horizon Gauge** in `CfoPage.tsx`:
   Add an animated progress horizon bar underneath the modeled runway number:
   - Width represents runway up to 36 months (`Math.min(100, (runwayMonths / 36) * 100)%`).
   - Liquid transition: `transition: width 350ms var(--ease-spring), background-color 350ms var(--ease-spring)`.
   - Dynamic status color: Amber for <12mo, Teal for 12-24mo, Emerald for 24+mo.

## Repo conventions to follow

- Use `clsx` for conditional classes.
- Follow the existing DoubleBezel container structure.
- Adhere strictly to the monospaced `font-mono` typographic convention for tabular figures.

## Steps

1. In `HeroCommandCenter.tsx`:
   - Add state tracking transition or keyed container for metric tiles so that toggling stages triggers a hardware-accelerated crossfade (`translateY(4px)` to `translateY(0)`).
   - Render an active sliding pill behind stage buttons with `spring-snappy` transition.
2. In `CfoPage.tsx`:
   - In the "Modeled Cash Runway" card, embed a dynamic progress horizon bar with smooth width and background color transitions responsive to slider dragging.
   - Add a subtle pulse ring to the horizon indicator when approaching critical thresholds (<12mo).

## Boundaries

- Do NOT change the formulas calculating runway or burn multiple.
- Preserve all existing factual copy, route buttons, and stage data verbatim.

## Verification

- **Mechanical**: `npm run build` exits 0.
- **Feel check**:
  - Click "Seed Stage", "Series A/B Growth", "Enterprise Pods". Verify metrics glide into place cleanly without layout jumping.
  - Drag the cash balance and burn rate sliders on `/cfo`. The horizon gauge must track smoothly at 60fps with zero stutter.
- **Done when**: Metric transitions are fluid and the runway horizon gauge dynamically reflects slider position.
