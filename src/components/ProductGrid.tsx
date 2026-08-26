import Image from "next/image";
import type { Product } from "@/content";

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className="px-3 py-10 md:px-6 md:py-16">
      <ul className="mx-auto grid max-w-[1240px] grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
        {products.map((product) => (
          <li key={product.id}>
            <div className="relative aspect-[3/4] bg-canvas">
              <Image
                src={product.imageSrc}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-contain"
              />
            </div>
            <p className="mt-3 font-heading text-base text-ink md:text-lg">{product.name}</p>
            {product.priceLabel ? (
              <p className="text-[12px] tracking-wide text-ink/70 uppercase md:text-[13px]">
                {product.priceLabel}
              </p>
            ) : null}
            {product.tagline ? (
              <p className="mt-1 text-[12px] text-sage">{product.tagline}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
