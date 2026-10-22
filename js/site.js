/* dereckvilla.design · site.js (vanilla, deferred). Edit here, then regenerate site.min.js. */
(function () {
  'use strict';
  var d = document, root = d.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };

  /* ── Theme ── */
  function isDark() { return root.getAttribute('data-theme') === 'dark'; }
  function syncTheme() {
    $$('[data-theme-toggle]').forEach(function (b) {
      var l = b.querySelector('[data-theme-label]');
      if (l) l.textContent = isDark() ? 'Light' : 'Dark';
      b.setAttribute('aria-label', isDark() ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }
  $$('[data-theme-toggle]').forEach(function (b) {
    b.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      syncTheme();
    });
  });
  syncTheme();

  /* ── Copy email ── */
  $$('[data-copy]').forEach(function (b) {
    var status = b.parentNode.querySelector('[role="status"]');
    b.addEventListener('click', function () {
      var done = function () {
        b.textContent = 'Copied ✓'; b.classList.add('is-done');
        if (status) status.textContent = 'Email address copied to clipboard';
        clearTimeout(b._t);
        b._t = setTimeout(function () { b.textContent = 'Copy'; b.classList.remove('is-done'); if (status) status.textContent = ''; }, 2000);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(b.getAttribute('data-copy')).then(done, done); else done();
    });
  });

  /* ── Back to top ── */
  var totop = $('.totop');
  if (totop) totop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    var m = $('#main-content'); if (m) { m.setAttribute('tabindex', '-1'); m.focus({ preventScroll: true }); }
  });

  /* ── Mobile menu (home) ── */
  var menuBtn = $('[data-menu-btn]'), menu = $('#menu');
  function setMenu(open) {
    if (!menu || !menuBtn) return;
    menu.hidden = !open;
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    var lab = menuBtn.querySelector('[data-menu-label]'); if (lab) lab.textContent = open ? 'Close' : 'Menu';
    d.body.style.overflow = open ? 'hidden' : '';
    ['main-content', 'colophon'].forEach(function (id) { var el = d.getElementById(id); if (el) { if (open) el.setAttribute('inert', ''); else el.removeAttribute('inert'); } });
    if (open) { var a = menu.querySelector('a[href],button'); if (a) a.focus(); } else menuBtn.focus();
  }
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () { setMenu(menu.hidden); });
    menu.addEventListener('click', function (e) { var a = e.target.closest('a[href^="#"]'); if (a) setMenu(false); });
    d.addEventListener('keydown', function (e) {
      if (menu.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); setMenu(false); return; }
      if (e.key === 'Tab') {
        var f = [menuBtn].concat($$('a[href],button', menu));
        var i = f.indexOf(d.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 768 && !menu.hidden) setMenu(false); }, { passive: true });
  }

  /* ── Hover preview (sidebar, fine pointers only) ── */
  var prev = $('.preview'), prevImg = prev && prev.querySelector('img');
  if (prev && fine) {
    var px = 0, py = 0, raf = 0;
    d.addEventListener('mousemove', function (e) {
      px = e.clientX; py = e.clientY;
      if (!raf) raf = requestAnimationFrame(function () { raf = 0; prev.style.transform = 'translate3d(' + px + 'px,' + py + 'px,0)'; });
    }, { passive: true });
    $$('[data-preview]').forEach(function (a) {
      a.addEventListener('mouseenter', function () { if (prevImg.getAttribute('src') !== a.dataset.preview) prevImg.src = a.dataset.preview; prev.classList.add('is-on'); });
      a.addEventListener('mouseleave', function () { prev.classList.remove('is-on'); });
    });
  }

  /* ── Scroll-driven state ── */
  var secs = $$('[data-sec]'), navLinks = $$('.sidebar [data-nav], .menu [data-nav]'), groups = $$('[data-navgroup]');
  var marker = $('.sidebar .snav-marker'), readout = $('.readout');
  var chs = $$('[data-ch]'), chLinks = $$('[data-chnav]'), chMarker = $('.chap .snav-marker');
  var chBar = $('.chapbar-track i'), chCount = $('[data-chap-count]'), chTitle = $('[data-chap-title]');
  var lastSec = null, lastCh = -1;
  function place(mk, link) {
    if (!mk) return;
    if (link) { mk.style.transform = 'translateY(' + link.offsetTop + 'px) scaleY(' + link.offsetHeight + ')'; mk.style.opacity = '1'; }
    else mk.style.opacity = '0';
  }
  function onScroll() {
    var vh = window.innerHeight;
    if (totop) totop.classList.toggle('is-on', window.scrollY > vh * 1.5);
    if (secs.length) {
      var active = '';
      for (var i = 0; i < secs.length; i++) if (secs[i].getBoundingClientRect().top <= vh * 0.42) active = secs[i].getAttribute('data-sec');
      if (active !== lastSec) {
        lastSec = active;
        var cur = null;
        navLinks.forEach(function (a) {
          var on = a.getAttribute('data-nav') === active;
          if (on) { a.setAttribute('aria-current', 'location'); if (a.closest('.sidebar')) cur = a; } else a.removeAttribute('aria-current');
        });
        place(marker, cur && cur.closest('[data-track]') ? cur : null);
        var g = /^s\d/.test(active) ? 'work' : active;
        groups.forEach(function (el) { if (el.getAttribute('data-navgroup') === g) el.setAttribute('aria-current', 'location'); else el.removeAttribute('aria-current'); });
        if (readout) {
          var gl = groups.filter(function (el) { return el.getAttribute('data-navgroup') === g; })[0];
          readout.textContent = cur && cur.closest('[data-track]') ? 'Selected Work  /  ' + cur.querySelector('.snav-num').textContent + ' ' + cur.lastElementChild.textContent.trim() : (gl ? gl.textContent.trim() : '');
        }
      }
    }
    if (chs.length) {
      var idx = 0;
      for (var k = 0; k < chs.length; k++) if (chs[k].getBoundingClientRect().top <= vh * 0.35) idx = k;
      if (idx !== lastCh) {
        lastCh = idx;
        var id = chs[idx].id, curL = null;
        chLinks.forEach(function (a) {
          var on = a.getAttribute('data-chnav') === id;
          if (on) { a.setAttribute('aria-current', 'location'); if (a.closest('.chap')) curL = a; } else a.removeAttribute('aria-current');
        });
        place(chMarker, curL);
        if (chBar) chBar.style.transform = 'scaleX(' + ((idx + 1) / chs.length).toFixed(3) + ')';
        if (chCount) chCount.textContent = 'Ch. ' + String(idx + 1).padStart(2, '0') + ' / ' + String(chs.length).padStart(2, '0');
        if (chTitle) chTitle.textContent = chs[idx].getAttribute('data-label');
      }
    }
  }
  var sraf = 0;
  window.addEventListener('scroll', function () { if (!sraf) sraf = requestAnimationFrame(function () { sraf = 0; onScroll(); }); }, { passive: true });
  window.addEventListener('resize', function () { lastSec = null; lastCh = -1; onScroll(); }, { passive: true });
  onScroll();

  /* ── Case study: mobile chapter bar ── */
  var cbBtn = $('.chapbar-btn'), cbList = $('#chap-list');
  if (cbBtn && cbList) {
    var setCb = function (open) { cbList.hidden = !open; cbBtn.setAttribute('aria-expanded', open ? 'true' : 'false'); var c = cbBtn.querySelector('[data-caret]'); if (c) c.textContent = open ? '▴' : '▾'; };
    cbBtn.addEventListener('click', function () { setCb(cbList.hidden); });
    cbList.addEventListener('click', function (e) { if (e.target.closest('a')) setCb(false); });
  }

  /* ── Case study: lightbox ── */
  var lb = $('.lb');
  if (lb && lb.showModal) {
    var figs = $$('[data-lb]'), li = 0;
    var lbImg = lb.querySelector('img'), lbCap = lb.querySelector('p'), lbFig = lb.querySelector('[data-lb-fig]'), lbCount = lb.querySelector('[data-lb-count]');
    var show = function (i) {
      li = (i + figs.length) % figs.length; var f = figs[li];
      lbImg.src = f.getAttribute('data-full'); lbImg.alt = f.getAttribute('data-alt') || '';
      lbCap.textContent = f.getAttribute('data-cap') || ''; lbFig.textContent = f.getAttribute('data-fig');
      lbCount.textContent = '· ' + (li + 1) + ' of ' + figs.length;
    };
    figs.forEach(function (b, i) { b.addEventListener('click', function () { show(i); lb.showModal(); }); });
    lb.querySelector('[data-lb-prev]').addEventListener('click', function () { show(li - 1); });
    lb.querySelector('[data-lb-next]').addEventListener('click', function () { show(li + 1); });
    lb.querySelector('[data-lb-close]').addEventListener('click', function () { lb.close(); });
    lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') show(li + 1); if (e.key === 'ArrowLeft') show(li - 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    lb.addEventListener('close', function () { var f = figs[li]; if (f) f.focus(); });
  }

  /* ── Inner pages: collapsible rail ── */
  var rail = $('.rail');
  if (rail) {
    var rBtn = rail.querySelector('.rail-btn'), panel = rail.querySelector('.rail-panel'), t = 0, pinned = false;
    var open = function (pin) {
      clearTimeout(t); pinned = pin || pinned; rail.classList.add('is-open'); rBtn.setAttribute('aria-expanded', 'true');
      if (pin) requestAnimationFrame(function () { var a = panel.querySelector('a[href]'); if (a) a.focus(); });
    };
    var close = function (focusBtn) { clearTimeout(t); pinned = false; rail.classList.remove('is-open'); rBtn.setAttribute('aria-expanded', 'false'); if (focusBtn) rBtn.focus(); };
    if (fine) {
      rail.addEventListener('mouseenter', function () { clearTimeout(t); if (!rail.classList.contains('is-open')) t = setTimeout(function () { open(false); }, 60); });
      rail.addEventListener('mouseleave', function () { clearTimeout(t); if (!pinned) t = setTimeout(function () { close(false); }, 150); });
    }
    rBtn.addEventListener('click', function () { if (rail.classList.contains('is-open') && pinned) close(false); else open(true); });
    rail.querySelector('.rail-close').addEventListener('click', function () { close(true); });
    rail.addEventListener('keydown', function (e) { if (e.key === 'Escape' && rail.classList.contains('is-open')) { e.stopPropagation(); close(true); } });
    d.addEventListener('mousedown', function (e) { if (rail.classList.contains('is-open') && !rail.contains(e.target)) close(false); });
  }
})();
