import { z } from "zod";

export const SocialLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const SiteSchema = z.object({
  name: z.string().min(1),
  wordmark: z.string().min(1),
  announcement: z.string().min(1),
  marqueeItems: z.array(z.string().min(1)).min(1),
  social: z.array(SocialLinkSchema).min(1),
  footerBlurb: z.string().min(1),
  navLabel: z.string().min(1),
  heroOverlay: z.string().min(1),
  heroImageSrc: z.string().startsWith("/hero/"),
  heroImageAlt: z.string().min(1),
});

export const ProductSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  imageSrc: z.string().startsWith("/bags/"),
  hoverImageSrc: z.string().startsWith("/bags/").optional(),
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
export type Site = z.infer<typeof SiteSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type CollageImage = z.infer<typeof CollageImageSchema>;
