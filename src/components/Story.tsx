import type { Site } from "@/content";

type StoryProps = {
  heading: Site["wordmark"];
  body: Site["footerBlurb"];
};

export function Story({ heading, body }: StoryProps) {
  return (
    <section className="mx-auto max-w-xl px-6 py-20 text-center md:py-28">
      <h2 className="font-heading text-2xl tracking-[0.12em] text-ink uppercase md:text-3xl">
        {heading}
      </h2>
      <p className="mt-6 text-[15px] leading-relaxed text-ink/70">{body}</p>
    </section>
  );
}
