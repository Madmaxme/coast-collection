#!/usr/bin/env bash
# Move phone videos off the repo root into the local inbox. Does not git-add.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/raw/feedback"
mkdir -p "$DEST"

moved=0
shopt -s nullglob
for src in "$ROOT"/*.mov "$ROOT"/*.MOV; do
  base="$(basename "$src")"
  dest="$DEST/$base"
  if [[ -e "$dest" ]]; then
    dest="$DEST/$(date +%Y%m%d-%H%M%S)-$base"
  fi
  mv "$src" "$dest"
  echo "moved $base -> ${dest#"$ROOT"/}"
  moved=$((moved + 1))
done

if [[ "$moved" -eq 0 ]]; then
  echo "No .mov files at repo root. Inbox: $DEST"
  ls -1 "$DEST" 2>/dev/null || true
  exit 0
fi

echo "Next: transcribe, then write docs/feedback/YYYY-MM-DD.md (do not git add .mov)."
