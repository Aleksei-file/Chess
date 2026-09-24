Client Agent Guide — Chess Frontend

## Scope

This guide applies to all files under `client/`. Follow the repository-level `AGENTS.md` first; these rules add frontend-specific requirements.

The client is the central portfolio artifact. Treat visual quality, responsive behavior, interaction design, accessibility, and code clarity as first-class acceptance criteria.

## Required frontend stack

- Next.js, React, TypeScript, and Tailwind CSS.
- Axios for HTTP communication.
- React Chessboard for board rendering and interaction.
- chess.js for client-side position display and immediate move feedback.

Do not move backend persistence, Stockfish process management, or authoritative move validation into the client.

## Suggested client organization

client/
  app/                  # Pages, layouts, and client-facing routes
    game/
      [gameId]/         # Game-page 
    history/            # Game-history state and composition     
  components/
      chess/            # Chessboard and controls
      ui/               # Reusable visual primitives
      theme/            # Theme state and theme switcher        
  lib/
    api/                # Centralized Axios client and API methods
    websocket/          # Typed browser WebSocket client
  hooks/                # Reusable React hooks
  types/                # Client-facing contracts and view models

Adapt to the actual scaffold, but keep pages thin and move reusable behavior into feature, hook, component, or library modules.

## UI and visual-quality requirements

- Use a mobile-first layout and verify narrow mobile, tablet, laptop, and wide desktop states.
- Preserve a 1:1 board ratio; the board must fit narrow screens without horizontal scrolling.
- Design clear visual hierarchy: primary game actions, current turn, game result, and errors must be immediately recognizable.
- Provide deliberate loading, empty, disabled, success, and failure states. Never leave an interactive area visually ambiguous.
- Prefer composed reusable UI components over duplicated page-specific markup.
- Use Tailwind consistently. Avoid inline style objects unless a runtime-only value makes them necessary.
- Do not introduce a generic component abstraction until it has at least one clear reuse case or materially simplifies a complex UI.

## Theming

- Theme selection is controlled by `data-theme` on the root element.
- Define colors, shadows, borders, and other reusable visual tokens as CSS variables for each theme.
- Consume semantic tokens in components rather than hard-coded palette values when the value must change with the theme.
- New themes must add variable sets; do not duplicate component styles for each theme.
- Prevent theme flash on initial render where the selected theme can be known before hydration.

## Accessibility and interaction

- Use semantic HTML before adding ARIA roles.
- Every interactive control needs a visible focus state and accessible name.
- Icon-only controls require an `aria-label`.
- Ensure contrast remains acceptable in every supported theme.
- Do not rely exclusively on color to convey turn, status, validation, or error.
- Respect reduced-motion preferences for nonessential animation.
- Disable board interaction while the AI is thinking, a move is pending, or the game is complete; communicate the reason in the UI.

## Data, state, and errors

- Use the centralized Axios client; do not make ad-hoc HTTP calls from presentational components.
- Type all API responses and WebSocket events at the boundary.
- Treat API and WebSocket data as untrusted until it satisfies the expected client contract.
- Keep server-persisted game state distinct from temporary UI state such as selected square, pending move, animation, and connection status.
- After reconnecting, reload the canonical game state through REST API before accepting new moves.
- Do not optimistically finalize a move until the server confirms it; if optimistic UI is used, provide rollback behavior.

## Required user-facing states

### Landing page

- Explain the product briefly and provide a prominent “Start Game” CTA.

### Game page

- Render board, side to move, game status, move history, and game result.
- Show feedback for AI calculation, save/connection failure, and illegal-move rejection.
- Do not allow user moves outside the user's turn.

### History page

- Show date, status, result, and move count for each game.
- Clearly distinguish resumable active games from completed games.
- Include polished empty and loading states.

## Frontend verification

Before completing frontend work, run relevant linting, type checks, tests, and build commands. Also manually verify the changed UI at mobile and desktop widths, in each affected theme, and with keyboard navigation for changed controls.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
