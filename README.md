# Practice Range: An Introduction to Game Design

[![Deploy to GitHub Pages](https://github.com/tamb/textbook-game-design/actions/workflows/deploy.yml/badge.svg)](https://github.com/tamb/textbook-game-design/actions/workflows/deploy.yml)
[![PWA Ready](https://img.shields.io/badge/PWA-installable-8ed9b0.svg)](https://tamb.github.io/textbook-game-design/)
[![License: MIT](https://img.shields.io/badge/License-MIT-f0b429.svg)](LICENSE)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)

**Practice Range** is an open-access, beginner-friendly online textbook and Progressive Web App (PWA) focused on foundational game design concepts: how games feel, how attacks and input forgiveness work frame-by-frame, how collisions are calculated, and how game systems keep players engaged.

📖 **Live Textbook:** [https://tamb.github.io/textbook-game-design/](https://tamb.github.io/textbook-game-design/)

---

## Highlights

- **Textbook Pedagogy:** Written in clear, complete prose for beginners. Every chapter features learning objectives, numbered sections (e.g., 2.1, 2.2), key term callouts, chapter summaries, and review quizzes with explanations.
- **Classic Game Examples:** Every concept is explained using famous, recognizable games such as *Super Mario Bros.*, *Street Fighter*, *Celeste*, *Tetris*, *Pac-Man*, *Portal*, and *Dark Souls*.
- **Interactive Practice Tools:** Real-time calculators for frame advantage, coyote time / input buffer conversion (milliseconds to frames), and a game-feel diagnostic checklist.
- **Comprehensive Glossary:** Over 70 fundamental game design terms with definitions, deep explanations, and links back to the chapters where they are taught.
- **100% Offline PWA:** Fully installable on desktop and mobile with service worker pre-caching.
- **Local Progress:** Chapter completion and quiz scores stay saved in the browser's local storage without requiring accounts or tracking.

---

## Table of Contents

### Introduction
- **[Introduction: How to Use This Book](https://tamb.github.io/textbook-game-design/introduction/)** — Scope, core terminology, and learning structure.

### Part One: How a Game Feels
1. **[Chapter 1: Game Feel](https://tamb.github.io/textbook-game-design/learn/feel/)** — Real-time control, simulated space, polish, juice, metaphor, and snappiness.
2. **[Chapter 2: Timing an Attack](https://tamb.github.io/textbook-game-design/learn/frames/)** — Frames and milliseconds, startup, active frames, recovery, hitstun, blockstun, frame advantage, meaty attacks, i-frames, and hit-stop.
3. **[Chapter 3: Making Controls Forgiving](https://tamb.github.io/textbook-game-design/learn/forgiveness/)** — Human reaction times, coyote time, input buffering, variable jump height, corner correction, and gravity scaling.

### Part Two: Bodies in Space
4. **[Chapter 4: Hitboxes and Combat](https://tamb.github.io/textbook-game-design/learn/combat/)** — Hitboxes, hurtboxes, pushboxes, reach, attack arcs, animation cancels, combo scaling (proration), crowd control, aggro radius, and leash.
5. **[Chapter 5: Collision and the Game Clock](https://tamb.github.io/textbook-game-design/learn/physics/)** — Axis-Aligned Bounding Boxes (AABBs), fixed vs. variable timesteps, delta time (`dt`), preventing tunneling, tilemaps, procedural geometry, checkpoints, and save states.

### Part Three: Designing the Whole Game
6. **[Chapter 6: Loops, Actions, and Risk](https://tamb.github.io/textbook-game-design/learn/structure/)** — Core loops, meta loops, verbs, the MDA framework (Mechanics, Dynamics, Aesthetics), difficulty ramps, skill floors/ceilings, positive/negative feedback loops, and risk vs. reward.
7. **[Chapter 7: Teaching the Player](https://tamb.github.io/textbook-game-design/learn/teaching/)** — Affordances vs. signifiers, environmental signposting, knowledge gates, metroidvania locks, and sandbox vs. objective play.
8. **[Chapter 8: Play Sessions and Why Players Return](https://tamb.github.io/textbook-game-design/learn/sessions/)** — Target session lengths, healthy retention loops, Skinner boxes, variable-ratio reinforcement schedules, and avoiding FOMO traps.

### Reference & Tools
- **[Practice Tools](https://tamb.github.io/textbook-game-design/tools/)** — Interactive calculators for frame advantage, forgiveness windows, and feel stacks.
- **[Glossary](https://tamb.github.io/textbook-game-design/glossary/)** — Searchable reference with over 70 terms.
- **[My Progress](https://tamb.github.io/textbook-game-design/progress/)** — Review quiz scores and reading history saved in your browser.

---

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, static export)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **UI & Styling:** React 19, Semantic HTML5, CSS custom properties (dark theme), Google Fonts (Fraunces, Outfit, IBM Plex Mono)
- **Deployment:** GitHub Pages via GitHub Actions workflow
- **PWA:** Web App Manifest, Service Worker (`sw.js`), offline cache-first and stale-while-revalidate strategies
- **SEO & Structured Data:** Open Graph, Twitter Cards, dynamic XML Sitemap, `robots.txt`, and Schema.org JSON-LD (`Book`, `Chapter`, `BreadcrumbList`, `WebSite`)

---

## Local Development

```bash
# Clone repository
git clone git@github.com:tamb/textbook-game-design.git
cd textbook-game-design

# Install dependencies
npm install

# Run verification checks
npm run check

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Building for Production

```bash
# Build static export to /out
npm run build

# Preview static export
npm run preview
```

---

## License

[MIT](LICENSE) © 2026 ¡Támb!
