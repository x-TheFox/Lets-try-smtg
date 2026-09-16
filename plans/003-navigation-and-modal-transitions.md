# 003 — Navigation Dropdown, Mobile Drawer & Modal Scale Entrances

- **Status**: DONE
- **Commit**: 230726a
- **Severity**: HIGH
- **Category**: Physicality, Origin & Spatial Consistency
- **Estimated scope**: 2 files (`src/components/layout/Navbar.tsx`, `src/components/layout/InquiryModal.tsx`)

## Problem

In `src/components/layout/Navbar.tsx:64-100`, the desktop Services dropdown menu appears instantly when hovered or clicked (`{isServicesOpen && (`), with no entrance transition and no trigger-anchored `transform-origin`. On mobile, `{isMobileMenuOpen && (` opens with no expansion transition. In `src/components/layout/InquiryModal.tsx:52-58`, the dialog wrapper has a basic opacity fade, but the modal container itself lacks physical scale-in (`transform: scale(0.96)` to `scale(1)`), causing it to pop into existence without physical grounding.

```tsx
/* Navbar.tsx:64-66 — current */
{isServicesOpen && (
  <div className="absolute top-full left-0 pt-2 w-64 z-50">
    <div className="bg-white border border-agrya-slate-200 rounded-2xl p-2 shadow-card-elevated space-y-1">
```

## Target

1. **Services Dropdown (`Navbar.tsx`)**:
   - Keep dropdown mounted with CSS visibility/opacity/transform states:
     - Closed: `opacity: 0; transform: scale(0.95) translateY(-4px); pointer-events: none;`
     - Open: `opacity: 1; transform: scale(1) translateY(0); pointer-events: auto;`
     - `transform-origin: top left;`
     - Timing: `transition: transform 180ms var(--ease-out), opacity 180ms var(--ease-out);`
2. **Mobile Nav Drawer (`Navbar.tsx`)**:
   - Closed: `max-height: 0; opacity: 0; transform: scale(0.98); pointer-events: none;`
   - Open: `max-height: 400px; opacity: 1; transform: scale(1); pointer-events: auto;`
   - Timing: `transition: all 250ms var(--ease-spring);`
3. **Inquiry Modal (`InquiryModal.tsx`)**:
   - Backdrop: Fade in over 200ms `var(--ease-out)`.
   - Dialog Container: `opacity: 0; transform: scale(0.96) translateY(8px);` -> `opacity: 1; transform: scale(1) translateY(0);`
   - Timing: `transition: transform 240ms var(--ease-spring), opacity 200ms var(--ease-out);`
   - Transform origin: `center`.

## Repo conventions to follow

- Follow Tailwind utility classes alongside bespoke transition classes where beneficial.
- Preserve keyboard navigation (`Esc` key to close) and click-outside behavior.

## Steps

1. In `Navbar.tsx`, replace the conditional `{isServicesOpen && (` with a persistent animated container toggled via opacity and transform with `transform-origin: top left`.
2. In `Navbar.tsx`, animate the mobile menu toggle and drawer opening.
3. In `InquiryModal.tsx`, add scale-in and fade-in transitions to the inner card with proper initial mounting delay.

## Boundaries

- Do NOT alter any route links or consultation actions.
- Ensure `role="dialog"` and accessibility focus states remain intact.

## Verification

- **Mechanical**: `npm run build` exits 0.
- **Feel check**:
  - Hover or click "Services" in Navbar: dropdown must emerge fluidly from the trigger link with `transform-origin: top left`.
  - Open Inquiry Modal: dialog must expand with physical weight from `scale(0.96)` to `scale(1)` without flickering.
- **Done when**: No teleporting dialogs or popovers remain in global chrome.
