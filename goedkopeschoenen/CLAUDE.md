# GoedkopeSchoenen.com — Website-vernieuwing

Dit document bevat alle beslissingen en richtlijnen voor de vernieuwing van goedkopeschoenen.com,
zodat Claude (of elke ontwikkelaar) consistent kan bouwen zonder dat context verloren gaat.
Plaats dit bestand als `CLAUDE.md` in de root van het project.

## 1. Project in het kort

- **Winkel**: webshop met 750 producten in 18 categorieën (zie sectie 6 voor de volledige
  catalogusdata)
- **Doelgroep**: vooral dames; schoenen, tassen en accessoires, prijsklasse €8,99–€89,99
  (gemiddeld ~€30,62) — breed, prijsbewust, modegevoelig publiek — geen luxesegment
- **Positionering**: toegankelijk en vriendelijk, maar met een premium uitstraling — bewust
  ontworpen om de *perceived value* te verhogen zonder de prijzen aan te raken (zie sectie 3.4)
- **Referentiemerk**: Adidas — strak, grijs/zwart, met één doordachte accentkleur
- **Platform**: **Shopify** (bestaand, blijft het platform) + **ManyChat** voor chat/messaging
- **Scope van dit traject**: volledige vernieuwing — huisstijl, logo, homepage, navigatie,
  productpagina's, animaties, catalogus-integratie

## 2. Echte bedrijfsgegevens (geverifieerd op de huidige site)

Gebruik deze gegevens overal waar de site bedrijfsinformatie toont (footer, contactpagina,
vertrouwenssectie, structured data):

- **Bedrijfsnaam**: GoedkopeSchoenen.com
- **Adres**: Taminiausingel 15, 6662MD Elst
- **KvK-nummer**: 84772018
- **BTW-nummer**: NL863360324B01
- **Telefoon**: 06-19671591
- **E-mail**: info@goedkopeschoenen.com
- **Achtergrond**: opgericht in 2012, begonnen op beurzen (Huishoudbeurs, Libelle Zomerweek,
  Margriet Winterfair) en vanuit een garage; in 2023 samengevoegd met de voormalige
  tassenwebshop Goedkope-tassen.com tot één site

> Kiyoh-score (9,3 / 6.531 beoordelingen) en de huidige USP's (same-day verzending, Klarna,
> gratis verzending vanaf €65) zijn gebaseerd op eerdere analyse van de live site — controleer
> deze cijfers bij livegang, ze kunnen inmiddels gewijzigd zijn.

## 3. Huisstijl en merkidentiteit

### 3.1 Logo
- Los icoon/symbool **plus** de volledige naam ernaast (geen afkorting)
- Icoon: abstracte "speed stripes" — drie diagonale, afgeronde balken van aflopende lengte,
  de kortste (bovenste) in de accentkleur, de andere twee in het donkere basiszwart
- Strak en modern, geen letterlijke schoen-vorm (te cliché)
- Icoon moet los bruikbaar zijn: favicon, social media, tags
- Logo-typografie bouwt voort op de kop-typografie, zodat logo en site visueel één merk vormen
  (dit loste het probleem op dat het oude logo en de hero als twee verschillende merken aanvoelden)
- Subtiele hover-interactie: de drie balken schuiven licht uiteen bij hover over het logo
  (klein, geen knipoog-animatie — versterkt alleen dat het logo "leeft")

### 3.2 Kleuren
| Token | Hex | Gebruik |
|---|---|---|
| `--color-bg` | `#FAFAF8` | Hoofdachtergrond |
| `--color-surface-alt` | `#F0EEE8` | Kaarten, badges, subtiele vlakken |
| `--color-text-primary` | `#141413` | Koppen, hoofdtekst, logo |
| `--color-text-secondary` | `#5B5953` / `#8C8679` | Subtekst, labels |
| `--color-border` | `#E4E1D9` / `#EAE7E0` | Randen, scheidingslijnen |
| `--color-accent` | `#B5582E` | Terracotta/roestbruin — **spaarzaam**: CTA-knoppen, sale-badges, highlights |
| `--color-accent-hover` | `#99471F` | Hover-state van de accentkleur |

**Regel**: basis is grijs/zwart/wit. De accentkleur wordt bewust spaarzaam ingezet (CTA's,
badges, belangrijke highlights) — niet als decoratie door de hele pagina heen. Geen felle of
drukke kleuren.

### 3.3 Typografie
- **Koppen**: Archivo (geometrisch, zelfverzekerd, 700–800) — alternatief: Poppins
- **Body/productinfo**: Inter (400–600) — alternatief: Public Sans
- Google Fonts: `Archivo:wght@600;700;800` + `Inter:wght@400;500;600;700`

### 3.4 Validatie van de merkrichting (tegen het echte bedrijfsprofiel)
GoedkopeSchoenen.com is een **budget/value fashion-webshop** (gestart op de markt in 2012,
gemiddelde prijs ~€30), geen luxemerk. De gekozen richting is hier bewust tegen afgezet:

- Grijs/zwart + 1 gedempte accentkleur voorkomt het "rommelige budget-webshop"-gevoel (felle
  SALE-banners, veel kleuren door elkaar) en verhoogt de *perceived value* zonder prijsverhoging —
  bezoekers vertrouwen een nette site sneller met hun betaalgegevens
- Archivo + Inter is het juiste midden: niet "luxe-serif-pretentieus" (zou raar aanvoelen bij
  schoenen van €15–20) en niet "goedkoop/druk" — past bij deze prijsklasse
- Adidas als referentie is een bewuste keuze: een massamerk met zelfvertrouwen en rust in het
  design, geen luxemerk-referentie (dat zou een mismatch zijn geweest)
- **Aandachtspunt**: de site mag nooit zo minimalistisch/premium worden dat ze onbereikbaar/duur
  aanvoelt voor dit publiek — kortingsbadges, CTA's en reviews moeten zichtbaar en uitnodigend
  blijven, nooit wegversluierd worden door te veel witruimte

### 3.5 Sfeer en layout
- Rustige, overzichtelijke pagina's met voldoende witruimte
- Referentie voor structuur: groot fotografie-gebruik, rustige grid (zwart-wit portfolio-stijl)
- Productpagina-opzet: groot productbeeld, strak info-paneel, uitklapbare secties
  (Description/Delivery/Product Care)

## 4. Animaties en interactie

**Basisprincipe**: kort (200–400ms) en rustig — ondersteunt het premium/overzichtelijke gevoel,
leidt niet af. Nooit schokkerig of langdurig. Geen autoplay-carrousels (zie 4.6) — alles reageert
op een echte gebruikersactie (hover, scroll, swipe), niets schuift vanzelf door.

### 4.1 Staggered entrance- en scroll-animaties
- Hero: kop, badge, subtekst, CTA's en trustbalk komen staggered in beeld bij het laden
  (`fadeUp`, ~560ms, oplopende delay per element van ~90ms)
- Productkaarten: lichte fade + schuif omhoog zodra ze in beeld scrollen
- Vertrouwenselementen (Kiyoh-score, stats): zelfde staggered-kaartje-effect

### 4.2 Hover- en microinteracties
- Productkaarten: zachte schaal/lift (translateY + scale 1.015) + diepere schaduw bij hover
- Primaire/secundaire knoppen: "magnetische" hover — lichte lift (-2px) + groeiende schaduw in de
  accentkleur, pijl-icoon in de primaire knop schuift naar rechts, lichte scale-down bij :active
  voor tactiele feedback
- Icoon-knoppen (zoeken/account/winkelwagen): lichte lift bij hover, scale-down bij :active
- Navigatielinks: animerende underline die van links naar rechts intrekt bij hover (geen abrupte
  kleurwissel alleen)
- Mega-menu: zacht in-/uitfaden (opacity + translateY), nooit abrupt tonen/verbergen
- Reviewkaartjes: lichte lift + randkleur warmt op naar de accenttint bij hover
- Sale-badges: subtiele, langzame pulse (2,4s) — trekt net genoeg aandacht zonder druk te worden

### 4.3 Sticky header met scroll-gedrag
- Header begint transparant, direct over de hero
- Vanaf ~40px scrollen "dokt" hij vast: vervagende/halftransparante achtergrond met
  backdrop-blur, dunne onderrand, zachte schaduw, en iets compactere padding
- Transitie ~260ms, geen harde sprong

### 4.4 Scroll-reveal voor content onder de vouw
- Secties die pas later in beeld komen (productkaarten, statement-sectie, vertrouwensblokken)
  faden + schuiven pas in zodra ze echt in beeld scrollen (IntersectionObserver, threshold
  ~0.15), met een lichte stagger per item — niet meteen zichtbaar bij het laden van de pagina

### 4.5 Tellende statistieken ("count-up")
- Kernstats (bijv. "25.000+ tevreden klanten", "9,3 / 10" Kiyoh-score) tellen op van 0 naar hun
  eindwaarde zodra ze in beeld scrollen (IntersectionObserver + `requestAnimationFrame`,
  ease-out-cubic, ~1,3s), met een kleine "digit pop" bij het landen op de eindwaarde
- Geeft de donkere statement-sectie en de vertrouwenssectie een moment van leven zonder dat het
  om een zwaar visueel effect gaat

### 4.6 Subtiele sfeer-animaties (geen autoplay-content)
- Hero-productvlak: zeer langzaam verschuivende gradiënt-achtergrond (`background-position`,
  9s heen-en-terug) — een "levend" oppervlak zonder dat het als bewegend element opvalt
- Donkere statement-sectie: de terracotta gloed op de achtergrond verschuift licht mee met de
  scrollpositie (subtiele parallax, berekend uit de positie van de sectie t.o.v. het viewport)
- **Nadrukkelijk niet gedaan**: een autoplay-hero-banner-carrousel (het "3 banners die zelf
  doorschuiven"-patroon van veel budget-webshops) — voelt precies als het drukke/felle dat we
  bewust vermijden, en bezoekers missen vaak banner 2 en 3 voordat ze gelezen zijn

### 4.7 Swipe- en touch-interactie (mobiel)
Hover werkt niet op een touchscreen, dus overal waar de desktop-versie op hover leunt, is een
swipe-equivalent toegevoegd — met scroll-snap (`scroll-snap-type: x mandatory`), zonder
pijl-overlays en zonder autoplay:
- **Productfoto's**: swipe tussen hoofdfoto en 2e foto, met kleine dot-indicators onderin de
  foto (vervangt de hover-crossfade die op mobiel nooit te zien zou zijn)
- **Categorie-swipe-rail** op de homepage, net onder de hero: horizontaal swipebare rij met
  categorie-tegels (Sneakers / Laarzen & boots / Tassen / Accessoires / Sale) — voelt als door
  de winkel bladeren; de volgende tegel "piept" net zichtbaar aan de rand als swipe-hint
- **"Nieuw binnen"-grid**: op mobiel een horizontale snap-swipe-rij i.p.v. een gestapeld grid
- **Reviewsectie**: op mobiel een horizontale snap-swipe-rij i.p.v. 3 kaartjes onder elkaar

### 4.8 3D-elementen — bewust beperkt tot 1–2 plekken
- **Homepage-hero**: uitgelicht productvlak met 3D-tilt die meebeweegt met de muis
  (`perspective(900px)`, rotatie tot ±26° o.b.v. cursorpositie, met dynamische schaduw-diepte
  en twee zwevende infokaartjes die een lichte parallax meebewegen)
- **Productpagina** (nog te bouwen): 3D-rotatie/kanteling van het product bij hover of
  sleep-interactie
- Bewust niet overal toepassen — zo blijft de site overzichtelijk in plaats van druk

## 5. Homepage — opgebouwde onderdelen

Een eerste visueel, interactief ontwerp is uitgewerkt (zie het Design-artifact in het project).
Onderdelen:

1. **Aankondigingsbalk**: donkere strip bovenaan met vriendelijke micro-copy + USP's
   ("Zoolblij met elke bestelling — gratis verzending vanaf €65 · achteraf betalen met Klarna")
2. **Header**: logo + icoon links (met hover-interactie), navigatie
   (Schoenen/Tassen/Accessoires/Sale) centraal, zoek/account/winkelwagen-iconen rechts, sticky
   met scroll-gedrag (zie 4.3)
3. **Mega-menu** (bij "Schoenen"): 3 kolommen gegroepeerd per subthema
   (Sneakers / Laarzen & boots / Instappers & pantoffels) + een promo-blok met actuele actie —
   **moet herzien worden op basis van de echte 18 catalogus-categorieën, zie sectie 7.1**
4. **Hero**: Kiyoh-badge, kop + subtekst, primaire + secundaire CTA, trustrij (verzending/Klarna/
   same-day), productvlak met 3D-tilt, zacht bewegende achtergrond-gradiënt en twee zwevende
   infokaartjes
5. **Categorie-swipe-rail**: direct onder de hero, zie 4.7
6. **USP-balk**: donkere band met 4 vertrouwenspunten, met lichte hover-lift per item
7. **Productgrid "Nieuw binnen"**: 4 productkaarten met badges (Nieuw/sale-% met pulse/
   Bestseller), van-voor-prijzen, swipebare productfoto's met dot-indicators en "snel
   toevoegen"-knop
8. **Donkere statement-sectie**: tellende stat ("25.000+ tevreden klanten sinds 2012", count-up
   bij scroll) met een subtiele, scroll-gekoppelde terracotta gloed op de achtergrond — breekt
   het ritme tussen de lichte secties, tussen de productgrid en de vertrouwenssectie
9. **Vertrouwenssectie**: tellende Kiyoh-score (9,3/10) met sterren, 3 reviewkaartjes (swipebaar
   op mobiel), KvK/adres/btw-balk onderaan

### Responsive gedrag
- Hero-grid valt terug naar 1 kolom onder 860px, gecentreerd
- Mega-menu wordt verborgen onder 860px (hover werkt toch niet op touch) — **nog open: werkend
  mobiel alternatief**, bijv. accordion of fullscreen-menu (zie sectie 7.2)
- Productgrid en reviewsectie: horizontale snap-swipe-rij onder 860px i.p.v. stapelen (zie 4.7)
- Trust-sectie: 2 kolommen → 1 kolom onder 860px

## 6. Productcatalogus (echte data)

Aangeleverd als .xlsx met 750 producten, inclusief echte productfoto's (cdn-URL's), prijzen,
kleuren, maten en productpagina-links. Dit vervangt alle eerdere aannames over assortiment en
moet de basis zijn voor navigatie, filters en cross-sell.

**Samenvatting**: 750 producten totaal · 229 in de aanbieding · 730 op voorraad · 20 uitverkocht
Gemiddelde prijs €30,62 · laagste €8,99 · hoogste €89,99

**18 categorieën (Productsoort)** — de belangrijkste, naar grootte:

| Categorie | Aantal producten |
|---|---|
| Goedkope laarzen | 210 |
| Goedkope sneakers | 137 |
| Sale | 89 |
| Telefoontasjes/schoudertasjes | 82 |
| Boots festival | 69 |
| Middel/grote tassen | 54 |
| *(overige 12 categorieën, aflopend in grootte, o.a. Sieraden ~8, Goedkope boots ~2)* | kleiner |

**Belangrijke beslissing — "Vaak samen gekocht"**: cross-sell/related-products logica werkt
**alleen binnen dezelfde categorie** (Productsoort) — geen cross-categorie suggesties (bijv. geen
tassen tonen bij een schoenenproduct).

**Productfoto's — achtergrond-verwerking (nog niet definitief, nog niet uitgevoerd)**:
Voorstel is om bij elke productfoto de achtergrond te verwijderen en te vervangen door de warme
merk-gradiënt-achtergrond (dezelfde die nu in de hero/productkaart-placeholders wordt gebruikt),
voor visuele consistentie over de hele catalogus. Dit is besproken maar **nog niet goedgekeurd om
uit te voeren** — eerst zou een kleine testbatch gemaakt moeten worden voordat alle 750 foto's
verwerkt worden. Bekende blocker: de ontwikkelomgeving kon tijdens dit traject geen
achtergrond-verwijderingstools installeren door een netwerk/DNS-probleem richting PyPI — dit moet
opgelost worden (of via een andere tool/omgeving) voordat dit uitgevoerd kan worden.

## 7. Navigatie, collectiepagina, winkelwagen en footer — richting (voorstellen, nog niet gebouwd)

### 7.1 Mega-menu / categorie-indeling (herzien op basis van de echte 18 categorieën)
Niet alle 18 categorieën los in het menu (te druk) — clusteren in 4 hoofdgroepen:
- **Schoenen** (grootste groep): Sneakers, Laarzen, Boots festival, kleinere schoenen-categorieën
  samengevoegd onder "Overig schoenen"
- **Tassen**: Middel/grote tassen, Telefoontasjes/schoudertasjes, eventuele overige tassen-categorie
- **Accessoires**: sieraden + overige kleine categorieën
- **Sale**: los, opvallend menu-item (89 producten), geen submenu nodig

Binnen elke kolom: top 4–5 subcategorieën als links + 1 uitgelichte foto-tegel die naar de hele
kolom linkt (zoals Adidas vaak doet) — voorkomt veel bijna-lege linkjes door elkaar.

**Kleine categorieën** (bijv. "Goedkope boots" n=2, "Sieraden" n=8): **geen eigen menu-item** —
voelt leeg/onaf als iemand erop klikt. Samenvoegen onder "Overig" binnen de logische
hoofdcategorie, of alleen als filter op de collectiepagina laten bestaan zonder eigen
navigatie-ingang. Pas vanaf ~15–20 producten verdient een categorie een eigen zichtbare plek.

### 7.2 Collectiepagina — filterbalk
Filters: categorie (Productsoort), kleur, maat, prijsrange, "in de aanbieding"-toggle.
Sortering: nieuw, prijs laag-hoog/hoog-laag, populair. Bij een categorie met weinig producten
(<10): geen lege/zinloze filteropties tonen (bijv. geen maatfilter bij maar 2 producten) — filters
alleen tonen als ze echte keuze bieden binnen die set.

### 7.3 Winkelwagen (cart drawer) — richting
Rechts uitschuivend paneel (geen aparte pagina — sneller, past bij premium/strak): productfoto +
naam + maat/kleur, qty-stepper, subtotaal, gratis-verzending-progressiebalk ("nog €X voor gratis
verzending"), en onderin cross-sell: 2–3 producten uit **dezelfde categorie** als wat al in de kar
ligt (zelfde logica als "vaak samen gekocht", zie sectie 6).

### 7.4 Footer — richting
4 kolommen: (1) Klantenservice (contact, retourneren, verzending), (2) Over ons (incl. KvK/BTW,
niet alleen in de trust-strip), (3) Categorieën (5–6 belangrijkste), (4) Nieuwsbrief-inschrijving
+ social icons (met de juiste, gecorrigeerde links). Daaronder een smalle juridische regel
(privacy, voorwaarden, cookies).

## 8. Productpagina — huidige situatie (live site)

Geverifieerd op een echte productpagina: `/products/trendy-laarzen-met-slouchy-design-bruin`
(Trendy laarzen met slouchy design bruin, €39,99). Dit is de basis voor de nieuwe productpagina.

### Huidige opbouw
1. **Trustbalk boven**: Kiyoh-widget, "Op werkdagen voor 15:00 besteld: zelfde dag verzonden",
   "Achteraf betalen", bekendheid via beurzen/tijdschriften, gratis verzending vanaf €65
2. **Navigatie**: hoofdmenu (Goedkope Schoenen / Goedkope Tassen / Goedkope accessoires / Sale)
   met subcategorieën, promo-links ("Pantoffels 2 voor €24,99", "Boots festival 2 paar €50"),
   Contact/Retourportaal/Cadeaubon, social links (Facebook/Instagram/TikTok), skiplink
   "Meteen naar de content"
3. **Productgalerij**: 3 foto's, teller "1 / van 3", vergroot-knop "Media openen in modaal"
4. **Productkop en prijs**: titel, SKU (kleur+maatcode), prijsblok met labels "Normale prijs" /
   "Aanbiedingsprijs", btw-vermelding, "Aanbieding"-label, "Uitverkocht"-status
5. **Variantkeuzes**: kleur (bij dit product 1 optie), maatknoppen 36–41, elk met verborgen tekst
   "Variant uitverkocht of niet beschikbaar" voor toegankelijkheid
6. **Aankoopblok**: hoeveelheidsveld "Aantal (0 in winkelwagen)" met +/− knoppen, CTA
   "Aan winkelwagen toevoegen"
7. **Verzend-/servicekaarten**: levertermijn, PostNL + afhaalpunt-optie, verzendkosten
   (gratis vanaf €65, anders €5,99; sommige tassen €4,45), retourportaal-link, betaalmethoden
   (iDeal, Klarna, creditcard, Bancontact)
8. **Beschrijving en specificaties**: marketingtekst + concrete maten (bijv. "totale hoogte 28 cm
   incl. hak van 7 cm, schachtwijdte 40 cm bij maat 39")
9. **Delen**: "Link kopiëren", link "Alle details bekijken"
10. **Reviews en cross-sell**: Kiyoh-slider zonder zichtbare reviewteksten; **geen** gerelateerde
    producten of "Vaak samen gekocht"-sectie
11. **Footer**: klantenservicelinks, nieuwsbrief ("10% korting op je eerste aankoop"), landkeuze
    (BE/DE/NL, EUR), beleidspagina's

### Wat behouden moet blijven
- Verzend-/retour-/betaalkaarten direct naast de aankoopknop (PostNL, iDeal/Klarna/creditcard/
  Bancontact) — functioneel sterk
- Maatkeuze als knoppen met duidelijke uitverkocht-status per variant
- Concrete specificaties (hoogte, hakhoogte, schachtwijdte) — relevant voor een schoenenwebshop
- Deel-functie

### Wat moet verbeteren in het nieuwe ontwerp
- **Prijsblok**: toont nu altijd zowel "Normale prijs" als "Aanbiedingsprijs", ook als beide
  hetzelfde bedrag zijn (geen echte korting) — verwarrend. Nieuw: toon alleen een
  doorgestreepte van-prijs wanneer er daadwerkelijk korting is
- **Reviews ontbreken inhoudelijk**: alleen een lege Kiyoh-slider, geen reviewteksten zichtbaar
  op de productpagina zelf — mist het vertrouwenssignaal dat elders (9,3 Kiyoh-score) sterk is.
  Nieuw: zichtbare reviewcitaten met naam en sterrenscore, zoals in de vertrouwenssectie op de
  homepage
- **Geen cross-sell/upsell**: geen "Vaak samen gekocht" of gerelateerde producten, terwijl de
  winkelwagen-drawer dit patroon elders al goed doet. Nieuw: "Vaak samen gekocht"-sectie onderaan,
  **beperkt tot dezelfde categorie** (zie sectie 6)
- **Tegenstrijdige levertijd-copy**: bovenbalk zegt "zelfde dag verzonden", servicekaart zegt
  "morgen in huis" — op elkaar afstemmen tot één consistente belofte
- **Geen zoom/360°-weergave** van het product — i.c.m. de besproken 3D-tilt/rotatie-interactie
  een kans om het product beter te laten zien dan nu

### Richting voor het nieuwe ontwerp
- Groot productbeeld met 3D-tilt/rotatie-interactie bij hover (zie sectie 4.8)
- Strak info-paneel ernaast: titel, prijs (met correcte van-voor-logica), maatknoppen, CTA
- Verzend-/retour-/betaalkaarten behouden, visueel in de nieuwe huisstijl
- Uitklapbare secties voor Beschrijving / Specificaties / Verzending & retour (i.p.v. alles
  los onder elkaar)
- Zichtbare reviewsectie met echte citaten (niet alleen een widget)
- "Vaak samen gekocht"-sectie onderaan, binnen dezelfde categorie, voor de footer
- Consistente levertijd-copy door de hele pagina (en bij voorkeur site-breed)

## 9. Nog openstaand / vervolgstappen

### Pagina's die nog ontworpen moeten worden
- **Productpagina**: groot productbeeld, strak info-paneel, uitklapbare secties, 3D-productrotatie
  (zie sectie 8 voor de volledige richting)
- **Collectiepagina**: filterbalk + productgrid in de nieuwe stijl (richting in 7.2)
- **Winkelwagen (drawer)**: richting in 7.3 — visuele restyle in de nieuwe huisstijl
- **Footer**: richting in 7.4 — nog niet visueel uitgewerkt

### Functionaliteit/UX
- **Zoekfunctie met autosuggest**: live suggesties (producten + categorieën) i.p.v. een kale
  zoekbalk
- **Maattabel/size guide**: pop-up of uitklapper bij de maatkeuze op de productpagina
- **Favorieten/wishlist-knop**: hartje op productkaarten
- **Mobiele mega-menu-oplossing**: het mega-menu is nog verborgen onder 860px — moet een werkend
  alternatief krijgen, bijv. accordion of fullscreen-menu, met de herziene indeling uit 7.1
- **Breadcrumbs**: op product- en collectiepagina's, voor oriëntatie en SEO

### Content/copy en fotografie
- **SEO-blok herschrijven**: in het oorspronkelijke verbeterplan al gesignaleerd als té
  generiek/AI-geurig en herhalend
- **Newsletter-popup**: overwegen vs. bewust weglaten — past bij de keuze voor "niet te druk"
- **Echte productfotografie** in hero en productkaarten (nu placeholders) — incl. de nog niet
  goedgekeurde achtergrond-verwijdering/gradiënt-compositing, zie sectie 6
- **Echte reviewcitaten en klantnamen** i.p.v. placeholders in de vertrouwenssectie

### Polish/techniek
- **Loading/skeleton-states**: voorkomt lege flitsen tijdens laden
- **Cookie-banner in de huisstijl**: klein maar zichtbaar bij eerste bezoek
- **Stijl-consistentie-check**: spacing, afronding en schaduwdiepte overal gelijktrekken tussen
  secties
- **Kleurfilter normaliseren** op de collectiepagina (dubbele "Bruin"/"bruin"-varianten —
  datahygiëne, geen ontwerpwijziging)
- **Social media-links corrigeren** (Facebook verwees naar oude merknaam "mijnschoenenshop.nl")
- **Accessoires-tegel** toevoegen aan de Assortiment-sectie op de homepage

## 10. Technische context

- **Platform**: Shopify (bestaand platform, blijft gehandhaafd) + ManyChat voor chat/messaging
- Bestaande sterke punten om te behouden: winkelwagen-drawer met gratis-verzendingbalk en
  cross-sell met variantkeuze, Sale-collectie badge/van-voor-prijs-patroon (als basis voor het
  patroon dat nu overal wordt doorgevoerd)
- **Bouwmethode (beslist)**: Shopify-thema in Liquid + CSS + JS, in de map `theme/` (Online Store 2.0).
  Geen headless opzet en **niet bouwen met Lovable**.
- **ManyChat** heeft geen eigen thema-integratie: koppelen via het standaard ManyChat-embedsnippet in
  `layout/theme.liquid` of via de publieke ManyChat API (pas na de kern-layout).
- Checkout blijft Shopify's hosted checkout; branding via Checkout-instellingen in het Shopify-admin.

## 11. Bouwstatus van het thema (`theme/`)

**Gebouwd:** design tokens, topbalk, sticky header met mega-menu (desktop) en accordion (mobiel), live
zoeksuggesties, hero met 3D-tilt, USP-balk, assortiment-tegels, productgrid, reviews, nieuwsbrief,
footer, productpagina (galerij met tilt, varianten, uitklapbare secties, reviews, gerelateerde producten),
collectiepagina met filters, winkelwagen-drawer + -pagina met verzendbalk en cross-sell,
scroll-reveal en entrance-animaties.

**Nog te bouwen uit deze specificatie:** logo-hover (balken schuiven uiteen), tellende statistieken
(4.5), donkere statement-sectie, categorie-swipe-rail en snap-swipe-rijen op mobiel (4.7), sale-badge-pulse,
animerende nav-underline, maattabel/maatadvies-pagina, wishlist, breadcrumbs, skeleton-states,
cookie-banner, "Vaak samen gekocht" beperkt tot dezelfde Productsoort (nu Shopify-aanbevelingen),
mega-menu-indeling op basis van de 18 catalogus-categorieën, AI-functies (slimme zoek, beschrijvingen).
