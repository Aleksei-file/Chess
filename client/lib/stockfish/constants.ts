/**
 * Shared configuration for the Stockfish UCI engine integration: where to
 * load the worker script from and the default search parameters used when
 * requesting a move from the engine.
 */

/** UCI protocol keywords used to identify and parse lines of engine output. */
export const M_RESULT_OPTIONS = {
  /** Prefix of a search-progress line (depth, score, principal variation, ...). */
  info: 'info',
  /** Sent once after `uci`, confirming the engine has identified itself. */
  uciok: 'uciok',
  /** Sent in response to `isready`, confirming the engine can accept commands. */
  ready: 'readyok',
  /** Prefix of the line announcing the engine's chosen move at the end of a search. */
  bestmove: 'bestmove',
  /** Field name for the search depth (in plies) reached by an `info` line. */
  depth: 'depth',
  /** Field name for the index of a principal variation when multiple are requested. */
  multipv: 'multipv',
  /** Field name preceding the evaluation score in an `info` line. */
  score: 'score',
  /** Field name preceding the principal variation (best move sequence found so far). */
  pv: 'pv',
  /** Value reported after `bestmove` when there is no legal move to play. */
  none: '(none)',
} as const;

type resOptionsType = typeof M_RESULT_OPTIONS;
export type resOptionType = resOptionsType[keyof resOptionsType];

/**
 * Path to the Stockfish worker script, copied into `public/stockfish` at
 * build time by `scripts/copy-stockfish.mjs`. The single-threaded "lite"
 * build is used because it does not require cross-origin isolation
 * (COOP/COEP headers) to run, unlike the multi-threaded build.
 */
export const STOCKFISH_URL = '/stockfish/stockfish-18-lite-single.js';

/** Default Stockfish "Skill Level" (0-20, higher plays stronger). */
export const DEFAULT_SKILL_LEVEL = 1;

/** Default search depth used when requesting a move from the engine. */
export const DEFAULT_SEARCH_DEPTH = 12;
