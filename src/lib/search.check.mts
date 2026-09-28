import assert from "node:assert/strict";
import { matchesQuery, productHaystack } from "./search.ts";

const blue = productHaystack({
  name: "Blue hydrangea",
  caption: "Blue and white hydrangea floral flowers with green leaves and white suede fringe.",
  category: "knot-bag",
});
const leopard = productHaystack({
  name: "Leopard",
  caption: "Tan and black leopard print with a hot pink lining and brown suede fringe.",
  category: "knot-bag",
});
const dusty = productHaystack({
  name: "Dusty-blue floral",
  caption: "Dusty blue with pink roses, yellow flowers, and white suede fringe.",
  category: "knot-bag",
});
const tank = productHaystack({
  name: "Pearl oyster",
  caption: "White oyster shell on a cream tank.",
  category: "applique-tank",
});

assert.equal(matchesQuery(blue, "bag"), true);
assert.equal(matchesQuery(leopard, "bag"), true);
assert.equal(matchesQuery(blue, "blue bag"), true);
assert.equal(matchesQuery(dusty, "blue bag"), true);
assert.equal(matchesQuery(leopard, "blue bag"), false);
assert.equal(matchesQuery(tank, "bag"), false);
assert.equal(matchesQuery(tank, "tank"), true);
assert.equal(matchesQuery(blue, "   "), false);
assert.equal(matchesQuery(dusty, "flower"), true);
assert.equal(matchesQuery(blue, "flower"), true);
assert.equal(
  matchesQuery(
    productHaystack({
      name: "Rose toile",
      caption: "Pink rose floral flower toile on cream with white suede fringe.",
      category: "knot-bag",
    }),
    "flower",
  ),
  true,
);
assert.equal(matchesQuery(dusty, "pink"), true);
assert.equal(matchesQuery(blue, "pink"), false);
assert.equal(matchesQuery(leopard, "brown"), true);
assert.equal(matchesQuery(leopard, "suede"), true);
assert.equal(matchesQuery(leopard, "flower"), false);
assert.equal(matchesQuery(dusty, "floral"), true);

console.log("search ok");
