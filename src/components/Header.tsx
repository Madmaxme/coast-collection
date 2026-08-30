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
  sheetCopy: Site["sheetCopy"];
};

type Sheet = "account" | "search" | "cart";

const drawerLinkClassName =
  "flex min-h-11 items-center border-b border-craft/10 text-[15px] text-ink";

const headerUtilityClassName =
  "min-h-11 min-w-11 px-2 text-[12px] font-medium md:text-sm";

const fieldClassName =
  "min-h-11 w-full border border-craft/20 bg-canvas px-3 text-[15px] text-ink outline-none";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function labelToSheet(label: string): Sheet | null {
  const key = label.toLowerCase();
  if (key === "account" || key === "search" || key === "cart") return key;
  return null;
}

export function Header({
  wordmark,
  navLabel,
  menuLabel,
  social,
  utilityNav,
  infoNav,
  sheetCopy,
}: HeaderProps) {
  const drawerRef = useRef<HTMLDialogElement>(null);
  const cartRef = useRef<HTMLDialogElement>(null);
  const accountRef = useRef<HTMLDialogElement>(null);
  const searchRef = useRef<HTMLDialogElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountMode, setAccountMode] = useState<"sign-in" | "create">("sign-in");
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

    if (prefersReducedMotion() || drawerRef.current.dataset.open !== "true") {
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

  function closeDrawerNow() {
    setIsOpen(false);
    drawerRef.current?.close();
  }

  function openCart() {
    closeDrawerNow();
    const dialog = cartRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    if (prefersReducedMotion()) {
      setCartOpen(true);
      return;
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setCartOpen(true);
      });
    });
  }

  function closeCart() {
    if (!cartRef.current?.open) return;
    if (prefersReducedMotion() || cartRef.current.dataset.open !== "true") {
      setCartOpen(false);
      cartRef.current.close();
      return;
    }
    setCartOpen(false);
  }

  function openAccount() {
    closeDrawerNow();
    accountRef.current?.showModal();
  }

  function closeAccount() {
    accountRef.current?.close();
  }

  function openSearch() {
    closeDrawerNow();
    searchRef.current?.showModal();
    requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });
  }

  function closeSearch() {
    searchRef.current?.close();
  }

  function openSheet(label: string) {
    const sheet = labelToSheet(label);
    if (sheet === "cart") openCart();
    if (sheet === "account") openAccount();
    if (sheet === "search") openSearch();
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
              onClick={() => openSheet(item.label)}
            >
              {item.label}
            </Button>
          ))}
          {cartItem ? (
            <Button
              variant="ghost"
              type="button"
              className={headerUtilityClassName}
              onClick={openCart}
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
            <button
              key={item.label}
              type="button"
              className={`${drawerLinkClassName} w-full text-left`}
              onClick={() => openSheet(item.label)}
            >
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

      <dialog
        ref={cartRef}
        data-open={cartOpen ? "true" : "false"}
        className="cart-drawer fixed top-0 right-0 left-auto m-0 flex h-dvh max-h-dvh w-[min(20rem,92vw)] max-w-none flex-col border-l border-craft/15 bg-canvas p-0 text-ink"
        aria-label={cartItem?.label ?? "Cart"}
        onTransitionEnd={finishClose}
        onCancel={(event) => {
          event.preventDefault();
          closeCart();
        }}
        onClick={(event) => {
          if (event.target === cartRef.current) {
            closeCart();
          }
        }}
      >
        <div className="flex items-center justify-between border-b border-craft/15 px-4 py-3">
          <p className="font-heading text-lg tracking-[0.12em] uppercase">{cartItem?.label}</p>
          <Button variant="ghost" type="button" className="min-h-11 min-w-11" onClick={closeCart}>
            <X className="size-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <div className="flex flex-1 flex-col justify-between px-4 py-8">
          <p className="text-[15px] text-ink/70">{sheetCopy.cartEmpty}</p>
          <div>
            <p className="mb-6 flex items-center justify-between text-[15px]">
              <span>{sheetCopy.cartTotal}</span>
              <span>{sheetCopy.emptyTotal}</span>
            </p>
            <Link
              href="/shop"
              className="flex min-h-11 items-center justify-center border border-craft/40 text-[13px] tracking-wide uppercase"
              onClick={closeCart}
            >
              {navLabel}
            </Link>
          </div>
        </div>
      </dialog>

      <dialog
        ref={accountRef}
        className="m-auto w-[min(22rem,92vw)] border border-craft/15 bg-canvas p-0 text-ink"
        aria-label="Account"
        onCancel={closeAccount}
      >
        <div className="flex items-center justify-between border-b border-craft/15 px-4 py-3">
          <p className="font-heading text-lg tracking-[0.12em] uppercase">
            {drawerUtilities.find((item) => item.label.toLowerCase() === "account")?.label}
          </p>
          <Button variant="ghost" type="button" className="min-h-11 min-w-11" onClick={closeAccount}>
            <X className="size-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <form
          className="flex flex-col gap-3 px-4 py-6"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div className="flex gap-2">
            <button
              type="button"
              className={`min-h-11 flex-1 text-[13px] ${accountMode === "sign-in" ? "text-ink" : "text-ink/40"}`}
              onClick={() => setAccountMode("sign-in")}
            >
              {sheetCopy.signIn}
            </button>
            <button
              type="button"
              className={`min-h-11 flex-1 text-[13px] ${accountMode === "create" ? "text-ink" : "text-ink/40"}`}
              onClick={() => setAccountMode("create")}
            >
              {sheetCopy.createAccount}
            </button>
          </div>
          <label className="text-[12px] text-ink/70">
            {sheetCopy.email}
            <input type="email" name="email" autoComplete="email" className={`${fieldClassName} mt-1`} />
          </label>
          <label className="text-[12px] text-ink/70">
            {sheetCopy.password}
            <input
              type="password"
              name="password"
              autoComplete={accountMode === "sign-in" ? "current-password" : "new-password"}
              className={`${fieldClassName} mt-1`}
            />
          </label>
          <button
            type="submit"
            className="mt-2 flex min-h-11 items-center justify-center border border-craft/40 text-[13px] tracking-wide uppercase"
          >
            {accountMode === "sign-in" ? sheetCopy.signIn : sheetCopy.createAccount}
          </button>
        </form>
      </dialog>

      <dialog
        ref={searchRef}
        className="m-auto w-[min(22rem,92vw)] border border-craft/15 bg-canvas p-0 text-ink"
        aria-label="Search"
        onClose={closeSearch}
        onCancel={closeSearch}
      >
        <div className="flex items-center justify-between border-b border-craft/15 px-4 py-3">
          <p className="font-heading text-lg tracking-[0.12em] uppercase">
            {drawerUtilities.find((item) => item.label.toLowerCase() === "search")?.label}
          </p>
          <Button variant="ghost" type="button" className="min-h-11 min-w-11" onClick={closeSearch}>
            <X className="size-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <form
          className="px-4 py-6"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            ref={searchInputRef}
            type="search"
            name="q"
            placeholder={sheetCopy.searchPlaceholder}
            className={fieldClassName}
          />
        </form>
      </dialog>
    </header>
  );
}
