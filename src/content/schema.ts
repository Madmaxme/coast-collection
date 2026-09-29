import { z } from "zod";

export const NavItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1).optional(),
});

export const SocialLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const ProductCategoryIdSchema = z.enum(["knot-bag", "applique-tank"]);

export const ProductCategorySchema = z.object({
  id: ProductCategoryIdSchema,
  heading: z.string().min(1),
});

const merchImageSrc = z
  .string()
  .min(1)
  .refine(
    (value) => value.startsWith("/bags/") || value.startsWith("/apparel/"),
    { message: "Must start with /bags/ or /apparel/" },
  );

export const SiteSchema = z.object({
  name: z.string().min(1),
  wordmark: z.string().min(1),
  announcement: z.string().min(1),
  marqueeItems: z.array(z.string().min(1)).min(1),
  social: z.array(SocialLinkSchema).min(1),
  utilityNav: z.array(NavItemSchema).min(1),
  infoNav: z.array(NavItemSchema).min(1),
  footerHeadings: z.object({
    shop: z.string().min(1),
    help: z.string().min(1),
    follow: z.string().min(1),
  }),
  footerBlurb: z.string().min(1),
  shippingPage: z.object({
    heading: z.string().min(1),
    paragraphs: z.array(z.string().min(1)).min(1),
  }),
  sheetCopy: z.object({
    signIn: z.string().min(1),
    createAccount: z.string().min(1),
    email: z.string().min(1),
    password: z.string().min(1),
    searchPlaceholder: z.string().min(1),
    cartEmpty: z.string().min(1),
    cartTotal: z.string().min(1),
    emptyTotal: z.string().min(1),
    searchEmpty: z.string().min(1),
    signOut: z.string().min(1),
    accountUnknown: z.string().min(1),
    addToCart: z.string().min(1),
    quantity: z.string().min(1),
    decreaseQuantity: z.string().min(1),
    increaseQuantity: z.string().min(1),
    size: z.string().min(1),
    remove: z.string().min(1),
    checkout: z.string().min(1),
    checkoutUnavailable: z.string().min(1),
    orderReceived: z.string().min(1),
    orderReceivedBody: z.string().min(1),
    paymentUnconfirmed: z.string().min(1),
    paymentUnconfirmedBody: z.string().min(1),
  }),
  apparelSizes: z.array(z.string().min(1)).min(1),
  categoryBlurbs: z.object({
    "knot-bag": z.string().min(1),
    "applique-tank": z.string().min(1),
  }),
  navLabel: z.string().min(1),
  menuLabel: z.string().min(1),
  productCategories: z.array(ProductCategorySchema).min(1),
  heroImageSrc: z.string().startsWith("/hero/"),
  heroImageAlt: z.string().min(1),
  storyImageSrc: z.string().startsWith("/hero/"),
  storyImageAlt: z.string().min(1),
});

export const ProductSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  searchTerms: z.array(z.string().min(1)).min(1),
  category: ProductCategoryIdSchema,
  imageSrc: merchImageSrc,
  hoverImageSrc: merchImageSrc.optional(),
  price: z.number().int().positive(),
  priceLabel: z.string().min(1).optional(),
  sold: z.boolean(),
  tagline: z.string().min(1).optional(),
});

export const CollageImageSchema = z.object({
  id: z.string().min(1),
  src: z.string().startsWith("/collage/"),
  alt: z.string().min(1),
});

export type SocialLink = z.infer<typeof SocialLinkSchema>;
export type NavItem = z.infer<typeof NavItemSchema>;
export type ProductCategory = z.infer<typeof ProductCategorySchema>;
export type Site = z.infer<typeof SiteSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type CollageImage = z.infer<typeof CollageImageSchema>;
