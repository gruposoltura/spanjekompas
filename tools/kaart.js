/*
 * Kaartgegevens en kerngetallen voor SpanjeKompas.
 * Na een wijziging: node tools/build-gids.js
 *
 * Coördinaten zijn het centrum van de plaats (bij Orihuela Costa: rond Playa Flamenca en La Zenia).
 * Afstanden worden hemelsbreed berekend; over de weg is het altijd verder.
 */
const COORD = {
  rojales:    [38.0880, -0.7240],
  quesada:    [38.0700, -0.7180],
  benijofar:  [38.0790, -0.7380],
  formentera: [38.0855, -0.7470],
  guardamar:  [38.0898, -0.6553],
  torrevieja: [37.9787, -0.6822],
  orihuela:   [37.9257, -0.7210],
  dolores:    [38.1403, -0.7701],
  sanmiguel:  [37.9795, -0.7897],
};

const LUCHTHAVENS = [
  { id: 'alc', naam: 'Luchthaven Alicante-Elche', kort: 'Alicante (ALC)', ll: [38.2822, -0.5582] },
  { id: 'rmu', naam: 'Luchthaven Región de Murcia', kort: 'Murcia (RMU)', ll: [37.8031, -1.1253] },
];

/* Kerngetallen met bron. Klimaat: AEMET-normaalwaarden luchthaven Alicante 1981–2010. */
const KERNGETALLEN = [
  { cijfer: '± 2.850', eenheid: 'zonuren per jaar', uitleg: 'Gemeten rond Alicante, ruim anderhalf keer zoveel als in Nederland en België.' },
  { cijfer: '18 °C', eenheid: 'gemiddeld over het jaar', uitleg: 'Rond 12 °C in januari en 26 °C in augustus.' },
  { cijfer: '± 38', eenheid: 'regendagen per jaar', uitleg: 'Met zo\'n 311 mm regen per jaar; de meeste valt in de herfst.' },
  { cijfer: '± 2½ uur', eenheid: 'vliegen naar Alicante', uitleg: 'Vanaf Amsterdam, Eindhoven of Brussel. Murcia ligt even ver.' },
];
const KERNGETALLEN_BRON = { t: 'AEMET, klimatologische normaalwaarden Alicante 1981–2010', u: 'https://www.aemet.es/es/serviciosclimaticos/datosclimatologicos/valoresclimatologicos?l=8025' };

function km(a, b) {
  const R = 6371, rad = d => d * Math.PI / 180;
  const dLat = rad(b[0] - a[0]), dLon = rad(b[1] - a[1]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
/* Afronden op 5 km: de coördinaten zijn een plaatscentrum, geen adres. */
const rond5 = x => Math.max(5, Math.round(x / 5) * 5);
function afstanden(id) {
  const c = COORD[id];
  if (!c) return [];
  return LUCHTHAVENS.map(l => ({ ...l, km: rond5(km(c, l.ll)) }));
}

module.exports = { COORD, LUCHTHAVENS, KERNGETALLEN, KERNGETALLEN_BRON, afstanden };
