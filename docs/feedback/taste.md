# Durable taste (Coast Collection)

Update this file when Julia repeats a decision across videos. Per-drop notes go in dated files beside this one.

## Brand

- Name: Coast Collection. Maker: Julia. Products: Japanese knot bags with suede fringe. As of 2026-09-27 she wants every appliqué tank removed from the site.
- Social: Instagram `coastcollection.co`, TikTok `@julesgruber12` — only from `src/content/site.ts`.
- Reference store: [Hunny House](https://shophunnyhouse.com/) for *pace and softness*, not IA or wordmark.

## Layout she has already corrected

1. Wordmark centered under the announcement bar.
2. Shop is **not** a homepage header item on mobile; **hero Shop** → `/shop`.
3. `/shop` is a vertical catalog (grid), not a hash on the homepage.
4. One homepage product row. Tanks are off the site as of 2026-09-27, so the row is knot bags.
5. Full-bleed collage.
6. Marquee must loop with **no blank gap**, and move slowly (about a 96s loop).
7. Mobile **drawer** for Menu; **Cart always visible**.
8. Desktop header: **Shop only** — no Knot bags / Appliqué tanks links. Shop type matches Account / Search / Cart.
9. Hero title uses the **same heading serif** as the wordmark, larger — not a script overlay.
10. Footer is slim: © year, Instagram, TikTok, Shipping.
11. Drawer rows must match (no Button outline boxes on stubs). One Shop in the drawer, not extra category rows to the same page.
12. Product photos **blend** into canvas (no gray/white squares). Cream stills were the reference.
13. Cards: bags **$65**. No “one of a kind” on the card.
14. Homepage: **story** after collage, then the slim footer. Keep scrolling. The story is Julia’s own founder note (handmade, summer 2025, a portion of proceeds to environmental causes). Heading and paragraph sit beside a modest market portrait of Julia, inside the same page width as the shop grid. A blank left column with a thumbnail is the wrong read of that note.
15. Search lists matching products as you type (`bag` → knot bags, `blue bag` → bags with blue in the name). A close motif word counts: `flower` matches floral, hydrangea, and rose. Enter opens a results page of those matches.
16. A product card opens its page: description, price, quantity, add to cart. Bags have no sizes. Adding opens the cart drawer with that line and a total.
17. Account is `/account`. Clerk proves the email. Stripe keeps the customer, the shipping address, and paid orders. No orders: Shop links to `/shop`. Guest checkout stays. Cart checkout opens Stripe hosted Checkout. The server sets the price. Shipping address is collected for the US. The account page reads it from the paid Checkout session. No tax until a registration exists.

## Still stubs

Shipping page. A live charge needs the live Stripe key on Vercel Production after the account is verified. Preview stays on the sandbox key.
