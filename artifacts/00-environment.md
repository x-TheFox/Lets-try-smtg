# Gate 0 — Preflight & Environment Reconciliation

## 1. Resume Check
- **Status**: Fresh repository initialization (`main` branch).
- **Prior Run Found**: None. Workspace was empty.
- **Starting Gate**: Gate 0 (Preflight & Guardrails) → Gate 1 (Discovery & Forensics).

## 2. Skill Reconciliation Matrix
| Referenced Skill | Mapped Skill / Implementation | Availability |
|---|---|---|
| `/chrome-devtools` | Playwright MCP tools (`browser_navigate`, `browser_snapshot`, `browser_evaluate`, `browser_take_screenshot`) + native `curl`/`node` | Verified & Active |
| `/chrome-extensions` | `chrome-extensions` | Available |
| `/image-to-code` | `image-to-code` | Available |
| `/brainstorming` | `brainstorming` | Available |
| `/high-end-visual-design` | `high-end-visual-design` | Available |
| `/design-taste-frontend` | `design-taste-frontend` | Available |
| `/stitch-design-taste` | `stitch-design-taste` | Available |
| `/gpt-taste` | `gpt-taste` | Available |
| `/brandkit` | `brandkit` | Available |
| `/apple-design` | `apple-design` | Available |
| `/minimalist-ui` | `minimalist-ui` | Available |
| `/industrial-brutalist-ui` | `industrial-brutalist-ui` | Available |
| `/redesign-existing-projects` | `redesign-existing-projects` | Available |
| `/emil-design-eng` | `emil-design-eng` | Available |
| `/animation-vocabulary` | `animation-vocabulary` | Available |
| `/find-animation-opportunities`| `find-animation-opportunities` | Available |
| `/animate` | `animate` | Available |
| `/improve-animations` | `improve-animations` | Available |
| `/remotion` | `remotion` | Available |
| `/design-md` | `design-md` | Available |
| `/imagegen-frontend-web` | `imagegen-frontend-web` | Available |
| `/imagegen-frontend-mobile` | `imagegen-frontend-mobile` | Available |
| `/gemini-omni-flash-api` | `gemini-omni-flash-api` | Available |
| `/modern-web-guidance` | `modern-web-guidance` | Available |
| `/react:components` | `react-components` | Available |
| `/shadcn-ui` | `shadcn-ui` | Available |
| `/vercel-composition-patterns` | `vercel-composition-patterns` | Available |
| `/vercel-react-best-practices` | `vercel-react-best-practices` | Available |
| `/vercel-react-view-transitions`| `vercel-react-view-transitions` | Available |
| `/verification-before-completion` | `verification-before-completion` | Available |
| `/debug-optimize-lcp` | `debug-optimize-lcp` | Available |
| `/vercel-optimize` | `vercel-optimize` | Available |
| `/a11y-debugging` | `a11y-debugging` | Available |
| `/web-design-guidelines` | `web-design-guidelines` | Available |
| `/subagent-driven-development` | `subagent-driven-development` | Available |
| `/dispatching-parallel-agents` | `dispatching-parallel-agents` | Available |
| `/writing-plans` | `writing-plans` | Available |
| `/executing-plans` | `executing-plans` | Available |
| `/using-git-worktrees` | `using-git-worktrees` | Available |
| `/finishing-a-development-branch` | `finishing-a-development-branch` | Available |
| `/writing-skills` | `writing-skills` | Available |

## 3. Input Triage & Live Drift
- **Input Source**: Live site `https://www.agrya.in/`.
- **Attached HTML files**: None provided in repository; live site is primary and authoritative source of truth.
- **Connectivity Status**: HTTP/2 200 OK (AmazonS3 / CloudFront edge cache verified).
- **Live Drift**: Baseline established against live URL.

## 4. Hard Ceilings & Budgets
| Phase | Tool Call Budget | Browser Sessions | Target Turns |
|---|---|---|---|
| Gate 0: Preflight | 10 calls | 1 session | 1 |
| Gate 1: Forensics & Harvest | 40 calls | 2 sessions | 2-3 |
| Gate 2: Direction Tournament | 25 calls | 1 session | 2 |
| Gate 3: System Design | 20 calls | 0 sessions | 1 |
| Gate 4: Build & Vertical Slice | 60 calls | 1 session | 3-4 |
| Gate 5: Verification & Matrix | 45 calls | 3 sessions | 2-3 |

## 5. IP & Asset Boundary Rules
- **Logo & Identity**: Extract and preserve official Agrya logos and branding assets to `/public/assets/original/`.
- **Photography / Graphic Assets**: Catalog original images; assess resolution and quality; replace with higher-fidelity bespoke modern UI illustrations and generative assets where appropriate.
- **Typography**: Licensed fonts replaced with ultra-clean modern typography (Geist, Clash Display, Plus Jakarta Sans, JetBrains Mono) via Google Fonts / Fontsource.
- **Copy**: 100% factual fidelity. All claims, metrics, features, titles, contact information, and value propositions preserved verbatim.
