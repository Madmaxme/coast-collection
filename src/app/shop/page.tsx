import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import { products, site } from "@/content";

export default function ShopPage() {
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
        categories={site.productCategories}
      />
      <main>
        <ProductGrid products={products} />
      </main>
      <Footer name={site.name} social={site.social} infoNav={site.infoNav} />
    </div>
  );
}
