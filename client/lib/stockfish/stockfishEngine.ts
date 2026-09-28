/**
 * Thin wrapper around the Stockfish UCI engine running inside a Web Worker.
 * Owns the worker's lifecycle and fans out raw UCI output lines to
 * subscribers; interpreting the UCI protocol is the caller's responsibility
 * (see `parseUciMessage`).
 */
import { STOCKFISH_URL, DEFAULT_SEARCH_DEPTH } from './constants';

export type EngineMessageListener = (line: string) => void;

class StockfishEngine {
  private worker: Worker;
  private listeners: Set<EngineMessageListener> = new Set();

  constructor() {
    this.worker = new Worker(STOCKFISH_URL);

    this.worker.onmessage = (
      event: MessageEvent<string | { data: string }>
    ): void => {
      const line: string | undefined =
        typeof event.data === 'string' ? event.data : event.data?.data;
      if (line) {
        this.listeners.forEach((callback: EngineMessageListener): void =>
          callback(line)
        );
      }
    };

    this.worker.postMessage('uci');
  }

  /** Subscribes to raw UCI output lines. Returns an unsubscribe function. */
  onMessage(callback: EngineMessageListener): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  send(command: string): void {
    this.worker.postMessage(command);
  }

  /** Sets the position and starts a search to the given depth. */
  evaluatePosition(fen: string, depth: number = DEFAULT_SEARCH_DEPTH): void {
    this.send(`position fen ${fen}`);
    this.send(`go depth ${depth}`);
  }

  setSkillLevel(level: number): void {
    this.send(`setoption name Skill Level value ${level}`);
  }

  destroy(): void {
    this.worker.terminate();
    this.listeners.clear();
  }
}

export default StockfishEngine;
