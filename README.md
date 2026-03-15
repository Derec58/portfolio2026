# Dereck Villagrana — Portfolio

**Live site:** [portfolio2026-puce.vercel.app](https://portfolio2026-puce.vercel.app) &nbsp;·&nbsp; **Repo:** [github.com/Derec58/portfolio2026](https://github.com/Derec58/portfolio2026)

For a while, Webflow and Framer felt like the answer. Everyone was using them, the templates were right there, and they did make designing easier. But those sites never felt like mine. Between the size limits, image limits, and design constraints baked into every template, I kept building nothing but a shell of what I actually wanted. I learned HTML and CSS back in high school, kept at it through university at UC Davis, and over the years I've been around enough talented people — designers, engineers, people with sites and projects that genuinely inspired me — that I knew what I wanted this to feel like. So I coded it. If I can design something, I should be able to build it. That's the point.

---

## Stack

- HTML / CSS / JavaScript — no frameworks, no build tools
- No Webflow, no Framer, no npm
- Hosted on [Vercel](https://vercel.com) (static), source on GitHub

---

## Running Locally

```bash
git clone https://github.com/Derec58/portfolio2026.git
cd portfolio2026
python3 -m http.server 3002
```

Open [http://127.0.0.1:3002](http://127.0.0.1:3002) in your browser.

> Opening `index.html` directly via `file://` works for basic viewing, but some browsers block font loading without a local server.

---

## Project Structure

```
portfolio2026/
├── index.html              # Homepage — about, CV, selected work
├── about.html              # Extended about page
├── css/
│   └── style.css           # All styles — layout, themes, components, breakpoints
├── js/
│   └── main.js             # Scroll reveals, hover previews, dark mode, back-to-top
├── projects/
│   ├── bereal-redesign.html
│   ├── verum-ai.html
│   ├── bsa-homepage.html
│   ├── packpal.html
│   ├── snapplant.html
│   ├── arc-redesign.html
│   └── sonidos.html
└── images/
    └── previews/           # Thumbnail images for sidebar hover previews
```

---

## Design Decisions

**Hand-coded, intentionally.** This portfolio is a reaction to years of fighting with site builders. Don't get me wrong — Webflow and Framer are genuinely great tools, and I spent real time learning both of them. But they come with ceilings. Features locked behind paywalls, template constraints, tool limitations, and moments where you just can't get the thing to do what you want (I'm looking at you, CMS in Framer). At some point you realize the site isn't really yours anymore. Writing raw HTML, CSS, and JS means I own every line of it. There's nothing in here I didn't put there.

**Editorial visual direction.** I've tried a lot of directions with this — bento grid layouts, brutalist minimalism, maximalist motion-heavy builds full of WebGL scenes, Spline objects, and glassmorphism cards. The whole catalog of styles you see cycling through Dribbble. None of it felt right. I'm a direct person and I wanted the portfolio to reflect that. I've always been drawn to Apple's design language — clean systems, deliberate hierarchy, nothing that doesn't earn its place. That shows up here. Serif typography, generous whitespace, a restrained two-panel layout. Designed to feel like a publication rather than a template. Considered, not generated.

---

## Challenges

Building this without a framework meant solving problems that tools normally abstract away.

**Layout.** The fixed sidebar + scrollable main panel sounds simple until you're deep in debugging why it breaks at a specific screen width. It took real understanding of CSS Grid and Flexbox — not just copying a pattern, but knowing why it works. The sidebar is built around a single CSS custom property (`--sidebar-width`) that cascades through every layout rule. Change that one value and the whole layout adjusts. That took a while to get right, and felt good when it clicked.

**Dark mode.** I wanted it done properly. Light and dark are two sets of CSS variable values on `:root`, toggled by a single `data-theme` attribute on `<body>` — no JS class-toggling on individual elements. The tedious part was auditing every color in the design to make sure nothing was hardcoded. Worth it.

**Vanilla JS.** Three features needed JavaScript from scratch: scroll-reveal animations, sidebar hover preview cards, and the dark mode toggle with localStorage persistence. No libraries. The hover preview card was the most stubborn — getting it to reposition on nav items near the bottom of the sidebar so it wouldn't clip off-screen took longer than I'd like to admit.

**No build pipeline.** No hot reload meant manually refreshing the browser after every change. Small friction, but it accumulates fast across a long build. It also made me more deliberate — you think twice before touching something when a manual refresh is the only feedback loop.

---

## Contact

Open to full-time product design roles, freelance projects, and introductions.

- **Email:** [dereck.villagrana58@gmail.com](mailto:dereck.villagrana58@gmail.com)
- **LinkedIn:** [linkedin.com/in/dereck-villagrana](https://www.linkedin.com/in/dereck-villagrana/)

---

## AI Assistance

[Claude](https://claude.ai) (by Anthropic) appears as a co-author on some commits. Its role was strictly technical and operational:

- Bug finding and debugging
- Code optimizations and refactoring suggestions
- Git workflow and GitHub push operations
- General development tooling assistance

**All designs, visual direction, case study writing, and portfolio content were created entirely by Dereck Villagrana.** No AI-generated designs, copy, or creative output is present in this project.

---

## License

© 2026 Dereck Villagrana. All rights reserved.

The code and design in this repository are not licensed for reuse, redistribution, or modification without explicit written permission.
