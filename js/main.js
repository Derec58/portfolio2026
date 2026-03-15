/**
 * main.js — Portfolio Interactivity
 * ─────────────────────────────────────────────────────────────────────────────
 * All JavaScript for the portfolio site lives here. No frameworks, no imports.
 * This file handles five features:
 *
 *  1. Dark / Light Theme Toggle
 *  2. Scroll Reveal Animations
 *  3. Active Navigation Link Tracking
 *  4. Mobile Hamburger Menu
 *  5. Project Hover Preview Cards
 *  6. Back-to-Top Button
 *
 * This script is loaded at the bottom of every HTML page with the `defer`
 * attribute (via ?v=2 cache buster), so the DOM is fully parsed when it runs.
 * ─────────────────────────────────────────────────────────────────────────────
 */


// ─── 1. Dark / Light Theme Toggle ─────────────────────────────────────────────
//
// How it works:
//   - Clicking a .theme-toggle button sets data-theme="dark" or "light" on <html>.
//   - CSS uses [data-theme="dark"] selectors to swap all colors automatically.
//   - The preference is saved to localStorage so it persists across page loads.
//   - There are TWO .theme-toggle buttons per page (one for desktop, one for
//     mobile). querySelectorAll finds both; all syncs keep them in agreement.
// ──────────────────────────────────────────────────────────────────────────────

// Select ALL theme toggle buttons on the page (desktop + mobile copies)
const toggles = document.querySelectorAll('.theme-toggle');

// document.documentElement = the <html> element — where data-theme lives
const root = document.documentElement;

// On page load: restore the user's saved preference from localStorage.
// localStorage.getItem() returns null if the key has never been set.
if (localStorage.getItem('theme') === 'dark') {
  root.setAttribute('data-theme', 'dark');
}

// Set the correct aria-label on every toggle button to match the current state.
// aria-label is what screen readers announce when the button is focused.
// "Switch to dark mode" when light; "Switch to light mode" when dark.
toggles.forEach(t => t.setAttribute('aria-label',
  localStorage.getItem('theme') === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
));

// Attach a click handler to every toggle button
toggles.forEach(t => {
  t.addEventListener('click', () => {
    // Read the current theme from the <html> attribute
    const isDark = root.getAttribute('data-theme') === 'dark';

    // Flip it: dark → light, or light → dark
    root.setAttribute('data-theme', isDark ? 'light' : 'dark');

    // Save the new preference to localStorage so it persists on the next visit
    localStorage.setItem('theme', isDark ? 'light' : 'dark');

    // Update aria-label on ALL toggle buttons to reflect the new state
    // (t2 is used to avoid shadowing the outer `t` variable)
    toggles.forEach(t2 => t2.setAttribute('aria-label',
      isDark ? 'Switch to dark mode' : 'Switch to light mode'
    ));
  });
});


// ─── 2. Scroll Reveal ─────────────────────────────────────────────────────────
//
// How it works:
//   - Elements with class="reveal" start invisible (opacity:0, shifted down 24px)
//     via CSS.
//   - IntersectionObserver watches all .reveal elements.
//   - When an element scrolls into the viewport, the observer adds "revealed"
//     class, triggering a CSS transition to opacity:1 and translateY(0).
//   - The element is then "unobserved" — it only animates once, not every time
//     it scrolls in and out.
//
// IntersectionObserver is more efficient than listening to the scroll event
// because it runs off the main thread and only fires when something changes.
// ──────────────────────────────────────────────────────────────────────────────

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // entry.isIntersecting: true when the element is inside the viewport zone
      if (entry.isIntersecting) {
        // Adding "revealed" triggers the CSS transition (defined in style.css)
        entry.target.classList.add('revealed');

        // Stop watching this element — it should only animate once
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    // threshold: 0.12 means 12% of the element must be visible before firing.
    // Low enough to trigger early, high enough to avoid triggering off-screen.
    threshold: 0.12
  }
);

// Find every element with class="reveal" and start watching it
document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});


// ─── 3. Active Nav Link Tracking ──────────────────────────────────────────────
//
// How it works:
//   - Watches all sections/divs with an `id` attribute.
//   - When a section enters the "active zone" (a horizontal strip in the middle
//     of the viewport), the corresponding sidebar nav link gets class "active".
//   - The active link turns accent-colored (purple) to show your position.
//
// The "active zone" is defined by rootMargin: '-20% 0px -60% 0px':
//   - Top shrunk 20%: ignores elements barely scrolled in from the top
//   - Bottom shrunk 60%: only the top 40% of the viewport counts
//   - Effect: a section becomes "active" when it reaches roughly eye-level,
//     matching what the user is actually reading.
// ──────────────────────────────────────────────────────────────────────────────

// Find all page sections that have an id (these are scroll targets)
const sections = document.querySelectorAll('section[id], div[id]');

// Find all sidebar nav links that have a data-target attribute
// (data-target holds the id of the section this link corresponds to)
const navLinks = document.querySelectorAll('.nav-link[data-target]');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Get the id of the section that just entered the active zone
        const id = entry.target.getAttribute('id');

        // Update all nav links: add "active" to the matching one, remove from others.
        // classList.toggle(class, condition) adds the class if condition is true,
        // removes it if false — a clean one-liner for mutual exclusion.
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.dataset.target === id);
        });
      }
    });
  },
  {
    // rootMargin shrinks the "visible" zone:
    //   top -20%: don't activate until 20% below viewport top
    //   bottom -60%: ignore sections below the 40% mark of viewport
    // This makes the active section match what's in the reader's focus area.
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0, // Fire as soon as any pixel enters the zone
  }
);

// Start watching every section
sections.forEach((section) => {
  navObserver.observe(section);
});


// ─── 4. Mobile Navigation Hamburger ───────────────────────────────────────────
//
// How it works:
//   - On mobile, the full sidebar nav is hidden. Only the top bar shows.
//   - Clicking the hamburger button (☰) adds "nav-open" to .sidebar.
//   - CSS expands the sidebar to a full-screen overlay when nav-open is present.
//   - The hamburger visually becomes a close icon (✕) via CSS when nav-open.
//   - Clicking any nav link closes the menu and resets aria-expanded.
//
// Accessibility:
//   - aria-expanded tells screen readers whether the menu is open or closed.
//   - aria-label changes between "Open navigation" and "Close navigation".
// ──────────────────────────────────────────────────────────────────────────────

const menuToggle = document.querySelector('.mobile-menu-toggle');
const sidebar = document.querySelector('.sidebar');

// Guard: only run if both elements exist (they do on every page, but safe practice)
if (menuToggle && sidebar) {
  menuToggle.addEventListener('click', () => {
    // classList.toggle returns true if the class was ADDED, false if REMOVED
    const open = sidebar.classList.toggle('nav-open');

    // Sync aria-expanded with the open state (must be a string, not boolean)
    menuToggle.setAttribute('aria-expanded', open);

    // Update the button label for screen readers
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });

  // Close the menu automatically when any nav link is clicked
  // (otherwise the overlay stays open after navigating to a new section)
  sidebar.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('nav-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
    });
  });
}


// ─── 5. Project Hover Preview ──────────────────────────────────────────────────
//
// How it works:
//   - A single .project-preview div is created once and appended to <body>.
//     It's reused for every nav link — only one preview exists at a time.
//   - Nav links with data-preview="path/to/image.jpg" activate the preview.
//   - On mouseenter: sets the background image and adds class "visible" (CSS fade-in).
//   - On mousemove: repositions the card 18px right of the cursor, clamped to viewport.
//   - On mouseleave: removes "visible" (CSS fade-out).
//
// Note: pointer-events: none on .project-preview (in CSS) ensures the preview card
// never accidentally intercepts mouse events and causes flickering.
//
// Mobile: .project-preview is display:none on mobile (style.css) — hover has no
// meaning on touch devices.
// ──────────────────────────────────────────────────────────────────────────────

// Create the preview card once and add it to the page
const previewCard = document.createElement('div');
previewCard.className = 'project-preview';
previewCard.innerHTML = '<div class="preview-inner"></div>';
document.body.appendChild(previewCard);

// Reference to the inner div (where the background image is applied)
const previewInner = previewCard.querySelector('.preview-inner');

// Find all nav links that have the data-preview attribute (even if empty)
document.querySelectorAll('.nav-link[data-preview]').forEach((link) => {
  link.addEventListener('mouseenter', (e) => {
    const src = link.dataset.preview; // Read the image path from data-preview

    // Bug fix: if data-preview="" is empty (e.g., current page link),
    // bail out completely — don't show a blank or text-only preview card.
    if (!src) return;

    // Set the thumbnail as the background image of the inner div
    previewInner.style.backgroundImage = `url(${src})`;
    previewInner.textContent = ''; // Clear any previous text content

    // Make the card visible (CSS handles the opacity fade-in transition)
    previewCard.classList.add('visible');
    positionPreview(e.clientX, e.clientY);
  });

  // Reposition the card as the cursor moves across the link
  link.addEventListener('mousemove', (e) => {
    positionPreview(e.clientX, e.clientY);
  });

  // Hide the card when the cursor leaves the link
  link.addEventListener('mouseleave', () => {
    previewCard.classList.remove('visible');
  });
});

/**
 * positionPreview — places the preview card near the cursor
 *
 * @param {number} x - Cursor X position (from e.clientX)
 * @param {number} y - Cursor Y position (from e.clientY)
 *
 * The card appears 18px to the right of the cursor.
 * Math.min clamps the left edge so the card never extends off the right side.
 * Math.max clamps the top edge so the card never extends above the viewport.
 *
 * The `|| 160` and `|| 90` fallbacks handle the case where the card hasn't
 * been rendered yet (offsetWidth/Height === 0 before first display).
 */
function positionPreview(x, y) {
  const offset = 18; // Gap between cursor and left edge of preview card
  const pw = previewCard.offsetWidth || 160;   // Card width (fallback: 160px)
  const ph = previewCard.offsetHeight || 90;   // Card height (fallback: 90px)

  // Clamp left: position at cursor+offset, but no closer than 8px to right edge
  const left = Math.min(x + offset, window.innerWidth - pw - 8);

  // Clamp top: center the card on the cursor, but no closer than 8px to top edge
  const top = Math.max(8, y - ph / 2);

  previewCard.style.left = left + 'px';
  previewCard.style.top = top + 'px';
}


// ─── 6. Back to Top Button ─────────────────────────────────────────────────────
//
// How it works:
//   - A button is created and appended to <body> — not present in any HTML file.
//   - A scroll event listener shows the button after scrolling 400px down.
//   - Clicking it smoothly scrolls back to the top.
//
// { passive: true } on the scroll listener is a performance hint: it tells the
// browser "this listener will never call event.preventDefault()", so the browser
// can scroll without waiting for the JS to finish first. Prevents scroll jank.
// ──────────────────────────────────────────────────────────────────────────────

// Create the button and add it to the page
const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.setAttribute('aria-label', 'Back to top'); // Screen reader description
backToTop.innerHTML = '↑'; // Arrow character — no image needed
document.body.appendChild(backToTop);

// Show/hide the button based on scroll position
window.addEventListener('scroll', () => {
  // classList.toggle with a boolean: adds "visible" if scrollY > 400, removes otherwise
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true }); // Performance: we won't preventDefault, so browser can scroll freely

// Smooth-scroll to the top when clicked
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
