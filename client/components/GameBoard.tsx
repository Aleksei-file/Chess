/**
 * Renders the interactive chess board used in the game view. The human
 * player controls the white pieces; black is played by a Stockfish engine
 * running in a Web Worker via `useStockfish`. Board interaction is disabled
 * while the engine is thinking, when it is not the player's turn, or once
 * the game has ended.
 */
'use client';

import { useEffect, useRef, useState, type JSX } from 'react';
import { useTranslations } from 'next-intl';
import {
  Board,
  type PieceDropHandlerArgs,
  type PieceHandlerArgs,
  type SquareHandlerArgs,
  type ChessboardOptions,
} from '@/components/ui/Board';
import { Chess, type Square } from 'chess.js';
import { useStockfish } from '@/hooks/useStockfish';

/** Color the human player controls; the engine plays the opposite side. */
const PLAYER_COLOR = 'w';
const CLICKED_SQUARE_BACKGROUND = 'rgba(255, 255, 0, 0.4)';
const MOVE_TO_BACKGROUNDS = {
  capture: 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)', // larger circle for capturing
  move: 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)', // smaller circle for moving
};

const BASE_CHESSBOARD_OPTIONS: Partial<ChessboardOptions> = {
  id: 'gameboard-main',
  boardStyle: {
    borderRadius: '10px',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
    border: '1px solid #B58863',
    margin: '5px',
  },
  draggingPieceStyle: {
    transform: 'scale(1.3) rotate(-15deg)',
  },
  lightSquareStyle: {
    backgroundColor: '#F0D9B5',
  },
  darkSquareStyle: {
    backgroundColor: '#B58863',
  },
  alphaNotationStyle: {
    textTransform: 'uppercase',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  numericNotationStyle: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
};

const getMoveToStyles = (
  isCapturing: boolean | undefined
): React.CSSProperties => {
  return {
    background: isCapturing
      ? MOVE_TO_BACKGROUNDS.capture
      : MOVE_TO_BACKGROUNDS.move,
    borderRadius: '50%',
  };
};

export default function GameBoard(): JSX.Element {
  const t = useTranslations();
  const chessGameRef = useRef(new Chess());
  const chessGame = chessGameRef.current;
  const [chessPosition, setChessPosition] = useState(chessGame.fen());
  const [moveFrom, setMoveFrom] = useState('');
  const [optionSquares, setOptionSquares] = useState<
    Record<string, React.CSSProperties>
  >({});
  const { isEngineReady, isThinking, bestMove, requestBestMove } =
    useStockfish();
  const isPlayerTurn = chessGame.turn() === PLAYER_COLOR;
  const isGameOver = chessGame.isGameOver();
  const canPlayerMove = isPlayerTurn && !isThinking && !isGameOver;

  // ask the engine for a move whenever it becomes its turn
  useEffect((): void => {
    if (!isEngineReady || isGameOver || isPlayerTurn) return;
    requestBestMove(chessGame.fen());
  }, [
    chessPosition,
    isEngineReady,
    isGameOver,
    isPlayerTurn,
    requestBestMove,
    chessGame,
  ]);

  // apply the engine's move once the search resolves
  useEffect((): void => {
    if (!bestMove) return;

    // Stockfish returns UCI long algebraic notation (e.g. "e2e4", "e7e8q")
    // computed from the position we just sent it, so slicing it into
    // from/to/promotion is safe without further validation.
    const from = bestMove.slice(0, 2) as Square;
    const to = bestMove.slice(2, 4) as Square;
    const promotion = bestMove.length > 4 ? bestMove.slice(4) : undefined;

    try {
      chessGame.move({ from, to, promotion });
      setChessPosition(chessGame.fen());
    } catch {
      // position changed since the search started; drop the stale move
    }
  }, [bestMove, chessGame]);

  // get the move options for a square to show valid moves
  function getMoveOptions(square: Square): boolean {
    // get the moves for the square
    const moves = chessGame.moves({
      square,
      verbose: true,
    });

    // if no moves, clear the option squares
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    // create a new object to store the option squares
    const newSquares: Record<string, React.CSSProperties> = {};

    // loop through the moves and set the option squares
    for (const move of moves) {
      newSquares[move.to] = getMoveToStyles(
        chessGame.get(move.to) &&
          chessGame.get(move.to)?.color !== chessGame.get(square)?.color
      );
    }

    // set the square clicked to move from to yellow
    newSquares[square] = {
      background: CLICKED_SQUARE_BACKGROUND,
    };

    // set the option squares
    setOptionSquares(newSquares);

    // return true to indicate that there are move options
    return true;
  }

  function onSquareClick({ square, piece }: SquareHandlerArgs): void {
    // ignore clicks while it's not the player's turn to move
    if (!canPlayerMove) return;

    // piece clicked to move
    if (!moveFrom && piece) {
      // get the move options for the square
      const hasMoveOptions = getMoveOptions(square as Square);

      // if move options, set the moveFrom to the square
      if (hasMoveOptions) {
        setMoveFrom(square);
      }

      // return early
      return;
    }

    // square clicked to move to, check if valid move
    const moves = chessGame.moves({
      square: moveFrom as Square,
      verbose: true,
    });
    const foundMove = moves.find((m) => m.from === moveFrom && m.to === square);

    // not a valid move
    if (!foundMove) {
      // check if clicked on new piece
      const hasMoveOptions = getMoveOptions(square as Square);

      // if new piece, setMoveFrom, otherwise clear moveFrom
      setMoveFrom(hasMoveOptions ? square : '');

      // return early
      return;
    }

    // is normal move
    try {
      chessGame.move({
        from: moveFrom,
        to: square,
        promotion: 'q',
      });
    } catch {
      // if invalid, setMoveFrom and getMoveOptions
      const hasMoveOptions = getMoveOptions(square as Square);

      // if new piece, setMoveFrom, otherwise clear moveFrom
      if (hasMoveOptions) {
        setMoveFrom(square);
      }

      // return early
      return;
    }

    // update the position state
    setChessPosition(chessGame.fen());

    // clear moveFrom and optionSquares
    setMoveFrom('');
    setOptionSquares({});
  }

  // handle piece drop
  function onPieceDrop({ sourceSquare, targetSquare }: PieceDropHandlerArgs) {
    // ignore drops while it's not the player's turn to move
    if (!canPlayerMove) {
      return false;
    }

    // type narrow targetSquare potentially being null (e.g. if dropped off board)
    if (!targetSquare) {
      return false;
    }

    // try to make the move according to chess.js logic
    try {
      chessGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // always promote to a queen for simplicity
      });

      // update the position state upon successful move to trigger a re-render of the chessboard
      setChessPosition(chessGame.fen());

      // clear moveFrom and optionSquares
      setMoveFrom('');
      setOptionSquares({});

      // return true as the move was successful
      return true;
    } catch {
      // return false as the move was not successful
      return false;
    }
  }

  function canDragPiece({ piece }: PieceHandlerArgs): boolean {
    // only allow dragging the player's own pieces, and only on their turn
    return canPlayerMove && piece.pieceType[0] === PLAYER_COLOR;
  }

  const statusMessage = isGameOver
    ? t('game.gameOver')
    : isThinking
      ? t('game.thinking')
      : t('game.yourTurn');

  const chessboardOptions: ChessboardOptions = {
    ...BASE_CHESSBOARD_OPTIONS,
    allowDragging: canPlayerMove,
    onPieceDrop,
    onSquareClick,
    canDragPiece,
    position: chessPosition,
    squareStyles: optionSquares,
    id: 'gameboard-main',
  };

  return (
    <div className="w-full sm:max-w-[480px] md:max-w-[560px] lg:max-w-[640px] flex flex-col items-center gap-2">
      <div aria-live="polite" className="text-sm font-medium">
        {statusMessage}
      </div>
      <Board options={chessboardOptions} />
    </div>
  );
}
