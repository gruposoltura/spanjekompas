/*
 * Lokale kennis per plaats: wat we zelf zien en kopers laten zien.
 * Sleutel = plaats-id uit PLACES in index.html. Na een wijziging: node tools/build-gids.js
 *
 * Per plaats:
 *   kop      – titel van de sectie
 *   intro    – openingszin
 *   blokken  – [{ h: tussenkop, p: alinea (mag een functie zijn die links invult) }]
 *   bronnen  – [{ t: omschrijving, u: url, gecontroleerd: 'JJJJ-MM-DD' }] voor feiten die kunnen veranderen
 */
module.exports = {
  guardamar: {
    kop: 'Guardamar door lokale ogen',
    intro: 'Wat wij zelf het mooiste vinden aan Guardamar del Segura.',
    blokken: [
      {
        h: 'Een dennenbos tussen dorp en strand',
        p: 'Tussen het dorp en het strand ligt een prachtig bos van pijnbomen. Je loopt vanuit de kern onder de bomen door naar zee. In de zomer is het er heerlijk koel, en omdat het bos zo groot is, vind je altijd een rustig plekje voor een picknick in de schaduw.',
      },
      {
        h: 'Wandelen en hardlopen',
        p: 'Door het bos loopt een geasfalteerd pad van kilometers lang. Daardoor is het niet alleen geschikt om te wandelen of te hiken, maar kun je er ook hardlopen met een kinderwagen.',
      },
      {
        h: 'Voor kinderen: pauwen en schildpadden',
        p: 'In het park aan de rand van het bos (Parque Reina Sofía) is een deel ingericht als een soort kinderboerderij. Je ziet er pauwen, schildpadden en allerlei mooie vogels. Leuk om met kinderen naartoe te gaan.',
      },
      {
        h: 'Stranden met de blauwe vlag',
        p: 'Guardamar heeft lange zandstranden, en meerdere daarvan hebben de blauwe vlag, het internationale keurmerk voor schoon water en goede voorzieningen. In 2026 gold dat volgens de lijst van de Comunitat Valenciana onder meer voor Playa Centre, Els Vivers en Les Ortigues–El Campo. De vlag wordt elk jaar opnieuw toegekend, dus kijk voor het actuele overzicht bij de gemeente.',
      },
      {
        h: 'De vissershuisjes langs de kust',
        p: 'Langs de kustlijn staan oude vissershuisjes die de moeite waard zijn om eens te bekijken. Hoe lang ze er nog staan is onzeker: de zee komt steeds dichterbij.',
      },
      {
        h: 'Het dorp zelf',
        p: 'Guardamar heeft een mooi dorpsplein en veel typische barretjes waar je even binnenloopt voor een snelle cortado of een hapje.',
      },
    ],
    bronnen: [
      {
        t: 'Blauwe vlaggen Comunitat Valenciana 2026 (Valencia Bonita)',
        u: 'https://www.valenciabonita.es/2026/05/05/banderas-azules-comunitat-valenciana-2026/',
        gecontroleerd: '2026-10-20',
      },
    ],
  },
};
