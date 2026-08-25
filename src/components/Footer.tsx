import type { Site } from "@/content";

type FooterProps = {
  blurb: Site["footerBlurb"];
  wordmark: Site["wordmark"];
};

export function Footer({ blurb, wordmark }: FooterProps) {
  return (
    <footer className="border-t border-craft/15 bg-canvas px-6 py-16">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-10 md:flex-row md:justify-between">
        <div className="max-w-md">
          <p className="font-script text-2xl text-ink">{wordmark}</p>
          <p className="mt-4 text-[15px] leading-7 text-ink/80">{blurb}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-2 text-[13px] tracking-wide uppercase">
          <a href="#shop" className="text-ink/80 hover:text-jewel">
            Search
          </a>
          <a href="#shop" className="text-ink/80 hover:text-jewel">
            Shipping
          </a>
        </nav>
      </div>
    </footer>
  );
}
