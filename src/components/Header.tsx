"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Site } from "@/content";
import { Button } from "@/components/ui/button";

type HeaderProps = {
  wordmark: Site["wordmark"];
  navLabel: Site["navLabel"];
  menuLabel: Site["menuLabel"];
  social: Site["social"];
  utilityNav: Site["utilityNav"];
  infoNav: Site["infoNav"];
};

const drawerLinkClassName =
  "flex min-h-11 items-center border-b border-craft/10 text-[15px] text-ink";

const headerUtilityClassName =
  "min-h-11 min-w-11 px-2 text-[12px] font-medium md:text-sm";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Header({
  wordmark,
  navLabel,
  menuLabel,
  social,
  utilityNav,
  infoNav,
}: HeaderProps) {
  const drawerRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const cartItem = utilityNav.find((item) => item.label.toLowerCase() === "cart");
  const drawerUtilities = utilityNav.filter((item) => item.label.toLowerCase() !== "cart");

  function openDrawer() {
    const dialog = drawerRef.current;
    if (!dialog || dialog.open) return;

    dialog.showModal();

    if (prefersReducedMotion()) {
      setIsOpen(true);
      return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsOpen(true);
      });
    });
  }

  function closeDrawer() {
    if (!drawerRef.current?.open) return;

    if (prefersReducedMotion()) {
      setIsOpen(false);
      drawerRef.current.close();
      return;
    }

    setIsOpen(false);
  }

  function finishClose(event: React.TransitionEvent<HTMLDialogElement>) {
    if (event.propertyName !== "transform") return;
    if (event.currentTarget.dataset.open === "true") return;
    event.currentTarget.close();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-craft/15 bg-canvas">
      <div className="grid grid-cols-3 items-center gap-2 px-3 py-3 md:px-6 md:py-4">
        <div className="flex items-center justify-self-start">
          <Button
            variant="ghost"
            type="button"
            className="min-h-11 min-w-11 gap-2 px-2 md:hidden"
            onClick={openDrawer}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-controls="site-menu"
          >
            <Menu className="size-5" aria-hidden="true" />
            <span className="text-[12px] tracking-wide uppercase">{menuLabel}</span>
          </Button>
          <nav aria-label="Primary" className="hidden items-center md:flex">
            <Link
              href="/shop"
              className={`inline-flex items-center ${headerUtilityClassName}`}
            >
              {navLabel}
            </Link>
          </nav>
        </div>
        <Link
          href="/"
          className="justify-self-center text-center font-heading text-xl tracking-[0.12em] text-ink uppercase md:text-2xl"
        >
          {wordmark}
        </Link>
        <div className="flex min-h-11 items-center justify-end justify-self-end">
          {drawerUtilities.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              type="button"
              className={`hidden md:inline-flex ${headerUtilityClassName}`}
            >
              {item.label}
            </Button>
          ))}
          {cartItem ? (
            <Button
              variant="ghost"
              type="button"
              className={headerUtilityClassName}
            >
              {cartItem.label}
            </Button>
          ) : null}
        </div>
      </div>

      <dialog
        id="site-menu"
        ref={drawerRef}
        data-open={isOpen ? "true" : "false"}
        className="nav-drawer fixed top-0 left-0 m-0 flex h-dvh max-h-dvh w-[min(20rem,92vw)] max-w-none flex-col border-r border-craft/15 bg-canvas p-0 text-ink"
        aria-label={menuLabel}
        onTransitionEnd={finishClose}
        onCancel={(event) => {
          event.preventDefault();
          closeDrawer();
        }}
        onClick={(event) => {
          if (event.target === drawerRef.current) {
            closeDrawer();
          }
        }}
      >
        <div className="flex items-center justify-between border-b border-craft/15 px-4 py-3">
          <p className="font-heading text-lg tracking-[0.12em] uppercase">{wordmark}</p>
          <Button
            variant="ghost"
            type="button"
            className="min-h-11 min-w-11"
            onClick={closeDrawer}
          >
            <X className="size-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <nav className="flex flex-1 flex-col overflow-y-auto px-4 py-2">
          <Link href="/shop" className={drawerLinkClassName} onClick={closeDrawer}>
            {navLabel}
          </Link>
          {drawerUtilities.map((item) => (
            <button key={item.label} type="button" className={`${drawerLinkClassName} w-full text-left`}>
              {item.label}
            </button>
          ))}
          {infoNav.map((item) => (
            <button key={item.label} type="button" className={`${drawerLinkClassName} w-full text-left`}>
              {item.label}
            </button>
          ))}
          {social.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={drawerLinkClassName}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </dialog>
    </header>
  );
}
