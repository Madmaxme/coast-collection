import Image from "next/image";
import type { Product, Site } from "@/content";

type ProductRailProps = {
  heading: string;
  categories: Site["productCategories"];
  products: Product[];
};

export function ProductRail({ heading, categories, products }: ProductRailProps) {
  return (
    <section id="shop" className="scroll-mt-8 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-[1240px]">
        <h2 className="font-heading text-3xl text-ink md:text-4xl">{heading}</h2>
        {categories.map((category) => {
          const items = products.filter((product) => product.category === category.id);
          if (items.length === 0) {
            return null;
          }

          return (
            <div key={category.id} className="mt-10">
              <h3 className="text-[13px] tracking-[0.18em] text-ink/70 uppercase">
                {category.heading}
              </h3>
              <ul className="mt-6 flex gap-8 overflow-x-auto pb-4">
                {items.map((product) => (
                  <li key={product.id} className="w-[240px] shrink-0">
                    <div className="relative aspect-[3/4] bg-canvas">
                      <Image
                        src={product.imageSrc}
                        alt={product.name}
                        fill
                        sizes="240px"
                        className="object-contain"
                      />
                    </div>
                    <p className="mt-3 font-heading text-lg text-ink">{product.name}</p>
                    {product.priceLabel ? (
                      <p className="text-[13px] tracking-wide text-ink/70 uppercase">
                        {product.priceLabel}
                      </p>
                    ) : null}
                    {product.tagline ? (
                      <p className="mt-1 text-[12px] text-sage">{product.tagline}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
