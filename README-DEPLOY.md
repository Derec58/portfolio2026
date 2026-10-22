# dereckvilla.design: production build (v12 design)

This folder is the complete, deployable static site. There are no frameworks and no build step at runtime.

## Deploy
1. In your repo, replace the old site files with the contents of this folder: `index.html`, `about.html`, `contact.html`, `services.html`, `404.html`, `CNAME`, `resume.pdf`, `projects/`, `css/`, `js/`, `fonts/`, `images/`, `vercel.json`, `sitemap.xml`, `robots.txt`, `site.webmanifest`. Keep `README.md`, `docs/` and `package.json` if you use them.
2. You can delete the old `css/style*.css`, `js/main*.js` and the `.jpg` images; nothing references them anymore.
3. Push. Vercel serves the folder as-is.

## Editing
- **CSS:** edit `css/site.css`, then regenerate `site.min.css` (or ask me), and bump `?v=5` → `?v=6` in every page `<head>`. CSS and JS are cached for a year.
- **JS:** edit `js/site.js`, then regenerate `site.min.js` and bump `?v=` the same way.
- **Theme script:** the inline theme script in each `<head>` is allowed by its sha256 hash in `vercel.json`. If you change it, update the hash or browsers will block it.

## What's in it
- **Pages:**
  - Home: sidebar index, top bar, hero, Selected Work spreads, Independent Work ledger, Lab, footer.
  - About, Services, Contact, 404.
  - 7 case studies generated from the content of the old project pages.
- **Mobile menu:** keeps keyboard focus inside while open, closes on Esc, and blocks the page behind it.
- **Inner pages:** a collapsible side index (hover or click, Esc to close) and a light/dark text toggle. The theme is remembered, and your system setting is used the first time you visit.
- **Case studies:** a sticky chapter index on wide screens and a chapter bar on smaller ones, a lightbox (arrow keys to step, Esc to close), and a next-project link.
- **Performance:**
  - The largest image near the top loads first on every page (portrait on home and About, cover on case studies).
  - Every image has responsive sizes and fixed dimensions, and everything below the fold loads lazily.
  - Fonts are self-hosted and preloaded.
  - One CSS file and one deferred JS file.
- **Layout:** it adapts to the width of the content area rather than the whole window, so the tablet-with-sidebar case gets the correct layout.
- **SEO:** a title, description, canonical URL and Open Graph tags on every page, a Person entry for search engines on the homepage, `noindex` on the 404 page, and an updated sitemap.
