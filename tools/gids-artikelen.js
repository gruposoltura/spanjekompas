/*
 * Woongids (kennisbank) van SpanjeKompas.
 * Elk artikel wordt een pagina op /gids/<slug>/. Na een wijziging: node tools/build-gids.js
 *
 * Velden per artikel:
 *   slug, cat (sleutel uit CATS), titel, beschrijving (meta + kaart),
 *   kort        – drie tot vijf kernpunten bovenaan ("In het kort")
 *   body        – HTML (alleen p, h2, h3, ul, ol, li, a, strong, em)
 *   bronnen     – [{ t, u }] voor feiten die kunnen veranderen
 *   gecontroleerd – datum waarop de inhoud het laatst is nagelopen
 *
 * Huisregel: geen bedragen of percentages verzinnen. Wat verandert, noemen we
 * met bron en datum, of we zeggen eerlijk dat je het moet navragen.
 */
const CATS = {
  papieren: { t: 'Inschrijven en papieren', d: 'NIE, registratie als EU-burger en de padrón: in welke volgorde en waarom.' },
  gezin:    { t: 'Gezin en school', d: 'Leerplicht, schoolkeuze, taal en de eerste maanden met kinderen.' },
  zorg:     { t: 'Zorg en verzekering', d: 'Hoe je in Spanje verzekerd bent: via pensioen, werk of particulier.' },
  leven:    { t: 'Leven en lasten', d: 'Maandlasten, klimaat, overwinteren en werken op afstand.' },
  kopen:    { t: 'Kopen en wonen', d: 'De koop in zes stappen, het soort buurt en de juiste vragen.' },
};

const A = [
/* ------------------------------------------------------------------ PAPIEREN */
{
  slug: 'nie-nummer',
  cat: 'papieren',
  titel: 'Wat is een NIE-nummer en hoe vraag je het aan?',
  beschrijving: 'Het NIE is je Spaanse identificatienummer als buitenlander. Wanneer je het nodig hebt, waar je het aanvraagt en wat je meeneemt.',
  kort: [
    'Het NIE (Número de Identidad de Extranjero) is je persoonlijke nummer in Spanje.',
    'Je hebt het nodig voor de koop van een woning, een bankrekening en nutsvoorzieningen.',
    'Aanvragen kan in Spanje bij de politie of vreemdelingendienst, of via het Spaanse consulaat.',
    'Ga je in Spanje wonen? Dan krijg je het NIE ook bij je inschrijving als EU-burger.',
  ],
  body: `
<p>Wie iets regelt in Spanje, komt het meteen tegen: het NIE, voluit <em>Número de Identidad de Extranjero</em>. Het is een persoonlijk nummer dat je je leven lang houdt, en het staat op vrijwel elk document dat een Spaanse instantie voor je opmaakt.</p>
<h2>Waarvoor heb je het nodig?</h2>
<p>Het NIE is nodig zodra je economische, professionele of sociale banden met Spanje krijgt. In de praktijk betekent dat onder meer:</p>
<ul>
  <li>het kopen van een woning en het tekenen bij de notaris;</li>
  <li>het openen van een Spaanse bankrekening;</li>
  <li>het op je naam zetten van water, stroom en internet;</li>
  <li>het betalen van belastingen, zoals de gemeentelijke IBI.</li>
</ul>
<p>Het NIE is alleen een nummer. Het zegt niets over je verblijfsrecht en is geen identiteitsbewijs.</p>
<h2>Waar vraag je het aan?</h2>
<p>Volgens het Spaanse ministerie van Binnenlandse Zaken zijn er twee routes:</p>
<ul>
  <li><strong>In Spanje:</strong> persoonlijk bij een <em>Oficina de Extranjería</em> of een politiebureau (<em>Comisaría de Policía</em>), of via een vertegenwoordiger met volmacht.</li>
  <li><strong>Buiten Spanje:</strong> via het Spaanse consulaat in het land waar je woont.</li>
</ul>
<p>Voor een afspraak in Spanje heb je een <em>cita previa</em> nodig, die je online boekt. In drukke provincies, zoals Alicante, kan het even duren voordat er plek is. Veel kopers laten de aanvraag daarom regelen door een advocaat of gestor, met een volmacht.</p>
<h2>Wat neem je mee?</h2>
<ul>
  <li>het aanvraagformulier <strong>EX-15</strong>, ingevuld en ondertekend;</li>
  <li>het betaalbewijs van de leges (<strong>modelo 790, código 012</strong>);</li>
  <li>je paspoort of identiteitskaart, met een kopie;</li>
  <li>een korte onderbouwing waarom je het NIE nodig hebt, bijvoorbeeld een reserveringsbewijs van een woning.</li>
</ul>
<h2>Ga je er wonen? Dan gaat het anders</h2>
<p>Blijf je langer dan drie maanden in Spanje, dan schrijf je je als EU-burger in in het register voor buitenlanders. Op het registratiebewijs dat je dan krijgt, staat ook je NIE. Heb je al een NIE, bijvoorbeeld van de aankoop, dan blijft dat nummer hetzelfde. Lees meer in <a href="/gids/inschrijven-als-eu-burger/">Inschrijven als EU-burger</a>.</p>
<h2>Waar je op let</h2>
<ul>
  <li>Vraag het NIE ruim op tijd aan. Zonder nummer kun je niet bij de notaris tekenen.</li>
  <li>Controleer of je naam precies hetzelfde gespeld is als in je paspoort. Verschillen geven later gedoe bij de bank en het kadaster.</li>
  <li>Kopen jullie met z'n tweeën? Dan heeft ieder een eigen NIE nodig.</li>
</ul>`,
  bronnen: [
    { t: 'Ministerio del Interior: Documentación de las personas extranjeras (NIE)', u: 'https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/extranjeria/regimen-general/documentacion-de-las-personas-extranjeras/' },
  ],
  gecontroleerd: '2026-10-22',
},
{
  slug: 'inschrijven-als-eu-burger',
  cat: 'papieren',
  titel: 'Inschrijven als EU-burger in Spanje: het registratiebewijs',
  beschrijving: 'Woon je langer dan drie maanden in Spanje, dan schrijf je je in als EU-burger. Wat je nodig hebt en hoe de afspraak verloopt.',
  kort: [
    'Verblijf je langer dan drie maanden in Spanje, dan moet je je inschrijven.',
    'Dat doe je binnen drie maanden na aankomst, persoonlijk en op afspraak bij de politie.',
    'Werk je niet in Spanje, dan laat je zien dat je voldoende middelen hebt en verzekerd bent voor zorg.',
    'Je krijgt een registratiebewijs met daarop je NIE.',
  ],
  body: `
<p>Als Nederlander of Belg heb je geen visum of verblijfsvergunning nodig om in Spanje te wonen. Wel geldt een inschrijfplicht: wie langer dan drie maanden blijft, meldt zich in het centrale register voor buitenlanders. Je krijgt dan het <em>certificado de registro de ciudadano de la Unión</em>, vaak het groene certificaat genoemd.</p>
<h2>Wanneer moet je je inschrijven?</h2>
<p>De inschrijving geldt voor verblijf van meer dan drie maanden. Je doet de aanvraag binnen drie maanden na aankomst. Ben je er korter, bijvoorbeeld een deel van de winter, dan hoeft het niet. Lees ook <a href="/gids/overwinteren-of-emigreren/">Overwinteren of emigreren: waar ligt de grens?</a></p>
<h2>Wat moet je laten zien?</h2>
<p>Dat hangt af van je situatie:</p>
<ul>
  <li><strong>Je werkt in Spanje</strong>, in loondienst of als zelfstandige: een bewijs daarvan.</li>
  <li><strong>Je werkt niet in Spanje</strong>, bijvoorbeeld met pensioen of op eigen middelen: bewijs dat je voldoende middelen hebt voor jezelf en je gezin, én een zorgverzekering die je in Spanje volledig dekt.</li>
</ul>
<p>Verder neem je mee: het formulier <strong>EX-18</strong>, je paspoort of identiteitskaart, en het betaalbewijs van de leges (modelo 790, código 012). De leges zijn bescheiden, in 2026 ongeveer 12 euro. Vaak wordt ook gevraagd naar je inschrijving in de <a href="/gids/padron-inschrijven-gemeente/">padrón</a> van je gemeente.</p>
<h2>Hoe verloopt de afspraak?</h2>
<p>Je gaat persoonlijk naar het politiebureau dat voor je woonplaats de vreemdelingenzaken behandelt. Daarvoor boek je online een <em>cita previa</em>. Neem van alles originelen en kopieën mee. Is alles in orde, dan krijg je het certificaat meestal direct mee.</p>
<h2>Waarom het ertoe doet</h2>
<ul>
  <li>Het certificaat is in veel situaties je bewijs dat je hier officieel woont, bijvoorbeeld bij de bank of bij het overschrijven van een auto.</li>
  <li>Het is een stap op weg naar de Spaanse zorg, het inschrijven van kinderen op school en je fiscale positie.</li>
  <li>Het staat los van je fiscale woonplaats. Wanneer je belasting in Spanje betaalt, hangt af van andere regels. Laat je daarover persoonlijk adviseren.</li>
</ul>`,
  bronnen: [
    { t: 'Barcelona International Welcome: Certificate of registration as an EU national (landelijke regels, EX-18 en leges)', u: 'https://www.barcelona.cat/internationalwelcome/en/certificate-registration-eu-national' },
  ],
  gecontroleerd: '2026-10-22',
},
{
  slug: 'padron-inschrijven-gemeente',
  cat: 'papieren',
  titel: 'De padrón: inschrijven bij je gemeente in Spanje',
  beschrijving: 'De padrón is de inwonersregistratie van je Spaanse gemeente. Je hebt hem nodig voor school, zorg en veel andere zaken.',
  kort: [
    'De padrón is het inwonersregister van de gemeente, vergelijkbaar met de BRP in Nederland.',
    'Je schrijft je in bij het gemeentehuis (ayuntamiento) met je paspoort en bewijs van je adres.',
    'Je hebt de inschrijving nodig voor onder meer de school, de huisarts en het registratiebewijs.',
  ],
  body: `
<p>Iedereen die in een Spaanse gemeente woont, hoort ingeschreven te staan in het <em>padrón municipal</em>. Het bewijs van inschrijving heet het <em>certificado de empadronamiento</em>. Het is een van de eerste dingen die je regelt na een verhuizing, en een document dat je daarna steeds opnieuw nodig hebt.</p>
<h2>Waarvoor heb je het nodig?</h2>
<ul>
  <li>het inschrijven van kinderen op een openbare school;</li>
  <li>toegang tot de huisarts en de zorgpas van de Comunitat Valenciana (de SIP-kaart);</li>
  <li>de inschrijving als EU-burger bij de politie;</li>
  <li>allerlei gemeentelijke zaken, van sportclubs tot vergunningen.</li>
</ul>
<p>Een bijkomend punt: hoeveel inwoners een gemeente officieel heeft, telt mee bij de middelen die zij krijgt voor voorzieningen. Inschrijven is dus ook goed voor je nieuwe woonplaats.</p>
<h2>Hoe schrijf je je in?</h2>
<p>Je gaat naar het <em>ayuntamiento</em> van je woonplaats, of naar een gemeentelijk servicepunt in je wijk. Sommige gemeenten werken op afspraak. Je neemt meestal mee:</p>
<ul>
  <li>je paspoort of identiteitskaart, en je NIE als je dat al hebt;</li>
  <li>bewijs van je adres: de koopakte (escritura), een huurcontract of een recente rekening;</li>
  <li>het ingevulde inschrijfformulier van de gemeente.</li>
</ul>
<p>Wat precies gevraagd wordt, verschilt per gemeente. Kijk vooraf op de site van je gemeente of bel even.</p>
<h2>Urbanisatie of dorpskern?</h2>
<p>Veel woningen aan de Costa Blanca Zuid liggen in urbanisaties die bij een gemeente horen, maar ver van het centrum liggen. Ciudad Quesada hoort bijvoorbeeld bij Rojales, en Orihuela Costa bij Orihuela. Je schrijft je in bij de gemeente waar je adres onder valt, ook als het gemeentehuis een eind rijden is. Lees ook <a href="/gids/urbanisatie-of-dorpskern/">Urbanisatie of dorpskern</a>.</p>
<h2>Waar je op let</h2>
<ul>
  <li>Vraag na de inschrijving om een paar exemplaren van het certificaat; instanties willen er vaak een recent exemplaar van.</li>
  <li>Als buitenlander moet je de inschrijving soms periodiek bevestigen. De gemeente laat je weten wanneer.</li>
  <li>Verhuis je binnen Spanje, schrijf je dan in bij je nieuwe gemeente. De oude inschrijving vervalt dan vanzelf.</li>
</ul>`,
  bronnen: [],
  gecontroleerd: '2026-10-22',
},

/* ------------------------------------------------------------------ GEZIN */
{
  slug: 'naar-school-costa-blanca-zuid',
  cat: 'gezin',
  titel: 'Naar school aan de Costa Blanca Zuid: zo werkt het',
  beschrijving: 'Leerplicht, schooltypen, taal en inschrijving. Wat ouders willen weten voordat ze een woonplaats kiezen.',
  kort: [
    'In Spanje geldt leerplicht van 6 tot 16 jaar. Het schooljaar loopt ongeveer van september tot juni.',
    'Je kiest tussen een openbare Spaanse school, een gesubsidieerde school (concertada) en een internationale school.',
    'Op scholen in de Comunitat Valenciana wordt les gegeven in het Spaans en het Valenciaans.',
    'Kies de school vóór de woning: de afstand naar school bepaalt je dagritme.',
  ],
  body: `
<p>Gaan er kinderen mee, dan is de school vaak de belangrijkste keuze van de hele verhuizing. Niet alleen voor de kinderen zelf: de school bepaalt ook waar je woont, hoe jullie dag eruitziet en hoe snel het gezin zijn weg vindt.</p>
<h2>Hoe is het Spaanse onderwijs opgebouwd?</h2>
<ul>
  <li><strong>Educación Infantil</strong> (tot 6 jaar): niet verplicht, maar de meeste kinderen gaan vanaf 3 jaar naar school.</li>
  <li><strong>Educación Primaria</strong> (6 tot 12 jaar): de basisschool.</li>
  <li><strong>ESO</strong> (12 tot 16 jaar): het verplichte deel van het voortgezet onderwijs.</li>
  <li><strong>Bachillerato of beroepsonderwijs (FP)</strong> vanaf 16 jaar.</li>
</ul>
<p>De leerplicht loopt van 6 tot 16 jaar. Het schooljaar begint in september en eindigt in juni, met een lange zomervakantie.</p>
<h2>Welk soort school?</h2>
<ul>
  <li><strong>Openbaar (pública):</strong> kosteloos, met Spaanse leerlingen en lessen in het Spaans en Valenciaans. Je kind leert de taal snel, maar de eerste maanden kunnen pittig zijn.</li>
  <li><strong>Gesubsidieerd (concertada):</strong> particulier bestuurd, deels door de overheid betaald. Vaak met een kleine eigen bijdrage.</li>
  <li><strong>Internationaal:</strong> meestal Engelstalig, met een eigen curriculum, eigen inschrijving en schoolgeld. Er zijn er meerdere in de regio, vaak met wachtlijsten voor populaire leerjaren.</li>
</ul>
<p>Wil je dat je kind ook het Nederlands bijhoudt? Er zijn aanbieders van Nederlandstalig onderwijs op afstand, en in sommige plaatsen lessen Nederlandse Taal en Cultuur (NTC).</p>
<h2>Spaans en Valenciaans</h2>
<p>De Comunitat Valenciana kent twee officiële talen. Op openbare scholen krijgen kinderen les in het Spaans én het Valenciaans. De meeste gemeenten in de Vega Baja gelden officieel als Spaanstalig gebied. Sinds de onderwijswet van 2024 (de <em>Ley de Libertad Educativa</em>) kunnen ouders daar vrijstelling aanvragen voor de beoordeling van het Valenciaans. Of dat voor jouw gemeente geldt en hoe het werkt, hoor je bij de school.</p>
<h2>Hoe schrijf je je kind in?</h2>
<p>Voor openbare en gesubsidieerde scholen is er elk voorjaar een aanmeldperiode voor het volgende schooljaar. Kom je midden in het jaar, dan kun je je kind ook buiten die periode aanmelden; de gemeente of de school wijst je de weg. Je hebt daarbij meestal de <a href="/gids/padron-inschrijven-gemeente/">inschrijving in de padrón</a> nodig, en vaak het paspoort en een vaccinatieoverzicht van je kind.</p>
<h2>Vragen om aan een school te stellen</h2>
<ul>
  <li>Hoe begeleiden jullie kinderen die nog geen Spaans spreken?</li>
  <li>Hoeveel kinderen zitten er in een klas, en hoeveel daarvan komen uit het buitenland?</li>
  <li>Is er schoolvervoer, een overblijfregeling (comedor) en opvang na schooltijd?</li>
  <li>Hoe werkt de taal: welk deel van de lessen is in het Spaans en welk deel in het Valenciaans?</li>
</ul>
<p>Lees ook de <a href="/gids/emigreren-met-kinderen/">checklist voor emigreren met kinderen</a>.</p>`,
  bronnen: [
    { t: 'Alicante Plaza: uitvoering van de Ley de Libertad Educativa (certificaat en vrijstelling Valenciaans)', u: 'https://alicanteplaza.es/alicanteplaza/comunitat-valenciana/rovira-defiende-la-ley-de-libertad-educativa-ha-recuperado-derechos-de-las-familias' },
  ],
  gecontroleerd: '2026-10-22',
},
{
  slug: 'emigreren-met-kinderen',
  cat: 'gezin',
  titel: 'Emigreren met kinderen naar Spanje: een checklist',
  beschrijving: 'Wat je regelt voor vertrek, in de eerste weken en in de eerste maanden, als je met kinderen naar de Costa Blanca Zuid verhuist.',
  kort: [
    'Begin met de school: die bepaalt in welke buurt je zoekt.',
    'Neem internationale uittreksels, schoolgegevens en een vaccinatieoverzicht mee.',
    'Schrijf je na aankomst eerst in bij de gemeente; veel volgende stappen hangen daarvan af.',
  ],
  body: `
<p>Met kinderen verhuizen vraagt om meer voorbereiding dan alleen het huis. Deze lijst helpt je de dingen in een logische volgorde te regelen. Het is algemene informatie; jouw situatie kan om andere stappen vragen.</p>
<h2>Ruim voor vertrek</h2>
<ul>
  <li><strong>Oriënteer je op scholen</strong> en ga kijken als het kan. Lees <a href="/gids/naar-school-costa-blanca-zuid/">Naar school aan de Costa Blanca Zuid</a>.</li>
  <li><strong>Kies daarna pas de buurt.</strong> Een school op loop- of fietsafstand maakt het dagelijks leven veel eenvoudiger.</li>
  <li><strong>Vraag internationale (meertalige) uittreksels aan</strong> van geboorteakten en, als het van toepassing is, je huwelijksakte.</li>
  <li><strong>Vraag de huidige school</strong> om een overzicht van de schoolloopbaan en de laatste rapporten.</li>
  <li><strong>Zorg voor een vaccinatieoverzicht</strong> en eventuele medische gegevens van de kinderen.</li>
  <li><strong>Regel de zorgverzekering</strong> voor het hele gezin vanaf de verhuisdatum. Zie <a href="/gids/zorg-in-spanje/">Zorg in Spanje</a>.</li>
  <li><strong>Regel je uitschrijving</strong> in Nederland of België volgens de regels van je gemeente daar.</li>
</ul>
<h2>De eerste weken in Spanje</h2>
<ul>
  <li>Inschrijven bij de gemeente: de <a href="/gids/padron-inschrijven-gemeente/">padrón</a>.</li>
  <li>Inschrijven als EU-burger bij de politie, binnen drie maanden. Zie <a href="/gids/inschrijven-als-eu-burger/">Inschrijven als EU-burger</a>.</li>
  <li>De kinderen aanmelden op school, als dat nog niet gedaan is.</li>
  <li>Een huisarts en zorgpas regelen.</li>
  <li>Een Spaanse bankrekening en telefoonnummer.</li>
</ul>
<h2>De eerste maanden</h2>
<ul>
  <li><strong>Sport en clubs.</strong> Een voetbal-, zwem- of dansclub is voor kinderen de snelste weg naar vriendjes en de taal.</li>
  <li><strong>Spaans voor de ouders.</strong> Het maakt het contact met school en andere ouders veel makkelijker.</li>
  <li><strong>Geduld met de overgang.</strong> De eerste maanden op een Spaanse school zijn voor veel kinderen zwaar, daarna gaat het vaak snel.</li>
  <li><strong>Houd het Nederlands bij</strong> als jullie misschien ooit teruggaan, bijvoorbeeld met lessen op afstand.</li>
</ul>
<h2>Wat het woonkompas vraagt</h2>
<p>In het <a href="/#woonwijzer">woonkompas</a> vragen we naar de leeftijden van de kinderen, het soort school dat je overweegt en wat ze graag dichtbij hebben. Zo zie je welke plaatsen passen bij jullie gezin.</p>`,
  bronnen: [],
  gecontroleerd: '2026-10-22',
},

/* ------------------------------------------------------------------ ZORG */
{
  slug: 'zorg-in-spanje',
  cat: 'zorg',
  titel: 'Zorg in Spanje: hoe ben je verzekerd?',
  beschrijving: 'Met pensioen, via werk of particulier: de drie routes naar zorg als je aan de Costa Blanca Zuid gaat wonen, en wat er verandert.',
  kort: [
    'Met een Nederlands pensioen of uitkering loopt de zorg meestal via het CAK, met een S1-formulier.',
    'Wie in Spanje werkt, valt onder de Spaanse sociale zekerheid.',
    'Anders heb je een particuliere zorgverzekering nodig, die ook voor je inschrijving telt.',
    'Ben je hier tijdelijk, dan houd je je eigen verzekering en gebruik je de Europese zorgpas.',
  ],
  body: `
<p>Zorg is een van de dingen die je goed geregeld wilt hebben vóór je verhuist. Hoe je in Spanje verzekerd bent, hangt vooral af van je inkomen: pensioen, werk of eigen middelen.</p>
<h2>Route 1: met pensioen of een uitkering uit Nederland</h2>
<p>Woon je in een EU-land zoals Spanje en heb je een Nederlands pensioen of een Nederlandse uitkering, dan regel je je zorgverzekering in de regel via het <strong>CAK</strong>. Het CAK beoordeelt je aanvraag en stuurt je een <strong>S1-formulier</strong>. Daarmee schrijf je je in bij de Spaanse zorg. Je betaalt een verdragsbijdrage, die meestal automatisch wordt ingehouden op je pensioen of uitkering.</p>
<p><strong>Let op bij vervroegd pensioen.</strong> In 2026 werd aangekondigd dat de toegang via het CAK mogelijk wordt beperkt tot wettelijke regelingen, zoals de AOW. Vervroegd pensioen en vergelijkbare regelingen zouden dan niet meer meetellen; wie al bij het CAK is ingeschreven, houdt zijn rechten. Ga bij het CAK na wat voor jou geldt voordat je verhuist.</p>
<p>Met een <strong>Belgisch pensioen</strong> loopt de aanvraag van het S1-formulier via je ziekenfonds.</p>
<h2>Route 2: je werkt in Spanje</h2>
<p>Werk je in loondienst bij een Spaanse werkgever of als zelfstandige (<em>autónomo</em>) in Spanje, dan betaal je premie aan de Spaanse sociale zekerheid en ben je daarmee verzekerd voor de openbare zorg. Werk je op afstand voor een werkgever in Nederland of België, lees dan <a href="/gids/werken-op-afstand-vanuit-spanje/">Werken op afstand vanuit Spanje</a>.</p>
<h2>Route 3: particulier verzekerd</h2>
<p>Valt geen van beide routes voor je open, dan sluit je een <strong>particuliere zorgverzekering</strong> af. Die is ook nodig voor je <a href="/gids/inschrijven-als-eu-burger/">inschrijving als EU-burger</a>: je moet dan aantonen dat je in Spanje volledig verzekerd bent. Let op wachttijden, uitsluitingen voor bestaande aandoeningen en eigen bijdragen. Na een periode van inschrijving in de gemeente kan ook een betaalde aansluiting bij de openbare zorg mogelijk zijn (het <em>convenio especial</em>); vraag naar de voorwaarden en de maandelijkse bijdrage.</p>
<h2>Tijdelijk in Spanje</h2>
<p>Overwinter je, of verblijf je hier maar een deel van het jaar, dan blijf je meestal verzekerd in Nederland of België. Met de Europese zorgpas (EHIC) heb je recht op medisch noodzakelijke zorg in de openbare zorg. Lees ook <a href="/gids/overwinteren-of-emigreren/">Overwinteren of emigreren</a>.</p>
<h2>In de praktijk</h2>
<ul>
  <li>Na je inschrijving bij de openbare zorg krijg je een zorgpas van de Comunitat Valenciana, de <strong>SIP-kaart</strong>, en word je ingedeeld bij een gezondheidscentrum.</li>
  <li>De regio heeft openbare ziekenhuizen in onder meer Torrevieja en Orihuela, en ook particuliere klinieken. Op onze <a href="/costa-blanca-zuid/#kaart">kaart</a> zie je hoe ver ze van elke plaats liggen.</li>
  <li>Spreek je nog geen Spaans? Vraag naar tolken; die zijn er niet overal.</li>
</ul>`,
  bronnen: [
    { t: 'Nederland Wereldwijd: zorgverzekering via het CAK', u: 'https://www.nederlandwereldwijd.nl/zorgverzekering-buitenland/zorgverzekering-via-cak' },
    { t: 'Welingelichte Kringen: aangekondigde wijziging CAK-regeling voor vervroegd pensioen', u: 'https://www.welingelichtekringen.nl/economie/zoveel-kost-een-zorgverzekering-in-spanje-portugal-of-frankrijk-als-60-plusser-nu-het-cak-wegvalt' },
  ],
  gecontroleerd: '2026-10-22',
},

/* ------------------------------------------------------------------ LEVEN */
{
  slug: 'maandlasten-wonen-spanje',
  cat: 'leven',
  titel: 'Wat kost wonen per maand aan de Costa Blanca Zuid?',
  beschrijving: 'Van IBI en comunidad tot zorg en school: alle vaste lasten op een rij, en een rekenhulp om je eigen situatie door te rekenen.',
  kort: [
    'De koopprijs is één ding; de maandlasten bepalen of je hier prettig leeft.',
    'Vaste posten zijn onder meer de gemeentelijke IBI, afvalheffing, de VvE-bijdrage (comunidad), energie en verzekeringen.',
    'Zorg, school en een auto maken voor gezinnen vaak het grootste verschil.',
    'Reken het zelf door met de maandlastencalculator.',
  ],
  body: `
<p>Veel mensen rekenen bij een woning in Spanje vooral met de koopprijs. Toch is het de maandelijkse rekening die bepaalt hoe ontspannen je hier leeft. Dit zijn de posten om rekening mee te houden. Bedragen verschillen sterk per woning en per gemeente, daarom noemen we ze hier niet. <a href="/maandlasten/">Met de calculator</a> reken je je eigen situatie door.</p>
<h2>Wonen</h2>
<ul>
  <li><strong>IBI:</strong> de jaarlijkse gemeentelijke onroerendgoedbelasting, gebaseerd op de kadastrale waarde.</li>
  <li><strong>Afvalheffing (basura):</strong> een jaarlijkse gemeentelijke heffing, soms gecombineerd met de waterrekening.</li>
  <li><strong>Comunidad:</strong> de bijdrage aan de vereniging van eigenaren bij een appartement of in een urbanisatie met gedeeld zwembad of groen. Vraag altijd naar de begroting en naar geplande extra bijdragen.</li>
  <li><strong>Verzekering:</strong> opstal en inboedel.</li>
</ul>
<h2>Energie en water</h2>
<ul>
  <li><strong>Stroom:</strong> airco in de zomer en elektrische verwarming in de winter. Veel woningen hebben geen centrale verwarming; een goed geïsoleerde woning scheelt.</li>
  <li><strong>Water:</strong> afhankelijk van verbruik, tuin en zwembad.</li>
  <li><strong>Gas:</strong> soms via losse flessen butaan.</li>
</ul>
<h2>Leven</h2>
<ul>
  <li><strong>Zorg:</strong> via het CAK met je pensioen, via werk of particulier. Zie <a href="/gids/zorg-in-spanje/">Zorg in Spanje</a>.</li>
  <li><strong>School:</strong> openbaar onderwijs is kosteloos; internationale scholen vragen schoolgeld.</li>
  <li><strong>Auto:</strong> verzekering, brandstof, wegenbelasting en de periodieke keuring (ITV). In de urbanisaties is een auto vaak onmisbaar.</li>
  <li><strong>Internet en telefoon.</strong></li>
  <li><strong>Boodschappen en dagelijks leven.</strong></li>
</ul>
<h2>Woon je er niet officieel?</h2>
<p>Gebruik je de woning als tweede huis en ben je geen fiscaal inwoner van Spanje, dan doe je jaarlijks aangifte als niet-inwoner over de woning. Laat je daarover adviseren.</p>
<h2>Tip</h2>
<p>Vraag bij een woning die je overweegt altijd naar de recente rekeningen van IBI, basura, comunidad, water en stroom. Dan reken je met echte bedragen in plaats van schattingen.</p>`,
  bronnen: [],
  gecontroleerd: '2026-10-22',
},
{
  slug: 'klimaat-costa-blanca-zuid',
  cat: 'leven',
  titel: 'Klimaat aan de Costa Blanca Zuid: zo voelt het jaar',
  beschrijving: 'Zonuren, temperatuur en regen volgens AEMET, en wat dat betekent voor wonen: van koele winterhuizen tot de herfstbuien.',
  kort: [
    'Rond Alicante schijnt de zon gemiddeld zo\'n 2.850 uur per jaar.',
    'Gemiddeld is het er over het jaar 18 °C: rond 12 °C in januari en 26 °C in augustus.',
    'Het regent weinig, maar in de herfst kunnen hevige buien vallen.',
    'Houd bij een woning rekening met hitte in de zomer en vochtige, koele nachten in de winter.',
  ],
  body: `
<p>Het klimaat is voor veel mensen de reden om naar de zuidelijke Costa Blanca te komen. De cijfers hieronder komen van het Spaanse weerinstituut AEMET, gemeten op de luchthaven van Alicante over de periode 1981 tot 2010.</p>
<h2>De cijfers</h2>
<ul>
  <li><strong>Zon:</strong> gemiddeld ongeveer 2.850 uur per jaar.</li>
  <li><strong>Temperatuur:</strong> gemiddeld 18,3 °C over het jaar; 11,7 °C in januari en 26,0 °C in augustus.</li>
  <li><strong>Regen:</strong> ongeveer 311 mm per jaar, verdeeld over zo'n 38 dagen.</li>
</ul>
<p>Ter vergelijking: in Nederland en België valt jaarlijks meer dan twee keer zoveel regen.</p>
<h2>Wat betekent dat voor wonen?</h2>
<h3>Zomer</h3>
<p>Juli en augustus zijn warm en vaak benauwd, ook 's nachts. Airco in de slaapkamers is geen luxe. Een woning op het noorden of oosten, met schaduw op het terras, is in de zomer prettiger dan je in de winter zou denken.</p>
<h3>Winter</h3>
<p>Overdag is het in de winter vaak zonnig en mild. 's Nachts koelt het af, en veel Spaanse huizen zijn gebouwd om warmte buiten te houden, niet binnen. Zonder isolatie en verwarming voelt een huis in januari kil en vochtig. Vraag dus naar isolatie, dubbel glas en hoe de woning verwarmd wordt.</p>
<h3>Kust of achterland</h3>
<p>Aan de kust temperen de zee en de wind de uitersten. In het achterland, zoals rond Dolores of San Miguel de Salinas, kan het 's zomers warmer en in winternachten koeler zijn.</p>
<h3>De herfstbuien</h3>
<p>In het najaar kan in korte tijd heel veel regen vallen, een verschijnsel dat in Spanje DANA of <em>gota fría</em> heet. Lage delen van de Vega Baja langs de Segura zijn daar gevoelig voor. De Generalitat Valenciana heeft daarvoor een kaart met risicogebieden (PATRICOVA). Laat bij een woning in een laaggelegen gebied nagaan hoe het daarmee zit.</p>`,
  bronnen: [
    { t: 'AEMET: klimatologische normaalwaarden Alicante/Alacant, 1981–2010', u: 'https://www.aemet.es/es/serviciosclimaticos/datosclimatologicos/valoresclimatologicos?l=8025' },
  ],
  gecontroleerd: '2026-10-22',
},
{
  slug: 'overwinteren-of-emigreren',
  cat: 'leven',
  titel: 'Overwinteren of emigreren: waar ligt de grens?',
  beschrijving: 'Drie maanden, acht maanden, 183 dagen: welke grenzen gelden als je een deel van het jaar of het hele jaar in Spanje woont.',
  kort: [
    'Tot drie maanden in Spanje hoef je je niet in te schrijven.',
    'Blijf je langer dan drie maanden, dan schrijf je je in als EU-burger.',
    'Wie meer dan 183 dagen per jaar in Spanje is, wordt doorgaans fiscaal inwoner van Spanje.',
    'Verblijf je als Nederlander langer dan acht maanden per jaar in het buitenland, dan schrijf je je uit in Nederland.',
  ],
  body: `
<p>Tussen een paar weken vakantie en definitief verhuizen zit een groot grijs gebied. Juist daar maken veel mensen keuzes zonder te weten welke regels gelden. Dit zijn de grenzen om te kennen. Het is een algemene schets; laat je voor je eigen situatie altijd adviseren.</p>
<h2>Drie maanden: inschrijven in Spanje</h2>
<p>Als EU-burger mag je zonder formaliteiten tot drie maanden in Spanje verblijven. Blijf je langer, dan schrijf je je in in het register voor buitenlanders. Zie <a href="/gids/inschrijven-als-eu-burger/">Inschrijven als EU-burger</a>.</p>
<h2>183 dagen: belasting</h2>
<p>Wie in een kalenderjaar meer dan 183 dagen in Spanje verblijft, wordt doorgaans fiscaal inwoner van Spanje. Ook waar je economische belangen liggen, telt mee. Fiscaal inwoner zijn betekent dat Spanje je wereldinkomen belast, met verdragen die dubbele belasting voorkomen. Voor pensioen, vermogen en bezittingen in het buitenland gelden eigen regels. Dit is het moment voor een fiscaal adviseur, bij voorkeur vóór je verhuist.</p>
<h2>Acht maanden: uitschrijven in Nederland</h2>
<p>Ga je als Nederlander naar verwachting langer dan acht maanden binnen een jaar in het buitenland wonen, dan schrijf je je uit bij je gemeente. Dat heeft gevolgen, onder meer voor je zorgverzekering en de opbouw van je AOW. In België gelden andere regels; vraag ze na bij je gemeente.</p>
<h2>Wat betekent dit in de praktijk?</h2>
<ul>
  <li><strong>Overwinteren, enkele maanden:</strong> je blijft ingeschreven en verzekerd in Nederland of België. Je gebruikt in Spanje de Europese zorgpas. Een NIE heb je wel nodig als je hier een woning koopt.</li>
  <li><strong>Langer dan drie maanden, maar minder dan een half jaar:</strong> inschrijving in Spanje is verplicht, al ben je fiscaal vaak nog geen inwoner.</li>
  <li><strong>Het grootste deel van het jaar of permanent:</strong> je verhuist ook administratief, met gevolgen voor belasting, zorg en je sociale zekerheid.</li>
</ul>
<h2>Twijfel je nog?</h2>
<p>Veel mensen beginnen met overwinteren en beslissen later. Kies dan een woning en plaats die in beide gevallen werken: een buurt die ook in de winter leeft, en een huis dat je in de zomer koel en in de winter warm kunt houden. Lees ook <a href="/gids/klimaat-costa-blanca-zuid/">Klimaat aan de Costa Blanca Zuid</a>.</p>`,
  bronnen: [],
  gecontroleerd: '2026-10-22',
},
{
  slug: 'werken-op-afstand-vanuit-spanje',
  cat: 'leven',
  titel: 'Werken op afstand vanuit Spanje: waar denk je aan?',
  beschrijving: 'Belasting, sociale zekerheid, internet en een werkplek: wat je regelt als je vanaf de Costa Blanca Zuid voor Nederland of België werkt.',
  kort: [
    'Als EU-burger mag je in Spanje wonen en werken, zonder visum.',
    'Werk je vanuit Spanje voor een Nederlandse of Belgische werkgever, dan verschuiven belasting en sociale zekerheid vaak naar Spanje.',
    'Bespreek je plannen vroeg met je werkgever en een adviseur.',
    'Kijk bij een woning naar glasvezel, een rustige werkplek en een plan voor de zomerhitte.',
  ],
  body: `
<p>Steeds meer mensen nemen hun werk mee naar Spanje. Dat kan prima, maar het is meer dan een laptop meenemen. Vooral voor belasting en sociale zekerheid maakt het uit waar je fysiek werkt.</p>
<h2>Regels: belasting en sociale zekerheid</h2>
<p>Als EU-burger heb je geen visum of werkvergunning nodig. De vraag is vooral waar je belasting en premies betaalt.</p>
<ul>
  <li><strong>Belasting:</strong> woon je het grootste deel van het jaar in Spanje, dan word je doorgaans fiscaal inwoner van Spanje. Zie <a href="/gids/overwinteren-of-emigreren/">Overwinteren of emigreren</a>.</li>
  <li><strong>Sociale zekerheid:</strong> binnen de EU geldt als uitgangspunt dat je verzekerd bent in het land waar je werkt. Werk je volledig vanuit Spanje, dan is dat vaak Spanje, ook als je werkgever in Nederland of België zit. Er bestaan uitzonderingen, bijvoorbeeld voor tijdelijke detachering of als je deels in je thuisland blijft werken.</li>
  <li><strong>Je werkgever:</strong> die krijgt mogelijk met Spaanse verplichtingen te maken. Bespreek het daarom vroeg, en niet pas na de verhuizing.</li>
  <li><strong>Zelfstandig:</strong> werk je als zelfstandige vanuit Spanje, dan schrijf je je doorgaans in als <em>autónomo</em>.</li>
</ul>
<p>Dit is een vereenvoudigde schets. Laat je adviseren door een specialist in grensoverschrijdend werken, in Nederland of België én in Spanje.</p>
<h2>Praktisch: de woning als werkplek</h2>
<ul>
  <li><strong>Internet:</strong> vraag na of er glasvezel op het adres ligt, en welke aanbieders er zijn. Dat verschilt per straat en per urbanisatie.</li>
  <li><strong>Een eigen werkplek:</strong> een extra slaapkamer of studio met een deur die dicht kan.</li>
  <li><strong>Hitte:</strong> in juli en augustus wil je een werkplek met airco of aan de koele kant van het huis.</li>
  <li><strong>Reizen:</strong> moet je regelmatig naar kantoor? Kijk dan naar de afstand tot de luchthavens van Alicante en Murcia. Op onze <a href="/costa-blanca-zuid/#kaart">kaart</a> zie je die per plaats.</li>
  <li><strong>Tijdzone:</strong> Spanje heeft dezelfde tijd als Nederland en België, dus vergaderingen schuiven niet.</li>
</ul>`,
  bronnen: [],
  gecontroleerd: '2026-10-22',
},

/* ------------------------------------------------------------------ KOPEN */
{
  slug: 'kopen-in-zes-stappen',
  cat: 'kopen',
  titel: 'Een huis kopen in Spanje in zes stappen',
  beschrijving: 'Van NIE tot notaris: de volgorde van een woningaankoop in Spanje, en waar je bij elke stap op let.',
  kort: [
    'Kopen in Spanje is niet moeilijker dan in Nederland of België, wel anders.',
    'Laat een onafhankelijke advocaat de juridische controle doen.',
    'Reken bovenop de koopprijs op ongeveer 10 tot 13% aan belastingen en kosten; laat het vooraf precies uitrekenen.',
  ],
  body: `
<p>Wie de volgorde kent, voorkomt de meeste verrassingen. Dit zijn de zes stappen van een woningaankoop in Spanje.</p>
<h2>1. Voorbereiden</h2>
<p>Vraag een <a href="/gids/nie-nummer/">NIE</a> aan en open een Spaanse bankrekening. Bepaal je budget, inclusief de kosten bovenop de prijs en de <a href="/gids/maandlasten-wonen-spanje/">maandlasten</a>. Wil je financieren: Spaanse banken lenen aan niet-inwoners meestal een kleiner deel van de woningwaarde dan je gewend bent.</p>
<h2>2. Zoeken en bezichtigen</h2>
<p>Begin met je wensen, niet met het aanbod. Het <a href="/#woonwijzer">woonkompas</a> helpt daarbij. Bekijk een buurt op verschillende momenten: in de winter is het leven aan de kust anders dan in augustus.</p>
<h2>3. Bod en reservering</h2>
<p>Je bod gaat via de makelaar. Bij akkoord volgt vaak een reservering met een kleine aanbetaling, zodat de woning van de markt gaat terwijl de controles lopen.</p>
<h2>4. Juridische controle</h2>
<p>Laat een onafhankelijke advocaat (<em>abogado</em>) nagaan of de verkoper echt eigenaar is, of er hypotheken of beslagen op de woning rusten (via de <em>nota simple</em>), of het kadaster klopt met wat er staat, of aanbouwen vergund zijn, en of IBI en comunidad betaald zijn.</p>
<h2>5. Koopcontract</h2>
<p>In het voorlopige koopcontract (<em>contrato de arras</em>) betaal je een aanbetaling, vaak rond 10% van de prijs. Bij de gebruikelijke vorm verlies je die als je zelf afziet van de koop; trekt de verkoper zich terug, dan betaalt hij het dubbele terug.</p>
<h2>6. Bij de notaris</h2>
<p>Je tekent de akte (<em>escritura</em>) bij de notaris, betaalt het restant en krijgt de sleutels. Daarna volgen de inschrijving in het eigendomsregister, de belastingen en het overschrijven van water, stroom en internet. Kun je er niet bij zijn, dan kan het met een volmacht.</p>
<h2>De kosten bovenop de prijs</h2>
<p>Als vuistregel komt er ongeveer 10 tot 13% bij aan belastingen en kosten. Bij een bestaande woning gaat het om de overdrachtsbelasting (ITP); bij nieuwbouw om btw (IVA) en zegelrecht (AJD). Daarnaast betaal je de notaris, het eigendomsregister en de advocaat. Tarieven veranderen, dus laat het voor jouw aankoop vooraf precies uitrekenen.</p>
<h2>Zes valkuilen</h2>
<ul>
  <li>Kopen zonder onafhankelijke juridische controle.</li>
  <li>Een aanbouw, overkapping of zwembad zonder vergunning, dat niet in het kadaster staat.</li>
  <li>Een buurt alleen in het hoogseizoen bekijken.</li>
  <li>De jaarlasten onderschatten, vooral in urbanisaties met gedeelde voorzieningen.</li>
  <li>Rekenen op verhuur zonder te weten dat toeristische verhuur in de Comunitat Valenciana registratie en regels kent.</li>
  <li>Bij nieuwbouw niet vragen naar de bankgarantie (<em>aval</em>) op je aanbetalingen.</li>
</ul>`,
  bronnen: [],
  gecontroleerd: '2026-10-22',
},
{
  slug: 'urbanisatie-of-dorpskern',
  cat: 'kopen',
  titel: 'Urbanisatie of dorpskern: waar woon je eigenlijk?',
  beschrijving: 'Aan de Costa Blanca Zuid zegt de plaatsnaam weinig. Het verschil tussen een oude kern en een urbanisatie bepaalt je dagelijks leven.',
  kort: [
    'Een urbanisatie is een woonwijk buiten de oude kern, vaak met veel internationale bewoners.',
    'In de dorpskern woon je Spaanser, met winkels en cafés op loopafstand.',
    'Ga bij een urbanisatie na of de gemeente haar heeft overgenomen, en hoe hoog de comunidad is.',
  ],
  body: `
<p>Wie “Rojales” of “Orihuela” zegt, kan heel verschillende plekken bedoelen. Veel gemeenten aan de Costa Blanca Zuid bestaan uit een oude Spaanse kern en daaromheen een of meer <em>urbanizaciones</em>: woonwijken die vanaf de jaren zeventig zijn gebouwd, vaak voor kopers uit het buitenland. Het verschil tussen die twee is soms groter dan het verschil tussen twee dorpen.</p>
<h2>De dorpskern</h2>
<ul>
  <li>Spaanse buren, een plein, een markt en cafés op loopafstand.</li>
  <li>Het leven speelt zich op straat af, ook in de winter.</li>
  <li>Vaker oudere woningen, rijtjeshuizen en appartementen, minder vaak een zwembad.</li>
  <li>Spaans spreken helpt hier echt.</li>
</ul>
<h2>De urbanisatie</h2>
<ul>
  <li>Bungalows, villa's en appartementen, vaak met gedeeld zwembad en groen.</li>
  <li>Veel internationale bewoners; je redt je er vaak ook zonder Spaans.</li>
  <li>Voorzieningen zitten in een eigen centrum of langs de hoofdweg. Een auto is vaak nodig.</li>
  <li>Sommige delen zijn in de winter stiller, als tweede-huisbezitters weg zijn.</li>
</ul>
<h2>Waar je op let bij een urbanisatie</h2>
<ul>
  <li><strong>Is de urbanisatie overgenomen door de gemeente?</strong> Bij een overgenomen (<em>recepcionada</em>) urbanisatie onderhoudt de gemeente de straten, verlichting en riolering. Zo niet, dan kan dat bij de eigenaren liggen.</li>
  <li><strong>De comunidad:</strong> hoe hoog is de bijdrage, wat valt eronder, en zijn er grote uitgaven op komst?</li>
  <li><strong>Hoe leeft de buurt het jaar rond?</strong> Kom ook eens kijken in januari.</li>
  <li><strong>Hoe ver is het naar de dingen die je dagelijks nodig hebt</strong>, zoals een supermarkt, de huisarts of de school?</li>
</ul>
<h2>Bij welke gemeente hoort het?</h2>
<p>Ciudad Quesada hoort bij Rojales, Orihuela Costa bij Orihuela. Voor de <a href="/gids/padron-inschrijven-gemeente/">padrón</a>, de school en de belastingen ben je aangewezen op die gemeente, ook als het gemeentehuis een eind weg is. Op de pagina's over de <a href="/costa-blanca-zuid/">negen plaatsen</a> lees je per plaats hoe dat zit.</p>`,
  bronnen: [],
  gecontroleerd: '2026-10-22',
},
{
  slug: 'vragen-voor-de-makelaar',
  cat: 'kopen',
  titel: 'Acht vragen die je elke makelaar in Spanje kunt stellen',
  beschrijving: 'Met deze vragen herken je een makelaar die zorgvuldig werkt, en weet je wat een woning echt kost.',
  kort: [
    'In de Comunitat Valenciana horen makelaars ingeschreven te staan in het register RAICV.',
    'Vraag naar jaarlasten, vergunningen en een onafhankelijke advocaat.',
    'Neem je woonkompas mee: dan weet de makelaar snel wat je zoekt.',
  ],
  body: `
<p>Een goede makelaar beantwoordt deze vragen zonder aarzelen. Ze helpen je om een woning en een makelaar goed in te schatten.</p>
<ol>
  <li><strong>Bent u ingeschreven in het makelaarsregister van de Comunitat Valenciana (RAICV)?</strong> In deze regio is die inschrijving verplicht voor wie bemiddelt bij de verkoop van woningen.</li>
  <li><strong>Werkt u met een onafhankelijke advocaat voor de juridische controle?</strong> De advocaat werkt voor jou, niet voor de verkoper.</li>
  <li><strong>Wat zijn de jaarlasten van deze woning, inclusief comunidad en IBI?</strong> Vraag om de recente rekeningen.</li>
  <li><strong>Is alles wat ik zie ook vergund en ingeschreven?</strong> Denk aan een aanbouw, overkapping of zwembad.</li>
  <li><strong>Waarom verkoopt de eigenaar, en hoe lang staat de woning te koop?</strong></li>
  <li><strong>Welke kosten komen er voor mij bovenop de prijs?</strong> Zie <a href="/gids/kopen-in-zes-stappen/">Kopen in zes stappen</a>.</li>
  <li><strong>Hoe gaat het na de sleuteloverdracht?</strong> Helpt u met nutsvoorzieningen en inschrijvingen?</li>
  <li><strong>In welke taal kan ik met u en met de advocaat communiceren?</strong></li>
</ol>
<h2>Neem mee naar het eerste gesprek</h2>
<ul>
  <li>Je <a href="/#woonwijzer">woonkompas</a>: een overzicht van wat je zoekt, in je eigen woorden.</li>
  <li>Je budget, inclusief kosten, en hoe je wilt financieren.</li>
  <li>Wanneer je kunt komen kijken.</li>
</ul>`,
  bronnen: [],
  gecontroleerd: '2026-10-22',
},
];

/* Populaire vragen bovenaan de gids */
const POPULAIR = ['nie-nummer', 'naar-school-costa-blanca-zuid', 'zorg-in-spanje', 'maandlasten-wonen-spanje', 'overwinteren-of-emigreren'];

module.exports = { CATS, ARTIKELEN: A, POPULAIR };
