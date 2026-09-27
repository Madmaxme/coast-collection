export const MAX_CHECKOUT_QUANTITY = 10;

export type CheckoutLine = {
  slug: string;
  size: string;
  quantity: number;
};

export type CheckoutProduct = {
  slug: string;
  name: string;
  category: "knot-bag" | "applique-tank";
  price: number;
  description: string;
};

export type CheckoutItem = {
  name: string;
  description: string;
  unitAmount: number;
  quantity: number;
};

export function buildCheckoutItems(
  requested: CheckoutLine[],
  catalog: CheckoutProduct[],
  apparelSizes: readonly string[],
): { items: CheckoutItem[] } | { error: "empty" | "invalid" } {
  if (requested.length === 0) return { error: "empty" };

  const merged = new Map<string, CheckoutLine>();
  for (const line of requested) {
    if (
      typeof line.slug !== "string" ||
      line.slug.length === 0 ||
      typeof line.size !== "string" ||
      !Number.isInteger(line.quantity) ||
      line.quantity < 1
    ) {
      return { error: "invalid" };
    }
    const key = `${line.slug}\n${line.size}`;
    const quantity = (merged.get(key)?.quantity ?? 0) + line.quantity;
    if (quantity > MAX_CHECKOUT_QUANTITY) return { error: "invalid" };
    merged.set(key, { slug: line.slug, size: line.size, quantity });
  }

  const items: CheckoutItem[] = [];
  for (const line of merged.values()) {
    const product = catalog.find((item) => item.slug === line.slug);
    if (!product) return { error: "invalid" };
    if (product.category === "knot-bag") {
      if (line.size !== "") return { error: "invalid" };
    } else if (!apparelSizes.includes(line.size)) {
      return { error: "invalid" };
    }
    items.push({
      name: line.size === "" ? product.name : `${product.name} (${line.size})`,
      description: product.description,
      unitAmount: product.price * 100,
      quantity: line.quantity,
    });
  }
  return { items };
}
