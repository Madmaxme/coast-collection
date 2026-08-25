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
        social={site.social}
      />
      <main>
        <Hero
          src={site.heroImageSrc}
          alt={site.heroImageAlt}
          overlay={site.heroOverlay}
        />
        <Marquee items={site.marqueeItems} />
        <ProductRail products={products} />
        <Collage images={collageImages} />
      </main>
      <Footer blurb={site.footerBlurb} wordmark={site.wordmark} />
    </div>
  );
}
