import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { MapPin, Truck, Undo2, BadgePercent } from "lucide-react";
import { STOREFRONT_QUERY, storefrontApiRequest, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { useCartSync } from "@/hooks/useCartSync";
import heroImage from "@/assets/hero-shoes.jpg";

const productsQuery = queryOptions({
  queryKey: ["shopify-products"],
  queryFn: async () => {
    const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 24 });
    return (data?.data?.products?.edges ?? []) as ShopifyProduct[];
  },
});

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery),
  head: () => ({
    meta: [
      { title: "GoedkopeSchoenen.nl — Schoenenwinkel in Elst" },
      {
        name: "description",
        content:
          "GoedkopeSchoenen.nl uit Elst: betaalbare schoenen voor het hele gezin. Sneakers, laarzen, sandalen en meer — altijd lage prijzen.",
      },
      { property: "og:title", content: "GoedkopeSchoenen.nl — Schoenenwinkel in Elst" },
      {
        property: "og:description",
        content:
          "Betaalbare schoenen voor het hele gezin, uit onze winkel in Elst. Altijd lage prijzen.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const usps = [
  { icon: BadgePercent, title: "Altijd lage prijzen", text: "De scherpste deals van Elst en omgeving." },
  { icon: Truck, title: "Snelle verzending", text: "Besteld vandaag, snel in huis." },
  { icon: Undo2, title: "30 dagen retour", text: "Niet goed? Geld terug, geen gedoe." },
  { icon: MapPin, title: "Winkel in Elst", text: "Kom passen en neem direct mee." },
];

function Index() {
  useCartSync();
  const { data: products } = useSuspenseQuery(productsQuery);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="/" className="font-display text-2xl tracking-wide">
            GoedkopeSchoenen<span className="text-primary">.nl</span>
          </a>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1 text-sm text-muted-foreground sm:flex">
              <MapPin className="h-4 w-4" /> Elst
            </span>
            <CartDrawer />
          </div>
        </div>
      </header>

      {/* Marquee */}
      <div className="overflow-hidden bg-primary py-2 text-primary-foreground">
        <div className="animate-marquee flex w-max gap-8 whitespace-nowrap font-display text-lg tracking-widest">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex gap-8">
              <span>ALTIJD LAGE PRIJZEN</span>
              <span>•</span>
              <span>30 DAGEN RETOUR</span>
              <span>•</span>
              <span>WINKEL IN ELST</span>
              <span>•</span>
              <span>VOOR HET HELE GEZIN</span>
              <span>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={heroImage}
          alt="Rij betaalbare schoenen"
          width={1920}
          height={1088}
          className="h-[420px] w-full object-cover sm:h-[520px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4">
            <p className="mb-2 font-display text-xl tracking-widest text-primary">
              SCHOENENWINKEL UIT ELST
            </p>
            <h1 className="max-w-xl text-balance font-display text-6xl leading-[0.95] sm:text-7xl">
              Mooie schoenen hoeven niet duur te zijn
            </h1>
            <p className="mt-4 max-w-md text-lg text-muted-foreground">
              Sneakers, laarzen, sandalen en kinderschoenen — voor prijzen waar je blij van wordt.
            </p>
            <a
              href="#collectie"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 font-display text-xl tracking-widest text-primary-foreground transition-transform hover:scale-105"
            >
              BEKIJK DE COLLECTIE
            </a>
          </div>
        </div>
      </section>

      {/* USPs */}
      <section className="border-b bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 lg:grid-cols-4">
          {usps.map((usp) => (
            <div key={usp.title} className="flex flex-col items-center gap-2 text-center">
              <usp.icon className="h-8 w-8 text-primary" />
              <h3 className="font-display text-xl tracking-wide">{usp.title}</h3>
              <p className="text-sm text-muted-foreground">{usp.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="collectie" className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="font-display text-lg tracking-widest text-primary">ONZE COLLECTIE</p>
            <h2 className="font-display text-5xl">Alle schoenen</h2>
          </div>
        </div>
        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed bg-card py-20 text-center">
            <p className="font-display text-3xl">Nog geen producten</p>
            <p className="mt-2 text-muted-foreground">
              Binnenkort vind je hier onze volledige collectie.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Store info */}
      <section className="bg-accent py-16 text-accent-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
          <div>
            <h2 className="font-display text-5xl">Kom gezellig langs in Elst</h2>
            <p className="mt-4 max-w-md text-accent-foreground/80">
              Liever eerst passen? Je bent van harte welkom in onze winkel in het centrum van Elst.
              De koffie staat klaar!
            </p>
          </div>
          <div className="space-y-3 text-accent-foreground/90">
            <p className="flex items-center gap-2">
              <MapPin className="h-5 w-5" /> Dorpsstraat 1, 6662 Elst (Gelderland)
            </p>
            <p>Ma t/m vr: 09:00 – 18:00</p>
            <p>Za: 09:00 – 17:00 · Zo: gesloten</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row">
          <span className="font-display text-lg tracking-wide text-foreground">
            GoedkopeSchoenen<span className="text-primary">.nl</span>
          </span>
          <p>© {new Date().getFullYear()} GoedkopeSchoenen.nl — Elst</p>
        </div>
      </footer>
    </div>
  );
}
