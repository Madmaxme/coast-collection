import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/content";

export const metadata: Metadata = {
  title: site.shippingPage.heading,
};

export default function ShippingPage() {
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
      <main className="mx-auto w-full max-w-xl flex-1 px-4 py-16 md:px-6 md:py-24">
        <h1 className="font-heading text-2xl tracking-[0.12em] text-ink uppercase md:text-3xl">
          {site.shippingPage.heading}
        </h1>
        <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink/70">
          {site.shippingPage.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </main>
      <Footer name={site.name} social={site.social} infoNav={site.infoNav} />
    </div>
  );
}
