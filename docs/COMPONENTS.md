# Components — Dereck Villagrana Portfolio

> Every reusable UI component: what it looks like, what HTML/CSS classes it uses, and what it does.

---

## Table of Contents
- [Global / Shared](#global--shared)
  - [Sidebar](#sidebar)
  - [Nav Group](#nav-group)
  - [Nav Label + Nav Link](#nav-label--nav-link)
  - [Logo Badge](#logo-badge)
  - [Theme Toggle](#theme-toggle)
  - [Status Pill](#status-pill)
  - [Section Divider](#section-divider)
  - [Skip Navigation Link](#skip-navigation-link)
  - [Back-to-Top Button](#back-to-top-button)
  - [Project Hover Preview](#project-hover-preview)
- [Home Page (index.html)](#home-page-indexhtml)
  - [Bio Section](#bio-section)
  - [CV Entry](#cv-entry)
  - [Project Card](#project-card)
  - [Lab Card](#lab-card)
  - [After Hours Card](#after-hours-card)
- [About Page (about.html)](#about-page-abouthml)
  - [About Hero](#about-hero)
  - [About Now Grid](#about-now-grid)
  - [About Pull Quote](#about-pull-quote)
  - [About Principles List](#about-principles-list)
  - [About Tools Grid](#about-tools-grid)
  - [About Sidelines Grid](#about-sidelines-grid)
  - [About Contact Links](#about-contact-links)
- [Case Study Pages (projects/*.html)](#case-study-pages-projectshtml)
  - [Case Study Header](#case-study-header)
  - [Case Study Meta Grid](#case-study-meta-grid)
  - [Case Study Overview](#case-study-overview)
  - [Case Study Section](#case-study-section)
  - [Case Study Image Placeholder](#case-study-image-placeholder)
  - [Case Study Pull Quote](#case-study-pull-quote)
  - [Case Study Stats Row](#case-study-stats-row)
  - [Case Study Insight Grid](#case-study-insight-grid)
  - [Case Study Feature Block](#case-study-feature-block)
  - [Case Study Divider](#case-study-divider)
  - [Case Study Back Link](#case-study-back-link)

---

## Global / Shared

### Sidebar

The fixed left navigation column. On mobile it becomes a top navbar.

**HTML structure:**
```html
<aside class="sidebar">
  <div class="sidebar-header">
    <div class="sidebar-top"> ... </div>
    <nav class="sidebar-nav"> ... </nav>
  </div>
  <div class="nav-group"> ... </div>
  <!-- more nav groups -->
  <div class="sidebar-status"> ... </div>
</aside>
```

**Key classes:**
| Class | What it does |
|---|---|
| `.sidebar` | Fixed position, full viewport height, 220px wide, flex column |
| `.sidebar-header` | Wrapper for sidebar-top + sidebar-nav. `display: contents` on desktop (invisible to layout), `display: flex` on mobile (becomes the navbar row) |
| `.sidebar-top` | DV logo + desktop theme toggle |
| `.sidebar-nav` | About/CV links + mobile theme toggle + hamburger button |
| `.sidebar.nav-open` | Added by JS when hamburger is clicked — expands to fullscreen overlay |

**Behavior:** See ARCHITECTURE.md → Mobile Navigation Overlay for the full breakdown.

---

### Nav Group

A labeled section of navigation links. Shown in the sidebar on desktop; hidden on mobile until the overlay is open.

**HTML structure:**
```html
<div class="nav-group" role="navigation" aria-label="Selected Work">
  <span class="nav-label">Selected Work</span>
  <a href="projects/bereal-redesign.html" class="nav-link" data-preview="images/previews/bereal-redesign.jpg">BeReal Redesign</a>
  <a href="projects/verum-ai.html" class="nav-link" data-preview="images/previews/verum-ai.jpg">Verum AI</a>
</div>
```

**Key classes/attributes:**
| Item | What it does |
|---|---|
| `.nav-group` | Flex column, top border, spacing. Hidden on mobile (`display: none`) |
| `role="navigation"` | Redundant ARIA role that some tools require when there's no `<nav>` wrapper |
| `aria-label="..."` | Names this group for screen readers (e.g., "Selected Work navigation") |
| `.nav-label` | Uppercase small label text above the links (e.g., "SELECTED WORK") |
| `.nav-link` | Individual link — muted color, underline on hover, accent color when active |
| `data-preview="..."` | Path to thumbnail image; read by JS for hover preview. Empty string = no preview |
| `data-target="section-id"` | Which section this link corresponds to, for active nav tracking |

---

### Nav Label + Nav Link

The smallest units of the sidebar nav.

**`.nav-label`:** Uppercase, 0.75rem, muted color, 0.1em letter-spacing. Visual category header.

**`.nav-link`:** 0.88rem, muted color, transitions to full text color on hover with accent underline. Gets `.active` class (accent color, medium weight) when its section is in view or it's the current page.

**States:**
- Default: muted gray
- `:hover`: full text color, accent-colored underline
- `.active`: accent color, `font-weight: 500`
- `[aria-current="page"]`: same as `.active` (set in HTML, not JS)

---

### Logo Badge

The "DV" badge that links to the home page.

**HTML:**
```html
<a href="#about" class="logo-badge" aria-label="Home">DV</a>
<!-- On non-home pages: href="index.html" or href="../index.html" -->
```

**CSS:** 40×40px square, accent-colored border, accent-colored text. Fills with accent color on hover (white text). Subtle letter-spacing for the monogram.

---

### Theme Toggle

A half-circle button that toggles dark/light mode.

**HTML:**
```html
<button class="theme-toggle" aria-label="Switch to dark mode"></button>
```

**CSS:** 20×20px circle, `border: 1.5px solid currentColor`, `background: linear-gradient(to right, currentColor 50%, transparent 50%)`. The half-filled circle visually represents a half-moon/sun — day on one side, night on the other. In dark mode the same gradient still works because `--color-text` is now light.

**There are two of these per page:**
1. `.sidebar-top .theme-toggle` — desktop only (hidden on mobile via `display: none`)
2. `.sidebar-nav .theme-toggle` — mobile only (hidden on desktop via `display: none`)

JS syncs both: clicking either one updates the theme AND updates the `aria-label` on both.

**Mobile tap area:** The mobile version (`.sidebar-nav .theme-toggle`) gets a 44×44px `::after` pseudo-element to expand the touch target without changing the 20px visual size.

---

### Status Pill

The "Available for work" indicator at the bottom of the sidebar.

**HTML:**
```html
<div class="sidebar-status">
  <span class="status-pill">
    <span class="status-dot" aria-hidden="true"></span>
    <span>Available for work</span>
  </span>
</div>
```

**CSS:**
- `.sidebar-status`: `margin-top: auto` pushes it to the bottom of the sidebar
- `.status-pill`: inline-flex, border, 100px border-radius (pill shape), 0.75rem text
- `.status-dot`: 6px green circle with `animation: pulse-dot 2.5s infinite` — a gentle glow animation
- `aria-hidden="true"` on the dot: the dot is decorative; screen readers read the text "Available for work" without the dot

**Hidden on mobile** (`display: none`) because the sidebar collapses into a navbar.

---

### Section Divider

The `── SECTION NAME ──` separator between content sections.

**HTML:**
```html
<div class="section-divider"><span>Selected Work</span></div>
```

**CSS:** `display: flex; align-items: center; gap: 16px`. The `::before` and `::after` pseudo-elements are flex items with `flex: 1` — they grow to fill the remaining space, creating the lines on either side of the text. The text is `0.75rem`, uppercase, 0.14em letter-spacing.

`.work-divider` adds `margin-top: 64px` for section dividers that appear mid-page between project sections.

---

### Skip Navigation Link

A visually hidden link that becomes visible on keyboard focus. Allows keyboard/screen reader users to skip the sidebar nav and jump to the main content.

**HTML:**
```html
<a href="#main-content" class="skip-nav">Skip to main content</a>
<!-- Must be the very first element in <body> -->
```

**CSS:**
```css
.skip-nav {
  position: absolute;
  top: -48px;   /* hidden above viewport */
  z-index: 9999;
}
.skip-nav:focus {
  top: 0;  /* slides into view on focus */
}
```

Requires `id="main-content"` on the `<main>` element.

---

### Back-to-Top Button

A circular button that appears after scrolling 400px. Created entirely by JavaScript — there's no HTML for it in the source files.

**JS creates:**
```html
<button class="back-to-top" aria-label="Back to top">↑</button>
```
(Appended to `<body>`)

**CSS:** Fixed position, bottom-right corner, `z-index: 150`. Starts at `opacity: 0; visibility: hidden`. Gets `.visible` class via JS to fade in. On mobile: 44×44px (physically larger for touch).

---

### Project Hover Preview

A floating thumbnail card that follows the cursor when hovering project nav links. Created entirely by JavaScript.

**JS creates:**
```html
<div class="project-preview">
  <div class="preview-inner"></div>
</div>
```
(Appended to `<body>`, reused for all links)

**CSS:**
- `position: fixed` + `z-index: 999` — floats above everything
- `pointer-events: none` — never intercepts mouse events (very important)
- `opacity: 0` default, `opacity: 1` when `.visible` class is added
- `.preview-inner`: 16/9 aspect ratio, `background-size: cover` for the thumbnail

**JS logic:**
- On `mouseenter`: read `data-preview` attribute, set background image, add `.visible`
- On `mousemove`: reposition card 18px right of cursor, clamped within viewport
- On `mouseleave`: remove `.visible`
- Guard: if `data-preview` is empty, return early (don't show blank card)

---

## Home Page (index.html)

### Bio Section

The hero text area — name, greeting, and biography.

**HTML:**
```html
<section id="about" class="section-about">
  <p class="greeting">
    Hello world, welcome!
    <span class="greeting-sub">/ hola! /</span>
  </p>
  <h1 class="bio">Dereck is a designer...</h1>
</section>
```

**Key classes:**
| Class | What it does |
|---|---|
| `.section-about` | `padding-bottom: 72px; margin-bottom: 64px` — separation from CV below |
| `.greeting` | Small muted text, flex row for greeting + sub-greeting |
| `.greeting-sub` | Even smaller, lighter opacity, Spanish greeting |
| `.bio` | Display font (Playfair), `clamp(1.5rem, 2.5vw, 2.5rem)` — scales with viewport, max 860px wide |

---

### CV Entry

One row in the experience/education list.

**HTML:**
```html
<div class="cv-entry">
  <div class="cv-meta">
    <span class="cv-year">2024</span>
    <span class="cv-company">Company Name</span>
  </div>
  <div class="cv-role">Job Title</div>
</div>
```

**CSS:** `.cv-entry` is `display: flex; justify-content: space-between` — meta on the left, role on the right. Border dividers between entries. On mobile, changes to `flex-direction: column` so year+company stack above the role.

---

### Project Card

A two-column project row: text left, image placeholder right.

**HTML:**
```html
<section id="project-1" class="project reveal">
  <div class="project-text">
    <span class="project-meta">01 | Product Design</span>
    <h2 class="project-title"><a href="projects/bereal-redesign.html">BeReal Redesign</a></h2>
    <p class="project-desc">Short description...</p>
  </div>
  <div class="project-image-placeholder">
    <!-- TODO: Replace with <img src="..." alt="..."> when images are ready -->
    <span>Project image / mockup</span>
  </div>
</section>
```

**Key classes:**
| Class | What it does |
|---|---|
| `.project` | `display: flex; gap: 48px` — side by side. Bottom border between projects |
| `.project-text` | `flex: 0 0 55%` — fixed 55% width |
| `.project-meta` | Small uppercase category label ("01 | Product Design") |
| `.project-title` | Display font, `clamp(1.875rem, 4.125vw, 3.75rem)` — very large on desktop |
| `.project-desc` | Body copy, `1rem`, muted color, `line-height: 1.75` |
| `.project-image-placeholder` | `flex: 1` — takes remaining space. 16/9 aspect ratio |
| `.reveal` | Fade-in animation on scroll (see ARCHITECTURE.md) |

**`#project-3`:** The last project card has `border-bottom: none; padding-bottom: 0; margin-bottom: 0` — removes the bottom border because the section divider below provides visual separation.

**Mobile:** Stacks to `flex-direction: column`, both text and image go full width.

---

### Lab Card

A card for a technical/dev project with a GitHub link.

**HTML:**
```html
<article class="lab-card">
  <div class="lab-card-top">
    <span class="lab-card-meta">Tag · Tag · Tag</span>
    <a href="..." class="lab-card-link" aria-label="View on GitHub">↗ GitHub</a>
  </div>
  <h3 class="lab-card-title"><a href="...">Project Name</a></h3>
  <p class="lab-card-desc">Description text...</p>
</article>
```

**CSS:** White background (explicit `#ffffff`), border, 4px border-radius. Darkens on hover. In dark mode, uses `--color-placeholder` as background (the explicit `#ffffff` would look jarring in dark mode, so it's overridden with `[data-theme="dark"] .lab-card`).

---

### After Hours Card

A grid card for side project work. 2×2 grid on desktop, 1 column on small mobile.

**HTML:**
```html
<article class="ah-card" id="ah-1">
  <a href="projects/packpal.html">
    <div class="ah-image-placeholder"><span>Image</span></div>
  </a>
  <span class="ah-card-meta">Design Club</span>
  <h3 class="ah-card-title"><a href="projects/packpal.html">PackPal</a></h3>
  <p class="ah-card-desc">Short description...</p>
</article>
```

**CSS:** `display: flex; flex-direction: column; gap: 12px`. The image placeholder background lightens on hover. Title and image are both links to the case study.

---

## About Page (about.html)

### About Hero

Two-column layout: long bio text left, portrait photo placeholder right.

**CSS:**
- `.about-hero`: `display: flex; gap: 64px` — side by side
- `.about-hero-text`: `flex: 0 0 55%` — fixed 55% (matches `.project-text`)
- `.about-photo`: `flex: 1`, `aspect-ratio: 3/4` — portrait proportions
- Mobile: stacks to column, photo becomes `aspect-ratio: 4/3` (landscape, less tall)

---

### About Now Grid

Three cards showing current status (Seeking / Building / Open to).

**HTML:**
```html
<div class="about-now-grid">
  <div class="about-now-card">
    <p class="about-now-label">Seeking</p>
    <p class="about-now-value">Full-time product design...</p>
  </div>
  ...
</div>
```

**CSS:** `grid-template-columns: 1fr 1fr 1fr` — three equal columns. Each card has a border that darkens on hover. Mobile: single column.

---

### About Pull Quote

A large display-font quote, centered, max-width constrained.

**CSS:** `font-family: var(--font-display)`, `clamp(1.2rem, 2vw, 1.65rem)`, centered with `margin-left: auto; margin-right: auto; max-width: 720px`.

---

### About Principles List

Bulleted list of design principles — no visual bullet points, instead uses a CSS-generated `—` em-dash.

**CSS trick:**
```css
.about-principles li {
  padding-left: 20px;
  position: relative;
}
.about-principles li::before {
  content: "—";
  position: absolute;
  left: 0;
}
```
The `list-style: none` removes bullets; `::before` adds the custom dash character, absolutely positioned at the left.

---

### About Tools Grid

A 2×2 grid showing design tools by category.

**CSS:** `grid-template-columns: 1fr 1fr; gap: 32px 64px` — two columns with more horizontal gap than vertical. Centered and max-width constrained. Category labels are uppercase 0.75rem; tool names are 0.88rem in text color.

---

### About Sidelines Grid

Personal interests in a 2-column grid, with dividers creating a table effect.

**CSS:**
- `.about-sidelines`: `display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid`
- `.about-sideline-item`: `border-bottom: 1px solid` — creates rows
- `.about-sideline-item:nth-child(even)`: `padding-left: 40px; border-left: 1px solid` — adds the vertical center divider
- Mobile: single column, center divider removed

---

### About Contact Links

Horizontal row of text links with underline borders.

**CSS:** `display: flex; gap: 32px; flex-wrap: wrap`. Links have `border-bottom: 1px solid --color-divider` that transitions to accent color on hover. Mobile: `flex-direction: column`.

---

## Case Study Pages (projects/*.html)

All case study pages follow the same section structure. The sidebar is identical to `index.html` — see ARCHITECTURE.md and the Sidebar component above.

### Case Study Header

Title, subtitle, and optional award badge.

**HTML:**
```html
<div class="cs-header reveal">
  <span class="project-meta">01 | Product Design</span>
  <h1 class="project-title">Project Name</h1>
  <p class="cs-subtitle">Tagline or summary sentence.</p>
  <div class="cs-award">Award Name — Institution</div>  <!-- optional -->
</div>
```

**CSS:** `.cs-header` has `position: relative; padding-right: 220px` to make room for the award badge (which is `position: absolute; top: 0; right: 0`). On mobile, `padding-right: 0` and the award becomes `position: static` (flows below the subtitle).

---

### Case Study Meta Grid

Project details: timeline, team, role, tools.

**HTML:**
```html
<div class="cs-meta-grid reveal">
  <div class="cs-meta-item">
    <span class="cs-meta-label">Timeline</span>
    <span class="cs-meta-value">6 Weeks, 2023</span>
  </div>
  ...
</div>
```

**CSS:** `display: flex; flex-wrap: wrap` — items spread horizontally. Each `.cs-meta-item` has `flex: 1; min-width: 120px` so they wrap to new rows if the container is narrow. Border-bottom separates it from the content below.

---

### Case Study Overview

The opening paragraph — wide-body summary of the project.

**CSS:** `font-size: 1rem; line-height: 1.85; max-width: 720px; margin-bottom: 64px`. Uses full text color (not muted) to give it appropriate weight.

---

### Case Study Section

The main content block for each section (Problem, Research, Features, etc.).

**HTML:**
```html
<section class="cs-section reveal">
  <span class="cs-section-label">Section Name</span>
  <h2 class="cs-heading">Section headline</h2>
  <p class="cs-body">Body text...</p>
  <!-- can contain: cs-image, cs-pull-quote, cs-stats-row, cs-insight-grid, cs-feature-block -->
</section>
```

**Key classes:**
| Class | What it does |
|---|---|
| `.cs-section` | `margin-bottom: 72px` — spacing between sections |
| `.cs-section-label` | Small uppercase eyebrow label ("The Problem") |
| `.cs-heading` | Display font, `clamp(1.3rem, 2.5vw, 1.8rem)`, max-width 720px |
| `.cs-body` | `1rem`, `line-height: 1.85`, muted color, max-width 720px |
| `.cs-body strong` | Full text color (not muted) for inline emphasis |

---

### Case Study Image Placeholder

A placeholder for screenshots/mockups. Replace with a real `<img>` tag when images are ready.

**HTML:**
```html
<div class="cs-image"><span>Description of what image will show</span></div>
<p class="cs-image-caption">Caption text</p>

<!-- Variants: -->
<div class="cs-image tall">   <!-- 4:3 aspect ratio -->
<div class="cs-image square"> <!-- 1:1, max 480px wide -->
```

**CSS:** `.cs-image` defaults to 16/9 aspect ratio. `margin: 36px 0 12px` — space above and below. Caption is 0.8rem, muted, `opacity: 0.75`.

> **⚠️ TODO:** Replace every `.cs-image` placeholder div with a real `<img src="..." alt="...">` element when project images are ready. The `alt` attribute is critical for accessibility.

---

### Case Study Pull Quote

A highlighted user quote with a left accent border.

**HTML:**
```html
<div class="cs-pull-quote">
  <p>"Quote text here"</p>
  <cite>— Source, context</cite>
</div>
```

**CSS:** `border-left: 2px solid var(--color-accent); padding-left: 24px`. The `<p>` inside uses display font, italic, `clamp(1.1rem, 2vw, 1.35rem)`. The `<cite>` is 0.72rem, muted, `font-style: normal` (overrides default italic `<cite>` styling).

---

### Case Study Stats Row

A horizontal row of key numbers from research or outcomes.

**HTML:**
```html
<div class="cs-stats-row">
  <div class="cs-stat-item">
    <span class="cs-stat">35</span>
    <span class="cs-stat-label">survey participants</span>
  </div>
  ...
</div>
```

**CSS:** `display: flex; flex-wrap: wrap; gap: 48px`. Has top and bottom borders. The `.cs-stat` number uses display font, `clamp(1.6rem, 3vw, 2.2rem)`, accent color. Mobile: `gap: 28px`.

---

### Case Study Insight Grid

A 2-column grid of bordered insight/finding cards.

**HTML:**
```html
<div class="cs-insight-grid">
  <div class="cs-insight-card">
    <span class="cs-section-label">Insight 01</span>
    <p>Insight description...</p>
  </div>
  ...
</div>
```

**CSS:** `display: grid; grid-template-columns: 1fr 1fr; gap: 16px`. Cards have border and border-radius. Mobile: single column.

---

### Case Study Feature Block

Documents one designed feature within a Features section.

**HTML:**
```html
<div class="cs-feature-block">
  <p class="cs-feature-title">Feature Name</p>
  <p class="cs-body">Feature description...</p>
  <div class="cs-image"><span>Feature screens</span></div>
  <p class="cs-image-caption">Caption text</p>
</div>
```

**CSS:** `margin-bottom: 52px; padding-bottom: 52px; border-bottom: 1px solid`. Last child removes the border. `.cs-feature-title` is `1rem, font-weight: 500` — slightly more prominent than body copy.

---

### Case Study Divider

A full-width horizontal rule between major sections.

**HTML:**
```html
<div class="cs-divider"></div>
```

**CSS:** `height: 1px; background: var(--color-divider); margin: 56px 0`. Simpler than `.section-divider` — no text, just a line.

---

### Case Study Back Link

The "← Portfolio" link at the top of case study pages.

**HTML:**
```html
<a href="../index.html" class="cs-back">← Portfolio</a>
```

**CSS:** `display: inline-block; font-size: 0.8rem; color: var(--color-muted)`. Transitions to accent color on hover.

---

*See ARCHITECTURE.md for how these components fit together in the overall layout.*
*See GLOSSARY.md for definitions of any HTML/CSS/JS terms used here.*
