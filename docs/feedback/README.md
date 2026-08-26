# Julia feedback inbox

Drop new phone videos in **`raw/feedback/`** (gitignored, ~hundreds of MB each). Then in Cursor: *apply Julia’s video* so the agent runs `.cursor/skills/apply-julia-feedback`.

```bash
# UUID .mov files dumped at the repo root
bash scripts/ingest-feedback.sh
```

Commit **notes** here (`taste.md`, `YYYY-MM-DD.md`). Never commit the `.mov`.
