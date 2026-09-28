import { ProductSchema, type Product } from "./schema";

const listed = [
  {
    id: "leopard",
    slug: "leopard",
    name: "Leopard",
    caption:
      "Tan and black leopard print with a hot pink lining and brown suede fringe.",
    category: "knot-bag",
    imageSrc: "/bags/leopard.jpeg",
    sold: false,
  },
  {
    id: "blue-hydrangea",
    slug: "blue-hydrangea",
    name: "Blue hydrangea",
    caption:
      "Blue and white hydrangea floral flowers with green leaves and white suede fringe.",
    category: "knot-bag",
    imageSrc: "/bags/blue-hydrangea.jpeg",
    sold: false,
  },
  {
    id: "red-bandana",
    slug: "red-bandana",
    name: "Red bandana",
    caption: "Red and white paisley bandana print with brown suede fringe.",
    category: "knot-bag",
    imageSrc: "/bags/red-bandana.jpeg",
    sold: false,
  },
  {
    id: "mustard-plaid",
    slug: "mustard-plaid",
    name: "Mustard plaid",
    caption: "Brown, tan, and mustard plaid with brown suede fringe.",
    category: "knot-bag",
    imageSrc: "/bags/mustard-plaid.jpeg",
    sold: false,
  },
  {
    id: "cream-pin-dot",
    slug: "cream-pin-dot",
    name: "Cream pin-dot",
    caption: "Cream with small red pin dots and brown suede fringe.",
    category: "knot-bag",
    imageSrc: "/bags/cream-pin-dot.jpeg",
    sold: false,
  },
  {
    id: "gold-dot-cream",
    slug: "gold-dot-cream",
    name: "Gold-dot cream",
    caption: "Cream with gold dots and gold fringe.",
    category: "knot-bag",
    imageSrc: "/bags/gold-dot-cream.jpeg",
    sold: false,
  },
  {
    id: "rose-toile",
    slug: "rose-toile",
    name: "Rose toile",
    caption: "Pink rose floral flower toile on cream with white suede fringe.",
    category: "knot-bag",
    imageSrc: "/bags/rose-toile.jpeg",
    sold: false,
  },
  {
    id: "dusty-blue-floral",
    slug: "dusty-blue-floral",
    name: "Dusty-blue floral",
    caption:
      "Dusty blue with pink roses, yellow flowers, and white suede fringe.",
    category: "knot-bag",
    imageSrc: "/bags/dusty-blue-floral.jpeg",
    sold: false,
  },
] as const;

export const products: Product[] = ProductSchema.array().min(1).parse(
  listed.map((product) => {
    const price = product.category === "knot-bag" ? 65 : 70;
    return {
      ...product,
      price,
      priceLabel: `$${price}`,
    };
  }),
);
