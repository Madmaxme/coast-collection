import type { Site } from "@/content";
import { Button } from "@/components/ui/button";

type FooterProps = {
  name: Site["name"];
  social: Site["social"];
  infoNav: Site["infoNav"];
};

export function Footer({ name, social, infoNav }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-craft/15 bg-canvas px-4 py-8 md:px-6">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12px] text-ink/50">
          © {year} {name}
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          {social.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-[13px] text-ink/70 hover:text-jewel"
            >
              {link.label}
            </a>
          ))}
          {infoNav.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              type="button"
              className="inline-flex h-auto min-h-11 px-0 text-[13px] text-ink/70 hover:bg-transparent hover:text-jewel"
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
}
