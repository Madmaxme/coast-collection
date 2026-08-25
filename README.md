# Coast Collection

Handmade Japanese knot bags. This repo is the public site: Next.js App Router, TypeScript, Tailwind, and a Zod-validated content catalog.

## Local

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm typecheck
pnpm lint
pnpm build
```

Catalog and site copy: `src/content/`. Product images: `public/bags/`, `public/apparel/`.

## Hosting (Vercel Hobby)

This is a Next.js App Router app with `next/image`. Host it on [Vercel](https://vercel.com) so image optimization and preview deploys work without an adapter.

1. Push this repo to GitHub (do not commit `*.mov` or `/raw/`).
2. Open [vercel.com/new](https://vercel.com/new) and import the repository.
3. Framework preset: Next.js. Root directory: repo root. Install: `pnpm install`. Build: `pnpm build`.
4. Deploy on the Hobby plan. Production tracks `main`; pull requests get preview URLs.
5. No environment variables are required for v1.
6. Add a custom domain later in the Vercel project DNS settings.

Do not upload the phone feedback video. It is gitignored and is not part of the site.
