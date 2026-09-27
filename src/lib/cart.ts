"use client";

import { useSyncExternalStore } from "react";
import { MAX_CHECKOUT_QUANTITY } from "@/lib/checkout";

export type CartLine = {
  slug: string;
  size: string;
  quantity: number;
};

const STORAGE_KEY = "coast-cart";
const EMPTY: CartLine[] = [];
const listeners = new Set<() => void>();

function isCartLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const line = value as CartLine;
  return (
    typeof line.slug === "string" &&
    typeof line.size === "string" &&
    Number.isInteger(line.quantity) &&
    line.quantity > 0
  );
}

function readStored(): CartLine[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    return parsed.filter(isCartLine);
  } catch {
    return EMPTY;
  }
}

let lines = readStored();

function emit() {
  listeners.forEach((listener) => listener());
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
}

function sameLine(line: CartLine, slug: string, size: string) {
  return line.slug === slug && line.size === size;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useCartLines() {
  return useSyncExternalStore(subscribe, () => lines, () => EMPTY);
}

export function addToCart(line: CartLine) {
  const existing = lines.find((item) => sameLine(item, line.slug, line.size));
  const quantity = Math.min(
    MAX_CHECKOUT_QUANTITY,
    (existing?.quantity ?? 0) + line.quantity,
  );
  lines = existing
    ? lines.map((item) => (sameLine(item, line.slug, line.size) ? { ...item, quantity } : item))
    : [...lines, { ...line, quantity }];
  persist();
  emit();
  window.dispatchEvent(new Event("coast-cart-open"));
}

export function setCartQuantity(slug: string, size: string, quantity: number) {
  const next = Math.min(quantity, MAX_CHECKOUT_QUANTITY);
  lines =
    next < 1
      ? lines.filter((item) => !sameLine(item, slug, size))
      : lines.map((item) => (sameLine(item, slug, size) ? { ...item, quantity: next } : item));
  persist();
  emit();
}

export function clearCart() {
  lines = EMPTY;
  persist();
  emit();
}
