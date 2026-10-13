# Technische documentatie GoedkopeSchoenen.com (voor Claude Code)

*2026-10-13*

## Project en context

Dit document bundelt alle beslissingen en specificaties die zijn uitgewerkt voor de volledige vernieuwing van goedkopeschoenen.com, als directe build-brief voor Claude Code. Het is bedoeld om zonder verdere toelichting mee te kunnen bouwen.

**Winkel:** Shopify-webshop, 750 producten (schoenen, tassen, accessoires), gericht op dames, prijsklasse €8,99–€90, Kiyoh-score 9,3 op 6.531 beoordelingen.

**Verhouding tot eerder werk:** de audit en het analysewerk staan uitgebreid in het document "Verbeterplan GoedkopeSchoenen.com" (https://claude.ai/code/artifact/57075957-870b-4617-877a-1a20a054c6f5). Dit document neemt de kernbevindingen en alle inmiddels goedgekeurde richtingen over in een vorm die direct bruikbaar is om te bouwen — per onderdeel (header, homepage, footer, productpagina, collectiepagina, winkelwagenpagina), inclusief merkidentiteit en animatieprincipes.

**Status:** alle onderdelen hieronder zijn besproken en akkoord bevonden door de opdrachtgever. De bouwmethode is inmiddels bepaald: zie "Techstack en bouwmethode" hieronder. Resterende open punten staan bij "Openstaande beslissingen" aan het eind van dit document.

## Techstack en bouwmethode

**Status: beslist.**

- **Shopify-thema in Liquid** (beslist; eerder overwogen headless-opzet met Lovable is vervallen): header, homepage, collectiepagina's, productpagina's en winkelwagen worden gebouwd als Online Store 2.0-thema in de map `theme/` van de repo (Liquid + CSS + vanilla JS). Productcatalogus, voorraad, betaalmethoden (Klarna/iDEAL), Storefront-filtering en zoeken komen rechtstreeks uit Shopify.
- **Geen Lovable voor de bouw**: Lovable wordt niet gebruikt om de site te maken.
- **Afrekenen (checkout) blijft bij Shopify**: de winkelwagenpagina en -drawer sturen bij "Afrekenen" door naar Shopify's eigen hosted checkout. Toelichting: zie "Bestelpagina (checkout)" onder Winkelwagenpagina.
- **ManyChat komt er apart bij** voor marketingautomatisering/berichten (bijv. WhatsApp- of Messenger-herinneringen). Dit is nog geen onderdeel van de paginabouw en wordt pas opgepakt na de kern-layout.

## Huidige situatie — audit samenvatting

**Wat al goed werkt** (behouden/uitbouwen):
- Kiyoh-score 9,3 op 6.531 reviews, zichtbaar met recente beoordelingen
- Duidelijke USP-balk (same-day verzending, Klarna achteraf betalen, gratis verzending vanaf €65)
- Overzichtelijke hoofdnavigatie (Schoenen / Tassen / Accessoires / Sale)
- Winkelwagen-drawer met voortgangsbalk gratis verzending en cross-sell met kleur-/maatkeuze
- Op de Sale-collectie bestaan al "Aanbieding"-badges en doorgestreepte van-prijzen — patroon bestaat dus al in het thema
- Contactpagina toont telefoon/WhatsApp, e-mail, adres, KvK en btw-nummer

**Grootste knelpunten:**
- Mega-menu oogt volledig onopgemaakt: platte tekstlijst zonder kolommen/styling
- Hero gebruikt ander lettertype dan het logo, geen koptekst of CTA
- Veel lege witruimte tussen secties (onder hero, onder reviews)
- Productkaarten op reguliere collecties missen badges/van-voor-prijs/hover (wel aanwezig op Sale)
- Assortiment-sectie toont geen Accessoires-tegel, terwijl dat wel een hoofdmenu-item is
- Kleurgebruik bijna volledig zwart-wit, geen doorvertaling van de warme productfotografie
- Kleurfilter bevat dubbele/ongenormaliseerde waarden ("Bruin"/"bruin")
- Social links verwijzen naar oude merknaam ("mijnschoenenshop.nl")
- "Over ons"-pagina bevat geen enkele afbeelding
- Collectiepagina "Goedkope kinderschoenen": voorraad-mismatches, afwijkende maatranges, NL/EN-mix in titels, foute interne links, inconsistente doelgroep-copy, gedupliceerde markup, generieke SEO-tekst

**Prioriteiten (hoog → laag):**

| Verbeterpunt | Prioriteit |
| --- | --- |
| Navigatie-dropdown (mega-menu) stylen | Hoog |
| Hero-sectie: typografie + duidelijke CTA | Hoog |
| Witruimte/lege secties opschonen | Hoog |
| Productkaarten consistent verrijken (badges, van/voor-prijs) | Midden |
| Accessoires-tegel toevoegen aan Assortiment-sectie | Midden |
| Vertrouwenselementen (KvK, adres, Kiyoh) breder inzetten | Midden |
| Accentkleur uit fotografie doortrekken naar knoppen/CTA's | Midden |
| Kleurfilter opschonen | Laag |
| Social media-links naar juiste merknaam | Laag |

Volledige detailanalyse per punt: zie het Verbeterplan-document.

## Merkidentiteit

Referentie: Adidas (strak, grijs/zwart met één doordachte accentkleur, maar toegankelijk). Toon: vriendelijk en toegankelijk, met een premium gevoel. Layout-richting: rustig en overzichtelijk met ruim witruimtegebruik; productpagina naar het voorbeeld van Veja (groot productbeeld, strak info-paneel, uitklapbare secties).

**Logo**
- Los icoon/symbool + de volledige merknaam ernaast (geen afkorting), strak en modern
- Icoon los bruikbaar als favicon/social media/tags
- Geen cliché schoen-vormen — abstracter en tijdlozer
- Logo-typografie bouwt voort op de kop-typografie, zodat logo en site visueel één merk voelen
- **Gekozen richting: "Tempo"** — drie oplopende, 18° gekantelde staafjes (twee antraciet/zwart, één terracotta) direct naast de wordmark "GoedkopeSchoenen" in Archivo 800. Gekozen uit vier uitgewerkte richtingen (Lens, Stride, Monogram, Tempo).

**Kleur**
- Basis: grijs/zwart, professioneel en modern
- Accentkleur: warme, gedempte terracotta/roestbruine tint (gekozen i.p.v. bordeauxrood; sluit aan bij de productfotografie)
- Accent spaarzaam en consequent: alleen CTA-knoppen, sale-badges en belangrijke highlights
- Geen felle of drukke kleuren

**Typografie**
- Koppen: strakke, geometrische sans-serif (bijv. Poppins, Archivo of vergelijkbaar) — zelfverzekerd, modern, Adidas-achtig
- Body/productinfo: neutrale, goed leesbare sans-serif (bijv. Inter of Public Sans)
- Eén lettertype-familie consistent voor logo, hero en koppen

## Header en navigatie

**Status: goedgekeurd, klaar om te bouwen.**

- Dunne, roterende topbalk (actuele acties/aankondigingen) in plaats van vaste links
- Rustige hoofdbalk: logo / navigatie / iconen (zoeken, account, winkelwagen)
- Sticky header die inkrimpt bij scrollen
- Live zoeksuggesties tijdens het typen
- Gestyled mega-menu in kolommen, gegroepeerd per subthema (bijv. Laarzen & boots / Sneakers / Instappers & pantoffels / Sale) — lost het huidige onopgemaakte platte-lijst-probleem op
- Populaire/actuele items uitgelicht in het mega-menu met kleine productfoto of badge
- Visuele consistentie: zelfde typografie, spacing en hover-states als de rest van de site
- Optioneel: vaste promo-afbeelding rechts in het mega-menu (bijv. "Pantoffels 2 voor €24,99")
- Terracotta-accent spaarzaam gebruikt
- Geen auto-doorlopende banners, countdown-timers of pop-ups bij binnenkomst (te opdringerig voor de premium uitstraling)

## Homepage

**Status: goedgekeurd, klaar om te bouwen.**

- Rustige hero met kop + CTA-knop (geen drukke fotocollage); zelfde lettertype-familie als het header-logo
- Korte, concrete kop met winkelbelofte (bijv. "vanaf €8,99" of de 9,3 Kiyoh-score direct in beeld als sociaal bewijs)
- Eén duidelijke CTA ("Shop nu" / "Bekijk de sale") naar de best lopende collectie
- Eventueel: kleine geroteerde selectie actuele acties i.p.v. statische collage, aansluitend op de topbalk
- Assortiment-sectie uitgebreid naar 3 tegels: Schoenen / Tassen / Accessoires (nu ontbreekt Accessoires)
- Productgrid met consistente badges en van/voor-prijzen (zelfde patroon als Sale-collectie)
- Compacter reviewsblok (Kiyoh-score zichtbaar boven de vouw, niet alleen onderaan)
- Nieuwsbriefblok met 10%-kortingsprikkel blijft
- Witruimte tussen secties strak houden — geen lege strook direct onder de header, laadgedrag van hero-afbeeldingen checken (lazy-loading kan lege ruimte veroorzaken)
- Alles blijft modern, professioneel en overzichtelijk

## Footer

**Status: goedgekeurd, klaar om te bouwen.**

4 kolommen:
1. Merk + Kiyoh-score (9,3 / 6.531 reviews)
2. Klantenservice, inclusief retourportaal
3. Shop-snelkoppelingen
4. Over ons / contactgegevens incl. KvK- en btw-nummer, adres

Onderbalk: nieuwsbrief, social-iconen (met gecorrigeerde link naar goedkopeschoenen.com i.p.v. "mijnschoenenshop.nl"), betaalmethode-iconen, taal/valuta, juridische links.

- Lichtgrijze achtergrond om de footer visueel af te bakenen van de rest van de pagina
- Terracotta-accent bij hover op links
- KvK/adres hier herhalen (naast de contactpagina) voor extra vertrouwen zonder dat bezoekers ernaar hoeven te zoeken

## Productpagina

**Status: goedgekeurd, klaar om te bouwen.**

- Foto's + infopaneel en vertrouwensblok (verzending/Klarna/iDeal) blijven zoals nu
- Beschrijving uitgebreider: concrete specs en materiaal
- Cross-sell-blok toegevoegd (ontbreekt nu op de productpagina, bestaat al in de winkelwagen-drawer — zelfde patroon hergebruiken, mét variantkeuze)
- Productspecifieke reviews of een prominentere algemene Kiyoh-score toevoegen
- Overweeg een voortgangsindicator voor gratis verzending al op de productpagina (niet alleen in de cart)
- Structuur naar Veja-voorbeeld: groot productbeeld, strak info-paneel, uitklapbare secties (Description/Delivery/etc.)
- 3D-rotatie/kanteling van de schoen bij hover of sleep-interactie (zie Animaties-sectie)

## Collectiepagina en productkaarten

**Status: goedgekeurd, klaar om te bouwen.**

- Bestaande Sale-patroon (badge + doorgestreepte van-prijs + rode aanbiedingsprijs) consistent toepassen op alle collecties, niet alleen Sale
- Extra badge-varianten: "Nieuw" (recent toegevoegd), "Bestseller" (op basis van verkoopdata)
- Hover-state op productkaarten: tweede productfoto of snel-toevoegen-knop
- Zachte schaal-vergroting + crossfade naar tweede productfoto bij hover (zie Animaties)
- Kiyoh-score/reviewaantal ook zichtbaar maken op de collectiepagina zelf
- Datahygiëne (geen ontwerpwijziging, wel noodzakelijk): kleurfilter normaliseren — "Bruin"/"bruin" en "Khaki"/"khaki" zijn nu losse filteropties door inconsistente producttags
- Specifiek voor de kinderschoenen-collectie: voorraadaantallen en maatranges corrigeren zodat productkaart en productpagina overeenkomen, titels consistent in één taal, interne links controleren, doelgroep-copy (baby/kind/peuter) consistent maken, gedupliceerde markup in beschrijvingen opruimen, SEO-teksten specifieker maken

## Winkelwagenpagina

**Status: goedgekeurd, klaar om te bouwen.**

- Gratis-verzendingbalk en cross-sell-blok (nu alleen in de drawer) ook op de volledige winkelwagenpagina overnemen
- Zelfde terracotta-stijl als de rest van de site
- Zachte animaties bij: product verwijderen, aantal wijzigen, voortgang van de verzendingbalk
- Site moet hier ook modern en toekomstgericht aanvoelen, niet alleen statisch

### Bestelpagina (checkout)

**Aanbevolen aanpak: geen eigen bestelpagina bouwen, maar doorsturen naar Shopify's hosted checkout.**

- Shopify Checkout is al PCI-compliant, ondersteunt Klarna/iDEAL/creditcard, en wordt automatisch onderhouden door Shopify — een eigen bestelpagina nabouwen is extra werk met extra risico (betaalgegevens, compliance) voor weinig voordeel.
- Op lagere Shopify-abonnementen mag de checkout bovendien niet volledig vervangen worden door een eigen pagina; alleen Shopify Plus biedt volledige checkout-extensibility (eigen secties/stappen in de checkout zelf).
- De klantreis wordt dus: winkelwagenpagina (eigen ontwerp, in het thema) → knop "Afrekenen" → Shopify's hosted checkout (betaling + bevestiging) → terug naar een eigen "Bedankt voor je bestelling"-pagina indien gewenst, of Shopify's standaard bevestigingspagina.
- Wat we wel zelf kunnen vormgeven: de kleuren, het logo en de typografie van de Shopify-checkout zelf, via de Checkout branding-instellingen in het Shopify-admin — zo voelt de checkout nog steeds als onderdeel van de site, ook al maakt hij geen deel uit van het thema.
- Welk Shopify-abonnement gebruikt wordt, bepaalt hoe ver deze branding kan gaan: goedkopeschoenen.nl gebruikt het bestaande Shopify-account/abonnement waar de huidige site al op draait — geen wijziging nodig.

## Animaties en interactie

Referentie: een rustigere, premium vertaling van staggered entrance-animaties en zachte hover-states.

**Basisprincipe**
- Kort en rustig: 200–400ms, geen schokkerige of langdurige effecten
- Subtiel en ingetogen — ondersteunt het overzichtelijke, premium gevoel, leidt niet af
- Bewust niet overal toepassen: zo blijft de site overzichtelijk en premium in plaats van druk

**Staggered entrance- en scroll-animaties**
- Hero: kop en CTA-knop staggered laten verschijnen bij het laden
- Productkaarten: lichte fade + schuif omhoog zodra ze in beeld scrollen (collectiepagina en homepage-grid)
- Vertrouwenselementen (Kiyoh-score, stats): zelfde staggered-kaartje-effect

**Hover- en microinteracties**
- Productkaarten: zachte schaal-vergroting + crossfade naar tweede productfoto bij hover
- Knoppen: subtiele hover (verdieping van de accentkleur, geen felle flits)
- Mega-menu: zacht in-/uitschuiven in plaats van abrupt tonen/verbergen

**3D-elementen — bewust beperkt tot 1-2 plekken**
- Homepage-hero: uitgelicht product met lichte 3D-tilt die subtiel meebeweegt met de muis
- Productpagina: 3D-rotatie/kanteling van de schoen bij hover of sleep-interactie
- Optioneel: lichte scroll-parallax op de hero-achtergrondfoto voor dieptegevoel

**Expliciet niet gebruiken:** auto-doorlopende carousels, countdown-timers, pop-ups bij binnenkomst van de site.

## Productdata

De volledige, live productcatalogus is opgehaald via de Shopify `/products.json`-endpoint (750 producten, dus de volledige winkel over schoenen/tassen/accessoires — niet alleen de collectie "Alle Goedkope Schoenen", die slechts 499 producten bevat).

Per product beschikbaar: handle, titel, productsoort, merk, prijs, van-prijs, in de aanbieding (ja/nee), op voorraad (ja/nee), kleuren, maten, link naar productfoto, link naar productpagina, toegevoegd op.

Geleverd als Excel-bestand ("GoedkopeSchoenen_productcatalogus.xlsx") met een samenvattingstabblad (totalen, gemiddelde/laagste/hoogste prijs). Te gebruiken om tijdens de build echte productdata, prijzen en foto's in te zetten in plaats van placeholder-content, en om datahygiëne-problemen (zoals bij de kinderschoenen-collectie) te verifiëren en te corrigeren.

## AI-functionaliteiten

**Status: akkoord, toe te voegen aan de scope.**

Drie AI-functies zijn gekozen om toe te voegen, gericht op concrete verbetering (minder retouren, betere vindbaarheid, betere content) in plaats van een AI-functie om het AI-label:

1. **Slimme zoekfunctie** — zoeken op omschrijving (bijv. "stevige winterboots onder €40") in plaats van alleen filteren op categorie/kleur, werkend over de volledige catalogus (750 producten). Bouwt voort op de live zoeksuggesties die al in de headerspecificatie staan.
2. **Productbeschrijvingen genereren en verbeteren** — AI gebruiken om voor alle producten unieke, concrete beschrijvingen te schrijven/herschrijven, en daarmee meteen de generieke SEO-vultekst en gedupliceerde markup op te lossen die bij de kinderschoenen-collectie zijn gesignaleerd.
3. **Maatadvies** — een los onderdeel dat helpt de juiste maat te kiezen, met als doel het aantal retouren te verlagen.

**Maatadvies krijgt een eigen pagina** (niet ingebed op de productpagina), modern en overzichtelijk vormgegeven, met dezelfde merkidentiteit (kleuren, typografie) als de rest van de site. Opzet:
- Stap 1: voet meten (lengte, eventueel breedte)
- Stap 2: pasvoorkeur (smal/normaal/breed)
- Stap 3: resultaat — geadviseerde maat met duidelijke call-to-action naar producten in die maat
- Duidelijke vermelding dat het een advies is, geen garantie, met link naar het retourbeleid

Deze pagina komt op de bouwvolgorde na de kernonderdelen (header t/m winkelwagenpagina).

## Bouwvolgorde

Elke stap kan los opgeleverd en beoordeeld worden voordat de volgende begint.

1. **Merkidentiteit als basis** — kleuren, typografie en logo vastleggen in het thema (design tokens), zodat alle volgende stappen hier direct op bouwen
2. **Navigatie-dropdown** herontwerpen (grootste zichtbare knelpunt, laagste bouwinspanning)
3. **Hero-sectie** vernieuwen (typografie, kop, CTA)
4. **Witruimte** in bestaande secties opschonen
5. **Productkaarten** consistent maken (badges/van-voor-prijs overal, niet alleen Sale) + hover-interactie
6. **Vertrouwenselementen** breder inzetten (Kiyoh-score, KvK/adres in footer)
7. **Homepage** samenvoegen tot eindversie (hero + assortiment + productgrid + reviews + nieuwsbrief)
8. **Footer** bouwen volgens specificatie
9. **Productpagina** uitbreiden (cross-sell, specs, reviews, 3D-interactie)
10. **Winkelwagenpagina** bouwen volgens specificatie (incl. doorverwijzing naar Shopify checkout)
11. **Animaties** laagsgewijs toevoegen per onderdeel (laatst, zodat de structuur eerst staat)
12. **Datahygiëne**: kleurfilter normaliseren, social media-links corrigeren, kinderschoenen-collectie opschonen (voorraad, maten, titels, links, copy, markup, SEO)
13. **AI-functies**: slimme zoekfunctie, AI-productbeschrijvingen, maatadvies-pagina

## Openstaande beslissingen

- [x] **Shopify-account**: opgelost — goedkopeschoenen.nl heeft al een bestaand Shopify-account waar de huidige site op draait; dat account/abonnement blijft gewoon in gebruik, geen wijziging nodig. Checkout-branding (logo/kleuren) gaat zo ver als dat bestaande abonnement toelaat.
- [x] **Logo-uitvoering**: opgelost — gekozen is "Richting D — Tempo" (drie gekantelde stroken, zie Merkidentiteit > Logo hierboven). Definitieve bestanden staan in `design/logo/` (icoon-PNG, volledig logo-WebP, icoon-SVG) en in `theme/assets/` (header, footer, favicon).
- [ ] **Stijlbord/mockup**: eerder aangegeven dat dit pas na de huisstijl-uitwerking zou komen — nog te bepalen of dit nu nog gemaakt wordt of dat er direct wordt doorgebouwd op basis van dit document
- [ ] **ManyChat-scope**: welke flows (bijv. orderupdates, verlaten-winkelwagen-herinneringen, klantenservice) ManyChat moet afhandelen is nog niet bepaald — pas op te pakken na de kern-layout
