<div align="center">

# ⛓️ NUGI // COLLECTIBLE PORTFOLIO SYSTEM

### `futuristic streetwear collectible toy` × `cyberpunk dossier`

A single‑page, fully bilingual **(EN / ID)** personal portfolio for **Nugraha Labib Mujaddid ("Nugi")** — AI Founder, Agentic Engineer & multidisciplinary entrepreneur. Monospace labels, barcodes, scanlines, status LEDs, technical corner brackets, and a single red accent over a light/dark alternating layout.

<br/>

[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white&style=for-the-badge)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-~6-3178C6?logo=typescript&logoColor=white&style=for-the-badge)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white&style=for-the-badge)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer&logoColor=white&style=for-the-badge)](https://www.framer.com/motion/)

![Status](https://img.shields.io/badge/STATUS-ONLINE-E53935?style=flat-square)
![Lang](https://img.shields.io/badge/i18n-EN%20%2F%20ID-050505?style=flat-square)
![Backend](https://img.shields.io/badge/backend-none%20(static)-555?style=flat-square)
![Build](https://img.shields.io/badge/build-passing-22c55e?style=flat-square)

```
[ SYS_ID: PORTFOLIO-2026 ]  •  [ LOC: JAKARTA // ID ]  •  [ STATE: ACTIVE_VERIFIED ]
```

</div>

---

## ⚡ TL;DR

> A portfolio that reads like a **collectible action‑figure dossier**. Every section is a "system module" with its own scanlines, barcode, and live status LEDs. Switch the whole site between **English** and **Indonesian** with one toggle — no reload. There's even a **mock AI co‑pilot orb** in the corner whose eyes track your cursor.

```bash
git clone https://github.com/nugrahalabib/Web-Portfolio.git
cd Web-Portfolio
npm install
npm run dev        # → http://localhost:5173
```

---

## ✨ Highlights

| | Feature | What makes it fun |
|---|---|---|
| 🎭 | **7‑role animated hero** | A chibi mascot video plays forward then *reverses itself* frame‑by‑frame, synced to a typewriter that cycles 7 roles (AI Developer → Businessman → Analyst → …). |
| 🌐 | **Live EN / ID toggle** | Every string is bilingual; the entire UI re‑renders instantly. No page reload, no router. |
| 🤖 | **AI Co‑Pilot Orb** | A glossy 3D‑styled orb whose eyes & body track the cursor, blinks randomly, and opens a keyword‑driven chat that answers in rich Markdown (tables, code, action buttons). |
| 🧬 | **Identity Dossier (About)** | Animated **count‑up** stats, a **live Jakarta (WIB) clock**, interactive "key signal" chips, and hover scanlines — a profile card that feels alive. |
| 🎞️ | **Carousels with telemetry** | Timeline & Archives use scroll‑snap rows with floating chevrons, a live progress %/ruler gauge, and animated tab pills (`layoutId` shared transitions). |
| 📬 | **Two‑mode Contact console** | *Quick Connect* (copy/open email) and *Compose* (builds a `mailto:` from intent templates) — pure front‑end, zero backend. |
| 🎨 | **Anti‑template design** | Editorial cyberpunk aesthetic: barcodes, tech corners, grain/noise, marquee partner ticker, custom cursor. |

<details>
<summary><b>🇮🇩 Versi Bahasa Indonesia (klik untuk buka)</b></summary>

<br/>

Portfolio satu halaman bertema **mainan koleksi streetwear futuristik × dossier cyberpunk** untuk **Nugraha Labib Mujaddid ("Nugi")** — AI Founder, Agentic Engineer & wirausahawan multidisiplin. Sepenuhnya **dwibahasa (EN/ID)** dengan toggle langsung tanpa reload. Tidak ada backend — kontak lewat `mailto:`, dan "AI assistant"-nya adalah responder kata kunci. Jalankan dengan `npm install` lalu `npm run dev` → `http://localhost:5173`.

</details>

---

## 🧩 Architecture — *edit data, not markup*

The whole site renders from **one typed config file**. To change the bio, add a project, or add a career entry, you edit data — the sections render themselves.

```
src/config/portfolio.ts   ← single source of truth (personal, stats, skills, projects, timeline)
        │
        ▼
 LanguageContext (en | id) ──► every component reads value[language]
        │
        ▼
 App.tsx ► Navbar ▸ Hero ▸ About ▸ PartnerTicker ▸ WhatIDo ▸ Skills ▸ Timeline ▸ Projects ▸ Contact ▸ Footer ▸ AIChatWidget
```

- **Content‑driven:** `projects` are filtered by `mainCategory` × `subCategory`; `timeline` by `category` — tab counts derive automatically.
- **i18n:** every translatable string is a `LocalizedString { en, id }`.
- **Design tokens:** Tailwind **v4 is CSS‑first** — there is *no* `tailwind.config.js`; brand colors/fonts live in an `@theme { … }` block inside [`src/index.css`](src/index.css).

<details>
<summary><b>📁 Project structure</b></summary>

```
src/
├── components/        # Reusable primitives
│   ├── Navbar.tsx          # nav + EN/ID language toggle
│   ├── Section.tsx         # numbered [NN]//SYSTEM_CORE wrapper + reveal
│   ├── TechCorner.tsx      # L‑shaped corner brackets
│   ├── Barcode.tsx         # decorative SVG barcode
│   ├── PartnerTicker.tsx   # infinite marquee logo reel
│   ├── Footer.tsx
│   └── AIChatWidget.tsx    # mock AI co‑pilot orb + mini‑markdown renderer
├── sections/          # Hero, About, WhatIDo, Skills, Timeline, Projects, Contact
├── context/
│   └── LanguageContext.tsx # global en|id state
├── config/
│   └── portfolio.ts        # ← all content lives here
└── index.css               # @theme tokens + keyframes (scan/float/marquee)
```

</details>

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| **Framework** | React 19 + TypeScript ~6 |
| **Build** | Vite 8 (`tsc -b && vite build`) |
| **Styling** | Tailwind CSS v4 (CSS‑first, `@tailwindcss/vite`) |
| **Motion** | Framer Motion 12 |
| **Icons** | lucide‑react + hand‑written inline SVGs |
| **Fonts** | Outfit (sans) · Space Grotesk (mono) |

---

## 🚀 Getting Started

```bash
npm install      # install dependencies
npm run dev      # Vite dev server with HMR → http://localhost:5173
npm run build    # type-check (tsc -b) THEN bundle → dist/
npm run preview  # serve the production build locally
npm run lint     # eslint (flat config)
```

> **Note** — `npm run build` runs `tsc -b` first, so a type error fails the build before Vite bundles. `tsconfig.app.json` enables `noUnusedLocals`/`noUnusedParameters`, so an unused import breaks the build even though `npm run dev` tolerates it. **Check the build, not just the dev server.**

---

## 🧑‍🚀 About Nugi

> **Nugraha Labib Mujaddid (Nugi)** — AI Founder, Agentic Engineer & Multidisciplinary Entrepreneur based in Jakarta. Founder of **Spead AI** (selected for the *Google for Startups Cloud Program 2025*) and **AgentBuff**. Bridges advanced AI, business‑innovation strategy, and complex corporate/legal frameworks — with a Master of Management in New Ventures Innovation and a background managing mega‑infrastructure contract claims at **PT Waskita Karya (Persero) Tbk**. Tech creator on **TikTok ([@nugrahalabib](https://tiktok.com/@nugrahalabib)) — 140K+ followers, 40M+ views**.

<div align="center">

[![Email](https://img.shields.io/badge/Email-nugrahalabib%40gmail.com-E53935?style=for-the-badge&logo=gmail&logoColor=white)](mailto:nugrahalabib@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-nugrahalabib-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nugrahalabib/)
[![TikTok](https://img.shields.io/badge/TikTok-@nugrahalabib-050505?style=for-the-badge&logo=tiktok&logoColor=white)](https://tiktok.com/@nugrahalabib)

</div>

---

<div align="center">

`MODE: CREATIVE BUILD`  •  `ALL RIGHTS RESERVED © 2026`  •  Built with passion using HTML5 · CSS3 · JS · React · Tailwind

</div>
