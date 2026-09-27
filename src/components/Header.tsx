"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { products, type Site } from "@/content";
import { setCartQuantity, useCartLines } from "@/lib/cart";
import { matchesQuery, productHaystack } from "@/lib/search";

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

const ACCOUNT_KEY = "coast-account";

type StoredAccount = { email: string; signedIn: boolean };

// ponytail: one browser, localStorage only. Password is not stored or checked. Upgrade: a real auth provider.
const accountListeners = new Set<() => void>();
let accountRaw = typeof window === "undefined" ? "" : (localStorage.getItem(ACCOUNT_KEY) ?? "");

function parseAccount(raw: string): StoredAccount | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredAccount;
    if (typeof parsed.email !== "string" || parsed.email.length === 0) return null;
    return { email: parsed.email, signedIn: Boolean(parsed.signedIn) };
  } catch {
    return null;
  }
}

function writeAccount(account: StoredAccount) {
  accountRaw = JSON.stringify(account);
  localStorage.setItem(ACCOUNT_KEY, accountRaw);
  accountListeners.forEach((listener) => listener());
}

function subscribeAccount(listener: () => void) {
  accountListeners.add(listener);
  return () => accountListeners.delete(listener);
}

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
  const router = useRouter();
  const drawerRef = useRef<HTMLDialogElement>(null);
  const cartRef = useRef<HTMLDialogElement>(null);
  const accountRef = useRef<HTMLDialogElement>(null);
  const searchRef = useRef<HTMLDialogElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountMode, setAccountMode] = useState<"sign-in" | "create">("sign-in");
  const [accountError, setAccountError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [checkoutError, setCheckoutError] = useState("");
  const [checkoutPending, setCheckoutPending] = useState(false);
  const lines = useCartLines();
  const account = parseAccount(useSyncExternalStore(subscribeAccount, () => accountRaw, () => ""));
  const savedEmail = account?.email ?? null;
  const sessionEmail = account?.signedIn ? account.email : null;
  const cartItem = utilityNav.find((item) => item.label.toLowerCase() === "cart");
  const drawerUtilities = utilityNav.filter((item) => item.label.toLowerCase() !== "cart");
  const searchHits = products.filter((product) => matchesQuery(productHaystack(product), searchQuery));
  const cartLines = lines.flatMap((line) => {
    const product = products.find((item) => item.slug === line.slug);
    if (!product) return [];
    return [{ line, product, amount: product.price * line.quantity }];
  });
  const cartAmount = cartLines.reduce((sum, item) => sum + item.amount, 0);

  async function startCheckout() {
    setCheckoutError("");
    setCheckoutPending(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: cartLines.map(({ line }) => ({
            slug: line.slug,
            size: line.size,
            quantity: line.quantity,
          })),
        }),
      });
      const payload: unknown = await response.json();
      const url =
        payload && typeof payload === "object" && "url" in payload && typeof payload.url === "string"
          ? payload.url
          : "";
      if (!response.ok || url.length === 0) {
        setCheckoutError(sheetCopy.checkoutUnavailable);
        return;
      }
      window.location.assign(url);
    } catch {
      setCheckoutError(sheetCopy.checkoutUnavailable);
    } finally {
      setCheckoutPending(false);
    }
  }

  useEffect(() => {
    function onOpen() {
      setIsOpen(false);
      drawerRef.current?.close();
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
    window.addEventListener("coast-cart-open", onOpen);
    return () => window.removeEventListener("coast-cart-open", onOpen);
  }, []);

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
        <div className="flex flex-1 flex-col justify-between px-4 py-6">
          {cartLines.length === 0 ? (
            <p className="text-[15px] text-ink/70">{sheetCopy.cartEmpty}</p>
          ) : (
            <ul className="flex flex-col gap-4 overflow-y-auto">
              {cartLines.map(({ line, product, amount }) => (
                <li key={`${line.slug}:${line.size}`} className="flex gap-3 border-b border-craft/10 pb-4">
                  <Image
                    src={product.imageSrc}
                    alt=""
                    width={48}
                    height={64}
                    className="h-16 w-auto object-contain mix-blend-multiply"
                  />
                  <div className="min-w-0 flex-1">
                    <Link href={`/shop/${product.slug}`} className="font-heading text-base text-ink">
                      {product.name}
                    </Link>
                    {line.size ? <p className="text-[12px] text-ink/70">{line.size}</p> : null}
                    <p className="text-[13px] text-ink/70">${amount}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        className="min-h-11 min-w-11 border border-craft/30 text-[15px]"
                        aria-label={sheetCopy.decreaseQuantity}
                        onClick={() => setCartQuantity(line.slug, line.size, line.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="min-w-6 text-center text-[15px]">{line.quantity}</span>
                      <button
                        type="button"
                        className="min-h-11 min-w-11 border border-craft/30 text-[15px]"
                        aria-label={sheetCopy.increaseQuantity}
                        onClick={() => setCartQuantity(line.slug, line.size, line.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="min-h-11 text-[12px] text-ink/70 underline"
                      onClick={() => setCartQuantity(line.slug, line.size, 0)}
                    >
                      {sheetCopy.remove}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="pt-6">
            <p className="mb-6 flex items-center justify-between text-[15px]">
              <span>{sheetCopy.cartTotal}</span>
              <span>{cartLines.length === 0 ? sheetCopy.emptyTotal : `$${cartAmount}`}</span>
            </p>
            {cartLines.length > 0 ? (
              <button
                type="button"
                className="mb-3 flex min-h-11 w-full items-center justify-center border border-craft/40 text-[13px] tracking-wide uppercase disabled:opacity-40"
                disabled={checkoutPending}
                onClick={() => void startCheckout()}
              >
                {sheetCopy.checkout}
              </button>
            ) : null}
            {checkoutError ? <p className="mb-3 text-[13px]">{checkoutError}</p> : null}
            <Link
              href="/shop"
              className="flex min-h-11 items-center justify-center border border-craft/40 text-[13px] tracking-wide uppercase"
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
        {sessionEmail ? (
          <div className="flex flex-col gap-4 px-4 py-6">
            <p className="text-[15px] text-ink">{sessionEmail}</p>
            <button
              type="button"
              className="flex min-h-11 items-center justify-center border border-craft/40 text-[13px] tracking-wide uppercase"
              onClick={() => {
                if (!savedEmail) return;
                writeAccount({ email: savedEmail, signedIn: false });
              }}
            >
              {sheetCopy.signOut}
            </button>
          </div>
        ) : (
          <form
            className="flex flex-col gap-3 px-4 py-6"
            onSubmit={(event) => {
              event.preventDefault();
              const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
              if (!email) return;
              if (accountMode === "create") {
                writeAccount({ email, signedIn: true });
                setAccountError("");
                return;
              }
              if (savedEmail && savedEmail.toLowerCase() === email.toLowerCase()) {
                writeAccount({ email: savedEmail, signedIn: true });
                setAccountError("");
                return;
              }
              setAccountError(sheetCopy.accountUnknown);
            }}
          >
            <div className="flex gap-2">
              <button
                type="button"
                className={`min-h-11 flex-1 text-[13px] ${accountMode === "sign-in" ? "text-ink" : "text-ink/40"}`}
                onClick={() => {
                  setAccountMode("sign-in");
                  setAccountError("");
                }}
              >
                {sheetCopy.signIn}
              </button>
              <button
                type="button"
                className={`min-h-11 flex-1 text-[13px] ${accountMode === "create" ? "text-ink" : "text-ink/40"}`}
                onClick={() => {
                  setAccountMode("create");
                  setAccountError("");
                }}
              >
                {sheetCopy.createAccount}
              </button>
            </div>
            <label className="text-[12px] text-ink/70">
              {sheetCopy.email}
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                className={`${fieldClassName} mt-1`}
              />
            </label>
            <label className="text-[12px] text-ink/70">
              {sheetCopy.password}
              <input
                type="password"
                name="password"
                required
                autoComplete={accountMode === "sign-in" ? "current-password" : "new-password"}
                className={`${fieldClassName} mt-1`}
              />
            </label>
            {accountError ? <p className="text-[13px] text-ink/70">{accountError}</p> : null}
            <button
              type="submit"
              className="mt-2 flex min-h-11 items-center justify-center border border-craft/40 text-[13px] tracking-wide uppercase"
            >
              {accountMode === "sign-in" ? sheetCopy.signIn : sheetCopy.createAccount}
            </button>
          </form>
        )}
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
            const query = searchQuery.trim();
            if (!query) return;
            searchRef.current?.close();
            router.push(`/search?q=${encodeURIComponent(query)}`);
          }}
        >
          <input
            ref={searchInputRef}
            type="search"
            name="q"
            value={searchQuery}
            placeholder={sheetCopy.searchPlaceholder}
            className={fieldClassName}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          {searchQuery.trim() ? (
            searchHits.length === 0 ? (
              <p className="mt-4 text-[15px] text-ink/70">{sheetCopy.searchEmpty}</p>
            ) : (
              <ul className="mt-4 flex max-h-80 flex-col overflow-y-auto">
                {searchHits.map((product) => (
                  <li key={product.id} className="border-b border-craft/10">
                    <Link
                      href={`/shop/${product.slug}`}
                      className="flex min-h-11 items-center gap-3 py-2"
                    >
                      <Image
                        src={product.imageSrc}
                        alt=""
                        width={40}
                        height={52}
                        className="h-14 w-auto object-contain mix-blend-multiply"
                      />
                      <span>
                        <span className="block font-heading text-base text-ink">{product.name}</span>
                        {product.priceLabel ? (
                          <span className="text-[12px] text-ink/70">{product.priceLabel}</span>
                        ) : null}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )
          ) : null}
        </form>
      </dialog>
    </header>
  );
}
