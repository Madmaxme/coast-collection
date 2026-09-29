type Searchable = {
  name: string;
  searchTerms: readonly string[];
  category: "knot-bag" | "applique-tank";
};

export function productHaystack(product: Searchable) {
  const kind =
    product.category === "knot-bag" ? "bag bags knot" : "tank tanks clothing applique";
  return `${product.name} ${product.searchTerms.join(" ")} ${kind}`.toLowerCase();
}

export function matchesQuery(haystack: string, query: string) {
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return false;
  return tokens.every((token) => haystack.includes(token));
}
