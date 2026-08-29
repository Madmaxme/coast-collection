import type { Site } from "@/content";

type MarqueeProps = {
  items: Site["marqueeItems"];
};

const COPIES = 8;

export function Marquee({ items }: MarqueeProps) {
  const line = items.join(" · ");
  const trackClass =
    "flex shrink-0 items-center text-[13px] tracking-[0.2em] uppercase";

  return (
    <div className="overflow-hidden border-y border-craft/15 bg-canvas py-3 text-craft">
      <p className="sr-only">{line}</p>
      <div className="marquee flex w-max">
        <div className={trackClass}>
          {Array.from({ length: COPIES }, (_, index) => (
            <span key={index} className="px-8">
              {line}
            </span>
          ))}
        </div>
        <div className={trackClass} aria-hidden="true">
          {Array.from({ length: COPIES }, (_, index) => (
            <span key={index} className="px-8">
              {line}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
