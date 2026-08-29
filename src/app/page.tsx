import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Collage } from "@/components/Collage";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ProductRail } from "@/components/ProductRail";
import { collageImages, products, site } from "@/content";

export default function Home() {
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
      />
      <main>
        <Hero
          src={site.heroImageSrc}
          alt={site.heroImageAlt}
          overlay={site.wordmark}
          shopLabel={site.navLabel}
        />
        <Marquee items={site.marqueeItems} />
        <ProductRail products={products} />
        <Collage images={collageImages} />
      </main>
      <Footer name={site.name} social={site.social} infoNav={site.infoNav} />
    </div>
  );
}
