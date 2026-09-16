# 004 — Ecosystem Simulator Transitions & Smooth Route Paging

- **Status**: DONE
- **Commit**: 230726a
- **Severity**: MEDIUM
- **Category**: State Indication & Preventing Jarring Changes
- **Estimated scope**: 2 files (`src/components/home/EcosystemSection.tsx`, `src/App.tsx`)

## Problem

In `src/components/home/EcosystemSection.tsx:142-255`, switching between the platform architecture simulator tabs (Effortless, Actionboard, Pulse) abruptly replaces the entire DOM tree without transition. In `src/App.tsx:94-108`, switching between routes (`/`, `/accounting-hub`, `/cfo`, `/cfo-support`, `/story`, `/team`) instantly replaces the view with no continuity.

```tsx
/* EcosystemSection.tsx:173 — current */
<div className="lg:col-span-7 space-y-6">
  <div>
    <span className="font-mono text-xs text-agrya-teal-700 font-semibold uppercase tracking-wider">
      {currentPreview.badge}
    </span>
```

## Target

1. **Ecosystem Simulator Smooth Crossfade (`EcosystemSection.tsx`)**:
   - Add key-based lateral cross-fade: when `activePreview` changes, the telemetry panel glides in from `opacity: 0; transform: translateX(6px)` to `opacity: 1; transform: translateX(0)` with 200ms `var(--ease-out)`.
   - Add sliding indicator to tab buttons (`Effortless`, `Actionboard`, `Pulse`).
2. **Smooth Route Transitions (`App.tsx`)**:
   - Wrap `{renderRoute()}` in an animated transition container keyed by `currentPath`:
     - Keyframe / CSS transition: `opacity: 0; transform: translateY(4px)` to `opacity: 1; transform: translateY(0)`.
     - Duration: 160ms `var(--ease-out)`.
     - Graceful fallback under `prefers-reduced-motion: reduce`.

## Repo conventions to follow

- Native React state without heavy 3rd-party dependencies.
- Hardware-accelerated GPU transforms only.

## Steps

1. In `src/components/home/EcosystemSection.tsx`:
   - Add a key attribute or transition wrapper to the telemetry display container keyed to `activePreview`.
   - Animate the active tab button with `spring-snappy`.
2. In `src/App.tsx`:
   - Wrap the `<main>` content inside a key-animated route container that smoothly transitions on path changes.

## Boundaries

- Do NOT alter any factual platform information or routes.
- Do NOT break browser back/forward history navigation.

## Verification

- **Mechanical**: `npm run build` exits 0.
- **Feel check**:
  - Switch tabs between Effortless, Actionboard, and Pulse. Confirm smooth content transition.
  - Navigate between routes in the navbar. Confirm smooth page entrance without white flicker or layout shift.
- **Done when**: Tab switches and route navigations feel continuous and cohesive.
