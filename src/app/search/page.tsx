import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import { products, site } from "@/content";
import { matchesQuery, productHaystack } from "@/lib/search";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q)?.trim() ?? "";
  const matches = query
    ? products.filter((product) => matchesQuery(productHaystack(product), query))
    : [];

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
        {matches.length === 0 ? (
          <p className="px-4 py-16 text-[15px] text-ink/70">{site.sheetCopy.searchEmpty}</p>
        ) : (
          <ProductGrid products={matches} />
        )}
      </main>
      <Footer name={site.name} social={site.social} infoNav={site.infoNav} />
    </div>
  );
}
