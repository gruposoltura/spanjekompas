/* Maandlastencalculator SpanjeKompas. Voorbeeldbedragen, door de bezoeker aan te passen.
 * Invoer blijft alleen in de eigen browser (localStorage 'sk_ml'). */
(function () {
  'use strict';
  var W = { appartement: 0, bungalow: 1, villa: 2 };

  /* per: 'm' = per maand, 'j' = per jaar. maal: waarmee het bedrag wordt vermenigvuldigd. */
  var POSTEN = [
    { id: 'ibi', g: 'Wonen', l: 'IBI (gemeentelijke onroerendgoedbelasting)', per: 'j', w: [300, 400, 700] },
    { id: 'basura', g: 'Wonen', l: 'Afvalheffing (basura)', per: 'j', w: [120, 120, 140] },
    { id: 'comunidad', g: 'Wonen', l: 'Comunidad (vereniging van eigenaren)', per: 'm', w: [70, 45, 0] },
    { id: 'verz', g: 'Wonen', l: 'Opstal- en inboedelverzekering', per: 'j', w: [250, 350, 550] },
    { id: 'onderhoud', g: 'Wonen', l: 'Onderhoud tuin en zwembad', per: 'm', w: [0, 0, 60] },
    { id: 'stroom', g: 'Energie en water', l: 'Stroom (airco en verwarming)', per: 'm', w: [70, 90, 140] },
    { id: 'water', g: 'Energie en water', l: 'Water', per: 'm', w: [25, 35, 60] },
    { id: 'gas', g: 'Energie en water', l: 'Gas (butaan)', per: 'm', w: [10, 15, 20] },
    { id: 'internet', g: 'Energie en water', l: 'Internet en telefoon', per: 'm', v: 50 },
    { id: 'zorgV', g: 'Zorg', l: 'Zorgverzekering per volwassene', per: 'm', zorg: { particulier: 130, s1: 0, werk: 0 }, maal: 'volw' },
    { id: 'zorgK', g: 'Zorg', l: 'Zorgverzekering per kind', per: 'm', zorg: { particulier: 55, s1: 0, werk: 0 }, maal: 'kind' },
    { id: 'school', g: 'School', l: 'Schoolkosten per kind', per: 'j', school: { openbaar: 500, internationaal: 7000 }, maal: 'kind' },
    { id: 'autoVerz', g: 'Auto', l: 'Autoverzekering per auto', per: 'j', v: 450, maal: 'auto' },
    { id: 'autoBel', g: 'Auto', l: 'Wegenbelasting en keuring (ITV) per auto', per: 'j', v: 120, maal: 'auto' },
    { id: 'brandstof', g: 'Auto', l: 'Brandstof per auto', per: 'm', v: 110, maal: 'auto' },
    { id: 'bood', g: 'Dagelijks leven', l: 'Boodschappen per volwassene', per: 'm', v: 300, maal: 'volw' },
    { id: 'boodK', g: 'Dagelijks leven', l: 'Boodschappen per kind', per: 'm', v: 175, maal: 'kind' },
    { id: 'vrij', g: 'Dagelijks leven', l: 'Uit eten en vrije tijd per volwassene', per: 'm', v: 150, maal: 'volw' },
  ];
  var GROEPEN = ['Wonen', 'Energie en water', 'Zorg', 'School', 'Auto', 'Dagelijks leven'];
  var MAAL_L = { volw: ['volwassene', 'volwassenen'], kind: ['kind', 'kinderen'], auto: ['auto', "auto's"] };

  var $ = function (s) { return document.querySelector(s); };
  var form = $('#mlForm'), box = $('#mlPosten');
  if (!form || !box) return;
  var eur = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

  var S = { custom: {} };
  try { var raw = localStorage.getItem('sk_ml'); if (raw) S = JSON.parse(raw) || S; } catch (e) {}
  S.custom = S.custom || {};
  function bewaar() { try { localStorage.setItem('sk_ml', JSON.stringify(S)); } catch (e) {} }

  var SIT = ['woning', 'volw', 'kind', 'school', 'zorg', 'auto', 'nu'];
  SIT.forEach(function (n) { if (S[n] != null && form.elements[n]) form.elements[n].value = S[n]; });

  function sit() {
    var o = {};
    o.woning = form.elements.woning.value;
    o.school = form.elements.school.value;
    o.zorg = form.elements.zorg.value;
    o.volw = Math.max(1, parseInt(form.elements.volw.value, 10) || 1);
    o.kind = Math.max(0, parseInt(form.elements.kind.value, 10) || 0);
    o.auto = Math.max(0, parseInt(form.elements.auto.value, 10) || 0);
    o.nu = parseFloat(form.elements.nu.value);
    return o;
  }
  function standaard(p, s) {
    if (p.w) return p.w[W[s.woning]];
    if (p.zorg) return p.zorg[s.zorg];
    if (p.school) return p.school[s.school];
    return p.v;
  }
  function bedrag(p, s) { return S.custom[p.id] != null ? S.custom[p.id] : standaard(p, s); }
  function zichtbaar(p, s) { return !p.maal || s[p.maal] > 0; }

  /* Invoervelden opbouwen, per groep */
  function bouw() {
    var html = '';
    GROEPEN.forEach(function (g) {
      var ps = POSTEN.filter(function (p) { return p.g === g; });
      html += '<div class="ml-groep" data-groep="' + g + '"><p class="ml-gt">' + g + '</p>';
      ps.forEach(function (p) {
        html += '<div class="ml-row ml-post" data-post="' + p.id + '"><label for="ml_' + p.id + '">' + p.l +
          '<small class="ml-maal" id="ml_' + p.id + '_m"></small></label>' +
          '<span class="ml-eur"><span aria-hidden="true">€</span><input id="ml_' + p.id + '" data-id="' + p.id + '" type="number" min="0" step="5" inputmode="numeric" aria-describedby="ml_' + p.id + '_m"><span class="ml-per">' + (p.per === 'j' ? 'per jaar' : 'per maand') + '</span></span></div>';
      });
      html += '</div>';
    });
    box.innerHTML = '<legend>De posten</legend>' + html;
  }

  function reken() {
    var s = sit();
    SIT.forEach(function (n) { S[n] = form.elements[n].value; });
    document.querySelectorAll('[data-als-kind]').forEach(function (el) { el.hidden = s.kind === 0; });
    var perGroep = {}, totaal = 0;
    POSTEN.forEach(function (p) {
      var row = box.querySelector('[data-post="' + p.id + '"]');
      var inp = document.getElementById('ml_' + p.id);
      var vis = zichtbaar(p, s);
      row.hidden = !vis;
      var b = bedrag(p, s);
      if (document.activeElement !== inp) inp.value = b;
      inp.classList.toggle('eigen', S.custom[p.id] != null);
      var n = p.maal ? s[p.maal] : 1;
      var m = document.getElementById('ml_' + p.id + '_m');
      m.textContent = p.maal ? ' × ' + n + ' ' + MAAL_L[p.maal][n === 1 ? 0 : 1] : '';
      if (!vis) return;
      var pm = (p.per === 'j' ? b / 12 : b) * n;
      perGroep[p.g] = (perGroep[p.g] || 0) + pm;
      totaal += pm;
    });
    box.querySelectorAll('.ml-groep').forEach(function (gEl) {
      gEl.hidden = !gEl.querySelector('.ml-post:not([hidden])');
    });
    $('#mlTot').textContent = eur.format(Math.round(totaal));
    $('#mlJaar').textContent = 'Dat is ongeveer ' + eur.format(Math.round(totaal * 12)) + ' per jaar.';
    var max = Math.max.apply(null, GROEPEN.map(function (g) { return perGroep[g] || 0; }).concat([1]));
    $('#mlBars').innerHTML = GROEPEN.filter(function (g) { return perGroep[g] > 0; }).map(function (g) {
      var v = perGroep[g];
      return '<li><span class="ml-bl">' + g + '</span><span class="ml-bv">' + eur.format(Math.round(v)) + '</span>' +
        '<span class="ml-bar" aria-hidden="true"><i style="width:' + Math.max(3, Math.round(v / max * 100)) + '%"></i></span></li>';
    }).join('');
    var verg = $('#mlVerg');
    if (s.nu > 0) {
      var d = Math.round(s.nu - totaal);
      verg.hidden = false;
      verg.innerHTML = d === 0 ? 'Ongeveer hetzelfde als nu.' :
        'Dat is <b>' + eur.format(Math.abs(d)) + ' per maand ' + (d > 0 ? 'minder' : 'meer') + '</b> dan je nu kwijt bent.';
    } else verg.hidden = true;
    bewaar();
  }

  bouw();
  form.addEventListener('input', function (e) {
    var id = e.target.getAttribute('data-id');
    if (id) {
      var v = parseFloat(e.target.value);
      if (isNaN(v)) delete S.custom[id]; else S.custom[id] = Math.max(0, v);
    }
    reken();
  });
  form.addEventListener('change', reken);
  form.addEventListener('submit', function (e) { e.preventDefault(); });
  $('#mlReset').addEventListener('click', function () { S.custom = {}; reken(); });
  reken();
})();
