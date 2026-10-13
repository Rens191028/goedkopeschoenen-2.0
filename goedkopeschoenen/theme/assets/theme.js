/* GoedkopeSchoenen.com — thema-JS (vanilla, geen dependencies) */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.documentElement.classList.add('anim');
  if (reduced) document.documentElement.classList.remove('anim');

  /* ---------- Drawers ---------- */
  function openDrawer(id) { var d = document.getElementById(id); if (!d) return; d.classList.add('is-open'); d.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
  function closeDrawers() { $$('[data-drawer].is-open').forEach(function (d) { d.classList.remove('is-open'); d.setAttribute('aria-hidden', 'true'); }); document.body.style.overflow = ''; }
  document.addEventListener('click', function (e) {
    var o = e.target.closest('[data-drawer-open]');
    if (o) { e.preventDefault(); if (o.dataset.drawerOpen === 'cart-drawer') { if (window.location.pathname === window.theme.routes.cart) return; refreshCart().then(function () { openDrawer('cart-drawer'); }); } else openDrawer(o.dataset.drawerOpen); return; }
    if (e.target.closest('[data-drawer-close]')) closeDrawers();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeDrawers(); closeSearch(); } });

  /* ---------- Sticky header (krimpt bij scrollen) ---------- */
  var header = $('[data-header]');
  function onScroll() { if (header) header.classList.toggle('is-scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- Roterende topbalk (rustige fade, pauzeert bij reduced motion) ---------- */
  var ann = $$('[data-announcement] .announcement-item');
  if (ann.length > 1 && !reduced) {
    var ai = 0; setInterval(function () { ann[ai].classList.remove('is-active'); ai = (ai + 1) % ann.length; ann[ai].classList.add('is-active'); }, 6000);
  }

  /* ---------- Zoeken met live suggesties ---------- */
  var sPanel = $('[data-search-panel]'), sInput = $('[data-search-input]'), sOut = $('[data-search-results]'), sTimer;
  function closeSearch() { if (sPanel) sPanel.hidden = true; }
  var sToggle = $('[data-search-toggle]');
  if (sToggle && sPanel) sToggle.addEventListener('click', function () { sPanel.hidden = !sPanel.hidden; if (!sPanel.hidden) sInput.focus(); });
  if (sInput) sInput.addEventListener('input', function () {
    clearTimeout(sTimer); var q = sInput.value.trim();
    if (q.length < 2) { sOut.innerHTML = ''; return; }
    sTimer = setTimeout(function () {
      fetch(window.theme.routes.predictiveSearch + '?q=' + encodeURIComponent(q) + '&resources[type]=product&resources[limit]=5', { headers: { Accept: 'application/json' } })
        .then(function (r) { return r.json(); }).then(function (d) {
          var items = (d.resources && d.resources.results && d.resources.results.products) || [];
          sOut.innerHTML = items.length ? items.map(function (p) {
            return '<a class="search-hit" href="' + p.url + '">' + (p.image ? '<img src="' + p.image + '" alt="" loading="lazy">' : '') + '<span></span><em>' + p.price + '</em></a>';
          }).join('') : '<p class="muted small">Geen suggesties gevonden.</p>';
          $$('.search-hit span', sOut).forEach(function (el, i) { el.textContent = items[i].title; });
        }).catch(function () {});
    }, 220);
  });

  /* ---------- Winkelwagen ---------- */
  function formatMoney(cents) { return (cents / 100).toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' }); }
  function refreshCart() {
    return fetch(window.location.pathname + '?sections=cart-drawer').then(function (r) { return r.json(); }).then(function (s) {
      var html = new DOMParser().parseFromString(s['cart-drawer'], 'text/html');
      var body = $('[data-cart-drawer-body]'), fresh = $('[data-cart-drawer-body]', html);
      if (body && fresh) body.innerHTML = fresh.innerHTML;
      return fetch('/cart.js').then(function (r) { return r.json(); }).then(function (c) {
        var el = $('[data-cart-count]'); if (el) { el.textContent = c.item_count; el.hidden = c.item_count === 0; }
      });
    }).catch(function () {});
  }
  function refreshCartPage() {
    return fetch(window.location.pathname + '?sections=main-cart').catch(function () {}).then(function () { return window.location.reload(); });
  }
  function changeLine(line, quantity, row) {
    if (row && quantity === 0) row.classList.add('is-removing');
    var wait = row && quantity === 0 ? 250 : 0;
    return new Promise(function (res) { setTimeout(res, wait); }).then(function () {
      return fetch(window.theme.routes.cartChange + '.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ line: line, quantity: quantity }) });
    }).then(function () { return $('[data-cart-page-body]') ? refreshCartPage() : refreshCart(); });
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-line-change]'); if (!b) return;
    changeLine(parseInt(b.dataset.lineChange, 10), parseInt(b.dataset.quantity, 10), b.closest('.cart-line'));
  });
  function addToCart(form) {
    return fetch(window.theme.routes.cartAdd + '.js', { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) throw r; return r.json(); })
      .then(function () { return refreshCart(); }).then(function () { openDrawer('cart-drawer'); });
  }
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (f.matches('[data-quick-add], [data-product-form]')) {
      e.preventDefault(); var btn = $('button[type=submit]', f); if (btn) btn.disabled = true;
      addToCart(f).catch(function () { alert('Dit product kon niet worden toegevoegd. Probeer het opnieuw.'); }).then(function () { if (btn) btn.disabled = false; });
    }
  });

  /* ---------- Productpagina: varianten, galerij, aantal, kopieer-link ---------- */
  $$('[data-product-section]').forEach(function (sec) {
    var variants = JSON.parse($('[data-variants]', sec).textContent), form = $('[data-product-form]', sec);
    var idInput = $('[data-variant-id]', form), addBtn = $('[data-add-btn]', sec), addLabel = $('[data-add-label]', sec);
    function selected() { return $$('[data-option-index]:checked', sec).sort(function (a, b) { return a.dataset.optionIndex - b.dataset.optionIndex; }).map(function (i) { return i.value; }); }
    function match(vals) { return variants.filter(function (v) { return vals.every(function (val, i) { return v.options[i] === val; }); })[0]; }
    function markUnavailable() {
      var vals = selected();
      $$('.option-btn', sec).forEach(function (lab) {
        var inp = $('input', lab), idx = parseInt(inp.dataset.optionIndex, 10), test = vals.slice(); test[idx] = inp.value;
        var v = match(test); lab.classList.toggle('is-unavailable', !v || !v.available);
      });
    }
    function update() {
      var v = match(selected()); if (!v) { addBtn.disabled = true; addLabel.textContent = 'Niet beschikbaar'; return; }
      idInput.value = v.id; addBtn.disabled = !v.available; addLabel.textContent = v.available ? 'Aan winkelwagen toevoegen' : 'Uitverkocht';
      var pw = $('[data-price-wrap]', sec), onSale = v.compare_at_price && v.compare_at_price > v.price;
      pw.innerHTML = '<div class="price-row">' + (onSale ? '<s class="price-was">' + formatMoney(v.compare_at_price) + '</s><span class="price-now">' + formatMoney(v.price) + '</span>' : '<span class="price-plain">' + formatMoney(v.price) + '</span>') + '</div>';
      var sku = $('[data-sku]', sec); if (sku) sku.textContent = v.sku || '';
      $$('[data-option-label]', sec).forEach(function (l) { l.textContent = v.options[l.dataset.optionLabel]; });
      if (v.featured_media) { var i = (v.featured_media.position || 1) - 1; showSlide(i); }
      markUnavailable();
      if (window.history.replaceState) window.history.replaceState({}, '', sec.dataset.productUrl + '?variant=' + v.id);
    }
    $$('[data-option-index]', sec).forEach(function (i) { i.addEventListener('change', update); }); markUnavailable();
    function showSlide(n) { $$('[data-slide]', sec).forEach(function (s) { s.classList.toggle('is-active', +s.dataset.slide === n); }); $$('[data-thumb]', sec).forEach(function (t) { t.classList.toggle('is-active', +t.dataset.thumb === n); }); }
    $$('[data-thumb]', sec).forEach(function (t) { t.addEventListener('click', function () { showSlide(+t.dataset.thumb); }); });
    var qi = $('[data-qty-input] input', sec);
    $('[data-qty-minus]', sec).addEventListener('click', function () { qi.value = Math.max(1, +qi.value - 1); });
    $('[data-qty-plus]', sec).addEventListener('click', function () { qi.value = +qi.value + 1; });
    var cp = $('[data-copy-link]', sec); if (cp) cp.addEventListener('click', function () { if (navigator.clipboard) navigator.clipboard.writeText(cp.dataset.copyLink); cp.textContent = 'Link gekopieerd ✓'; });
  });

  /* ---------- Gerelateerde producten (Shopify recommendations) ---------- */
  $$('[data-recommendations]').forEach(function (el) {
    if (el.children.length) return;
    fetch(el.dataset.url).then(function (r) { return r.text(); }).then(function (t) {
      var fresh = new DOMParser().parseFromString(t, 'text/html').querySelector('[data-recommendations]');
      if (fresh && fresh.innerHTML.trim()) { el.innerHTML = fresh.innerHTML; observeReveal(); }
    }).catch(function () {});
  });

  /* ---------- Collectiefilters: direct toepassen ---------- */
  $$('[data-auto-submit]').forEach(function (f) { f.addEventListener('change', function () { f.submit(); }); });

  /* ---------- Scroll-reveal ---------- */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }) : null;
  function observeReveal() { $$('.reveal:not(.is-visible)').forEach(function (el) { if (io) io.observe(el); else el.classList.add('is-visible'); }); }
  observeReveal();

  /* ---------- 3D-tilt (hero + productafbeelding) ---------- */
  if (!reduced && window.matchMedia('(hover: hover)').matches) {
    $$('[data-tilt]').forEach(function (wrap) {
      var max = parseFloat(wrap.dataset.tiltMax) || 18, target = $$('[data-tilt-target]', wrap), floats = $$('[data-tilt-float]', wrap);
      function active() { return $('[data-tilt-target].is-active', wrap) || target[0]; }
      wrap.addEventListener('mousemove', function (e) {
        var r = wrap.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        var t = active(); if (t) t.style.transform = 'perspective(900px) rotateY(' + (x * max * 2) + 'deg) rotateX(' + (-y * max * 2) + 'deg) scale(1.02)';
        floats.forEach(function (f) { var k = f.dataset.tiltFloat === '1' ? 14 : -14; f.style.translate = (x * k) + 'px ' + (y * k) + 'px'; });
      });
      wrap.addEventListener('mouseleave', function () { target.forEach(function (t) { t.style.transform = ''; }); floats.forEach(function (f) { f.style.translate = ''; }); });
    });
  }
})();
