---
name: minimal-diffs
description: Keep code changes narrowly scoped to the requested functional work; use when editing project files to avoid unrelated reformatting, reordering, or cleanup.
---

# Minimal Diffs

Make the smallest change that completes the user's task. Preserve the existing
layout of every code block that does not require a functional change.

- Do not reorder imports, dependencies, object keys, CSS declarations, or other
  existing lines solely for readability, style preference, or cleanup.
- Do not apply broad formatting to files or directories that are otherwise
  unrelated to the task.
- Format only the changed code and the smallest necessary surrounding context.
- Broader edits are permitted only when required to make the changed code pass
  the project's configured formatter, linter, type checker, build, or tests.
  Keep those corrective edits limited to the reported requirement.
- If an automated formatter changes unrelated lines, revert those unrelated
  changes when doing so does not violate a configured rule. Report any
  unavoidable formatting-only changes in the final response.
- Do not add, remove, or reorder package dependencies unless the task requires
  a dependency change.

Before finishing, review the diff and remove every unrelated textual change.
