/**
 * React hook exposing a Stockfish engine instance as the computer opponent.
 * Manages the worker's readiness, in-flight "thinking" state, the latest
 * evaluation, and the best move found for a requested position. The engine
 * wraps a Web Worker, so it is created lazily in an effect (client-only)
 * rather than during render, and torn down on unmount.
 */
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import StockfishEngine from '@/lib/stockfish/stockfishEngine';
import { parseUciMessage, type IUciEvaluation } from '@/lib/stockfish/parseUci';
import {
  DEFAULT_SEARCH_DEPTH,
  DEFAULT_SKILL_LEVEL,
  M_RESULT_OPTIONS,
} from '@/lib/stockfish/constants';

export interface IUseStockfishResult {
  /** True once the engine has finished initializing and is ready to search. */
  isEngineReady: boolean;
  /** True while a search requested via `requestBestMove` is in progress. */
  isThinking: boolean;
  /** UCI best move for the last completed search (e.g. "e2e4"), or null. */
  bestMove: string | null;
  /** Latest search evaluation reported while thinking. */
  evaluation: IUciEvaluation | null;
  /** Starts a search for the given FEN; resolves via `bestMove`. */
  requestBestMove: (fen: string, depth?: number) => void;
  /** Changes the engine's playing strength (0-20). */
  setSkillLevel: (level: number) => void;
}

export const useStockfish = (
  skillLevel: number = DEFAULT_SKILL_LEVEL
): IUseStockfishResult => {
  const engineRef = useRef<StockfishEngine | null>(null);

  // Read inside the setup effect without re-running it on every change.
  const skillLevelRef = useRef(skillLevel);
  skillLevelRef.current = skillLevel;

  const [isEngineReady, setIsEngineReady] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [bestMove, setBestMove] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<IUciEvaluation | null>(null);

  useEffect((): (() => void) => {
    // Worker (and therefore StockfishEngine) only exists in the browser, so
    // the engine must be created here rather than during render/SSR.
    const engine = new StockfishEngine();
    engineRef.current = engine;

    const unsubscribe = engine.onMessage((line: string): void => {
      if (line === M_RESULT_OPTIONS.uciok) {
        engine.send(
          `setoption name Skill Level value ${skillLevelRef.current}`
        );
        engine.send('setoption name Threads value 1');
        engine.send('setoption name Hash value 16');
        engine.send('isready');
        return;
      }
      if (line === M_RESULT_OPTIONS.ready) {
        setIsEngineReady(true);
        return;
      }
      if (
        line.startsWith(M_RESULT_OPTIONS.info) &&
        line.includes(M_RESULT_OPTIONS.score)
      ) {
        setEvaluation(parseUciMessage(line));
        return;
      }
      if (line.startsWith(M_RESULT_OPTIONS.bestmove)) {
        const move = line.split(' ')[1];
        setBestMove(move && move !== M_RESULT_OPTIONS.none ? move : null);
        setIsThinking(false);
      }
    });

    return (): void => {
      unsubscribe();
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  const requestBestMove = useCallback(
    (fen: string, depth: number = DEFAULT_SEARCH_DEPTH): void => {
      if (!engineRef.current) return;
      setBestMove(null);
      setIsThinking(true);
      engineRef.current.evaluatePosition(fen, depth);
    },
    []
  );

  const setSkillLevel = useCallback((level: number): void => {
    engineRef.current?.setSkillLevel(level);
  }, []);

  return {
    isEngineReady,
    isThinking,
    bestMove,
    evaluation,
    requestBestMove,
    setSkillLevel,
  };
};
