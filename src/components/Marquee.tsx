import type { Site } from "@/content";

type MarqueeProps = {
  items: Site["marqueeItems"];
};

export function Marquee({ items }: MarqueeProps) {
  const line = items.join(" · ");
  const trackClass =
    "flex shrink-0 gap-12 pr-12 text-[13px] tracking-[0.2em] uppercase";

  return (
    <div className="overflow-hidden border-y border-craft/15 bg-canvas py-3 text-craft">
      <p className="sr-only">{line}</p>
      <div className="marquee flex w-max">
        <div className={trackClass}>
          <span>{line}</span>
          <span aria-hidden="true">{line}</span>
        </div>
        <div className={trackClass} aria-hidden="true">
          <span>{line}</span>
          <span>{line}</span>
        </div>
      </div>
    </div>
  );
}
