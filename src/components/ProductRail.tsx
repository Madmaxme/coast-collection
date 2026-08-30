import type { Product } from "@/content";
import { ProductCard } from "@/components/ProductCard";

type ProductRailProps = {
  products: Product[];
};

export function ProductRail({ products }: ProductRailProps) {
  return (
    <section className="px-4 py-12 md:px-6 md:py-16">
      <ul className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
        {products.map((product) => (
          <li
            key={product.id}
            className="w-[42vw] max-w-[240px] shrink-0 snap-start sm:w-[240px]"
          >
            <ProductCard product={product} sizes="(max-width: 640px) 42vw, 240px" />
          </li>
        ))}
      </ul>
    </section>
  );
}
