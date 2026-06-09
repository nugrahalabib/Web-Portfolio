# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page personal portfolio for **Nugraha Labib Mujaddid ("Nugi")** — AI Founder, Agentic Engineer, and multidisciplinary entrepreneur. The visual identity is a "futuristic streetwear collectible toy / cyberpunk dossier" theme: monospace labels, barcodes, scanlines, status LEDs, technical corner brackets, and a single red accent on a light/dark alternating layout. Fully bilingual (English / Indonesian) with a live language toggle. There is **no backend** — it is a static front-end app; contact happens via `mailto:` links and the "AI" assistant is a hardcoded keyword responder (see below).

## Commands

```bash
npm install        # install deps
npm run dev        # Vite dev server with HMR (http://localhost:5173)
npm run build      # tsc -b (type-check, project refs) THEN vite build → dist/
npm run lint       # eslint . (flat config)
npm run preview    # serve the production build locally
```

There is no test runner configured. `npm run build` runs `tsc -b` first, so **a type error fails the build** before Vite ever bundles. `tsconfig.app.json` sets `noUnusedLocals` and `noUnusedParameters: true` — an unused import or variable will break `npm run build` even though `npm run dev` tolerates it. Check the build, not just the dev server.

Package manager is **npm** (`package-lock.json`). Environment is Windows / PowerShell.

## Toolchain notes (bleeding-edge versions)

React 19, Vite 8, Tailwind CSS 4, TypeScript ~6, ESLint 10, Framer Motion 12. These are intentionally very recent majors — don't "downgrade to fix" without asking. Two consequences worth knowing:

- **Tailwind v4 is CSS-first.** There is **no `tailwind.config.js`**. The design tokens live in [src/index.css](src/index.css) inside an `@theme { ... }` block (and Tailwind is wired via the `@tailwindcss/vite` plugin in [vite.config.ts](vite.config.ts)). To add/change a brand color, font, or token, edit `@theme` — not a JS config.
- Several components deliberately use **inline hand-written SVG icons** instead of `lucide-react` (e.g. in [AIChatWidget.tsx](src/components/AIChatWidget.tsx) and [Contact.tsx](src/sections/Contact.tsx)), with comments like "zero-dependency reliability / cross-version compatibility." Follow that pattern in those files rather than swapping in lucide.

## Architecture / big picture

### Content is centralized — edit data, not markup
[src/config/portfolio.ts](src/config/portfolio.ts) is the **single source of truth** for almost all page content: `personal`, `stats`, `skills`, `skillsAnalytics`, `projects`, and `timeline`. It exports the typed `portfolioData` object plus interfaces (`Project`, `TimelineEntry`, `PortfolioData`, `LocalizedString`). To change Nugi's bio, add a project, add a timeline/career entry, or change stats — **edit this file**; the sections render from it. When adding entries:
- `projects` are filtered in the UI by `mainCategory` (`project` | `blog`) and `subCategory` (`tech_venture`, `architecture_design`, `content`, `tech_research`, `marketing_growth`, `news_milestone`). The sub-tab must exist in `Projects.tsx`'s `subCategories` map or the entry won't be reachable.
- `timeline` entries are filtered by `category` (`experience` | `ventures` | `education` | `certifications` | `organization`). Tab counts are derived automatically.
- A few items are NOT in the config: [WhatIDo.tsx](src/sections/WhatIDo.tsx) holds its 6 cards in a local `WHAT_I_DO_ITEMS` array, and [Hero.tsx](src/sections/Hero.tsx) holds the rotating role/mascot list in `HERO_ROLES`. Edit those arrays in-component.

### Internationalization
Global `en`/`id` state lives in [src/context/LanguageContext.tsx](src/context/LanguageContext.tsx) (`LanguageProvider` wraps everything in [App.tsx](src/App.tsx); default language is `'en'`). Every translatable string is a `LocalizedString` (`{ en, id }`) and components read it as `value[language]` after calling `useLanguage()`. **Any new user-facing text must be bilingual** — either add an `{en, id}` object or branch on `language === 'en' ? ... : ...` (both patterns are used throughout). The `Navbar` is the toggle.

### Page composition
[App.tsx](src/App.tsx) renders the whole site in fixed order: `Navbar` → `Hero` → `About` → `PartnerTicker` → `WhatIDo` → `Skills` → `Timeline` → `Projects` → `Contact` → `Footer` → `AIChatWidget`. Navigation is anchor-based (`#hero`, `#about`, `#skills`, `#projects`, `#timeline`, `#contact`) — there is no router. App.tsx also renders a custom desktop cursor and a fixed background noise layer.

### Section system & theming
[src/components/Section.tsx](src/components/Section.tsx) is the shared wrapper for content sections: it renders the numbered `[NN] // SYSTEM_CORE` header, the title/subtitle, decorative borders, noise, and a Framer `whileInView` reveal. It takes a `theme` prop of `'light' | 'dark'`. Sections **alternate** light/dark intentionally (About=dark, WhatIDo=light, Skills=dark, Timeline=light, Projects=light, Contact=dark) — preserve that rhythm when adding sections. Within cards, an "even/odd index" pattern often flips between a light and a near-black card variant; keep both branches styled when editing card markup.

### Recurring visual primitives
- [TechCorner.tsx](src/components/TechCorner.tsx) — the L-shaped corner bracket on nearly every card. Pass `position`, `size`, and a `className` (if `className` contains `border-`, it overrides the default `border-brand-black`).
- [Barcode.tsx](src/components/Barcode.tsx) — decorative SVG barcode from a fixed `barPattern`.
- The cyber aesthetic (mono font, red accent `brand-red`, pulsing LED dots, `animate-scan`/`animate-float`/`animate-marquee`, `bg-grid-lines`, `bg-noise`) is defined once in [index.css](src/index.css) and reused everywhere. Match it.

### The "AI" chat widget is a mock, not an LLM
[src/components/AIChatWidget.tsx](src/components/AIChatWidget.tsx) is a self-contained fake assistant. `generateAIResponse(userText)` does **keyword matching** (`includes(...)`) over a handful of topic buckets and returns hardcoded bilingual Markdown strings (tables, Python code blocks, action buttons). There is no API call, key, or network — the 1s "typing" delay is a `setTimeout`. To change what the bot "knows," edit the keyword branches and their return strings.

Responses are rendered by the in-file `RichAIResponse` component — a **custom mini-Markdown renderer** (not a library) supporting `**bold**`, `*italic*`, bullet/numbered lists, GitHub-style tables, and ` ``` ` code blocks. Links use custom protocols parsed by `parseInlineText`:
- `[label](scroll:sectionId)` → smooth-scrolls to that section id and closes the chat
- `[label](mailto:addr)` → email link
- `[label](url:https://...)` → external link (new tab)
- `[label](action:...)` → routed through `handleActionClick`

If you add a response that should link somewhere on the page, use `scroll:<id>` with one of the real section ids above.

### Notable interactive pieces (read before refactoring)
- **Hero mascot (`YoyoVideo` in [Hero.tsx](src/sections/Hero.tsx))** — plays a mascot `.mp4` forward, then manually reverses it via `requestAnimationFrame` + `currentTime` seeking (throttled ~30fps). A typewriter effect cycles `HERO_ROLES` titles in sync with the mascot switch. It's intentionally hand-rolled; don't replace with a plain `<video loop>`.
- **Carousels (Projects, Timeline)** — horizontal scroll-snap rows with custom chevron paddles, a live progress %/ruler gauge, and `canScrollLeft/Right` bounds recomputed on scroll, resize, filter change, and via `setTimeout` after tab switches. Card width is assumed `280px` + `32px` gap (`scrollAmount = 312`); keep these in sync if you change card sizing. Active tab pills animate with Framer `layoutId` shared transitions.
- **Contact ([Contact.tsx](src/sections/Contact.tsx))** — two modes: "Quick Connect" (copy/open email) and "Compose," which builds a `mailto:` link from an intent template (`collab`/`consult`/`sponsor`/`ping`) + name + body. No form submission/backend; everything resolves to `mailto:`.

## Assets

Static assets live in [public/assets/](public/assets/) and are referenced by absolute path (e.g. `/assets/vid-mascot-AI Developer.mp4`). **Some filenames contain spaces and `&`** (`vid-mascot-AI Developer.mp4`, `vid-mascot-Contract&Claim.mp4`, `vid-mascot-Analyst&Researcher.mp4`) — match them exactly. Mascot videos are displayed with `mix-blend-multiply` over a white background to knock out their backdrop.

**Missing-on-purpose, handled gracefully:** company/partner logos are referenced as `/assets/logos/*.png` (in `portfolioData.timeline[].logo` and [PartnerTicker.tsx](src/components/PartnerTicker.tsx)), but `public/assets/logos/` does not currently exist. Both [Timeline.tsx](src/sections/Timeline.tsx) (`CompanyLogo`) and `PartnerTicker` have `onError` fallbacks (company-initial monogram / brand-name text), so the UI degrades cleanly. If you add the logo files, drop them in `public/assets/logos/` with the exact names used in the config.

## Dead / orphan files — do not assume they're live

- `src/sections/*.tsx.bak` (`Contact`, `WhatIDo`, `Skills`, `Projects`) are old backups. They are not imported and not type-checked (not `.tsx`). Ignore them; prefer deleting over editing.
- [src/sections/Ventures.tsx](src/sections/Ventures.tsx) is a complete section component that is **not imported anywhere** (App.tsx does not render it). It still type-checks. Treat it as orphaned — confirm intent before wiring it in or removing it.
- `src/assets/` (hero.png, react.svg, vite.svg) is largely leftover Vite-template scaffolding; runtime assets come from `public/assets/`.
