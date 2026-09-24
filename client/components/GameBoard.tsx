/**
 * Renders the interactive chess board used in the game view.
 */
'use client';

import { useRef, useState, type JSX } from 'react';
import { Board } from '@/components/ui/Board';
import { Chess } from 'chess.js';

export default function GameBoard(): JSX.Element {
  const chessGameRef = useRef(new Chess());
  const chessGame = chessGameRef.current;
  const [chessPosition, setChessPosition] = useState(chessGame.fen());

  // TODO: Implement a more sophisticated AI for the opponent instead of random moves.
  const makeRandomMove = (): void => {
    const possibleMoves = chessGame.moves();
    if (chessGame.isGameOver()) {
      return;
    }
    const randomMove =
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    chessGame.move(randomMove);
    setChessPosition(chessGame.fen());
  };

  const onPieceDrop = ({ sourceSquare, targetSquare }: any): boolean => {
    if (!targetSquare) {
      return false;
    }
    try {
      chessGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });
      setChessPosition(chessGame.fen());
      setTimeout(makeRandomMove, 500);
      return true;
    } catch {
      return false;
    }
  };

  const chessboardOptions = {
    position: chessPosition,
    onPieceDrop,
    id: 'play-vs-random',
  };

  return (
    <div className="w-full sm:max-w-[480px] md:max-w-[560px] lg:max-w-[640px]">
      <Board options={chessboardOptions} />
    </div>
  );
}
