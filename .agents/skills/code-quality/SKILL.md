---
name: code-quality
description: Apply a project's package, Prettier, and ESLint rules when editing code, and verify formatting, linting, and TypeScript checks before completion.
---

# Code Quality

Use this skill for code changes in a JavaScript or TypeScript project that needs its repository quality rules followed and verified.

## Before editing

Read `package.json`, every applicable `.prettierrc*` file, and the ESLint configuration (for example `eslint.config.*` or `.eslintrc*`). Follow the discovered scripts, dependencies, formatting settings, and lint rules while making the change. Also respect any nearer project instructions such as `AGENTS.md`.

## Verification

Before reporting a task complete, run these commands from the relevant package directory:

```bash
npm run format
npm run lint
npm run typecheck
```

If a command is missing, report that limitation and run the closest configured equivalent only when one exists. Diagnose and fix errors caused by the task, then re-run every required check affected by the fixes. Do not complete the task while an applicable required check has unresolved errors; continue working or clearly report an external blocker when the error cannot be resolved within the task scope.
