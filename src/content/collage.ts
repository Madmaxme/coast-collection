import { CollageImageSchema, type CollageImage } from "./schema";

export const collageImages: CollageImage[] = CollageImageSchema.array()
  .length(4)
  .parse([
    {
      id: "market-tent",
      src: "/collage/market-tent.jpg",
      alt: "Coast Collection booth with appliqué sweatshirts hanging under a blue market tent",
    },
    {
      id: "knot-bag-worn",
      src: "/collage/knot-bag-worn.jpg",
      alt: "Red bandana knot bag with brown fringe worn on the wrist",
    },
    {
      id: "lobster-look",
      src: "/collage/lobster-look.jpg",
      alt: "White ribbed tee with a beaded lobster patch, denim shorts, and seashell waist trim",
    },
    {
      id: "market-portrait",
      src: "/collage/market-portrait.jpg",
      alt: "Coast Collection at a market table with the seashell wordmark and appliqué shirts",
    },
  ]);
