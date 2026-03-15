# Dereck Villagrana — Portfolio

Personal portfolio site for Dereck Villagrana, a product designer. Features case studies, a CV, and an about page.

**Live site:** [portfolio2026-puce.vercel.app](https://portfolio2026-puce.vercel.app) &nbsp;·&nbsp; **Repo:** [github.com/Derec58/portfolio2026](https://github.com/Derec58/portfolio2026)

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

**Hand-coded, intentionally.** The decision to write raw HTML, CSS, and JS instead of using a site builder was deliberate. The portfolio is itself a proof of concept — if I design something, I should be able to build it.

**Editorial visual direction.** Serif typography, generous whitespace, and a restrained two-panel layout. Designed to feel like a publication rather than a template — considered, not generated.

---

## Challenges

Building this without a framework meant solving problems that tools normally abstract away.

**Layout.** Getting the fixed sidebar + scrollable main content panel to behave correctly across screen sizes required a solid understanding of CSS Grid and Flexbox — not just copying patterns, but knowing why they work. The sidebar uses `position: fixed` with a CSS custom property (`--sidebar-width`) that cascades through every layout rule. Changing that one token resizes everything.

**Dark mode.** Implemented entirely with CSS custom properties — no JavaScript class toggling on individual elements. Light and dark themes are two sets of variable values on `:root`, and a single `data-theme` attribute on `<body>` switches between them. The challenge was auditing every color in the design to make sure it came from a token rather than a hardcoded value.

**Vanilla JavaScript.** Three features required writing JS from scratch: scroll-reveal animations (IntersectionObserver API), sidebar hover preview cards (mouseover + dynamic positioning), and the dark mode toggle (localStorage persistence). No libraries. The hardest part was the hover preview card — making sure it didn't clip off-screen on short nav items near the bottom of the sidebar.

**No build pipeline.** Without hot reload, every change required a manual browser refresh. Cache busting for the JS file (`main.js?v=2`) had to be updated by hand whenever the script changed. Small friction, but it adds up across a long build.

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
