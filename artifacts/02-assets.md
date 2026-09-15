# Gate 1 — Asset Harvest & IP Dispositions

## Harvest Summary
All client assets from `https://www.agrya.in/` were harvested and saved into `/public/assets/original/`.

| Asset File | Format | Original Size | Dimensions / Type | Purpose | License Disposition |
|---|---|---|---|---|---|
| `logo.png` | PNG | 9.6 KB | 280x80 (approx) | Primary Brand Wordmark / Emblem | **REUSE** (Client-owned original) |
| `actionboard-logo.png` | PNG | 276.6 KB | 800x200 | Partner / Ecosystem product logo | **REUSE** (Partner brand asset) |
| `effortless-logo.png` | PNG | 16.1 KB | 400x120 | Partner / Ecosystem product logo | **REUSE** (Partner brand asset) |
| `accounting.jpg` | JPEG | 22.5 KB | 600x400 | Service card imagery (Accounting Hub) | **REPLACE** (Low-res stock photo -> High-end interactive SVG/illustration & crisp modern asset) |
| `cfo-support.jpg` | JPEG | 34.6 KB | 600x400 | Service card imagery (CFO Support) | **REPLACE** (Low-res stock photo -> High-end interactive visual) |
| `virtual-cfo.jpg` | JPEG | 47.6 KB | 600x400 | Service card imagery (Virtual CFO) | **REPLACE** (Low-res stock photo -> High-end interactive visual) |
| `vcfo-hero.jpg` | JPEG | 265.3 KB | 1200x800 | Hero abstract graphic & OG share image | **REPLACE** (Generic abstract illustration -> Bespoke dynamic interactive financial OS graphic + bespoke CSS glass canvas) |
| `team/avinash.png` | PNG | 68.3 KB | 400x400 portrait | Leadership headshot (Avinash Sancheti) | **REUSE** (Authentic client team portrait, enhanced with CSS duotone/monochrome treatment) |
| `team/jayakumar.png` | PNG | 59.4 KB | 400x400 portrait | Leadership headshot (Jayakumar) | **REUSE** (Authentic client team portrait) |
| `team/manoj.png` | PNG | 70.8 KB | 400x400 portrait | Leadership headshot (Manoj) | **REUSE** (Authentic client team portrait) |
| `team/priya.png` | PNG | 87.8 KB | 400x400 portrait | Leadership headshot (Priya) | **REUSE** (Authentic client team portrait) |
| `team/ramprakash.png` | PNG | 69.8 KB | 400x400 portrait | Leadership headshot (Ramprakash) | **REUSE** (Authentic client team portrait) |
| `team/saichand.jpg` | JPEG | 35.1 KB | 400x400 portrait | Leadership headshot (Saichand) | **REUSE** (Authentic client team portrait) |
| `team/hrishi.jpeg` | JPEG | 80.1 KB | 400x400 portrait | Senior Consultant headshot (Hrishi) | **REUSE** (Authentic client team portrait) |
| `team/mrudula.jpeg` | JPEG | 112.3 KB | 400x400 portrait | Senior Consultant headshot (Mrudula) | **REUSE** (Authentic client team portrait) |

---

## Font & Third-Party Library Disposition
1. **Fonts**:
   - Original site: Google Fonts `Plus Jakarta Sans` (300, 400, 500, 600, 700).
   - Disposition: Open-source font (SIL Open Font License). In the rebuilt application, we pair `Plus Jakarta Sans` / `Geist Sans` for clean, ultra-legible body typography with an editorial/display weight and `JetBrains Mono` for financial metrics.
2. **Third-Party Trackers**:
   - Original site: Crisp Chat widget (`0d2afd41-48ab-4f4f-9b6a-9bcba18f6d85`) and Google Analytics (`UA-91283061-2`).
   - Disposition: Preserved cleanly or made configurable via environment variables without degrading Core Web Vitals.
3. **Structured Data**:
   - ProfessionalService Schema JSON-LD with 4 branches in Chennai, Bengaluru, Hyderabad, and Mumbai preserved 100% verbatim.
