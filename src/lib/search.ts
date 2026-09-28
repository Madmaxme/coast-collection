type Searchable = {
  name: string;
  category: "knot-bag" | "applique-tank";
};

// ponytail: flower/floral/hydrangea/rose share one hand-kept motif.
// A new print needs a word added here, or a real stemmer if the catalog outgrows it.
const FLOWER_MOTIF = /\b(floral|flower|flowers|hydrangea|rose)\b/;

export function productHaystack(product: Searchable) {
  const kind =
    product.category === "knot-bag" ? "bag bags knot" : "tank tanks clothing applique";
  const motif = FLOWER_MOTIF.test(product.name.toLowerCase()) ? "flower flowers floral" : "";
  return `${product.name} ${kind} ${motif}`.toLowerCase();
}

export function matchesQuery(haystack: string, query: string) {
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return false;
  return tokens.every((token) => haystack.includes(token));
}
