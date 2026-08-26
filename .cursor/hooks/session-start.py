#!/usr/bin/env python3
"""sessionStart: remind the agent about the local video inbox and committed taste notes."""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
inbox = ROOT / "raw" / "feedback"
taste = ROOT / "docs" / "feedback" / "taste.md"

lines = [
    "Coast Collection harness: skills apply-julia-feedback and ship-to-main.",
    "Never git-add *.mov or /raw/. Push main when asked to ship (no PR).",
]

if taste.is_file():
    lines.append("Read docs/feedback/taste.md for Julia's durable layout decisions.")

if inbox.is_dir():
    movs = sorted(p.name for p in inbox.iterdir() if p.suffix.lower() == ".mov")
    if movs:
        lines.append("Local gitignored videos in raw/feedback/: " + ", ".join(movs) + ".")
        lines.append("If the user mentioned new notes, ingest and transcribe before coding.")

sys.stdout.write(json.dumps({"additional_context": " ".join(lines)}))
