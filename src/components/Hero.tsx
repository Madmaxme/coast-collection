import Image from "next/image";
import type { Site } from "@/content";

type HeroProps = {
  src: Site["heroImageSrc"];
  alt: Site["heroImageAlt"];
  overlay: Site["heroOverlay"];
};

export function Hero({ src, alt, overlay }: HeroProps) {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-canvas md:min-h-[85vh]">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[30%_center]"
      />
      <div className="pointer-events-none absolute inset-0 bg-ink/20" />
      <p className="pointer-events-none absolute inset-0 flex items-center justify-center font-heading text-4xl tracking-[0.08em] text-canvas md:text-6xl lg:text-7xl">
        {overlay}
      </p>
    </section>
  );
}
