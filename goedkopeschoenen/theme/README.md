# GoedkopeSchoenen.com — Shopify-thema

Online Store 2.0-thema (Liquid + CSS + vanilla JS), gebouwd volgens `CLAUDE.md` en `docs/Technische_documentatie.md`,
met `design/homepage-mockup/` als visuele referentie.

## Lokaal draaien
```
shopify theme dev --path theme --store <jouw-store>.myshopify.com
shopify theme check --path theme
```

## Opbouw
- `assets/base.css` — design tokens (kleur, Archivo/Inter) + alle componenten; `assets/theme.js` — drawers, sticky header, live zoeken, varianten, cart, reveal, 3D-tilt
- `sections/` — topbalk, header + mega-menu, hero (3D-tilt), USP-balk, assortiment-tegels (Schoenen/Tassen/Accessoires), productgrid, reviews, nieuwsbrief, footer (4 kolommen), productpagina (galerij, varianten, uitklapbare secties, reviews, gerelateerd), collectie (filters), winkelwagenpagina + drawer
- `snippets/product-card` — badges (Sale-% / Nieuw < 21 dagen / Bestseller via tag `bestseller`), van-prijs alleen bij echte korting, hover-crossfade, snel toevoegen
- Themasettings (Aanpassen → Thema-instellingen): bedrijfsgegevens, Kiyoh-score/aantal, gratis-verzendingdrempel, levertijd-belofte, social links, animaties aan/uit

## Menu-opbouw voor het mega-menu
Hoofdmenu `main-menu`: Schoenen → kolomtitel (Sneakers, Laarzen & boots, Instappers & pantoffels) → links. Tassen / Accessoires / Sale mogen platte links zijn.

## Nog te doen
- Echte productfoto in de hero en foto's in de assortiment-tegels uploaden (thema-editor)
- Echte Kiyoh-citaten + namen invullen (placeholders in de review-blokken)
- Favicon: SVG staat klaar (`assets/favicon.svg`); optioneel een PNG uploaden via Thema-instellingen
- Kleurfilter: waarden worden getoond met hoofdletter, maar dubbele tags ("Bruin"/"bruin") moeten in Shopify zelf worden samengevoegd
- Datahygiëne kinderschoenen-collectie en social-links (shop-data, geen themacode)
- Shopify `theme check` + test op een development store (nog niet uitgevoerd; CLI niet beschikbaar in deze omgeving)
