import assert from "node:assert/strict";
import { matchesQuery, productHaystack } from "./search.ts";

const blue = productHaystack({ name: "Blue hydrangea", category: "knot-bag" });
const leopard = productHaystack({ name: "Leopard", category: "knot-bag" });
const dusty = productHaystack({ name: "Dusty-blue floral", category: "knot-bag" });
const tank = productHaystack({ name: "Pearl oyster", category: "applique-tank" });

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
  matchesQuery(productHaystack({ name: "Rose toile", category: "knot-bag" }), "flower"),
  true,
);
assert.equal(matchesQuery(leopard, "flower"), false);
assert.equal(matchesQuery(dusty, "floral"), true);

console.log("search ok");
