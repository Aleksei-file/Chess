/**
 * Parses raw UCI `info` lines emitted by the Stockfish engine into a
 * structured evaluation (search depth, score, and principal variation).
 * Lines that are not `info` lines, or that carry no `score`, are not
 * evaluations and are ignored.
 */
import { M_RESULT_OPTIONS, type resOptionType } from './constants';

/** The two units an `info` line's score can be reported in. */
const scores = {
  /** Score in centipawns (1/100 of a pawn), positive favors the side to move. */
  cp: 'cp',
  /** Score expressed as a forced mate in N moves rather than a material value. */
  mate: 'mate',
} as const;

type scoreTypes = typeof scores;
type scoreType = scoreTypes[keyof scoreTypes];

export interface IUciEvaluation {
  depth: number | null;
  scoreType: scoreType | null;
  scoreValue: number | null;
  pv: string[];
  multipv: number;
}

export const parseUciMessage = (line: string): IUciEvaluation | null => {
  if (!line.startsWith(M_RESULT_OPTIONS.info)) return null;
  if (!line.includes(M_RESULT_OPTIONS.score)) return null;

  const tokens: resOptionType[] | string[] = line.split(' ');
  const result: IUciEvaluation = {
    depth: null,
    scoreType: null,
    scoreValue: null,
    pv: [],
    multipv: 1,
  };

  for (let i = 0; i < tokens.length; i++) {
    switch (tokens[i]) {
      case M_RESULT_OPTIONS.depth:
        result.depth = parseInt(tokens[i + 1], 10);
        break;
      case M_RESULT_OPTIONS.multipv:
        result.multipv = parseInt(tokens[i + 1], 10);
        break;
      case M_RESULT_OPTIONS.score:
        result.scoreType =
          tokens[i + 1] === scores.mate ? scores.mate : scores.cp;
        result.scoreValue = parseInt(tokens[i + 2], 10);
        break;
      case M_RESULT_OPTIONS.pv:
        result.pv = tokens.slice(i + 1);
        i = tokens.length; // everything after `pv` is the move list
        break;
    }
  }

  return result;
};
