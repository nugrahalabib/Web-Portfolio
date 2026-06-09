# PROJECT CONTEXT & HANDOVER DOSSIER // PORTFOLIO WEB v3.0

This document serves as a complete context registry and design reference for the **Nugi Personal Portfolio Website**. It outlines the current state, tech stack, architecture, theme mapping, recent modifications, and files directory so that any agent harness can immediately continue coding without context degradation.

---

## 1. Project Overview & Tech Stack
* **Build System & Framework:** React (Vite) + TypeScript (`tsc`).
* **Styling & Theme:** Tailwind CSS + custom styles defined in `src/index.css`.
* **Animations:** Framer Motion (for staggered entrances, sliding tabs, accordion folds, and hover scaling).
* **Icons Library:** Lucide React.
* **Asset Media:** Auto-playing, looping, and muted HTML5 `.mp4` video files for the streetwear chibi mascot, dynamically rendering different character outfits based on context.

---

## 2. Core Layout & Navigation Structure
The page is built as a single-page scrolling console composed of the following sections:
1. **[Navbar](file:///c:/Users/nugra/Documents/Project/portfolio-web/src/components/Navbar.tsx):** Logo branded "Nugi ✕", center-aligned links, CV Download button, and a global **Language Switcher** toggle (`EN` / `ID`).
2. **[Hero Section (01. Welcome)](file:///c:/Users/nugra/Documents/Project/portfolio-web/src/sections/Hero.tsx):** High-impact streetwear header with a typewriter subtitle cycling through 7 roles, synced with sliding chibi mascot video slots (representing active status vs. queue status).
3. **[About Me Section (Who Am I?)](file:///c:/Users/nugra/Documents/Project/portfolio-web/src/sections/About.tsx) (Theme: Dark):** Personal dossier card displaying an auto-playing avatar video, key metrics list, and localized description paragraph.
4. **[Partner Ticker](file:///c:/Users/nugra/Documents/Project/portfolio-web/src/components/PartnerTicker.tsx) (Theme: Dark):** Infinite marquee logo reel displaying trusted collaborations and corporate/BUMN brands (Bibit, ASUS, Shopee, Waskita, etc.).
5. **[What I Do (02. Active Productivity)](file:///c:/Users/nugra/Documents/Project/portfolio-web/src/sections/WhatIDo.tsx) (Theme: Light):** Stark dark-panel cards mapping Nugi's startup ventures (Spead AI, AgentBuff), tech creator channel, culinary business, asset management, and architecture studio.
6. **[Skills Section (03. Capabilities Matrix)](file:///c:/Users/nugra/Documents/Project/portfolio-web/src/sections/Skills.tsx) (Theme: Dark):** 
   * Upper layer: 6 metric experience cards.
   * Lower layer: Collapsible capabilities matrix with a pulsing red matrix initialize banner, detailed nested skills pills, and bilingual toggle prompts.
7. **[My Journey (04. Life & Career Journey)](file:///c:/Users/nugra/Documents/Project/portfolio-web/src/sections/Timeline.tsx) (Theme: Light):** Category-filtered horizontal timeline scroller with drag-snapping cards, detailed popup modal drawers, floating edge chevrons, ruler-style scrollbar, and company abbreviation logo avatars.
8. **[The Archives (05. Dossiers & Repositories)](file:///c:/Users/nugra/Documents/Project/portfolio-web/src/sections/Projects.tsx) (Theme: Light):** Two stacked horizontal carousels:
   * *Row 1 (Projects):* Alternating cream/dark cards showing coding work, architecture visuals, and digital content systems.
   * *Row 2 (Blog & News):* Alternating cream/dark cards showing technical write-ups, growth hacks, and milestones.
9. **[Contact Section (06. Database Transmission)](file:///c:/Users/nugra/Documents/Project/portfolio-web/src/sections/Contact.tsx) (Theme: Dark):** Cybernetic console enabling Quick Connect direct mailbox copy/social ports triggers, or Secure Compose draft building.
10. **[Footer](file:///c:/Users/nugra/Documents/Project/portfolio-web/src/components/Footer.tsx):** Single-row monospaced status indicator line.
11. **[AI Chat Widget (Co-Pilot Orb)](file:///c:/Users/nugra/Documents/Project/portfolio-web/src/components/AIChatWidget.tsx):** A floating chatbot overlay in the bottom right corner with a simulated 3D glassware orb head that tracks mouse movements, blinks randomly, scales/slides down when open, and opens a bilingual opportuniy-driven QA dashboard.

---

## 3. Localization Architecture (Bilingual EN/ID)
To support dual-language representation:
* **Context Provider:** [LanguageContext.tsx](file:///c:/Users/nugra/Documents/Project/portfolio-web/src/context/LanguageContext.tsx) exposes the active hook `language` ('en' | 'id') and the toggler `setLanguage`.
* **Data Sources:** [portfolio.ts](file:///c:/Users/nugra/Documents/Project/portfolio-web/src/config/portfolio.ts) maps strings utilizing dictionary records:
  ```typescript
  export interface LocalizedString {
    en: string;
    id: string;
  }
  ```
* **UI Integration:** Components read state and render dynamically, ensuring seamless transitions across inputs, labels, placeholders, and tooltips without requiring page reloads.

---

## 4. Specific Design Decisions & AESTHETICS
* **Section Alternating Cadence:**
  * **Hero (Light)** → **About & PartnerTicker (Dark)** → **What I Do (Light)** → **Skills (Dark)** → **My Journey & The Archives (Light)** → **Contact (Dark)**.
  * This alternation breaks standard layout monotony and produces a premium scrolling feel.
* **Warm Cream Accent (`bg-[#e6e6dd]`, `border-[#c8c8b8]`):**
  * Used as the highlight card backgrounds in **Skills** and **The Archives (Even cards)**.
  * In the dark-themed **Contact** section, the active selector tabs and the primary *"Send Email Now"* buttons are styled in this warm cream shade to stand out prominently as calls-to-action.
* **Cyberpunk Command Elements:**
  * **Barcode Generator:** [Barcode.tsx](file:///c:/Users/nugra/Documents/Project/portfolio-web/src/components/Barcode.tsx) draws vector barcodes on the fly. It has been upgraded to support a custom `textColor` prop (e.g. `textColor="text-white"` in Contact).
  * **Tech Corners:** [TechCorner.tsx](file:///c:/Users/nugra/Documents/Project/portfolio-web/src/components/TechCorner.tsx) renders retro scope crosshair markers at container corners, inheriting border classes.

---

## 5. Key File Locations & Repositories

### Core Directories
* **`/src/components/`**: Standard shared interface blocks.
  * [AIChatWidget.tsx](file:///c:/Users/nugra/Documents/Project/portfolio-web/src/components/AIChatWidget.tsx) - Simulated 3D orb chatbot widget.
  * [Barcode.tsx](file:///c:/Users/nugra/Documents/Project/portfolio-web/src/components/Barcode.tsx) - Vector barcode generator.
  * [PartnerTicker.tsx](file:///c:/Users/nugra/Documents/Project/portfolio-web/src/components/PartnerTicker.tsx) - Infinite marquee brand loop.
  * [TechCorner.tsx](file:///c:/Users/nugra/Documents/Project/portfolio-web/src/components/TechCorner.tsx) - Custom corner wireframe accents.
  * [Section.tsx](file:///c:/Users/nugra/Documents/Project/portfolio-web/src/components/Section.tsx) - Core layout wrapper backing theme variables.
* **`/src/sections/`**: Main layout modules.
  * [Hero.tsx](file:///c:/Users/nugra/Documents/Project/portfolio-web/src/sections/Hero.tsx) - Interactive Typewriter role display & mascot slideshow queue.
  * [About.tsx](file:///c:/Users/nugra/Documents/Project/portfolio-web/src/sections/About.tsx) - Profile specs (Dark mode).
  * [WhatIDo.tsx](file:///c:/Users/nugra/Documents/Project/portfolio-web/src/sections/WhatIDo.tsx) - Grid mapping active roles and businesses (Light mode).
  * [Skills.tsx](file:///c:/Users/nugra/Documents/Project/portfolio-web/src/sections/Skills.tsx) - Capabilities matrix containing collapsible detailed tags (Dark mode).
  * [Timeline.tsx](file:///c:/Users/nugra/Documents/Project/portfolio-web/src/sections/Timeline.tsx) - My Journey horizontal scroller + category switches (Light mode).
  * [Projects.tsx](file:///c:/Users/nugra/Documents/Project/portfolio-web/src/sections/Projects.tsx) - The Archives dual carousels with alternating cream/dark cards (Light mode).
  * [Contact.tsx](file:///c:/Users/nugra/Documents/Project/portfolio-web/src/sections/Contact.tsx) - Communication terminal with Quick Connect & Compose panels (Dark mode).

---

## 6. Recent Modifications Log (Sesi Terakhir)
1. **Barcode.tsx Refactor:**
   * Added `textColor?: string` to `BarcodeProps`.
   * Swapped hardcoded `text-brand-black` SVG class with dynamic interpolation: `className={\`fill-current \${textColor}\`}`.
2. **Contact.tsx Theme Transition to Dark Mode:**
   * Changed `Section` theme prop to `"dark"`.
   * Modified the wrapper div layout style to `border border-neutral-800 bg-[#0d0d12] shadow-[0_4px_24px_rgba(0,0,0,0.4)]`.
   * Updated central holographic coordinates boundaries and tick markers to white/neutral overlays (`stroke-white/20`, `stroke-neutral-800/60`, `bg-white`).
   * Updated selector buttons to `bg-[#16161a] border-neutral-800`. Active mode tab and Send Email buttons are highlighted using warm cream (`bg-[#e6e6dd] text-brand-black`).
   * Updated inputs to `bg-[#16161a] border-neutral-800 text-white placeholder-neutral-600 focus:border-neutral-600`.
   * Updated database dossier dossier profile fields (Operator, Location, Role, etc.) to use a dark container card and white texts.
   * Passed `textColor="text-white"` to Barcode at the bottom of the dossier panel.
3. **Build Success:**
   * Verified code via `cmd /c "npm run build"`. Completed and minified successfully with zero errors.

---

## 7. Guidelines & Ideas for the Next Session
* **Masukan Modifikasi UI:** Saat melakukan perubahan layout, pastikan selalu memeriksa keselarasan padding responsive (`px-4 md:px-8` atau `px-12`) agar tidak merusak alignment horizontal grid.
* **Visual Check:** Pastikan video mascot tetap ter-render dengan rasio dan perbesaran yang pas tanpa terpotong di bagian atas frame lingkarannya.
* **Framer Motion Note:** Selalu gunakan `transition-colors` sebagai ganti `transition-all` pada card yang memiliki interaksi hover dari Framer Motion untuk mencegah jitter/jump akibat konflik kalkulasi CSS matrix transforms.
* **Rollback Safeguard:** File `Contact.tsx.bak` dan `Projects.tsx.bak` disimpan di direktori `/src/sections/` sebagai backup cadangan yang aman. Jangan memodifikasi backup ini secara langsung kecuali Anda berniat menimpa fallback sistem.
