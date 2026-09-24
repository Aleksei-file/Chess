Server Agent Guide — Chess Backend

## Scope

This guide applies to all files under `server/`. Follow the repository-level `AGENTS.md` first; these rules add backend-specific guidance.

The server provides reliable game persistence, authoritative chess validation, AI orchestration, REST endpoints, and real-time events. Favor understandable, maintainable implementation over unnecessary framework complexity.

## Server boundaries

- REST API manages game creation, retrieval, history, and state-changing operations.
- SQLite through `better-sqlite3` stores durable game records.
- chess.js validates every move and determines terminal game states.
- WebSocket delivers typed current-game events.

Keep route handlers thin: validate input → call a server → persist/read through a repository → return a typed response.

## Suggested server organization

server/
  api/                  # REST route handlers and request validation
  game/                 # Game server, status transitions, chess rules
  db/                   # SQLite initialization, migrations, repositories
  websocket/            # Typed event contract and server transport
  types/                # Shared server contracts
  tests/                # Unit and integration tests

## Data integrity and validation

- Validate all move requests with chess.js on the server, even when the client pre-validates a move.
- Reject invalid IDs, missing games, invalid payload shapes, illegal moves, and prohibited status transitions with safe, typed errors.
- Persist the position after every accepted user move and every completed AI move.
- Do not mutate completed games.
- Use parameterized database queries and keep database access in repository modules.
- Do not expose SQLite paths, raw SQL errors, stack traces, or environment values to clients.

## API and WebSocket contract

- Use appropriate HTTP status codes and the shared error response shape: `{ error: { code, message } }`.
- Define request, response, and event types before implementing transport logic.
- WebSocket messages must include `gameId`, event type, and typed payload.
- Emit events only after the corresponding state transition is accepted and persisted.
- SQLite remains the canonical state; clients can reload a game through REST after disconnection.
- Keep WebSocket connection management isolated from chess and database logic.

## Server verification

Run relevant linting, type checks, unit tests for chess and status transitions, integration tests for repositories and routes, and a build when server configuration changes. Report any unconfigured checks instead of assuming they pass.
