import Image from "next/image";
import type { Product } from "@/content";

type ProductCardProps = {
  product: Product;
  sizes: string;
};

export function ProductCard({ product, sizes }: ProductCardProps) {
  return (
    <>
      <div className="relative aspect-[3/4]">
        <Image
          src={product.imageSrc}
          alt={product.name}
          fill
          sizes={sizes}
          className="object-contain mix-blend-multiply"
        />
      </div>
      <p className="mt-3 font-heading text-base text-ink md:text-lg">{product.name}</p>
      {product.priceLabel ? (
        <p className="text-[12px] tracking-wide text-ink/70 uppercase md:text-[13px]">
          {product.priceLabel}
        </p>
      ) : null}
    </>
  );
}
