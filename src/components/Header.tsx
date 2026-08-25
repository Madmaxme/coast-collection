import Link from "next/link";
import type { Site } from "@/content";
import { Button } from "@/components/ui/button";

type HeaderProps = {
  wordmark: Site["wordmark"];
  navLabel: Site["navLabel"];
  social: Site["social"];
};

export function Header({ wordmark, navLabel, social }: HeaderProps) {
  return (
    <header className="border-b border-craft/15 bg-canvas">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-6 py-4">
        <nav aria-label="Social" className="flex gap-4 text-[13px] tracking-wide">
          {social.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/80 hover:text-jewel"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Link href="/" className="font-script text-3xl text-ink md:text-4xl">
          {wordmark}
        </Link>
        <div className="flex items-center gap-1">
          <Button variant="ghost" type="button">
            Account
          </Button>
          <Button variant="ghost" type="button">
            Search
          </Button>
          <Button variant="ghost" type="button">
            Cart
          </Button>
        </div>
      </div>
      <div className="flex justify-center pb-3">
        <a
          href="#shop"
          className="text-[13px] tracking-[0.18em] text-ink uppercase underline-offset-4 hover:underline"
        >
          {navLabel}
        </a>
      </div>
    </header>
  );
}
