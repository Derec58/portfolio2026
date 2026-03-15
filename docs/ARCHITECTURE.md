# Architecture — Dereck Villagrana Portfolio

> How the site is structured, why it's built this way, and how the interactive systems work.

**Stack:** Vanilla HTML, CSS, JavaScript — no frameworks, no build tools, no npm.
**Entry point:** `index.html` → `css/style.css` + `js/main.js`

---

## Table of Contents
1. [File Structure](#file-structure)
2. [Two-Panel Layout System](#two-panel-layout-system)
3. [CSS Custom Properties (Theme Tokens)](#css-custom-properties-theme-tokens)
4. [Dark / Light Theme System](#dark--light-theme-system)
5. [Responsive Layout Strategy](#responsive-layout-strategy)
6. [Scroll Reveal System](#scroll-reveal-system)
7. [Active Navigation Tracking](#active-navigation-tracking)
8. [Mobile Navigation Overlay](#mobile-navigation-overlay)
9. [Project Hover Preview System](#project-hover-preview-system)
10. [Back-to-Top Button](#back-to-top-button)
11. [Accessibility Systems](#accessibility-systems)

---

## File Structure

```
ClaudeMacWorkspace/
├── index.html                 ← Home page (bio, CV, projects, lab, after hours)
├── about.html                 ← Full about page
├── css/
│   └── style.css              ← All styles (1,575 lines, single file)
├── js/
│   └── main.js                ← All interactivity (148 lines, single file)
├── projects/
│   ├── bereal-redesign.html   ← Case study
│   ├── verum-ai.html
│   ├── bsa-homepage.html
│   ├── packpal.html
│   ├── snapplant.html
│   ├── arc-redesign.html
│   └── sonidos.html
├── images/
│   └── previews/              ← Thumbnail images for nav hover previews
│       ├── bereal-redesign.jpg
│       ├── verum-ai.jpg
│       └── ... (one per project)
└── docs/                      ← You are here
    ├── ARCHITECTURE.md
    ├── COMPONENTS.md
    └── GLOSSARY.md
```

**Why no build tools?** The site is simple enough that webpack/vite/etc. would add complexity without benefit. One CSS file and one JS file. If the project grows significantly, migrating to a build system would be the right call.

---

## Two-Panel Layout System

The core layout is a **fixed sidebar + scrollable main content** pattern.

```
┌─────────────┬────────────────────────────────────┐
│             │                                    │
│   sidebar   │           .content                 │
│  (fixed,    │         (scrollable,               │
│  220px)     │    margin-left: 220px)             │
│             │                                    │
└─────────────┴────────────────────────────────────┘
```

**How it works in CSS:**

```css
/* Sidebar: pinned to viewport, never scrolls with the page */
.sidebar {
  position: fixed;
  width: var(--sidebar-width);  /* 220px */
  height: 100vh;
}

/* Content: offset to the right by the sidebar width */
.content {
  margin-left: var(--sidebar-width);  /* 220px */
}
```

**Why `margin-left` instead of `padding-left`?** Margin pushes the `.content` element itself to the right, making its full width available for content. Padding would shrink the content area.

**The sidebar-header trick (`display: contents`):**
The sidebar's children need to be in a specific order in the flex column, but they're grouped inside `.sidebar-header` for HTML structure reasons. On desktop, `.sidebar-header` gets `display: contents` which makes the wrapper element "disappear" from the layout — its children flow directly into the parent's flex column as if the wrapper wasn't there. On mobile, `display: contents` is overridden back to `display: flex` so the wrapper becomes the visible navbar row.

---

## CSS Custom Properties (Theme Tokens)

All design decisions live in `:root` custom properties. This is the project's "design token" system — change a variable here, and it updates everywhere.

```css
:root {
  /* Layout */
  --sidebar-width: 220px;
  --sidebar-padding: 28px;
  --content-padding-x: 150px;
  --content-padding-y: 56px;

  /* Colors (light mode defaults) */
  --color-bg: #ffffff;
  --color-surface: #f6f6f6;
  --color-text: #1a1a1a;
  --color-muted: #767676;      /* Minimum contrast for WCAG AA */
  --color-accent: #7B5EA7;     /* Purple — links, highlights */
  --color-divider: #e5e5e5;
  --color-status: #4ade80;     /* Green dot */

  /* Placeholder states (for image boxes) */
  --color-placeholder: #f4f4f4;
  --color-placeholder-text: #bbbbbb;
  --color-placeholder-hover: #eeeeee;

  /* Typography */
  --font-display: 'Playfair Display', Georgia, serif;
}
```

**Why this approach?** Changing `--color-accent` in one place updates every button border, nav hover, focus ring, and badge. No find-and-replace needed.

**WCAG note on `--color-muted`:** `#767676` achieves a 4.54:1 contrast ratio on white — the minimum for WCAG AA compliance (4.5:1). The original value `#999999` failed at ~4.2:1.

---

## Dark / Light Theme System

The theme system works in three parts:

**1. CSS: dark mode variants via attribute selector**
```css
/* Light mode (default) */
:root { --color-bg: #ffffff; --color-text: #1a1a1a; }

/* Dark mode: override the same variables */
[data-theme="dark"] { --color-bg: #171717; --color-text: #c9c5be; }
```
When `data-theme="dark"` is set on `<html>`, all the overrides activate. Every `var(--color-*)` call throughout the CSS automatically picks up the dark values. No duplicate rules needed.

**2. HTML: the attribute lives on `<html>`**
```html
<html lang="en" data-theme="dark">  <!-- JS adds/removes this -->
```

**3. JS: toggle the attribute and save the preference**
```js
// On load: restore saved preference
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
}

// On click: flip the attribute and save
const isDark = root.getAttribute('data-theme') === 'dark';
root.setAttribute('data-theme', isDark ? 'light' : 'dark');
localStorage.setItem('theme', isDark ? 'light' : 'dark');
```

**Multiple toggle buttons:** Every page has two `.theme-toggle` buttons (one in `.sidebar-top` for desktop, one in `.sidebar-nav` for mobile). The JS selects all of them with `querySelectorAll` and syncs all of their `aria-label` attributes together.

---

## Responsive Layout Strategy

Three breakpoints, each progressively collapsing the layout:

### Desktop (> 1024px)
- Sidebar: 220px fixed left column
- Content: `padding-x: 150px` — generous whitespace
- Grid layouts: 2 columns (projects, after hours, tools)

### Tablet (769px – 1024px)
```css
@media (max-width: 1024px) and (min-width: 769px) {
  :root {
    --sidebar-width: 200px;    /* slightly narrower */
    --content-padding-x: 48px; /* tighter content padding */
  }
}
```
Everything else stays the same — just tighter.

### Mobile (≤ 768px)
Major structural change:
```css
:root {
  --sidebar-width: 0px;           /* content fills full width */
  --content-padding-x: 24px;     /* minimal padding */
  --content-padding-y: 24px;
}
```

The sidebar transforms from a vertical left column into a **horizontal top navigation bar**:

```
Desktop                Mobile
┌──────┬──────────┐    ┌─────────────────────┐  ← fixed top bar
│      │          │    │ [DV] About CV   [☰] │
│ nav  │ content  │    ├─────────────────────┤
│      │          │    │                     │
└──────┴──────────┘    │      content        │
                       │                     │
```

**How the sidebar becomes a navbar (CSS mechanics):**
```css
.sidebar {
  width: 100%;          /* full width instead of 220px */
  height: auto;         /* shrink-wraps its content */
  flex-direction: row;  /* items side by side instead of stacked */
  flex-wrap: wrap;      /* allows the header row to wrap */
}

.sidebar-header {
  display: flex;         /* overrides display:contents from desktop */
  width: 100%;           /* takes the full row */
}
```

The nav groups (project links) are hidden on mobile: `.nav-group { display: none; }`. They only appear when the hamburger is clicked (see Mobile Navigation Overlay).

**Content offset:** On mobile, `.content` gets `padding-top: calc(var(--content-padding-y) + 72px)`. The `72px` is the height of the fixed mobile navbar (16px padding + 40px badge + 16px padding). Without this, content would start behind the navbar.

### Small Mobile (≤ 480px)
Only one change: the After Hours grid collapses from 2 columns to 1.

---

## Scroll Reveal System

Elements with the `.reveal` class start invisible (opacity 0, shifted 24px down) and animate in when scrolled into view.

**CSS — the "hidden" state:**
```css
.reveal {
  opacity: 0;
  transform: translateY(24px);  /* slightly below final position */
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.revealed {
  opacity: 1;
  transform: translateY(0);  /* back to normal position */
}
```

**JS — using IntersectionObserver to add `.revealed`:**
```js
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');  // triggers the CSS transition
      revealObserver.unobserve(entry.target);  // stop watching — animate once only
    }
  });
}, { threshold: 0.12 });  // fires when 12% of element is visible

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
```

**Why `threshold: 0.12`?** Triggers early enough that the animation is nearly complete by the time the user sees the full element.

**Accessibility:** Users with `prefers-reduced-motion: reduce` get all `.reveal` elements shown immediately at `opacity: 1` with no animation. See `@media (prefers-reduced-motion: reduce)` in style.css.

---

## Active Navigation Tracking

As the user scrolls, the sidebar nav link for the visible section gets the `.active` class (purple color, medium weight).

**How it works:**
```js
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        // Match the link's data-target with the visible section's id
        link.classList.toggle('active', link.dataset.target === id);
      });
    }
  });
}, {
  rootMargin: '-20% 0px -60% 0px',  // only the middle strip of the viewport counts
  threshold: 0,
});
```

**The `rootMargin` trick:** Without margin, a section would become "active" the moment 1 pixel enters the viewport — which happens before it's actually the section you're reading. The `-20% 0px -60% 0px` shrinks the intersection zone to a horizontal strip from 20% to 40% of the viewport. A section only becomes "active" when it reaches this strip, roughly aligning with what the user is actually looking at.

**HTML side:** Nav links need `data-target="section-id"` to be tracked. Sections need matching `id="section-id"`.

---

## Mobile Navigation Overlay

When the hamburger (`☰`) is clicked, the sidebar expands to cover the full screen.

**JS — toggle:**
```js
menuToggle.addEventListener('click', () => {
  const open = sidebar.classList.toggle('nav-open');
  menuToggle.setAttribute('aria-expanded', open);
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
```

**CSS — what `.nav-open` does:**
```css
.sidebar.nav-open {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;  /* full screen */
  height: 100%;
  flex-direction: column;                  /* back to vertical stack */
  animation: overlayFadeIn 0.22s ease;    /* fade in */
}
```

The hamburger icon (`☰`) visually becomes a close icon (`✕`) via CSS:
```css
.sidebar.nav-open .mobile-menu-toggle { font-size: 0; }  /* hide ☰ */
.sidebar.nav-open .mobile-menu-toggle::before { content: "✕"; font-size: 1rem; }  /* show ✕ */
```

Nav groups stagger in with small animation delays (0.08s, 0.13s, 0.18s, 0.23s) for a polished feel.

Clicking any nav link closes the overlay and resets the aria attributes.

---

## Project Hover Preview System

Hovering a nav link with a `data-preview` attribute shows a thumbnail card near the cursor.

**How it's built:**
1. JS creates a single `.project-preview` div and appends it to `<body>` — it's reused for all links.
2. On `mouseenter`, JS sets the preview's background image from `data-preview` and adds `.visible`.
3. On `mousemove`, JS repositions the card 18px to the right of the cursor, clamped to stay within the viewport.
4. On `mouseleave`, JS removes `.visible`.

**CSS handles the fade:**
```css
.project-preview {
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.18s ease, transform 0.18s ease;
  pointer-events: none;  /* never intercepts mouse events */
  z-index: 999;          /* above everything except skip-nav */
}
.project-preview.visible { opacity: 1; transform: translateY(0); }
```

**Bug fix:** When `data-preview=""` (empty string, e.g., the current page link), the preview card used to show with just the link text. Fixed with: `if (!src) return;` — bail out completely when there's no image path.

**Mobile:** `.project-preview { display: none; }` on `max-width: 768px` — hover previews have no purpose on touch devices.

---

## Back-to-Top Button

JS creates a `<button class="back-to-top">` and appends it to `<body>`. It shows after 400px of scrolling.

```js
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });  // performance: tells browser scroll won't be cancelled
```

CSS uses `opacity` + `visibility` for the show/hide so the fade transition works correctly — `display: none` can't be transitioned, but `opacity` can.

---

## Accessibility Systems

### Skip Navigation Link
A visually hidden link at the top of the page becomes visible on keyboard focus. Keyboard users activate it to jump past the sidebar nav directly to `#main-content`. Implemented with `position: absolute; top: -48px` that transitions to `top: 0` on `:focus`.

### Focus Rings
Custom focus styles replace browser defaults:
```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}
:focus:not(:focus-visible) { outline: none; }
```
`:focus-visible` only shows the ring for keyboard users (not mouse clicks) — a modern approach that avoids the tradeoff between removing focus rings (bad for keyboard users) and keeping them (visually noisy for mouse users).

### ARIA Attributes
- `aria-label` — describes interactive elements that have no visible text (toggle buttons)
- `aria-expanded` — tells screen readers if the mobile menu is open
- `aria-current="page"` — marks the active nav link
- `aria-hidden="true"` — hides decorative elements (status dot) from screen readers

### Touch Targets
WCAG 2.5.5 requires touch targets to be at least 44×44px. Small buttons (theme toggle: 20px, hamburger: 28px) use a CSS `::after` pseudo-element to expand the clickable area without changing the visual size or layout. See the GLOSSARY entry "Tap target expansion" for the technique.

### WCAG AA Contrast
All text passes the 4.5:1 contrast ratio minimum:
- `--color-muted: #767676` → 4.54:1 on white (barely passes — important to not lighten this)
- `--color-muted: #8c8780` in dark mode → ~5.5:1 (passes with more headroom)

---

*See COMPONENTS.md for documentation on individual UI components.*
*See GLOSSARY.md for definitions of every HTML/CSS/JS term used.*
