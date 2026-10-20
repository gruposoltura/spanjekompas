#!/usr/bin/env node
/*
 * Bouwt de statische gidspagina's van SpanjeKompas uit de plaatsgegevens in index.html.
 * Eén bron: pas je een plaatsbeschrijving aan in index.html, draai dan:
 *     node tools/build-gids.js
 * Dit schrijft /costa-blanca-zuid/, /wonen-in/<plaats>/ en sitemap.xml opnieuw.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://spanjekompas.com';
const UPDATED = process.env.GIDS_DATUM || new Date().toISOString().slice(0, 10);

/* ---------- gegevens uit index.html halen ---------- */
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
function grab(name, open, close) {
  const start = html.indexOf(`const ${name} = `);
  if (start < 0) throw new Error(`${name} niet gevonden in index.html`);
  const from = html.indexOf(open, start);
  let depth = 0, i = from;
  for (; i < html.length; i++) {
    if (html[i] === open) depth++;
    else if (html[i] === close && --depth === 0) break;
  }
  return Function(`"use strict";return (${html.slice(from, i + 1)});`)();
}
const PLACES = grab('PLACES', '[', ']');
const TAG_LABEL = grab('TAG_LABEL', '{', '}');
const PHOTO = grab('PHOTO', '{', '}');
const LOKAAL = require('./lokaal.js');

const SLUG = {
  rojales: 'rojales', quesada: 'ciudad-quesada', benijofar: 'benijofar',
  formentera: 'formentera-del-segura', guardamar: 'guardamar-del-segura',
  torrevieja: 'torrevieja', orihuela: 'orihuela-costa', dolores: 'dolores',
  sanmiguel: 'san-miguel-de-salinas',
};
const ZONE = { kust: 'aan de kust', achterland: 'in het achterland' };
const ZONE_KORT = { kust: 'Kust', achterland: 'Achterland' };
const LICENSE = {
  'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/deed.nl',
  'CC BY-SA 3.0': 'https://creativecommons.org/licenses/by-sa/3.0/deed.nl',
  'CC BY 2.0': 'https://creativecommons.org/licenses/by/2.0/deed.nl',
};

/* ---------- hulpjes ---------- */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const lc1 = s => s.charAt(0).toLowerCase() + s.slice(1);
const noDot = s => s.replace(/\.$/, '');
const url = p => `${SITE}/wonen-in/${SLUG[p.id]}/`;
const datumNL = d => new Date(d + 'T12:00:00Z').toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const list = arr => arr.length < 2 ? arr.join('') : arr.slice(0, -1).join(', ') + ' en ' + arr[arr.length - 1];
const labels = p => p.tags.map(t => TAG_LABEL[t]).filter(Boolean);

function similar(p, n = 3) {
  return PLACES.filter(q => q !== p).map(q => {
    const shared = q.tags.filter(t => p.tags.includes(t));
    const score = shared.length / new Set([...p.tags, ...q.tags]).size + (q.zone === p.zone ? 0.05 : 0);
    return { q, shared, score };
  }).sort((a, b) => b.score - a.score).slice(0, n);
}

/* Vragen om zelf na te gaan: afgeleid van ligging en kenmerken, zonder cijfers te verzinnen. */
function checkQuestions(p) {
  const qs = [];
  qs.push(p.zone === 'kust'
    ? 'Hoe voelt de plaats buiten het hoogseizoen? Bezoek haar bij voorkeur ook in de winter.'
    : 'Hoe vaak wil je naar het strand, en is de rit vanuit hier voor jou dagelijks of af en toe?');
  if (p.tags.includes('rustig') || p.tags.includes('dorp'))
    qs.push('Welke voorzieningen wil je op loopafstand, en welke mogen een korte rit weg zijn?');
  if (p.tags.includes('authentiek'))
    qs.push('Hoeveel Spaans spreek je, of wil je leren? In een Spaanse omgeving maakt dat het dagelijks leven een stuk makkelijker.');
  if (p.tags.includes('internationaal'))
    qs.push('Zoek je juist contact met andere Nederlanders en Belgen, of wil je vooral tussen Spanjaarden wonen?');
  if (p.tags.includes('golf'))
    qs.push('Op welke banen wil je spelen, en past een woning dicht bij een baan bij de rest van je wensen?');
  if (p.tags.includes('gezin'))
    qs.push('Gaan er kinderen mee? Ga dan na welke scholen er in de buurt zijn en in welke taal er les wordt gegeven.');
  if (p.tags.includes('stad') || p.tags.includes('levendig'))
    qs.push('Hoe belangrijk is rust voor je? Bekijk de straat ook op een avond en in het weekend.');
  qs.push('Hoe ver wil je van een luchthaven en een ziekenhuis wonen? Controleer de actuele reistijden zelf.');
  qs.push('Woon je straks in de oude kern of in een urbanisatie (woonwijk) erbuiten? Dat verschilt vaak meer dan de plaatsnaam doet vermoeden.');
  return qs;
}

/* ---------- gedeelde stukken ---------- */
const GA = `<script>
  window.SK_GA_ID='G-210MVW9H6N';
  window.skLoadGA=function(){
    if(window.__skGA) return; window.__skGA=true;
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){dataLayer.push(arguments);};
    gtag('js',new Date()); gtag('config',window.SK_GA_ID);
    var sc=document.createElement('script'); sc.async=true;
    sc.src='https://www.googletagmanager.com/gtag/js?id='+window.SK_GA_ID;
    document.head.appendChild(sc);
  };
  var skc=null; try{ skc=localStorage.getItem('sk_consent'); }catch(e){}
  if(skc!=='no') window.skLoadGA();
</script>`;

function head({ title, description, canonical, image, jsonld }) {
  return `<!doctype html>
<html lang="nl">
<head>
${GA}
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#14243a">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta property="og:type" content="article">
<meta property="og:locale" content="nl_NL">
<meta property="og:site_name" content="SpanjeKompas">
<meta property="og:url" content="${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${image}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Figtree:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/css/gids.css">
<script type="application/ld+json">
${JSON.stringify(jsonld, null, 1)}
</script>
</head>
<body>
<nav class="nav" aria-label="Hoofdmenu"><div class="wrap">
  <a class="brand" href="/"><img src="/favicon.svg" alt="" width="34" height="34"><b>Spanje<i>Kompas</i></b></a>
  <div class="nav-links">
    <a href="/costa-blanca-zuid/">Costa Blanca Zuid</a>
    <a class="btn btn-primary" href="/#woonwijzer">Start <span class="hide-s">jouw&nbsp;</span>woonkompas</a>
  </div>
</div></nav>
<main>`;
}

const FOOT = `</main>
<footer><div class="wrap">
  <div><b style="font-family:var(--f-display);font-weight:400;font-size:1.3rem;color:#fff">Spanje<i style="color:#f3c79c">Kompas</i></b><br><small>Ontdek waar jij je thuis voelt in Spanje.</small></div>
  <nav aria-label="Voettekst">
    <a href="/">Home</a>
    <a href="/costa-blanca-zuid/">Costa Blanca Zuid</a>
    <a href="/#privacy">Privacy en gegevens</a>
    <button type="button" id="skCookie">Cookie-instellingen</button>
    <a href="mailto:info@spanjekompas.com">info@spanjekompas.com</a>
  </nav>
</div></footer>
<div class="consent" id="consent" role="dialog" aria-label="Cookies" hidden>
  <span>We meten bezoek met cookies. <a href="/#privacy">Info</a></span>
  <span><button type="button" class="cb cb-yes" id="consentYes">Oké</button> <button type="button" class="cb cb-no" id="consentNo">Weigeren</button></span>
</div>
<script>
(function(){
  var b=document.getElementById('consent');
  var c=null; try{c=localStorage.getItem('sk_consent')}catch(e){}
  if(c!=='yes'&&c!=='no') b.hidden=false;
  function set(v){
    try{localStorage.setItem('sk_consent',v)}catch(e){}
    b.hidden=true;
    if(v==='yes'){window.skLoadGA();return}
    if(window.__skGA){
      var h=location.hostname.replace(/^www\\./,'');
      document.cookie.split(';').forEach(function(k){var n=k.split('=')[0].trim();
        if(/^_ga/.test(n)){['',location.hostname,'.'+h].forEach(function(d){document.cookie=n+'=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/'+(d?';domain='+d:'')})}});
      location.reload();
    }
  }
  document.getElementById('consentYes').onclick=function(){set('yes')};
  document.getElementById('consentNo').onclick=function(){set('no')};
  document.getElementById('skCookie').onclick=function(){b.hidden=false};
})();
</script>
</body>
</html>
`;

function photoFigure(p, eager) {
  const ph = PHOTO[p.id];
  const credit = ph ? `Foto: <a href="${ph.u}" rel="noopener" target="_blank">${esc(ph.a)}</a>, <a href="${LICENSE[ph.l] || ph.u}" rel="noopener license" target="_blank">${esc(ph.l)}</a>, via Wikimedia Commons` : '';
  return `<figure class="figure"><img src="/img/plaatsen/${p.id}.jpg" alt="${esc(p.name)}, ${ZONE[p.zone]} van de zuidelijke Costa Blanca" width="1200" height="750" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"><figcaption>${credit}</figcaption></figure>`;
}

const crumbsLD = items => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it[0], item: it[1] })),
});
const ORG = { '@id': `${SITE}/#organization` };


function lokaalSectie(p) {
  const L = LOKAAL[p.id];
  if (!L) return '';
  const bron = (L.bronnen || []).map(b => `<li><a href="${b.u}" rel="noopener" target="_blank">${esc(b.t)}</a>${b.gecontroleerd ? `, gecontroleerd op <time datetime="${b.gecontroleerd}">${datumNL(b.gecontroleerd)}</time>` : ''}</li>`).join('');
  return `
  <section aria-labelledby="lokaalT">
  <h2 id="lokaalT">${esc(L.kop)}</h2>
  ${L.intro ? `<p>${esc(L.intro)}</p>` : ''}
  ${L.blokken.map(b => `<h3 style="margin-top:1.4em">${esc(b.h)}</h3>\n  <p>${esc(b.p)}</p>`).join('\n  ')}
  ${bron ? `<p class="small muted" style="margin-top:14px">Bronnen:</p><ul class="small muted">${bron}</ul>` : ''}
  </section>
`;
}

/* ---------- plaatspagina ---------- */
function placePage(p) {
  const canonical = url(p);
  const title = `Wonen in ${p.name}: sfeer, omgeving en voor wie het past | SpanjeKompas`;
  const description = `${p.sfeer} ${p.voor}`;
  const sims = similar(p);
  const kenm = labels(p);
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage', '@id': canonical + '#webpage', url: canonical, name: title, description,
        inLanguage: 'nl', isPartOf: { '@id': `${SITE}/#website` }, publisher: ORG, dateModified: UPDATED,
        primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE}/img/plaatsen/${p.id}.jpg` },
        about: {
          '@type': 'Place', name: p.name, description: p.sfeer,
          containedInPlace: { '@type': 'Place', name: 'Costa Blanca Zuid, provincie Alicante, Spanje' },
        },
      },
      crumbsLD([['SpanjeKompas', `${SITE}/`], ['Costa Blanca Zuid', `${SITE}/costa-blanca-zuid/`], [p.name, canonical]]),
    ],
  };

  return head({ title, description, canonical, image: `${SITE}/img/plaatsen/${p.id}.jpg`, jsonld }) + `
<article class="wrap narrow">
  <ol class="crumbs" aria-label="Kruimelpad"><li><a href="/">Home</a></li><li><a href="/costa-blanca-zuid/">Costa Blanca Zuid</a></li><li aria-current="page">${esc(p.name)}</li></ol>
  <header class="page">
    <p class="eyebrow">${ZONE_KORT[p.zone]} · Costa Blanca Zuid</p>
    <h1>Wonen in ${esc(p.name)}</h1>
    <p class="lead">${esc(p.sfeer)} ${esc(p.voor)}</p>
  </header>
  ${photoFigure(p, true)}

  <dl class="facts">
    <div><dt>Ligging</dt><dd>${ZONE_KORT[p.zone]} van de zuidelijke Costa Blanca</dd></div>
    <div><dt>Karakter</dt><dd>${esc(kenm.join(' · '))}</dd></div>
    <div><dt>Past bij</dt><dd>${esc(noDot(p.voor))}</dd></div>
  </dl>

  <h2>Ligging en omgeving</h2>
  <p>${esc(p.name)} ligt ${ZONE[p.zone]} van de zuidelijke Costa Blanca, in de provincie Alicante. ${esc(p.omgeving)}</p>

${lokaalSectie(p)}
  <h2>Voorzieningen</h2>
  <p>${esc(p.voorzieningen)}</p>

  <h2>Voor wie past ${esc(p.name)}?</h2>
  <p>${esc(p.name)} past vooral bij ${esc(lc1(p.voor).replace(/^wie /,'wie '))} Het past minder goed als je juist ${p.tags.includes('rustig') ? 'veel reuring en stadse voorzieningen om je heen wilt' : p.tags.includes('levendig') || p.tags.includes('stad') ? 'stilte en een klein dorp zoekt' : 'iets heel anders zoekt dan hierboven beschreven'}.</p>

  <h2>Waar je op let</h2>
  <p class="note">${esc(p.let)}</p>

  <h2>Zelf nagaan voordat je kiest</h2>
  <p>Een plaats kiezen is persoonlijk. Deze vragen helpen je ${esc(p.name)} eerlijk te toetsen aan je eigen wensen:</p>
  <ul class="check">${checkQuestions(p).map(q => `<li>${esc(q)}</li>`).join('')}</ul>

  <h2>Vergelijkbare plaatsen</h2>
  <div class="cards">${sims.map(({ q, shared }) => `
    <a class="card" href="/wonen-in/${SLUG[q.id]}/"><img src="/img/plaatsen/${q.id}.jpg" alt="" width="1200" height="750" loading="lazy" decoding="async"><div class="body"><p class="eyebrow">${ZONE_KORT[q.zone]}</p><h3>${esc(q.name)}</h3><p>${shared.length ? 'Ook ' + esc(list(shared.map(t => TAG_LABEL[t]))) + '.' : esc(q.voor)}</p></div></a>`).join('')}
  </div>

  <section class="cta" aria-labelledby="ctaT">
    <h2 id="ctaT">Past ${esc(p.name)} bij jou?</h2>
    <p>Beantwoord in ongeveer zes minuten een reeks korte vragen over hoe jij in Spanje wilt wonen. Je krijgt gratis je persoonlijke woonkompas als PDF, samen met onze woon- en emigratiegids. Vrijblijvend en op jouw tempo.</p>
    <a class="btn btn-primary" href="/#woonwijzer">Start jouw woonkompas</a>
  </section>

  <p class="small muted" style="margin-top:28px">Deze beschrijving is algemeen en bedoeld als eerste kennismaking. Voorzieningen, reistijden en regels veranderen; controleer wat voor jou belangrijk is altijd ter plaatse of vraag het na. Laatst bijgewerkt: <time datetime="${UPDATED}">${datumNL(UPDATED)}</time>.</p>
</article>
` + FOOT;
}

/* ---------- overzichtspagina ---------- */
function hubPage() {
  const canonical = `${SITE}/costa-blanca-zuid/`;
  const title = 'Wonen aan de Costa Blanca Zuid: negen plaatsen vergeleken | SpanjeKompas';
  const description = 'Kust of achterland, Spaans dorp of internationale woonwijk? Vergelijk negen plaatsen aan de zuidelijke Costa Blanca op sfeer, omgeving en voor wie ze passen.';
  const kust = PLACES.filter(p => p.zone === 'kust');
  const land = PLACES.filter(p => p.zone === 'achterland');
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage', '@id': canonical + '#webpage', url: canonical, name: title, description,
        inLanguage: 'nl', isPartOf: { '@id': `${SITE}/#website` }, publisher: ORG, dateModified: UPDATED,
        about: { '@type': 'Place', name: 'Costa Blanca Zuid, provincie Alicante, Spanje' },
        mainEntity: {
          '@type': 'ItemList', numberOfItems: PLACES.length,
          itemListElement: PLACES.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name, url: url(p) })),
        },
      },
      crumbsLD([['SpanjeKompas', `${SITE}/`], ['Costa Blanca Zuid', canonical]]),
    ],
  };
  const cards = arr => `<div class="cards">${arr.map(p => `
    <a class="card" href="/wonen-in/${SLUG[p.id]}/"><img src="/img/plaatsen/${p.id}.jpg" alt="" width="1200" height="750" loading="lazy" decoding="async"><div class="body"><p class="eyebrow">${ZONE_KORT[p.zone]}</p><h3>${esc(p.name)}</h3><p>${esc(p.sfeer)}</p></div></a>`).join('')}
  </div>`;
  const byTag = t => PLACES.filter(p => p.tags.includes(t)).map(p => `<a href="/wonen-in/${SLUG[p.id]}/">${esc(p.name)}</a>`);

  return head({ title, description, canonical, image: `${SITE}/og-image.jpg`, jsonld }) + `
<div class="wrap">
  <ol class="crumbs" aria-label="Kruimelpad"><li><a href="/">Home</a></li><li aria-current="page">Costa Blanca Zuid</li></ol>
  <header class="page narrow">
    <p class="eyebrow">Ontdek de regio</p>
    <h1>Wonen aan de Costa Blanca Zuid</h1>
    <p class="lead">De zuidelijke Costa Blanca is het deel van de kust van de provincie Alicante rond Guardamar, Torrevieja en Orihuela Costa, met daarachter de groene Vega Baja langs de rivier de Segura. Hier vergelijk je negen plaatsen, elk met een eigen karakter.</p>
  </header>

  <section class="narrow">
    <h2>Kust of achterland?</h2>
    <p>De eerste keuze is vaak niet welke plaats, maar welk soort omgeving. <strong>Aan de kust</strong> woon je dicht bij strand en boulevard, met meer voorzieningen en meer drukte in de zomer. <strong>In het achterland</strong> is het meestal rustiger en Spaanser, met dorpen tussen de boomgaarden en de kust op korte rijafstand. Daarnaast verschilt de sfeer sterk tussen een oude dorpskern en de urbanisaties (woonwijken) eromheen.</p>
    <ul class="check">
      <li>Strand dichtbij: ${list(byTag('strand'))}.</li>
      <li>Spaans en authentiek: ${list(byTag('authentiek'))}.</li>
      <li>Rust: ${list(byTag('rustig'))}.</li>
      <li>Golf in de buurt: ${list(byTag('golf'))}.</li>
      <li>Internationale voorzieningen: ${list(byTag('internationaal'))}.</li>
    </ul>
  </section>

  <h2>De negen plaatsen naast elkaar</h2>
  <div class="table-wrap"><table>
    <thead><tr><th scope="col">Plaats</th><th scope="col">Ligging</th><th scope="col">Sfeer</th><th scope="col">Past bij</th><th scope="col">Let op</th></tr></thead>
    <tbody>${PLACES.map(p => `
      <tr><th scope="row"><a href="/wonen-in/${SLUG[p.id]}/">${esc(p.name)}</a></th><td>${ZONE_KORT[p.zone]}</td><td>${esc(p.sfeer)}</td><td>${esc(p.voor)}</td><td>${esc(p.let)}</td></tr>`).join('')}
    </tbody>
  </table></div>

  <h2>Aan de kust</h2>
  ${cards(kust)}

  <h2>In het achterland</h2>
  ${cards(land)}

  <section class="cta narrow" aria-labelledby="ctaT">
    <h2 id="ctaT">Welke plaats past bij jou?</h2>
    <p>Twijfel je nog? Het woonkompas stelt je een reeks korte vragen over je gezin, je ideale omgeving, je woning en je budget, en laat zien waar je eens kunt rondkijken. Gratis, vrijblijvend en zonder account.</p>
    <a class="btn btn-primary" href="/#woonwijzer">Start jouw woonkompas</a>
  </section>

  <p class="small muted narrow" style="margin-top:28px">De beschrijvingen zijn algemeen en bedoeld als eerste kennismaking. Voorzieningen, reistijden en regels veranderen; controleer wat voor jou belangrijk is altijd ter plaatse of vraag het na. Laatst bijgewerkt: <time datetime="${UPDATED}">${datumNL(UPDATED)}</time>.</p>
</div>
` + FOOT;
}

/* ---------- schrijven ---------- */
function write(rel, content) {
  const f = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, content);
  console.log('geschreven:', rel);
}
write('costa-blanca-zuid/index.html', hubPage());
for (const p of PLACES) {
  if (!SLUG[p.id]) throw new Error(`Geen slug voor ${p.id}; voeg die toe in SLUG`);
  write(`wonen-in/${SLUG[p.id]}/index.html`, placePage(p));
}
const urls = [`${SITE}/`, `${SITE}/costa-blanca-zuid/`, ...PLACES.map(url)];
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${UPDATED}</lastmod>\n  </url>`).join('\n')}
</urlset>
`);
