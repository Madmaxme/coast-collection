---
name: apply-julia-feedback
description: Ingest Julia's phone videos, screenshots, and think-aloud notes, transcribe them, write committed feedback docs, then implement. Use when she sent a .mov, screenshot, circled UI, voice note, or when the user says apply feedback, watch the video, or Julia notes.
---

# Apply Julia feedback

Videos stay **local**. Git gets **markdown notes** only.

## Inbox

| Kind | Where | Git |
| --- | --- | --- |
| `.mov` / voice | `raw/feedback/` | ignored |
| Original photos | `raw/photos/` | ignored |
| Site images | `public/{bags,apparel,collage,hero}/` | committed |
| Transcripts + decisions | `docs/feedback/` | committed |

If a UUID `.mov` landed at the repo root, run:

```bash
bash scripts/ingest-feedback.sh
```

## Workflow

1. **Collect** — Move media into `raw/feedback/` (script above). Do not `git add` media.
2. **Transcribe** — Prefer local Whisper (`whisper` / `whisper-cpp`) on the `.mov`. If missing, watch/listen with available tools and write the notes anyway. Quote her words; do not invent copy.
3. **Write** — Add `docs/feedback/YYYY-MM-DD.md` with: what she said, what she circled, proposed UI change, out of scope. Update `docs/feedback/taste.md` **only** for durable rules (layout, nav, what not to do).
4. **Implement** — Copy and URLs only via `@/content`. Follow `.cursor/rules/julia-taste.mdc`.
5. **Verify** — Phone-width drawer + `/shop` + desktop header. Fix if the same class of bug returns (e.g. Button boxes in lists).
6. **Ship** — Follow skill `ship-to-main` when the user wants it live.

## Do not

- Commit `.mov` or `/raw/`.
- Clone Hunny House page-for-page.
- Hide Cart on mobile or put Shop-only in a desktop hamburger.
- Treat screenshot-only as verification.
