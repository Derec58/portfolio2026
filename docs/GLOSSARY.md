# Glossary — Dereck Villagrana Portfolio

> **Who this is for:** Future Dereck and anyone reading this code cold.
> **What it is:** Plain-English definitions of every HTML, CSS, and JavaScript term used in this project.

---

## Table of Contents
- [HTML Terms](#html-terms)
- [CSS Terms](#css-terms)
- [JavaScript Terms](#javascript-terms)

---

## HTML Terms

### `<!DOCTYPE html>`
The very first line of every HTML file. Tells the browser "this is modern HTML5, not an older version." Without it, browsers enter "quirks mode" and render things inconsistently.

### `<html lang="en">`
The root element — everything else sits inside it. `lang="en"` tells screen readers and search engines the page is in English.

### `<head>`
An invisible container for metadata (information about the page). Nothing in `<head>` is rendered visually. It holds the page title, stylesheet links, font imports, and browser hints.

### `<meta charset="UTF-8">`
Tells the browser which character encoding to use. UTF-8 supports virtually every character in every language, plus emoji. Without this, special characters (accents, symbols) can show as garbage.

### `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
Critical for mobile. Without this line, mobile browsers would render the page at desktop width and then zoom it out to fit the screen — making everything tiny. This tells the browser: "use the device's actual width and don't scale."

### `<title>`
Sets the text shown in the browser tab and in search engine results.

### `<link rel="preconnect" href="...">`
Tells the browser to open a network connection to a domain before it actually needs it. Used here for Google Fonts — it makes fonts load faster by warming up the connection early.

### `<link rel="stylesheet" href="...">`
Loads a CSS file. The `rel="stylesheet"` tells the browser what kind of file it is. The `href` is the file path.

### `<script src="..." defer>`
Loads a JavaScript file. The `defer` attribute means: "download it in parallel, but don't execute it until the HTML is fully parsed." Without `defer`, scripts block the page from loading. Note: `main.js` uses `?v=2` at the end — that's a **cache buster** (see below).

### `<body>`
Everything visible on the page lives inside `<body>`.

### `<aside>`
A semantic HTML element meaning "secondary content related to the main content." Used here for the sidebar navigation. Semantically correct — a sidebar is an "aside" from the main content.

### `<main>`
A semantic element meaning "the primary content of the page." There should only be one `<main>` per page. Screen readers and assistive technology use it to skip directly to the main content area.

### `<section>`
A semantic element grouping related content together. Each `<section>` in this project has an `id` attribute, which is used by the navigation system to track which section is visible.

### `<nav>`
A semantic element indicating a group of navigation links. Screen readers announce it as "navigation." The `aria-label` attribute disambiguates multiple `<nav>` elements on the same page (e.g., "Site navigation" vs. "After Hours").

### `<article>`
A semantic element for self-contained content that could stand on its own — like a blog post or, in this case, a card in the After Hours grid.

### `<div>`
A generic, non-semantic container. Use it when no semantic element fits. It has no inherent meaning to browsers or screen readers.

### `<span>`
Like `<div>` but inline (doesn't start a new line). Used for small bits of text you need to style separately, like `.nav-label` or `.status-pill` text.

### `<p>`
Paragraph text. Adds spacing above and below by default.

### `<h1>` through `<h6>`
Heading elements. `<h1>` is the most important (used once per page for the main heading), `<h6>` is least important. They create a document outline that screen readers use to navigate the page.

### `<a href="...">`
A hyperlink. `href` is the destination URL or page path. Can link to:
- Another page: `href="about.html"`
- A section on the same page: `href="#about"` (jumps to `id="about"`)
- An email: `href="mailto:email@example.com"`
- An external URL: `href="https://..."`

### `<button>`
An interactive button element. Use `<button>` (not `<a>`) when clicking triggers an action (not navigation). Screen readers announce it as a button. Keyboard users can activate it with Enter or Space.

### `<footer>`
A semantic element for footer content — copyright notices, secondary links, etc.

### `<img alt="...">`
Displays an image. The `alt` attribute is critical — it's the text screen readers read aloud, and what shows if the image fails to load. Empty `alt=""` means "this image is decorative, ignore it."

### `id="..."`
A unique identifier for one specific element. Used in two ways here:
1. CSS targeting: `#project-1 { ... }`
2. URL anchoring: `href="#about"` scrolls to `id="about"`
3. JavaScript selection: `document.querySelector('#main-content')`

### `class="..."`
A reusable label you can apply to many elements. CSS and JS use it to style or find groups of elements. One element can have multiple classes separated by spaces: `class="project reveal"`.

### `data-*` attributes
Custom attributes you define yourself. The `data-` prefix is the convention. Example: `data-preview="images/project.jpg"` stores an image path on the element. JavaScript reads it via `element.dataset.preview`.

### `data-preview`
Specific to this project. Stores the path to a project thumbnail image. When you hover a nav link, JavaScript reads this attribute and shows a preview card. Empty string (`data-preview=""`) means no preview image available.

### `data-target`
Used on nav links to name which section they point to. JavaScript compares this value against the `id` of the currently visible section to add the `.active` class.

### `data-theme="dark"`
Set on the `<html>` element by JavaScript when dark mode is active. CSS uses `[data-theme="dark"]` selectors to swap all colors to their dark variants.

### `aria-label="..."`
Accessibility attribute. Provides a text description that screen readers announce. Used when the visible text isn't enough (e.g., a theme toggle button that's just a circle — the `aria-label` says "Switch to dark mode").

### `aria-expanded="true/false"`
Tells screen readers whether a button controls a collapsible element (like the mobile menu) and whether that element is currently open or closed.

### `aria-current="page"`
Marks the link that corresponds to the current page. Screen readers announce it as "current page."

### `aria-hidden="true"`
Hides an element from screen readers entirely. Used on decorative elements (like the status dot animation) that would be noise for screen reader users.

### `target="_blank"`
Opens the link in a new browser tab. Always pair with `rel="noopener noreferrer"` (see below).

### `rel="noopener noreferrer"`
Security best practice when using `target="_blank"`. Without it, the opened tab can access the originating page via `window.opener` — a potential security hole. `noreferrer` also prevents the destination from knowing which page sent the user.

### Semantic HTML
HTML written with meaning, not just structure. `<nav>` instead of `<div class="nav">`. `<aside>` instead of `<div class="sidebar">`. Screen readers, search engines, and accessibility tools all understand semantic elements.

### Skip navigation link (`.skip-nav`)
A link at the very top of the page, visually hidden until focused, that says "Skip to main content." Keyboard users and screen reader users activate it to jump past the sidebar nav and get straight to the content. Requires the `<main>` element to have an `id`.

### Cache buster (`?v=2`)
When a browser loads a CSS or JS file, it stores a copy locally (caches it) to avoid re-downloading it. This is usually good. But when you update the file, the browser might serve the old cached version. Adding `?v=2` (or any query string) to the filename makes the browser treat it as a new file and re-download it.

---

## CSS Terms

### Custom Properties (CSS Variables)
Variables in CSS. Declared in `:root` with `--` prefix, used anywhere with `var()`. Changing one value in `:root` updates every place it's used.
**Example:** `--color-accent: #7B5EA7` then `color: var(--color-accent)`.

### `:root`
The very top of the CSS tree — the `<html>` element. Custom properties defined here are available everywhere on the page.

### `var(--property-name)`
Reads a CSS custom property value. If the property doesn't exist, you can provide a fallback: `var(--missing-prop, red)`.

### `clamp(min, preferred, max)`
A fluid value that scales between a minimum and maximum. `clamp(1.5rem, 2.5vw, 2.5rem)` means:
- Never smaller than `1.5rem`
- Ideally `2.5vw` (2.5% of viewport width — scales with screen size)
- Never larger than `2.5rem`
Used for fluid typography that adapts to any screen size.

### `calc()`
Lets you mix units and do math in CSS. `calc(100% - 220px)` can't be written any other way — you can't subtract pixels from a percentage without `calc()`.

### `rem`
Relative unit based on the root font size. `1rem = 16px` (the browser default). Use `rem` for font sizes so that user browser settings (accessibility feature: larger text) still work. Avoid `px` for font sizes.

### `em`
Relative to the parent element's font size. Less predictable than `rem` when nested. Used in `letter-spacing` here where it scales with the element's own font size.

### `vw` (viewport width)
1vw = 1% of the viewport (browser window) width. Used in `clamp()` to make text scale with screen width.

### `display: flex`
Enables **flexbox** layout on a container. Children are arranged in a row (default) or column. Flex is great for aligning items and distributing space.

### `flex-direction: column`
Changes flexbox from horizontal (row) to vertical (column) arrangement.

### `flex-wrap: wrap`
Allows flex children to wrap to the next line when they don't fit. Used in the mobile sidebar — when the viewport is narrow, the sidebar-header items wrap into the navbar layout.

### `flex: 1`
Shorthand for "take up all remaining space." Equivalent to `flex-grow: 1; flex-shrink: 1; flex-basis: 0`.

### `flex: 0 0 55%`
"Don't grow, don't shrink, start at exactly 55% width." Used on `.project-text` to give the text column a fixed percentage.

### `flex-shrink: 0`
Prevents an element from getting smaller than its content or set size when the container is narrow.

### `gap`
Space between flex or grid children. Cleaner than margins. `gap: 16px` adds 16px between every child.

### `display: grid`
Enables **CSS Grid** layout. More powerful than flex for two-dimensional layouts (rows AND columns simultaneously).

### `grid-template-columns: 1fr 1fr`
Defines two equal columns. `1fr` = "one fraction of the available space." `1fr 1fr` = two equal columns.

### `display: contents`
A tricky one. Makes an element "invisible" to the layout engine — its box disappears, but its children stay in the flow as if the element wasn't there. Used on `.sidebar-header` on desktop so the sidebar-top and sidebar-nav items flow directly into the sidebar's flex column as if sidebar-header didn't exist.

### `position: fixed`
Removes the element from normal document flow and pins it relative to the viewport (browser window). It stays in place even when the page scrolls. Used for the sidebar and the back-to-top button.

### `position: absolute`
Removes the element from normal document flow and positions it relative to its nearest ancestor that has `position: relative` (or `absolute`, `fixed`, `sticky`). Used for the award badge in case study headers.

### `position: relative`
Keeps the element in normal flow but creates a **positioning context** — descendants with `position: absolute` are now positioned relative to this element. Also used for the `::after` tap target trick (see below).

### `position: sticky`
Stays in normal flow until it hits the viewport edge, then sticks there. Used for the sidebar header in the mobile overlay so it stays visible when the nav scrolls.

### `z-index`
Controls stacking order when elements overlap. Higher number = on top. Only works when an element has a `position` value other than `static` (the default). Values used in this project:
- `z-index: 100` — sidebar (on top of content)
- `z-index: 150` — back-to-top button
- `z-index: 200` — mobile nav overlay (on top of everything)
- `z-index: 999` — project hover preview
- `z-index: 9999` — skip navigation link

### `overflow: hidden`
Clips content that extends beyond the element's bounds. Content outside is invisible.

### `overflow-y: auto`
Adds a scrollbar only when vertical content overflows. Used on the sidebar so it scrolls when there are many nav items.

### `@media (max-width: 768px)`
A **media query** — CSS rules that only apply at certain screen sizes. Everything inside only applies when the viewport is 768px wide or narrower (mobile). Three breakpoints in this project:
- `max-width: 1024px` — tablet
- `max-width: 768px` — mobile (primary breakpoint)
- `max-width: 480px` — small mobile

### `@media (prefers-reduced-motion: reduce)`
A media query that checks if the user has requested reduced motion in their OS settings (an accessibility feature). When active, all animations and transitions are disabled so they don't trigger discomfort for users with vestibular disorders.

### `@keyframes`
Defines a CSS animation — the states an element moves through over time.
**Example:** `@keyframes pulse-dot` makes the status dot fade and glow on a loop.

### `animation`
Applies a `@keyframes` animation to an element. Properties include name, duration, timing function, iteration count.

### `transition`
Smoothly animates a CSS property change. `transition: color 0.15s` means "when `color` changes, animate it over 0.15 seconds." No JS needed.

### `transform`
Visually moves, scales, or rotates an element without affecting layout. `translateY(24px)` moves it 24px down. `translate(-50%, -50%)` centers an absolutely positioned element by moving it back half its own width and height.

### `opacity`
Controls transparency. `opacity: 0` is invisible, `opacity: 1` is fully visible.

### `visibility: hidden`
Hides an element but keeps its space in layout (unlike `display: none`). Combined with `opacity: 0` to properly hide the back-to-top button — `opacity` handles the fade, `visibility` ensures it's not keyboard-accessible when hidden.

### `pointer-events: none`
Disables all mouse/touch interactions on an element. Clicks, hovers, and drags pass right through it. Used on the project hover preview so it doesn't accidentally intercept mouse events.

### `border-radius`
Rounds element corners. `border-radius: 50%` creates a perfect circle. `border-radius: 100px` on a pill shape rounds the ends.

### `aspect-ratio`
Forces an element to maintain a specific width-to-height ratio. `aspect-ratio: 16 / 9` always renders as widescreen video proportions. Used for image placeholders so they have the right shape even without real images.

### `letter-spacing`
Space between individual characters. Positive values space them out (used on uppercase labels for readability). Negative values tighten text (used on large display headings for a tighter, editorial feel).

### `text-transform: uppercase`
Converts text to ALL CAPS via CSS, without changing the actual HTML. This is better than writing in all caps in the HTML because screen readers read CSS-transformed text normally.

### `white-space: nowrap`
Prevents text from wrapping to a new line. Used on `.lab-card-link` to keep "↗ GitHub" on one line.

### `::before` and `::after`
**Pseudo-elements** — virtual elements CSS creates before or after an element's content without any HTML. Used here for:
- Section divider lines (`::before` and `::after` on `.section-divider`)
- The 44×44px tap target expansion on the hamburger and theme toggle

### `content: ''`
Required to make `::before` or `::after` pseudo-elements appear. Even if empty, it must be present.

### Tap target expansion (`::after` technique)
Mobile touch targets should be at least 44×44px (WCAG 2.5.5). If a button is visually 20×20px, making it physically 44px would break the layout. The solution: keep the button visually small, add `position: relative` to it, then use `::after { position: absolute; width: 44px; height: 44px; transform: translate(-50%, -50%); }`. The pseudo-element is larger than the button but positioned in the center, expanding the clickable area without affecting layout.

### `[data-theme="dark"]`
An **attribute selector** — targets elements that have a specific attribute value. `[data-theme="dark"] .lab-card` means "any `.lab-card` inside an element that has `data-theme="dark"`. This is how the dark mode theme works: JavaScript adds `data-theme="dark"` to `<html>`, and all these selectors activate.

### `scroll-behavior: smooth`
Makes anchor link clicks (`href="#section"`) scroll smoothly instead of jumping instantly.

### `scrollbar-width: none`
Hides the scrollbar on the sidebar (Firefox). Paired with `.sidebar::-webkit-scrollbar { display: none; }` for Chrome/Safari. The sidebar is still scrollable, just without a visible scrollbar.

### `box-sizing: border-box`
Changes how element width/height is calculated. Default (`content-box`) means padding and border are added ON TOP of the declared width — confusing. `border-box` means the declared width INCLUDES padding and border. Applied globally with `* { box-sizing: border-box; }`.

### `min-height: 100vh`
`100vh` = 100% of the viewport height. `min-height` means "at least this tall, but grow if content requires it." Used to ensure the page fills the screen even when content is short.

### `margin: auto`
On block elements, `margin: 0 auto` centers the element horizontally. On flex children, `margin-top: auto` pushes the element to the bottom of the container.

### `max-width`
Caps how wide an element can grow. Used on body copy (`.cs-body`, `.cs-overview`) to keep lines readable — long lines are hard to read. `max-width: 720px` is a common comfortable reading width.

### `line-height`
Spacing between lines of text. `1.6` means each line is 1.6× the font size tall. Larger values improve readability for body copy.

### `font-family`
Sets the typeface. The value is a list — if the first font isn't available, the browser tries the next. `var(--font-display)` = Playfair Display (serif editorial), `'Inter'` = clean sans-serif.

### `font-weight`
Text thickness. `400` = regular, `500` = medium, `700` = bold. `font-weight: 400` on display headings gives them an editorial, light feel.

### `inherit`
CSS value meaning "use whatever value the parent element has." `color: inherit` on links means links don't default to blue — they match their context.

---

## JavaScript Terms

### `document.querySelector('.class')`
Finds the **first** element matching a CSS selector. Returns the element or `null` if not found.

### `document.querySelectorAll('.class')`
Finds **all** elements matching a CSS selector. Returns a NodeList (like an array). You need to loop over it with `.forEach()`.

### `addEventListener('event', callback)`
Attaches a function to run when a specific event happens. Common events: `'click'`, `'scroll'`, `'mouseenter'`, `'mouseleave'`, `'mousemove'`.

### `classList.add('class')` / `.remove()` / `.toggle()`
Manipulates the class list of an element. `.toggle()` adds the class if absent, removes it if present, and returns `true`/`false` to tell you the new state.

### `classList.contains('class')`
Returns `true` if the element has that class.

### `element.dataset`
Access to all `data-*` attributes on an element as a plain object. `element.dataset.preview` reads `data-preview="..."`. `element.dataset.target` reads `data-target="..."`.

### `element.setAttribute('name', 'value')`
Sets an HTML attribute on an element. Used here to update `aria-expanded` and `aria-label` on buttons dynamically.

### `element.getAttribute('name')`
Reads an HTML attribute value. Returns `null` if it doesn't exist.

### `localStorage`
Browser storage that persists even after the tab is closed. Stores simple key-value strings. Used here to remember the user's dark/light mode preference. `localStorage.setItem('key', 'value')` saves, `localStorage.getItem('key')` reads.

### `IntersectionObserver`
A browser API that watches elements and fires a callback when they enter or leave the visible viewport. More efficient than listening to scroll events. Used twice:
1. **Scroll reveal** — adds `.revealed` class when an element scrolls into view
2. **Active nav tracking** — highlights the correct nav link as you scroll

### `IntersectionObserver` — `threshold`
How much of the element must be visible to trigger the callback. `threshold: 0.12` = 12% visible. `threshold: 0` = even 1 pixel visible triggers it.

### `IntersectionObserver` — `rootMargin`
Shrinks or expands the "visible zone" virtually. `'-20% 0px -60% 0px'` means "only consider something 'intersecting' if it's in the middle strip of the viewport — 20% from the top, 40% from the bottom." This ensures the active nav link matches what's actually in view, not just barely scrolled past.

### `entry.isIntersecting`
A boolean (`true`/`false`) — `true` when the observed element is inside the intersection zone.

### `observer.unobserve(element)`
Stops watching an element. Used in scroll reveal — once an element has revealed itself, there's no need to watch it anymore.

### `window.scrollY`
How many pixels the page has been scrolled vertically from the top.

### `window.scrollTo({ top: 0, behavior: 'smooth' })`
Scrolls the page to a specific position. `behavior: 'smooth'` animates it instead of jumping.

### `window.innerWidth`
The current viewport width in pixels.

### `getBoundingClientRect()`
Returns an element's position and size relative to the viewport. Used to position the project hover preview near the cursor.

### `passive: true` (event listener option)
A performance hint for scroll/touch events. Tells the browser "I won't call `preventDefault()` in this handler, so you can scroll without waiting for my JS to finish." Prevents scroll jank.

### `document.createElement('tag')`
Creates a new HTML element in memory, not yet attached to the page. Use `.appendChild()` to add it to the DOM.

### `element.appendChild(child)`
Adds a child element inside the target element, at the end.

### `element.innerHTML`
Gets or sets the raw HTML content inside an element as a string. Use carefully — setting `innerHTML` from untrusted data is an XSS (security) risk.

### `element.textContent`
Gets or sets the plain text inside an element (no HTML tags). Safer than `innerHTML` for text content.

### `element.style.property`
Sets an inline CSS style directly on an element. Overrides stylesheet rules. Used here to position the preview card: `previewCard.style.left = '200px'`.

### `Math.min(a, b)` / `Math.max(a, b)`
`Math.min` returns the smaller of two values. `Math.max` returns the larger. Used together to clamp the preview card position within the viewport: "position it at cursor+offset, but no closer than 8px to the edge."

### `e.clientX` / `e.clientY`
Mouse event properties. The cursor's X/Y position relative to the viewport at the moment of the event.

### Template literals (`` ` `` ... `` ` ``)
Backtick strings that allow embedded expressions and multi-line content. `url(${src})` inserts the value of `src` into the string.

### Arrow functions (`=>`)
Shorthand function syntax. `(x) => x * 2` is equivalent to `function(x) { return x * 2; }`.

### `forEach()`
Loops over every item in an array or NodeList, running a callback for each.

### `const` / `let`
Variable declarations. `const` — the binding can't be reassigned (the value can still be mutated). `let` — can be reassigned. Prefer `const` by default; use `let` when you need to reassign.

### `===`
Strict equality — checks both value AND type. `'dark' === 'dark'` is `true`. Prefer over `==` which does type coercion.

### `||` (logical OR)
"or" — returns the first truthy value. `previewCard.offsetWidth || 160` means "use the card's actual width, but if it's 0 (not visible yet), fall back to 160."

---

*Last updated: 2025. Part of the project documentation — see also ARCHITECTURE.md and COMPONENTS.md.*
