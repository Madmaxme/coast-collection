<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Coast Collection

Same policy as `.cursor/rules/` (Cursor loads those automatically). Other agents: follow this file.

- Site copy, nav, social URLs, hero, collage, and products live only in `src/content/`. Parse with Zod. Types from `z.infer` in `src/content/schema.ts`.
- Do not duplicate product names or image paths in components. Import `@/content`.
- Do not commit `*.mov` or `/raw/`. Runtime images: `public/bags/`, `public/apparel/`, `public/collage/`, `public/hero/`.
- Account / Search / Cart are UI shells until real checkout. Prefer Server Components.

## Harness

| Piece | Path | Role |
| --- | --- | --- |
| Always-on rules | `.cursor/rules/*.mdc` | SSOT, Julia's taste, git, UI |
| Skills | `.cursor/skills/*/SKILL.md` | `apply-julia-feedback`, `ship-to-main` |
| Hooks | `.cursor/hooks.json` | Session context + block git-adding videos |
| Feedback notes | `docs/feedback/` | Committed transcripts / taste |
| Local videos | `raw/feedback/` | Gitignored `.mov` inbox |

Solo shipping: commit and push `main`. No PR unless asked. Julia videos: `bash scripts/ingest-feedback.sh` then the apply-julia-feedback skill.
