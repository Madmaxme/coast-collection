import type { Product } from "@/content";
import { ProductCard } from "@/components/ProductCard";

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className="px-3 py-10 md:px-6 md:py-16">
      <ul className="mx-auto grid max-w-[1240px] grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard
              product={product}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
