import Image from "next/image";
import type { Site } from "@/content";

type StoryProps = {
  heading: Site["wordmark"];
  body: Site["footerBlurb"];
  imageSrc: Site["storyImageSrc"];
  imageAlt: Site["storyImageAlt"];
};

export function Story({ heading, body, imageSrc, imageAlt }: StoryProps) {
  return (
    <section className="px-4 pt-[33vh] pb-20 md:px-6 md:pb-28">
      <div className="max-w-xl">
        <h2 className="font-heading text-2xl tracking-[0.12em] text-ink uppercase md:text-3xl">
          {heading}
        </h2>
        <p className="mt-6 text-[15px] leading-relaxed text-ink/70">{body}</p>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={822}
          height={1024}
          sizes="144px"
          className="mt-8 h-auto w-36"
        />
      </div>
    </section>
  );
}
