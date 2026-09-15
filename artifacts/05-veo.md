# Gate 3 — Veo Shot List & Media Direction

## Veo Video Production Grammar & Intent
Every video asset created for Agrya is purpose-driven to reinforce the brand's identity as **"The Financial OS for Modern Business."**
All prompts strictly adhere to the standardized cinematic prompt grammar:
`[Shot size/angle], [subject/action], in [environment]. Camera: [movement, speed, lens]. Lighting: [key/fill/practicals/time]. Grade: [palette, reference, texture]. Material: [surfaces]. Motion coherence: [what moves together, relative speeds]. Loop: static camera, or last-frame→first-frame chaining for a seamless seam. Audio: [ambient/music] or "silent, looped". Negative: no text, no captions, no subtitles, no watermarks, no logos, no warped hands, no lens-flare clichés. Aspect: 16:9 / 9:16 / 1:1.`

---

## Shot 1: Hero Ambient — "The Architecture of Financial Clarity"

### Purpose
To establish an aura of calm, monolithic precision and computational financial intelligence behind the hero title on desktop and wide screens.

### Veo Prompt (Copy-Paste Ready)
```text
Wide macro architectural shot, pristine matte aluminum and frosted optical glass slabs silently shifting in microscopic alignment representing an abstract financial ledger mechanism, in a minimalist high-ceiling architectural studio. Camera: slow 50mm telephoto push-in, perfectly linear, zero camera shake, f/4 aperture. Lighting: soft diffused north-facing morning daylight with subtle silver rim light catching precision machined chamfers. Grade: high-key neutral silver and deep slate, Arri Alexa natural skin/material roll-off, fine analog grain. Material: bead-blasted aluminum, optically pure water-white glass, honed dark slate. Motion coherence: glass slabs glide horizontally at constant 1cm/s while internal reflection facets pivot synchronously. Loop: seamless seam last-frame to first-frame chaining. Audio: silent, looped. Negative: no text, no captions, no subtitles, no watermarks, no logos, no warped hands, no lens-flare clichés, no glowing neon, no crypto coins, no 3D arrows. Aspect: 16:9.
```

### Integration Spec
- **Asset Filename**: `public/assets/video/hero-clarity.mp4`
- **Fallback Poster**: `public/assets/video/hero-clarity-poster.webp`
- **Behavior**: Lazy autoplay initialized via `IntersectionObserver` when >20% visible.
- **Attributes**: `muted playsinline loop disablePictureInPicture`
- **Reduced Motion**: If `prefers-reduced-motion: reduce` is detected, video playback is skipped and high-resolution frosted CSS glass poster is rendered.
- **Format & Size Target**: H.265 / AV1 + WebM fallback, target file size ≤ 1.2 MB.

---

## Shot 2: Ecosystem — "Intelligence Engine Pulse"

### Purpose
To visually anchor the "Powered by Intelligence" section, representing the automated data flows connecting Effortless, Actionboard, and Pulse into a single unified financial nervous system.

### Veo Prompt (Copy-Paste Ready)
```text
Medium close-up overhead shot, precise tactile mechanical data toggles and fine titanium fiber optic conduits transferring cool emerald and cyan light pulses through a precision CNC-machined dark aluminum chassis, in a modern industrial laboratory. Camera: locked-off overhead isometric perspective, 85mm macro prime lens, crisp focus on the central node. Lighting: subdued neutral studio lighting with soft 4500K key light, illuminated conduits provide 5% specular highlights. Grade: deep graphite and cool titanium with controlled teal accents, low contrast, zero blooming. Material: anodized black aluminum, woven carbon fiber, sapphire crystal lenses. Motion coherence: light pulses propagate rhythmically at steady intervals of 1.5 seconds through parallel conduits with synchronized dimming. Loop: static camera with seamless 4-second loop cycle. Audio: silent, looped. Negative: no text, no captions, no subtitles, no watermarks, no logos, no warped hands, no lens-flare clichés, no futuristic cyber grids, no matrix rain. Aspect: 16:9.
```

### Integration Spec
- **Asset Filename**: `public/assets/video/ecosystem-pulse.mp4`
- **Fallback Poster**: `public/assets/video/ecosystem-pulse-poster.webp`
- **Behavior**: Lazy autoplay via `IntersectionObserver`.
- **Attributes**: `muted playsinline loop`
- **Reduced Motion**: Poster image with subtle static SVG diagram.
- **Format & Size Target**: MP4 (H.264 / AV1), target size ≤ 950 KB.

---

## Shot 3: Advisory — "The Executive Table"

### Purpose
To humanize the Virtual CFO and Story sections with tangible executive gravitas, depicting senior financial leadership in consultative review.

### Veo Prompt (Copy-Paste Ready)
```text
Medium cinematic shot, two senior corporate finance partners in tailored linen shirts quietly reviewing architectural blueprints and financial ledger sheets on a solid oak table, in a warm sunlit Scandinavian meeting room overlooking a serene courtyard. Camera: subtle 35mm handheld drift on a stabilized gimbal, slow tracking left-to-right, shallow depth of field (f/2.0). Lighting: natural afternoon sunlight streaming through floor-to-ceiling windows, warm amber bounce fill. Grade: Kodak Vision3 250D film emulation, warm earth tones, deep ink shadows, soft highlights. Material: white oak grain, heavy cotton paper stock, matte black fountain pens. Motion coherence: partner gently turns a page while natural tree branch shadows sway slowly across the table surface. Loop: seamless seamless last-frame to first-frame match. Audio: silent, looped. Negative: no text, no captions, no subtitles, no watermarks, no logos, no warped hands, no distorted fingers, no lens flare. Aspect: 16:9.
```

### Integration Spec
- **Asset Filename**: `public/assets/video/advisory-table.mp4`
- **Fallback Poster**: `public/assets/video/advisory-table-poster.webp`
- **Behavior**: Paused by default, plays on viewport entry.
- **Attributes**: `muted playsinline loop`
- **Reduced Motion**: Static portrait fallback.
- **Format & Size Target**: MP4, ≤ 1.5 MB.
