/* ============================================================
   ART — hand-drawn emblems + product vessels (pure SVG)
   ============================================================ */
(function () {
  const W = (s) => s.replace(/\s+/g, ' ');

  /* ── emblems ──────────────────────────────────────────────
     every emblem draws with currentColor so the brand theme
     can recolor it. 120 × 120 canvas, hairline strokes.      */
  const emblems = {
    rose: `
      <circle cx="60" cy="60" r="47" opacity=".28"/>
      <circle cx="60" cy="60" r="38" opacity=".18"/>
      <path d="M60 16 C86 28 94 56 78 73 C64 87 40 84 33 65 C27 49 40 34 56 38 C70 42 73 59 62 66 C54 71 45 65 46 56" />
      <path d="M60 16 C52 24 48 34 50 43" opacity=".5"/>
      <path d="M96 88 C88 94 78 98 68 99" opacity=".4"/>
      <circle cx="60" cy="60" r="3.2" fill="currentColor" stroke="none"/>
    `,
    deco: `
      <path d="M60 5 L115 60 L60 115 L5 60 Z"/>
      <path d="M60 19 L101 60 L60 101 L19 60 Z" opacity=".55"/>
      <path d="M60 32 L88 60 L60 88 L32 60 Z" opacity=".3"/>
      <text x="60" y="69" text-anchor="middle" font-family="'Cormorant Garamond',serif" font-size="27" font-weight="500" letter-spacing="1.5" fill="currentColor" stroke="none">HR</text>
      <path d="M60 5 V-2 M60 115 V122" opacity=".5"/>
    `,
    mortar: `
      <ellipse cx="60" cy="55" rx="33" ry="7"/>
      <path d="M27 55 C27 78 41 94 60 94 C79 94 93 78 93 55"/>
      <path d="M60 94 V101 M48 105 H72" opacity=".55"/>
      <path d="M79 48 L98 20" stroke-width="4" stroke-linecap="round"/>
      <circle cx="101" cy="17" r="6"/>
      <path d="M60 62 V80 M51 71 H69" opacity=".65"/>
      <text x="60" y="115" text-anchor="middle" font-family="'Courier Prime',monospace" font-size="10" letter-spacing="3" fill="currentColor" stroke="none">1851</text>
    `,
    cross: `
      <circle cx="60" cy="60" r="47"/>
      <circle cx="60" cy="60" r="38" opacity=".22"/>
      <path d="M60 39 V81 M39 60 H81" stroke-width="9" stroke-linecap="round"/>
      <path d="M28 99 C34 95 40 103 46 99" opacity=".55"/>
      <path d="M74 99 C80 95 86 103 92 99" opacity=".55"/>
    `,
    volcano: `
      <path d="M8 92 L40 34 L57 63 L72 44 L112 92 Z"/>
      <path d="M8 92 H112" opacity=".6"/>
      <path d="M20 104 C28 99 36 109 44 104 C52 99 60 109 68 104 C76 99 84 109 92 104" opacity=".55"/>
      <path d="M20 113 C28 108 36 118 44 113 C52 108 60 118 68 113 C76 108 84 118 92 113" opacity=".3"/>
      <circle cx="60" cy="24" r="7" opacity=".85"/>
      <path d="M60 12 V17 M60 31 V36" opacity=".5"/>
    `,
    hex: `
      <path d="M60 8 L98 30 L98 74 L60 96 L22 74 L22 30 Z"/>
      <path d="M60 26 L82 39 L82 65 L60 78 L38 65 L38 39 Z" opacity=".35"/>
      <circle cx="60" cy="52" r="9"/>
      <circle cx="60" cy="52" r="3" fill="currentColor" stroke="none"/>
      <path d="M60 96 V110 M22 74 L10 81 M98 74 L110 81" opacity=".45"/>
    `,
    molecule: `
      <path d="M60 22 L88 38 V70 L60 86 L32 70 V38 Z"/>
      <path d="M60 36 L76 45 V63 L60 72 L44 63 V45 Z" opacity=".3"/>
      <circle cx="60" cy="22" r="4.5" fill="currentColor" stroke="none"/>
      <circle cx="88" cy="38" r="4.5" fill="currentColor" stroke="none"/>
      <circle cx="88" cy="70" r="4.5" fill="currentColor" stroke="none"/>
      <circle cx="60" cy="86" r="4.5" fill="currentColor" stroke="none"/>
      <circle cx="32" cy="70" r="4.5" fill="currentColor" stroke="none"/>
      <circle cx="32" cy="38" r="4.5" fill="currentColor" stroke="none"/>
      <path d="M60 22 V8 M88 70 L104 80 M32 38 L16 28" opacity=".4"/>
    `,
    sprig: `
      <path d="M60 112 C60 88 58 62 62 30"/>
      <path d="M60 92 C44 88 34 76 33 62 C48 62 58 72 60 88" />
      <path d="M61 74 C77 70 87 58 88 44 C73 44 63 54 61 70" />
      <path d="M61 56 C48 52 41 43 40 32 C52 32 60 40 61 52" />
      <path d="M61 38 C72 34 78 26 79 18 C68 18 62 25 61 34" />
      <circle cx="62" cy="27" r="4" fill="currentColor" stroke="none" opacity=".8"/>
      <path d="M26 116 H96" opacity=".3"/>
    `,
    plankton: `
      <circle cx="60" cy="60" r="46" opacity=".25"/>
      <path d="M60 24 C82 24 96 42 96 62 C96 80 82 94 64 94 C50 94 40 84 40 72 C40 62 48 54 58 54 C66 54 72 60 72 68 C72 73 68 77 63 77" />
      <circle cx="60" cy="94" r="3" fill="currentColor" stroke="none" opacity=".6"/>
      <circle cx="96" cy="52" r="3" fill="currentColor" stroke="none" opacity=".6"/>
      <circle cx="30" cy="36" r="2.2" fill="currentColor" stroke="none" opacity=".5"/>
      <circle cx="84" cy="20" r="2.2" fill="currentColor" stroke="none" opacity=".5"/>
    `,
    cassandre: `
      <rect x="14" y="14" width="92" height="92" opacity=".45"/>
      <path d="M34 30 H46 L46 78 C46 84 42 90 34 92 Z" />
      <path d="M52 30 H64 L64 78 C64 84 60 90 52 92 Z" opacity=".55"/>
      <path d="M70 30 H82 L82 78 C82 84 78 90 70 92 Z" opacity=".3"/>
      <path d="M34 30 L40 24 L46 30" opacity=".7"/>
      <path d="M52 30 L58 24 L64 30" opacity=".5"/>
      <path d="M70 30 L76 24 L82 30" opacity=".35"/>
    `,
    mark: `
      <circle cx="60" cy="60" r="47" opacity=".3"/>
      <circle cx="60" cy="60" r="40"/>
      <text x="60" y="72" text-anchor="middle" font-family="'Cormorant Garamond',serif" font-size="40" font-weight="500" fill="currentColor" stroke="none">L</text>
      <path d="M46 84 H74" opacity=".6"/>
      <text x="60" y="96" text-anchor="middle" font-family="'Archivo',sans-serif" font-size="7" letter-spacing="2.4" fill="currentColor" stroke="none">PARIS</text>
    `,
    seal: `
      <rect x="16" y="16" width="88" height="88" rx="6"/>
      <rect x="24" y="24" width="72" height="72" rx="2" opacity=".3"/>
      <text x="60" y="56" text-anchor="middle" font-family="'Noto Serif SC',serif" font-size="26" font-weight="600" fill="currentColor" stroke="none">羽</text>
      <text x="60" y="84" text-anchor="middle" font-family="'Noto Serif SC',serif" font-size="26" font-weight="600" fill="currentColor" stroke="none">西</text>
      <path d="M32 92 H88" opacity=".45"/>
    `
  };

  function emblem(key) {
    const body = emblems[key] || emblems.mark;
    return `<svg class="emblem-svg" viewBox="-6 -6 132 132" fill="none" stroke="currentColor"
      stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true" focusable="false">${W(body)}</svg>`;
  }

  /* ── vessels ─────────────────────────────────────────────
     200 × 320 canvas. palette = {body, cap, label, labelInk, liquid}
     Every bottle is built from gradients + a couple of highlights. */
  const shade = (hex, amt) => {
    const n = hex.replace('#', '');
    const num = parseInt(n.length === 3 ? n.split('').map((c) => c + c).join('') : n, 16);
    let r = (num >> 16) & 255, g = (num >> 8) & 255, b = num & 255;
    r = Math.max(0, Math.min(255, Math.round(r + amt)));
    g = Math.max(0, Math.min(255, Math.round(g + amt)));
    b = Math.max(0, Math.min(255, Math.round(b + amt)));
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
  };

  function vessel(kind, p, opts = {}) {
    const uid = 'v' + Math.random().toString(36).slice(2, 8);
    const body = p.body || '#ddd';
    const cap = p.cap || '#111';
    const label = p.label || '#fff';
    const ink = p.labelInk || '#111';
    const liquid = p.liquid || body;
    const brand = (opts.brand || '').toUpperCase();
    const productFull = (opts.product || '').toUpperCase();
    // keep the label legible: long names collapse to their first word
    const product = productFull.length > 13 ? productFull.split(' ')[0].slice(0, 13) : productFull;
    const productLabel = product.length > 10 ? product.slice(0, 10) : product;
    const shortCap = brand.length > 15 ? brand.slice(0, 15) : brand;

    const defs = `
      <defs>
        <linearGradient id="${uid}-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="${shade(body, -26)}"/>
          <stop offset=".18" stop-color="${shade(body, 18)}"/>
          <stop offset=".42" stop-color="${body}"/>
          <stop offset=".78" stop-color="${shade(body, -18)}"/>
          <stop offset="1" stop-color="${shade(body, -34)}"/>
        </linearGradient>
        <linearGradient id="${uid}-cap" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="${shade(cap, -18)}"/>
          <stop offset=".3" stop-color="${shade(cap, 26)}"/>
          <stop offset=".62" stop-color="${cap}"/>
          <stop offset="1" stop-color="${shade(cap, -30)}"/>
        </linearGradient>
        <linearGradient id="${uid}-label" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${shade(label, 6)}"/>
          <stop offset="1" stop-color="${shade(label, -10)}"/>
        </linearGradient>
        <linearGradient id="${uid}-liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${shade(liquid, 22)}" stop-opacity=".9"/>
          <stop offset="1" stop-color="${shade(liquid, -16)}" stop-opacity=".95"/>
        </linearGradient>
        <linearGradient id="${uid}-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fff" stop-opacity=".55"/>
          <stop offset="1" stop-color="#fff" stop-opacity="0"/>
        </linearGradient>
      </defs>`;

    const shadow = `<ellipse cx="100" cy="300" rx="58" ry="7" fill="#000" opacity=".13"/>`;
    const labelBlock = (x, y, w, h) => {
      // fit the wordmark + product name inside the label, whatever its width
      const bSize = Math.max(4.2, Math.min(7.2, (w - 12) / (shortCap.length * 0.8)));
      const bTrack = bSize > 6 ? 1.2 : 0.4;
      const pSize = Math.max(4.6, Math.min(9.2, (w - 10) / (productLabel.length * 0.72)));
      return `
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="url(#${uid}-label)"/>
      <text x="${x + w / 2}" y="${y + 16}" text-anchor="middle" font-family="'Archivo',sans-serif"
        font-size="${bSize.toFixed(2)}" letter-spacing="${bTrack}" fill="${ink}" opacity=".9">${shortCap}</text>
      <path d="M${x + 9} ${y + 23} H${x + w - 9}" stroke="${ink}" opacity=".35" stroke-width=".7"/>
      <text x="${x + w / 2}" y="${y + h - 12}" text-anchor="middle" font-family="'Cormorant Garamond',serif"
        font-size="${pSize.toFixed(2)}" letter-spacing=".4" fill="${ink}" opacity=".8">${productLabel}</text>`;
    };

    // tight viewBoxes keep short vessels (jars, tubs) from looking tiny
    const VB = {
      dropper: '54 12 92 300',
      pump: '56 40 88 265',
      tube: '56 80 88 230',
      jar: '24 120 152 196',
      tub: '16 132 168 180',
      flacon: '52 56 96 250',
      mist: '62 62 76 240'
    };
    const viewBox = VB[kind] || '0 0 200 320';

    let art = '';

    if (kind === 'dropper') {
      art = `
        <rect x="62" y="112" width="76" height="180" rx="15" fill="url(#${uid}-body)"/>
        <rect x="62" y="112" width="76" height="180" rx="15" fill="url(#${uid}-liquid)" opacity=".55"/>
        <rect x="82" y="96" width="36" height="20" rx="3" fill="url(#${uid}-body)"/>
        <rect x="76" y="86" width="48" height="12" rx="4" fill="url(#${uid}-cap)"/>
        <rect x="84" y="44" width="32" height="44" rx="6" fill="url(#${uid}-cap)"/>
        <rect x="88" y="30" width="24" height="16" rx="8" fill="url(#${uid}-cap)"/>
        <rect x="96" y="20" width="8" height="12" rx="4" fill="${shade(cap, -10)}"/>
        <rect x="70" y="128" width="10" height="146" rx="5" fill="url(#${uid}-gloss)" opacity=".5"/>
        <rect x="118" y="128" width="4" height="146" rx="2" fill="#000" opacity=".08"/>
        ${labelBlock(70, 172, 60, 82)}
        <path d="M88 262 H112" stroke="${ink}" opacity=".28" stroke-width=".8"/>`;
    } else if (kind === 'pump') {
      art = `
        <rect x="64" y="108" width="72" height="184" rx="11" fill="url(#${uid}-body)"/>
        <rect x="64" y="108" width="72" height="184" rx="11" fill="url(#${uid}-liquid)" opacity=".5"/>
        <rect x="72" y="94" width="56" height="20" rx="4" fill="url(#${uid}-cap)"/>
        <rect x="84" y="56" width="32" height="42" rx="5" fill="url(#${uid}-cap)"/>
        <rect x="84" y="48" width="52" height="11" rx="5.5" fill="url(#${uid}-cap)"/>
        <rect x="116" y="50" width="26" height="7" rx="3.5" fill="${shade(cap, -18)}"/>
        <rect x="72" y="122" width="9" height="156" rx="4.5" fill="url(#${uid}-gloss)" opacity=".5"/>
        ${labelBlock(74, 170, 52, 84)}
        <rect x="74" y="266" width="52" height="2" fill="${ink}" opacity=".22"/>`;
    } else if (kind === 'tube') {
      art = `
        <path d="M64 262 C64 262 62 118 70 96 H130 C138 118 136 262 136 262 Z" fill="url(#${uid}-body)"/>
        <path d="M64 262 C64 262 62 118 70 96 H130 C138 118 136 262 136 262 Z" fill="url(#${uid}-liquid)" opacity=".28"/>
        <path d="M70 96 H130 L128 88 H72 Z" fill="${shade(body, -30)}"/>
        <rect x="66" y="262" width="68" height="22" rx="5" fill="url(#${uid}-cap)"/>
        <rect x="78" y="284" width="44" height="8" rx="4" fill="${shade(cap, -14)}"/>
        <rect x="72" y="112" width="8" height="142" rx="4" fill="url(#${uid}-gloss)" opacity=".6"/>
        ${labelBlock(76, 152, 48, 90)}
        <text x="100" y="232" text-anchor="middle" font-family="'Archivo',sans-serif" font-size="6.5"
          letter-spacing="2" fill="${ink}" opacity=".55">${product.length > 18 ? product.slice(0, 18) : product}</text>`;
    } else if (kind === 'jar') {
      art = `
        <rect x="48" y="168" width="104" height="112" rx="18" fill="url(#${uid}-body)"/>
        <rect x="44" y="138" width="112" height="38" rx="9" fill="url(#${uid}-cap)"/>
        <rect x="50" y="142" width="100" height="5" rx="2.5" fill="#fff" opacity=".28"/>
        <rect x="56" y="182" width="12" height="82" rx="6" fill="url(#${uid}-gloss)" opacity=".5"/>
        ${labelBlock(58, 196, 84, 58)}
        <path d="M44 176 H156" stroke="${shade(body, -36)}" opacity=".5"/>`;
    } else if (kind === 'tub') {
      art = `
        <ellipse cx="100" cy="176" rx="60" ry="16" fill="${shade(body, -22)}"/>
        <path d="M40 176 V272 C40 284 66 292 100 292 C134 292 160 284 160 272 V176" fill="url(#${uid}-body)"/>
        <ellipse cx="100" cy="176" rx="60" ry="16" fill="url(#${uid}-cap)"/>
        <ellipse cx="100" cy="172" rx="60" ry="16" fill="url(#${uid}-cap)"/>
        <ellipse cx="100" cy="172" rx="47" ry="11" fill="${shade(cap, 16)}" opacity=".55"/>
        <rect x="52" y="188" width="10" height="80" rx="5" fill="url(#${uid}-gloss)" opacity=".45"/>
        ${labelBlock(62, 206, 76, 62)}`;
    } else if (kind === 'flacon') {
      art = `
        <path d="M60 168 C60 146 70 132 84 124 V104 H116 V124 C130 132 140 146 140 168 V272 C140 284 122 292 100 292 C78 292 60 284 60 272 Z" fill="url(#${uid}-body)"/>
        <path d="M60 168 C60 146 70 132 84 124 V104 H116 V124 C130 132 140 146 140 168 V272 C140 284 122 292 100 292 C78 292 60 284 60 272 Z" fill="url(#${uid}-liquid)" opacity=".4"/>
        <rect x="80" y="76" width="40" height="30" rx="5" fill="url(#${uid}-cap)"/>
        <rect x="86" y="64" width="28" height="14" rx="7" fill="${shade(cap, 12)}"/>
        <rect x="68" y="182" width="9" height="92" rx="4.5" fill="url(#${uid}-gloss)" opacity=".55"/>
        ${labelBlock(72, 196, 56, 74)}`;
    } else { /* mist / default */
      art = `
        <rect x="70" y="120" width="60" height="168" rx="9" fill="url(#${uid}-body)"/>
        <rect x="70" y="120" width="60" height="168" rx="9" fill="url(#${uid}-liquid)" opacity=".4"/>
        <rect x="82" y="92" width="36" height="30" rx="4" fill="url(#${uid}-cap)"/>
        <rect x="88" y="72" width="24" height="22" rx="4" fill="url(#${uid}-cap)"/>
        <rect x="74" y="132" width="8" height="140" rx="4" fill="url(#${uid}-gloss)" opacity=".45"/>
        ${labelBlock(78, 174, 44, 80)}`;
    }

    return `<svg class="vessel-svg" viewBox="${viewBox}" fill="none" role="img"
      aria-label="${opts.alt || '产品示意'}">${defs}${shadow}${art}</svg>`;
  }

  window.ART = { emblem, vessel };
})();
