#!/usr/bin/env python3
"""beforeShellExecution: block staging phone videos or /raw/."""
from __future__ import annotations

import json
import sys

payload = json.load(sys.stdin)
command = payload.get("command") or payload.get("command_line") or ""
if isinstance(command, dict):
    command = command.get("command") or ""
command = str(command)

lower = command.lower()
dangerous = (
    "git add" in lower
    or "git commit" in lower
    or "git mv" in lower
) and (
    ".mov" in lower
    or "/raw/" in command
    or " raw/" in command
    or command.rstrip().endswith(" raw")
)

if dangerous:
    sys.stdout.write(
        json.dumps(
            {
                "permission": "deny",
                "user_message": "Blocked: do not commit .mov or /raw/. Put videos in raw/feedback and notes in docs/feedback.",
                "agent_message": "Hook denied a git command that looked like it would stage ignored media.",
            }
        )
    )
    sys.exit(0)

sys.stdout.write(json.dumps({"permission": "allow"}))
