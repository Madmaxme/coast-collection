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
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-10 md:flex-row md:justify-center md:gap-14">
        <div className="max-w-xl text-center">
          <h2 className="font-heading text-2xl tracking-[0.12em] text-ink uppercase md:text-3xl">
            {heading}
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-ink/70">{body}</p>
        </div>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={822}
          height={1024}
          sizes="(min-width: 768px) 320px, 288px"
          className="h-auto w-72 md:w-80"
        />
      </div>
    </section>
  );
}
