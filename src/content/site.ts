import { SiteSchema } from "./schema";

export const site = SiteSchema.parse({
  name: "Coast Collection",
  wordmark: "Coast Collection",
  announcement: "Free shipping",
  marqueeItems: ["HANDMADE WITH LOVE", "COAST TO COAST"],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/coastcollection.co" },
    { label: "TikTok", href: "https://www.tiktok.com/@julesgruber12" },
  ],
  utilityNav: [{ label: "Account" }, { label: "Search" }, { label: "Cart" }],
  infoNav: [{ label: "Shipping" }],
  footerHeadings: {
    shop: "Shop",
    help: "Help",
    follow: "Follow",
  },
  footerBlurb:
    "Coast Collection is a handmade studio of Japanese knot bags with suede fringe and beaded appliqué tanks — one motif, one piece.",
  sheetCopy: {
    signIn: "Sign in",
    createAccount: "Create an account",
    email: "Email",
    password: "Password",
    searchPlaceholder: "Search",
    cartEmpty: "Your cart is empty",
    cartTotal: "Total",
    emptyTotal: "$0",
  },
  navLabel: "Shop",
  menuLabel: "Menu",
  productCategories: [
    { id: "knot-bag", heading: "Knot bags" },
    { id: "applique-tank", heading: "Appliqué tanks" },
  ],
  heroImageSrc: "/hero/homepage.jpg",
  heroImageAlt:
    "Coast Collection look: white tank with a palm-tree patch, shell belt, and cream trousers in front of a boutique window",
});
