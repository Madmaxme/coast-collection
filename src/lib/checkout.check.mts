import assert from "node:assert/strict";
import { buildCheckoutItems, type CheckoutProduct } from "./checkout.ts";

const sizes = ["Small", "Medium", "Large"];
const catalog: CheckoutProduct[] = [
  {
    slug: "blue-hydrangea",
    name: "Blue hydrangea",
    category: "knot-bag",
    price: 65,
    description: "Handmade Japanese knot bag with suede fringe.",
  },
  {
    slug: "pearl-oyster",
    name: "Pearl oyster",
    category: "applique-tank",
    price: 70,
    description: "Handmade beaded appliqué tank.",
  },
];

const bags = buildCheckoutItems(
  [
    { slug: "blue-hydrangea", size: "", quantity: 1 },
    { slug: "blue-hydrangea", size: "", quantity: 1 },
  ],
  catalog,
  sizes,
);
assert.ok("items" in bags);
assert.equal(bags.items.length, 1);
assert.equal(bags.items[0]?.unitAmount, 6500);
assert.equal(bags.items[0]?.quantity, 2);
assert.equal(bags.items[0]?.name, "Blue hydrangea");

const tank = buildCheckoutItems(
  [{ slug: "pearl-oyster", size: "Medium", quantity: 1 }],
  catalog,
  sizes,
);
assert.ok("items" in tank);
assert.equal(tank.items[0]?.unitAmount, 7000);
assert.equal(tank.items[0]?.name, "Pearl oyster (Medium)");

assert.deepEqual(
  buildCheckoutItems([{ slug: "pearl-oyster", size: "", quantity: 1 }], catalog, sizes),
  { error: "invalid" },
);
assert.deepEqual(
  buildCheckoutItems([{ slug: "blue-hydrangea", size: "Small", quantity: 1 }], catalog, sizes),
  { error: "invalid" },
);
assert.deepEqual(
  buildCheckoutItems([{ slug: "missing", size: "", quantity: 1 }], catalog, sizes),
  { error: "invalid" },
);
assert.deepEqual(buildCheckoutItems([], catalog, sizes), { error: "empty" });
assert.deepEqual(
  buildCheckoutItems([{ slug: "blue-hydrangea", size: "", quantity: 11 }], catalog, sizes),
  { error: "invalid" },
);

console.log("checkout ok");
