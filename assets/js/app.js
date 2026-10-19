/* ============================================================
   THE SKIN ATLAS — app
   index rendering · stage preview · hash router · curtain
   ============================================================ */
(function () {
  const A = window.ATLAS;
  const ART = window.ART;
  const brands = A.brands;
  const byId = Object.fromEntries(brands.map((b) => [b.id, b]));
  const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const baseTitle = document.title;

  const LAYOUT = {
    lancome: 'editorial',
    'helena-rubinstein': 'couture',
    kiehls: 'apothecary',
    'la-roche-posay': 'clinical',
    vichy: 'clinical',
    cerave: 'soft',
    skinceuticals: 'lab',
    aesop: 'literary',
    biotherm: 'aquatic',
    'ysl-beauty': 'couture',
    'loreal-paris': 'bold',
    'yue-sai': 'oriental',
    takami: 'minimal',
    carita: 'atelier'
  };

  const VESSEL_BRAND = {
    'helena-rubinstein': 'HR',
    'la-roche-posay': 'LA ROCHE-POSAY'
  };
  const vBrand = (b) => VESSEL_BRAND[b.id] || b.en;

  const ROW_FONT = {
    lancome: "'Cormorant Garamond', serif",
    'helena-rubinstein': "'Cormorant Garamond', serif",
    kiehls: "'Libre Baskerville', serif",
    'la-roche-posay': "'Archivo', sans-serif",
    vichy: "'Archivo', sans-serif",
    cerave: "'Archivo', sans-serif",
    skinceuticals: "'IBM Plex Sans', sans-serif",
    aesop: "'Sorts Mill Goudy', serif",
    biotherm: "'Archivo', sans-serif",
    'ysl-beauty': "'Bodoni Moda', serif",
    'loreal-paris': "'Archivo Black', sans-serif",
    'yue-sai': "'Cormorant Garamond', serif",
    takami: "'IBM Plex Sans', sans-serif",
    carita: "'Bodoni Moda', serif"
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const wait = (ms) => new Promise((r) => setTimeout(r, REDUCE ? Math.min(ms, 40) : ms));

  /* ── atlas copy ─────────────────────────────────────── */
  const heroIntro = $('#heroIntro');
  const heroMeta = $('#heroMeta');
  const aboutStatement = $('#aboutStatement');
  const aboutNote = $('#aboutNote');
  const heroWatermark = $('#heroWatermark');
  if (heroWatermark) heroWatermark.innerHTML = ART.emblem('rose');
  if (heroIntro) heroIntro.textContent = A.intro;
  if (heroMeta) heroMeta.innerHTML = A.meta.map((m) => `<li>${m}</li>`).join('');
  if (aboutStatement) aboutStatement.innerHTML = A.statement;
  if (aboutNote) aboutNote.textContent = A.note;

  /* ── marquee ────────────────────────────────────────── */
  const mq = $('#heroMarquee');
  if (mq) {
    const items = brands.map((b) => `<span class="mq-item">${b.en}</span>`).join('');
    mq.innerHTML = items + items;
  }

  /* ── rows ───────────────────────────────────────────── */
  const rowsEl = $('#rows');
  if (rowsEl) {
    rowsEl.innerHTML = brands
      .map(
        (b) => `
      <li>
        <a class="row" href="#/${b.id}" data-brand-link="${b.id}" data-brand="${b.id}"
           style="--rb:${b.colors.accent};--rf:${ROW_FONT[b.id]}">
          <span class="row-no">${b.no}</span>
          <span class="row-emblem" aria-hidden="true">${ART.emblem(b.emblem)}</span>
          <span class="row-name-wrap">
            <span class="row-name">${b.en}</span>
            <span class="row-cn">${b.cn}</span>
          </span>
          <span class="row-cat">${b.category}</span>
          <span class="row-year">${b.origin} ${b.year}</span>
          <span class="row-arrow" aria-hidden="true">↗</span>
        </a>
      </li>`
      )
      .join('');
  }

  /* ── stage preview ──────────────────────────────────── */
  const stage = $('#stage');
  const stageInner = $('#stageInner');
  const stageArt = $('#stageArt');
  const stageEmblem = $('#stageEmblem');
  const stageWordmark = $('#stageWordmark');
  const stageCn = $('#stageCn');
  const stageCat = $('#stageCat');
  const stageTagline = $('#stageTagline');
  const stageMeta = $('#stageMeta');
  const stageNo = $('#stageNo');
  const stageVessels = $('#stageVessels');

  function paintStage(b) {
    stage.setAttribute('data-brand', b.id);
    stageArt.className = 'stage-art motif-' + b.motif;
    stageNo.textContent = b.no;
    stageCat.textContent = b.category;
    stageEmblem.innerHTML = ART.emblem(b.emblem);
    stageWordmark.textContent = b.en;
    stageCn.textContent = b.cn;
    stageTagline.textContent = b.tagline;
    stageMeta.textContent = b.origin + ' · ' + b.year;
    stageVessels.innerHTML = b.products
      .slice(0, 3)
      .map((p) => ART.vessel(p.kind, p.palette, { brand: vBrand(b), product: p.en, alt: '' }))
      .join('');
  }

  let stageTimer = null;
  let activeBrand = brands[0].id;

  function setStage(b, immediate) {
    if (!stage || b.id === activeBrand) return;
    activeBrand = b.id;
    document.querySelectorAll('.row.is-active').forEach((r) => r.classList.remove('is-active'));
    const row = document.querySelector(`.row[data-brand-link="${b.id}"]`);
    if (row) row.classList.add('is-active');

    if (immediate || REDUCE) {
      paintStage(b);
      return;
    }
    clearTimeout(stageTimer);
    stageInner.classList.add('is-out');
    stageTimer = setTimeout(() => {
      paintStage(b);
      requestAnimationFrame(() => stageInner.classList.remove('is-out'));
    }, 180);
  }

  if (stage) {
    const stageTotal = document.querySelector('.stage-total');
    if (stageTotal) stageTotal.textContent = brands.length;
    paintStage(brands[0]);
    stageInner.classList.remove('is-out');
    document.querySelector('.row.is-active')?.classList.remove('is-active');

    document.querySelectorAll('.row').forEach((row) => {
      const b = byId[row.dataset.brandLink];
      row.addEventListener('mouseenter', () => setStage(b));
      row.addEventListener('focus', () => setStage(b));
      row.addEventListener('click', () => setStage(b, true));
    });
    // reset to the first maison when the pointer leaves the list
    rowsEl.addEventListener('mouseleave', () => {
      const first = document.querySelector('.row');
      if (first) setStage(brands[0]);
    });
  }

  /* ── reveal observer ────────────────────────────────── */
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.06, rootMargin: '0px 0px -6% 0px' }
      )
    : null;

  function observeReveals(root) {
    const els = root.querySelectorAll('[data-reveal]:not(.in)');
    if (!io) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    els.forEach((el) => io.observe(el));
  }
  observeReveals(document);

  /* ── top bar state ──────────────────────────────────── */
  const topbar = $('.topbar');
  const onScroll = () => {
    if (!topbar) return;
    topbar.classList.toggle('is-stuck', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── curtain ────────────────────────────────────────── */
  const curtain = $('#curtain');
  const curtainEmblem = $('#curtainEmblem');
  const curtainWord = $('#curtainWord');

  function openCurtain(b, x, y) {
    if (!curtain) return;
    curtain.style.setProperty('--curtain-bg', b.colors.bg);
    curtain.style.setProperty('--curtain-ink', b.colors.ink);
    curtain.style.setProperty('--curtain-accent', b.colors.accent);
    curtain.style.setProperty('--cx', (x ?? innerWidth / 2) + 'px');
    curtain.style.setProperty('--cy', (y ?? innerHeight / 3) + 'px');
    curtainEmblem.innerHTML = ART.emblem(b.emblem);
    curtainWord.textContent = b.en;
    curtain.style.visibility = 'visible';
    curtain.style.opacity = '1';
    curtain.style.clipPath = `circle(0% at ${x ?? innerWidth / 2}px ${y ?? innerHeight / 3}px)`;
    void curtain.offsetWidth;
    curtain.style.clipPath = `circle(160vmax at ${x ?? innerWidth / 2}px ${y ?? innerHeight / 3}px)`;
  }

  function closeCurtain() {
    if (!curtain) return;
    curtain.style.opacity = '0';
    setTimeout(() => {
      curtain.style.visibility = 'hidden';
      curtain.style.clipPath = 'circle(0% at 50% 50%)';
    }, REDUCE ? 60 : 480);
  }

  /* ── brand page ─────────────────────────────────────── */
  const brandRoot = $('#brandRoot');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  let current = null;
  let atlasScroll = 0;
  let busy = false;

  function brandHTML(b) {
    const nextBrand = brands[(brands.indexOf(b) + 1) % brands.length];
    return `
    <article class="brand" data-brand="${b.id}" data-layout="${LAYOUT[b.id]}" tabindex="-1">
      <nav class="b-nav" aria-label="品牌导航">
        <a class="b-nav-back" href="#/" data-back aria-label="返回品牌索引"><span>品牌索引</span></a>
        <div class="b-nav-mark">${b.en}</div>
        <a class="b-nav-next" href="#/${nextBrand.id}" data-brand-link="${nextBrand.id}" aria-label="下一间：${nextBrand.cn}"><span>${nextBrand.cn}</span></a>
      </nav>

      <header class="b-hero">
        <div class="b-hero-art art-${b.campaign.art}" aria-hidden="true"></div>
        <div class="b-hero-grid">
          <div class="b-hero-main">
            <p class="b-eyebrow">
              <span class="b-no">${b.no}</span><span class="b-slash"></span>
              <span>${b.category}</span><span class="b-slash"></span>
              <span>${b.origin} · ${b.year}</span>
            </p>
            <div class="b-ident">
              <h1 class="b-mark">${b.en}</h1>
              <p class="b-cn">${b.cn}</p>
            </div>
            <p class="b-position">${b.tagline}</p>
            <p class="b-intro">${b.intro}</p>
            <a class="b-cta" href="#products-${b.id}" data-anchor>浏览产品 <i>↓</i></a>
          </div>
          <aside class="b-hero-aside">
            <div class="b-hero-emblem" aria-hidden="true">${ART.emblem(b.emblem)}</div>
            <dl class="b-facts">
              ${b.facts.map((f) => `<div><dt>${f.k}</dt><dd>${f.v}</dd></div>`).join('')}
            </dl>
          </aside>
        </div>
        <div class="b-hero-foot">
          <span>MAISON ${b.no} / ${brands.length}</span><span class="b-line"></span><span>SCROLL TO EXPLORE</span>
        </div>
      </header>

      <section class="b-manifesto" data-reveal>
        <div class="b-mani-mark" aria-hidden="true">${ART.emblem(b.emblem)}</div>
        <blockquote>
          ${b.manifesto}
          <cite>${b.quoteBy}</cite>
        </blockquote>
      </section>

      <section class="b-section b-products" id="products-${b.id}">
        <div class="b-section-head" data-reveal>
          <h2>产品 <em>The Collection</em></h2>
          <p>代表性三件 · 价格为参考零售价</p>
        </div>
        <div class="p-grid">
          ${b.products
            .map(
              (p, i) => `
            <article class="p-card" data-reveal style="--d:${i * 0.09}s">
              <span class="p-no">0${i + 1}</span>
              <div class="p-visual">${ART.vessel(p.kind, p.palette, {
                brand: vBrand(b),
                product: p.en,
                alt: `${b.cn} ${p.cn} 产品示意`
              })}</div>
              <div class="p-body">
                <h3 class="p-cn">${p.cn}</h3>
                <p class="p-en">${p.en}</p>
                <p class="p-desc">${p.desc}</p>
                <div class="p-foot">
                  <span class="p-price">${p.price}</span>
                  <span class="p-size">${p.size}</span>
                </div>
              </div>
            </article>`
            )
            .join('')}
        </div>
      </section>

      <section class="b-section b-campaign">
        <div class="c-art art-${b.campaign.art}" data-reveal>
          <div class="c-frame" aria-hidden="true"></div>
          <div class="c-emblem" aria-hidden="true">${ART.emblem(b.emblem)}</div>
          <span class="c-year">${b.year} — Campaign</span>
        </div>
        <div class="c-copy" data-reveal style="--d:.12s">
          <p class="c-kicker">${b.campaign.kicker}</p>
          <h2 class="c-title">${b.campaign.title}</h2>
          <p class="c-sub">${b.campaign.sub}</p>
          <p class="c-body">${b.campaign.body}</p>
          <div class="c-meta">
            ${b.campaign.meta.map((m) => `<span>${m}</span>`).join('')}
          </div>
        </div>
      </section>

      <a class="b-next" href="#/${nextBrand.id}" data-brand-link="${nextBrand.id}">
        <span class="b-next-label">Next Maison · 下一间护肤屋</span>
        <span class="b-next-mark">${nextBrand.en}<i>↗</i></span>
        <span class="b-next-cn">${nextBrand.cn} — ${nextBrand.category}</span>
      </a>

      <footer class="b-colophon">
        <p>${A.note}</p>
        <a href="#/" data-back>回到品牌索引 ↑</a>
      </footer>
    </article>`;
  }

  function renderBrand(b) {
    brandRoot.innerHTML = brandHTML(b);
    document.body.dataset.view = 'brand';
    document.body.style.background = b.colors.bg;
    document.title = `${b.en} ${b.cn} · 肌肤图谱`;
    if (themeMeta) themeMeta.setAttribute('content', b.colors.bg);
    window.scrollTo(0, 0);
    current = b.id;
    observeReveals(brandRoot);
    brandRoot.querySelector('.brand')?.focus({ preventScroll: true });
  }

  function showBrandInstant(b) {
    renderBrand(b);
    if (curtain) curtain.style.visibility = 'hidden';
  }

  async function openBrand(slug, x, y) {
    const b = byId[slug];
    if (!b || busy || current === slug) return;
    busy = true;
    if (document.body.dataset.view === 'atlas') atlasScroll = window.scrollY;
    openCurtain(b, x, y);
    await wait(600);
    renderBrand(b);
    closeCurtain();
    busy = false;
  }

  async function goHome() {
    if (busy) return;
    if (document.body.dataset.view !== 'brand') return;
    busy = true;
    const b = byId[current] || brands[0];
    openCurtain(b, innerWidth / 2, 70);
    await wait(560);
    document.body.dataset.view = 'atlas';
    brandRoot.innerHTML = '';
    document.title = baseTitle;
    if (themeMeta) themeMeta.setAttribute('content', '#0b0a09');
    document.body.style.background = '#0b0a09';
    window.scrollTo(0, atlasScroll);
    closeCurtain();
    current = null;
    busy = false;
  }

  /* ── router ─────────────────────────────────────────── */
  function slugFromHash() {
    const h = location.hash.replace(/^#\/?/, '').replace(/\/$/, '');
    if (!h || h.startsWith('atlas-') || h === 'top') return null;
    return byId[h] ? h : null;
  }

  let pendingOrigin = null;

  function sync() {
    const slug = slugFromHash();
    if (slug) {
      openBrand(slug, pendingOrigin?.x, pendingOrigin?.y);
    } else if (document.body.dataset.view === 'brand') {
      goHome();
    }
    pendingOrigin = null;
  }

  window.addEventListener('hashchange', sync);

  /* brand links: keep hash history, remember the click origin */
  document.addEventListener('click', (e) => {
    const brandLink = e.target.closest('[data-brand-link]');
    if (brandLink) {
      e.preventDefault();
      if (busy) return;
      pendingOrigin = { x: e.clientX, y: e.clientY };
      const slug = brandLink.dataset.brandLink || brandLink.getAttribute('href').replace('#/', '');
      if (location.hash === '#/' + slug) sync();
      else location.hash = '#/' + slug;
      return;
    }
    const back = e.target.closest('[data-back]');
    if (back) {
      e.preventDefault();
      if (location.hash === '#/' || location.hash === '') goHome();
      else location.hash = '#/';
      return;
    }
    const home = e.target.closest('[data-home]');
    if (home && document.body.dataset.view === 'brand') {
      e.preventDefault();
      location.hash = '#/';
      return;
    }
    const anchor = e.target.closest('[data-anchor]');
    if (anchor) {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: REDUCE ? 'auto' : 'smooth', block: 'start' });
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.dataset.view === 'brand') {
      e.preventDefault();
      location.hash = '#/';
    }
  });

  /* initial route — deep links render immediately, no atlas flash */
  const initial = slugFromHash();
  if (initial) showBrandInstant(byId[initial]);
  else sync();
  document.documentElement.style.visibility = '';
})();
