import Image from "next/image";
import Link from "next/link";
import type { Site } from "@/content";

type HeroProps = {
  src: Site["heroImageSrc"];
  alt: Site["heroImageAlt"];
  overlay: Site["heroOverlay"];
  shopLabel: Site["navLabel"];
};

export function Hero({ src, alt, overlay, shopLabel }: HeroProps) {
  return (
    <section className="relative min-h-[58vh] w-full overflow-hidden bg-canvas md:min-h-[85vh]">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[30%_center]"
      />
      <div className="absolute inset-0 bg-ink/25" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4">
        <p className="font-script text-5xl text-canvas drop-shadow-sm md:text-8xl lg:text-9xl">
          {overlay}
        </p>
        <Link
          href="/shop"
          className="inline-flex min-h-11 min-w-[7.5rem] items-center justify-center border border-canvas px-8 text-[13px] tracking-[0.22em] text-canvas uppercase transition-colors hover:bg-canvas hover:text-ink"
        >
          {shopLabel}
        </Link>
      </div>
    </section>
  );
}
