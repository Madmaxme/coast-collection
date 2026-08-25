import type { Site } from "@/content";

type MarqueeProps = {
  items: Site["marqueeItems"];
};

export function Marquee({ items }: MarqueeProps) {
  const line = items.join(" · ");
  return (
    <div className="overflow-hidden border-y border-craft/15 bg-canvas py-3 text-craft">
      <div className="marquee flex w-max gap-12 text-[13px] tracking-[0.2em] uppercase">
        <span aria-hidden="true">{line}</span>
        <span>{line}</span>
        <span aria-hidden="true">{line}</span>
        <span aria-hidden="true">{line}</span>
      </div>
    </div>
  );
}
