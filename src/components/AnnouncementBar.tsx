import type { Site } from "@/content";

type AnnouncementBarProps = {
  announcement: Site["announcement"];
};

export function AnnouncementBar({ announcement }: AnnouncementBarProps) {
  return (
    <div className="bg-craft px-3 py-2 text-center text-[11px] tracking-[0.16em] text-canvas uppercase whitespace-nowrap md:px-4 md:text-[13px] md:tracking-[0.12em]">
      {announcement}
    </div>
  );
}
