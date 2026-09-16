# 001 — Motion Tokens, Performance & Accessibility Purification

- **Status**: DONE
- **Commit**: 230726a
- **Severity**: HIGH
- **Category**: Performance & Accessibility
- **Estimated scope**: 2 files (`src/index.css`, `tailwind.config.js`)

## Problem

In `src/index.css:38` and `src/index.css:42`, `.spring-standard` and `.spring-snappy` use `transition: all`. Per `AUDIT.md §5`, `transition: all` animates layout properties off the GPU, causes layout thrashing, and forces continuous reflows. Furthermore, `src/index.css:46-53` nukes all animation and transition durations to `0.01ms !important` under `prefers-reduced-motion`, destroying essential feedback and state legibility instead of providing calm, non-spatial transitions. Finally, hover transitions lack fine-pointer media gating, leaving sticky `:hover` states on mobile touch devices.

```css
/* src/index.css:36-53 — current */
.spring-standard {
  transition: all 400ms cubic-bezier(0.32, 0.72, 0, 1);
}

.spring-snappy {
  transition: all 250ms cubic-bezier(0.32, 0.72, 0, 1);
}

@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Target

Define canonical CSS variables for easings per `AUDIT.md §2`:
- `--ease-out: cubic-bezier(0.23, 1, 0.32, 1);`
- `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);`
- `--ease-spring: cubic-bezier(0.32, 0.72, 0, 1);`

Scope transition classes strictly to GPU-accelerated and paint properties (`transform`, `opacity`, `background-color`, `border-color`, `box-shadow`, `color`), ban `transition: all`, and refactor `prefers-reduced-motion` to keep gentle opacity/color feedback while eliminating position displacement:

```css
/* target */
:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-spring: cubic-bezier(0.32, 0.72, 0, 1);
}

.spring-standard {
  transition-property: transform, opacity, background-color, border-color, box-shadow, color;
  transition-duration: 350ms;
  transition-timing-function: var(--ease-spring);
}

.spring-snappy {
  transition-property: transform, opacity, background-color, border-color, box-shadow, color;
  transition-duration: 200ms;
  transition-timing-function: var(--ease-spring);
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 200ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 200ms !important;
    transform: none !important;
  }
}
```

## Repo conventions to follow

- Existing classes `.spring-standard` and `.spring-snappy` are imported in JSX across all components. Keep the class names identical to maintain zero regressions.
- Extend `tailwind.config.js` `transitionTimingFunction` to export `spring-apple`, `ease-out-strong`, and `ease-in-out-strong`.

## Steps

1. Update `src/index.css` to declare `:root` easing tokens.
2. Replace `transition: all` in `.spring-standard` and `.spring-snappy` with explicit `transition-property: transform, opacity, background-color, border-color, box-shadow, color;`.
3. Refactor the `@media (prefers-reduced-motion: reduce)` block in `src/index.css` so that color and opacity transitions remain at 200ms while disabling spatial displacement (`transform: none !important`).
4. Update `tailwind.config.js` with matching cubic-bezier easing tokens.

## Boundaries

- Do NOT rename `.spring-standard` or `.spring-snappy`.
- Do NOT touch business logic or JSX copy.
- Do NOT introduce any external CSS animation libraries.

## Verification

- **Mechanical**: `npm run build` exits 0 with zero CSS/TypeScript errors.
- **Feel check**:
  - Open DevTools Animations panel; verify transitions run on compositor thread (no layout recalculation warnings).
  - Emulate `prefers-reduced-motion: reduce` in Chrome DevTools Rendering tab. Button hovers should gracefully change background/opacity without jumping.
- **Done when**: Zero instances of `transition: all` remain in `src/index.css`.
