import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/AddToCart";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { products, site } from "@/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  return { title: product ? `${product.name} · ${site.wordmark}` : site.wordmark };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  const sizes = product.category === "applique-tank" ? site.apparelSizes : [];

  return (
    <div className="flex flex-1 flex-col">
      <AnnouncementBar announcement={site.announcement} />
      <Header
        wordmark={site.wordmark}
        navLabel={site.navLabel}
        menuLabel={site.menuLabel}
        social={site.social}
        utilityNav={site.utilityNav}
        infoNav={site.infoNav}
        sheetCopy={site.sheetCopy}
      />
      <main>
        <article className="mx-auto grid max-w-[1100px] items-start gap-8 px-3 py-10 md:grid-cols-2 md:gap-12 md:px-6 md:py-16">
          <div className="relative aspect-[3/4]">
            <Image
              src={product.imageSrc}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain mix-blend-multiply"
            />
          </div>
          <div>
            <h1 className="font-heading text-3xl text-ink md:text-4xl">{product.name}</h1>
            {product.priceLabel ? (
              <p className="mt-3 text-[15px] tracking-wide text-ink">{product.priceLabel}</p>
            ) : null}
            <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-ink/80">
              {site.categoryBlurbs[product.category]}
            </p>
            <AddToCart
              slug={product.slug}
              sizes={sizes}
              sizeLabel={site.sheetCopy.size}
              quantityLabel={site.sheetCopy.quantity}
              decreaseLabel={site.sheetCopy.decreaseQuantity}
              increaseLabel={site.sheetCopy.increaseQuantity}
              addLabel={site.sheetCopy.addToCart}
            />
          </div>
        </article>
      </main>
      <Footer name={site.name} social={site.social} infoNav={site.infoNav} />
    </div>
  );
}
