---
name: ship-to-main
description: Typecheck, commit, and push directly to main for this solo Coast Collection repo. Use when the user asks to commit, push, ship, or deploy; do not open a pull request unless they ask.
---

# Ship to main

One developer. Production is `main` on GitHub → Vercel.

1. `pnpm typecheck` (and `pnpm lint` if the change is non-trivial).
2. Review `git status` / `git diff` / recent `git log`.
3. Stage **only** source, `public/` runtime images, and `docs/feedback/*.md`. Never stage `*.mov`, `raw/`, `.env*`.
4. Commit with a 1–2 sentence **why** message (repo style: sentence case, period).
5. `git push origin HEAD` to `main`. Return the commit hash.
6. Do not `git add -i`, `--no-verify`, force-push, or open a PR unless asked.
