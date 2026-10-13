import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, Loader2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  PRODUCT_BY_HANDLE_QUERY,
  storefrontApiRequest,
  type ShopifyProduct,
} from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { CartDrawer, formatPrice } from "@/components/CartDrawer";
import { useCartSync } from "@/hooks/useCartSync";

const productQuery = (handle: string) =>
  queryOptions({
    queryKey: ["shopify-product", handle],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      const product = data?.data?.product;
      if (!product) throw new Error("Product niet gevonden");
      return { node: product } as ShopifyProduct;
    },
  });

export const Route = createFileRoute("/product/$handle")({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(productQuery(params.handle)),
  head: ({ params }) => ({
    meta: [
      { title: `${params.handle.replace(/-/g, " ")} — GoedkopeSchoenen.nl` },
      {
        name: "description",
        content: "Bekijk dit product bij GoedkopeSchoenen.nl, de schoenenwinkel uit Elst.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  useCartSync();
  const { handle } = Route.useParams();
  const { data: product } = useSuspenseQuery(productQuery(handle));
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);

  const { node } = product;
  const [selectedVariantId, setSelectedVariantId] = useState(
    node.variants.edges[0]?.node.id ?? "",
  );
  const selectedVariant = node.variants.edges.find((e) => e.node.id === selectedVariantId)?.node;
  const image = node.images.edges[0]?.node;

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success(`${node.title} toegevoegd aan je winkelwagen`, { position: "top-center" });
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="font-display text-2xl tracking-wide">
            GoedkopeSchoenen<span className="text-primary">.nl</span>
          </Link>
          <CartDrawer />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Terug naar de collectie
        </Link>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border bg-secondary shadow-lift">
            {image ? (
              <img
                src={image.url}
                alt={image.altText || node.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex aspect-square items-center justify-center text-muted-foreground">
                Geen foto
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <h1 className="font-display text-5xl">{node.title}</h1>
            <p className="mt-2 text-2xl font-bold text-primary">
              {selectedVariant
                ? formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)
                : formatPrice(
                    node.priceRange.minVariantPrice.amount,
                    node.priceRange.minVariantPrice.currencyCode,
                  )}
            </p>
            <p className="mt-4 text-muted-foreground">{node.description}</p>

            {node.options[0] && node.options[0].values.length > 1 && (
              <div className="mt-6">
                <p className="mb-2 font-semibold">{node.options[0]?.name}</p>
                <div className="flex flex-wrap gap-2">
                  {node.variants.edges.map(({ node: variant }) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariantId(variant.id)}
                      disabled={!variant.availableForSale}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                        variant.id === selectedVariantId
                          ? "border-primary bg-primary text-primary-foreground"
                          : "bg-card hover:border-primary"
                      } ${!variant.availableForSale ? "opacity-40 line-through" : ""}`}
                    >
                      {variant.selectedOptions[0]?.value ?? variant.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button
              size="lg"
              className="mt-8 w-full sm:w-auto"
              onClick={handleAddToCart}
              disabled={isLoading || !selectedVariant?.availableForSale}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  In winkelwagen
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
