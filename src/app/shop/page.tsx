import Link from "next/link";
import { ProductRail } from "@/components/ProductRail";
import { products, site } from "@/content";

export default function ShopPage() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-craft/15 px-6 py-6">
        <Link href="/" className="font-script text-3xl text-ink">
          {site.wordmark}
        </Link>
      </header>
      <ProductRail products={products} />
    </div>
  );
}
