import type { Site } from "@/content";

type AnnouncementBarProps = {
  announcement: Site["announcement"];
};

export function AnnouncementBar({ announcement }: AnnouncementBarProps) {
  return (
    <div className="bg-craft px-4 py-2 text-center text-[13px] tracking-[0.12em] text-canvas uppercase">
      {announcement}
    </div>
  );
}
