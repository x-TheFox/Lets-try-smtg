# Animation Improvement Plans

Prioritized implementation plans distilled from the animation audit of Agrya Consulting, following Emil Kowalski's design engineering principles.

## Plans Catalog

| # | Plan | Severity | Category | Status |
|---|---|---|---|---|
| **001** | [Motion Tokens, Performance & Accessibility](./001-motion-tokens-and-performance.md) | **HIGH** | Performance & A11y | **DONE** |
| **002** | [Financial Telemetry Ticker & Runway Horizon Gauge](./002-telemetry-and-runway-motion.md) | **HIGH** | State & Feedback | **DONE** |
| **003** | [Navigation Dropdown, Mobile Drawer & Modal Scale Entrances](./003-navigation-and-modal-transitions.md) | **HIGH** | Physicality & Origin | **DONE** |
| **004** | [Ecosystem Simulator Transitions & Smooth Route Paging](./004-ecosystem-simulator-and-page-transitions.md) | **MEDIUM** | Continuity & State | **DONE** |

## Recommended Execution Order

1. **Plan 001** (Tokens & Performance) — Establishes shared CSS easing variables (`--ease-spring`, `--ease-out`, `--ease-in-out`), purges `transition: all`, and fixes reduced-motion fallbacks. All subsequent plans rely on these tokens.
2. **Plan 002** (Telemetry Ticker & Horizon Gauge) — Highest user leverage on high-traffic financial surfaces (`/` Command Center and `/cfo` Runway Simulator).
3. **Plan 003** (Navigation & Modals) — Physicality and spatial consistency for primary chrome (Desktop Services dropdown, mobile drawer, partner inquiry dialog).
4. **Plan 004** (Ecosystem & Routes) — Adds fluid transitions to the platform architecture simulator and page navigation.
