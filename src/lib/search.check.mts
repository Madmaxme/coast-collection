import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { matchesQuery, productHaystack } from "./search.ts";

const blue = productHaystack({
  name: "Blue hydrangea",
  searchTerms: ["floral", "flower", "white"],
  category: "knot-bag",
});
const leopard = productHaystack({
  name: "Leopard",
  searchTerms: ["pink", "brown", "suede"],
  category: "knot-bag",
});
const tank = productHaystack({
  name: "Pearl oyster",
  searchTerms: ["white"],
  category: "applique-tank",
});

assert.equal(matchesQuery(blue, "bag"), true);
assert.equal(matchesQuery(leopard, "bag"), true);
assert.equal(matchesQuery(blue, "blue bag"), true);
assert.equal(matchesQuery(leopard, "blue bag"), false);
assert.equal(matchesQuery(tank, "bag"), false);
assert.equal(matchesQuery(tank, "tank"), true);
assert.equal(matchesQuery(blue, "   "), false);

const catalog = readFileSync(new URL("../content/catalog.ts", import.meta.url), "utf8");
const products = [...catalog.matchAll(/slug: "([^"]+)"[\s\S]*?name: "([^"]+)"[\s\S]*?searchTerms: \[([\s\S]*?)\]/g)].map(
  (match) => ({
    slug: match[1],
    name: match[2],
    searchTerms: [...match[3].matchAll(/"([^"]+)"/g)].map((term) => term[1]),
    category: "knot-bag" as const,
  }),
);

function slugs(query: string) {
  return products
    .filter((product) => matchesQuery(productHaystack(product), query))
    .map((product) => product.slug)
    .sort();
}

assert.equal(products.length, 13);
assert.deepEqual(slugs("white"), [
  "blue-hydrangea",
  "cream-pin-dot",
  "dusty-blue-floral",
  "gold-dot-cream",
  "pink-plaid",
  "rose-toile",
  "white-cow",
]);
assert.deepEqual(slugs("yellow"), ["dusty-blue-floral", "gold-dot-cream"]);
assert.deepEqual(slugs("polka dot"), ["cream-pin-dot", "gold-dot-cream"]);
assert.deepEqual(slugs("pink"), ["dusty-blue-floral", "leopard", "pink-plaid", "rose-toile"]);
assert.deepEqual(slugs("cow"), ["cowhide", "white-cow"]);
assert.deepEqual(slugs("football"), ["football"]);
assert.deepEqual(slugs("snake"), ["snake"]);
assert.equal(slugs("white").includes("red-bandana"), false);
assert.equal(slugs("white").includes("cowhide"), false);
assert.equal(slugs("white").includes("football"), false);
assert.equal(slugs("suede").includes("gold-dot-cream"), false);

console.log("search ok");
