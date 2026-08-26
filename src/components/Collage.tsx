import Image from "next/image";
import type { CollageImage } from "@/content";

type CollageProps = {
  images: CollageImage[];
};

export function Collage({ images }: CollageProps) {
  return (
    <section className="w-full">
      <div className="grid grid-cols-2 gap-0">
        {images.map((image) => (
          <div key={image.id} className="relative aspect-square overflow-hidden bg-canvas">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
