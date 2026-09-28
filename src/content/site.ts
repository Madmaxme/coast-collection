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
  infoNav: [{ label: "Shipping", href: "/shipping" }],
  footerHeadings: {
    shop: "Shop",
    help: "Help",
    follow: "Follow",
  },
  footerBlurb:
    "I’m Julia, the founder of Coast Collection! I started this small business in the summer of 2025 with a love for creating meaningful pieces by hand. Every item in the Coast Collection is handmade by me, from start to finish, with lots of care and attention to detail. What started as a small idea has grown into something I’m so proud to share with you. I also believe in giving back to the places that inspire me, which is why a portion of proceeds from Coast Collection is donated to support environmental causes. Thank you for supporting my small business and being part of the journey! ♡",
  shippingPage: {
    heading: "Shipping",
    paragraphs: [
      "Free shipping.",
      "Everything is final sale. No returns until the shop is bigger.",
    ],
  },
  sheetCopy: {
    signIn: "Sign in",
    createAccount: "Create an account",
    email: "Email",
    password: "Password",
    searchPlaceholder: "Search",
    cartEmpty: "Your cart is empty",
    cartTotal: "Total",
    emptyTotal: "$0",
    searchEmpty: "No matches",
    signOut: "Sign out",
    accountUnknown: "No account with that email",
    addToCart: "Add to cart",
    quantity: "Quantity",
    decreaseQuantity: "Decrease quantity",
    increaseQuantity: "Increase quantity",
    size: "Size",
    remove: "Remove",
    checkout: "Checkout",
    checkoutUnavailable: "Checkout isn't available yet",
    orderReceived: "Thank you",
    orderReceivedBody: "A receipt is on its way.",
    paymentUnconfirmed: "Payment not confirmed",
    paymentUnconfirmedBody: "This page doesn't show a paid order.",
  },
  apparelSizes: ["Small", "Medium", "Large"],
  categoryBlurbs: {
    "knot-bag": "Handmade Japanese knot bag with suede fringe.",
    "applique-tank": "Handmade beaded appliqué tank.",
  },
  navLabel: "Shop",
  menuLabel: "Menu",
  productCategories: [
    { id: "knot-bag", heading: "Knot bags" },
    { id: "applique-tank", heading: "Appliqué tanks" },
  ],
  storyImageSrc: "/hero/julia.jpg",
  storyImageAlt:
    "Julia at a Coast Collection market table with handmade bags and appliqué pieces",
  heroImageSrc: "/hero/homepage.jpg",
  heroImageAlt:
    "Coast Collection look: white tank with a palm-tree patch, shell belt, and cream trousers in front of a boutique window",
});
