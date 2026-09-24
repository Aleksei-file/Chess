# Agent Guide — Chess

## Scope and instruction hierarchy

This file defines project-wide rules. Instructions in `client/AGENTS.md` and `server/AGENTS.md` add rules for their respective areas; read the nearest applicable guide before editing files.

`PROJECT_SPECIFICATION.md` is the product-context source of truth. A direct user request takes precedence if it conflicts with a project document.

## Product goal

Build a portfolio-grade chess application for one user playing against a computer opponent. The core journey is: start a game → play against AI → save progress → view history → resume an unfinished game.

The frontend is the primary portfolio showcase. The backend must still provide dependable game validation, persistence, and AI integration.

## Shared technical decisions

- Use TypeScript with strict type checking.
- Use `chess.js` as the authoritative chess-rules engine. Never duplicate its rules manually.
- Persist games in SQLite using `better-sqlite3`.
- Keep SQLite as the source of persisted state; WebSocket distributes current game events.
- Use explicit game statuses: `active`, `completed`, and `abandoned`.
- Store at least `id`, `status`, `fen`, `moves`, `result`, `createdAt`, and `updatedAt`.
- A completed game must never be resumed or modified.
- Do not replace agreed technologies or add dependencies without a clear task-based reason.

## Module documentation

Every new source module must start with a concise English JSDoc or block comment describing its functional role and boundary.

- Describe the module's responsibility, not its implementation line by line.
- Document exported public functions, types, hooks, classes, and components when their purpose is not obvious from the name and signature.
- Keep documentation accurate after a module changes.
- Write all code comments, JSDoc, API event descriptions, and developer-facing documentation in English.

## Cross-cutting quality rules

- Do not use `any`, unsafe casts, or error suppression without a documented reason.
- Keep UI, game rules, data access, and transport code in separate modules.
- Do not duplicate shared types, event constants, or status values.
- Validate all client-provided IDs, moves, FEN strings, and WebSocket payloads at the backend boundary.
- Never commit secrets, tokens, SQLite database files, or local configuration. Use `.env.example` for configuration keys without secret values.
- Preserve unrelated user changes.

## Completion checks

Run the relevant available checks after each change: linting, type checking, affected tests, and a production build when routes, configuration, or server code changes.

Do not claim a check passed if it was not run or is not configured. Report the actual result and any limitation in the final response.
