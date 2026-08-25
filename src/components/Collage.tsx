import Image from "next/image";
import type { CollageImage } from "@/content";

type CollageProps = {
  images: CollageImage[];
};

export function Collage({ images }: CollageProps) {
  return (
    <section className="px-6 pb-16 md:pb-24">
      <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-0">
        {images.map((image) => (
          <div key={image.id} className="relative aspect-square overflow-hidden bg-canvas">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 50vw, 620px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
